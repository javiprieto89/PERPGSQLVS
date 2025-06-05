# app/graphql/resolvers/auth.py
import strawberry
from typing import Optional, cast
from datetime import datetime, timedelta
import jwt  # PyJWT
from app.graphql.schemas.auth import LoginResponse
from app.graphql.crud.users import get_user_by_nickname
from app.db import get_db
from strawberry.types import Info
from app.models.users import Users

SECRET_KEY = "TwR-LP_KuwXaHAoHK9MU2-Nyb4UVnz4QHuYKi5iBQJA"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


@strawberry.type
class Mutation:
    @strawberry.mutation
    def login(self, info: Info, nickname: str, password: str) -> Optional[LoginResponse]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            user = get_user_by_nickname(db, nickname)
            if user is None:
                return None

            user = cast(Users, user)

            password_from_db = user.password
            if password_from_db != password:  # type: ignore
                return None

            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            to_encode = {"sub": nickname, "exp": expire}
            encoded_jwt = jwt.encode(
                to_encode, SECRET_KEY, algorithm=ALGORITHM)

            return LoginResponse(access_token=encoded_jwt, token_type="bearer")
        finally:
            db_gen.close()
