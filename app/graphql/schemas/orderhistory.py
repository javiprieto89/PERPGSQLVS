# app/graphql/schemas/orderhistory.py
import strawberry
from typing import Optional
from datetime import datetime

@strawberry.input
class OrderHistoryCreate:
    companyID: Optional[int] = None
    branchID: Optional[int] = None
    orderID: Optional[int] = None
    clientID: Optional[int] = None
    carID: Optional[int] = None
    Date: Optional[datetime] = None
    serviceType: Optional[str] = None
    mileage: Optional[int] = None
    nextServiceMileage: Optional[int] = None
    subtotal: Optional[float] = None
    total: Optional[float] = None
    status: Optional[str] = None
    comments: Optional[str] = None

@strawberry.input
class OrderHistoryUpdate:
    companyID: Optional[int] = None
    branchID: Optional[int] = None
    orderID: Optional[int] = None
    clientID: Optional[int] = None
    carID: Optional[int] = None
    Date: Optional[datetime] = None
    serviceType: Optional[str] = None
    mileage: Optional[int] = None
    nextServiceMileage: Optional[int] = None
    subtotal: Optional[float] = None
    total: Optional[float] = None
    status: Optional[str] = None
    comments: Optional[str] = None

@strawberry.type
class OrderHistoryInDB:
    historyID: int
    companyID: Optional[int]
    branchID: Optional[int]
    orderID: Optional[int]
    clientID: Optional[int]
    carID: Optional[int]
    Date: Optional[datetime]
    serviceType: Optional[str]
    mileage: Optional[int]
    nextServiceMileage: Optional[int]
    subtotal: Optional[float]
    total: Optional[float]
    status: Optional[str]
    comments: Optional[str]
