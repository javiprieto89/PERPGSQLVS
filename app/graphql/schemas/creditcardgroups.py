# app/graphql/schemas/creditcardgroups.py

import strawberry
from typing import Optional


@strawberry.input
class CreditCardGroupsCreate:
    CompanyID: Optional[int] = None
    GroupName: Optional[str] = None


@strawberry.input
class CreditCardGroupsUpdate:
    CompanyID: Optional[int] = None
    GroupName: Optional[str] = None


@strawberry.type
class CreditCardGroupsInDB:
    CreditCardGroupID: int
    CompanyID: Optional[int] = None
    GroupName: Optional[str] = None

