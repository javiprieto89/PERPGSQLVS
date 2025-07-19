# app/graphql/mutations/documents.py
import strawberry
from typing import Optional
from app.graphql.schemas.documents import DocumentsCreate, DocumentsUpdate, DocumentsInDB
from app.graphql.crud.documents import create_documents, update_documents, delete_documents
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info
from app.graphql.schemas.delete_response import DeleteResponse

@strawberry.type
class DocumentsMutations:
    @strawberry.mutation
    def create_document(self, info: Info, data: DocumentsCreate) -> DocumentsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_documents(db, data)
            return obj_to_schema(DocumentsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_document(self, info: Info, documentID: int, data: DocumentsUpdate) -> Optional[DocumentsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_documents(db, documentID, data)
            return obj_to_schema(DocumentsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_document(self, info: Info, documentID: int) -> DeleteResponse:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_documents(db, documentID)
            success = deleted is not None
            message = "Document deleted" if success else "Document not found"
            return DeleteResponse(success=success, message=message)
        except ValueError as e:
            db.rollback()
            return DeleteResponse(success=False, message=str(e))
        finally:
            db_gen.close()
