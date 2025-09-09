# app/graphql/resolvers/transactions.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.transactions import TransactionsInDB
from app.graphql.crud.transactions import get_transactions, get_transactions_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class TransactionsQuery:
    @strawberry.field
    def all_transactions(self, info: Info) -> List[TransactionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            transactions = get_transactions(db)
            return list_to_schema(TransactionsInDB, transactions)
        finally:
            db_gen.close()

    @strawberry.field
    def transactions_by_id(self, info: Info, id: int) -> Optional[TransactionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            transaction = get_transactions_by_id(db, id)
            return obj_to_schema(TransactionsInDB, transaction) if transaction else None
        finally:
            db_gen.close()


transactionsQuery = TransactionsQuery()

