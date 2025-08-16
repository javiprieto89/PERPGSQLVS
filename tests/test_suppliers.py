import pytest
from app.graphql.crud.suppliers import create_suppliers, get_suppliers, update_suppliers, delete_suppliers
from app.graphql.schemas.suppliers import SuppliersCreate, SuppliersUpdate


def test_create_get_update_delete_suppliers(db_session):
    # Crear
    data = SuppliersCreate(SupplierName="Proveedor Test")
    obj = create_suppliers(db_session, data)
    assert obj.SupplierName == "Proveedor Test"
    # Obtener
    all_objs = get_suppliers(db_session)
    assert any(o.SupplierID == obj.SupplierID for o in all_objs)
    # Actualizar
    update = SuppliersUpdate(SupplierName="Proveedor Modificado")
    updated = update_suppliers(db_session, obj.SupplierID, update)
    assert updated.SupplierName == "Proveedor Modificado"
    # Eliminar
    deleted = delete_suppliers(db_session, obj.SupplierID)
    assert deleted.SupplierID == obj.SupplierID
    assert all(o.SupplierID != obj.SupplierID for o in get_suppliers(db_session))
