# app/graphql/mutations/useraccess.py

import strawberry
from app.graphql.schemas.useraccess import UserAccessCreate, UserAccessInDB
from app.graphql.crud.useraccess import (
    get_useraccess_by_id,
    create_useraccess,
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
        oldUserID: int,
        oldCompanyID: int,
        oldBranchID: int,
        oldRoleID: int,
        newData: UserAccessCreate
    ) -> UserAccessInDB:
        db = next(get_db())

        # Eliminar el viejo acceso si existe
        existing = get_useraccess_by_id(
            db, oldUserID, oldCompanyID, oldBranchID, oldRoleID)
        if existing:
            db.delete(existing)
            db.commit()

        # Crear nuevo acceso con los nuevos datos
        obj = create_useraccess(db, newData)
        return obj_to_schema(UserAccessInDB, obj)

