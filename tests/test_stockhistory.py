import pytest
from app.graphql.crud.stockhistory import create_stockhistory, get_stockhistory, update_stockhistory, delete_stockhistory
from app.graphql.schemas.stockhistory import StockHistoryCreate, StockHistoryUpdate


def test_create_get_update_delete_stockhistory(db_session):
    # Crear
    data = StockHistoryCreate(Stock=10)
    obj = create_stockhistory(db_session, data)
    assert obj.Stock == 10
    # Obtener
    all_objs = get_stockhistory(db_session)
    assert any(o.StockHistoryID == obj.StockHistoryID for o in all_objs)
    # Actualizar
    update = StockHistoryUpdate(Stock=20)
    updated = update_stockhistory(db_session, obj.StockHistoryID, update)
    assert updated.Stock == 20
    # Eliminar
    deleted = delete_stockhistory(db_session, obj.StockHistoryID)
    assert deleted.StockHistoryID == obj.StockHistoryID
    assert all(o.StockHistoryID !=
               obj.StockHistoryID for o in get_stockhistory(db_session))
