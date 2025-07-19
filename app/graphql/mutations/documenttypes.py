# app/graphql/mutations/documenttypes.py
import strawberry
from typing import Optional
from app.graphql.schemas.documenttypes import (
    DocumentTypesCreate,
    DocumentTypesUpdate,
    DocumentTypesInDB,
)
from app.graphql.crud.documenttypes import (
    create_documenttypes,
    update_documenttypes,
    delete_documenttypes,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info
from app.graphql.schemas.delete_response import DeleteResponse


@strawberry.type
class DocumentTypesMutations:
    @strawberry.mutation
    def create_documenttype(
        self, info: Info, data: DocumentTypesCreate
    ) -> DocumentTypesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_documenttypes(db, data)
            return obj_to_schema(DocumentTypesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_documenttype(
        self, info: Info, documentTypeID: int, data: DocumentTypesUpdate
    ) -> Optional[DocumentTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_documenttypes(db, documentTypeID, data)
            return obj_to_schema(DocumentTypesInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_documenttype(self, info: Info, documentTypeID: int) -> DeleteResponse:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_documenttypes(db, documentTypeID)
            success = deleted is not None
            message = "Document type deleted" if success else "Document type not found"
            return DeleteResponse(success=success, message=message)
        except ValueError as e:
            db.rollback()
            return DeleteResponse(success=False, message=str(e))
        finally:
            db_gen.close()
