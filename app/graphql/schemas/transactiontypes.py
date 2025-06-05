# app/graphql/schemas/transactiontypes.py
import strawberry
from typing import Optional

@strawberry.input
class TransactionTypesCreate:
    typeName: str

@strawberry.input
class TransactionTypesUpdate:
    typeName: Optional[str] = None

@strawberry.type
class TransactionTypesInDB:
    transactTypeID: int
    typeName: str
