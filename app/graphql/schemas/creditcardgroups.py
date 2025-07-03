# app/graphql/schemas/creditcardgroups.py

import strawberry
from typing import Optional


@strawberry.input
class CreditCardGroupsCreate:
    GroupName: Optional[str] = None


@strawberry.input
class CreditCardGroupsUpdate:
    GroupName: Optional[str] = None


@strawberry.type
class CreditCardGroupsInDB:
    CreditCardGroupID: int
    GroupName: Optional[str] = None

