# app/graphql/resolvers/sysidentitydoctypes.py
import strawberry
from typing import List, Optional
from strawberry.types import Info

from app.graphql.schemas.sysidentitydoctypes import SysIdentityDocTypesInDB
from app.graphql.crud.sysidentitydoctypes import (
    get_sysidentitydoctypes,
    get_sysidentitydoctypes_by_id,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema


@strawberry.type
class SysIdentityDocTypesQuery:
    @strawberry.field
    def sys_identity_doc_types(
        self, info: Info, only_active: Optional[bool] = None
    ) -> List[SysIdentityDocTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = get_sysidentitydoctypes(db, only_active)
            return list_to_schema(SysIdentityDocTypesInDB, records)
        finally:
            db_gen.close()

    @strawberry.field
    def sys_identity_doc_type(
        self, info: Info, doc_type_id: int
    ) -> Optional[SysIdentityDocTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            record = get_sysidentitydoctypes_by_id(db, doc_type_id)
            return obj_to_schema(SysIdentityDocTypesInDB, record) if record else None
        finally:
            db_gen.close()


sysIdentityDocTypesQuery = SysIdentityDocTypesQuery()
