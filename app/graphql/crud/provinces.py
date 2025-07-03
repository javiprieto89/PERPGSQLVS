# graphql/crud/provinces.py
from sqlalchemy.orm import Session
from app.models.provinces import Provinces
from app.graphql.schemas.provinces import ProvincesCreate, ProvincesUpdate


def get_provinces(db: Session):
    return db.query(Provinces).all()


def get_provinces_by_id(db: Session, provinceid: int):
    return db.query(Provinces).filter(Provinces.ProvinceID == provinceid).first()


def create_provinces(db: Session, data: ProvincesCreate):
    obj = Provinces(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_provinces(db: Session, provinceid: int, data: ProvincesUpdate):
    obj = get_provinces_by_id(db, provinceid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_provinces(db: Session, provinceid: int):
    obj = get_provinces_by_id(db, provinceid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
