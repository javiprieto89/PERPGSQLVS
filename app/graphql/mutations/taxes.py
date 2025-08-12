# app/graphql/mutations/taxes.py
import strawberry
from typing import Optional
from app.graphql.schemas.taxes import TaxesCreate, TaxesUpdate, TaxesInDB
from app.graphql.crud.taxes import create_taxes, update_taxes, delete_taxes
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class TaxesMutations:
    @strawberry.mutation
    def create_tax(self, info: Info, data: TaxesCreate) -> TaxesInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_taxes(db, data)
            return obj_to_schema(TaxesInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_tax(self, info: Info, taxID: int, data: TaxesUpdate) -> Optional[TaxesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = update_taxes(db, taxID, data)
            return obj_to_schema(TaxesInDB, obj) if obj else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_tax(self, info: Info, taxID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = delete_taxes(db, taxID)
            return obj is not None
        finally:
            db_gen.close()
