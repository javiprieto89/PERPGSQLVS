# app/graphql/resolvers/doctypes.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.doctypes import DocTypesInDB
from app.graphql.crud.doctypes import get_doctypes, get_doctypes_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class DoctypesQuery:
    @strawberry.field
    def all_doctypes(self, info: Info) -> List[DocTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_doctypes(db)
            result = []
            for item in items:
                item_dict = item.__dict__
                # Crear dict solo con campos del schema DocTypesInDB con conversión de tipos
                filtered_dict = {
                    'DocTypeID': int(item_dict['DocTypeID']),
                    'Name': str(item_dict['Name']),
                    'IsActive': bool(item_dict['IsActive'])
                }
                result.append(DocTypesInDB(**filtered_dict))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def doctypes_by_id(self, info: Info, id: int) -> Optional[DocTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_doctypes_by_id(db, id)
            if item:
                item_dict = item.__dict__
                # Crear dict solo con campos del schema DocTypesInDB con conversión de tipos
                filtered_dict = {
                    'DocTypeID': int(item_dict['DocTypeID']),
                    'Name': str(item_dict['Name']),
                    'IsActive': bool(item_dict['IsActive'])
                }
                return DocTypesInDB(**filtered_dict)
            return None
        finally:
            db_gen.close()