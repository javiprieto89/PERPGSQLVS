# app/graphql/resolvers/temporderdetails.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.temporderdetails import TempOrderDetailsInDB
from app.models.temporderdetails import TempOrderDetails
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
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
            items = (
                db.query(TempOrderDetails)
                .filter(TempOrderDetails.OrderSessionID == sessionID)
                .all()
            )
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
            item = (
                db.query(TempOrderDetails)
                .filter(TempOrderDetails.OrderSessionID == sessionID)
                .first()
            )
            return obj_to_schema(TempOrderDetailsInDB, item) if item else None
        finally:
            db_gen.close()

    @strawberry.field
    def temporderdetails_by_order(
        self, info: Info, orderID: int
    ) -> List[TempOrderDetailsInDB]:
        """Obtener todos los items temporales asociados a una orden"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = (
                db.query(TempOrderDetails)
                .filter(TempOrderDetails.OrderID == orderID)
                .all()
            )
            return list_to_schema(TempOrderDetailsInDB, items)
        finally:
            db_gen.close()


temporderdetailsQuery = TemporderdetailsQuery()
