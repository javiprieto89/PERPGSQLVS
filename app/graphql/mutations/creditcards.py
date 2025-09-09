import strawberry
from typing import Optional
from app.graphql.schemas.creditcards import (
    CreditCardsCreate,
    CreditCardsUpdate,
    CreditCardsInDB,
)
from app.graphql.crud.creditcards import (
    create_creditcard,
    update_creditcard,
    delete_creditcard,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class CreditCardsMutations:
    @strawberry.mutation
    def create_creditcard(self, info: Info, data: CreditCardsCreate) -> CreditCardsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_creditcard(db, data)
            return obj_to_schema(CreditCardsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_creditcard(self, info: Info, id: int, data: CreditCardsUpdate) -> Optional[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_creditcard(db, id, data)
            return obj_to_schema(CreditCardsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_creditcard(self, info: Info, id: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_creditcard(db, id)
            return deleted is not None
        finally:
            db_gen.close()

