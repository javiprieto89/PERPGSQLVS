# app/graphql/schemas/temporderdetails.py
import strawberry
from typing import Optional
from uuid import UUID

@strawberry.input
class TempOrderDetailsCreate:
    orderSessionID: UUID
    companyID: int
    branchID: int
    userID: int
    itemID: int
    quantity: int
    warehouseID: int
    priceListID: int
    unitPrice: float
    description: str

@strawberry.input
class TempOrderDetailsUpdate:
    orderSessionID: Optional[UUID] = None
    companyID: Optional[int] = None
    branchID: Optional[int] = None
    userID: Optional[int] = None
    itemID: Optional[int] = None
    quantity: Optional[int] = None
    warehouseID: Optional[int] = None
    priceListID: Optional[int] = None
    unitPrice: Optional[float] = None
    description: Optional[str] = None

@strawberry.type
class TempOrderDetailsInDB:
    tempOrderItemID: int
    orderSessionID: UUID
    companyID: int
    branchID: int
    userID: int
    itemID: int
    quantity: int
    warehouseID: int
    priceListID: int
    unitPrice: float
    description: str
