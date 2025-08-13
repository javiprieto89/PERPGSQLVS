import pytest
from app.graphql.crud.orderhistory import create_orderhistory, get_orderhistory, update_orderhistory, delete_orderhistory
from app.graphql.schemas.orderhistory import OrderHistoryCreate, OrderHistoryUpdate


def test_create_get_update_delete_orderhistory(db_session):
    # Crear
    data = OrderHistoryCreate(Status="Nuevo")
    obj = create_orderhistory(db_session, data)
    assert obj.Status == "Nuevo"
    # Obtener
    all_objs = get_orderhistory(db_session)
    assert any(o.OrderHistoryID == obj.OrderHistoryID for o in all_objs)
    # Actualizar
    update = OrderHistoryUpdate(Status="Cerrado")
    updated = update_orderhistory(db_session, obj.OrderHistoryID, update)
    assert updated.Status == "Cerrado"
    # Eliminar
    deleted = delete_orderhistory(db_session, obj.OrderHistoryID)
    assert deleted.OrderHistoryID == obj.OrderHistoryID
    assert all(o.OrderHistoryID !=
               obj.OrderHistoryID for o in get_orderhistory(db_session))
