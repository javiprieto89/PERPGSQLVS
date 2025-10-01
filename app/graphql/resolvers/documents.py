# app/graphql/resolvers/documents.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.documents import CommercialDocumentsInDB
from app.graphql.crud.documents import get_documents, get_documents_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info

@strawberry.type
class CommercialdocumentsQuery:
    @strawberry.field
    def all_commercialdocuments(self, info: Info) -> List[CommercialDocumentsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            documents = get_documents(db)
            return list_to_schema(CommercialDocumentsInDB, documents)
        finally:
            db_gen.close()

    @strawberry.field
    def commercialdocuments_by_id(self, info: Info, id: int) -> Optional[CommercialDocumentsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            doc = get_documents_by_id(db, id)
            return obj_to_schema(CommercialDocumentsInDB, doc) if doc else None
        finally:
            db_gen.close()

documentsQuery = CommercialdocumentsQuery()

