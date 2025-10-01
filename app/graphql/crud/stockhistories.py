from sqlalchemy.orm import Session
from app.models.stockhistories import StockHistories
from app.graphql.schemas.stockhistories import StockHistoriesCreate, StockHistoriesUpdate


def get_stockhistories(db: Session):
    return (db.query(StockHistories).all()
)

def get_stockhistories_by_id(db: Session, history_id: int):
    return (
        db.query(StockHistories).filter(StockHistories.StockHistoryID == history_id).first()
    )

def create_stockhistories(db: Session, data: StockHistoriesCreate):
    obj = StockHistories(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def update_stockhistories(db: Session, history_id: int, data: StockHistoriesUpdate):
    obj = get_stockhistories_by_id(db, history_id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj

def delete_stockhistories(db: Session, history_id: int):
    obj = get_stockhistories_by_id(db, history_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj