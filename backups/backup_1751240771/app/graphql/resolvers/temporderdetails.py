# app/graphql/resolvers/temporderdetails.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.temporderdetails import TempOrderDetailsInDB
from app.models.temporderdetails import TempOrderDetails
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class TemporderdetailsQuery:
    @strawberry.field
    def all_temporderdetails(self, info: Info) -> List[TempOrderDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = db.query(TempOrderDetails).all()
            return [TempOrderDetailsInDB(**item.__dict__) for item in items]
        finally:
            db_gen.close()

    @strawberry.field
    def temporderdetails_by_id(self, info: Info, id: int) -> Optional[TempOrderDetailsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = db.query(TempOrderDetails).filter(
                TempOrderDetails.tempOrderItemID == id).first()
            return TempOrderDetailsInDB(**item.__dict__) if item else None
        finally:
            db_gen.close()


temporderdetailsQuery = TemporderdetailsQuery()
