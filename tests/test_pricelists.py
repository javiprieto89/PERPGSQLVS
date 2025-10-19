from datetime import datetime, timezone
from types import SimpleNamespace

from app.graphql.crud.pricelists import (
    create_pricelists,
    delete_pricelists,
    get_pricelists,
    get_pricelists_by_id,
    update_pricelists,
)
from app.graphql.schemas.pricelists import PriceListsUpdate
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_pricelist_input(company_id: int, name: str):
    return SimpleNamespace(
        CompanyID=company_id,
        PriceListName=name,
        PriceListDescription="Lista generada en test",
        IsActive=True,
        CreatedDate=datetime.now(timezone.utc),
    )


def _execute_pricelists_operation(db_session, company_id: int, operation: str):
    def _logic():
        if operation == "insert":
            pricelist = create_pricelists(
                db_session,
                _build_pricelist_input(company_id, unique_code("Lista")),
            )
            return "ok", {"pricelist_id": pricelist.PriceListID}

        if operation == "read":
            pricelist = create_pricelists(
                db_session,
                _build_pricelist_input(company_id, unique_code("ListaR")),
            )
            fetched = get_pricelists_by_id(db_session, company_id, pricelist.PriceListID)
            if not fetched:
                return "error", "pricelists_read_not_found"
            return "ok", {"pricelist_id": fetched.PriceListID}

        if operation == "read_all":
            create_pricelists(
                db_session,
                _build_pricelist_input(company_id, unique_code("ListaA")),
            )
            results = get_pricelists(db_session)
            if not results:
                return "error", "pricelists_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            pricelist = create_pricelists(
                db_session,
                _build_pricelist_input(company_id, unique_code("ListaU")),
            )
            new_name = unique_code("ListaU2")
            update_pricelists(
                db_session,
                company_id,
                pricelist.PriceListID,
                PriceListsUpdate(PriceListName=new_name),
            )
            refreshed = get_pricelists_by_id(db_session, company_id, pricelist.PriceListID)
            if not refreshed or refreshed.PriceListName != new_name:
                return "error", "pricelists_update_failed"
            return "ok", {"pricelist_id": pricelist.PriceListID}

        if operation == "delete":
            pricelist = create_pricelists(
                db_session,
                _build_pricelist_input(company_id, unique_code("ListaD")),
            )
            delete_pricelists(db_session, company_id, pricelist.PriceListID)
            remaining = {p.PriceListID for p in get_pricelists(db_session)}
            if pricelist.PriceListID in remaining:
                return "error", "pricelists_delete_failed"
            return "ok", {"pricelist_id": pricelist.PriceListID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_pricelists_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "pricelists",
        "insert",
        lambda op: _execute_pricelists_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
