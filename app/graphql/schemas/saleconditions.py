# app/graphql/schemas/saleconditions.py
import strawberry
from typing import Optional
from datetime import date

@strawberry.input
class SaleConditionsCreate:
    CreditCardID: int
    Name: str
    DueDate: date
    Surcharge: float
    IsActive: Optional[bool] = None

@strawberry.input
class SaleConditionsUpdate:
    CreditCardID: Optional[int] = None
    Name: Optional[str] = None
    DueDate: Optional[date] = None
    Surcharge: Optional[float] = None
    IsActive: Optional[bool] = None

@strawberry.type
class SaleConditionsInDB:
    SaleConditionID: int
    CreditCardID: int
    Name: str
    DueDate: date
    Surcharge: float
    IsActive: Optional[bool]