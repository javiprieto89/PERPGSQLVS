# app/graphql/schemas/discounts.py
from typing import Optional
from app.graphql.schemas.company import CompanyInDB
import strawberry


@strawberry.input
class DiscountsCreate:
    CompanyID: int
    DiscountName: str
    Percentage: float


@strawberry.input
class DiscountsUpdate:
    CompanyID: int
    DiscountName: str
    Percentage: float


@strawberry.type
class DiscountsInDB:
    CompanyID: int
    DiscountID: int
    DiscountName: str
    Percentage: float
    CompanyData: Optional[CompanyInDB] = None
