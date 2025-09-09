# app/graphql/mutations/servicetype.py
import strawberry
from typing import Optional
from app.graphql.schemas.servicetype import (
    ServiceTypeCreate,
    ServiceTypeUpdate,
    ServiceTypeInDB,
)
from app.graphql.crud.servicetype import (
    create,
    update,
    delete,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info
from app.graphql.schemas.delete_response import DeleteResponse


@strawberry.type
class ServiceTypeMutations:
    @strawberry.mutation
    def create_servicetype(
        self, info: Info, data: ServiceTypeCreate
    ) -> ServiceTypeInDB:
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create(db, data)
            return obj_to_schema(ServiceTypeInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_servicetype(
        self, info: Info, serviceTypeID: int, data: ServiceTypeUpdate
    ) -> Optional[ServiceTypeInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update(db, serviceTypeID, data)
            return obj_to_schema(ServiceTypeInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_servicetype(self, info: Info, serviceTypeID: int) -> DeleteResponse:
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete(db, serviceTypeID)
            success = deleted is not None
            message = "Service type deleted" if success else "Service type not found"
            return DeleteResponse(success=success, message=message)
        except ValueError as e:
            db.rollback()
            return DeleteResponse(success=False, message=str(e))
        finally:
            db_gen.close()

