# app/graphql/schemas/orders.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.companydata import CompanyDataInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.saleconditions import SaleConditionsInDB
from app.graphql.schemas.sysdocumenttypes import SysDocumentTypesInDB
from app.graphql.schemas.warehouses import WarehousesInDB
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.schemas.discounts import DiscountsInDB
from app.graphql.schemas.pricelists import PriceListsInDB
from app.graphql.schemas.sysorderstatus import SysOrderStatusInDB
from app.graphql.schemas.cars import CarsInDB
from app.graphql.schemas.servicetype import ServiceTypeInDB
from app.graphql.schemas.users import UsersInDB
from app.graphql.schemas.vendors import VendorsInDB
from app.graphql.schemas.users import UsersInDB
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
    CarID: Optional[int] = None
    IsService: Optional[bool] = None
    ServiceTypeID: Optional[int] = None
    Mileage: Optional[int] = None
    NextServiceMileage: Optional[int] = None
    Notes: Optional[str] = None
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
    VendorID: int
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
    VendorID: Optional[int] = None
    Items: Optional[List[OrderDetailsUpdate]] = None


@strawberry.type
class OrdersInDB:
    OrderID: int
    CompanyID: int
    BranchID: int
    Date_: datetime  # Mapea al campo Date_ del modelo SQLAlchemy
    ClientID: int
    CarID: Optional[int] = None
    IsService: Optional[bool] = None
    ServiceTypeID: Optional[int] = None
    Mileage: Optional[int] = None
    NextServiceMileage: Optional[int] = None
    Notes: Optional[str] = None
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
    VendorID: int
    Items: Optional[List[OrderDetailsInDB]] = None
    CompanyData: Optional[CompanyDataInDB] = None
    BranchData: Optional[BranchesInDB] = None
    SaleConditionData: Optional[SaleConditionsInDB] = None
    DocumentData: Optional[SysDocumentTypesInDB] = None
    WarehouseData: Optional[WarehousesInDB] = None
    ClientData: Optional[ClientsInDB] = None
    DiscountData: Optional[DiscountsInDB] = None
    PriceListData: Optional[PriceListsInDB] = None
    OrderStatusData: Optional[SysOrderStatusInDB] = None
    ServiceTypeData: Optional[ServiceTypeInDB] = None
    CarData: Optional[CarsInDB] = None
    VendorData: Optional['VendorsInDB'] = None
    UserData: Optional[UsersInDB] = None
