import pytest
from app.graphql.crud.itemsubcategories import create_itemsubcategories, get_itemsubcategories, update_itemsubcategories, delete_itemsubcategories
from app.graphql.schemas.itemsubcategories import ItemSubcategoriesCreate, ItemSubcategoriesUpdate
from app.models.itemcategories import ItemCategories


@pytest.mark.usefixtures("tenant_ids")
def test_create_get_update_delete_itemsubcategories(db_session, tenant_ids):
    company_id, _ = tenant_ids
    # Crear categoría base si no existe
    cat = db_session.query(ItemCategories).filter(ItemCategories.CompanyID==company_id).first()
    if not cat:
        cat = ItemCategories(CompanyID=company_id, CategoryName="Cat Base")
        db_session.add(cat); db_session.commit(); db_session.refresh(cat)

    data = ItemSubcategoriesCreate(CompanyID=company_id, ItemCategoryID=cat.ItemCategoryID, SubcategoryName="Subcat Test")
    obj = create_itemsubcategories(db_session, data)
    assert obj.SubcategoryName == "Subcat Test"

    all_objs = get_itemsubcategories(db_session)
    assert any(o.ItemSubcategoryID == obj.ItemSubcategoryID for o in all_objs)

    update = ItemSubcategoriesUpdate(SubcategoryName="Subcat Modificado")
    updated = update_itemsubcategories(db_session, obj.ItemSubcategoryID, update)
    assert updated and updated.SubcategoryName == "Subcat Modificado"

    deleted = delete_itemsubcategories(db_session, obj.ItemSubcategoryID)
    assert deleted and deleted.ItemSubcategoryID == obj.ItemSubcategoryID
    assert all(o.ItemSubcategoryID != obj.ItemSubcategoryID for o in get_itemsubcategories(db_session))