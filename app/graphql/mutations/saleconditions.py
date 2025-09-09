import strawberry
from typing import Optional
from app.graphql.schemas.saleconditions import (
    SaleConditionsCreate,
    SaleConditionsUpdate,
    SaleConditionsInDB,
)
from app.graphql.crud.saleconditions import (
    create_saleconditions,
    update_saleconditions,
    delete_saleconditions,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info
from app.graphql.schemas.delete_response import DeleteResponse


@strawberry.type
class SaleConditionsMutations:
    @strawberry.mutation
    def create_salecondition(
        self, info: Info, data: SaleConditionsCreate
    ) -> SaleConditionsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_saleconditions(db, data)
            return obj_to_schema(SaleConditionsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_salecondition(
        self, info: Info, saleConditionID: int, data: SaleConditionsUpdate
    ) -> Optional[SaleConditionsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_saleconditions(db, saleConditionID, data)
            return obj_to_schema(SaleConditionsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_salecondition(self, info: Info, saleConditionID: int) -> DeleteResponse:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_saleconditions(db, saleConditionID)
            success = deleted is not None
            message = (
                "Sale condition deleted" if success else "Sale condition not found"
            )
            return DeleteResponse(success=success, message=message)
        except ValueError as e:
            db.rollback()
            return DeleteResponse(success=False, message=str(e))
        finally:
            db_gen.close()

