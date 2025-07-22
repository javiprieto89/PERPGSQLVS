# app/graphql/schemas/carbrands.py
import strawberry
from typing import Optional

@strawberry.input
class CarBrandsCreate:
    Name: str
    CompanyID: int

@strawberry.input
class CarBrandsUpdate:
    Name: Optional[str] = None
    CompanyID: Optional[int] = None

@strawberry.type
class CarBrandsInDB:
    CarBrandID: int
    Name: str
    CompanyID: int | None
