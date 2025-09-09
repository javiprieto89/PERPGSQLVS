# app/graphql/crud/systransactiontypes.py
from sqlalchemy.orm import Session
from app.models.systransactiontypes import SysTransactionTypes
from app.graphql.schemas.systransactiontypes import (
    SysTransactionTypesCreate,
    SysTransactionTypesUpdate,
)


def get_systransactiontypes(db: Session):
    return db.query(SysTransactionTypes).all()


def get_systransactiontypes_by_id(db: Session, id: int):
    return (
        db.query(SysTransactionTypes).filter(
            SysTransactionTypes.TransactTypeID == id).first()
    )


def create_systransactiontype(db: Session, record: SysTransactionTypesCreate):
    db_record = SysTransactionTypes(**record.__dict__)
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


def update_systransactiontype(db: Session, id: int, record: SysTransactionTypesUpdate):
    db_record = get_systransactiontypes_by_id(db, id)
    if db_record:
        for k, v in record.__dict__.items():
            if v is not None:
                setattr(db_record, k, v)
        db.commit()
        db.refresh(db_record)
    return db_record


def delete_systransactiontype(db: Session, id: int):
    db_record = get_systransactiontypes_by_id(db, id)
    if db_record:
        db.delete(db_record)
        db.commit()
    return db_record

