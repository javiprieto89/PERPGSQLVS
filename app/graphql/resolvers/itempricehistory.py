# app/graphql/resolvers/itempricehistory.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.itempricehistory import ItemPriceHistoryInDB
from app.graphql.crud.itempricehistory import get_itempricehistory, get_itempricehistory_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class ItempricehistoryQuery:
    @strawberry.field
    def all_itempricehistory(self, info: Info) -> List[ItemPriceHistoryInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            itempricehistory = get_itempricehistory(db)
            return list_to_schema(ItemPriceHistoryInDB, itempricehistory)
        finally:
            db_gen.close()

    @strawberry.field
    def itempricehistory_by_id(self, info: Info, id: int) -> Optional[ItemPriceHistoryInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_itempricehistory_by_id(db, id)
            return obj_to_schema(ItemPriceHistoryInDB, item) if item else None
        finally:
            db_gen.close()


itempricehistoryQuery = ItempricehistoryQuery()

