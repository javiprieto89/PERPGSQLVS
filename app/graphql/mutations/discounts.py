# app/graphql/mutations/discounts.py
import strawberry
from typing import Optional
from app.graphql.schemas.discounts import (
    DiscountsCreate,
    DiscountsUpdate,
    DiscountsInDB,
)
from app.graphql.crud.discounts import (
    create_discounts,
    update_discounts,
    delete_discounts,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class DiscountsMutations:
    @strawberry.mutation
    def create_discount(self, info: Info, data: DiscountsCreate) -> DiscountsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_discounts(db, data)
            return obj_to_schema(DiscountsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_discount(self, info: Info, id: int, data: DiscountsUpdate) -> Optional[DiscountsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_discounts(db, id, data)
            return obj_to_schema(DiscountsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_discount(self, info: Info, id: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_discounts(db, id)
            return deleted is not None
        finally:
            db_gen.close()
