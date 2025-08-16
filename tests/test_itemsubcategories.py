import pytest
from app.graphql.crud.itemsubcategories import create_itemsubcategories, get_itemsubcategories, update_itemsubcategories, delete_itemsubcategories
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesCreate, ItemSubcategoriesUpdate


def test_create_get_update_delete_itemsubcategories(db_session):
    # Crear
    data = ItemSubcategoriesCreate(
        ItemCategoryID=1, SubcategoryName="Subcat Test")
    obj = create_itemsubcategories(db_session, data)
    assert getattr(obj, "SubcategoryName", None) == "Subcat Test"
    # Obtener
    all_objs = get_itemsubcategories(db_session)
    assert any(o.ItemSubcategoryID == obj.ItemSubcategoryID for o in all_objs)
    # Actualizar
    update = ItemSubcategoriesUpdate(SubcategoryName="Subcat Modificado")
    updated = update_itemsubcategories(
        db_session, getattr(obj, "ItemSubcategoryID", 1), update)
    assert updated and getattr(
        updated, "SubcategoryName", None) == "Subcat Modificado"
    # Eliminar
    deleted = delete_itemsubcategories(
        db_session, getattr(obj, "ItemSubcategoryID", 1))
    assert deleted and getattr(deleted, "ItemSubcategoryID", None) == getattr(
        obj, "ItemSubcategoryID", 1)
    assert all(getattr(o, "ItemSubcategoryID", None) != getattr(
        obj, "ItemSubcategoryID", 1) for o in get_itemsubcategories(db_session))
