from app.graphql.crud.itemcategories import (
    create_itemcategories,
    delete_itemcategories,
    get_itemcategories,
    get_itemcategories_by_id,
    update_itemcategories,
)
from app.graphql.schemas.itemcategories import (
    ItemCategoriesCreate,
    ItemCategoriesUpdate,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_category_input(company_id: int, name: str) -> ItemCategoriesCreate:
    return ItemCategoriesCreate(CompanyID=company_id, CategoryName=name)


def _execute_itemcategories_operation(db_session, company_id: int, operation: str):
    def _logic():
        if operation == "insert":
            category = create_itemcategories(
                db_session,
                _build_category_input(company_id, unique_code("Categoria")),
            )
            return "ok", {"item_category_id": category.ItemCategoryID}

        if operation == "read":
            category = create_itemcategories(
                db_session,
                _build_category_input(company_id, unique_code("CategoriaR")),
            )
            fetched = get_itemcategories_by_id(db_session, category.ItemCategoryID)
            if not fetched:
                return "error", "itemcategories_read_not_found"
            return "ok", {"item_category_id": fetched.ItemCategoryID}

        if operation == "read_all":
            create_itemcategories(
                db_session,
                _build_category_input(company_id, unique_code("CategoriaA")),
            )
            results = get_itemcategories(db_session)
            if not results:
                return "error", "itemcategories_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            category = create_itemcategories(
                db_session,
                _build_category_input(company_id, unique_code("CategoriaU")),
            )
            new_name = unique_code("CategoriaU2")
            update_itemcategories(
                db_session,
                category.ItemCategoryID,
                ItemCategoriesUpdate(CategoryName=new_name),
            )
            refreshed = get_itemcategories_by_id(db_session, category.ItemCategoryID)
            if not refreshed or refreshed.CategoryName != new_name:
                return "error", "itemcategories_update_failed"
            return "ok", {"item_category_id": category.ItemCategoryID}

        if operation == "delete":
            category = create_itemcategories(
                db_session,
                _build_category_input(company_id, unique_code("CategoriaD")),
            )
            delete_itemcategories(db_session, category.ItemCategoryID)
            remaining = {c.ItemCategoryID for c in get_itemcategories(db_session)}
            if category.ItemCategoryID in remaining:
                return "error", "itemcategories_delete_failed"
            return "ok", {"item_category_id": category.ItemCategoryID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_itemcategories_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "itemcategories",
        "insert",
        lambda op: _execute_itemcategories_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
