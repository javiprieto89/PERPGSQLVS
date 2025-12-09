# app/graphql/resolvers/bankaccounts_resolver.py - VERSIÓN COMPLETA
# Resumen: Resolvers GraphQL para BankAccounts (consultas principales)

import strawberry
from typing import List, Optional
from app.db import get_db
from app.graphql.schemas.bankaccounts import BankAccountsInDB
from app.graphql.crud.bankaccounts import (
    get_bankaccounts,
    get_bankaccounts_by_company,
    get_bankaccounts_by_id,
    get_bankaccounts_by_alias
)
from app.utils import list_to_schema, obj_to_schema


@strawberry.type
class BankAccountsQuery:
    """Resolvers GraphQL para consultas de cuentas bancarias"""

    @strawberry.field
    def all_bankaccounts(self, info, company_id: int) -> List[BankAccountsInDB]:
        """Obtiene todas las cuentas bancarias de una compañía"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            bankaccounts = get_bankaccounts(db)
            return list_to_schema(BankAccountsInDB, bankaccounts)
        finally:
            db_gen.close()

    @strawberry.field
    def bankaccounts_by_id(self, info, company_id: int, bankaccount_id: int) -> Optional[BankAccountsInDB]:
        """Obtiene una cuenta bancaria específica por ID"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            bankaccount = get_bankaccounts_by_id(db, bankaccount_id)
            return obj_to_schema(BankAccountsInDB, bankaccount) if bankaccount else None
        finally:
            db_gen.close()

    @strawberry.field
    def bankaccount_by_name(self, info, bankaccount_name: str) -> Optional[BankAccountsInDB]:
        """Obtiene una cuenta bancaria específica por nombre"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            bankaccount = get_bankaccounts_by_alias(db, bankaccount_name)
            return obj_to_schema(BankAccountsInDB, bankaccount) if bankaccount else None
        finally:
            db_gen.close()

    @strawberry.field
    def bankaccounts_by_company(self, info, company_id: int) -> List[BankAccountsInDB]:
        """Obtiene todas las cuentas bancarias de una compañía"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            bankaccounts = get_bankaccounts_by_company(db, company_id)
            return list_to_schema(BankAccountsInDB, bankaccounts)
        finally:
            db_gen.close()


bankaccountsQuery = BankAccountsQuery()
