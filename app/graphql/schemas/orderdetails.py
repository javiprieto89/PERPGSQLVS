# app/graphql/schemas/orderdetails.py
import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class OrderDetailsCreate:
    OrderID: int
    ItemID: int
    Quantity: int
    UnitPrice: float
    Description: Optional[str] = None
    LastModified: Optional[datetime] = None


@strawberry.input
class OrderDetailsUpdate:
    OrderID: Optional[int] = None
    ItemID: Optional[int] = None
    Quantity: Optional[int] = None
    UnitPrice: Optional[float] = None
    Description: Optional[str] = None
    LastModified: Optional[datetime] = None


@strawberry.type
class OrderDetailsInDB:
    OrderDetailsID: int
    OrderID: int
    ItemID: int
    Quantity: int
    UnitPrice: float
    Description: Optional[str] = None
    LastModified: Optional[datetime] = None
