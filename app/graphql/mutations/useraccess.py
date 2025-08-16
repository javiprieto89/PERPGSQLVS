# app/graphql/mutations/useraccess.py

import strawberry
from typing import Optional
from app.graphql.schemas.useraccess import (
    UserAccessCreate,
    UserAccessUpdate,
    UserAccessInDB,
)
from app.graphql.crud.useraccess import (
    create_useraccess,
    update_useraccess,
    delete_useraccess,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class UserAccessMutation:
    @strawberry.mutation
    def create_useraccess(self, info: Info, data: UserAccessCreate) -> UserAccessInDB:
        db = next(get_db())
        obj = create_useraccess(db, data)
        return obj_to_schema(UserAccessInDB, obj)

    @strawberry.mutation
    def delete_useraccess(
        self,
        info: Info,
        userID: int,
        companyID: int,
        branchID: int,
        roleID: int
    ) -> bool:
        db = next(get_db())
        obj = delete_useraccess(db, userID, companyID, branchID, roleID)
        return obj is not None

    @strawberry.mutation
    def update_useraccess(
        self,
        info: Info,
        userID: int,
        companyID: int,
        branchID: int,
        roleID: int,
        data: UserAccessUpdate,
    ) -> Optional[UserAccessInDB]:
        db = next(get_db())
        updated = update_useraccess(db, userID, companyID, branchID, roleID, data)
        return obj_to_schema(UserAccessInDB, updated) if updated else None
