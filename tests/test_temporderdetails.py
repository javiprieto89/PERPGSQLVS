import pytest
from app.graphql.crud.temporderdetails import create_temporderdetails, get_temporderdetails, update_temporderdetails, delete_temporderdetails
from app.graphql.schemas.temporderdetails import TempOrderDetailsCreate, TempOrderDetailsUpdate


def test_create_get_update_delete_temporderdetails(db_session):
    # Crear
    data = TempOrderDetailsCreate(Quantity=1)
    obj = create_temporderdetails(db_session, data)
    assert obj.Quantity == 1
    # Obtener
    all_objs = get_temporderdetails(db_session)
    assert any(o.TempOrderDetailID == obj.TempOrderDetailID for o in all_objs)
    # Actualizar
    update = TempOrderDetailsUpdate(Quantity=2)
    updated = update_temporderdetails(
        db_session, obj.TempOrderDetailID, update)
    assert updated.Quantity == 2
    # Eliminar
    deleted = delete_temporderdetails(db_session, obj.TempOrderDetailID)
    assert deleted.TempOrderDetailID == obj.TempOrderDetailID
    assert all(o.TempOrderDetailID !=
               obj.TempOrderDetailID for o in get_temporderdetails(db_session))
