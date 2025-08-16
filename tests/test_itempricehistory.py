import pytest
from app.graphql.crud.itempricehistory import create_itempricehistory, get_itempricehistory, update_itempricehistory, delete_itempricehistory
from app.graphql.schemas.itempricehistory import ItemPriceHistoryCreate, ItemPriceHistoryUpdate


def test_create_get_update_delete_itempricehistory(db_session):
    # Crear
    data = ItemPriceHistoryCreate(Price=100.0)
    obj = create_itempricehistory(db_session, data)
    assert obj.Price == 100.0
    # Obtener
    all_objs = get_itempricehistory(db_session)
    assert any(o.ItemPriceHistoryID ==
               obj.ItemPriceHistoryID for o in all_objs)
    # Actualizar
    update = ItemPriceHistoryUpdate(Price=200.0)
    updated = update_itempricehistory(
        db_session, obj.ItemPriceHistoryID, update)
    assert updated.Price == 200.0
    # Eliminar
    deleted = delete_itempricehistory(db_session, obj.ItemPriceHistoryID)
    assert deleted.ItemPriceHistoryID == obj.ItemPriceHistoryID
    assert all(o.ItemPriceHistoryID !=
               obj.ItemPriceHistoryID for o in get_itempricehistory(db_session))
