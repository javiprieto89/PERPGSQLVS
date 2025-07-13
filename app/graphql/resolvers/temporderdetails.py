# app/graphql/resolvers/temporderdetails.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.temporderdetails import TempOrderDetailsInDB
from app.models.temporderdetails import TempOrderDetails
from app.models.items import Items
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from app.graphql.crud.temporderdetails import (
    get_temporderdetails_by_session,
    get_temporderdetail_by_session,
)
from strawberry.types import Info


@strawberry.type
class TemporderdetailsQuery:
    @strawberry.field
    def all_temporderdetails(self, info: Info) -> List[TempOrderDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = db.query(TempOrderDetails).all()
            return list_to_schema(TempOrderDetailsInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def temporderdetails_by_session(
        self, info: Info, sessionID: str
    ) -> List[TempOrderDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_temporderdetails_by_session(db, sessionID)
            return list_to_schema(TempOrderDetailsInDB, items)
        finally:
            db_gen.close()

    @strawberry.field
    def temporderdetail_by_session(
        self, info: Info, sessionID: str
    ) -> Optional[TempOrderDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_temporderdetails_by_session(db, sessionID)
            first = items[0] if items else None
            return obj_to_schema(TempOrderDetailsInDB, first) if first else None
        finally:
            db_gen.close()


temporderdetailsQuery = TemporderdetailsQuery()
