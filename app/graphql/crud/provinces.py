# graphql/crud/provinces.py
from sqlalchemy.orm import Session
from app.models.provinces import Provinces
from app.graphql.schemas.provinces import ProvincesCreate, ProvincesUpdate


def get_provinces(db: Session):
    return db.query(Provinces).all()


def get_provinces_by_country(db: Session, country_id: int):
    """Obtener provincias filtradas por CountryID"""
    return db.query(Provinces).filter(Provinces.CountryID == country_id).all()


def get_provinces_by_id(db: Session, country_id: int, province_id: int):
    """Retrieve a province by its composite key."""
    return (
        db.query(Provinces)
        .filter(
            Provinces.CountryID == country_id,
            Provinces.ProvinceID == province_id,
        )
        .first()
    )


def create_provinces(db: Session, data: ProvincesCreate):
    obj = Provinces(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_provinces(db: Session, country_id: int, province_id: int, data: ProvincesUpdate):
    obj = get_provinces_by_id(db, country_id, province_id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_provinces(db: Session, country_id: int, province_id: int):
    obj = get_provinces_by_id(db, country_id, province_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
