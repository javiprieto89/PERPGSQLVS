# app/graphql/schemas/tempstockentries.py
import strawberry
from typing import Optional
from datetime import datetime
from uuid import UUID


@strawberry.input
class TempStockEntriesCreate:
    CompanyID: int
    BranchID: int
    SessionID: str
    UserID: int
    ItemID: int
    WarehouseID: int
    Quantity: int
    Reason: Optional[str] = None


@strawberry.input
class TempStockEntriesUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    SessionID: Optional[str] = None
    UserID: Optional[int] = None
    ItemID: Optional[int] = None
    WarehouseID: Optional[int] = None
    Quantity: Optional[int] = None
    Reason: Optional[str] = None
    IsProcessed: Optional[bool] = None


@strawberry.type
class TempStockEntriesInDB:
    TempStockEntryID: int
    CompanyID: int
    BranchID: int
    UniqueID: UUID
    SessionID: str
    UserID: int
    ItemID: int
    WarehouseID: int
    Quantity: int
    EntryDate: datetime
    Reason: Optional[str]
    IsProcessed: bool
