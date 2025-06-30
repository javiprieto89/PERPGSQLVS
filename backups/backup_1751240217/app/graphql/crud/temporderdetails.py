# app/crud/temporderdetails.py
from sqlalchemy.orm import Session
from typing import List, Optional
from dataclasses import asdict

from app.models.temporderdetails import TempOrderDetails
from app.graphql.schemas.temporderdetails import (
    TempOrderDetailsCreate,
    TempOrderDetailsUpdate,
)


def get_temporderdetails(db: Session) -> List[TempOrderDetails]:
    return db.query(TempOrderDetails).all()


def get_temporderdetails_by_id(
    db: Session, temporderitemid: int
) -> Optional[TempOrderDetails]:
    return (
        db.query(TempOrderDetails)
        .filter(TempOrderDetails.tempOrderItemID == temporderitemid)
        .first()
    )


def create_temporderdetails(
    db: Session, data: TempOrderDetailsCreate
) -> TempOrderDetails:
    obj = TempOrderDetails(**asdict(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_temporderdetails(
    db: Session, temporderitemid: int, data: TempOrderDetailsUpdate
) -> Optional[TempOrderDetails]:
    obj = get_temporderdetails_by_id(db, temporderitemid)
    if not obj:
        return None
    for field, value in asdict(data).items():
        if value is not None:
            setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


def delete_temporderdetails(
    db: Session, temporderitemid: int
) -> Optional[TempOrderDetails]:
    obj = get_temporderdetails_by_id(db, temporderitemid)
    if not obj:
        return None
    db.delete(obj)
    db.commit()
    return obj


def get_temporderdetails_by_session(
    db: Session, session_id: str
) -> List[TempOrderDetails]:
    return (
        db.query(TempOrderDetails)
        .filter(TempOrderDetails.orderSessionID == session_id)
        .all()
    )
