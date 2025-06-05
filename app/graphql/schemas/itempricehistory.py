# app/graphql/schemas/itempricehistory.py
import strawberry
from datetime import datetime
from typing import Optional

@strawberry.input
class ItemPriceHistoryCreate:
    itemID: int
    effectiveDate: datetime
    price: float

@strawberry.input
class ItemPriceHistoryUpdate:
    itemID: Optional[int] = None
    effectiveDate: Optional[datetime] = None
    price: Optional[float] = None

@strawberry.type
class ItemPriceHistoryInDB:
    priceHistoryID: int
    itemID: int
    effectiveDate: datetime
    price: float
