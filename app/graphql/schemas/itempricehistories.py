# app/graphql/schemas/itempricehistories.py
import strawberry
from datetime import datetime
from typing import Optional

@strawberry.input
class ItemPriceHistoriesCreate:    
    CompanyID: int
    BranchID: int
    ItemID: int
    PriceListID: int
    EffectiveDate: datetime
    Price: float
    CurrencyID: int
    UserID: int

@strawberry.input
class ItemPriceHistoriesUpdate:
    CompanyID: Optional[int] = None
    BranchID: Optional[int] = None    
    ItemID: Optional[int] = None
    PriceListID: Optional[int] = None
    PriceHistoryID: int
    EffectiveDate: Optional[datetime] = None
    Price: Optional[float] = None
    CurrencyID: Optional[int] = None
    UserID: Optional[int] = None

@strawberry.type
class ItemPriceHistoriesInDB:
    CompanyID: int
    BranchID: int
    ItemID: int
    PriceListID: int
    PriceHistoryID: int    
    EffectiveDate: datetime
    Price: float
    CurrencyID: int
    UserID: int