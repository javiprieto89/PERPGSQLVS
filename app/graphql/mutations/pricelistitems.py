# app/graphql/mutations/pricelistitems.py
import strawberry
from typing import Optional
from app.graphql.schemas.pricelistitems import PriceListItemsCreate, PriceListItemsUpdate, PriceListItemsInDB
from app.graphql.crud.pricelistitems import (
    create_pricelistitem,
    update_pricelistitem,
    delete_pricelistitem,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class PricelistitemsMutations:
    @strawberry.mutation
    def create_pricelistitem(self, info: Info, data: PriceListItemsCreate) -> PriceListItemsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_pricelistitem(db, data)
            return obj_to_schema(PriceListItemsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_pricelistitem(
        self, info: Info, pricelistID: int, itemID: int, data: PriceListItemsUpdate
    ) -> Optional[PriceListItemsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_pricelistitem(db, pricelistID, itemID, data)
            return obj_to_schema(PriceListItemsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_pricelistitem(self, info: Info, pricelistID: int, itemID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_pricelistitem(db, pricelistID, itemID)
            return deleted is not None
        finally:
            db_gen.close()

