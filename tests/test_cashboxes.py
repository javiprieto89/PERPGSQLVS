from datetime import datetime, timezone
from types import SimpleNamespace

from app.graphql.crud.cashboxes import (
    create_cashboxes,
    delete_cashboxes,
    get_cashboxes,
    get_cashboxes_by_id,
    update_cashboxes,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_cashbox_payload(
    company_id: int,
    branch_id: int,
    user_id: int,
    name: str,
    initial_balance: float = 1000.0,
    current_balance: float = 1000.0,
):
    now = datetime.now(timezone.utc)
    return SimpleNamespace(
        CompanyID=company_id,
        BranchID=branch_id,
        Name=name,
        Description="Caja principal",
        UserID=user_id,
        Notes="Nota seed",
        InitialBalance=initial_balance,
        CurrentBalance=current_balance,
        IsActive=True,
        OpenDate=now,
        CloseDate=now,
    )


def _execute_cashboxes_operation(db_session, deps, operation: str):
    company_id = deps["company_id"]
    branch_id = deps["branch_id"]
    user_id = deps["user_id"]

    def _logic():
        if operation == "insert":
            cashbox = create_cashboxes(
                db_session,
                _build_cashbox_payload(
                    company_id,
                    branch_id,
                    user_id,
                    unique_code("CashBox"),
                ),
            )
            return "ok", {"cashbox_id": cashbox.CashBoxID}

        if operation == "read":
            cashbox = create_cashboxes(
                db_session,
                _build_cashbox_payload(
                    company_id,
                    branch_id,
                    user_id,
                    unique_code("CashBoxR"),
                ),
            )
            fetched = get_cashboxes_by_id(db_session, cashbox.CashBoxID)
            if not fetched:
                return "error", "cashboxes_read_not_found"
            return "ok", {"cashbox_id": fetched.CashBoxID}

        if operation == "read_all":
            create_cashboxes(
                db_session,
                _build_cashbox_payload(
                    company_id,
                    branch_id,
                    user_id,
                    unique_code("CashBoxA"),
                ),
            )
            results = get_cashboxes(db_session)
            if not results:
                return "error", "cashboxes_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            cashbox = create_cashboxes(
                db_session,
                _build_cashbox_payload(
                    company_id,
                    branch_id,
                    user_id,
                    unique_code("CashBoxU"),
                ),
            )
            new_name = unique_code("CashBoxU2")
            updated = update_cashboxes(
                db_session,
                cashbox.CashBoxID,
                SimpleNamespace(
                    Name=new_name,
                    CurrentBalance=1500.0,
                    Notes="Actualizada",
                ),
            )
            if not updated or updated.Name != new_name:
                return "error", "cashboxes_update_failed"
            return "ok", {"cashbox_id": updated.CashBoxID}

        if operation == "delete":
            cashbox = create_cashboxes(
                db_session,
                _build_cashbox_payload(
                    company_id,
                    branch_id,
                    user_id,
                    unique_code("CashBoxD"),
                ),
            )
            delete_cashboxes(db_session, cashbox.CashBoxID)
            remaining = {c.CashBoxID for c in get_cashboxes(db_session)}
            if cashbox.CashBoxID in remaining:
                return "error", "cashboxes_delete_failed"
            return "ok", {"cashbox_id": cashbox.CashBoxID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_cashboxes_flow(db_session, tenant_ids, seeded_dependencies):
    company_id, branch_id = tenant_ids
    deps = {
        "company_id": company_id,
        "branch_id": branch_id,
        "user_id": seeded_dependencies["UserID"],
    }
    run_entity_flow(
        "cashboxes",
        "insert",
        lambda op: _execute_cashboxes_operation(db_session, deps, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
