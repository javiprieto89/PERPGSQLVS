# graphql/crud/pricelists.py
from sqlalchemy.orm import Session
from app.models.pricelists import PriceLists
from app.graphql.schemas.pricelists import PriceListsCreate, PriceListsUpdate


def get_pricelists(db: Session):
    return db.query(PriceLists).all()


def get_pricelists_by_id(db: Session, pricelistid: int):
    return db.query(PriceLists).filter(PriceLists.priceListID == pricelistid).first()


def create_pricelists(db: Session, data: PriceListsCreate):
    obj = PriceLists(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_pricelists(db: Session, pricelistid: int, data: PriceListsUpdate):
    obj = get_pricelists_by_id(db, pricelistid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_pricelists(db: Session, pricelistid: int):
    obj = get_pricelists_by_id(db, pricelistid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
