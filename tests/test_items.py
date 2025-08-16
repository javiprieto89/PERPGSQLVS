import pytest
from app.graphql.crud.items import create_items, get_items, update_items, delete_items
from app.graphql.schemas.items import ItemsCreate, ItemsUpdate


def test_create_get_update_delete_items(db_session):
    # Crear
    data = ItemsCreate(Code="ITEM001", Description="Item Test", IsActive=True)
    obj = create_items(db_session, data)
    assert obj.Code == "ITEM001"
    # Obtener
    all_objs = get_items(db_session)
    assert any(o.ItemID == obj.ItemID for o in all_objs)
    # Actualizar
    update = ItemsUpdate(Description="Item Modificado")
    updated = update_items(db_session, obj.ItemID, update)
    assert updated.Description == "Item Modificado"
    # Eliminar
    deleted = delete_items(db_session, obj.ItemID)
    assert deleted.ItemID == obj.ItemID
    assert all(o.ItemID != obj.ItemID for o in get_items(db_session))
