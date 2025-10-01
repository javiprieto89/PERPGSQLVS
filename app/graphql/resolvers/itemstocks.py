import strawberry
from typing import List, Optional
from strawberry.types import Info

from app.utils import list_to_schema
from app.graphql.schemas.itemstocks import ItemStocksInDB
from app.models.itemstock import Itemstock


@strawberry.type
class ItemstocksQuery:
    @strawberry.field
    def itemstocks(self, info: Info, companyID: int, warehouseID: Optional[int] = None, itemID: Optional[int] = None, branchID: Optional[int] = None) -> List[ItemStocksInDB]:
        from app.db import get_db

        db_gen = get_db()
        db = next(db_gen)
        try:
            q = db.query(Itemstock).filter(Itemstock.CompanyID == companyID)
            if warehouseID is not None:
                q = q.filter(Itemstock.WarehouseID == warehouseID)
            if itemID is not None:
                q = q.filter(Itemstock.ItemID == itemID)
            if branchID is not None:
                q = q.filter(Itemstock.BranchID == branchID)
            rows = q.all()
            return list_to_schema(ItemStocksInDB, rows)
        finally:
            db_gen.close()
