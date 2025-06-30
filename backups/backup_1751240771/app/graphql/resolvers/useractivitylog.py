# app/graphql/resolvers/useractivitylog.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.useractivitylog import UserActivityLogInDB
from app.models.useractivitylog import UserActivityLog
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class UseractivitylogQuery:
    @strawberry.field
    def all_useractivitylog(self, info: Info) -> List[UserActivityLogInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = db.query(UserActivityLog).all()
            return [UserActivityLogInDB(**item.__dict__) for item in items]
        finally:
            db_gen.close()

    @strawberry.field
    def useractivitylog_by_id(self, info: Info, id: int) -> Optional[UserActivityLogInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = db.query(UserActivityLog).filter(UserActivityLog.activityID == id).first()
            return UserActivityLogInDB(**item.__dict__) if item else None
        finally:
            db_gen.close()


useractivitylogQuery = UseractivitylogQuery()