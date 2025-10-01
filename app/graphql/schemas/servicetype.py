# app/graphql/schemas/servicetype.py
import strawberry
from typing import Optional

@strawberry.input
class ServiceTypeCreate:
    CompanyID: int
    ServiceTypeName: Optional[str] = None

@strawberry.input
class ServiceTypeUpdate:
    CompanyID: Optional[int] = None
    ServiceTypeName: Optional[str] = None

@strawberry.type
class ServiceTypeInDB:
    ServiceTypeID: int
    CompanyID: int
    ServiceTypeName: Optional[str] = None
