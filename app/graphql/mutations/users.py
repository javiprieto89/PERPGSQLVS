# app/graphql/mutations/users.py
import strawberry
from typing import Optional
from app.graphql.schemas.users import UserCreate, UserUpdate, UsersInDB
from app.graphql.crud.users import create_user, update_user, delete_user
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class UsersMutations:
    @strawberry.mutation
    def create_user(self, info: Info, data: UserCreate) -> UsersInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_user(db, data)
            return obj_to_schema(UsersInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_user(self, info: Info, userID: int, data: UserUpdate) -> Optional[UsersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_user(db, userID, data)
            return obj_to_schema(UsersInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_user(self, info: Info, userID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_user(db, userID)
            return deleted is not None
        finally:
            db_gen.close()
