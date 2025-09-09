# app/graphql/resolvers/useraccess.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.useraccess import UserAccessInDB
from app.graphql.crud.useraccess import get_useraccess, get_useraccess_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema

from strawberry.types import Info


@strawberry.type
class UseraccessQuery:
    @strawberry.field
    def all_useraccess(self, info: Info) -> List[UserAccessInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = get_useraccess(db)
            return list_to_schema(UserAccessInDB, records)
        finally:
            db_gen.close()

    @strawberry.field
    def useraccess_by_id(self, info: Info, userID: int, companyID: int, branchID: int, roleID: int) -> Optional[UserAccessInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            record = get_useraccess_by_id(
                db, userID, companyID, branchID, roleID)
            return obj_to_schema(UserAccessInDB, record) if record else None
        finally:
            db_gen.close()


useraccessQuery = UseraccessQuery()

