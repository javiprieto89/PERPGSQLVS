# app/graphql/resolvers/creditcards.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.creditcards import CreditCardsInDB
from app.graphql.crud.creditcards import get_creditcards, get_creditcard_by_id, get_creditcard_by_name
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class CreditcardsQuery:
    @strawberry.field
    def all_creditcards(self, info: Info) -> List[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            creditcards = get_creditcards(db)
            return [CreditCardsInDB(**cc.__dict__) for cc in creditcards]
        finally:
            db_gen.close()

    @strawberry.field
    def creditcard_by_id(self, info: Info, id: int) -> Optional[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            cc = get_creditcard_by_id(db, id)
            return CreditCardsInDB(**cc.__dict__) if cc else None
        finally:
            db_gen.close()

    @strawberry.field
    def creditcards_by_name(self, info: Info, name: str) -> List[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            creditcards = get_creditcard_by_name(db, name)
            return [CreditCardsInDB(**cc.__dict__) for cc in creditcards]
        finally:
            db_gen.close()


creditcardsQuery = CreditcardsQuery()
