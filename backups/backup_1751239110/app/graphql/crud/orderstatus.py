# graphql/crud/orderstatus.py

from sqlalchemy.orm import Session
from app.models.orderstatus import OrderStatus
from app.graphql.schemas.orderstatus import OrderStatusCreate, OrderStatusUpdate


def get_orderstatus(db: Session):
    return db.query(OrderStatus).all()


def get_orderstatus_by_id(db: Session, orderstatusid: int):
    return (
        db.query(OrderStatus).filter(
            OrderStatus.orderStatusID == orderstatusid).first()
    )


def create_orderstatus(db: Session, data: OrderStatusCreate):
    obj = OrderStatus(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_orderstatus(db: Session, orderstatusid: int, data: OrderStatusUpdate):
    obj = get_orderstatus_by_id(db, orderstatusid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_orderstatus(db: Session, orderstatusid: int):
    obj = get_orderstatus_by_id(db, orderstatusid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
