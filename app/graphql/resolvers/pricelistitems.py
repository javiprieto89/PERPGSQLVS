# app/graphql/resolvers/pricelistitems.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.pricelistitems import PriceListItemsInDB
from app.graphql.crud.pricelistitems import get_pricelistitems, get_pricelistitems_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class PricelistitemsQuery:
    @strawberry.field
    def all_pricelistitems(self, info: Info) -> List[PriceListItemsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_pricelistitems(db)
            return list_to_schema(PriceListItemsInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def pricelistitems_by_id(self, info: Info, id: int) -> Optional[PriceListItemsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_pricelistitems_by_id(db, id)
            return obj_to_schema(PriceListItemsInDB, item) if item else None
        finally:
            db_gen.close()


pricelistitemsQuery = PricelistitemsQuery()
