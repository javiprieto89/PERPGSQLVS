# app/graphql/schemas/pricelistitems.py
import strawberry
from datetime import datetime
from typing import Optional
from app.graphql.schemas.pricelists import PriceListsInDB
from app.graphql.schemas.items import ItemsInDB

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
    PriceListData: Optional[PriceListsInDB] = None
    ItemData: Optional[ItemsInDB] = None

