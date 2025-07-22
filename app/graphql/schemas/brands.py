# app/graphql/schemas/brands.py
import strawberry
from typing import Optional


@strawberry.input
class BrandsCreate:
    Name: str
    IsActive: bool = True
    CompanyID: int


@strawberry.input
class BrandsUpdate:
    Name: Optional[str] = None
    IsActive: Optional[bool] = None
    CompanyID: Optional[int] = None


@strawberry.type
class BrandsInDB:
    BrandID: int
    Name: str
    IsActive: Optional[bool]
    CompanyID: Optional[int]
