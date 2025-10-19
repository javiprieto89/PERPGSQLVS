from datetime import datetime, timezone
from types import SimpleNamespace

from app.graphql.crud.cashboxes import create_cashboxes
from app.graphql.crud.cashboxmovements import (
    create_cashboxmovements,
    delete_cashboxmovements,
    get_cashboxmovements,
    get_cashboxmovements_by_id,
    update_cashboxmovements,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_cashbox_payload(company_id: int, branch_id: int, user_id: int, name: str):
    now = datetime.now(timezone.utc)
    return SimpleNamespace(
        CompanyID=company_id,
        BranchID=branch_id,
        Name=name,
        Description="Caja movimientos",
        UserID=user_id,
        Notes="Seed cashbox",
        InitialBalance=1000.0,
        CurrentBalance=1000.0,
        IsActive=True,
        OpenDate=now,
        CloseDate=now,
    )


def _ensure_cashbox(db_session, company_id: int, branch_id: int, user_id: int):
    payload = _build_cashbox_payload(
        company_id,
        branch_id,
        user_id,
        unique_code("CashBoxMov"),
    )
    return create_cashboxes(db_session, payload)


def _build_movement_payload(
    cashbox_id: int,
    company_id: int,
    branch_id: int,
    user_id: int,
    amount: float,
    movement_type: str,
):
    return SimpleNamespace(
        CashBoxID=cashbox_id,
        CompanyID=company_id,
        BranchID=branch_id,
        Amount=amount,
        MovementType=movement_type,
        Description="Movimiento automático",
        UserID=user_id,
        Notes="Nota movimiento",
    )


def _execute_cashboxmovements_operation(db_session, deps, operation: str):
    company_id = deps["company_id"]
    branch_id = deps["branch_id"]
    user_id = deps["user_id"]
    cashbox = _ensure_cashbox(db_session, company_id, branch_id, user_id)

    def _logic():
        if operation == "insert":
            movement = create_cashboxmovements(
                db_session,
                _build_movement_payload(
                    cashbox.CashBoxID,
                    company_id,
                    branch_id,
                    user_id,
                    150.0,
                    "Ingreso",
                ),
            )
            return "ok", {"cashbox_movement_id": movement.CashBoxMovementID}

        if operation == "read":
            movement = create_cashboxmovements(
                db_session,
                _build_movement_payload(
                    cashbox.CashBoxID,
                    company_id,
                    branch_id,
                    user_id,
                    200.0,
                    "Ingreso",
                ),
            )
            fetched = get_cashboxmovements_by_id(db_session, movement.CashBoxMovementID)
            if not fetched:
                return "error", "cashboxmovements_read_not_found"
            return "ok", {"cashbox_movement_id": fetched.CashBoxMovementID}

        if operation == "read_all":
            create_cashboxmovements(
                db_session,
                _build_movement_payload(
                    cashbox.CashBoxID,
                    company_id,
                    branch_id,
                    user_id,
                    180.0,
                    "Ingreso",
                ),
            )
            results = get_cashboxmovements(db_session)
            if not results:
                return "error", "cashboxmovements_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            movement = create_cashboxmovements(
                db_session,
                _build_movement_payload(
                    cashbox.CashBoxID,
                    company_id,
                    branch_id,
                    user_id,
                    220.0,
                    "Ingreso",
                ),
            )
            updated = update_cashboxmovements(
                db_session,
                movement.CashBoxMovementID,
                SimpleNamespace(
                    Amount=250.0,
                    MovementType="Egreso",
                    Description="Actualizado",
                    Notes="Nota actualizada",
                ),
            )
            if not updated or float(updated.Amount) != 250.0:
                return "error", "cashboxmovements_update_failed"
            return "ok", {"cashbox_movement_id": updated.CashBoxMovementID}

        if operation == "delete":
            movement = create_cashboxmovements(
                db_session,
                _build_movement_payload(
                    cashbox.CashBoxID,
                    company_id,
                    branch_id,
                    user_id,
                    300.0,
                    "Ingreso",
                ),
            )
            delete_cashboxmovements(db_session, movement.CashBoxMovementID)
            remaining = {m.CashBoxMovementID for m in get_cashboxmovements(db_session)}
            if movement.CashBoxMovementID in remaining:
                return "error", "cashboxmovements_delete_failed"
            return "ok", {"cashbox_movement_id": movement.CashBoxMovementID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_cashboxmovements_flow(db_session, tenant_ids, seeded_dependencies):
    company_id, branch_id = tenant_ids
    deps = {
        "company_id": company_id,
        "branch_id": branch_id,
        "user_id": seeded_dependencies["UserID"],
    }
    run_entity_flow(
        "cashboxmovements",
        "insert",
        lambda op: _execute_cashboxmovements_operation(db_session, deps, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
