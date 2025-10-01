import pytest
from datetime import datetime, timezone
from app.graphql.crud.pricelists import (
    create_pricelists,
    get_pricelists,
    update_pricelists,
    delete_pricelists,
)
from app.graphql.schemas.pricelists import PriceListsCreate, PriceListsUpdate


@pytest.mark.usefixtures("tenant_ids")
def test_create_get_update_delete_pricelists(db_session, tenant_ids):
    company_id, _ = tenant_ids
    data = PriceListsCreate(
        CompanyID=company_id,
        PriceListName="Lista Test",
        PriceListDescription="desc",
        IsActive=True,
        CreatedDate=datetime(2025, 8, 16, 0, 0, 0, tzinfo=timezone.utc),
    )
    obj = create_pricelists(db_session, data)
    assert obj and obj.PriceListName == "Lista Test" and obj.CompanyID == company_id

    all_objs = get_pricelists(db_session)
    assert any(o.PriceListID == obj.PriceListID and o.CompanyID == company_id for o in all_objs)

    update = PriceListsUpdate(PriceListName="Lista Modificada")
    updated = update_pricelists(db_session, company_id, obj.PriceListID, update)
    assert updated and updated.PriceListName == "Lista Modificada"

    deleted = delete_pricelists(db_session, company_id, obj.PriceListID)
    assert deleted and deleted.PriceListID == obj.PriceListID
    assert all(o.PriceListID != obj.PriceListID for o in get_pricelists(db_session))