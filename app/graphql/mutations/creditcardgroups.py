import strawberry
from typing import Optional
from app.graphql.schemas.creditcardgroups import (
    CreditCardGroupsCreate,
    CreditCardGroupsUpdate,
    CreditCardGroupsInDB,
)
from app.graphql.crud.creditcardgroups import (
    create_creditcardgroups,
    update_creditcardgroups,
    delete_creditcardgroups,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class CreditCardGroupsMutations:
    @strawberry.mutation
    def create_creditcardgroup(self, info: Info, data: CreditCardGroupsCreate) -> CreditCardGroupsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_creditcardgroups(db, data)
            return obj_to_schema(CreditCardGroupsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_creditcardgroup(self, info: Info, id: int, data: CreditCardGroupsUpdate) -> Optional[CreditCardGroupsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_creditcardgroups(db, id, data)
            return obj_to_schema(CreditCardGroupsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_creditcardgroup(self, info: Info, id: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_creditcardgroups(db, id)
            return deleted is not None
        finally:
            db_gen.close()
