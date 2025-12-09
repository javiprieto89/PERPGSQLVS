# app/graphql/resolvers/bankreconciliations.py - VERSIÓN COMPLETA
# Resumen: Resolvers GraphQL para conciliaciones bancarias (BankReconciliations) siguiendo el estándar PERPGSQLVS.

import strawberry
from typing import List, Optional
from strawberry.types import Info
from app.db import get_db
from app.graphql.crud.bankreconciliations import (
    get_bankreconciliations,
    get_bankreconciliation_by_id,
    get_bankreconciliations_by_account,
    create_bankreconciliation,
    update_bankreconciliation,
    delete_bankreconciliation
)
from app.graphql.schemas.bankreconciliation import (
    BankReconciliationInput,
    BankReconciliationInDB
)
from app.utils import list_to_schema, obj_to_schema


@strawberry.type
class BankReconciliationsQuery:
    @strawberry.field
    def all_bankreconciliations(self, info: Info) -> List[BankReconciliationInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_bankreconciliations(db)
            return list_to_schema(BankReconciliationInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def get_bankreconciliation_by_id(self, info: Info, id: int) -> Optional[BankReconciliationInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_bankreconciliation_by_id(db, id)
            return obj_to_schema(BankReconciliationInDB, item)
        finally:
            db_gen.close()

    @strawberry.field
    def bankreconciliations_by_account(
        self, info: Info, bankaccount_id: int
    ) -> List[BankReconciliationInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_bankreconciliations_by_account(db, bankaccount_id)
            return list_to_schema(BankReconciliationInDB, items)
        finally:
            db_gen.close()


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


banksreconciliationQuery = BankReconciliationsQuery()
