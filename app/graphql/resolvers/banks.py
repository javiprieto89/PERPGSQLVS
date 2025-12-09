# app/graphql/resolvers/banks_resolver.py - VERSIÓN COMPLETA
# Resumen: Resolvers GraphQL para Banks (queries principales)

import strawberry
from typing import List, Optional
from app.db import get_db
from app.graphql.schemas.banks import BanksInDB
from app.graphql.crud.banks import (
    get_banks,
    get_banks_by_company,
    get_bank_by_id
)
from app.utils import list_to_schema, obj_to_schema


@strawberry.type
class BanksQuery:

    @strawberry.field
    def all_banks(self, info, company_id: int) -> List[BanksInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            banks = get_banks(db)
            return list_to_schema(BanksInDB, banks)
        finally:
            db_gen.close()

    @strawberry.field
    def bank_by_id(self, info, bank_id: int) -> Optional[BanksInDB]:
        """Obtiene un banco específico por ID"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            bank = get_bank_by_id(db, bank_id)
            return obj_to_schema(BanksInDB, bank) if bank else None
        finally:
            db_gen.close()

    @strawberry.field
    def banks_by_company(self, info, company_id: int) -> List[BanksInDB]:
        """Obtiene todos los bancos de una compañía"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            banks = get_banks_by_company(db, company_id)
            return list_to_schema(BanksInDB, banks)
        finally:
            db_gen.close()


banksQuery = BanksQuery()
