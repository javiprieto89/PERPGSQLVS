# crud/cars.py
from sqlalchemy.orm import Session
from app.models.cars import Cars
from app.graphql.schemas.cars import CarsCreate, CarsUpdate


def get_cars(db: Session):
    return db.query(Cars).all()


def get_cars_by_id(db: Session, carid: int):
    return db.query(Cars).filter(Cars.CarID == carid).first()


def get_cars_by_client_id(db: Session, client_id: int):
    return db.query(Cars).filter(Cars.ClientID == client_id).all()


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
