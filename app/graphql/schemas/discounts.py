# app/graphql/schemas/discounts.py
import strawberry

@strawberry.input
class DiscountsCreate:
    DiscountName: str
    Percentage: float

@strawberry.input
class DiscountsUpdate:
    DiscountName: str
    Percentage: float

@strawberry.type
class DiscountsInDB:
    DiscountID: int
    DiscountName: str
    Percentage: float