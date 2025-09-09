# app/graphql/schemas/servicetype.py
import strawberry
from typing import Optional

@strawberry.input
class ServiceTypeCreate:
    Type: Optional[str] = None

@strawberry.input
class ServiceTypeUpdate:
    Type: Optional[str] = None

@strawberry.type
class ServiceTypeInDB:
    ServiceTypeID: int
    Type: Optional[str] = None