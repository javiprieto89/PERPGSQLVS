# app/crud/temporderdetails.py
from sqlalchemy.orm import Session
from typing import List, Optional
from dataclasses import asdict

from uuid import uuid4
from app.models.temporderdetails import TempOrderDetails
from app.graphql.schemas.temporderdetails import (
    TempOrderDetailsCreate,
    TempOrderDetailsUpdate,
)


def get_temporderdetails(db: Session) -> List[TempOrderDetails]:
    return db.query(TempOrderDetails).all()


def get_temporderdetail_by_session(
    db: Session, session_id: str
) -> Optional[TempOrderDetails]:
    return (
        db.query(TempOrderDetails)
        .filter(TempOrderDetails.OrderSessionID == session_id)
        .first()
    )


def create_temporderdetails(
    db: Session, data: TempOrderDetailsCreate
) -> TempOrderDetails:
    data_dict = {k: v for k, v in asdict(data).items() if v is not None}
    if "OrderSessionID" not in data_dict:
        data_dict["OrderSessionID"] = uuid4()
    obj = TempOrderDetails(**data_dict)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_temporderdetails(
    db: Session, session_id: str, data: TempOrderDetailsUpdate
) -> Optional[TempOrderDetails]:
    obj = get_temporderdetail_by_session(db, session_id)
    if not obj:
        return None
    for field, value in asdict(data).items():
        if value is not None:
            setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


def delete_temporderdetails(db: Session, session_id: str) -> Optional[TempOrderDetails]:
    obj = get_temporderdetail_by_session(db, session_id)
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
        .filter(TempOrderDetails.OrderSessionID == session_id)
        .all()
    )
