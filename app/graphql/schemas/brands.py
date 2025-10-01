# app/graphql/schemas/brands.py
import strawberry
from typing import Optional
from app.graphql.schemas.company import CompanyInDB


@strawberry.input
class BrandsCreate:
    BrandName: str
    IsActive: bool = True
    CompanyID: int


@strawberry.input
class BrandsUpdate:
    BrandName: Optional[str] = None
    IsActive: Optional[bool] = None
    CompanyID: Optional[int] = None


@strawberry.type
class BrandsInDB:
    BrandID: int
    BrandName: str
    IsActive: Optional[bool]
    CompanyID: Optional[int]
    CompanyData: Optional[CompanyInDB] = None
