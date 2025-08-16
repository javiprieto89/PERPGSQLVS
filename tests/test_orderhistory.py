import pytest
from app.graphql.crud.orderhistory import create_orderhistory, get_orderhistory, update_orderhistory, delete_orderhistory
from app.graphql.schemas.orderhistory import OrderHistoryCreate, OrderHistoryUpdate


def test_create_get_update_delete_orderhistory(db_session):
    # Crear
    # Usar IDs válidos y todos los campos obligatorios
    data = OrderHistoryCreate(OrderID=6, CompanyID=1, BranchID=1, ClientID=11,
                              UserID=1, CarID=None, Status="Nuevo", Date_=None, ServiceTypeID=1)
    obj = create_orderhistory(db_session, data)
    assert getattr(obj, "Status", None) == "Nuevo"
    # Obtener
    all_objs = get_orderhistory(db_session)
    assert any(o.OrderHistoryID == obj.OrderHistoryID for o in all_objs)
    # Actualizar
    update = OrderHistoryUpdate(Status="Cerrado")
    updated = update_orderhistory(
        db_session, getattr(obj, "OrderHistoryID", 1), update)
    assert updated and getattr(updated, "Status", None) == "Cerrado"
    # Eliminar
    deleted = delete_orderhistory(
        db_session, getattr(obj, "OrderHistoryID", 1))
    assert deleted and getattr(deleted, "OrderHistoryID", None) == getattr(
        obj, "OrderHistoryID", 1)
    assert all(getattr(o, "OrderHistoryID", None) != getattr(
        obj, "OrderHistoryID", 1) for o in get_orderhistory(db_session))
