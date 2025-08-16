# app/graphql/schemas/orderhistory.py
import strawberry
from typing import Optional
from datetime import datetime


@strawberry.input
class OrderHistoryCreate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    OrderID: Optional[int] = None
    ClientID: Optional[int] = None
    UserID: int  # Obligatorio según la DB
    CarID: Optional[int] = None
    # Usar Date_ para evitar conflicto con la tabla
    Date_: Optional[datetime] = None
    ServiceTypeID: Optional[int] = None
    Mileage: Optional[int] = None
    NextServiceMileage: Optional[int] = None
    Subtotal: Optional[float] = None
    Total: Optional[float] = None
    Status: Optional[str] = None
    Comments: Optional[str] = None


@strawberry.input
class OrderHistoryUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    OrderID: Optional[int] = None
    ClientID: Optional[int] = None
    CarID: Optional[int] = None
    Date_: Optional[datetime] = None
    ServiceTypeID: Optional[int] = None
    Mileage: Optional[int] = None
    NextServiceMileage: Optional[int] = None
    Subtotal: Optional[float] = None
    Iotal: Optional[float] = None
    Status: Optional[str] = None
    Comments: Optional[str] = None


@strawberry.type
class OrderHistoryInDB:
    HistoryID: int
    CompanyID: Optional[int]
    BranchID: Optional[int]
    OrderID: Optional[int]
    ClientID: Optional[int]
    CarID: Optional[int]
    Date: Optional[datetime]
    ServiceTypeID: Optional[int]
    Mileage: Optional[int]
    NextServiceMileage: Optional[int]
    Subtotal: Optional[float]
    Total: Optional[float]
    Status: Optional[str]
    Comments: Optional[str]
