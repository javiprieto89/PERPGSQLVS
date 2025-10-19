from datetime import date
from types import SimpleNamespace

from app.graphql.crud.creditcardgroups import create_creditcardgroup
from app.graphql.crud.creditcards import create_creditcard
from app.graphql.crud.saleconditions import (
    create_saleconditions,
    delete_saleconditions,
    get_saleconditions,
    get_saleconditions_by_id,
    update_saleconditions,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _create_credit_card(db_session, company_id: int):
    group = create_creditcardgroup(
        db_session,
        SimpleNamespace(
            CompanyID=company_id,
            GroupName=unique_code("ScGroup"),
        ),
    )
    card = create_creditcard(
        db_session,
        SimpleNamespace(
            CompanyID=company_id,
            CreditCardGroupID=group.CreditCardGroupID,
            CardName=unique_code("ScCard"),
            Surcharge=0.0,
            Installments=1,
            IsActive=True,
        ),
    )
    return card


def _build_sale_condition_payload(company_id: int, credit_card_id: int, name: str, days: int = 30):
    return SimpleNamespace(
        CompanyID=company_id,
        CreditCardID=credit_card_id,
        Name=name,
        DueDate=date.today(),
        Surcharge=0.0,
        IsActive=True,
    )


def _execute_saleconditions_operation(db_session, company_id: int, operation: str):
    card = _create_credit_card(db_session, company_id)

    def _logic():
        if operation == "insert":
            sc = create_saleconditions(
                db_session,
                _build_sale_condition_payload(
                    company_id,
                    card.CreditCardID,
                    unique_code("SaleCond"),
                ),
            )
            return "ok", {"sale_condition_id": sc.SaleConditionID}

        if operation == "read":
            sc = create_saleconditions(
                db_session,
                _build_sale_condition_payload(
                    company_id,
                    card.CreditCardID,
                    unique_code("SaleCondR"),
                ),
            )
            fetched = get_saleconditions_by_id(db_session, sc.SaleConditionID)
            if not fetched:
                return "error", "saleconditions_read_not_found"
            return "ok", {"sale_condition_id": fetched.SaleConditionID}

        if operation == "read_all":
            create_saleconditions(
                db_session,
                _build_sale_condition_payload(
                    company_id,
                    card.CreditCardID,
                    unique_code("SaleCondA"),
                ),
            )
            results = get_saleconditions(db_session)
            if not results:
                return "error", "saleconditions_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            sc = create_saleconditions(
                db_session,
                _build_sale_condition_payload(
                    company_id,
                    card.CreditCardID,
                    unique_code("SaleCondU"),
                ),
            )
            new_name = unique_code("SaleCondU2")
            updated = update_saleconditions(
                db_session,
                sc.SaleConditionID,
                SimpleNamespace(Name=new_name, Surcharge=2.5),
            )
            if not updated or updated.Name != new_name:
                return "error", "saleconditions_update_failed"
            return "ok", {"sale_condition_id": updated.SaleConditionID}

        if operation == "delete":
            sc = create_saleconditions(
                db_session,
                _build_sale_condition_payload(
                    company_id,
                    card.CreditCardID,
                    unique_code("SaleCondD"),
                ),
            )
            delete_saleconditions(db_session, sc.SaleConditionID)
            remaining = {s.SaleConditionID for s in get_saleconditions(db_session)}
            if sc.SaleConditionID in remaining:
                return "error", "saleconditions_delete_failed"
            return "ok", {"sale_condition_id": sc.SaleConditionID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_saleconditions_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "saleconditions",
        "insert",
        lambda op: _execute_saleconditions_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
