# app/graphql/mutations/bankreconciliations.py - VERSIÓN COMPLETA
# Resumen: Mutations GraphQL para conciliaciones bancarias (BankReconciliations), usando object_to_schema.

import strawberry
from strawberry.types import Info
from typing import Optional
from app.db import get_db
from app.graphql.schemas.bankreconciliation import (
    BankReconciliationInput,
    BankReconciliationInDB
)
from app.graphql.crud.bankreconciliations import (
    create_bankreconciliation,
    update_bankreconciliation,
    delete_bankreconciliation
)
from app.utils import obj_to_schema


@strawberry.type
class BankReconciliationsMutation:
    @strawberry.mutation
    def create_bankreconciliation(self, info: Info, data: BankReconciliationInput) -> BankReconciliationInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_item = create_bankreconciliation(db, data)
            return obj_to_schema(BankReconciliationInDB, new_item)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_bankreconciliation(self, info: Info, id: int, data: BankReconciliationInput) -> Optional[BankReconciliationInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_item = update_bankreconciliation(db, id, data)
            return obj_to_schema(BankReconciliationInDB, updated_item)
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_bankreconciliation(self, info: Info, id: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            return delete_bankreconciliation(db, id)
        finally:
            db_gen.close()
