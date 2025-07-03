# app/graphql/schemas/brands.py
import strawberry
from typing import Optional


@strawberry.input
class BrandsCreate:
    Name: str
    IsActive: Optional[bool] = True


@strawberry.input
class BrandsUpdate:
    Name: Optional[str] = None
    IsActive: Optional[bool] = None


@strawberry.type
class BrandsInDB:
    BrandID: int
    Name: str
    IsActive: Optional[bool]
