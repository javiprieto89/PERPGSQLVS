# app/graphql/resolvers/suppliers.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.suppliers import SuppliersInDB
from app.graphql.crud.suppliers import get_suppliers, get_suppliers_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class SuppliersQuery:
    @strawberry.field
    def all_suppliers(self, info: Info) -> List[SuppliersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            suppliers = get_suppliers(db)
            return [SuppliersInDB(**supplier.__dict__) for supplier in suppliers]
        finally:
            db_gen.close()

    @strawberry.field
    def suppliers_by_id(self, info: Info, id: int) -> Optional[SuppliersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            supplier = get_suppliers_by_id(db, id)
            return SuppliersInDB(**supplier.__dict__) if supplier else None
        finally:
            db_gen.close()


suppliersQuery = SuppliersQuery()