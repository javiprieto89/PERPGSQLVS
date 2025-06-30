# app/graphql/resolvers/documents.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.documents import DocumentsInDB
from app.graphql.crud.documents import get_documents, get_documents_by_id
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class DocumentsQuery:
    @strawberry.field
    def all_documents(self, info: Info) -> List[DocumentsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            documents = get_documents(db)
            return [DocumentsInDB(**doc.__dict__) for doc in documents]
        finally:
            db_gen.close()

    @strawberry.field
    def documents_by_id(self, info: Info, id: int) -> Optional[DocumentsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            doc = get_documents_by_id(db, id)
            return DocumentsInDB(**doc.__dict__) if doc else None
        finally:
            db_gen.close()

documentsQuery = DocumentsQuery()
