from datetime import datetime, timezone
from types import SimpleNamespace

from sqlalchemy import text

from app.graphql.crud.itemstock import (
    create_itemstock,
    delete_itemstock,
    get_itemstock,
    update_itemstock,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_itemstock_payload(deps, quantity: int):
    return SimpleNamespace(
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        ItemID=deps["ItemID"],
        WarehouseID=deps["WarehouseID"],
        Quantity=quantity,
        ReservedQuantity=0,
        LastModified=datetime.now(timezone.utc),
        StockStatus="OK",
        MinStockLevel=0,
        MaxStockLevel=100,
        SupplierID=deps["SupplierID"],
        StockLocation="LocA",
        BatchNumber=None,
        ExpiryDate=None,
    )


def _execute_itemstock_operation(db_session, deps, operation: str):
    item_id = deps["ItemID"]

    def _clear_entry():
        db_session.execute(
            text(
                """
                DELETE FROM ItemStocks
                WHERE CompanyID = :company_id
                  AND BranchID = :branch_id
                  AND ItemID = :item_id
                  AND WarehouseID = :warehouse_id
                """
            ),
            {
                "company_id": deps["CompanyID"],
                "branch_id": deps["BranchID"],
                "item_id": deps["ItemID"],
                "warehouse_id": deps["WarehouseID"],
            },
        )
        db_session.commit()

    def _logic():
        if operation == "insert":
            _clear_entry()
            stock = create_itemstock(
                db_session,
                _build_itemstock_payload(deps, 10),
            )
            return "ok", {"item_id": stock.ItemID}

        if operation == "read":
            _clear_entry()
            create_itemstock(
                db_session,
                _build_itemstock_payload(deps, 15),
            )
            entries = get_itemstock(db_session)
            if not any(s.ItemID == item_id for s in entries):
                return "error", "itemstock_read_not_found"
            return "ok", {"item_id": item_id}

        if operation == "read_all":
            _clear_entry()
            create_itemstock(
                db_session,
                _build_itemstock_payload(deps, 20),
            )
            results = get_itemstock(db_session)
            if not results:
                return "error", "itemstock_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            _clear_entry()
            create_itemstock(
                db_session,
                _build_itemstock_payload(deps, 25),
            )
            new_quantity = 30
            update_itemstock(
                db_session,
                item_id,
                SimpleNamespace(Quantity=new_quantity, ReservedQuantity=5),
            )
            entries = get_itemstock(db_session)
            refreshed = next(
                (s for s in entries if s.ItemID == item_id and s.CompanyID == deps["CompanyID"]),
                None,
            )
            if not refreshed or int(getattr(refreshed, "Quantity", 0)) != new_quantity:
                return "error", "itemstock_update_failed"
            return "ok", {"item_id": item_id}

        if operation == "delete":
            _clear_entry()
            create_itemstock(
                db_session,
                _build_itemstock_payload(deps, 12),
            )
            delete_itemstock(db_session, item_id)
            entries = get_itemstock(db_session)
            if any(s.ItemID == item_id and s.CompanyID == deps["CompanyID"] for s in entries):
                return "error", "itemstock_delete_failed"
            return "ok", {"item_id": item_id}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_itemstock_flow(db_session, seeded_dependencies):
    deps = {
        "CompanyID": seeded_dependencies["CompanyID"],
        "BranchID": seeded_dependencies["BranchID"],
        "ItemID": seeded_dependencies["ItemID"],
        "WarehouseID": seeded_dependencies["WarehouseID"],
        "SupplierID": seeded_dependencies["SupplierID"],
    }
    run_entity_flow(
        "itemstock",
        "insert",
        lambda op: _execute_itemstock_operation(db_session, deps, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
