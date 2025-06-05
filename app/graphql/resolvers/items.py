# app/graphql/resolvers/items.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.items import ItemsInDB
from app.graphql.crud.items import get_items, get_items_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class ItemsQuery:
    @strawberry.field
    def all_items(self, info: Info) -> List[ItemsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_items(db)
            return [ItemsInDB(**item.__dict__) for item in items]
        finally:
            db_gen.close()

    @strawberry.field
    def items_by_id(self, info: Info, id: int) -> Optional[ItemsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_items_by_id(db, id)
            return ItemsInDB(**item.__dict__) if item else None
        finally:
            db_gen.close()


itemsQuery = ItemsQuery()
