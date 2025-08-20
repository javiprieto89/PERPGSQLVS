# app/graphql/crud/stockhistory.py
from sqlalchemy.orm import Session
from app.models.stockhistory import StockHistory
from app.graphql.schemas.stockhistory import StockHistoryCreate, StockHistoryUpdate


def get_stockhistory(db: Session):
    return db.query(StockHistory).all()


def get_stockhistory_by_id(db: Session, history_id: int):
    return (
        db.query(StockHistory).filter(StockHistory.StockHistoryID == history_id).first()
    )


def create_stockhistory(db: Session, data: StockHistoryCreate):
    obj = StockHistory(
        CompanyID=data.CompanyID,
        BranchID=data.BranchID,
        UserID=data.UserID,
        ItemID=data.ItemID,
        WarehouseID=data.WarehouseID,
        QuantityUpdate=data.QuantityUpdate,
        QuantityBefore=data.QuantityBefore,
        QuantityAfter=data.QuantityAfter,
        TransactionDate=data.TransactionDate,
        Reason=data.Reason,
        TransactionType=data.TransactionType,
        Notes=data.Notes,
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_stockhistory(db: Session, history_id: int, data: StockHistoryUpdate):
    obj = get_stockhistory_by_id(db, history_id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_stockhistory(db: Session, history_id: int):
    obj = get_stockhistory_by_id(db, history_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
