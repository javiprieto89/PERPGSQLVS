from app.graphql.crud.brands import (
    create_brands,
    delete_brands,
    get_brands_by_company,
    get_brands_by_id,
    update_brands,
)
from app.graphql.schemas.brands import BrandsCreate, BrandsUpdate
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _execute_brands_operation(db_session, company_id: int, operation: str):
    def _logic():
        if operation == "insert":
            brand = create_brands(
                db_session,
                BrandsCreate(
                    BrandName=unique_code("Brand"),
                    CompanyID=company_id,
                    IsActive=True,
                ),
            )
            return "ok", {"brand_id": brand.BrandID}

        if operation == "read":
            brand = create_brands(
                db_session,
                BrandsCreate(
                    BrandName=unique_code("BrandR"),
                    CompanyID=company_id,
                    IsActive=True,
                ),
            )
            fetched = get_brands_by_id(db_session, company_id, brand.BrandID)
            if not fetched:
                return "error", "brands_read_not_found"
            return "ok", {"brand_id": fetched.BrandID}

        if operation == "read_all":
            create_brands(
                db_session,
                BrandsCreate(
                    BrandName=unique_code("BrandA"),
                    CompanyID=company_id,
                    IsActive=True,
                ),
            )
            results = get_brands_by_company(db_session, company_id)
            if not results:
                return "error", "brands_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            brand = create_brands(
                db_session,
                BrandsCreate(
                    BrandName=unique_code("BrandU"),
                    CompanyID=company_id,
                    IsActive=True,
                ),
            )
            new_name = unique_code("BrandU2")
            updated = update_brands(
                db_session,
                company_id,
                brand.BrandID,
                BrandsUpdate(BrandName=new_name),
            )
            if not updated or updated.BrandName != new_name:
                return "error", "brands_update_failed"
            return "ok", {"brand_id": updated.BrandID}

        if operation == "delete":
            brand = create_brands(
                db_session,
                BrandsCreate(
                    BrandName=unique_code("BrandD"),
                    CompanyID=company_id,
                    IsActive=True,
                ),
            )
            delete_brands(db_session, company_id, brand.BrandID)
            remaining = {
                b.BrandID for b in get_brands_by_company(db_session, company_id)
            }
            if brand.BrandID in remaining:
                return "error", "brands_delete_failed"
            return "ok", {"brand_id": brand.BrandID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_brands_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "brands",
        "insert",
        lambda op: _execute_brands_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
