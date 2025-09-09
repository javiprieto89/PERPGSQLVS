# app/graphql/schemas/delete_response.py
import strawberry


@strawberry.type
class DeleteResponse:
    success: bool
    message: str