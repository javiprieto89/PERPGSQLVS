# app/graphql/schemas/orderdetails.py
import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class OrderDetailsCreate:
    orderID: int
    itemID: int
    quantity: int
    unitPrice: float
    description: Optional[str] = None
    lastModified: Optional[datetime] = None


@strawberry.input
class OrderDetailsUpdate:
    orderID: Optional[int] = None
    itemID: Optional[int] = None
    quantity: Optional[int] = None
    unitPrice: Optional[float] = None
    description: Optional[str] = None
    lastModified: Optional[datetime] = None


@strawberry.type
class OrderDetailsInDB:
    orderDetailsID: int
    orderID: int
    itemID: int
    quantity: int
    unitPrice: float
    description: Optional[str] = None
    lastModified: Optional[datetime] = None
