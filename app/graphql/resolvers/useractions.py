# app/graphql/resolvers/useractions.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.useractions import UserActionsInDB
from app.graphql.crud.useractions import get_useractions, get_useractions_by_id, get_useractions_by_name
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class UseractionsQuery:
    @strawberry.field
    def all_useractions(self, info: Info) -> List[UserActionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            useractions = get_useractions(db)
            return list_to_schema(UserActionsInDB, useractions)
        finally:
            db_gen.close()

    @strawberry.field
    def useractions_by_id(self, info: Info, id: int) -> Optional[UserActionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            useraction = get_useractions_by_id(db, id)
            return obj_to_schema(UserActionsInDB, useraction) if useraction else None
        finally:
            db_gen.close()

    @strawberry.field
    def useractions_by_name(self, info: Info, name: str) -> List[UserActionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            useractions = get_useractions_by_name(db, name)
            return list_to_schema(UserActionsInDB, useractions)
        finally:
            db_gen.close()


useractionsQuery = UseractionsQuery()
