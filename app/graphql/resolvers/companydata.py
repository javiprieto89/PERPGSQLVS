# app/graphql/resolvers/companydata.py
import base64
import strawberry
from typing import Sequence, Optional
from app.graphql.schemas.companydata import CompanyDataInDB
from app.graphql.crud.companydata import get_companydata, get_companydata_by_id
from app.db import get_db
from strawberry.types import Info


def encode_logo(logo_bytes: Optional[bytes]) -> Optional[str]:
    if logo_bytes is None:
        return None
    return base64.b64encode(logo_bytes).decode('utf-8')


@strawberry.type
class CompanydataQuery:
    @strawberry.field
    def all_companydata(self, info: Info) -> Sequence[CompanyDataInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_companydata(db)
            result = []
            for item in items:
                data = item.__dict__.copy()
                data['logo'] = encode_logo(data.get('logo'))
                # Convierte startdate a string ISO si es necesario
                if data.get('startdate'):
                    data['startdate'] = data['startdate'].isoformat()
                result.append(CompanyDataInDB(**data))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def companydata_by_id(self, info: Info, id: int) -> Optional[CompanyDataInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            item = get_companydata_by_id(db, id)
            if not item:
                return None
            data = item.__dict__.copy()
            data['logo'] = encode_logo(data.get('logo'))
            if data.get('startdate'):
                data['startdate'] = data['startdate'].isoformat()
            return CompanyDataInDB(**data)
        finally:
            db_gen.close()


companydataQuery = CompanydataQuery()
