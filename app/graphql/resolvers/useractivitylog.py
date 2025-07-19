# app/graphql/resolvers/useractivitylog.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.useractivitylog import UserActivityLogInDB
from app.models.useractivitylog import UserActivityLog
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class UseractivitylogQuery:
    @strawberry.field
    def all_useractivitylog(self, info: Info) -> List[UserActivityLogInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = db.query(UserActivityLog).all()
            return list_to_schema(UserActivityLogInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def useractivitylog_by_id(self, info: Info, id: int) -> Optional[UserActivityLogInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = db.query(UserActivityLog).filter(UserActivityLog.activityID == id).first()
            return obj_to_schema(UserActivityLogInDB, item) if item else None
        finally:
            db_gen.close()


useractivitylogQuery = UseractivitylogQuery()