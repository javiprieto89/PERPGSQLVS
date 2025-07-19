# carmodels.py
from sqlalchemy.orm import Session
from sqlalchemy import exists
from app.models.cars import Cars
from app.models.carmodels import CarModels
from app.models.carbrands import CarBrands
from app.graphql.schemas.carmodels import CarModelsCreate, CarModelsUpdate


def get_carmodels(db: Session):
    results = db.query(CarModels, CarBrands.Name.label("CarBrandName"))\
        .join(CarBrands, CarBrands.CarBrandID == CarModels.CarBrandID).all()
    models = []
    for m, brand_name in results:
        setattr(m, "CarBrandName", brand_name)
        models.append(m)
    return models


def get_carmodels_by_id(db: Session, carmodelid: int):
    result = db.query(CarModels, CarBrands.Name.label("CarBrandName"))\
        .join(CarBrands, CarBrands.CarBrandID == CarModels.CarBrandID)\
        .filter(CarModels.CarModelID == carmodelid).first()
    if result:
        m, brand_name = result
        setattr(m, "CarBrandName", brand_name)
        return m
    return None

def get_carmodels_by_brand(db: Session, carbrand_id: int):
    results = db.query(CarModels, CarBrands.Name.label("CarBrandName"))\
        .join(CarBrands, CarBrands.CarBrandID == CarModels.CarBrandID)\
        .filter(CarModels.CarBrandID == carbrand_id).all()
    models = []
    for m, brand_name in results:
        setattr(m, "CarBrandName", brand_name)
        models.append(m)
    return models


def create_carmodels(db: Session, data: CarModelsCreate):
    obj = CarModels(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_carmodels(db: Session, carmodelid: int, data: CarModelsUpdate):
    obj = get_carmodels_by_id(db, carmodelid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_carmodels(db: Session, carmodelid: int):
    obj = get_carmodels_by_id(db, carmodelid)
    if obj:
        linked_cars = db.query(exists().where(Cars.CarModelID == carmodelid)).scalar()
        if linked_cars:
            raise ValueError(
                "Cannot delete car model because it is referenced by existing cars"
            )
        db.delete(obj)
        db.commit()
    return obj
