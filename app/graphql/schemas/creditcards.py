# app/graphql/schemas/creditcards.py

import strawberry
from typing import Optional


@strawberry.input
class CreditCardsCreate:
    cardGroupID: Optional[int] = None
    cardName: Optional[str] = None
    surcharge: Optional[float] = None
    installments: Optional[int] = None
    isActive: Optional[bool] = True


@strawberry.input
class CreditCardsUpdate:
    cardGroupID: int
    cardName: str
    surcharge: Optional[float] = None
    installments: Optional[int] = None
    isActive: Optional[bool] = None


@strawberry.type
class CreditCardsInDB:
    creditCardID: int
    cardGroupID: int
    cardName: str
    surcharge: Optional[float] = None
    installments: Optional[int] = None
    isActive: Optional[bool] = None
