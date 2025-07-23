# app/graphql/schemas/systransactiontypes.py
import strawberry
from typing import Optional

@strawberry.input
class SysTransactionTypesCreate:
    TypeName: str

@strawberry.input
class SysTransactionTypesUpdate:
    TypeName: Optional[str] = None

@strawberry.type
class SysTransactionTypesInDB:
    TransactTypeID: int
    TypeName: str
