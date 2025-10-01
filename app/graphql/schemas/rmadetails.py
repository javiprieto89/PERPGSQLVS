# app/graphql/schemas/rmadetails.py
import strawberry
from datetime import datetime
from typing import Optional


@strawberry.type
class RMADetailInDB:
    CompanyID: int
    BranchID: int
    RmaID: int
    RmaDetailID: int
    ItemID: int
    WarehouseID: int
    Quantity: float
    UnitPrice: float
    LineDescription: Optional[str]
    LastModified: datetime


@strawberry.input
class RMADetailCreate:
    CompanyID: int
    BranchID: int
    RmaID: int
    ItemID: int
    WarehouseID: int
    Quantity: float
    UnitPrice: float
    LineDescription: Optional[str] = None


@strawberry.input
class RMADetailUpdate:
    ItemID: Optional[int] = None
    WarehouseID: Optional[int] = None
    Quantity: Optional[float] = None
    UnitPrice: Optional[float] = None
    LineDescription: Optional[str] = None


@strawberry.input
class RMADetailFilter:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    RmaID: Optional[int] = None
    ItemID: Optional[int] = None
