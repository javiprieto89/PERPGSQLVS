from datetime import datetime, timezone
import pytest
from app.graphql.crud.stockhistories import (
    create_stockhistories as create_stockhistory,
    get_stockhistories as get_stockhistory,
    update_stockhistories as update_stockhistory,
    delete_stockhistories as delete_stockhistory,
)
from app.graphql.schemas.stockhistories import StockHistoriesCreate, StockHistoriesUpdate


def test_create_get_update_delete_stockhistory(db_session):
    from sqlalchemy import text
    # Buscar FKs reales
    company_id = db_session.execute(
        text('SELECT TOP 1 CompanyID FROM Company')).scalar() or 1
    branch_id = db_session.execute(
        text('SELECT TOP 1 BranchID FROM Branches')).scalar() or 1
    user_id = db_session.execute(
        text('SELECT TOP 1 UserID FROM Users')).scalar() or 1
    # Campos de item/warehouse ya no están en el schema de StockHistories (detalles se manejan aparte)
    # Crear
    from datetime import datetime
    data = StockHistoriesCreate(
        CompanyID=company_id,
        BranchID=branch_id,
        UserID=user_id,
        TransactionDate=datetime.utcnow(),
        Reason="Alta",
        Notes="Test",
    )
    obj = create_stockhistory(db_session, data)
    assert obj is not None
    obj_dict = vars(obj)
    assert obj_dict["CompanyID"] == company_id and obj_dict["BranchID"] == branch_id and obj_dict["UserID"] == user_id
    # Obtener
    all_objs = get_stockhistory(db_session)
    obj_id = obj_dict.get("StockHistoryID") or obj_dict.get("id")
    if obj_id is None:
        raise AssertionError(
            "StockHistoryID no encontrado en el objeto creado")
    obj_id = int(obj_id)
    assert any(vars(o)["StockHistoryID"] == obj_id for o in all_objs)
    # Actualizar
    update = StockHistoriesUpdate(Notes="Modificado")
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