# app/graphql/schemas/stockhistory.py
import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class StockHistoryCreate:
    CompanyID: int
    BranchID: int
    UserID: int
    ItemID: int
    WarehouseID: int
    QuantityUpdate: int
    QuantityBefore: int
    QuantityAfter: int
    Reason: Optional[str] = None
    TransactionType: Optional[str] = None
    Notes: Optional[str] = None


@strawberry.input
class StockHistoryUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    UserID: Optional[int] = None
    ItemID: Optional[int] = None
    WarehouseID: Optional[int] = None
    QuantityUpdate: Optional[int] = None
    QuantityBefore: Optional[int] = None
    QuantityAfter: Optional[int] = None
    Reason: Optional[str] = None
    TransactionType: Optional[str] = None
    Notes: Optional[str] = None


@strawberry.type
class StockHistoryInDB:
    StockHistoryID: int
    CompanyID: int
    BranchID: int
    UserID: int
    ItemID: int
    WarehouseID: int
    QuantityUpdate: int
    QuantityBefore: int
    QuantityAfter: int
    TransactionDate: datetime
    Reason: Optional[str]
    TransactionType: Optional[str]
    Notes: Optional[str]
