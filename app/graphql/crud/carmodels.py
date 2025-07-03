# carmodels.py
from sqlalchemy.orm import Session
from app.models.carmodels import CarModels
from app.graphql.schemas.carmodels import CarModelsCreate, CarModelsUpdate


def get_carmodels(db: Session):
    return db.query(CarModels).all()


def get_carmodels_by_id(db: Session, carmodelid: int):
    return db.query(CarModels).filter(CarModels.CarModelID == carmodelid).first()


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
        db.delete(obj)
        db.commit()
    return obj
