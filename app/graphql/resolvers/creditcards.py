# app/graphql/resolvers/creditcards.py
from poplib import CR
import strawberry
from typing import List, Optional
from app.graphql.schemas.creditcards import CreditCardsInDB
# from app.graphql.schemas.creditcardgroups import CreditCardGroupsInDB
# from app.models.creditcardgroups import CreditCardGroups
# from app.models.creditcards import CreditCards
from app.graphql.crud.creditcards import get_creditcards, get_creditcard_by_id, get_creditcard_by_name
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class CreditcardsQuery:
    @strawberry.field
    def all_creditcards(self, info: Info) -> List[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_creditcards(db)
            return list_to_schema(CreditCardsInDB, items) if items else []
        finally:
            db_gen.close()

    @strawberry.field
    def creditcard_by_id(self, info: Info, id: int) -> Optional[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_creditcard_by_id(db, id)
            return obj_to_schema(CreditCardsInDB, item) if item else None
            return None
        finally:
            db_gen.close()

    @strawberry.field
    def creditcards_by_name(self, info: Info, name: str) -> List[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_creditcard_by_name(db, name)
            return list_to_schema(CreditCardsInDB, items) if items else []
        finally:
            db_gen.close()


creditcardsQuery = CreditcardsQuery()
