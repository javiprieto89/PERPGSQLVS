# app/graphql/mutations/userpermissions.py

import strawberry
from app.graphql.schemas.userapermissions import UserPermissionsCreate, UserPermissionsInDB
from app.graphql.crud.userpermissions import (
    get_userpermissions_by_id,
    create_userpermissions,
    delete_userpermissions,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class UserPermissionsMutation:
    @strawberry.mutation
    def create_userpermissions(self, info: Info, data: UserPermissionsCreate) -> UserPermissionsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_userpermissions(db, data)
            return obj_to_schema(UserPermissionsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_userpermissions(
        self,
        info: Info,
        userID: int,
        companyID: int,
        branchID: int,
        roleID: int
    ) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = delete_userpermissions(
                db, userID, companyID, branchID, roleID)
            return obj is not None
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_userpermissions(
        self,
        info: Info,
        oldUserID: int,
        oldCompanyID: int,
        oldBranchID: int,
        oldRoleID: int,
        newData: UserPermissionsCreate
    ) -> UserPermissionsInDB:
        db_gen = get_db()
        db = next(db_gen)

        try:
            # Eliminar el viejo acceso si existe
            existing = get_userpermissions_by_id(
                db, oldUserID, oldCompanyID, oldBranchID, oldRoleID)
            if existing:
                db.delete(existing)
                db.commit()

            # Crear nuevo acceso con los nuevos datos
            obj = create_userpermissions(db, newData)
            return obj_to_schema(UserPermissionsInDB, obj)
        finally:
            db_gen.close()
