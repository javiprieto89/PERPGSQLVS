# app/graphql/schemas/discounts.py
import strawberry
from typing import Optional
from app.graphql.schemas.companydata import CompanyDataInDB


@strawberry.input
class DiscountsCreate:
    DiscountName: str
    Percentage: float
    CompanyID: int


@strawberry.input
class DiscountsUpdate:
    DiscountName: Optional[str] = None
    Percentage: Optional[float] = None
    CompanyID: Optional[int] = None


@strawberry.type
class DiscountsInDB:
    DiscountID: int
    DiscountName: str
    Percentage: float
    CompanyID: int
    CompanyData: Optional[CompanyDataInDB] = None
