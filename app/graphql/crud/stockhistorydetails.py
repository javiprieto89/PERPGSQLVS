# app/graphql/crud/stockhistorydetails.py
from sqlalchemy.orm import Session
from app.models.stockhistorydetails import StockHistoryDetails
from app.graphql.schemas.stockhistorydetails import StockHistoryDetailsCreate, StockHistoryDetailsUpdate


def get_stockhistorydetails(db: Session):
    return db.query(StockHistoryDetails).all()


def get_stockhistorydetails_by_id(db: Session, history_id: int):
    return (
        db.query(StockHistoryDetails).filter(StockHistoryDetails.StockHistoryDetailID == history_id).first()
    )


def create_stockhistorydetails(db: Session, data: StockHistoryDetailsCreate):
    obj = StockHistoryDetails(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_stockhistorydetails(db: Session, history_id: int, data: StockHistoryDetailsUpdate):
    obj = get_stockhistorydetails_by_id(db, history_id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_stockhistorydetails(db: Session, history_id: int):
    obj = get_stockhistorydetails_by_id(db, history_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj