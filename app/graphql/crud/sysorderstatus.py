# app/graphql/crud/sysorderstatus.py

from sqlalchemy.orm import Session
from app.models.sysorderstatus import SysOrderStatus
from app.graphql.schemas.sysorderstatus import (
    SysOrderStatusCreate,
    SysOrderStatusUpdate,
)


def get_sysorderstatus(db: Session):
    return db.query(SysOrderStatus).all()


def get_sysorderstatus_by_id(db: Session, orderstatusid: int):
    return (
        db.query(SysOrderStatus).filter(
            SysOrderStatus.OrderStatusID == orderstatusid).first()
    )


def create_sysorderstatus(db: Session, data: SysOrderStatusCreate):
    obj = SysOrderStatus(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_sysorderstatus(db: Session, orderstatusid: int, data: SysOrderStatusUpdate):
    obj = get_sysorderstatus_by_id(db, orderstatusid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_sysorderstatus(db: Session, orderstatusid: int):
    obj = get_sysorderstatus_by_id(db, orderstatusid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj

