# app/graphql/schemas/itempricehistory.py
import strawberry
from datetime import datetime
from typing import Optional

@strawberry.input
class ItemPriceHistoryCreate:
    ItemID: int
    EffectiveDate: datetime
    Price: float

@strawberry.input
class ItemPriceHistoryUpdate:
    ItemID: Optional[int] = None
    EffectiveDate: Optional[datetime] = None
    Price: Optional[float] = None

@strawberry.type
class ItemPriceHistoryInDB:
    PriceHistoryID: int
    ItemID: int
    EffectiveDate: datetime
    Price: float
