# crud/countries.py
from sqlalchemy.orm import Session
from app.models.countries import Countries
from app.graphql.schemas.countries import CountriesCreate, CountriesUpdate


def get_countries(db: Session):
    return db.query(Countries).all()


def get_countries_by_id(db: Session, countryid: int):
    return db.query(Countries).filter(Countries.CountryID == countryid).first()


def create_countries(db: Session, data: CountriesCreate):
    obj = Countries(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_countries(db: Session, countryid: int, data: CountriesUpdate):
    obj = get_countries_by_id(db, countryid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_countries(db: Session, countryid: int):
    obj = get_countries_by_id(db, countryid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj

