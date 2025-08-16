import pytest
from app.graphql.crud.itemcategories import create_itemcategories, get_itemcategories, update_itemcategories, delete_itemcategories
from app.graphql.schemas.itemcategories import ItemCategoriesCreate, ItemCategoriesUpdate


def test_create_get_update_delete_itemcategories(db_session):
    # Crear
    data = ItemCategoriesCreate(CategoryName="Categoría Test")
    obj = create_itemcategories(db_session, data)
    assert obj.CategoryName == "Categoría Test"
    # Obtener
    all_objs = get_itemcategories(db_session)
    assert any(o.ItemCategoryID == obj.ItemCategoryID for o in all_objs)
    # Actualizar
    update = ItemCategoriesUpdate(CategoryName="Categoría Modificada")
    updated = update_itemcategories(db_session, obj.ItemCategoryID, update)
    assert updated.CategoryName == "Categoría Modificada"
    # Eliminar
    deleted = delete_itemcategories(db_session, obj.ItemCategoryID)
    assert deleted.ItemCategoryID == obj.ItemCategoryID
    assert all(o.ItemCategoryID !=
               obj.ItemCategoryID for o in get_itemcategories(db_session))
