from app.graphql.crud.itemcategories import create_itemcategories
from app.graphql.crud.itemsubcategories import (
    create_itemsubcategories,
    delete_itemsubcategories,
    get_itemsubcategories,
    get_itemsubcategories_by_id,
    update_itemsubcategories,
)
from app.graphql.schemas.itemcategories import ItemCategoriesCreate
from app.graphql.schemas.itemsubcategories import (
    ItemSubcategoriesCreate,
    ItemSubcategoriesUpdate,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _ensure_category(db_session, company_id: int):
    return create_itemcategories(
        db_session,
        ItemCategoriesCreate(
            CompanyID=company_id,
            CategoryName=unique_code("Cat"),
        ),
    )


def _build_subcategory_input(company_id: int, category_id: int, name: str):
    return ItemSubcategoriesCreate(
        CompanyID=company_id,
        ItemCategoryID=category_id,
        SubcategoryName=name,
    )


def _execute_itemsubcategories_operation(db_session, company_id: int, operation: str):
    category = _ensure_category(db_session, company_id)

    def _logic():
        if operation == "insert":
            subcategory = create_itemsubcategories(
                db_session,
                _build_subcategory_input(
                    company_id,
                    category.ItemCategoryID,
                    unique_code("Subcat"),
                ),
            )
            return "ok", {"item_subcategory_id": subcategory.ItemSubcategoryID}

        if operation == "read":
            subcategory = create_itemsubcategories(
                db_session,
                _build_subcategory_input(
                    company_id,
                    category.ItemCategoryID,
                    unique_code("SubcatR"),
                ),
            )
            fetched = get_itemsubcategories_by_id(db_session, subcategory.ItemSubcategoryID)
            if not fetched:
                return "error", "itemsubcategories_read_not_found"
            return "ok", {"item_subcategory_id": fetched.ItemSubcategoryID}

        if operation == "read_all":
            create_itemsubcategories(
                db_session,
                _build_subcategory_input(
                    company_id,
                    category.ItemCategoryID,
                    unique_code("SubcatA"),
                ),
            )
            results = get_itemsubcategories(db_session)
            if not results:
                return "error", "itemsubcategories_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            subcategory = create_itemsubcategories(
                db_session,
                _build_subcategory_input(
                    company_id,
                    category.ItemCategoryID,
                    unique_code("SubcatU"),
                ),
            )
            new_name = unique_code("SubcatU2")
            update_itemsubcategories(
                db_session,
                subcategory.ItemSubcategoryID,
                ItemSubcategoriesUpdate(SubcategoryName=new_name),
            )
            refreshed = get_itemsubcategories_by_id(db_session, subcategory.ItemSubcategoryID)
            if not refreshed or refreshed.SubcategoryName != new_name:
                return "error", "itemsubcategories_update_failed"
            return "ok", {"item_subcategory_id": subcategory.ItemSubcategoryID}

        if operation == "delete":
            subcategory = create_itemsubcategories(
                db_session,
                _build_subcategory_input(
                    company_id,
                    category.ItemCategoryID,
                    unique_code("SubcatD"),
                ),
            )
            delete_itemsubcategories(db_session, subcategory.ItemSubcategoryID)
            remaining = {s.ItemSubcategoryID for s in get_itemsubcategories(db_session)}
            if subcategory.ItemSubcategoryID in remaining:
                return "error", "itemsubcategories_delete_failed"
            return "ok", {"item_subcategory_id": subcategory.ItemSubcategoryID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_itemsubcategories_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "itemsubcategories",
        "insert",
        lambda op: _execute_itemsubcategories_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
