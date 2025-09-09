from sqlalchemy.orm import Session
from app.models.itempricehistory import ItemPriceHistory
from app.graphql.schemas.itempricehistory import (
    ItemPriceHistoryCreate,
    ItemPriceHistoryUpdate,
)


def get_itempricehistory(db: Session):
    return db.query(ItemPriceHistory).all()


def get_itempricehistory_by_id(db: Session, pricehistoryid: int):
    return (
        db.query(ItemPriceHistory)
        .filter(ItemPriceHistory.priceHistoryID == pricehistoryid)
        .first()
    )


def create_itempricehistory(db: Session, data: ItemPriceHistoryCreate):
    obj = ItemPriceHistory(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_itempricehistory(
    db: Session, pricehistoryid: int, data: ItemPriceHistoryUpdate
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

