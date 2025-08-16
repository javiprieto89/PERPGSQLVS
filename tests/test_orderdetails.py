import pytest
from app.graphql.crud.orderdetails import create_orderdetails, get_orderdetails, update_orderdetails, delete_orderdetails
from app.graphql.schemas.orderdetails import OrderDetailsCreate, OrderDetailsUpdate


def test_create_get_update_delete_orderdetails(db_session):
    # Crear
    # Usar IDs válidos según el volcado real
    data = OrderDetailsCreate(OrderID=6, ItemID=1, WarehouseID=1,
                              Quantity=1, UnitPrice=10.0, Description="desc test")
    obj = create_orderdetails(db_session, data)
    assert getattr(obj, "Quantity", None) == 1
    # Obtener
    all_objs = get_orderdetails(db_session)
    assert any(o.OrderDetailID == obj.OrderDetailID for o in all_objs)
    # Actualizar
    update = OrderDetailsUpdate(Quantity=2)
    updated = update_orderdetails(
        db_session, getattr(obj, "OrderDetailID", 1), update)
    assert updated and getattr(updated, "Quantity", None) == 2
    # Eliminar
    deleted = delete_orderdetails(db_session, getattr(obj, "OrderDetailID", 1))
    assert deleted and getattr(deleted, "OrderDetailID", None) == getattr(
        obj, "OrderDetailID", 1)
    assert all(getattr(o, "OrderDetailID", None) != getattr(
        obj, "OrderDetailID", 1) for o in get_orderdetails(db_session))
