# app/graphql/resolvers/transactions.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.transactions import TransactionsInDB
from app.graphql.crud.transactions import get_transactions, get_transactions_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class TransactionsQuery:
    @strawberry.field
    def all_transactions(self, info: Info) -> List[TransactionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            transactions = get_transactions(db)
            return [TransactionsInDB(**transaction.__dict__) for transaction in transactions]
        finally:
            db_gen.close()

    @strawberry.field
    def transactions_by_id(self, info: Info, id: int) -> Optional[TransactionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            transaction = get_transactions_by_id(db, id)
            return TransactionsInDB(**transaction.__dict__) if transaction else None
        finally:
            db_gen.close()


transactionsQuery = TransactionsQuery()
