# app/graphql/resolvers/servicetype.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.servicetype import ServiceTypeInDB
from app.graphql.crud.servicetype import get_servicetypes, get_servicetypes_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class ServicetypeQuery:
    @strawberry.field
    def all_servicetypes(self, info: Info) -> List[ServiceTypeInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            servicetypes = get_servicetypes(db)
            return [ServiceTypeInDB(**servicetype.__dict__) for servicetype in servicetypes]
        finally:
            db_gen.close()

    @strawberry.field
    def servicetypes_by_id(self, info: Info, id: int) -> Optional[ServiceTypeInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            record = get_servicetypes_by_id(db, id)
            return ServiceTypeInDB(**record.__dict__) if record else None
        finally:
            db_gen.close()


servicetypeQuery = ServicetypeQuery()
