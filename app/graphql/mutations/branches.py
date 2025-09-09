# app/graphql/mutations/branches.py
import strawberry
from typing import Optional
from app.graphql.schemas.branches import BranchesCreate, BranchesUpdate, BranchesInDB
from app.graphql.crud.branches import create_branches, update_branches, delete_branches
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class BranchesMutations:
    @strawberry.mutation
    def create_branch(self, info: Info, data: BranchesCreate) -> BranchesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_branches(db, data)
            return obj_to_schema(BranchesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_branch(
        self, info: Info, companyID: int, branchID: int, data: BranchesUpdate
    ) -> Optional[BranchesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_branches(db, companyID, branchID, data)
            return obj_to_schema(BranchesInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_branch(self, info: Info, companyID: int, branchID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_branches(db, companyID, branchID)
            return deleted is not None
        finally:
            db_gen.close()

