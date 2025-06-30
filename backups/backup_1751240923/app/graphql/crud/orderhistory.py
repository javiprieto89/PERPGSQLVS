# graphql/crud/orderhistory.py

from sqlalchemy.orm import Session
from app.models.orderhistory import OrderHistory
from app.graphql.schemas.orderhistory import OrderHistoryCreate, OrderHistoryUpdate


def get_orderhistory(db: Session):
    return db.query(OrderHistory).all()


def get_orderhistory_by_id(db: Session, historyid: int):
    return db.query(OrderHistory).filter(OrderHistory.historyID == historyid).first()


def create_orderhistory(db: Session, data: OrderHistoryCreate):
    obj = OrderHistory(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_orderhistory(db: Session, historyid: int, data: OrderHistoryUpdate):
    obj = get_orderhistory_by_id(db, historyid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_orderhistory(db: Session, historyid: int):
    obj = get_orderhistory_by_id(db, historyid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
