# app/graphql/resolvers/itempricehistories.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.itempricehistories import ItemPriceHistoriesInDB
from app.graphql.crud.itempricehistories import get_itempricehistory, get_itempricehistory_by_id   
#from app.models.itempricehistories import ItemPriceHistories
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info

@strawberry.type
class ItempricehistoriesQuery:
    @strawberry.field
    def all_itempricehistory(self, info: Info) -> List[ItemPriceHistoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            itempricehistory = get_itempricehistory(db)
            return list_to_schema(ItemPriceHistoriesInDB, itempricehistory)
        finally:
            db_gen.close()

    @strawberry.field
    def itempricehistory_by_id(self, info: Info, id: int) -> Optional[ItemPriceHistoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_itempricehistory_by_id(db, id)
            return obj_to_schema(ItemPriceHistoriesInDB, item) if item else None
        finally:
            db_gen.close()

itempricehistoriesQuery = ItempricehistoriesQuery()