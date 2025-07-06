# app/graphql/schemas/creditcards.py

import strawberry
from typing import Optional


@strawberry.input
class CreditCardsCreate:
    CreditCardGroupID: Optional[int] = None
    CardName: Optional[str] = None
    Surcharge: Optional[float] = None
    Installments: Optional[int] = None
    IsActive: Optional[bool] = True


@strawberry.input
class CreditCardsUpdate:
    CreditCardGroupID: int
    CardName: str
    Surcharge: Optional[float] = None
    Installments: Optional[int] = None
    IsActive: Optional[bool] = None


@strawberry.type
class CreditCardsInDB:
    CreditCardID: int
    CreditCardGroupID: int
    GroupName: Optional[str] = None
    CardName: str
    Surcharge: Optional[float] = None
    Installments: Optional[int] = None
    IsActive: Optional[bool] = None
