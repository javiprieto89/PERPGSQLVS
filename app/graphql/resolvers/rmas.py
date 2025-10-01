# app/graphql/resolvers/rmas.py
import strawberry
from typing import List, Optional
from strawberry.types import Info

from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from app.graphql.schemas.rmas import RMAInDB, RMAFilter
from app.graphql.crud.rmas import get_rmas, get_rma_by_id


@strawberry.type
class RMAQuery:
    @strawberry.field
    def all_rmas(self, info: Info, filter: Optional[RMAFilter] = None) -> List[RMAInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = get_rmas(db, filter)
            return list_to_schema(RMAInDB, records)
        finally:
            db_gen.close()

    @strawberry.field
    def rma_by_id(
        self,
        info: Info,
        companyID: int,
        branchID: int,
        rmaID: int,
    ) -> Optional[RMAInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            record = get_rma_by_id(db, companyID, branchID, rmaID)
            return obj_to_schema(RMAInDB, record) if record else None
        finally:
            db_gen.close()


rmaQuery = RMAQuery()
