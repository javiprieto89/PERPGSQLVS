# app/graphql/schemas/warehouses.py

import strawberry
from typing import Optional


@strawberry.input
class WarehousesCreate:
    companyID: int
    branchID: int
    name: str
    description: Optional[str] = None
    isActive: bool = True


@strawberry.input
class WarehousesUpdate:
    companyID: Optional[int] = None
    branchID: Optional[int] = None
    name: Optional[str] = None
    description: Optional[str] = None
    isActive: Optional[bool] = None


@strawberry.type
class WarehousesInDB:
    warehouseID: int
    companyID: int
    branchID: int
    name: str
    description: Optional[str] = None
    isActive: bool
