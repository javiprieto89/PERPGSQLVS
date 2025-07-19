# app/graphql/crud/tempstockentries.py
from sqlalchemy.orm import Session
from app.models.tempstockentries import TempStockEntries
from app.graphql.schemas.tempstockentries import (
    TempStockEntriesCreate,
    TempStockEntriesUpdate,
)


def get_tempstockentries(db: Session):
    return db.query(TempStockEntries).all()


def get_tempstockentries_by_id(db: Session, entry_id: int):
    return (
        db.query(TempStockEntries)
        .filter(TempStockEntries.TempStockEntryID == entry_id)
        .first()
    )


def create_tempstockentries(db: Session, data: TempStockEntriesCreate):
    obj = TempStockEntries(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_tempstockentries(db: Session, entry_id: int, data: TempStockEntriesUpdate):
    obj = get_tempstockentries_by_id(db, entry_id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_tempstockentries(db: Session, entry_id: int):
    obj = get_tempstockentries_by_id(db, entry_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
