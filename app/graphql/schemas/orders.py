# app/graphql/schemas/orders.py
import strawberry
from typing import List, Optional
from datetime import datetime
from dataclasses import field
from app.graphql.schemas.orderdetails import (
    OrderDetailsCreate,
    OrderDetailsUpdate,
    OrderDetailsInDB,
)


@strawberry.input
class OrdersCreate:
    CompanyID: int
    BranchID: int
    Date: datetime
    ClientID: Optional[int] = None
    CarID: Optional[int] = None
    IsService: Optional[bool] = None
    ServiceType: Optional[str] = None
    Mileage: Optional[int] = None
    NextServiceMileage: Optional[int] = None
    Notes: Optional[str] = None
    SaleConditionID: Optional[int] = None
    DiscountID: Optional[int] = None
    Subtotal: Optional[float] = None
    Total: Optional[float] = None
    VAT: Optional[float] = None
    UserID: Optional[int] = None
    DocumentID: Optional[int] = None
    StatusID: Optional[int] = None
    PriceListID: Optional[int] = None
    Items: List[OrderDetailsCreate] = field(default_factory=list)


@strawberry.input
class OrdersUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    Date: Optional[datetime] = None
    ClientID: Optional[int] = None
    CarID: Optional[int] = None
    IsService: Optional[bool] = None
    ServiceType: Optional[str] = None
    Mileage: Optional[int] = None
    NextServiceMileage: Optional[int] = None
    Notes: Optional[str] = None
    SaleConditionID: Optional[int] = None
    DiscountID: Optional[int] = None
    Subtotal: Optional[float] = None
    Total: Optional[float] = None
    VAT: Optional[float] = None
    UserID: Optional[int] = None
    DocumentID: Optional[int] = None
    StatusID: Optional[int] = None
    PriceListID: Optional[int] = None
    Items: Optional[List[OrderDetailsUpdate]] = None


@strawberry.type
class OrdersInDB:
    OrderID: int
    CompanyID: Optional[int]
    BranchID: Optional[int]
    Date: Optional[datetime]
    ClientID: Optional[int]
    CarID: Optional[int]
    IsService: Optional[bool]
    ServiceType: Optional[str]
    Mileage: Optional[int]
    NextServiceMileage: Optional[int]
    Notes: Optional[str]
    SaleConditionID: Optional[int]
    DiscountID: Optional[int]
    Subtotal: Optional[float]
    Total: Optional[float]
    VAT: Optional[float]
    UserID: Optional[int]
    DocumentID: Optional[int]
    StatusID: Optional[int]
    PriceListID: Optional[int]
    Items: Optional[List[OrderDetailsInDB]] = None

