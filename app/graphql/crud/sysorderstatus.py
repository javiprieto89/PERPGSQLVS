# app/graphql/crud/sysorderstatus.py
from sqlalchemy.orm import Session
from app.models.sys.orderstatus import SysOrderStatus


def get_sysorderstatus(db: Session):
    return db.query(SysOrderStatus).all()


def get_sysorderstatus_by_id(db: Session, orderstatusid: int):
    return (
        db.query(SysOrderStatus)
        .filter(SysOrderStatus.OrderStatusID == orderstatusid)
        .first()
    )


def create_sysorderstatus(db: Session, data):
    raise NotImplementedError("SysOrderStatus is read-only")


def update_sysorderstatus(db: Session, orderstatusid: int, data):
    raise NotImplementedError("SysOrderStatus is read-only")


def delete_sysorderstatus(db: Session, orderstatusid: int):
    raise NotImplementedError("SysOrderStatus is read-only")
