import pytest
from app.graphql.crud.orders import create_orders, get_orders, update_orders, delete_orders
from app.graphql.schemas.orders import OrdersCreate, OrdersUpdate


def test_create_get_update_delete_orders(db_session):
    # Crear con todos los campos obligatorios y FKs válidas
    from datetime import datetime
    data = OrdersCreate(
        CompanyID=1,
        BranchID=1,
        Date_=datetime(2025, 8, 16, 0, 0, 0),
        ClientID=11,
        CarID=None,
        IsService=False,
        ServiceTypeID=None,
        Mileage=None,
        NextServiceMileage=None,
        Notes="test order",
        SaleConditionID=1,
        DiscountID=1,
        Subtotal=100.0,
        Total=121.0,
        VAT=21.0,
        UserID=1,
        DocumentID=2,
        PriceListID=1,
        OrderStatusID=1,
        WarehouseID=1,
        VendorID=1,
        Items=[]
    )
    obj = create_orders(db_session, data)
    assert getattr(obj, "CompanyID", None) == 1
    # Obtener
    all_objs = get_orders(db_session)
    assert any(getattr(o, "OrderID", None) == getattr(
        obj, "OrderID", None) for o in all_objs)
    # Actualizar
    update = OrdersUpdate(Notes="order updated")
    order_id = getattr(obj, "OrderID", None)
    assert isinstance(order_id, int) and order_id > 0
    updated = update_orders(db_session, order_id, update)
    assert getattr(updated, "Notes", None) == "order updated"
    # Eliminar
    deleted = delete_orders(db_session, order_id)
    assert getattr(deleted, "OrderID", None) == order_id
    assert all(getattr(o, "OrderID", None) !=
               order_id for o in get_orders(db_session))
