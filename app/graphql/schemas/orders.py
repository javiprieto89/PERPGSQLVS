# app/graphql/schemas/orders.py
import strawberry
from typing import List, Optional
from datetime import datetime
from dataclasses import field
from app.graphql.schemas.orderdetails import OrderDetailsInDB


@strawberry.input
class OrdersCreate:
    companyID: int
    branchID: int
    Date: datetime
    clientID: Optional[int] = None
    carID: Optional[int] = None
    IsService: Optional[bool] = None
    serviceType: Optional[str] = None
    mileage: Optional[int] = None
    nextServiceMileage: Optional[int] = None
    notes: Optional[str] = None
    saleConditionID: Optional[int] = None
    discountID: Optional[int] = None
    subtotal: Optional[float] = None
    total: Optional[float] = None
    VAT: Optional[float] = None
    userID: Optional[int] = None
    documentID: Optional[int] = None
    StatusID: Optional[int] = None
    priceListID: Optional[int] = None
    items: List[OrderDetailsInDB] = field(default_factory=list)  # CORREGIDO


@strawberry.input
class OrdersUpdate:
    companyID: Optional[int] = None
    branchID: Optional[int] = None
    Date: Optional[datetime] = None
    clientID: Optional[int] = None
    carID: Optional[int] = None
    IsService: Optional[bool] = None
    serviceType: Optional[str] = None
    mileage: Optional[int] = None
    nextServiceMileage: Optional[int] = None
    notes: Optional[str] = None
    saleConditionID: Optional[int] = None
    discountID: Optional[int] = None
    subtotal: Optional[float] = None
    total: Optional[float] = None
    VAT: Optional[float] = None
    userID: Optional[int] = None
    documentID: Optional[int] = None
    StatusID: Optional[int] = None
    priceListID: Optional[int] = None
    items: Optional[List[OrderDetailsInDB]] = None


@strawberry.type
class OrdersInDB:
    orderID: int
    companyID: Optional[int]
    branchID: Optional[int]
    Date: Optional[datetime]
    clientID: Optional[int]
    carID: Optional[int]
    IsService: Optional[bool]
    serviceType: Optional[str]
    mileage: Optional[int]
    nextServiceMileage: Optional[int]
    notes: Optional[str]
    saleConditionID: Optional[int]
    discountID: Optional[int]
    subtotal: Optional[float]
    total: Optional[float]
    VAT: Optional[float]
    userID: Optional[int]
    documentID: Optional[int]
    StatusID: Optional[int]
    priceListID: Optional[int]
