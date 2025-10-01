import strawberry
from typing import Optional
from strawberry.types import Info

from app.db import get_db
from app.utils import obj_to_schema
from app.graphql.schemas.rmas import RMACreate, RMAUpdate, RMAInDB
from app.graphql.crud.rmas import create_rma, update_rma, delete_rma


@strawberry.type
class RMAMutations:
    @strawberry.mutation
    def create_rma(self, info: Info, data: RMACreate) -> RMAInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_rma(db, data)
            return obj_to_schema(RMAInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_rma(
        self,
        info: Info,
        companyID: int,
        branchID: int,
        rmaID: int,
        data: RMAUpdate,
    ) -> Optional[RMAInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_rma(db, companyID, branchID, rmaID, data)
            return obj_to_schema(RMAInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_rma(
        self,
        info: Info,
        companyID: int,
        branchID: int,
        rmaID: int,
    ) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            removed = delete_rma(db, companyID, branchID, rmaID)
            return removed is not None
        finally:
            db_gen.close()
