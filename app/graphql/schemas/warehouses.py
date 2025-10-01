# app/graphql/schemas/warehouses.py

import strawberry
from app.graphql.schemas.company import CompanyInDB
from typing import Optional


@strawberry.input
class WarehousesCreate:
    CompanyID: int
    WarehouseName: str
    Address: Optional[str] = None


@strawberry.input
class WarehousesUpdate:
    CompanyID: Optional[int] = None
    WarehouseName: Optional[str] = None
    Address: Optional[str] = None


@strawberry.type
class WarehousesInDB:
    CompanyID: int
    WarehouseID: int
    WarehouseName: str
    Address: Optional[str] = None
    CompanCompanyData: Optional[CompanyInDB] = None
