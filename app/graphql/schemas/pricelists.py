# app/graphql/schemas/pricelists.py
import strawberry
from typing import Optional, List
from datetime import datetime

#from app.graphql.schemas.clients import ClientsInDB


@strawberry.input
class PriceListsCreate:
    Name: str
    Description: Optional[str] = None
    IsActive: Optional[bool] = None
    CreatedDate: Optional[datetime] = None


@strawberry.input
class PriceListsUpdate:
    Name: Optional[str] = None
    Description: Optional[str] = None
    IsActive: Optional[bool] = None
    CreatedDate: Optional[datetime] = None


@strawberry.type
class PriceListsInDB:
    PriceListID: int
    Name: str
    Description: Optional[str] = None
    IsActive: Optional[bool] = None
    CreatedDate: Optional[datetime] = None

    # Relaciones
    #clients: Optional[List[ClientsInDB]] = None
