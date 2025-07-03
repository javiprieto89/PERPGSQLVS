# app/graphql/resolvers/branches.py
import base64
import strawberry
from typing import List, Optional
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.crud.branches import get_branches, get_branches_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


def encode_logo(logo_bytes: Optional[bytes]) -> Optional[str]:
    if logo_bytes is None:
        return None
    return base64.b64encode(logo_bytes).decode("utf-8")


@strawberry.type
class BranchesQuery:
    @strawberry.field
    def all_branches(self, info: Info) -> List[BranchesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_branches(db)
            result = []
            for item in items:
                data = item.__dict__.copy()
                data["logo"] = encode_logo(data.get("logo"))
                result.append(BranchesInDB(**data))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def branches_by_id(self, info: Info, id: int) -> Optional[BranchesInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_branches_by_id(db, id)
            if not item:
                return None
            data = item.__dict__.copy()
            data["logo"] = encode_logo(data.get("logo"))
            return BranchesInDB(**data)
        finally:
            db_gen.close()


branchesQuery = BranchesQuery()
