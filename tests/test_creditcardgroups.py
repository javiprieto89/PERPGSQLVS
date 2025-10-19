from types import SimpleNamespace

from app.graphql.crud.creditcardgroups import (
    create_creditcardgroup,
    delete_creditcardgroup,
    get_creditcardgroup_by_id,
    get_creditcardgroups,
    update_creditcardgroup,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_payload(company_id: int, name: str):
    return SimpleNamespace(CompanyID=company_id, GroupName=name)


def _execute_creditcardgroups_operation(db_session, company_id: int, operation: str):
    def _logic():
        if operation == "insert":
            group = create_creditcardgroup(
                db_session,
                _build_payload(company_id, unique_code("CardGroup")),
            )
            return "ok", {"credit_card_group_id": group.CreditCardGroupID}

        if operation == "read":
            group = create_creditcardgroup(
                db_session,
                _build_payload(company_id, unique_code("CardGroupR")),
            )
            fetched = get_creditcardgroup_by_id(db_session, group.CreditCardGroupID)
            if not fetched:
                return "error", "creditcardgroups_read_not_found"
            return "ok", {"credit_card_group_id": fetched.CreditCardGroupID}

        if operation == "read_all":
            create_creditcardgroup(
                db_session,
                _build_payload(company_id, unique_code("CardGroupA")),
            )
            results = get_creditcardgroups(db_session)
            if not results:
                return "error", "creditcardgroups_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            group = create_creditcardgroup(
                db_session,
                _build_payload(company_id, unique_code("CardGroupU")),
            )
            new_name = unique_code("CardGroupU2")
            updated = update_creditcardgroup(
                db_session,
                group.CreditCardGroupID,
                _build_payload(company_id, new_name),
            )
            if not updated or updated.GroupName != new_name:
                return "error", "creditcardgroups_update_failed"
            return "ok", {"credit_card_group_id": updated.CreditCardGroupID}

        if operation == "delete":
            group = create_creditcardgroup(
                db_session,
                _build_payload(company_id, unique_code("CardGroupD")),
            )
            delete_creditcardgroup(db_session, group.CreditCardGroupID)
            remaining = {g.CreditCardGroupID for g in get_creditcardgroups(db_session)}
            if group.CreditCardGroupID in remaining:
                return "error", "creditcardgroups_delete_failed"
            return "ok", {"credit_card_group_id": group.CreditCardGroupID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_creditcardgroups_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "creditcardgroups",
        "insert",
        lambda op: _execute_creditcardgroups_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
