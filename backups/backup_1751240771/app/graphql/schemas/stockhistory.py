# app/graphql/schemas/stockhistory.py
import strawberry
from typing import Optional
from datetime import datetime

@strawberry.input
class StockHistoryCreate:
    ItemID: Optional[int] = None
    WarehouseID: Optional[int] = None
    QuantityChange: Optional[int] = None
    TransactionDate: Optional[datetime] = None
    Reason: Optional[str] = None

@strawberry.input
class StockHistoryUpdate:
    ItemID: Optional[int] = None
    WarehouseID: Optional[int] = None
    QuantityChange: Optional[int] = None
    TransactionDate: Optional[datetime] = None
    Reason: Optional[str] = None

@strawberry.type
class StockHistoryInDB:
    StockHistoryID: int
    ItemID: Optional[int]
    WarehouseID: Optional[int]
    QuantityChange: Optional[int]
    TransactionDate: Optional[datetime]
    Reason: Optional[str]
