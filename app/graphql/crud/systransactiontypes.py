# app/graphql/crud/systransactiontypes.py
from sqlalchemy.orm import Session
from app.models.sys.transactiontypes import SysTransactionTypes


def get_systransactiontypes(db: Session):
    return db.query(SysTransactionTypes).all()


def get_systransactiontypes_by_id(db: Session, id: int):
    return (
        db.query(SysTransactionTypes)
        .filter(SysTransactionTypes.TransactTypeID == id)
        .first()
    )


def create_systransactiontypes(db: Session, record):
    raise NotImplementedError("SysTransactionTypes is read-only")


def update_systransactiontypes(db: Session, id: int, record):
    raise NotImplementedError("SysTransactionTypes is read-only")


def delete_systransactiontypes(db: Session, id: int):
    raise NotImplementedError("SysTransactionTypes is read-only")
