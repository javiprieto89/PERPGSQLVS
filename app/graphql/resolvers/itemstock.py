# app/graphql/resolvers/itemstock.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.itemstock import ItemStockInDB
from app.graphql.crud.itemstock import get_itemstock, get_itemstock_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class ItemStockQuery:
    @strawberry.field
    def all_itemstock(self, info: Info) -> List[ItemStockInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            itemstock = get_itemstock(db)
            return list_to_schema(ItemStockInDB, itemstock)
        finally:
            db_gen.close()

    @strawberry.field
    def itemstock_by_id(self, info: Info, id: int) -> Optional[ItemStockInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_itemstock_by_id(db, id)
            return obj_to_schema(ItemStockInDB, item) if item else None
        finally:
            db_gen.close()


itemStockQuery = ItemStockQuery()
