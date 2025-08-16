import pytest
from app.graphql.crud.orderhistorydetails import create_orderhistorydetails, get_orderhistorydetails, update_orderhistorydetails, delete_orderhistorydetails
from app.graphql.schemas.orderhistorydetails import OrderHistoryDetailsCreate, OrderHistoryDetailsUpdate


def test_create_get_update_delete_orderhistorydetails(db_session):
    # Crear primero un OrderHistory válido
    from app.graphql.crud.orderhistory import create_orderhistory
    from app.graphql.schemas.orderhistory import OrderHistoryCreate
    order_data = OrderHistoryCreate(OrderID=6, CompanyID=1, BranchID=1, ClientID=11,
                                    UserID=1, CarID=None, Status="Nuevo", Date_=None, ServiceTypeID=1)
    order_obj = create_orderhistory(db_session, order_data)
    # Ahora crear el detalle usando el ID real
    # Asegurarse de usar el valor entero del ID
    order_history_id = getattr(order_obj, "OrderHistoryID", None)
    assert isinstance(order_history_id, int) and order_history_id > 0
    data = OrderHistoryDetailsCreate(OrderHistoryID=order_history_id, ItemID=1,
                                     WarehouseID=1, Quantity=1, UnitPrice=10.0, Description="desc test")
    obj = create_orderhistorydetails(db_session, data)
    assert getattr(obj, "Quantity", None) == 1
    # Obtener
    all_objs = get_orderhistorydetails(db_session)
    assert any(o.OrderHistoryDetailID ==
               obj.OrderHistoryDetailID for o in all_objs)
    # Actualizar
    update = OrderHistoryDetailsUpdate(Quantity=2)
    updated = update_orderhistorydetails(
        db_session, getattr(obj, "OrderHistoryDetailID", 1), update)
    assert updated and getattr(updated, "Quantity", None) == 2
    # Eliminar
    deleted = delete_orderhistorydetails(
        db_session, getattr(obj, "OrderHistoryDetailID", 1))
    assert deleted and getattr(deleted, "OrderHistoryDetailID", None) == getattr(
        obj, "OrderHistoryDetailID", 1)
    assert all(getattr(o, "OrderHistoryDetailID", None) != getattr(
        obj, "OrderHistoryDetailID", 1) for o in get_orderhistorydetails(db_session))
