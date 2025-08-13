import pytest
from app.graphql.crud.orderhistorydetails import create_orderhistorydetails, get_orderhistorydetails, update_orderhistorydetails, delete_orderhistorydetails
from app.graphql.schemas.orderhistorydetails import OrderHistoryDetailsCreate, OrderHistoryDetailsUpdate


def test_create_get_update_delete_orderhistorydetails(db_session):
    # Crear
    data = OrderHistoryDetailsCreate(Detail="Detalle Test")
    obj = create_orderhistorydetails(db_session, data)
    assert obj.Detail == "Detalle Test"
    # Obtener
    all_objs = get_orderhistorydetails(db_session)
    assert any(o.OrderHistoryDetailID ==
               obj.OrderHistoryDetailID for o in all_objs)
    # Actualizar
    update = OrderHistoryDetailsUpdate(Detail="Detalle Modificado")
    updated = update_orderhistorydetails(
        db_session, obj.OrderHistoryDetailID, update)
    assert updated.Detail == "Detalle Modificado"
    # Eliminar
    deleted = delete_orderhistorydetails(db_session, obj.OrderHistoryDetailID)
    assert deleted.OrderHistoryDetailID == obj.OrderHistoryDetailID
    assert all(o.OrderHistoryDetailID !=
               obj.OrderHistoryDetailID for o in get_orderhistorydetails(db_session))
