# app/graphql/mutations/bankaccounts_mutation.py - VERSIÓN COMPLETA
# Resumen: Mutations GraphQL para BankAccounts (crear, actualizar, eliminar)

import strawberry
from typing import Optional
from app.db import get_db
from app.graphql.schemas.bankaccounts import BankAccountsInDB, BankAccountsCreate, BankAccountsUpdate
from app.graphql.crud.bankaccounts import (
    create_bankaccounts,
    update_bankaccounts,
    delete_bankaccounts,
)
from app.utils import obj_to_schema


@strawberry.type
class BankAccountsMutation:
    """Mutations GraphQL para BankAccounts"""

    @strawberry.mutation
    def create_bankaccount(self, info, data: BankAccountsCreate) -> BankAccountsInDB:
        """Crear una nueva cuenta bancaria"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            result = create_bankaccounts(db, data)
            new_bankaccount = create_bankaccounts(db, data)
            return obj_to_schema(BankAccountsInDB, new_bankaccount)
        finally:
            db_gen.close()

    @strawberry.mutation
    def updateBankAccount(self, info, bankaccount_id: int, data: BankAccountsUpdate) -> Optional[BankAccountsInDB]:
        """Actualizar una cuenta bancaria existente"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_bankaccount = update_bankaccounts(db, bankaccount_id, data)
            if not updated_bankaccount:
                return None
            return obj_to_schema(BankAccountsInDB, updated_bankaccount)
        finally:
            db_gen.close()

    @strawberry.mutation
    def deleteBankAccount(self, info, bankaccount_id: int) -> Optional[BankAccountsInDB]:
        """Eliminar una cuenta bancaria existente"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted_bankaccount = delete_bankaccounts(db, bankaccount_id)
            if not deleted_bankaccount:
                return None
            return obj_to_schema(BankAccountsInDB, deleted_bankaccount)
        finally:
            db_gen.close()
