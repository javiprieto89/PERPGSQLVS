# app/graphql/resolvers/itemtaxes.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.itemtaxes import ItemTaxesInDB
from app.graphql.crud.itemtaxes import get_itemtaxes, get_itemtaxes_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class ItemtaxesQuery:
    @strawberry.field
    def all_itemtaxes(self, info: Info) -> List[ItemTaxesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_itemtaxes(db)
            return list_to_schema(ItemTaxesInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def itemtaxes_by_id(self, info: Info, id: int) -> Optional[ItemTaxesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_itemtaxes_by_id(db, id)
            return obj_to_schema(ItemTaxesInDB, item) if item else None
        finally:
            db_gen.close()


itemtaxesQuery = ItemtaxesQuery()
