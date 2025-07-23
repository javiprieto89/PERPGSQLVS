# app/graphql/mutations/sysdoctypes.py
import strawberry
from typing import Optional
from app.graphql.schemas.sysdoctypes import (
    SysDocTypesCreate,
    SysDocTypesUpdate,
    SysDocTypesInDB,
)
from app.graphql.crud.sysdoctypes import (
    create_sysdoctypes,
    update_sysdoctypes,
    delete_sysdoctypes,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info
from app.graphql.schemas.delete_response import DeleteResponse


@strawberry.type
class SysDocTypesMutations:
    @strawberry.mutation
    def create_sysdoctype(
        self, info: Info, data: SysDocTypesCreate
    ) -> SysDocTypesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_sysdoctypes(db, data)
            return obj_to_schema(SysDocTypesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_sysdoctype(
        self, info: Info, doctypeID: int, data: SysDocTypesUpdate
    ) -> Optional[SysDocTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_sysdoctypes(db, doctypeID, data)
            return obj_to_schema(SysDocTypesInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_sysdoctype(self, info: Info, doctypeID: int) -> DeleteResponse:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_sysdoctypes(db, doctypeID)
            success = deleted is not None
            message = "Doc type deleted" if success else "Doc type not found"
            return DeleteResponse(success=success, message=message)
        except ValueError as e:
            db.rollback()
            return DeleteResponse(success=False, message=str(e))
        finally:
            db_gen.close()
