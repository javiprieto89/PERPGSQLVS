import pytest

from app.graphql.crud.cars import (
    create_cars,
    delete_cars,
    get_cars_by_company,
    get_cars_by_id,
    update_cars,
)
from app.graphql.schemas.cars import CarsCreate, CarsUpdate
from app.models.carbrands import CarBrands
from app.models.carmodels import CarModels
from app.models.discounts import Discounts
from tests.interactive import run_entity_flow, unique_code


@pytest.fixture()
def car_dependencies(db_session, order_base_dependencies):
    """Ensure the minimum set of related records required to work with cars."""
    company_id = order_base_dependencies["CompanyID"]
    branch_id = order_base_dependencies["BranchID"]
    client_id = order_base_dependencies["ClientID"]
    discount_id = order_base_dependencies["DiscountID"]

    brand = (
        db_session.query(CarBrands)
        .filter(CarBrands.CompanyID == company_id, CarBrands.CarBrandName == "SeedCarBrand")
        .first()
    )
    if not brand:
        brand = CarBrands(CompanyID=company_id, CarBrandName="SeedCarBrand")
        db_session.add(brand)
        db_session.commit()
        db_session.refresh(brand)

    car_model = (
        db_session.query(CarModels)
        .filter(
            CarModels.CompanyID == company_id,
            CarModels.CarBrandID == brand.CarBrandID,
            CarModels.CarModelName == "SeedCarModel",
        )
        .first()
    )
    if not car_model:
        car_model = CarModels(
            CompanyID=company_id,
            CarBrandID=brand.CarBrandID,
            CarModelName="SeedCarModel",
        )
        db_session.add(car_model)
        db_session.commit()
        db_session.refresh(car_model)

    discount = (
        db_session.query(Discounts)
        .filter(Discounts.CompanyID == company_id, Discounts.DiscountID == discount_id)
        .one_or_none()
    )
    if not discount:
        raise RuntimeError("No existe Discount seeded para la compañía actual; revisá order_base_dependencies.")

    return {
        "company_id": company_id,
        "branch_id": branch_id,
        "client_id": client_id,
        "discount_id": discount.DiscountID,
        "car_brand_id": brand.CarBrandID,
        "car_model_id": car_model.CarModelID,
    }


def _create_sample_car(db_session, deps, license_plate=None):
    payload = CarsCreate(
        CompanyID=deps["company_id"],
        BranchID=deps["branch_id"],
        CarBrandID=deps["car_brand_id"],
        CarModelID=deps["car_model_id"],
        ClientID=deps["client_id"],
        LicensePlate=license_plate or unique_code("CAR")[:6],
        Year=2024,
        LastServiceMileage=0,
        IsDebtor=False,
        DiscountID=deps["discount_id"],
    )
    return create_cars(db_session, payload)


def _execute_cars_operation(db_session, deps, operation: str):
    try:
        if operation == "insert":
            car = _create_sample_car(db_session, deps)
            return "ok", {"car_id": car.CarID}

        if operation == "read":
            car = _create_sample_car(db_session, deps)
            fetched = get_cars_by_id(db_session, deps["company_id"], car.CarID)
            if not fetched:
                return "error", "cars_read_not_found"
            return "ok", {"car_id": fetched.CarID}

        if operation == "read_all":
            _create_sample_car(db_session, deps)
            results = get_cars_by_company(db_session, deps["company_id"])
            if not results:
                return "error", "cars_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            car = _create_sample_car(db_session, deps)
            new_plate = unique_code("UPD")[:6]
            updated = update_cars(
                db_session,
                deps["company_id"],
                car.CarID,
                CarsUpdate(LicensePlate=new_plate, LastServiceMileage=15000),
            )
            if not updated or updated.LicensePlate != new_plate:
                return "error", "cars_update_failed"
            return "ok", {"car_id": updated.CarID}

        if operation == "delete":
            car = _create_sample_car(db_session, deps)
            delete_cars(db_session, deps["company_id"], car.CarID)
            remaining = {
                found.CarID for found in get_cars_by_company(db_session, deps["company_id"])
            }
            if car.CarID in remaining:
                return "error", "cars_delete_failed"
            return "ok", {"car_id": car.CarID}

        return "error", f"operacion_no_soportada:{operation}"
    except Exception as exc:  # pragma: no cover - defensive
        db_session.rollback()
        return "error", f"{type(exc).__name__}:{exc}"


def _run_cars_flow(db_session, car_dependencies, default_op: str):
    def executor(operation: str):
        return _execute_cars_operation(db_session, car_dependencies, operation)

    run_entity_flow(
        "cars",
        default_op,
        executor,
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )


def test_cars_insert_flow(db_session, car_dependencies):
    _run_cars_flow(db_session, car_dependencies, default_op="insert")


def test_cars_read_flow(db_session, car_dependencies):
    _run_cars_flow(db_session, car_dependencies, default_op="read")


def test_cars_read_all_flow(db_session, car_dependencies):
    _run_cars_flow(db_session, car_dependencies, default_op="read_all")


def test_cars_update_flow(db_session, car_dependencies):
    _run_cars_flow(db_session, car_dependencies, default_op="update")
