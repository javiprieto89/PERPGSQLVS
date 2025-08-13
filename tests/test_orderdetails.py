import pytest
from app.graphql.crud.orderdetails import create_orderdetails, get_orderdetails, update_orderdetails, delete_orderdetails
from app.graphql.schemas.orderdetails import OrderDetailsCreate, OrderDetailsUpdate


def test_create_get_update_delete_orderdetails(db_session):
    # Crear
    data = OrderDetailsCreate(Quantity=1)
    obj = create_orderdetails(db_session, data)
    assert obj.Quantity == 1
    # Obtener
    all_objs = get_orderdetails(db_session)
    assert any(o.OrderDetailID == obj.OrderDetailID for o in all_objs)
    # Actualizar
    update = OrderDetailsUpdate(Quantity=2)
    updated = update_orderdetails(db_session, obj.OrderDetailID, update)
    assert updated.Quantity == 2
    # Eliminar
    deleted = delete_orderdetails(db_session, obj.OrderDetailID)
    assert deleted.OrderDetailID == obj.OrderDetailID
    assert all(o.OrderDetailID !=
               obj.OrderDetailID for o in get_orderdetails(db_session))
