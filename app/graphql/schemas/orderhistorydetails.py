# app/graphql/schemas/orderhistorydetails.py
import strawberry
from typing import Optional
from datetime import datetime

@strawberry.input
class OrderHistoryDetailsCreate:
    HistoryID: int
    ItemID: int
    Quantity: int
    UnitPrice: float
    Description: Optional[str] = None
    LastModified: Optional[datetime] = None

@strawberry.input
class OrderHistoryDetailsUpdate:
    HistoryID: Optional[int] = None
    ItemID: Optional[int] = None
    Quantity: Optional[int] = None
    UnitPrice: Optional[float] = None
    Description: Optional[str] = None
    LastModified: Optional[datetime] = None

@strawberry.type
class OrderHistoryDetailsInDB:
    OrderHistoryDetailID: int
    HistoryID: int
    ItemID: int
    Quantity: int
    UnitPrice: float
    Description: Optional[str]
    lastModified: Optional[datetime]