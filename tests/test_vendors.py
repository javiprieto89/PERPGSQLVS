from datetime import datetime, timezone
import pytest
from app.graphql.crud.vendors import create_vendors, get_vendors, update_vendors, delete_vendors
from app.graphql.schemas.vendors import VendorsCreate, VendorsUpdate


def test_create_get_update_delete_vendors(db_session):
    # Crear
    data = VendorsCreate(VendorName="Vendedor Test")
    obj = create_vendors(db_session, data)
    assert obj.VendorName == "Vendedor Test"
    # Obtener
    all_objs = get_vendors(db_session)
    assert any(o.VendorID == obj.VendorID for o in all_objs)
    # Actualizar
    update = VendorsUpdate(VendorName="Vendedor Modificado")
    updated = update_vendors(db_session, obj.VendorID, update)
    assert updated.VendorName == "Vendedor Modificado"
    # Eliminar
    deleted = delete_vendors(db_session, obj.VendorID)
    assert deleted.VendorID == obj.VendorID
    assert all(o.VendorID != obj.VendorID for o in get_vendors(db_session))