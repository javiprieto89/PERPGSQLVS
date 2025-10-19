from datetime import datetime, timezone
from types import SimpleNamespace

from app.graphql.crud.pricelistitems import (
    create_pricelistitem,
    delete_pricelistitem,
    get_pricelistitem,
    get_pricelistitems,
    update_pricelistitem,
)
from app.graphql.crud.pricelists import create_pricelists
from app.graphql.schemas.pricelistitems import (
    PriceListItemsCreate,
    PriceListItemsUpdate,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_pricelist_payload(company_id: int, name: str):
    return SimpleNamespace(
        CompanyID=company_id,
        PriceListName=name,
        PriceListDescription="Lista para items",
        IsActive=True,
        CreatedDate=datetime.now(timezone.utc),
    )


def _execute_pricelistitems_operation(db_session, deps, operation: str):
    company_id = deps["CompanyID"]
    item_id = deps["ItemID"]

    def _logic():
        if operation == "insert":
            pricelist = create_pricelists(
                db_session,
                _build_pricelist_payload(company_id, unique_code("ListaItem")),
            )
            pli = create_pricelistitem(
                db_session,
                PriceListItemsCreate(
                    PriceListID=pricelist.PriceListID,
                    ItemID=item_id,
                    Price=100.0,
                    EffectiveDate=datetime.now(timezone.utc),
                ),
            )
            return "ok", {"pricelist_id": pli.PriceListID, "item_id": pli.ItemID}

        if operation == "read":
            pricelist = create_pricelists(
                db_session,
                _build_pricelist_payload(company_id, unique_code("ListaItemR")),
            )
            create_pricelistitem(
                db_session,
                PriceListItemsCreate(
                    PriceListID=pricelist.PriceListID,
                    ItemID=item_id,
                    Price=110.0,
                    EffectiveDate=datetime.now(timezone.utc),
                ),
            )
            fetched = get_pricelistitem(db_session, pricelist.PriceListID, item_id)
            if not fetched:
                return "error", "pricelistitems_read_not_found"
            return "ok", {"pricelist_id": pricelist.PriceListID, "item_id": item_id}

        if operation == "read_all":
            pricelist = create_pricelists(
                db_session,
                _build_pricelist_payload(company_id, unique_code("ListaItemA")),
            )
            create_pricelistitem(
                db_session,
                PriceListItemsCreate(
                    PriceListID=pricelist.PriceListID,
                    ItemID=item_id,
                    Price=120.0,
                    EffectiveDate=datetime.now(timezone.utc),
                ),
            )
            results = get_pricelistitems(db_session)
            if not results:
                return "error", "pricelistitems_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            pricelist = create_pricelists(
                db_session,
                _build_pricelist_payload(company_id, unique_code("ListaItemU")),
            )
            create_pricelistitem(
                db_session,
                PriceListItemsCreate(
                    PriceListID=pricelist.PriceListID,
                    ItemID=item_id,
                    Price=130.0,
                    EffectiveDate=datetime.now(timezone.utc),
                ),
            )
            new_price = 180.0
            update_pricelistitem(
                db_session,
                pricelist.PriceListID,
                item_id,
                PriceListItemsUpdate(Price=new_price),
            )
            refreshed = get_pricelistitem(db_session, pricelist.PriceListID, item_id)
            if not refreshed or float(refreshed.Price) != new_price:
                return "error", "pricelistitems_update_failed"
            return "ok", {"pricelist_id": pricelist.PriceListID, "item_id": item_id}

        if operation == "delete":
            pricelist = create_pricelists(
                db_session,
                _build_pricelist_payload(company_id, unique_code("ListaItemD")),
            )
            create_pricelistitem(
                db_session,
                PriceListItemsCreate(
                    PriceListID=pricelist.PriceListID,
                    ItemID=item_id,
                    Price=140.0,
                    EffectiveDate=datetime.now(timezone.utc),
                ),
            )
            delete_pricelistitem(db_session, pricelist.PriceListID, item_id)
            remaining = {
                (entry.PriceListID, entry.ItemID) for entry in get_pricelistitems(db_session)
            }
            if (pricelist.PriceListID, item_id) in remaining:
                return "error", "pricelistitems_delete_failed"
            return "ok", {"pricelist_id": pricelist.PriceListID, "item_id": item_id}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_pricelistitems_flow(db_session, seeded_dependencies):
    deps = {
        "CompanyID": seeded_dependencies["CompanyID"],
        "ItemID": seeded_dependencies["ItemID"],
    }
    run_entity_flow(
        "pricelistitems",
        "insert",
        lambda op: _execute_pricelistitems_operation(db_session, deps, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
