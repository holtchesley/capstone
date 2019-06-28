import copy
import csv
import itertools
import json
import lzma
import random

import re
from queue import Queue
from threading import Thread

import rocksdb
import tempfile
import traceback
from contextlib import ExitStack, contextmanager
from heapq import merge
from collections import Counter, defaultdict, OrderedDict
from multiprocessing import Process, Manager
from multiprocessing.pool import Pool

import nltk
import redis_lock
from celery import shared_task
from django.conf import settings
from django.core.management.color import no_style
from django.db import connections, router
from django.db.models import Q
from tqdm import tqdm

from capdb.models import Jurisdiction, CaseMetadata, NgramObservation, Ngram, NgramWord, CaseBodyCache
from scripts.helpers import ordered_query_iterator
from capdb.storages import ngram_storage, redis_client, ngram_kv_store, ngram_kv_store_full, KVDB, \
    ngram_kv_store_full_ro

nltk.data.path = settings.NLTK_PATH
unicode_translate_table = dict((ord(a), ord(b)) for a, b in zip(u'\u201c\u201d\u2018\u2019', u'""\'\''))
ingest_threshold = settings.NGRAM_INGEST_THRESHOLD  # minimum gram occurrences across dataset to be loaded into database

# custom tokenizer to disable separating contractions and possessives into separate words
tokenizer = copy.copy(nltk.tokenize._treebank_word_tokenizer)
tokenizer.CONTRACTIONS2 = tokenizer.CONTRACTIONS3 = []
tokenizer.ENDING_QUOTES = tokenizer.ENDING_QUOTES[:-2]

strip_chars = """`~!@#$%^&*()-_=+[{]}\|;:'",<>/?¡°¿‡†—•■"""
strip_right_chars = strip_chars + "£$©"
strip_left_chars = strip_chars + ".®"

# def has_alphanum(s):
#     """
#         Return True if s has at least one alphanumeric character in any language.
#         See https://en.wikipedia.org/wiki/Unicode_character_property#General_Category
#     """
#     for c in s:
#         category = unicodedata.category(c)[0]
#         if category == 'L' or category == 'N':
#             return True
#     return False

def tokenize(text):
    # clean up input
    text = text.translate(unicode_translate_table)\
        .replace(u"\u2014", u" \u2014 ")  # add spaces around m-dashes

    # yield each valid token
    for sentence in nltk.sent_tokenize(text):
        for token in tokenizer.tokenize(sentence):
            token = token.lower().rstrip(strip_right_chars).lstrip(strip_left_chars)
            if token:
                yield token

def ngrams(words, n, padding=False):
    """
        Yield generator of all n-tuples from list of words.
        This approach uses more RAM but is faster than nltk.ngrams, which doesn't immediately consume the generator.
    """
    words = list(words)
    if padding:
        word_lists = [words[i:] for i in range(n)]
    else:
        word_lists = [words[i:-n+i+1 or None] for i in range(n)]
    return zip(*word_lists)

def sort_counts(counts):
    count_pairs = zip(sorted(counts['instances'].items()), sorted(counts['documents'].items()))
    for instance_count, document_count in count_pairs:
        yield (instance_count[0], str(instance_count[1]), str(document_count[1]))

@contextmanager
def get_writer_for_path(out_path):
    """
        Remove existing file at out_path, and return spooled writer that will compress written bytes and write them to
        out_path.
    """
    if ngram_storage.exists(out_path):
        ngram_storage.delete(out_path)
    with tempfile.SpooledTemporaryFile(100 * 2 ** 20) as out_raw:
        with lzma.open(out_raw, "w") as out:
            yield out
        out_raw.seek(0)
        ngram_storage.save(out_path, out_raw)

@contextmanager
def read_write_totals():
    """
        - Use a redis lock to ensure that only one process accesses totals.json at a time.
        - Read contents of totals.json and yield.
        - Save updated contents back to totals.json file.

        Example:
        >>> with read_write_totals() as totals: \
                totals['foo'] = 'bar'
    """
    lock = redis_lock.Lock(redis_client, "ngrams-totals-lock", expire=10)
    if lock.acquire(timeout=5):
        try:
            try:
                original_contents = ngram_storage.contents('totals.json')
            except FileNotFoundError:
                original_contents = "{}"
            totals = json.loads(original_contents)
            yield totals
            new_contents = json.dumps(totals, indent=4)
            if new_contents != original_contents:
                with ngram_storage.open('totals.json', 'w') as out:
                    out.write(new_contents)
        finally:
            lock.release()
    else:
        raise Exception("Failed to acquire ngrams-totals-lock within 10 seconds")

def get_totals_key(jurisdiction_id, year, n):
    return b"totals" + KVDB.pack((jurisdiction_id, year, n))

def ngram_jurisdictions_rocksdb(slug=None, max_n=3):
    """
        Add jurisdiction specified by slug to rocksdb, or all jurisdictions if name not provided.

        This is the primary ngrams entrypoint. It spawns NGRAM_THREAD_COUNT worker processes to
        ngram each jurisdiction-year, plus a rocksdb worker process that pulls their work off of
        the queue and writes it to the database.
    """
    # process pool of workers to ngram each jurisdiction-year and return keys
    ngram_workers = Pool(settings.NGRAM_THREAD_COUNT, maxtasksperchild=1)

    # inter-process queue of returned keys
    m = Manager()
    queue = m.Queue(settings.NGRAM_THREAD_COUNT)
    ngram_worker_offsets = m.dict()
    ngram_worker_lock = m.Lock()

    # process to write keys to rocksdb
    rocksdb_loaded = m.Condition()
    rocksdb_worker = Process(target=rocksdb_writer, args=(queue, rocksdb_loaded))
    rocksdb_worker.start()
    with rocksdb_loaded:
        rocksdb_loaded.wait()

    # queue each jurisdiction-year for processing
    jurisdictions = Jurisdiction.objects.all()
    if slug:
        jurisdictions = jurisdictions.filter(slug=slug)
    ngram_worker_results = []
    for jurisdiction in jurisdictions:

        # skip empty jurisdictions
        if not jurisdiction.case_metadatas.exists():
            continue

        # get year range
        case_query = CaseMetadata.objects.in_scope().filter(jurisdiction_slug=jurisdiction.slug)
        first_year = case_query.order_by('decision_date', 'id').first().decision_date.year
        last_year = case_query.order_by('-decision_date', '-id').first().decision_date.year

        # ngram each year
        for year in range(first_year, last_year + 1):
            # ngram_worker(queue, jurisdiction_id, year, max_n)
            ngram_worker_results.append((jurisdiction.slug, year, ngram_workers.apply_async(ngram_worker, (ngram_worker_offsets, ngram_worker_lock, queue, jurisdiction.id, jurisdiction.slug, year, max_n))))

    # wait for all ngram workers to finish
    ngram_workers.close()
    ngram_workers.join()

    # report failures
    for jurisdiction_slug, year, result in ngram_worker_results:
        if not result._success:
            exc = result._value
            print("%s-%s failed:" % (jurisdiction_slug, year))
            traceback.print_exception(etype=type(exc), value=exc, tb=exc.__traceback__)

    # tell rocksdb worker to exit, and wait for it to finish
    queue.put('STOP')
    rocksdb_worker.join()

def ngram_worker(ngram_worker_offsets, ngram_worker_lock, queue, jurisdiction_id, jurisdiction_slug, year, max_n):
    """
        Worker process to generate all ngrams for the given jurisdiction-year and add them to the queue.
    """
    # skip reindexing jurisdiction-year combinations that already have ngrams
    if ngram_kv_store_full_ro.get(get_totals_key(jurisdiction_id, year, 3)):
        return

    # tqdm setup -- add an offset based on current process index, plus space for rocksdb worker
    desc = "%s-%s" % (jurisdiction_slug, year)
    with ngram_worker_lock:
        line_offset = next((i for i in range(settings.NGRAM_THREAD_COUNT) if i not in ngram_worker_offsets), None)
        if line_offset is None:
            line_offset = random.shuffle(ngram_worker_offsets.keys())[0]
        ngram_worker_offsets[line_offset] = True
    pos = 2 + settings.NGRAM_THREAD_COUNT + line_offset

    # count words for each case
    counters = {n: {'total_tokens':0, 'total_documents':0, 'instances': Counter(), 'documents': Counter()} for n in range(1, max_n + 1)}
    queryset = CaseBodyCache.objects.filter(
        metadata__duplicative=False, metadata__jurisdiction__isnull=False, metadata__court__isnull=False,
        metadata__decision_date__year=year, metadata__jurisdiction_slug=jurisdiction_slug
    ).only('text').order_by('id')
    for case_text in tqdm(ordered_query_iterator(queryset), desc="Ngram %s" % desc, position=pos, mininterval=.5):
        tokens = list(tokenize(case_text.text))
        for n in range(1, max_n + 1):
            grams = list(' '.join(gram) for gram in ngrams(tokens, n))
            counters[n]['total_tokens'] = counters[n].setdefault('total_tokens', 0) + len(grams)
            counters[n]['total_documents'] = counters[n].setdefault('total_documents', 0) + 1
            counters[n]['instances'].update(grams)
            counters[n]['documents'].update(set(grams))

    # enqueue data for rocksdb
    storage_year = year - 1900
    for n, counts in counters.items():

        # skip storing jurisdiction-year combinations that already have ngrams
        totals_key = get_totals_key(jurisdiction_id, year, n)
        if ngram_kv_store_full_ro.get(totals_key):
            print(" - Length %s already in totals" % n)
            continue

        # set up values for use by rocksdb_write_thread()
        totals = (totals_key, [counts['total_tokens'], counts['total_documents']])
        merge_value_prefix = (jurisdiction_id, storage_year)

        # prepare list of all ngram observations to be merged into rocksdb, in the form:
        #   merges = [
        #     (b'<n><gram>': (<instance count>, <document count>)), ...
        #   ]
        key_prefix = bytes([int(n)])
        count_pairs = zip(sorted(counts['instances'].items()), sorted(counts['documents'].items()))
        merges = [(key_prefix+gram.encode('utf8'), (instance_count, document_count)) for (gram, instance_count), (_, document_count) in count_pairs]

        queue.put((totals, merge_value_prefix, merges))

    del ngram_worker_offsets[line_offset]

def rocksdb_writer(queue, rocksdb_loaded):
    """
        Worker process to pull ngrams off of the queue and add them to a second internal queue for writing to rocksdb.
        This spawns NGRAM_THREAD_COUNT threads to do the actual writing.
    """
    # make sure the database exists; read-only clients in ngram_worker() will choke if it doesn't
    ngram_kv_store_full.get(b'init')
    with rocksdb_loaded:
        rocksdb_loaded.notify_all()

    # NOTE: the following is a lower-level way to do something we could just do with multiprocessing.ThreadPool.
    # Unfortunately ThreadPool doesn't let us set a max queue size for adding tasks to the queue, which is needed for backpressure.

    # start an internal queue and threads to read from it
    internal_queue = Queue(settings.NGRAM_THREAD_COUNT)
    threads = []
    for i in range(settings.NGRAM_THREAD_COUNT):
        t = Thread(target=rocksdb_write_thread, args=(internal_queue,))
        t.start()
        threads.append(t)

    # pull all items off of the inter-process queue and onto the internal queue
    for item in tqdm(iter(queue.get, 'STOP'), position=0, desc="Jurisdiction-years written", mininterval=.5):
        internal_queue.put(item)

    # block until all tasks are done
    internal_queue.join()

    # stop worker threads
    for i in range(settings.NGRAM_THREAD_COUNT):
        internal_queue.put(None)
    for t in threads:
        t.join()

def rocksdb_write_thread(queue):
    """
        Worker thread to write ngrams to rocksdb, spawned by rocksdb_writer.
    """
    while True:
        try:
            # fetch items until 'None' is added to queue
            item = queue.get()
            if item is None:
                break
            totals, merge_value_prefix, merges = item

            # skip storing jurisdiction-year combinations that already have ngrams
            if ngram_kv_store_full.get(totals[0]):
                continue

            # write in a batch so writes succeed or fail as a group
            batch = rocksdb.WriteBatch()

            # write each ngram, in the form (b'<n><gram>', pack(<jurisdiction_id>, <year>, <instance_count>, <document_count>))
            # see ngram_kv_store_full.NgramMergeOperator for how this value is merged into the existing b'<n><gram>' key
            for k, v in tqdm(merges, desc="Current write job", mininterval=.5):
                ngram_kv_store_full.merge(k, merge_value_prefix+v, packed=True, batch=batch)

            # write totals value
            ngram_kv_store_full.put(totals[0], totals[1], packed=True, batch=batch)

            # write batch
            ngram_kv_store_full.db.write(batch)
        finally:
            # let internal_queue.join() know not to wait for this job to complete
            queue.task_done()
            

def ngram_jurisdictions(slug=None, replace_existing=False):
    """
        Call ngram_jurisdiction() for jurisdiction with given name, or all jurisdictions if name not provided.
        If replace_existing is true, will overwrite existing ngram files.
    """
    jurisdictions = Jurisdiction.objects.all()
    if slug:
        jurisdictions = jurisdictions.filter(slug=slug)
    for jurisdiction in jurisdictions:
        ngram_jurisdiction.delay(jurisdiction.pk, replace_existing)

@shared_task
def ngram_jurisdiction(jurisdiction_id, replace_existing=False, max_n=3):
    """
        For given jurisdiction, extract all ngrams up to max_n.
        Write ngrams to ngram_storage with paths like "jurisdiction_year/mass_2018-1.tsv.xz"
        Each file is an xzipped tsv with the columns "gram", "instances", and "documents"
        For each file, an entry is added to "totals.json" like:
            {
                "jurisdiction_year/mass_2018-1.tsv.xz": {
                    "grams": <gram count>,
                    "documents": <document count>
                }
            }
    """
    # get jurisdiction
    jurisdiction = Jurisdiction.objects.get(pk=jurisdiction_id)
    print("Ngramming %s" % jurisdiction)
    if not jurisdiction.case_metadatas.exists():
        print("- No cases for %s" % jurisdiction)
        return  # no cases for jurisdiction

    # get year range
    case_query = CaseMetadata.objects.in_scope().filter(jurisdiction_slug=jurisdiction.slug)
    first_year = case_query.order_by('decision_date', 'id').first().decision_date.year
    last_year = case_query.order_by('-decision_date', '-id').first().decision_date.year

    # load totals variable if needed
    if not replace_existing:
        with read_write_totals() as totals:
            pass

    # ngram each year
    for year in range(first_year, last_year+1):

        out_stem = "jurisdiction_year/%s_%s" % (jurisdiction.slug, year)
        print("- Ngramming %s" % out_stem)

        # optionally skip reindexing jurisdiction-year combinations that already have ngrams
        if not replace_existing:
            if settings.ROCKSDB_FEATURE:
                if ngram_kv_store_full.get(b"totals"+ngram_kv_store_full.pack((jurisdiction_id,year,1))):
                    print(" - Already in totals")
                    continue
            else:
                if any(key.startswith(out_stem) for key in totals):
                    print(" - %s already in totals.json" % out_stem)
                    continue

        ngram_jurisdiction_year.delay(jurisdiction_id, year, out_stem, replace_existing, max_n)

@shared_task
def ngram_jurisdiction_year(jurisdiction_id, year, out_stem, replace_existing=False, max_n=3):
    print("- Ngramming %s" % out_stem)

    # optionally skip reindexing jurisdiction-year combinations that already have ngrams
    if not replace_existing:
        if settings.ROCKSDB_FEATURE:
            if ngram_kv_store_full.get(b"totals"+ngram_kv_store_full.pack((jurisdiction_id,year,1))):
                print(" - Already in totals")
                return
        else:
            with read_write_totals() as totals:
                if any(key.startswith(out_stem) for key in totals):
                    print(" - %s already in totals.json" % out_stem)
                    return

    # count words for each case
    counters = defaultdict(lambda: defaultdict(Counter))
    queryset = CaseBodyCache.objects.filter(
        metadata__duplicative=False, metadata__jurisdiction__isnull=False, metadata__court__isnull=False,
        metadata__decision_date__year=year, metadata__jurisdiction_id=jurisdiction_id
    ).only('text').order_by('id')
    for case_text in ordered_query_iterator(queryset):
        tokens = list(tokenize(case_text.text))
        for n in range(1, max_n + 1):
            grams = list(' '.join(gram) for gram in ngrams(tokens, n))
            counters[n]['total_tokens'] = counters[n].setdefault('total_tokens', 0) + len(grams)
            counters[n]['total_documents'] = counters[n].setdefault('total_documents', 0) + 1
            counters[n]['instances'].update(grams)
            counters[n]['documents'].update(set(grams))

    # no cases for this year
    if not counters:
        print(" - No cases for %s" % out_stem)
        return

    # export files
    storage_year = year - 1900
    for n, counts in counters.items():
        if settings.ROCKSDB_FEATURE:
            # write each ngram to kv store
            # see ngram_kv_store_full.merge for details of the merge algorithm
            with ngram_kv_store_full.in_transaction():
                count_pairs = zip(sorted(counts['instances'].items()), sorted(counts['documents'].items()))
                key_prefix = bytes([int(n)])
                for instance_count, document_count in count_pairs:
                    key = key_prefix + bytes(instance_count[0], 'utf8')
                    instance_count, document_count = instance_count[1], document_count[1]
                    value = (jurisdiction_id, storage_year, instance_count, document_count)
                    ngram_kv_store_full.merge(key, value, packed=True)

                # add totals to "totals" key
                ngram_kv_store_full.put(
                    b"totals"+ngram_kv_store_full.pack((jurisdiction_id,year,n)),
                    [counts['total_tokens'], counts['total_documents']],
                    packed=True)

        else:
            # write ngram file (e.g. jurisdiction_year/mass_2018-1.tsv.xz)
            out_path = out_stem + '-%s.tsv.xz' % n
            with get_writer_for_path(out_path) as out:
                out.write(bytes("gram\tinstances\tdocuments\n", 'utf8'))
                count_pairs = zip(sorted(counts['instances'].items()), sorted(counts['documents'].items()))
                for instance_count, document_count in count_pairs:
                    out.write(
                        bytes(instance_count[0] + "\t" + str(instance_count[1]) + "\t" + str(document_count[1]) + "\n",
                              'utf8'))

            # add totals to totals.json file
            with read_write_totals() as totals:
                totals[out_path] = {'grams': counts['total_tokens'], 'documents': counts['total_documents']}


@contextmanager
def read_xz(path):
    """
        Open ngram xz from ngram_storage.
        File should be a .tsv.xz with the header "gram\tinstances\tdocuments".
        Header will be removed before file handle is returned.
    """
    with ngram_storage.open(path, 'rb') as in_raw, lzma.open(in_raw) as in_file:
        next(in_file)
        yield in_file

@contextmanager
def read_xzs(paths):
    """
        Return read_xz(path) for all paths.
    """
    with ExitStack() as stack:
        # Wrap in iter() so merge() will work
        yield [iter(stack.enter_context(read_xz(path))) for path in paths]

def merge_files(paths, out_path):
    """
        Merge a list of ngram files into a single file written to out_path.
        Each file is formatted as in ngram_jurisdiction().
        Combined total counts are written to totals.json.
    """

    # open output file for writing
    with get_writer_for_path(out_path) as out, read_xzs(paths) as files:

        # track value of each previous line so we can combine counts
        last_gram = last_instances = last_documents = None

        # write header
        out.write(bytes("gram\tinstances\tdocuments\n", 'utf8'))

        # read sorted lines in merged order
        for line in tqdm(merge(*files)):

            gram, instances, documents = line[:-1].split(b'\t')
            instances = int(instances)
            documents = int(documents)

            # if line has same gram as previous line, merge into previous counts and move on
            if gram == last_gram:
                last_instances = last_instances + instances
                last_documents = last_documents + documents
                continue

            # write out previous line
            if last_gram:
                out.write(last_gram+b"\t"+bytes(str(last_instances), 'utf8')+b"\t"+bytes(str(last_documents), 'utf8')+b"\n")

            # start accumulating current line
            last_gram = gram
            last_instances = instances
            last_documents = documents

        # write out final line (which may have been accumulated but not written)
        out.write(last_gram+b"\t"+bytes(str(last_instances), 'utf8')+b"\t"+bytes(str(last_documents), 'utf8')+b"\n")

    # add totals to totals.json file
    with read_write_totals() as totals:
        file_totals = [totals[filename] for filename in paths]
        totals[out_path] = {
            'grams': sum(i['grams'] for i in file_totals),
            'documents': sum(i['documents'] for i in file_totals),
        }

def merge_jurisdiction_years():
    """
        Merge all ngram files in ngram_storage/jurisdiction_year/*.tsv.xz into one file per year
        Store outputs in ngram_storage/year/*.tsv.xz
    """
    # read all file names from ngram_storage/jurisdiction_year/
    paths = sorted(ngram_storage.iter_files('jurisdiction_year'))

    # parse file names and group by {'<year>-<n>': ['<path>', '<path>']}
    groups = defaultdict(list)
    for path in paths:
        if not path.endswith('.tsv.xz'):
            continue
        year_n = path.rsplit('_')[-1].split('.')[0]  # extract "2018-1" from "jurisdiction_year/mass_2018-1.tsv.xz"
        groups[year_n].append(path)

    # write merged file per year_n to ngram_storage/year/
    for year_n, paths in groups.items():
        out_path = "year/%s.tsv.xz" % year_n
        print("Merging %s files into %s" % (len(paths), out_path))
        merge_files(paths, out_path)


def merge_total():
    """
        Merge all ngram files in ngram_storage/year/*.tsv.xz into one file per ngram length
        Store outputs in ngram_storage/total/*.tsv.xz
    """
    # read all file names from ngram_storage/year/
    paths = sorted(ngram_storage.iter_files('year'))

    # parse file names and group by ngram length: {'<n>': ['<path>', '<path>']}
    groups = defaultdict(list)
    for path in paths:
        if not path.endswith('.tsv.xz'):
            continue
        n = int(path.rsplit('-')[-1].split('.')[0])
        groups[n].append(path)

    # write merged file per n to ngram_storage/total/
    for n, paths in groups.items():
        out_path = "total/total-%s.tsv.xz" % n
        print("Merging %s files into %s" % (len(paths), out_path))
        merge_files(paths, out_path)

def conn_for_model(model):
    """ Return database connection for a given model. """
    return connections[router.db_for_write(model)]

def truncate(model):
    """
        DELETE all data for given model and ALL TABLES WITH FOREIGN KEYS TO IT.
        PLEASE THINK THREE TIMES BEFORE USING THIS FUNCTION.
    """
    conn_for_model(model).cursor().execute('TRUNCATE TABLE "{0}" CASCADE'.format(model._meta.db_table))

def postgres_copy(model, fields, rows):
    """
        Write data to a temp CSV and send to postgres using the COPY command.
    """
    # prepare csv to write to postgres
    with tempfile.SpooledTemporaryFile(max_size=2**30, mode='w+') as tmp:
        tmp_csv = csv.writer(tmp)
        tmp_csv.writerow(fields)
        tmp_csv.writerows(rows)
        tmp.flush()
        tmp.seek(0)

        # send csv
        connection = conn_for_model(model)
        cursor = connection.cursor()
        sql = "COPY %s (%s) FROM STDIN ENCODING 'UTF8' CSV HEADER" % (model._meta.db_table, ", ".join(fields))
        cursor.copy_expert(sql, tmp)

        # update auto-increment sequences
        connection.ops.sequence_reset_sql(no_style(), [model])

def load_database():
    """
        Load all ngram data from ngram_storage into the NgramWord, Ngram, and NgramObservation tables.
    """

    # wipe everything
    # truncate(NgramObservation)
    # truncate(Ngram)
    # truncate(NgramWord)

    ### populate NgramWord ###
    # use the total-1.tsv.xz file to populate NgramWord each word that we know about
    print("Ingesting NgramWords")
    if NgramWord.objects.exists():
        print(" - Skipping; NgramWord objects already exist")
    else:
        with read_xz('total/total-1.tsv.xz') as in_file:
            words = ([line.split(b'\t', 1)[0].decode('utf8')] for line in in_file)
            postgres_copy(NgramWord, ['word'], words)

    ### populate Ngram ###
    # Use total-1.tsv.xz, total-2.tsv.xz, and total-3.tsv.xz to populate Ngram with each distinct ngram we know about
    # Filter out those with frequency below ingest_total
    print("Ingesting Ngram")
    if Ngram.objects.exists():
        print(" - Skipping; Ngram objects already eixst")
        word_lookup = {bytes(word, 'utf8'): id for word, id in NgramWord.objects.exclude(w1=None).values_list('word', 'pk')}
    else:
        word_lookup = {bytes(word, 'utf8'): id for word, id in NgramWord.objects.values_list('word', 'pk')}
        def ngrams_iter():
            """ Yield [<wordID>, <wordID>, <wordID>] for each gram in each totals file, padding with None for shorter grams. """
            for i in range(1, 4):
                with read_xz('total/total-%s.tsv.xz' % i) as in_file:
                    for line in tqdm(in_file):
                        gram, instances, documents = line.split(b'\t')
                        if int(instances) < ingest_threshold:
                            # when filtering out 1-grams, also remove them from word_lookup so we can skip them when
                            # ingesting single observations later
                            if i == 1:
                                del word_lookup[gram]
                            continue
                        # look up word IDs from word_lookup
                        word_ids = [word_lookup[word] for word in line.split(b'\t', 1)[0].split(b' ')]
                        # pad shorter grams with None
                        word_ids += [None] * (3-i)
                        yield word_ids
        postgres_copy(Ngram, ['w1_id', 'w2_id', 'w3_id'], ngrams_iter())

    ### populate NgramObservation ###
    print("Ingesting NgramObservation")

    # First we build up a list of all files in ngram_storage that have ngrams in them, along with their year
    # (or None if no year) and jurisdiction (or None if no jurisdiction). Data is parsed out of the filenames.
    path_year_jurs = []
    jurisdiction_lookup = dict(Jurisdiction.objects.values_list('slug', 'pk'))
    for path in ngram_storage.iter_files_recursive():
        # handle "jurisdiction_year/ill_1887-1.tsv.xz"
        m = re.match(r'jurisdiction_year/([^/]+)_(\d{4})-[123]\.tsv\.xz', path)
        if m:
            path_year_jurs.append([path, int(m.group(2)), jurisdiction_lookup[m.group(1)]])
            continue

        # handle "year/1887-1.tsv.xz"
        m = re.match(r'year/(\d{4})-[123]\.tsv\.xz', path)
        if m:
            path_year_jurs.append([path, int(m.group(1)), None])
            continue

        # handle "total/total-1.tsv.xz"
        m = re.match(r'total/total-[123].tsv.xz', path)
        if m:
            path_year_jurs.append([path, None, None])

    # Next we're going to read all files together, merging lines in alphabetical order so we can handle all observations
    # for a given gram at the same time. This reduces queries on the Ngram table as we go along.

    # Open all files:
    with read_xzs(p[0] for p in path_year_jurs) as files:

        # turn each file handle into an iterator to yield its index in path_year_jurs and line
        def iter_with_n(iter, n):
            for item in iter:
                yield item, n
        file_iters = [iter_with_n(f, path_index) for path_index, f in enumerate(files)]

        # merge all files alphabetically
        extra = []
        batch_size = 100000
        line_iter = tqdm(merge(*file_iters))

        # If some NgramObservation objects already exist, fetch the ngram of the last object, and skip past that one
        # in the line_iter stream.
        if NgramObservation.objects.exists():
            last_gram = str(NgramObservation.objects.order_by('-pk').first().ngram).encode('utf8')
            print(" - Some NgramObservation objects already exist. Skipping all grams through %s" % last_gram)
            for line in line_iter:
                if line[0].split(b'\t', 1)[0] > last_gram:
                    # store the final line in extra so it gets processed
                    extra = [line]
                    break

        # Run this loop for each batch of batch_size lines. We're going to read the lines; group them by gram;
        # efficiently fetch Ngram IDs for all grams in the batch; and then write all observations from the batch
        # with a postgres COPY.
        while True:

            # fetch a batch of lines
            lines = extra + list(itertools.islice(line_iter, batch_size))
            if not lines:
                break

            # peel off last gram and save for next batch, so we don't split up grams.
            # this makes sure that it's safe to filter out grams that fall below ingest_threshold
            extra = [lines.pop()]
            last_gram = extra[0][0].split(b'\t', 1)[0]
            while lines and lines[-1][0].split(b'\t', 1)[0] == last_gram:
                extra.append(lines.pop())
            if not lines:
                lines = extra
                extra = []

            # organize all lines from this chunk into a data structure like
            # grams = {
            #      (<wordID>, <wordID>, <wordID>): {
            #           'count': <total instances>,
            #           'entries': [
            #                [<instance count>, <document count>, <year>, <jurisdictionID],
            #           ]})}
            grams = OrderedDict()  # make sure of ordering so grams go into db in alphabetical order
            for line, path_index in lines:

                gram, instances, documents = line.split(b'\t')
                instances = int(instances)
                documents = int(documents)

                # look up word IDs
                try:
                    words = tuple(word_lookup[word] for word in gram.split(b' '))
                except KeyError:
                    # gram has a word below the threshold -- skip
                    continue

                # pad with None for 1- or 2-grams
                words += (None,) * (3-len(words))

                # add to grams dict
                grams.setdefault(words, {'count': 0, 'entries': []})
                year, jur = path_year_jurs[path_index][1:]
                if year and jur:
                    grams[words]['count'] += instances
                grams[words]['entries'].append([instances, documents, year, jur])

            # filter out grams that fall below threshold
            grams = OrderedDict((k, v) for k, v in grams.items() if v['count'] >= ingest_threshold)

            # build tree of word IDs in this batch, like
            # tree = {
            #   <w1>: {
            #       <w2>: [<w3>, <w3>]
            # }}
            tree = defaultdict(lambda: defaultdict(list))
            for gram in grams.keys():
                tree[gram[0]][gram[1]].append(gram[2])

            # build SQL query from tree, like
            #   WHERE (w1 = <id> AND (w2 = <id> AND (w3 IN (<id>, <id>)))) OR (w1 = <id> AND ...)
            query = Q()
            for w1, w2s in tree.items():
                q2 = Q()
                for w2, w3s in w2s.items():
                    if w2:
                        w3s_no_null = [w for w in w3s if w]
                        q3 = Q(w3__in=w3s_no_null)
                        if len(w3s_no_null) < len(w3s):
                            q3 |= Q(w3=None)
                        q2 |= Q(w2=w2) & q3
                    else:
                        q2 |= Q(w2=None)
                query |= Q(w1=w1) & q2

            # use tree to create lookup table of Ngram IDs
            gram_lookup = {(w1, w2, w3): pk for w1, w2, w3, pk in Ngram.objects.filter(query).values_list('w1_id', 'w2_id', 'w3_id', 'pk')}

            # save all grams
            fields = ['ngram_id', 'instance_count', 'document_count', 'year', 'jurisdiction_id']
            rows = ([gram_lookup[words]]+entry for words, gram in grams.items() for entry in gram['entries'])
            postgres_copy(NgramObservation, fields, rows)

def parse_ngram_paths(paths):
    """
        Parse out jurisdiction id, year, and word length metadata from a list of ngram filepaths. E.g.:
        >>> parse_ngram_paths(['jurisdiction_year/ill_1887-1.tsz.xz', 'year/1887-1.tsv.xz', 'total/total-1.tsv.xz'])
        [
            {'jurisdiction_id': 29, 'length': '1', 'path': 'jurisdiction_year/ill_1887-1.tsv.xz', 'year': 1887},
            {'jurisdiction_id': None, 'length': '1', 'path': 'year/1887-1.tsv.xz', 'year': 1887},
            {'jurisdiction_id': None, 'length': '1', 'path': 'total/total-1.tsv.xz', 'year': None}
        ]
    """
    ngram_files = []
    for path in paths:
        # handle "jurisdiction_year/ill_1887-1.tsv.xz"
        m = re.match(r'jurisdiction_year/([^/]+)_(\d{4})-([123])\.tsv\.xz', path)
        if m:
            ngram_files.append({'path': path, 'year': int(m.group(2)), 'jurisdiction': m.group(1), 'length': m.group(3)})
            continue

        # handle "year/1887-1.tsv.xz"
        m = re.match(r'year/(\d{4})-([123])\.tsv\.xz', path)
        if m:
            ngram_files.append({'path': path, 'year': int(m.group(1)), 'jurisdiction': None, 'length': m.group(2)})
            continue

        # handle "total/total-1.tsv.xz"
        m = re.match(r'total/total-([123])\.tsv\.xz', path)
        if m:
            ngram_files.append({'path': path, 'year': None, 'jurisdiction': None, 'length': m.group(1)})
    return ngram_files

def seek_to_line(f, prefix):
    """
        Seek sorted file f to the beginning of the first line that is >= prefix.
        Via http://pts.github.io/pts-line-bisect/line_bisect_evolution.html
        >>> f = StringIO("aa\nbb\ncc\ndd\n")
        >>> seek_to_line(f, 'a'); f.readline()
        'aa\n'
        >>> seek_to_line(f, 'b'); f.readline()
        'bb\n'
        >>> seek_to_line(f, 'e'); f.readline()
        ''
    """
    f.seek(0, 2)  # Seek to EOF.
    size = f.tell()
    lo, hi = 0, size - 1
    midf = mid = None
    while lo < hi:
        mid = (lo + hi) >> 1
        if mid > 0:
            f.seek(mid - 1)  # Just to figure out where our line starts.
            f.readline()  # Ignore previous line, find our line.
            midf = f.tell()
        else:
            midf = 0
            f.seek(midf)
        line = f.readline()  # We read at f.tell() == midf.
        # EOF (`not line') is always larger than any line we search for.
        if not line or prefix <= line:
            hi = mid
        else:
            lo = mid + 1
    if mid == lo:
        f.seek(midf)
    elif lo <= 0:
        f.seek(0)
    else:
        f.seek(lo - 1)
        f.readline()

def load_kv_database():
    """
        Read all ngram text files and write them to LevelDB in settings.NGRAM_LEVELDB_PATH
    """

    # Get list of files to read and their metadata
    ngram_files = parse_ngram_paths(ngram_storage.iter_files_recursive())
    jurisdiction_lookup = dict(Jurisdiction.objects.values_list('slug', 'pk'))

    for ngram_file in ngram_files:
        # Subtract 1900 from all years, because msgpack stores numbers < 128 in a single byte. This removes a byte from
        # each observation we store for years 1900-2027
        if ngram_file['year'] is not None:
            ngram_file['year'] -= 1900

        # Translate jurisdiction slug to jurisdiction ID
        if ngram_file['jurisdiction'] is not None:
            ngram_file['jurisdiction'] = jurisdiction_lookup[ngram_file['jurisdiction']]

    # Read all files together, merging lines in alphabetical order so we can handle all observations
    # for a given gram at the same time. This reduces queries on the Ngram table as we go along.

    # Open all files:
    with read_xzs(p['path'] for p in ngram_files) as files:

        # If some NgramObservation objects already exist, fetch the ngram of the last object, and skip past that one
        # in the line_iter stream.
        last_gram = ngram_kv_store.last_key()
        if last_gram:
            last_gram = last_gram[1:]
            print(" - Some NgramObservation objects already exist. Skipping all grams through %s" % last_gram)
            for f in files:
                seek_to_line(f, last_gram)

        # turn each file handle into an iterator to yield its index in ngram_files and line
        def iter_with_n(iter, n):
            for item in iter:
                yield item, n
        file_iters = [iter_with_n(f, path_index) for path_index, f in enumerate(files)]

        # merge all files alphabetically
        extra = []
        batch_size = 100000
        line_iter = tqdm(merge(*file_iters))

        # Run this loop for each batch of batch_size lines. We're going to read the lines; group them by gram;
        # filter out those below the threshold; and write each gram to the KV store
        while True:

            # fetch a batch of lines
            lines = extra + list(itertools.islice(line_iter, batch_size))
            if not lines:
                break

            # peel off last gram and save for next batch, so we don't split up grams.
            # this makes sure that it's safe to filter out grams that fall below ingest_threshold
            extra = [lines.pop()]
            last_gram = extra[0][0].split(b'\t', 1)[0]
            while lines and lines[-1][0].split(b'\t', 1)[0] == last_gram:
                extra.append(lines.pop())
            if not lines:
                lines = extra
                extra = []

            # organize all lines from this chunk into a data structure like
            # grams = {
            #      b'<word count><gram>': {
            #           <jurisdiction_id>: {
            #               <year-1900>: [<instances>, <documents>],
            #       }})
            grams = defaultdict(lambda: defaultdict(list))
            below_threshold_grams = set()
            for line, path_index in lines:
                # set up variables for this line
                gram, instances, documents = line.split(b'\t')
                instances = int(instances)
                documents = int(documents)
                ngram_file = ngram_files[path_index]
                year = ngram_file['year']
                jur = ngram_file['jurisdiction']
                length = ngram_file['length']
                gram = bytes([int(length)])+gram

                # when we hit the total-count line, with no year and no jurisdiction, check the ingest_threshold
                # and delete this gram if it falls below the threshold
                if year is None and jur is None and instances < ingest_threshold:
                    below_threshold_grams.add(gram)
                    grams.pop(gram, None)
                    continue
                if gram in below_threshold_grams:
                    continue

                # store observation
                grams[gram][jur].extend([year, instances, documents])

            # write keys
            ngram_kv_store.put_batch(grams.items(), packed=True)
