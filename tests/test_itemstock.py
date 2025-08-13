import pytest
from app.graphql.crud.itemstock import create_itemstock, get_itemstock, update_itemstock, delete_itemstock
from app.graphql.schemas.itemstock import ItemStockCreate, ItemStockUpdate


def test_create_get_update_delete_itemstock(db_session):
    # Crear
    data = ItemStockCreate(Stock=10)
    obj = create_itemstock(db_session, data)
    assert obj.Stock == 10
    # Obtener
    all_objs = get_itemstock(db_session)
    assert any(o.ItemStockID == obj.ItemStockID for o in all_objs)
    # Actualizar
    update = ItemStockUpdate(Stock=20)
    updated = update_itemstock(db_session, obj.ItemStockID, update)
    assert updated.Stock == 20
    # Eliminar
    deleted = delete_itemstock(db_session, obj.ItemStockID)
    assert deleted.ItemStockID == obj.ItemStockID
    assert all(o.ItemStockID !=
               obj.ItemStockID for o in get_itemstock(db_session))
