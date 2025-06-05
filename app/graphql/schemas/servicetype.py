# app/graphql/schemas/servicetype.py
import strawberry
from typing import Optional

@strawberry.input
class ServiceTypeCreate:
    type: Optional[str] = None

@strawberry.input
class ServiceTypeUpdate:
    type: Optional[str] = None

@strawberry.type
class ServiceTypeInDB:
    serviceTypeID: int
    type: Optional[str] = None
