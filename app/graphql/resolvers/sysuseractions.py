# app/graphql/resolvers/sysuseractions.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.sysuseractions import SysUserActionsInDB
from app.graphql.crud.sysuseractions import (
    get_sysuseractions,
    get_sysuseractions_by_id,
    get_sysuseractions_by_name,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class SysuseractionsQuery:
    @strawberry.field
    def all_sysuseractions(self, info: Info) -> List[SysUserActionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            useractions = get_sysuseractions(db)
            return list_to_schema(SysUserActionsInDB, useractions)
        finally:
            db_gen.close()

    @strawberry.field
    def sysuseractions_by_id(self, info: Info, id: int) -> Optional[SysUserActionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            useraction = get_sysuseractions_by_id(db, id)
            return obj_to_schema(SysUserActionsInDB, useraction) if useraction else None
        finally:
            db_gen.close()

    @strawberry.field
    def sysuseractions_by_name(self, info: Info, name: str) -> List[SysUserActionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            useractions = get_sysuseractions_by_name(db, name)
            return list_to_schema(SysUserActionsInDB, useractions)
        finally:
            db_gen.close()


sysuseractionsQuery = SysuseractionsQuery()

