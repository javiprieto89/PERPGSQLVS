from app.graphql.crud.carbrands import (
    create_carbrands,
    delete_carbrands,
    get_carbrands_by_company,
    get_carbrands_by_id,
    update_carbrands,
)
from app.graphql.schemas.carbrands import CarBrandsCreate, CarBrandsUpdate
from tests.interactive import run_entity_flow, unique_code


def _execute_carbrands_operation(db_session, company_id: int, operation: str):
    try:
        if operation == "insert":
            brand = create_carbrands(
                db_session,
                CarBrandsCreate(
                    CompanyID=company_id,
                    CarBrandName=unique_code("Brand"),
                ),
            )
            return "ok", {"car_brand_id": brand.CarBrandID}

        if operation == "read":
            brand = create_carbrands(
                db_session,
                CarBrandsCreate(
                    CompanyID=company_id,
                    CarBrandName=unique_code("BrandR"),
                ),
            )
            fetched = get_carbrands_by_id(db_session, company_id, brand.CarBrandID)
            if not fetched:
                return "error", "carbrands_read_not_found"
            return "ok", {"car_brand_id": fetched.CarBrandID}

        if operation == "read_all":
            create_carbrands(
                db_session,
                CarBrandsCreate(
                    CompanyID=company_id,
                    CarBrandName=unique_code("BrandA"),
                ),
            )
            results = get_carbrands_by_company(db_session, company_id)
            if not results:
                return "error", "carbrands_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            brand = create_carbrands(
                db_session,
                CarBrandsCreate(
                    CompanyID=company_id,
                    CarBrandName=unique_code("BrandU"),
                ),
            )
            new_name = unique_code("BrandU2")
            updated = update_carbrands(
                db_session,
                company_id,
                brand.CarBrandID,
                CarBrandsUpdate(CarBrandName=new_name),
            )
            if not updated or updated.CarBrandName != new_name:
                return "error", "carbrands_update_failed"
            return "ok", {"car_brand_id": updated.CarBrandID}

        if operation == "delete":
            brand = create_carbrands(
                db_session,
                CarBrandsCreate(
                    CompanyID=company_id,
                    CarBrandName=unique_code("BrandD"),
                ),
            )
            delete_carbrands(db_session, company_id, brand.CarBrandID)
            remaining = {
                b.CarBrandID for b in get_carbrands_by_company(db_session, company_id)
            }
            if brand.CarBrandID in remaining:
                return "error", "carbrands_delete_failed"
            return "ok", {"car_brand_id": brand.CarBrandID}

        return "error", f"operacion_no_soportada:{operation}"
    except Exception as exc:  # pragma: no cover - defensive
        db_session.rollback()
        return "error", f"{type(exc).__name__}:{exc}"


def test_carbrands_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "carbrands",
        "insert",
        lambda op: _execute_carbrands_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
