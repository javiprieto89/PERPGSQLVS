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
    CarID: Optional[int] = None
    Date: Optional[datetime] = None
    ServiceType: Optional[str] = None
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
    Date: Optional[datetime] = None
    ServiceType: Optional[str] = None
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
    ServiceType: Optional[str]
    Mileage: Optional[int]
    NextServiceMileage: Optional[int]
    Subtotal: Optional[float]
    Total: Optional[float]
    Status: Optional[str]
    Comments: Optional[str]
