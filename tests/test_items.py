from datetime import date

from app.graphql.crud.items import (
    create_items,
    delete_items,
    get_items,
    get_items_by_id,
    update_items,
)
from app.graphql.schemas.items import ItemsCreate, ItemsUpdate
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_item_input(deps, code: str, description: str) -> ItemsCreate:
    return ItemsCreate(
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        BrandID=deps["BrandID"],
        ItemCode=code,
        ItemDescription=description,
        ItemCategoryID=deps["ItemCategoryID"],
        ItemSubcategoryID=deps["ItemSubcategoryID"],
        SupplierID=deps["SupplierID"],
        ControlStock=True,
        ReplenishmentStock=10,
        IsOffer=False,
        OEM=None,
        LastModified=date.today(),
        WarehouseID=deps["WarehouseID"],
        IsActive=True,
    )


def _execute_items_operation(db_session, deps, operation: str):
    def _logic():
        if operation == "insert":
            item = create_items(
                db_session,
                _build_item_input(deps, unique_code("ITM"), "Item insert test"),
            )
            return "ok", {"item_id": item.ItemID}

        if operation == "read":
            item = create_items(
                db_session,
                _build_item_input(deps, unique_code("ITMR"), "Item read test"),
            )
            fetched = get_items_by_id(db_session, deps["CompanyID"], item.ItemID)
            if not fetched:
                return "error", "items_read_not_found"
            return "ok", {"item_id": fetched.ItemID}

        if operation == "read_all":
            create_items(
                db_session,
                _build_item_input(deps, unique_code("ITMA"), "Item read all test"),
            )
            results = get_items(db_session)
            if not results:
                return "error", "items_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            item = create_items(
                db_session,
                _build_item_input(deps, unique_code("ITMU"), "Item update test"),
            )
            new_description = "Item actualizado"
            update_items(
                db_session,
                deps["CompanyID"],
                item.ItemID,
                ItemsUpdate(ItemDescription=new_description),
            )
            refreshed = get_items_by_id(db_session, deps["CompanyID"], item.ItemID)
            if not refreshed or refreshed.ItemDescription != new_description:
                return "error", "items_update_failed"
            return "ok", {"item_id": item.ItemID}

        if operation == "delete":
            item = create_items(
                db_session,
                _build_item_input(deps, unique_code("ITMD"), "Item delete test"),
            )
            delete_items(db_session, deps["CompanyID"], item.ItemID)
            remaining = {i.ItemID for i in get_items(db_session)}
            if item.ItemID in remaining:
                return "error", "items_delete_failed"
            return "ok", {"item_id": item.ItemID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_items_flow(db_session, seeded_dependencies):
    deps = {
        "CompanyID": seeded_dependencies["CompanyID"],
        "BranchID": seeded_dependencies["BranchID"],
        "BrandID": seeded_dependencies["BrandID"],
        "ItemCategoryID": seeded_dependencies["ItemCategoryID"],
        "ItemSubcategoryID": seeded_dependencies["ItemSubcategoryID"],
        "SupplierID": seeded_dependencies["SupplierID"],
        "WarehouseID": seeded_dependencies["WarehouseID"],
    }
    run_entity_flow(
        "items",
        "insert",
        lambda op: _execute_items_operation(db_session, deps, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
