# Generated by Django 2.0.10 on 2019-03-28 17:42

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('capdb', '0059_auto_20190305_1630'),
    ]

    operations = [
        migrations.CreateModel(
            name='CaseBodyCache',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(blank=True, null=True)),
                ('html', models.TextField(blank=True, null=True)),
                ('xml', models.TextField(blank=True, null=True)),
                ('json', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CaseFont',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('family', models.CharField(max_length=100)),
                ('size', models.CharField(max_length=100)),
                ('style', models.CharField(blank=True, max_length=100)),
                ('type', models.CharField(max_length=100)),
                ('width', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='CaseInitialMetadata',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField()),
                ('ingest_path', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='CaseStructure',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('opinions', django.contrib.postgres.fields.jsonb.JSONField()),
                ('corrections', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('ingest_path', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='PageStructure',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.SmallIntegerField()),
                ('label', models.CharField(blank=True, max_length=100)),
                ('blocks', django.contrib.postgres.fields.jsonb.JSONField()),
                ('spaces', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('font_names', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('encrypted_strings', models.TextField(blank=True, null=True)),
                ('image_file_name', models.CharField(max_length=100)),
                ('width', models.SmallIntegerField()),
                ('height', models.SmallIntegerField()),
                ('deskew', models.CharField(blank=True, max_length=1000)),
                ('ingest_path', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='TarFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('storage_path', models.CharField(max_length=1000)),
                ('hash', models.CharField(max_length=1000)),
            ],
        ),
        migrations.AddField(
            model_name='casemetadata',
            name='argument_date_original',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='casemetadata',
            name='district_abbreviation',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='casemetadata',
            name='district_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='casemetadata',
            name='docket_numbers',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='casemetadata',
            name='initial_metadata_synced',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='casemetadata',
            name='publication_status',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='citation',
            name='category',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='volumemetadata',
            name='xml_metadata',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='tarfile',
            name='volume',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='capdb.VolumeMetadata'),
        ),
        migrations.AddField(
            model_name='pagestructure',
            name='ingest_source',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='capdb.TarFile'),
        ),
        migrations.AddField(
            model_name='pagestructure',
            name='volume',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='page_structures', to='capdb.VolumeMetadata'),
        ),
        migrations.AddField(
            model_name='casestructure',
            name='ingest_source',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='capdb.TarFile'),
        ),
        migrations.AddField(
            model_name='casestructure',
            name='metadata',
            field=models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, related_name='structure', to='capdb.CaseMetadata'),
        ),
        migrations.AddField(
            model_name='casestructure',
            name='pages',
            field=models.ManyToManyField(related_name='cases', to='capdb.PageStructure'),
        ),
        migrations.AddField(
            model_name='caseinitialmetadata',
            name='case',
            field=models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, related_name='initial_metadata', to='capdb.CaseMetadata'),
        ),
        migrations.AddField(
            model_name='caseinitialmetadata',
            name='ingest_source',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='capdb.TarFile'),
        ),
        migrations.AddField(
            model_name='casebodycache',
            name='metadata',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='body_cache', to='capdb.CaseMetadata'),
        ),
    ]
