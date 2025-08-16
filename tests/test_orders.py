import pytest
from app.graphql.crud.orders import create_orders, get_orders, update_orders, delete_orders
from app.graphql.schemas.orders import OrdersCreate, OrdersUpdate


def test_create_get_update_delete_orders(db_session):
    # Crear
    data = OrdersCreate(OrderNumber="ORD001")
    obj = create_orders(db_session, data)
    assert obj.OrderNumber == "ORD001"
    # Obtener
    all_objs = get_orders(db_session)
    assert any(o.OrderID == obj.OrderID for o in all_objs)
    # Actualizar
    update = OrdersUpdate(OrderNumber="ORD002")
    updated = update_orders(db_session, obj.OrderID, update)
    assert updated.OrderNumber == "ORD002"
    # Eliminar
    deleted = delete_orders(db_session, obj.OrderID)
    assert deleted.OrderID == obj.OrderID
    assert all(o.OrderID != obj.OrderID for o in get_orders(db_session))
