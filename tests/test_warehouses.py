import pytest
from app.graphql.crud.warehouses import (
    create_warehouses,
    get_warehouses,
    update_warehouses,
    delete_warehouses,
)
from app.graphql.schemas.warehouses import WarehousesCreate, WarehousesUpdate


@pytest.mark.usefixtures("tenant_ids")
def test_create_get_update_delete_warehouses(db_session, tenant_ids):
    company_id, _ = tenant_ids
    data = WarehousesCreate(CompanyID=company_id,
                            WarehouseName="Depósito Test", Address="Dir 1")
    obj = create_warehouses(db_session, data)
    assert obj and obj.WarehouseName == "Depósito Test" and obj.CompanyID == company_id

    all_objs = get_warehouses(db_session)
    assert any(o.WarehouseID == obj.WarehouseID and o.CompanyID ==
               company_id for o in all_objs)

    update = WarehousesUpdate(WarehouseName="Depósito Modificado")
    updated = update_warehouses(
        db_session, obj.WarehouseID, update, company_id=company_id)
    assert updated and updated.WarehouseName == "Depósito Modificado"

    deleted = delete_warehouses(
        db_session, obj.WarehouseID, company_id=company_id)
    assert deleted and deleted.WarehouseID == obj.WarehouseID
    assert all(o.WarehouseID !=
               obj.WarehouseID for o in get_warehouses(db_session))
