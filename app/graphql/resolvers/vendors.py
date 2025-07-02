# app/graphql/resolvers/vendors.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.vendors import VendorsInDB
from app.models.vendors import Vendors
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class VendorsQuery:
    @strawberry.field
    def all_vendors(self, info: Info) -> List[VendorsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            vendors = db.query(Vendors).all()
            return [VendorsInDB(**vendor.__dict__) for vendor in vendors]
        finally:
            db_gen.close()

    @strawberry.field
    def vendors_by_id(self, info: Info, id: int) -> Optional[VendorsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            vendor = db.query(Vendors).filter(Vendors.VendorID == id).first()
            return VendorsInDB(**vendor.__dict__) if vendor else None
        finally:
            db_gen.close()

    @strawberry.field
    def active_vendors(self, info: Info) -> List[VendorsInDB]:
        """Obtener solo vendedores activos"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            vendors = db.query(Vendors).filter(Vendors.IsActive == True).all()
            return [VendorsInDB(**vendor.__dict__) for vendor in vendors]
        finally:
            db_gen.close()


vendorsQuery = VendorsQuery()