# app/graphql/resolvers/creditcardgroups.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.creditcardgroups import CreditCardGroupsInDB
from app.graphql.crud.creditcardgroups import get_creditcardgroups, get_creditcardgroup_by_id, get_creditcardgroup_by_name
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class CreditcardgroupsQuery:
    @strawberry.field
    def all_creditcardgroups(self, info: Info) -> List[CreditCardGroupsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            creditcardgroups = get_creditcardgroups(db)
            return list_to_schema(CreditCardGroupsInDB, creditcardgroups)
        finally:
            db_gen.close()

    @strawberry.field
    def creditcardgroup_by_id(self, info: Info, id: int) -> Optional[CreditCardGroupsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            ccg = get_creditcardgroup_by_id(db, id)
            return obj_to_schema(CreditCardGroupsInDB, ccg) if ccg else None
        finally:
            db_gen.close()

    @strawberry.field
    def creditcardgroups_by_name(self, info: Info, name: str) -> List[CreditCardGroupsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            creditcardgroups = get_creditcardgroup_by_name(db, name)
            return list_to_schema(CreditCardGroupsInDB, creditcardgroups)
        finally:
            db_gen.close()


creditcardgroupsQuery = CreditcardgroupsQuery()
