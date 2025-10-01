# app/graphql/schemas/carmodels.py
import strawberry
from typing import Optional
from app.graphql.schemas.company import CompanyInDB
from app.graphql.schemas.carbrands import CarBrandsInDB


@strawberry.input
class CarModelsCreate:
    CompanyID: int
    CarBrandID: int
    CarModelName: str


@strawberry.input
class CarModelsUpdate:
    CompanyID: Optional[int] = None
    CarBrandID: Optional[int] = None
    CarModelName: Optional[str] = None


@strawberry.type
class CarModelsInDB:
    CompanyID: int
    CarBrandID: int
    CarModelID: int
    CarModelName: str
    CompanyData: Optional[CompanyInDB] = None
    CarBrandData: Optional[CarBrandsInDB] = None
