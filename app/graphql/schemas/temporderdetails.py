# app/graphql/schemas/temporderdetails.py
import strawberry
from typing import Optional
from uuid import UUID

@strawberry.input
class TempOrderDetailsCreate:
    OrderDetailID: Optional[int] = None
    OrderID: Optional[int] = None
    OrderSessionID: Optional[UUID] = None
    CompanyID: int
    BranchID: int
    UserID: int
    ItemID: int
    Quantity: int
    WarehouseID: int
    PriceListID: int
    UnitPrice: float
    Description: str

@strawberry.input
class TempOrderDetailsUpdate:
    OrderDetailID: Optional[int] = None
    OrderID: Optional[int] = None
    OrderSessionID: Optional[UUID] = None
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    UserID: Optional[int] = None
    ItemID: Optional[int] = None
    Quantity: Optional[int] = None
    WarehouseID: Optional[int] = None
    PriceListID: Optional[int] = None
    UnitPrice: Optional[float] = None
    Description: Optional[str] = None

@strawberry.type
class TempOrderDetailsInDB:
    TempOrderItemID: int
    OrderDetailID: Optional[int]
    OrderID: Optional[int]
    OrderSessionID: UUID
    CompanyID: int
    BranchID: int
    UserID: int
    ItemID: int
    ItemCode: Optional[str]
    Quantity: int
    WarehouseID: int
    PriceListID: int
    UnitPrice: float
    Description: str
