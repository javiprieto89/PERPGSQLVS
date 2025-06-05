from sqlalchemy.orm import Session
from app.models.transactiontypes import TransactionTypes
from app.graphql.schemas.transactiontypes import (
    TransactionTypesCreate,
    TransactionTypesUpdate,
)


def get_transactiontypes(db: Session):
    return db.query(TransactionTypes).all()


def get_transactiontypes_by_id(db: Session, id: int):
    return (
        db.query(TransactionTypes).filter(
            TransactionTypes.transactTypeID == id).first()
    )


def create(db: Session, record: TransactionTypesCreate):
    db_record = TransactionTypes(**record.__dict__)
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


def update(db: Session, id: int, record: TransactionTypesUpdate):
    db_record = get_transactiontypes_by_id(db, id)
    if db_record:
        for k, v in record.__dict__.items():
            if v is not None:
                setattr(db_record, k, v)
        db.commit()
        db.refresh(db_record)
    return db_record


def delete(db: Session, id: int):
    db_record = get_transactiontypes_by_id(db, id)
    if db_record:
        db.delete(db_record)
        db.commit()
    return db_record
