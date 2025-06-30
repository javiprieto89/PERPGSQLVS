# app/graphql/resolvers/doctypes.py

import strawberry
from typing import List, Optional
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.doctypes import DocTypes
from app.graphql.schemas.doctypes import DocTypesInDB
from strawberry.types import Info


@strawberry.type
class DoctypesQuery:
    @strawberry.field
    def all_doctypes(self, info: Info) -> List[DocTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = db.query(DocTypes).all()
            return [DocTypesInDB(**i.__dict__) for i in items]
        finally:
            db_gen.close()

    @strawberry.field
    def doctypes_by_id(self, info: Info, id: int) -> Optional[DocTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = db.query(DocTypes).filter(DocTypes.docTypeID == id).first()
            return DocTypesInDB(**item.__dict__) if item else None
        finally:
            db_gen.close()
