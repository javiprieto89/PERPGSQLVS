from datetime import datetime, timezone

from app.graphql.crud.itempricehistories import (
    create_itempricehistory,
    delete_itempricehistory,
    get_itempricehistory,
    get_itempricehistory_by_id,
    update_itempricehistory,
)
from app.graphql.schemas.itempricehistories import (
    ItemPriceHistoriesCreate,
    ItemPriceHistoriesUpdate,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_history_input(deps, price: float) -> ItemPriceHistoriesCreate:
    return ItemPriceHistoriesCreate(
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        ItemID=deps["ItemID"],
        PriceListID=deps["PriceListID"],
        EffectiveDate=datetime.now(timezone.utc),
        Price=price,
        CurrencyID=deps["CurrencyID"],
        UserID=deps["UserID"],
    )


def _execute_itempricehistory_operation(db_session, deps, operation: str):
    def _logic():
        if operation == "insert":
            history = create_itempricehistory(
                db_session,
                _build_history_input(deps, 100.0),
            )
            return "ok", {"price_history_id": history.PriceHistoryID}

        if operation == "read":
            history = create_itempricehistory(
                db_session,
                _build_history_input(deps, 110.0),
            )
            fetched = get_itempricehistory_by_id(db_session, history.PriceHistoryID)
            if not fetched:
                return "error", "itempricehistory_read_not_found"
            return "ok", {"price_history_id": fetched.PriceHistoryID}

        if operation == "read_all":
            create_itempricehistory(
                db_session,
                _build_history_input(deps, 120.0),
            )
            results = get_itempricehistory(db_session)
            if not results:
                return "error", "itempricehistory_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            history = create_itempricehistory(
                db_session,
                _build_history_input(deps, 130.0),
            )
            new_price = 180.0
            update_itempricehistory(
                db_session,
                history.PriceHistoryID,
                ItemPriceHistoriesUpdate(
                    PriceHistoryID=history.PriceHistoryID,
                    Price=new_price,
                ),
            )
            refreshed = get_itempricehistory_by_id(db_session, history.PriceHistoryID)
            if not refreshed or float(refreshed.Price) != new_price:
                return "error", "itempricehistory_update_failed"
            return "ok", {"price_history_id": history.PriceHistoryID}

        if operation == "delete":
            history = create_itempricehistory(
                db_session,
                _build_history_input(deps, 140.0),
            )
            delete_itempricehistory(db_session, history.PriceHistoryID)
            remaining = {h.PriceHistoryID for h in get_itempricehistory(db_session)}
            if history.PriceHistoryID in remaining:
                return "error", "itempricehistory_delete_failed"
            return "ok", {"price_history_id": history.PriceHistoryID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_itempricehistory_flow(db_session, seeded_dependencies):
    deps = seeded_dependencies
    run_entity_flow(
        "itempricehistory",
        "insert",
        lambda op: _execute_itempricehistory_operation(db_session, deps, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
