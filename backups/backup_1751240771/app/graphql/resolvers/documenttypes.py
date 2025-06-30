# app/graphql/resolvers/documenttypes.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.documenttypes import DocumentTypesInDB
from app.graphql.crud.documenttypes import get_documenttypes, get_documenttypes_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class DocumenttypesQuery:
    @strawberry.field
    def all_documenttypes(self, info: Info) -> List[DocumentTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            documenttypes = get_documenttypes(db)
            return [DocumentTypesInDB(**documenttype.__dict__) for documenttype in documenttypes]
        finally:
            db_gen.close()

    @strawberry.field
    def documenttypes_by_id(self, info: Info, id: int) -> Optional[DocumentTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            documenttype = get_documenttypes_by_id(db, id)
            return DocumentTypesInDB(**documenttype.__dict__) if documenttype else None
        finally:
            db_gen.close()


documenttypesQuery = DocumenttypesQuery()
