# crud/cars.py
from sqlalchemy.orm import Session
from app.models.cars import Cars
from app.models.carmodels import CarModels
from app.models.carbrands import CarBrands
from app.graphql.schemas.cars import CarsCreate, CarsUpdate


def get_cars(db: Session):
    results = db.query(
        Cars,
        CarModels.Model.label("CarModelName"),
        CarBrands.Name.label("CarBrandName"),
        CarBrands.CarBrandID.label("CarBrandID")
    ).join(CarModels, Cars.CarModelID == CarModels.CarModelID)
    results = results.join(CarBrands, CarModels.CarBrandID == CarBrands.CarBrandID).all()
    cars = []
    for c, model_name, brand_name, brand_id in results:
        setattr(c, "CarModelName", model_name)
        setattr(c, "CarBrandName", brand_name)
        setattr(c, "CarBrandID", brand_id)
        cars.append(c)
    return cars


def get_cars_by_id(db: Session, carid: int):
    result = db.query(
        Cars,
        CarModels.Model.label("CarModelName"),
        CarBrands.Name.label("CarBrandName"),
        CarBrands.CarBrandID.label("CarBrandID")
    ).join(CarModels, Cars.CarModelID == CarModels.CarModelID)
    result = result.join(CarBrands, CarModels.CarBrandID == CarBrands.CarBrandID)
    result = result.filter(Cars.CarID == carid).first()
    if result:
        c, model_name, brand_name, brand_id = result
        setattr(c, "CarModelName", model_name)
        setattr(c, "CarBrandName", brand_name)
        setattr(c, "CarBrandID", brand_id)
        return c
    return None


def get_cars_by_client_id(db: Session, client_id: int):
    results = db.query(
        Cars,
        CarModels.Model.label("CarModelName"),
        CarBrands.Name.label("CarBrandName"),
        CarBrands.CarBrandID.label("CarBrandID")
    ).join(CarModels, Cars.CarModelID == CarModels.CarModelID)
    results = results.join(CarBrands, CarModels.CarBrandID == CarBrands.CarBrandID)
    results = results.filter(Cars.ClientID == client_id).all()
    cars = []
    for c, model_name, brand_name, brand_id in results:
        setattr(c, "CarModelName", model_name)
        setattr(c, "CarBrandName", brand_name)
        setattr(c, "CarBrandID", brand_id)
        cars.append(c)
    return cars


def create_cars(db: Session, data: CarsCreate):
    obj = Cars(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_cars(db: Session, carid: int, data: CarsUpdate):
    obj = get_cars_by_id(db, carid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_cars(db: Session, carid: int):
    obj = get_cars_by_id(db, carid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
