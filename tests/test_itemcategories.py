import pytest
from app.graphql.crud.itemcategories import create_itemcategories, get_itemcategories, update_itemcategories, delete_itemcategories
from app.graphql.schemas.itemcategories import ItemCategoriesCreate, ItemCategoriesUpdate


@pytest.mark.usefixtures("tenant_ids")
def test_create_get_update_delete_itemcategories(db_session, tenant_ids):
    company_id, _ = tenant_ids
    data = ItemCategoriesCreate(
        CompanyID=company_id, CategoryName="Categoría Test")
    obj = create_itemcategories(db_session, data)
    assert obj.CategoryName == "Categoría Test"
    # Obtener
    all_objs = get_itemcategories(db_session)
    assert any(o.ItemCategoryID == obj.ItemCategoryID for o in all_objs)
    # Actualizar
    update = ItemCategoriesUpdate(CategoryName="Categoría Modificada")
    updated = update_itemcategories(db_session, obj.ItemCategoryID, update)
    assert updated and updated.CategoryName == "Categoría Modificada"
    # Eliminar
    deleted = delete_itemcategories(db_session, obj.ItemCategoryID)
    assert deleted and deleted.ItemCategoryID == obj.ItemCategoryID
    assert all(o.ItemCategoryID !=
               obj.ItemCategoryID for o in get_itemcategories(db_session))
