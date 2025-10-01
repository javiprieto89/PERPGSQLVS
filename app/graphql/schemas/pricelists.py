# app/graphql/schemas/pricelists.py
import strawberry
from typing import Optional, List
from datetime import datetime

#from app.graphql.schemas.clients import ClientsInDB


@strawberry.input
class PriceListsCreate:
    PriceListName: str
    PriceListDescription: Optional[str] = None
    IsActive: Optional[bool] = None
    CreatedDate: Optional[datetime] = None


@strawberry.input
class PriceListsUpdate:
    PriceListName: Optional[str] = None
    PriceListDescription: Optional[str] = None
    IsActive: Optional[bool] = None
    CreatedDate: Optional[datetime] = None


@strawberry.type
class PriceListsInDB:
    CompanyID: int
    PriceListID: int
    PriceListName: str
    PriceListDescription: Optional[str] = None
    IsActive: Optional[bool] = None
    CreatedDate: Optional[datetime] = None

    # Relaciones
    #clients: Optional[List[ClientsInDB]] = None
