# app/graphql/crud/tempstockentries.py
from sqlalchemy.orm import Session
from app.models.tempstockentries import TempStockEntries
from app.graphql.schemas.tempstockentries import (
    TempStockEntriesCreate,
    TempStockEntriesUpdate,
)


def get_tempstockentries(db: Session):
    return db.query(TempStockEntries).all()


def get_tempstockentries_by_id(db: Session, tempstockentryid: int):
    return (
        db.query(TempStockEntries)
        .filter(TempStockEntries.tempStockEntryID == tempstockentryid)
        .first()
    )


def create_tempstockentries(db: Session, data: TempStockEntriesCreate):
    obj = TempStockEntries(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_tempstockentries(
    db: Session, tempstockentryid: int, data: TempStockEntriesUpdate
):
    obj = get_tempstockentries_by_id(db, tempstockentryid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_tempstockentries(db: Session, tempstockentryid: int):
    obj = get_tempstockentries_by_id(db, tempstockentryid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj

def get_tempstockentries_by_session(db: Session, session_id: str):
    """Obtener todas las entradas de stock para una sesión."""
    return (
        db.query(TempStockEntries)
        .filter(TempStockEntries.SessionID == session_id)
        .all()
    )


def process_tempstockentries(db: Session, session_id: str):
    """Procesar las entradas temporales de una sesión y moverlas a StockHistory."""
    from app.models.stockhistory import StockHistory
    from app.models.itemstock import Itemstock

    entries = (
        db.query(TempStockEntries)
        .filter(
            TempStockEntries.SessionID == session_id,
            TempStockEntries.IsProcessed == False,
        )
        .all()
    )

    processed = []
    for entry in entries:
        stock = (
            db.query(Itemstock)
            .filter(
                Itemstock.ItemID == entry.ItemID,
                Itemstock.WarehouseID == entry.WarehouseID,
            )
            .first()
        )
        qty_before = stock.Quantity if stock and stock.Quantity is not None else 0
        qty_after = qty_before + entry.Quantity

        if stock:
            stock.Quantity = qty_after  # type: ignore[assignment]
        else:
            stock = Itemstock(
                ItemID=entry.ItemID,
                WarehouseID=entry.WarehouseID,
                CompanyID=entry.CompanyID,
                BranchID=entry.BranchID,
                Quantity=qty_after,
            )
            db.add(stock)

        history = StockHistory(
            ItemID=entry.ItemID,
            CompanyID=entry.CompanyID,
            BranchID=entry.BranchID,
            WarehouseID=entry.WarehouseID,
            QuantityUpdate=entry.Quantity,
            QuantityBefore=qty_before,
            QuantityAfter=qty_after,
            TransactionDate=entry.EntryDate,
            Reason=entry.Reason,
            UserID=entry.UserID,
        )
        db.add(history)
        entry.IsProcessed = True  # type: ignore[assignment]
        processed.append(history)

    db.commit()

    for hist in processed:
        db.refresh(hist)
    return processed
