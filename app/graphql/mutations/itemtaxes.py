# app/graphql/mutations/itemtaxes.py
import strawberry
from typing import Optional
from app.graphql.schemas.itemtaxes import ItemTaxesCreate, ItemTaxesUpdate, ItemTaxesInDB
from app.graphql.crud.itemtaxes import create_itemtaxes, update_itemtaxes, delete_itemtaxes
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class ItemtaxesMutations:
    @strawberry.mutation
    def create_itemtax(self, info: Info, data: ItemTaxesCreate) -> ItemTaxesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_itemtaxes(db, data)
            return obj_to_schema(ItemTaxesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_itemtax(self, info: Info, itemTaxID: int, data: ItemTaxesUpdate) -> Optional[ItemTaxesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = update_itemtaxes(db, itemTaxID, data)
            return obj_to_schema(ItemTaxesInDB, obj) if obj else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_itemtax(self, info: Info, itemTaxID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = delete_itemtaxes(db, itemTaxID)
            return obj is not None
        finally:
            db_gen.close()
