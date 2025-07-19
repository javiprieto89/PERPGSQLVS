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
    def create_user_record(self, info: Info, data: UserCreate) -> UsersInDB:
        db = next(get_db())
        obj = create_user(db, data)
        return obj_to_schema(UsersInDB, obj)

    @strawberry.mutation
    def update_user_record(self, info: Info, userID: int, data: UserUpdate) -> Optional[UsersInDB]:
        db = next(get_db())
        updated = update_user(db, userID, data)
        return obj_to_schema(UsersInDB, updated) if updated else None

    @strawberry.mutation
    def delete_user_record(self, info: Info, userID: int) -> bool:
        db = next(get_db())
        deleted = delete_user(db, userID)
        return deleted is not None
