# app/graphql/schemas/checkstatuses.py
# Schema GraphQL para estados de cheques

import strawberry


@strawberry.type
class CheckStatusesInDB:
    CheckStatusID: int
    StatusCode: str
    StatusName: str
    IsActive: bool
