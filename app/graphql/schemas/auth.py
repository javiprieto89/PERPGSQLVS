# app/graphql/schemas/auth.py
import strawberry


@strawberry.type
class LoginResponse:
    access_token: str
    token_type: str
