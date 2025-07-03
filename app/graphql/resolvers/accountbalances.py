import strawberry
from typing import List, Optional
from app.graphql.schemas.accountbalances import AccountBalancesInDB
from app.graphql.crud.accountbalances import get_accountbalances, get_accountbalances_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info

@strawberry.type
class AccountbalancesQuery:
    @strawberry.field
    def all_accountbalances(self, info: Info) -> List[AccountBalancesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_accountbalances(db)
            return list_to_schema(AccountBalancesInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def accountbalances_by_id(
        self, info: Info, id: int
    ) -> Optional[AccountBalancesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_accountbalances_by_id(db, id)
            return obj_to_schema(AccountBalancesInDB, item) if item else None
        finally:
            db_gen.close()

accountbalancesQuery = AccountbalancesQuery()
