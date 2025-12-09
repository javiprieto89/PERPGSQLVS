# app/graphql/mutations/banks_mutation.py - VERSIÓN COMPLETA
# Resumen: Mutations GraphQL para Banks (crear, actualizar, eliminar)

import strawberry
from typing import Optional
from app.db import get_db
from app.graphql.schemas.banks import BanksInDB, BanksCreate, BanksUpdate
from app.graphql.crud.banks import (
    create_banks,
    update_banks,
    delete_banks,
)
from app.utils import obj_to_schema, list_to_schema


@strawberry.type
class BanksMutation:
    """Mutations GraphQL para Banks"""

    @strawberry.mutation
    def create_bank(self, info, data: BanksCreate) -> BanksInDB:
        """Crear un nuevo banco"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            new_bank = create_banks(db, data)
            return obj_to_schema(BanksInDB, new_bank)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_bank(self, info, bank_id: int, data: BanksUpdate) -> Optional[BanksInDB]:
        """Actualizar un banco existente"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated_bank = update_banks(db, bank_id, data)
            return obj_to_schema(BanksInDB, updated_bank) if updated_bank else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def deleteBank(self, info, company_id: int, bank_id: int) -> Optional[BanksInDB]:
        """Eliminar un banco existente"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted_bank = delete_banks(db, bank_id)
            return obj_to_schema(BanksInDB, deleted_bank) if deleted_bank else None
        finally:
            db_gen.close()
