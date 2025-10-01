import strawberry
from typing import Optional
from app.graphql.schemas.items import ItemsInDB
from app.graphql.schemas.warehouses import WarehousesInDB
from datetime import datetime


@strawberry.input
class OrderDetailsCreate:
    CompanyID: int
    BranchID: int
    OrderID: Optional[int] = None
    ItemID: int
    WarehouseID: int
    Quantity: int
    UnitPrice: float
    LineDescription: Optional[str] = None
    LastModified: Optional[datetime] = None


@strawberry.input
class OrderDetailsUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    OrderID: Optional[int] = None
    ItemID: Optional[int] = None
    WarehouseID: Optional[int] = None
    Quantity: Optional[int] = None
    UnitPrice: Optional[float] = None
    LineDescription: Optional[str] = None
    LastModified: Optional[datetime] = None


@strawberry.type
class OrderDetailsInDB:
    CompanyID: int
    BranchID: int
    OrderID: int
    OrderDetailID: int
    ItemID: int
    WarehouseID: int
    Quantity: int
    UnitPrice: float
    LineDescription: Optional[str] = None
    LastModified: Optional[datetime] = None
    ItemData: Optional[ItemsInDB] = None
    WarehouseData: Optional[WarehousesInDB] = None

