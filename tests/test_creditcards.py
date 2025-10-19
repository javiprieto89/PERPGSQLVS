from types import SimpleNamespace

from app.graphql.crud.creditcardgroups import create_creditcardgroup
from app.graphql.crud.creditcards import (
    create_creditcard,
    delete_creditcard,
    get_creditcard_by_id,
    get_creditcards,
    update_creditcard,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _create_group(db_session, company_id: int):
    payload = SimpleNamespace(CompanyID=company_id, GroupName=unique_code("CardGroup"))
    return create_creditcardgroup(db_session, payload)


def _build_card_payload(company_id: int, group_id: int, name: str, surcharge=0.0, installments=1):
    return SimpleNamespace(
        CompanyID=company_id,
        CreditCardGroupID=group_id,
        CardName=name,
        Surcharge=surcharge,
        Installments=installments,
        IsActive=True,
    )


def _execute_creditcards_operation(db_session, company_id: int, operation: str):
    group = _create_group(db_session, company_id)

    def _logic():
        if operation == "insert":
            card = create_creditcard(
                db_session,
                _build_card_payload(company_id, group.CreditCardGroupID, unique_code("Card")),
            )
            return "ok", {"credit_card_id": card.CreditCardID}

        if operation == "read":
            card = create_creditcard(
                db_session,
                _build_card_payload(company_id, group.CreditCardGroupID, unique_code("CardR")),
            )
            fetched = get_creditcard_by_id(db_session, card.CreditCardID)
            if not fetched:
                return "error", "creditcards_read_not_found"
            return "ok", {"credit_card_id": fetched.CreditCardID}

        if operation == "read_all":
            create_creditcard(
                db_session,
                _build_card_payload(company_id, group.CreditCardGroupID, unique_code("CardA")),
            )
            results = get_creditcards(db_session)
            if not results:
                return "error", "creditcards_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            card = create_creditcard(
                db_session,
                _build_card_payload(company_id, group.CreditCardGroupID, unique_code("CardU")),
            )
            new_name = unique_code("CardU2")
            updated = update_creditcard(
                db_session,
                card.CreditCardID,
                SimpleNamespace(CardName=new_name, Surcharge=1.5, Installments=3),
            )
            if not updated or updated.CardName != new_name:
                return "error", "creditcards_update_failed"
            return "ok", {"credit_card_id": updated.CreditCardID}

        if operation == "delete":
            card = create_creditcard(
                db_session,
                _build_card_payload(company_id, group.CreditCardGroupID, unique_code("CardD")),
            )
            delete_creditcard(db_session, card.CreditCardID)
            remaining = {c.CreditCardID for c in get_creditcards(db_session)}
            if card.CreditCardID in remaining:
                return "error", "creditcards_delete_failed"
            return "ok", {"credit_card_id": card.CreditCardID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_creditcards_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "creditcards",
        "insert",
        lambda op: _execute_creditcards_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
