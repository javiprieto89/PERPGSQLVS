# app/graphql/resolvers/sysdoctypes.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.sysdoctypes import SysDocTypesInDB
from app.graphql.crud.sysdoctypes import get_sysdoctypes, get_sysdoctypes_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info

@strawberry.type
class SysdoctypesQuery:
    @strawberry.field
    def all_sysdoctypes(self, info: Info) -> List[SysDocTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_sysdoctypes(db)
            result = []
            for item in items:
                item_dict = item.__dict__
                filtered_dict = {
                    'DocTypeID': int(item_dict['DocTypeID']),
                    'Name': str(item_dict['Name']),
                    'IsActive': bool(item_dict['IsActive'])
                }
                result.append(SysDocTypesInDB(**filtered_dict))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def sysdoctypes_by_id(self, info: Info, id: int) -> Optional[SysDocTypesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_sysdoctypes_by_id(db, id)
            if item:
                item_dict = item.__dict__
                filtered_dict = {
                    'DocTypeID': int(item_dict['DocTypeID']),
                    'Name': str(item_dict['Name']),
                    'IsActive': bool(item_dict['IsActive'])
                }
                return SysDocTypesInDB(**filtered_dict)
            return None
        finally:
            db_gen.close()

sysdoctypesQuery = SysdoctypesQuery()
