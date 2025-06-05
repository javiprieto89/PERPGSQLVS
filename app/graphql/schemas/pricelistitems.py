# app/graphql/schemas/pricelistitems.py
import strawberry
from datetime import datetime
from typing import Optional

@strawberry.input
class PriceListItemsCreate:
    priceListID: int
    itemID: int
    price: float
    effectiveDate: datetime

@strawberry.input
class PriceListItemsUpdate:
    priceListID: Optional[int] = None
    itemID: Optional[int] = None
    price: Optional[float] = None
    effectiveDate: Optional[datetime] = None

@strawberry.type
class PriceListItemsInDB:
    priceListItemID: int
    priceListID: int
    itemID: int
    price: float
    effectiveDate: datetime
