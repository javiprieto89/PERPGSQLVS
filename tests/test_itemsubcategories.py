import pytest
from app.graphql.crud.itemsubcategories import create_itemsubcategories, get_itemsubcategories, update_itemsubcategories, delete_itemsubcategories
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesCreate, ItemSubcategoriesUpdate


def test_create_get_update_delete_itemsubcategories(db_session):
    # Crear
    data = ItemSubcategoriesCreate(SubcategoryName="Subcat Test")
    obj = create_itemsubcategories(db_session, data)
    assert obj.SubcategoryName == "Subcat Test"
    # Obtener
    all_objs = get_itemsubcategories(db_session)
    assert any(o.ItemSubcategoryID == obj.ItemSubcategoryID for o in all_objs)
    # Actualizar
    update = ItemSubcategoriesUpdate(SubcategoryName="Subcat Modificado")
    updated = update_itemsubcategories(
        db_session, obj.ItemSubcategoryID, update)
    assert updated.SubcategoryName == "Subcat Modificado"
    # Eliminar
    deleted = delete_itemsubcategories(db_session, obj.ItemSubcategoryID)
    assert deleted.ItemSubcategoryID == obj.ItemSubcategoryID
    assert all(o.ItemSubcategoryID !=
               obj.ItemSubcategoryID for o in get_itemsubcategories(db_session))
