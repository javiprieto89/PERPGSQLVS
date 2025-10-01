# app/graphql/schemas/rmas.py
import strawberry
from datetime import datetime
from typing import List, Optional


@strawberry.type
class RMAInDB:
    CompanyID: int
    BranchID: int
    RmaID: int
    RmaDate: datetime
    RmaTypeID: int
    ClientID: Optional[int]
    SupplierID: Optional[int]
    RelatedOrderID: Optional[int]
    RelatedPIID: Optional[int]
    WarehouseID: int
    UserID: int
    PriceListID: Optional[int]
    DocumentID: Optional[int]
    StatusID: int
    Notes: Optional[str]
    Subtotal: float
    VatAmount: float
    Total: float


@strawberry.input
class RMACreate:
    CompanyID: int
    BranchID: int
    RmaTypeID: int
    WarehouseID: int
    UserID: int
    StatusID: int
    ClientID: Optional[int] = None
    SupplierID: Optional[int] = None
    RelatedOrderID: Optional[int] = None
    RelatedPIID: Optional[int] = None
    PriceListID: Optional[int] = None
    DocumentID: Optional[int] = None
    Notes: Optional[str] = None
    Subtotal: Optional[float] = None
    VatAmount: Optional[float] = None
    Total: Optional[float] = None


@strawberry.input
class RMAUpdate:
    RmaDate: Optional[datetime] = None
    RmaTypeID: Optional[int] = None
    ClientID: Optional[int] = None
    SupplierID: Optional[int] = None
    RelatedOrderID: Optional[int] = None
    RelatedPIID: Optional[int] = None
    WarehouseID: Optional[int] = None
    UserID: Optional[int] = None
    PriceListID: Optional[int] = None
    DocumentID: Optional[int] = None
    StatusID: Optional[int] = None
    Notes: Optional[str] = None
    Subtotal: Optional[float] = None
    VatAmount: Optional[float] = None
    Total: Optional[float] = None


@strawberry.input
class RMAFilter:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    RmaTypeID: Optional[int] = None
    StatusID: Optional[int] = None
    UserID: Optional[int] = None
    ClientID: Optional[int] = None
    SupplierID: Optional[int] = None
