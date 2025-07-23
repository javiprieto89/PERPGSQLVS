# app/graphql/resolvers/sysdocumenttypes.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.sysdocumenttypes import SysDocumentTypesInDB
from app.graphql.crud.sysdocumenttypes import get_sysdocumenttypes, get_sysdocumenttypes_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class SysdocumenttypesQuery:
    @strawberry.field
    def all_sysdocumenttypes(self, info: Info) -> List[SysDocumentTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            documenttypes = get_sysdocumenttypes(db)
            return list_to_schema(SysDocumentTypesInDB, documenttypes)
        finally:
            db_gen.close()

    @strawberry.field
    def sysdocumenttypes_by_id(self, info: Info, id: int) -> Optional[SysDocumentTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            documenttype = get_sysdocumenttypes_by_id(db, id)
            return obj_to_schema(SysDocumentTypesInDB, documenttype) if documenttype else None
        finally:
            db_gen.close()


sysdocumenttypesQuery = SysdocumenttypesQuery()
