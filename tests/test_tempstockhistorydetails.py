import pytest
from app.graphql.crud.tempstockhistorydetails import create_tempstockhistorydetails, get_tempstockhistorydetails, update_tempstockhistorydetails, delete_tempstockhistorydetails
from app.graphql.schemas.tempstockhistorydetails import TempStockHistoryDetailsCreate, TempStockHistoryDetailsUpdate


def test_create_get_update_delete_tempstockhistorydetails(db_session):
    # Crear
    data = TempStockHistoryDetailsCreate(Stock=10)
    obj = create_tempstockhistorydetails(db_session, data)
    assert obj.Stock == 10
    # Obtener
    all_objs = get_tempstockhistorydetails(db_session)
    assert any(o.TempStockHistoryDetailID ==
               obj.TempStockHistoryDetailID for o in all_objs)
    # Actualizar
    update = TempStockHistoryDetailsUpdate(Stock=20)
    updated = update_tempstockhistorydetails(
        db_session, obj.TempStockHistoryDetailID, update)
    assert updated.Stock == 20
    # Eliminar
    deleted = delete_tempstockhistorydetails(
        db_session, obj.TempStockHistoryDetailID)
    assert deleted.TempStockHistoryDetailID == obj.TempStockHistoryDetailID
    assert all(o.TempStockHistoryDetailID !=
               obj.TempStockHistoryDetailID for o in get_tempstockhistorydetails(db_session))
