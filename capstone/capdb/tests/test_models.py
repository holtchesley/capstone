import pytest

from capdb.models import CaseMetadata
from scripts.helpers import parse_xml, serialize_xml


### CaseMetadata ###

@pytest.mark.django_db
def test_create_or_update_metadata(case_xml):
    # fetch current metadata
    case_metadata = CaseMetadata.objects.get(case_id=case_xml.case_id)

    # change xml
    parsed = parse_xml(case_xml.orig_xml)
    parsed('case|citation[category="official"]').text('123 Test 456')
    case_xml.orig_xml = serialize_xml(parsed)
    case_xml.save()
    case_xml.create_or_update_metadata()

    # fetch new metadata
    new_case_metadata = CaseMetadata.objects.get(case_id=case_xml.case_id)
    new_citations = list(new_case_metadata.citations.all())

    # case_metadata should have been updated, not duplicated
    assert new_case_metadata.pk == case_metadata.pk
    assert new_case_metadata.slug == '123-test-456'

    # citations should have been replaced
    assert len(new_citations) == 1
    assert new_citations[0].cite == '123 Test 456'

    # testing calling without updating metadata
    old_case_metadata = new_case_metadata
    case_xml.orig_xml = "Nothing to see here"
    case_xml.save()
    case_xml.refresh_from_db()
    case_xml.create_or_update_metadata(update_existing=False)
    new_case_metadata = CaseMetadata.objects.get(case_id=case_xml.case_id)
    assert new_case_metadata == old_case_metadata
