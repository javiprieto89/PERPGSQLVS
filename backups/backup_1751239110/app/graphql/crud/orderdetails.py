# graphql/crud/orderdetails.py

from sqlalchemy.orm import Session
from app.models.orderdetails import OrderDetails
from app.graphql.schemas.orderdetails import OrderDetailsCreate, OrderDetailsUpdate


def get_orderdetails(db: Session):
    return db.query(OrderDetails).all()


def get_orderdetails_by_id(db: Session, orderdetailsid: int):
    return (
        db.query(OrderDetails)
        .filter(OrderDetails.orderDetailsID == orderdetailsid)
        .first()
    )


def create_orderdetails(db: Session, data: OrderDetailsCreate):
    obj = OrderDetails(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_orderdetails(db: Session, orderdetailsid: int, data: OrderDetailsUpdate):
    obj = get_orderdetails_by_id(db, orderdetailsid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_orderdetails(db: Session, orderdetailsid: int):
    obj = get_orderdetails_by_id(db, orderdetailsid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
