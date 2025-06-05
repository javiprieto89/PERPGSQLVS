# app/graphql/schemas/tempstockentries.py
import strawberry
from typing import Optional
from datetime import datetime

@strawberry.input
class TempStockEntriesCreate:
    companyID: Optional[int] = None
    branchID: Optional[int] = None
    uniqueID: Optional[str] = None
    sessionID: Optional[str] = None
    userID: Optional[int] = None
    itemID: Optional[int] = None
    warehouseID: Optional[int] = None
    quantityChange: Optional[int] = None
    entryDate: Optional[datetime] = None
    reason: Optional[str] = None
    isProcessed: Optional[bool] = None

@strawberry.input
class TempStockEntriesUpdate:
    companyID: Optional[int] = None
    branchID: Optional[int] = None
    uniqueID: Optional[str] = None
    sessionID: Optional[str] = None
    userID: Optional[int] = None
    itemID: Optional[int] = None
    warehouseID: Optional[int] = None
    quantityChange: Optional[int] = None
    entryDate: Optional[datetime] = None
    reason: Optional[str] = None
    isProcessed: Optional[bool] = None

@strawberry.type
class TempStockEntriesInDB:
    tempStockEntryID: int
    companyID: Optional[int]
    branchID: Optional[int]
    uniqueID: Optional[str]
    sessionID: Optional[str]
    userID: Optional[int]
    itemID: Optional[int]
    warehouseID: Optional[int]
    quantityChange: Optional[int]
    entryDate: Optional[datetime]
    reason: Optional[str]
    isProcessed: Optional[bool]
