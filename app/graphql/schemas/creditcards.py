# app/graphql/schemas/creditcards.py

import strawberry
from typing import Optional
from app.graphql.schemas.creditcardgroups import CreditCardGroupsInDB


@strawberry.input
class CreditCardsCreate:
    CreditCardGroupID: Optional[int] = None
    CompanyID: Optional[int] = None
    CardName: Optional[str] = None
    Surcharge: Optional[float] = None
    Installments: Optional[int] = None
    IsActive: Optional[bool] = True


@strawberry.input
class CreditCardsUpdate:
    CreditCardGroupID: int
    CompanyID: Optional[int] = None
    CardName: str
    Surcharge: Optional[float] = None
    Installments: Optional[int] = None
    IsActive: Optional[bool] = None


@strawberry.type
class CreditCardsInDB:
    CreditCardID: int
    CreditCardGroupID: int
    CompanyID: Optional[int] = None
    CardName: str
    Surcharge: Optional[float] = None
    Installments: Optional[int] = None
    IsActive: Optional[bool] = None
    GroupData: Optional[CreditCardGroupsInDB] = None
