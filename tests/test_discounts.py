from app.graphql.crud.discounts import (
    create_discounts,
    delete_discounts,
    get_discounts,
    get_discounts_by_id,
    update_discounts,
)
from app.graphql.schemas.discounts import DiscountsCreate, DiscountsUpdate
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _execute_discounts_operation(db_session, company_id: int, operation: str):
    def _logic():
        if operation == "insert":
            discount = create_discounts(
                db_session,
                DiscountsCreate(
                    CompanyID=company_id,
                    DiscountName=unique_code("Discount"),
                    Percentage=10.0,
                ),
            )
            return "ok", {"discount_id": discount.DiscountID}

        if operation == "read":
            discount = create_discounts(
                db_session,
                DiscountsCreate(
                    CompanyID=company_id,
                    DiscountName=unique_code("DiscountR"),
                    Percentage=5.0,
                ),
            )
            fetched = get_discounts_by_id(db_session, discount.DiscountID)
            if not fetched:
                return "error", "discounts_read_not_found"
            return "ok", {"discount_id": fetched.DiscountID}

        if operation == "read_all":
            create_discounts(
                db_session,
                DiscountsCreate(
                    CompanyID=company_id,
                    DiscountName=unique_code("DiscountA"),
                    Percentage=7.5,
                ),
            )
            results = get_discounts(db_session)
            if not results:
                return "error", "discounts_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            discount = create_discounts(
                db_session,
                DiscountsCreate(
                    CompanyID=company_id,
                    DiscountName=unique_code("DiscountU"),
                    Percentage=9.0,
                ),
            )
            new_name = unique_code("DiscountU2")
            updated = update_discounts(
                db_session,
                discount.DiscountID,
                DiscountsUpdate(
                    CompanyID=company_id,
                    DiscountName=new_name,
                    Percentage=12.0,
                ),
            )
            if not updated or updated.DiscountName != new_name:
                return "error", "discounts_update_failed"
            return "ok", {"discount_id": updated.DiscountID}

        if operation == "delete":
            discount = create_discounts(
                db_session,
                DiscountsCreate(
                    CompanyID=company_id,
                    DiscountName=unique_code("DiscountD"),
                    Percentage=4.0,
                ),
            )
            delete_discounts(db_session, discount.DiscountID)
            remaining = {d.DiscountID for d in get_discounts(db_session)}
            if discount.DiscountID in remaining:
                return "error", "discounts_delete_failed"
            return "ok", {"discount_id": discount.DiscountID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_discounts_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "discounts",
        "insert",
        lambda op: _execute_discounts_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
