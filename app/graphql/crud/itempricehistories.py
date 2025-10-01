# app/graphql/crud/itempricehistories.py
from sqlalchemy.orm import Session
from app.models.itempricehistories import ItemPriceHistories
from app.graphql.schemas.itempricehistories import (
    ItemPriceHistoriesCreate,
    ItemPriceHistoriesUpdate,
)


def get_itempricehistory(db: Session):
    return db.query(ItemPriceHistories).all()


def get_itempricehistory_by_id(db: Session, pricehistoryid: int):
    return (
        db.query(ItemPriceHistories)
        .filter(ItemPriceHistories.PriceHistoryID == pricehistoryid)
        .first()
    )


def create_itempricehistory(db: Session, data: ItemPriceHistoriesCreate):
    obj = ItemPriceHistories(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_itempricehistory(
    db: Session, pricehistoryid: int, data: ItemPriceHistoriesUpdate
):
    obj = get_itempricehistory_by_id(db, pricehistoryid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_itempricehistory(db: Session, pricehistoryid: int):
    obj = get_itempricehistory_by_id(db, pricehistoryid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
