# app/graphql/resolvers/syscurrencies_resolver.py - VERSIÓN COMPLETA
# Resumen: Resolvers GraphQL de solo lectura para SysCurrencies

import strawberry
from typing import List, Optional
from app.db import get_db
from app.graphql.schemas.syscurrencies import SysCurrenciesInDB
from app.graphql.crud.syscurrencies import (
    get_syscurrencies,
    get_syscurrency_by_id
)
from app.utils import list_to_schema, obj_to_schema


@strawberry.type
class SysCurrenciesQuery:
    """Resolvers GraphQL para consultas de monedas"""

    @strawberry.field
    def all_sysCurrencies(self, info) -> List[SysCurrenciesInDB]:
        """Obtiene todas las monedas"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            currencies = get_syscurrencies(db)            
            return list_to_schema(SysCurrenciesInDB, currencies)
        finally:
            db_gen.close()

    @strawberry.field
    def get_syscurrency_by_id(self, info, currency_id: int) -> Optional[SysCurrenciesInDB]:
        """Obtiene una moneda por su ID"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            currency = get_syscurrency_by_id(db, currency_id)            
            return obj_to_schema(SysCurrenciesInDB, currency) if currency else None
        finally:
            db_gen.close()
