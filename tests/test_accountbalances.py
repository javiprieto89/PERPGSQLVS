from sqlalchemy import text

from app.graphql.crud.accountbalances import (
    delete_accountbalances,
    get_accountbalances,
    get_accountbalances_by_id,
    update_accountbalances,
)
from app.graphql.schemas.accountbalances import AccountBalancesUpdate
from tests.interactive import run_entity_flow, safe_db_call


def _execute_accountbalances_operation(
    db_session,
    company_id: int,
    branch_id: int,
    supplier_id: int,
    client_id: int,
    operation: str,
):
    def _insert_balance(amount: float):
        result = db_session.execute(
            text(
                """
                INSERT INTO AccountBalances (CompanyID, BranchID, SupplierID, ClientID, Balance)
                OUTPUT INSERTED.AccountID
                VALUES (:company_id, :branch_id, :supplier_id, :client_id, :balance)
                """
            ),
            {
                "company_id": company_id,
                "branch_id": branch_id,
                "supplier_id": supplier_id,
                "client_id": client_id,
                "balance": amount,
            },
        )
        account_id = result.scalar()
        db_session.commit()
        return account_id

    def _logic():
        if operation == "insert":
            account_id = _insert_balance(100.0)
            return "ok", {"account_id": account_id}

        if operation == "read":
            account_id = _insert_balance(200.0)
            fetched = get_accountbalances_by_id(db_session, account_id)
            if not fetched:
                return "error", "accountbalances_read_not_found"
            return "ok", {"account_id": fetched.AccountID}

        if operation == "read_all":
            _insert_balance(300.0)
            results = get_accountbalances(db_session)
            if not results:
                return "error", "accountbalances_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            account_id = _insert_balance(400.0)
            updated = update_accountbalances(
                db_session,
                account_id,
                AccountBalancesUpdate(Balance=450.0),
            )
            if not updated or float(updated.Balance) != 450.0:
                return "error", "accountbalances_update_failed"
            return "ok", {"account_id": updated.AccountID}

        if operation == "delete":
            account_id = _insert_balance(500.0)
            delete_accountbalances(db_session, account_id)
            remaining = {b.AccountID for b in get_accountbalances(db_session)}
            if account_id in remaining:
                return "error", "accountbalances_delete_failed"
            return "ok", {"account_id": account_id}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_accountbalances_flow(db_session, seeded_dependencies, order_base_dependencies):
    company_id = seeded_dependencies["CompanyID"]
    supplier_id = seeded_dependencies["SupplierID"]
    client_id = order_base_dependencies["ClientID"]
    run_entity_flow(
        "accountbalances",
        "insert",
        lambda op: _execute_accountbalances_operation(
            db_session, company_id, seeded_dependencies["BranchID"], supplier_id, client_id, op
        ),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
