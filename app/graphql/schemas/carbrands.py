# app/graphql/schemas/carbrands.py
import strawberry
from typing import Optional

@strawberry.input
class CarBrandsCreate:
    CompanyID: int
    CarBrandName: str

@strawberry.input
class CarBrandsUpdate:
    CompanyID: Optional[int] = None
    CarBrandName: Optional[str] = None

@strawberry.type
class CarBrandsInDB:
    CompanyID: int
    CarBrandID: int
    CarBrandName: str
