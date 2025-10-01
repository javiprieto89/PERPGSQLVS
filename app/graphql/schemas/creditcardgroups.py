# app/graphql/schemas/creditcardgroups.py

import strawberry
from typing import Optional
from app.graphql.schemas.company import CompanyInDB


@strawberry.input
class CreditCardGroupsCreate:
    CompanyID: int | None
    CreditCardGroupName: str | None


@strawberry.input
class CreditCardGroupsUpdate:
    CompanyID: int | None
    CreditCardGroupName: Optional[str] = None


@strawberry.type
class CreditCardGroupsInDB:
    CompanyID: int | None
    CreditCardGroupID: int
    GroupName: str | None


# Relaciones solicitadas
CompanyData: Optional[CompanyInDB] = None
