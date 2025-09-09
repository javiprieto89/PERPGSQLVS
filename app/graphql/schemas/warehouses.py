# app/graphql/schemas/warehouses.py

import strawberry
from typing import Optional


@strawberry.input
class WarehousesCreate:
    Name: str
    Addres: Optional[str] = None


@strawberry.input
class WarehousesUpdate:
    Name: Optional[str] = None
    Addres: Optional[str] = None


@strawberry.type
class WarehousesInDB:
    WarehouseID: int
    Name: str
    Addres: Optional[str] = None