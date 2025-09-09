# app/graphql/mutations/sysdocumenttypes.py
import strawberry
from typing import Optional
from app.graphql.schemas.sysdocumenttypes import (
    SysDocumentTypesCreate,
    SysDocumentTypesUpdate,
    SysDocumentTypesInDB,
)
from app.graphql.crud.sysdocumenttypes import (
    create_sysdocumenttypes,
    update_sysdocumenttypes,
    delete_sysdocumenttypes,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info
from app.graphql.schemas.delete_response import DeleteResponse


@strawberry.type
class SysDocumentTypesMutations:
    @strawberry.mutation
    def create_sysdocumenttype(
        self, info: Info, data: SysDocumentTypesCreate
    ) -> SysDocumentTypesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_sysdocumenttypes(db, data)
            return obj_to_schema(SysDocumentTypesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_sysdocumenttype(
        self, info: Info, documentTypeID: int, data: SysDocumentTypesUpdate
    ) -> Optional[SysDocumentTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_sysdocumenttypes(db, documentTypeID, data)
            return obj_to_schema(SysDocumentTypesInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_sysdocumenttype(self, info: Info, documentTypeID: int) -> DeleteResponse:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_sysdocumenttypes(db, documentTypeID)
            success = deleted is not None
            message = "Document type deleted" if success else "Document type not found"
            return DeleteResponse(success=success, message=message)
        except ValueError as e:
            db.rollback()
            return DeleteResponse(success=False, message=str(e))
        finally:
            db_gen.close()

