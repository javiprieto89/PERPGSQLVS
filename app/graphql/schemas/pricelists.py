# app/graphql/schemas/pricelists.py
import strawberry
from typing import Optional, List
from datetime import datetime

#from app.graphql.schemas.clients import ClientsInDB


@strawberry.input
class PriceListsCreate:
    name: str
    description: Optional[str] = None
    isActive: Optional[bool] = None
    createdDate: Optional[datetime] = None


@strawberry.input
class PriceListsUpdate:
    name: Optional[str] = None
    description: Optional[str] = None
    isActive: Optional[bool] = None
    createdDate: Optional[datetime] = None


@strawberry.type
class PriceListsInDB:
    priceListID: int
    name: str
    description: Optional[str] = None
    isActive: Optional[bool] = None
    createdDate: Optional[datetime] = None

    # Relaciones
    #clients: Optional[List[ClientsInDB]] = None
