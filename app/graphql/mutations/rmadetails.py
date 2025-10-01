import strawberry
from typing import Optional
from strawberry.types import Info

from app.db import get_db
from app.utils import obj_to_schema
from app.graphql.schemas.rmadetails import (
    RMADetailCreate,
    RMADetailUpdate,
    RMADetailInDB,
)
from app.graphql.crud.rmadetails import (
    create_rma_detail,
    update_rma_detail,
    delete_rma_detail,
)


@strawberry.type
class RMADetailMutations:
    @strawberry.mutation
    def create_rma_detail(self, info: Info, data: RMADetailCreate) -> RMADetailInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_rma_detail(db, data)
            return obj_to_schema(RMADetailInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_rma_detail(
        self,
        info: Info,
        companyID: int,
        branchID: int,
        rmaID: int,
        rmaDetailID: int,
        data: RMADetailUpdate,
    ) -> Optional[RMADetailInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_rma_detail(db, companyID, branchID, rmaID, rmaDetailID, data)
            return obj_to_schema(RMADetailInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_rma_detail(
        self,
        info: Info,
        companyID: int,
        branchID: int,
        rmaID: int,
        rmaDetailID: int,
    ) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            removed = delete_rma_detail(db, companyID, branchID, rmaID, rmaDetailID)
            return removed is not None
        finally:
            db_gen.close()
