# app/graphql/schemas/creditcardgroups.py

import strawberry
from typing import Optional


@strawberry.input
class CreditCardGroupsCreate:
    groupName: Optional[str] = None


@strawberry.input
class CreditCardGroupsUpdate:
    groupName: Optional[str] = None


@strawberry.type
class CreditCardGroupsInDB:
    cardGroupID: int
    groupName: Optional[str] = None

