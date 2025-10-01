# app/graphql/mutations/pricelists.py
import strawberry
from typing import Optional
from app.graphql.schemas.pricelists import PriceListsCreate, PriceListsUpdate, PriceListsInDB
from app.graphql.crud.pricelists import create_pricelists, update_pricelists, delete_pricelists
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info

@strawberry.type
class PricelistsMutations:
    @strawberry.mutation
    def create_pricelist(self, info: Info, data: PriceListsCreate) -> PriceListsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_pricelists(db, data)
            return obj_to_schema(PriceListsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_pricelist(self, info: Info, companyID: int, pricelistID: int, data: PriceListsUpdate) -> Optional[PriceListsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_pricelists(db, companyID, pricelistID, data)
            return obj_to_schema(PriceListsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_pricelist(self, info: Info, companyID: int, pricelistID: int) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_pricelists(db, companyID, pricelistID)
            return deleted is not None
        finally:
            db_gen.close()

