# app/graphql/schemas/orderdetails.py
import strawberry
from typing import Optional
from app.graphql.schemas.items import ItemsInDB
from app.graphql.schemas.warehouses import WarehousesInDB
from datetime import datetime


@strawberry.input
class OrderDetailsCreate:
    OrderID: Optional[int] = None  # ← CAMBIO: Ahora es opcional
    ItemID: int
    WarehouseID: int
    Quantity: int
    UnitPrice: float
    Description: Optional[str] = None
    LastModified: Optional[datetime] = None


@strawberry.input
class OrderDetailsUpdate:
    OrderID: Optional[int] = None
    ItemID: Optional[int] = None
    WarehouseID: Optional[int] = None
    Quantity: Optional[int] = None
    UnitPrice: Optional[float] = None
    Description: Optional[str] = None
    LastModified: Optional[datetime] = None


@strawberry.type
class OrderDetailsInDB:
    OrderDetailID: int  # ← IMPORTANTE: Este campo debe coincidir con el modelo de la DB
    OrderID: int
    ItemID: int
    WarehouseID: int
    Quantity: int
    UnitPrice: float
    Description: Optional[str] = None
    LastModified: Optional[datetime] = None
    ItemData: Optional[ItemsInDB] = None
    WarehouseData: Optional[WarehousesInDB] = None