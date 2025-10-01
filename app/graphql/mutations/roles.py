# app/graphql/mutations/roles.py
import strawberry
from typing import Optional
from app.graphql.schemas.roles import RolesCreate, RolesUpdate, RolesInDB
from app.graphql.crud.roles import create_roles, update_roles, delete_roles
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class RolesMutations:
    @strawberry.mutation
    def create_role(self, info: Info, data: RolesCreate) -> RolesInDB:
        db_gen =get_db()
        db = next(db_gen)        
        try:
            obj = create_roles(db, data)
            return obj_to_schema(RolesInDB, obj)
        finally:
            db_gen.close()
            
    @strawberry.mutation
    def update_role(self, info: Info, roleID: int, data: RolesUpdate) -> Optional[RolesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_roles(db, roleID, data)
            return obj_to_schema(RolesInDB, updated) if updated else None
        finally:
            db_gen.close()
        
    @strawberry.mutation
    def delete_role(self, info: Info, roleID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_roles(db, roleID)        
            return deleted is not None
        finally:
            db_gen.close()  
            

