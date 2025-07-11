# app/graphql/resolvers/companydata.py
import base64
import strawberry
from typing import Sequence, Optional, List
from app.graphql.schemas.companydata import CompanyDataInDB
from app.graphql.crud.companydata import get_companydata, get_companydata_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


def encode_logo(logo_bytes: Optional[bytes]) -> Optional[str]:
    if logo_bytes is None:
        return None
    return base64.b64encode(logo_bytes).decode("utf-8")


@strawberry.type
class CompanydataQuery:
    @strawberry.field
    def all_companydata(self, info: Info) -> List[CompanyDataInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_companydata(db)
            result = []
            for item in items:
                raw = item.__dict__.copy()
                raw.pop("_sa_instance_state", None)

                start_date = raw.get("StartDate")
                mapped = {
                    "CompanyID": raw.get("CompanyID"),
                    "Name": raw.get("Name"),
                    "Address": raw.get("Address"),
                    "CUIT": raw.get("CUIT"),
                    "Grossincome": raw.get("GrossIncome"),
                    "Startdate": start_date.isoformat() if start_date else None,
                    "Logo": encode_logo(raw.get("Logo")),
                }

                result.append(CompanyDataInDB(**mapped))
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

            raw = item.__dict__.copy()
            raw.pop("_sa_instance_state", None)

            start_date = raw.get("StartDate")
            mapped = {
                "CompanyID": raw.get("CompanyID"),
                "Name": raw.get("Name"),
                "Address": raw.get("Address"),
                "CUIT": raw.get("CUIT"),
                "Grossincome": raw.get("GrossIncome"),
                "Startdate": start_date.isoformat() if start_date else None,
                "Logo": encode_logo(raw.get("Logo")),
            }

            return CompanyDataInDB(**mapped)
        finally:
            db_gen.close()


companydataQuery = CompanydataQuery()
