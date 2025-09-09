import strawberry
from typing import Optional
from app.graphql.schemas.items import ItemsCreate, ItemsUpdate, ItemsInDB
from app.graphql.crud.items import (
    create_items,
    update_items,
    delete_items,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class ItemsMutations:
    @strawberry.mutation
    def create_item(self, info: Info, data: ItemsCreate) -> ItemsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_items(db, data)
            return obj_to_schema(ItemsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_item(self, info: Info, itemID: int, data: ItemsUpdate) -> Optional[ItemsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_items(db, itemID, data)
            return obj_to_schema(ItemsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_item(self, info: Info, itemID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_items(db, itemID)
            return deleted is not None
        finally:
            db_gen.close()
            
