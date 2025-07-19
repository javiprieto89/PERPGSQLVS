# app/graphql/schemas/pricelistitems.py
import strawberry
from datetime import datetime
from typing import Optional

@strawberry.input
class PriceListItemsCreate:
    PriceListID: int
    ItemID: int
    Price: float
    EffectiveDate: Optional[datetime] = None

@strawberry.input
class PriceListItemsUpdate:
    Price: Optional[float] = None
    EffectiveDate: Optional[datetime] = None

@strawberry.type
class PriceListItemsInDB:
    PriceListID: int
    ItemID: int
    Price: float
    EffectiveDate: datetime
    PriceListName: Optional[str] = None
    Code: Optional[str] = None
    Description: Optional[str] = None

