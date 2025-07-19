# app/graphql/mutations/useractions.py
import strawberry
from typing import Optional
from app.graphql.schemas.useractions import (
    UserActionsCreate,
    UserActionsUpdate,
    UserActionsInDB,
)
from app.graphql.crud.useractions import (
    create,
    update,
    delete,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info
from app.graphql.schemas.delete_response import DeleteResponse


@strawberry.type
class UserActionsMutations:
    @strawberry.mutation
    def create_useraction(self, info: Info, data: UserActionsCreate) -> UserActionsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create(db, data)
            return obj_to_schema(UserActionsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_useraction(
        self, info: Info, userActionID: int, data: UserActionsUpdate
    ) -> Optional[UserActionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update(db, userActionID, data)
            return obj_to_schema(UserActionsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_useraction(self, info: Info, userActionID: int) -> DeleteResponse:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete(db, userActionID)
            success = deleted is not None
            message = "User action deleted" if success else "User action not found"
            return DeleteResponse(success=success, message=message)
        except ValueError as e:
            db.rollback()
            return DeleteResponse(success=False, message=str(e))
        finally:
            db_gen.close()
