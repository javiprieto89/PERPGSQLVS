# app/graphql/schemas/orderhistorydetails.py
import strawberry
from typing import Optional
from datetime import datetime

@strawberry.input
class OrderHistoryDetailsCreate:
    historyID: int
    itemID: int
    quantity: int
    unitPrice: float
    description: Optional[str] = None
    lastModified: Optional[datetime] = None

@strawberry.input
class OrderHistoryDetailsUpdate:
    historyID: Optional[int] = None
    itemID: Optional[int] = None
    quantity: Optional[int] = None
    unitPrice: Optional[float] = None
    description: Optional[str] = None
    lastModified: Optional[datetime] = None

@strawberry.type
class OrderHistoryDetailsInDB:
    OrderHistoryDetailID: int
    historyID: int
    itemID: int
    quantity: int
    unitPrice: float
    description: Optional[str]
    lastModified: Optional[datetime]
