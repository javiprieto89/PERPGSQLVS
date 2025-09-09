# app/graphql/schemas/stockhistory.py
import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class StockHistoryCreate:
    ItemID: int
    CompanyID: int
    BranchID: int
    WarehouseID: int
    QuantityUpdate: int
    QuantityBefore: int
    QuantityAfter: int
    Reason: Optional[str] = None
    UserID: int


@strawberry.input
class StockHistoryUpdate:
    ItemID: Optional[int] = None
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    WarehouseID: Optional[int] = None
    QuantityUpdate: Optional[int] = None
    QuantityBefore: Optional[int] = None
    QuantityAfter: Optional[int] = None
    Reason: Optional[str] = None
    UserID: Optional[int] = None


@strawberry.type
class StockHistoryInDB:
    StockHistoryID: int
    ItemID: int
    CompanyID: int
    BranchID: int
    WarehouseID: int
    QuantityUpdate: int
    QuantityBefore: int
    QuantityAfter: int
    TransactionDate: datetime
    Reason: Optional[str]
    UserID: int