# app/graphql/mutations/temporderdetails.py
import strawberry
from typing import Optional
from app.graphql.schemas.temporderdetails import (
    TempOrderDetailsCreate,
    TempOrderDetailsUpdate,
    TempOrderDetailsInDB,
)
from app.graphql.crud.temporderdetails import (
    create_temporderdetails,
    update_temporderdetails,
    delete_temporderdetails,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class TempOrderDetailsMutations:
    @strawberry.mutation
    def create_temporderdetail(
        self, info: Info, data: TempOrderDetailsCreate
    ) -> TempOrderDetailsInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_temporderdetails(db, data)
            return obj_to_schema(TempOrderDetailsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_temporderdetail(
        self, info: Info, sessionID: str, data: TempOrderDetailsUpdate
    ) -> Optional[TempOrderDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_temporderdetails(db, sessionID, data)
            return (
                obj_to_schema(TempOrderDetailsInDB, updated) if updated else None
            )
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_temporderdetail(self, info: Info, sessionID: str) -> bool:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_temporderdetails(db, sessionID)
            return deleted is not None
        finally:
            db_gen.close()
