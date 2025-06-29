# app/graphql/schemas/tempstockentries.py
import strawberry
from typing import Optional
from datetime import datetime

@strawberry.input
class TempStockEntriesCreate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    UniqueID: Optional[str] = None
    SessionID: Optional[str] = None
    UserID: Optional[int] = None
    ItemID: Optional[int] = None
    WarehouseID: Optional[int] = None
    QuantityChange: Optional[int] = None
    EntryDate: Optional[datetime] = None
    Reason: Optional[str] = None
    IsProcessed: Optional[bool] = None

@strawberry.input
class TempStockEntriesUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    UniqueID: Optional[str] = None
    SessionID: Optional[str] = None
    UserID: Optional[int] = None
    ItemID: Optional[int] = None
    WarehouseID: Optional[int] = None
    QuantityChange: Optional[int] = None
    EntryDate: Optional[datetime] = None
    Reason: Optional[str] = None
    IsProcessed: Optional[bool] = None

@strawberry.type
class TempStockEntriesInDB:
    TempStockEntryID: int
    CompanyID: Optional[int]
    BranchID: Optional[int]
    UniqueID: Optional[str]
    SessionID: Optional[str]
    UserID: Optional[int]
    ItemID: Optional[int]
    WarehouseID: Optional[int]
    QuantityChange: Optional[int]
    EntryDate: Optional[datetime]
    Reason: Optional[str]
    IsProcessed: Optional[bool]
