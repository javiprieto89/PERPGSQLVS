# app/graphql/resolvers/userpermissions.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.userapermissions import UserPermissionsInDB
from app.graphql.crud.userpermissions import get_userpermissions, get_userpermissions_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema

from strawberry.types import Info


@strawberry.type
class UserPermissionsQuery:
    @strawberry.field
    def all_userpermissions(self, info: Info) -> List[UserPermissionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = get_userpermissions(db)
            return list_to_schema(UserPermissionsInDB, records)
        finally:
            db_gen.close()

    @strawberry.field
    def userpermissions_by_id(self, info: Info, userID: int, companyID: int, branchID: int, roleID: int) -> Optional[UserPermissionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            record = get_userpermissions_by_id(
                db, userID, companyID, branchID, roleID)
            return obj_to_schema(UserPermissionsInDB, record) if record else None
        finally:
            db_gen.close()


userpermissionsQuery = UserPermissionsQuery()
