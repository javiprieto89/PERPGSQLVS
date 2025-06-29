# app/graphql/schemas/pricelistitems.py
import strawberry
from datetime import datetime
from typing import Optional

@strawberry.input
class PriceListItemsCreate:
    PriceListID: int
    ItemID: int
    Price: float
    EffectiveDate: datetime

@strawberry.input
class PriceListItemsUpdate:
    PriceListID: Optional[int] = None
    ItemID: Optional[int] = None
    Price: Optional[float] = None
    EffectiveDate: Optional[datetime] = None

@strawberry.type
class PriceListItemsInDB:
    PriceListItemID: int
    PriceListID: int
    ItemID: int
    Price: float
    EffectiveDate: datetime
