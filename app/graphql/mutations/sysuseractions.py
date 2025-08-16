# app/graphql/mutations/sysuseractions.py
import strawberry
from typing import Optional
from app.graphql.schemas.sysuseractions import (
    SysUserActionsCreate,
    SysUserActionsUpdate,
    SysUserActionsInDB,
)
from app.graphql.crud.sysuseractions import (
    create_sysuseractions,
    update_sysuseractions,
    delete_sysuseractions,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info
from app.graphql.schemas.delete_response import DeleteResponse


@strawberry.type
class SysUserActionsMutations:
    @strawberry.mutation
    def create_sysuseraction(self, info: Info, data: SysUserActionsCreate) -> SysUserActionsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_sysuseractions(db, data)
            return obj_to_schema(SysUserActionsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_sysuseraction(
        self, info: Info, userActionID: int, data: SysUserActionsUpdate
    ) -> Optional[SysUserActionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_sysuseractions(db, userActionID, data)
            return obj_to_schema(SysUserActionsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_sysuseraction(self, info: Info, userActionID: int) -> DeleteResponse:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_sysuseractions(db, userActionID)
            success = deleted is not None
            message = "User action deleted" if success else "User action not found"
            return DeleteResponse(success=success, message=message)
        except ValueError as e:
            db.rollback()
            return DeleteResponse(success=False, message=str(e))
        finally:
            db_gen.close()
