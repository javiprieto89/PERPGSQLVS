from app.graphql.crud.carbrands import create_carbrands
from app.graphql.crud.carmodels import (
    create_carmodels,
    delete_carmodels,
    get_carmodels_by_brand,
    get_carmodels_by_id,
    update_carmodels,
)
from app.graphql.schemas.carbrands import CarBrandsCreate
from app.graphql.schemas.carmodels import CarModelsCreate, CarModelsUpdate
from tests.interactive import run_entity_flow, unique_code


def _prepare_brand(db_session, company_id: int):
    brand = create_carbrands(
        db_session,
        CarBrandsCreate(
            CompanyID=company_id,
            CarBrandName=unique_code("Brand"),
        ),
    )
    return brand


def _execute_carmodels_operation(db_session, company_id: int, operation: str):
    try:
        if operation == "insert":
            brand = _prepare_brand(db_session, company_id)
            model = create_carmodels(
                db_session,
                CarModelsCreate(
                    CompanyID=company_id,
                    CarBrandID=brand.CarBrandID,
                    CarModelName=unique_code("Model"),
                ),
            )
            return "ok", {"car_model_id": model.CarModelID}

        if operation == "read":
            brand = _prepare_brand(db_session, company_id)
            model = create_carmodels(
                db_session,
                CarModelsCreate(
                    CompanyID=company_id,
                    CarBrandID=brand.CarBrandID,
                    CarModelName=unique_code("ModelR"),
                ),
            )
            fetched = get_carmodels_by_id(
                db_session,
                company_id,
                brand.CarBrandID,
                model.CarModelID,
            )
            if not fetched:
                return "error", "carmodels_read_not_found"
            return "ok", {"car_model_id": fetched.CarModelID}

        if operation == "read_all":
            brand = _prepare_brand(db_session, company_id)
            create_carmodels(
                db_session,
                CarModelsCreate(
                    CompanyID=company_id,
                    CarBrandID=brand.CarBrandID,
                    CarModelName=unique_code("ModelA"),
                ),
            )
            results = get_carmodels_by_brand(db_session, company_id, brand.CarBrandID)
            if not results:
                return "error", "carmodels_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            brand = _prepare_brand(db_session, company_id)
            model = create_carmodels(
                db_session,
                CarModelsCreate(
                    CompanyID=company_id,
                    CarBrandID=brand.CarBrandID,
                    CarModelName=unique_code("ModelU"),
                ),
            )
            new_name = unique_code("ModelU2")
            updated = update_carmodels(
                db_session,
                company_id,
                brand.CarBrandID,
                model.CarModelID,
                CarModelsUpdate(CarModelName=new_name),
            )
            if not updated or updated.CarModelName != new_name:
                return "error", "carmodels_update_failed"
            return "ok", {"car_model_id": updated.CarModelID}

        if operation == "delete":
            brand = _prepare_brand(db_session, company_id)
            model = create_carmodels(
                db_session,
                CarModelsCreate(
                    CompanyID=company_id,
                    CarBrandID=brand.CarBrandID,
                    CarModelName=unique_code("ModelD"),
                ),
            )
            delete_carmodels(
                db_session, company_id, brand.CarBrandID, model.CarModelID
            )
            remaining = {
                m.CarModelID
                for m in get_carmodels_by_brand(db_session, company_id, brand.CarBrandID)
            }
            if model.CarModelID in remaining:
                return "error", "carmodels_delete_failed"
            return "ok", {"car_model_id": model.CarModelID}

        return "error", f"operacion_no_soportada:{operation}"
    except Exception as exc:  # pragma: no cover - defensive
        db_session.rollback()
        return "error", f"{type(exc).__name__}:{exc}"


def test_carmodels_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "carmodels",
        "insert",
        lambda op: _execute_carmodels_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
