# app/graphql/resolvers/transactiontypes.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.transactiontypes import TransactionTypesInDB
from app.graphql.crud.transactiontypes import get_transactiontypes, get_transactiontypes_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class TransactiontypesQuery:
    @strawberry.field
    def all_transactiontypes(self, info: Info) -> List[TransactionTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            transactiontypes = get_transactiontypes(db)
            return list_to_schema(TransactionTypesInDB, transactiontypes)
        finally:
            db_gen.close()

    @strawberry.field
    def transactiontypes_by_id(self, info: Info, id: int) -> Optional[TransactionTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            transactiontype = get_transactiontypes_by_id(db, id)
            return obj_to_schema(TransactionTypesInDB, transactiontype) if transactiontype else None
        finally:
            db_gen.close()


transactiontypesQuery = TransactiontypesQuery()