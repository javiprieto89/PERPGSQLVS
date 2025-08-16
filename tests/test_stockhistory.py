import pytest
from app.graphql.crud.stockhistory import create_stockhistory, get_stockhistory, update_stockhistory, delete_stockhistory
from app.graphql.schemas.stockhistory import StockHistoryCreate, StockHistoryUpdate


def test_create_get_update_delete_stockhistory(db_session):
    from sqlalchemy import text
    # Buscar FKs reales
    company_id = db_session.execute(
        text('SELECT TOP 1 CompanyID FROM CompanyData')).scalar() or 1
    branch_id = db_session.execute(
        text('SELECT TOP 1 BranchID FROM Branches')).scalar() or 1
    user_id = db_session.execute(
        text('SELECT TOP 1 UserID FROM Users')).scalar() or 1
    item_id = db_session.execute(
        text('SELECT TOP 1 ItemID FROM Items')).scalar() or 1
    warehouse_id = db_session.execute(
        text('SELECT TOP 1 WarehouseID FROM Warehouses')).scalar() or 1
    # Crear
    data = StockHistoryCreate(
        CompanyID=company_id,
        BranchID=branch_id,
        UserID=user_id,
        ItemID=item_id,
        WarehouseID=warehouse_id,
        QuantityUpdate=10,
        QuantityBefore=0,
        QuantityAfter=10,
        Reason="Alta",
        TransactionType="Ingreso",
        Notes="Test"
    )
    obj = create_stockhistory(db_session, data)
    assert obj is not None
    obj_dict = vars(obj)
    assert obj_dict["CompanyID"] == company_id and obj_dict["BranchID"] == branch_id and obj_dict[
        "UserID"] == user_id and obj_dict["ItemID"] == item_id and obj_dict["WarehouseID"] == warehouse_id
    # Obtener
    all_objs = get_stockhistory(db_session)
    obj_id = obj_dict.get("StockHistoryID") or obj_dict.get("id")
    if obj_id is None:
        raise AssertionError(
            "StockHistoryID no encontrado en el objeto creado")
    obj_id = int(obj_id)
    assert any(vars(o)["StockHistoryID"] == obj_id for o in all_objs)
    # Actualizar
    update = StockHistoryUpdate(Notes="Modificado")
    updated = update_stockhistory(db_session, obj_id, update)
    assert updated is not None
    updated_dict = vars(updated)
    assert updated_dict["Notes"] == "Modificado"
    # Eliminar
    deleted = delete_stockhistory(db_session, obj_id)
    assert deleted is not None
    deleted_dict = vars(deleted)
    assert deleted_dict["StockHistoryID"] == obj_id
    assert all(vars(o)["StockHistoryID"] !=
               obj_id for o in get_stockhistory(db_session))
