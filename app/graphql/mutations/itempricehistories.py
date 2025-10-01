import strawberry
from typing import Optional
from strawberry.types import Info

from app.db import get_db
from app.utils import obj_to_schema
from app.graphql.schemas.itempricehistories import (
    ItemPriceHistoriesCreate,
    ItemPriceHistoriesUpdate,
    ItemPriceHistoriesInDB,
)
from app.graphql.crud.itempricehistories import (
    create_itempricehistory,
    update_itempricehistory,
    delete_itempricehistory,
)


@strawberry.type
class ItemPriceHistoriesMutations:
    @strawberry.mutation
    def create_itempricehistory(
        self,
        info: Info,
        data: ItemPriceHistoriesCreate,
    ) -> ItemPriceHistoriesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_itempricehistory(db, data)
            return obj_to_schema(ItemPriceHistoriesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_itempricehistory(
        self,
        info: Info,
        priceHistoryID: int,
        data: ItemPriceHistoriesUpdate,
    ) -> Optional[ItemPriceHistoriesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_itempricehistory(db, priceHistoryID, data)
            return obj_to_schema(ItemPriceHistoriesInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_itempricehistory(
        self,
        info: Info,
        priceHistoryID: int,
    ) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_itempricehistory(db, priceHistoryID)
            return deleted is not None
        finally:
            db_gen.close()
