import pytest
from app.graphql.crud.warehouses import create_warehouses, get_warehouses, update_warehouses, delete_warehouses
from app.graphql.schemas.warehouses import WarehousesCreate, WarehousesUpdate


def test_create_get_update_delete_warehouses(db_session):
    # Crear
    data = WarehousesCreate(WarehouseName="Depósito Test")
    obj = create_warehouses(db_session, data)
    assert obj.WarehouseName == "Depósito Test"
    # Obtener
    all_objs = get_warehouses(db_session)
    assert any(o.WarehouseID == obj.WarehouseID for o in all_objs)
    # Actualizar
    update = WarehousesUpdate(WarehouseName="Depósito Modificado")
    updated = update_warehouses(db_session, obj.WarehouseID, update)
    assert updated.WarehouseName == "Depósito Modificado"
    # Eliminar
    deleted = delete_warehouses(db_session, obj.WarehouseID)
    assert deleted.WarehouseID == obj.WarehouseID
    assert all(o.WarehouseID !=
               obj.WarehouseID for o in get_warehouses(db_session))
