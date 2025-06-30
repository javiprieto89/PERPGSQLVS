# graphql/crud/pricelistitems.py
from sqlalchemy.orm import Session
from app.models.pricelistitems import PriceListItems
from app.graphql.schemas.pricelistitems import (
    PriceListItemsCreate,
    PriceListItemsUpdate,
)


def get_pricelistitems(db: Session):
    return db.query(PriceListItems).all()


def get_pricelistitems_by_id(db: Session, pricelistitemid: int):
    return (
        db.query(PriceListItems)
        .filter(PriceListItems.priceListItemID == pricelistitemid)
        .first()
    )


def create_pricelistitems(db: Session, data: PriceListItemsCreate):
    obj = PriceListItems(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_pricelistitems(
    db: Session, pricelistitemid: int, data: PriceListItemsUpdate
):
    obj = get_pricelistitems_by_id(db, pricelistitemid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_pricelistitems(db: Session, pricelistitemid: int):
    obj = get_pricelistitems_by_id(db, pricelistitemid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
