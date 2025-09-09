# app/graphql/resolvers/systransactiontypes.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.systransactiontypes import SysTransactionTypesInDB
from app.graphql.crud.systransactiontypes import (
    get_systransactiontypes,
    get_systransactiontypes_by_id,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class SystransactiontypesQuery:
    @strawberry.field
    def all_systransactiontypes(self, info: Info) -> List[SysTransactionTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            transactiontypes = get_systransactiontypes(db)
            return list_to_schema(SysTransactionTypesInDB, transactiontypes)
        finally:
            db_gen.close()

    @strawberry.field
    def systransactiontypes_by_id(self, info: Info, id: int) -> Optional[SysTransactionTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            transactiontype = get_systransactiontypes_by_id(db, id)
            return obj_to_schema(SysTransactionTypesInDB, transactiontype) if transactiontype else None
        finally:
            db_gen.close()


systransactiontypesQuery = SystransactiontypesQuery()
