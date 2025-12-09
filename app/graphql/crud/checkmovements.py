# app/crud/checkmovements.py - VERSIÓN COMPLETA
# Resumen: CRUD para movimientos de cheques (CheckMovements).

from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.checkmovements import CheckMovements


def get_checkmovements(db: Session) -> List[CheckMovements]:
    return db.query(CheckMovements).all()


def get_checkmovement_by_id(db: Session, id: int) -> Optional[CheckMovements]:
    return db.query(CheckMovements).filter(CheckMovements.CheckMovementID == id).first()


# ?? Obtener movimientos por cheque
def get_checkmovements_by_check(db: Session, check_id: int) -> List[CheckMovements]:
    return db.query(CheckMovements).filter(CheckMovements.CheckID == check_id).all()


# ?? Obtener movimientos por compañía
def get_checkmovements_by_company(
    db: Session, company_id: int
) -> List[CheckMovements]:
    return (
        db.query(CheckMovements)
        .filter(CheckMovements.CompanyID == company_id)
        .order_by(CheckMovements.EventDate.desc())
        .all()
    )


def create_checkmovement(db: Session, data) -> CheckMovements:
    new_item = CheckMovements(
        CompanyID=data.CompanyID,
        CheckID=data.CheckID,
        EventDate=data.EventDate,
        EventType=data.EventType,
        BankAccountID=data.BankAccountID,
        BranchID=data.BranchID,
        TransactionID=data.TransactionID,
        Notes=data.Notes
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


def update_checkmovement(db: Session, id: int, data) -> Optional[CheckMovements]:
    item = db.query(CheckMovements).filter(
        CheckMovements.CheckMovementID == id).first()
    if not item:
        return None

    for field, value in data.__dict__.items():
        if hasattr(item, field) and value is not None:
            setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return item


def delete_checkmovement(db: Session, id: int) -> bool:
    item = db.query(CheckMovements).filter(
        CheckMovements.CheckMovementID == id).first()
    if not item:
        return False

    db.delete(item)
    db.commit()
    return True
