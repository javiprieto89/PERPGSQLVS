# app/graphql/schemas/transactiontypes.py
import strawberry
from typing import Optional

@strawberry.input
class TransactionTypesCreate:
    TypeName: str

@strawberry.input
class TransactionTypesUpdate:
    TypeName: Optional[str] = None

@strawberry.type
class TransactionTypesInDB:
    TransactTypeID: int
    TypeName: str
