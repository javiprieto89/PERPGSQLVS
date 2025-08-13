# carmodels.py
from sqlalchemy.orm import Session, joinedload
from app.models.cars import Cars
from app.models.carmodels import CarModels
from app.models.carbrands import CarBrands
from app.graphql.schemas.carmodels import CarModelsCreate, CarModelsUpdate


def get_carmodels(db: Session):
    return db.query(CarModels).options(joinedload(CarModels.carBrand)).all()


def get_carmodels_by_id(db: Session, carmodelid: int):
    return (
        db.query(CarModels)
        .options(joinedload(CarModels.carBrand))
        .filter(CarModels.CarModelID == carmodelid)
        .first()
    )


def get_carmodels_by_brand(db: Session, carbrand_id: int):
    return (
        db.query(CarModels)
        .options(joinedload(CarModels.carBrand))
        .filter(CarModels.CarBrandID == carbrand_id)
        .all()
    )


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
        linked_cars = db.query(Cars).filter(
            Cars.CarModelID == carmodelid).first() is not None
        if linked_cars:
            raise ValueError(
                "Cannot delete car model because it is referenced by existing cars"
            )
        db.delete(obj)
        db.commit()
    return obj
