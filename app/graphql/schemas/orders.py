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
    Date_: datetime  # Mapea al campo Date_ del modelo SQLAlchemy
    ClientID: int
    SaleConditionID: int
    DiscountID: int
    Subtotal: float
    Total: float
    VAT: float
    UserID: int
    DocumentID: int
    PriceListID: int
    OrderStatusID: int
    WarehouseID: int
    CarID: Optional[int] = None
    IsService: Optional[bool] = None
    ServiceTypeID: Optional[int] = None
    Mileage: Optional[int] = None
    NextServiceMileage: Optional[int] = None
    Notes: Optional[str] = None
    Items: List[OrderDetailsCreate] = field(default_factory=list)


@strawberry.input
class OrdersUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    Date_: Optional[datetime] = None
    ClientID: Optional[int] = None
    CarID: Optional[int] = None
    IsService: Optional[bool] = None
    ServiceTypeID: Optional[int] = None
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
    OrderStatusID: Optional[int] = None
    PriceListID: Optional[int] = None
    WarehouseID: Optional[int] = None
    Items: Optional[List[OrderDetailsUpdate]] = None


@strawberry.type
class OrdersInDB:
    OrderID: int
    CompanyID: int
    BranchID: int
    Date_: datetime  # Mapea al campo Date_ del modelo SQLAlchemy
    ClientID: int
    SaleConditionID: int
    DiscountID: int
    Subtotal: float
    Total: float
    VAT: float
    UserID: int
    DocumentID: int    
    PriceListID: int
    OrderStatusID: int
    WarehouseID: int
    CarID: Optional[int] = None
    IsService: Optional[bool] = None
    ServiceTypeID: Optional[int] = None
    Mileage: Optional[int] = None
    NextServiceMileage: Optional[int] = None
    Notes: Optional[str] = None
    Items: Optional[List[OrderDetailsInDB]] = None
    CompanyName: Optional[str] = None
    BranchName: Optional[str] = None
    SaleConditionName: Optional[str] = None
    DocumentName: Optional[str] = None
    WarehouseName: Optional[str] = None