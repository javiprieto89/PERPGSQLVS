# app/graphql/resolvers/users.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.users import UsersInDB
from app.graphql.crud.users import get_users, get_user_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class UsersQuery:
    @strawberry.field
    def all_users(self, info: Info) -> List[UsersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            users = get_users(db)
            return [UsersInDB(**user.__dict__) for user in users]
        finally:
            db_gen.close()

    @strawberry.field
    def users_by_id(self, info: Info, id: int) -> Optional[UsersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            user = get_user_by_id(db, id)
            return UsersInDB(**user.__dict__) if user else None
        finally:
            db_gen.close()


usersQuery = UsersQuery()
