# app/graphql/schemas/discounts.py
import strawberry

@strawberry.input
class DiscountsCreate:
    discountName: str
    percentage: float

@strawberry.input
class DiscountsUpdate:
    discountName: str
    percentage: float

@strawberry.type
class DiscountsInDB:
    discountID: int
    discountName: str
    percentage: float
