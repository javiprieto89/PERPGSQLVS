# app/graphql/resolvers/sysfiscaldoctypes.py
import strawberry
from typing import List, Optional
from strawberry.types import Info

from app.graphql.schemas.sysfiscaldoctypes import SysFiscalDocTypesInDB
from app.graphql.crud.sysfiscaldoctypes import (
    get_sysfiscaldoctypes,
    get_sysfiscaldoctypes_by_id,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema


@strawberry.type
class SysFiscalDocTypesQuery:
    @strawberry.field
    def sys_fiscal_doc_types(self, info: Info) -> List[SysFiscalDocTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            records = get_sysfiscaldoctypes(db)
            return list_to_schema(SysFiscalDocTypesInDB, records)
        finally:
            db_gen.close()

    @strawberry.field
    def sys_fiscal_doc_type(
        self, info: Info, document_type_id: int
    ) -> Optional[SysFiscalDocTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            record = get_sysfiscaldoctypes_by_id(db, document_type_id)
            return obj_to_schema(SysFiscalDocTypesInDB, record) if record else None
        finally:
            db_gen.close()


sysFiscalDocTypesQuery = SysFiscalDocTypesQuery()