# app/graphql/crud/tempstockhistorydetails.py
from sqlalchemy.orm import Session
import uuid
from app.models.tempstockhistorydetails import TempStockHistoryDetails
from app.graphql.schemas.tempstockhistorydetails import (
    TempStockHistoryDetailsCreate,
    TempStockHistoryDetailsUpdate,
)


def get_tempstockhistorydetails(db: Session):
    return db.query(TempStockHistoryDetails).all()


def get_tempstockhistorydetails_by_id(db: Session, entry_id: int):
    return (
        db.query(TempStockHistoryDetails)
        .filter(TempStockHistoryDetails.TempStockEntryID == entry_id)
        .first()
    )


def get_tempstockhistorydetails_by_session(db: Session, session_id: str):
    """Obtener todas las entradas de stock temporales para un SessionID."""
    return (
        db.query(TempStockHistoryDetails)
        .filter(TempStockHistoryDetails.SessionID == session_id)
        .all()
    )


def create_tempstockhistorydetails(db: Session, data: TempStockHistoryDetailsCreate):
    """Crear entrada temporal de stock manteniendo un UniqueID por sesion."""
    # Buscar si ya existe un registro para esta sesion para reutilizar el UniqueID
    existing = (
        db.query(TempStockHistoryDetails)
        .filter(TempStockHistoryDetails.SessionID == data.SessionID)
        .first()
    )

    unique_id = existing.UniqueID if existing else uuid.uuid4()

    obj = TempStockHistoryDetails(**vars(data), UniqueID=unique_id)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_tempstockhistorydetails(db: Session, entry_id: int, data: TempStockHistoryDetailsUpdate):
    obj = get_tempstockhistorydetails_by_id(db, entry_id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_tempstockhistorydetails(db: Session, entry_id: int):
    obj = get_tempstockhistorydetails_by_id(db, entry_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj


def process_stock_session(db: Session, session_id: str):
    """Procesar todas las entradas de una sesión y actualizar stock."""
    from app.models.itemstock import Itemstock
    from app.models.stockhistorydetails import StockHistoryDetails

    entries = (
        db.query(TempStockHistoryDetails)
        .filter(TempStockHistoryDetails.SessionID == session_id, TempStockHistoryDetails.IsProcessed == False)
        .all()
    )

    processed_records = []

    for entry in entries:
        # Buscar registro de stock
        item_stock = (
            db.query(Itemstock)
            .filter(
                Itemstock.ItemID == entry.ItemID,
                Itemstock.WarehouseID == entry.WarehouseID,
            )
            .first()
        )

        if item_stock:
            quantity_before = item_stock.Quantity or 0
            setattr(
                item_stock,
                "Quantity",
                (item_stock.Quantity or 0) + entry.Quantity,
            )
        else:
            quantity_before = 0
            item_stock = Itemstock(
                ItemID=entry.ItemID,
                WarehouseID=entry.WarehouseID,
                CompanyID=entry.CompanyID,
                BranchID=entry.BranchID,
                Quantity=entry.Quantity,
            )
            db.add(item_stock)

        history = StockHistoryDetails(
            ItemID=entry.ItemID,
            CompanyID=entry.CompanyID,
            BranchID=entry.BranchID,
            WarehouseID=entry.WarehouseID,
            QuantityUpdate=entry.Quantity,
            QuantityBefore=quantity_before,
            QuantityAfter=(quantity_before + entry.Quantity),
            Reason=entry.Reason,
            UserID=entry.UserID,
        )

        db.add(history)
        setattr(entry, "IsProcessed", True)
        processed_records.append(history)

    db.commit()

    for record in processed_records:
        db.refresh(record)

    return processed_records

