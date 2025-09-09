# graphql/crud/orderhistorydetails.py

from sqlalchemy.orm import Session
from app.models.orderhistorydetails import OrderHistoryDetails
from app.graphql.schemas.orderhistorydetails import (
    OrderHistoryDetailsCreate,
    OrderHistoryDetailsUpdate,
)


def get_orderhistorydetails(db: Session):
    return db.query(OrderHistoryDetails).all()


def get_orderhistorydetails_by_id(db: Session, orderhistorydetailid: int):
    return (
        db.query(OrderHistoryDetails)
        .filter(OrderHistoryDetails.OrderHistoryDetailID == orderhistorydetailid)
        .first()
    )


def create_orderhistorydetails(db: Session, data: OrderHistoryDetailsCreate):
    obj = OrderHistoryDetails(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_orderhistorydetails(
    db: Session, orderhistorydetailid: int, data: OrderHistoryDetailsUpdate
):
    obj = get_orderhistorydetails_by_id(db, orderhistorydetailid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_orderhistorydetails(db: Session, orderhistorydetailid: int):
    obj = get_orderhistorydetails_by_id(db, orderhistorydetailid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj

