# app/graphql/resolvers/sysorderstatus.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.sysorderstatus import SysOrderStatusInDB
from app.graphql.crud.sysorderstatus import (
    get_sysorderstatus,
    get_sysorderstatus_by_id,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class SysorderstatusQuery:
    @strawberry.field
    def all_sysorderstatus(self, info: Info) -> List[SysOrderStatusInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            statuses = get_sysorderstatus(db)
            return list_to_schema(SysOrderStatusInDB, statuses)
        finally:
            db_gen.close()

    @strawberry.field
    def sysorderstatus_by_id(self, info: Info, id: int) -> Optional[SysOrderStatusInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            status = get_sysorderstatus_by_id(db, id)
            return obj_to_schema(SysOrderStatusInDB, status) if status else None
        finally:
            db_gen.close()


sysorderstatusQuery = SysorderstatusQuery()
