# app/graphql/schemas/stockhistorydetails.py
import strawberry
from typing import Optional
from datetime import date


@strawberry.input
class StockHistoryDetailsCreate:
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
class StockHistoryDetailsUpdate:
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
class StockHistoryDetailsInDB:
    StockHistoryID: int
    ItemID: int
    CompanyID: int
    BranchID: int
    WarehouseID: int
    QuantityUpdate: int
    QuantityBefore: int
    QuantityAfter: int
    TransactionDate: date
    Reason: Optional[str]
    UserID: int