# app/graphql/schemas/warehouses.py

import strawberry
from typing import Optional


@strawberry.input
class WarehousesCreate:
    CompanyID: int
    BranchID: int
    Name: str
    Description: Optional[str] = None
    IsActive: bool = True


@strawberry.input
class WarehousesUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None
    Name: Optional[str] = None
    Description: Optional[str] = None
    IsActive: Optional[bool] = None


@strawberry.type
class WarehousesInDB:
    WarehouseID: int
    CompanyID: int
    BranchID: int
    Name: str
    Description: Optional[str] = None
    IsActive: bool
