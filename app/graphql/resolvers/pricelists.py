# app/graphql/resolvers/pricelists.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.pricelists import PriceListsInDB
from app.graphql.crud.pricelists import get_pricelists, get_pricelists_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class PricelistsQuery:
    @strawberry.field
    def all_pricelists(self, info: Info) -> List[PriceListsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            pricelists = get_pricelists(db)
            return list_to_schema(PriceListsInDB, pricelists)
        finally:
            db_gen.close()

    @strawberry.field
    def pricelists_by_id(self, info: Info, id: int) -> Optional[PriceListsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            pl = get_pricelists_by_id(db, id)
            return obj_to_schema(PriceListsInDB, pl) if pl else None
        finally:
            db_gen.close()


pricelistsQuery = PricelistsQuery()
