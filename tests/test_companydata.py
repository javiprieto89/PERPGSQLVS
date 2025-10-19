from datetime import datetime

from app.graphql.crud.company import (
    create_company,
    delete_company,
    get_company,
    get_company_by_id,
    update_company,
)
from app.graphql.schemas.company import CompanyCreate, CompanyUpdate
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _execute_company_operation(db_session, operation: str):
    def _logic():
        if operation == "insert":
            company = create_company(
                db_session,
                CompanyCreate(
                    CompanyName=unique_code("Company"),
                    Address="Addr",
                    CUIT=unique_code("CUIT"),
                    Grossincome="GI",
                    Startdate=datetime.utcnow(),
                ),
            )
            return "ok", {"company_id": company.CompanyID}

        if operation == "read":
            company = create_company(
                db_session,
                CompanyCreate(
                    CompanyName=unique_code("CompanyR"),
                ),
            )
            fetched = get_company_by_id(db_session, company.CompanyID)
            if not fetched:
                return "error", "company_read_not_found"
            return "ok", {"company_id": fetched.CompanyID}

        if operation == "read_all":
            create_company(
                db_session,
                CompanyCreate(
                    CompanyName=unique_code("CompanyA"),
                ),
            )
            results = get_company(db_session)
            if not results:
                return "error", "company_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            company = create_company(
                db_session,
                CompanyCreate(
                    CompanyName=unique_code("CompanyU"),
                ),
            )
            new_name = unique_code("CompanyU2")
            updated = update_company(
                db_session,
                company.CompanyID,
                CompanyUpdate(CompanyName=new_name),
            )
            if not updated or updated.CompanyName != new_name:
                return "error", "company_update_failed"
            return "ok", {"company_id": updated.CompanyID}

        if operation == "delete":
            company = create_company(
                db_session,
                CompanyCreate(
                    CompanyName=unique_code("CompanyD"),
                ),
            )
            delete_company(db_session, company.CompanyID)
            remaining = {c.CompanyID for c in get_company(db_session)}
            if company.CompanyID in remaining:
                return "error", "company_delete_failed"
            return "ok", {"company_id": company.CompanyID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_company_flow(db_session):
    run_entity_flow(
        "company",
        "insert",
        lambda op: _execute_company_operation(db_session, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
