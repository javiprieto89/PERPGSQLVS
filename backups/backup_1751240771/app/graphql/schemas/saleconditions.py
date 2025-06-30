# app/graphql/schemas/saleconditions.py
import strawberry
from typing import Optional
from datetime import date

@strawberry.input
class SaleConditionsCreate:
    Name: str
    DueDate: date
    Surcharge: float
    IsActive: Optional[bool] = None

@strawberry.input
class SaleConditionsUpdate:
    Name: Optional[str] = None
    DueDate: Optional[date] = None
    Surcharge: Optional[float] = None
    IsActive: Optional[bool] = None

@strawberry.type
class SaleConditionsInDB:
    SaleConditionID: int
    Name: str
    DueDate: date
    Surcharge: float
    IsActive: Optional[bool]
