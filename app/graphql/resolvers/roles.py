# app/graphql/resolvers/roles.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.roles import RolesInDB
from app.graphql.crud.roles import get_roles, get_roles_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class RolesQuery:
    @strawberry.field
    def all_roles(self, info: Info) -> List[RolesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            roles = get_roles(db)
            return [RolesInDB(**role.__dict__) for role in roles]
        finally:
            db_gen.close()

    @strawberry.field
    def roles_by_id(self, info: Info, id: int) -> Optional[RolesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            role = get_roles_by_id(db, id)
            return RolesInDB(**role.__dict__) if role else None
        finally:
            db_gen.close()


rolesQuery = RolesQuery()
