# app/graphql/schemas/orders.py
import strawberry
from typing import List, Optional
from datetime import datetime
from dataclasses import field

from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.saleconditions import SaleConditionsInDB
from app.graphql.schemas.warehouses import WarehousesInDB
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.schemas.discounts import DiscountsInDB
from app.graphql.schemas.pricelists import PriceListsInDB
from app.graphql.schemas.cars import CarsInDB
from app.graphql.schemas.servicetype import ServiceTypeInDB
from app.graphql.schemas.users import UsersInDB
from app.graphql.schemas.vendors import VendorsInDB
from app.graphql.schemas.orderdetails import (
    OrderDetailsCreate,
    OrderDetailsUpdate,
    OrderDetailsInDB,
)


@strawberry.input
class OrdersCreate:
    CompanyID: int
    BranchID: int
    OrderDate: Optional[datetime] = None
    ClientID: int
    CarID: Optional[int] = None
    IsService: Optional[bool] = None
    ServiceTypeID: Optional[int] = None
    Mileage: Optional[int] = None
    NextServiceMileage: Optional[int] = None
    Notes: Optional[str] = None
    SaleConditionID: Optional[int] = None
    DiscountID: Optional[int] = None
    Subtotal: float
    DiscountAmount: float = 0.0
    TotalTaxAmount: float = 0.0
    Total: float
    UserID: Optional[int] = None
    DocumentID: Optional[int] = None
    PriceListID: Optional[int] = None
    OrderStatusID: Optional[int] = None
    WarehouseID: Optional[int] = None
    VendorID: Optional[int] = None
    Items: List[OrderDetailsCreate] = field(default_factory=list)


@strawberry.input
class OrdersUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    OrderDate: Optional[datetime] = None
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
    DiscountAmount: Optional[float] = None
    TotalTaxAmount: Optional[float] = None
    Total: Optional[float] = None
    UserID: Optional[int] = None
    DocumentID: Optional[int] = None
    PriceListID: Optional[int] = None
    OrderStatusID: Optional[int] = None
    WarehouseID: Optional[int] = None
    VendorID: Optional[int] = None
    Items: Optional[List[OrderDetailsUpdate]] = None


@strawberry.type
class OrdersInDB:
    CompanyID: int
    BranchID: int
    OrderID: int
    OrderDate: datetime
    ClientID: int
    CarID: Optional[int]
    IsService: Optional[bool]
    ServiceTypeID: Optional[int]
    Mileage: Optional[int]
    NextServiceMileage: Optional[int]
    Notes: Optional[str]
    SaleConditionID: Optional[int]
    DiscountID: Optional[int]
    Subtotal: float
    DiscountAmount: float
    TotalTaxAmount: float
    Total: float
    UserID: Optional[int]
    DocumentID: Optional[int]
    PriceListID: Optional[int]
    OrderStatusID: Optional[int]
    WarehouseID: Optional[int]
    VendorID: Optional[int]
    Items: Optional[List[OrderDetailsInDB]] = None

    CompanyData: Optional[CompanyInDB] = None
    BranchData: Optional[BranchesInDB] = None
    SaleConditionData: Optional[SaleConditionsInDB] = None
    WarehouseData: Optional[WarehousesInDB] = None
    ClientData: Optional[ClientsInDB] = None
    DiscountData: Optional[DiscountsInDB] = None
    PriceListData: Optional[PriceListsInDB] = None
    ServiceTypeData: Optional[ServiceTypeInDB] = None
    CarData: Optional[CarsInDB] = None
    UserData: Optional[UsersInDB] = None
    VendorData: Optional[VendorsInDB] = None
