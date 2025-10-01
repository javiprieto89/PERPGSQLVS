# app/graphql/resolvers/rmadetails.py
import strawberry
from typing import List, Optional
from strawberry.types import Info

from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from app.graphql.schemas.rmadetails import RMADetailInDB, RMADetailFilter
from app.graphql.crud.rmadetails import (
    get_rma_details,
    get_rma_detail_by_id,
)


@strawberry.type
class RMADetailQuery:
    @strawberry.field
    def all_rma_details(
        self,
        info: Info,
        filter: Optional[RMADetailFilter] = None,
    ) -> List[RMADetailInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            rows = get_rma_details(db, filter)
            return list_to_schema(RMADetailInDB, rows)
        finally:
            db_gen.close()

    @strawberry.field
    def rma_detail_by_id(
        self,
        info: Info,
        companyID: int,
        branchID: int,
        rmaID: int,
        rmaDetailID: int,
    ) -> Optional[RMADetailInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            row = get_rma_detail_by_id(db, companyID, branchID, rmaID, rmaDetailID)
            return obj_to_schema(RMADetailInDB, row) if row else None
        finally:
            db_gen.close()


rmaDetailQuery = RMADetailQuery()
