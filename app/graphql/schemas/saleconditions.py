# app/graphql/schemas/saleconditions.py
import strawberry
from typing import Optional
from datetime import date

@strawberry.input
class SaleConditionsCreate:
    name: str
    dueDate: date
    surcharge: float
    isActive: Optional[bool] = None

@strawberry.input
class SaleConditionsUpdate:
    name: Optional[str] = None
    dueDate: Optional[date] = None
    surcharge: Optional[float] = None
    isActive: Optional[bool] = None

@strawberry.type
class SaleConditionsInDB:
    saleConditionID: int
    name: str
    dueDate: date
    surcharge: float
    isActive: Optional[bool]
