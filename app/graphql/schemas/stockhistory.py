# app/graphql/schemas/stockhistory.py
import strawberry
from typing import Optional
from datetime import datetime

@strawberry.input
class StockHistoryCreate:
    itemID: Optional[int] = None
    warehouseID: Optional[int] = None
    quantityChange: Optional[int] = None
    transactionDate: Optional[datetime] = None
    reason: Optional[str] = None

@strawberry.input
class StockHistoryUpdate:
    itemID: Optional[int] = None
    warehouseID: Optional[int] = None
    quantityChange: Optional[int] = None
    transactionDate: Optional[datetime] = None
    reason: Optional[str] = None

@strawberry.type
class StockHistoryInDB:
    stockHistoryID: int
    itemID: Optional[int]
    warehouseID: Optional[int]
    quantityChange: Optional[int]
    transactionDate: Optional[datetime]
    reason: Optional[str]
