# app/graphql/schemas/orderhistorydetails.py
import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class OrderHistoryDetailsCreate:
    OrderHistoryID: int  # Usar el nombre exacto del modelo
    ItemID: int
    WarehouseID: int  # Obligatorio según la DB
    Quantity: int
    UnitPrice: float
    Description: Optional[str] = None
    LastModified: Optional[datetime] = None


@strawberry.input
class OrderHistoryDetailsUpdate:
    OrderHistoryID: Optional[int] = None
    ItemID: Optional[int] = None
    Quantity: Optional[int] = None
    UnitPrice: Optional[float] = None
    Description: Optional[str] = None
    LastModified: Optional[datetime] = None


@strawberry.type
class OrderHistoryDetailsInDB:
    OrderHistoryDetailID: int
    OrderHistoryID: int
    ItemID: int
    Quantity: int
    UnitPrice: float
    Description: Optional[str]
    lastModified: Optional[datetime]
