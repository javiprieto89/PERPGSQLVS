# app/graphql/resolvers/suppliers.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.suppliers import SuppliersInDB
from app.graphql.crud.suppliers import get_suppliers, get_suppliers_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class SuppliersQuery:
    @strawberry.field
    def all_suppliers(self, info: Info) -> List[SuppliersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            suppliers = get_suppliers(db)
            return list_to_schema(SuppliersInDB, suppliers)
        finally:
            db_gen.close()

    @strawberry.field
    def suppliers_by_id(self, info: Info, id: int) -> Optional[SuppliersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            supplier = get_suppliers_by_id(db, id)
            return obj_to_schema(SuppliersInDB, supplier) if supplier else None
        finally:
            db_gen.close()


suppliersQuery = SuppliersQuery()