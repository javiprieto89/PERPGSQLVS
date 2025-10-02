import pytest
from sqlalchemy import text
from app.graphql.crud.pricelistitems import (
    create_pricelistitem,
    get_pricelistitems,
    update_pricelistitem,
    delete_pricelistitem,
)
from app.graphql.schemas.pricelistitems import PriceListItemsCreate, PriceListItemsUpdate


@pytest.mark.usefixtures("tenant_ids")
def test_create_get_update_delete_pricelistitems(db_session, tenant_ids):
    from datetime import datetime
    company_id, branch_id = tenant_ids

    # Crear PriceList multi-tenant (usando columnas reales)
    pl_res = db_session.execute(text(
        "INSERT INTO PriceLists (CompanyID, PriceListName, PriceListDescription, IsActive, CreatedDate) OUTPUT INSERTED.PriceListID VALUES (:cid, 'Lista Test', 'desc', 1, '2025-08-16')"
    ), {"cid": company_id})
    pricelist_id = pl_res.scalar()

    # Asegurar dependencias mínimas para Item (Brand, Category, Subcategory, Supplier, Warehouse)
    # Reusar IDs si existen, si no insertar.
    def scalar_or_insert(select_sql, insert_sql, params=None):
        val = db_session.execute(text(select_sql), params or {}).scalar()
        if not val:
            val = db_session.execute(text(insert_sql), params or {}).scalar()
        return val

    brand_id = scalar_or_insert(
        f"SELECT TOP 1 BrandID FROM Brands WHERE CompanyID={company_id}",
        f"INSERT INTO Brands (CompanyID, BrandName, IsActive) OUTPUT INSERTED.BrandID VALUES ({company_id}, 'MarcaX', 1)"
    )
    cat_id = scalar_or_insert(
        f"SELECT TOP 1 ItemCategoryID FROM ItemCategories WHERE CompanyID={company_id}",
        f"INSERT INTO ItemCategories (CompanyID, ItemCategoryName, IsActive) OUTPUT INSERTED.ItemCategoryID VALUES ({company_id}, 'CatX', 1)"
    )
    subcat_id = scalar_or_insert(
        f"SELECT TOP 1 ItemSubcategoryID FROM ItemSubcategories WHERE CompanyID={company_id}",
        f"INSERT INTO ItemSubcategories (CompanyID, ItemSubcategoryName, ItemCategoryID, IsActive) OUTPUT INSERTED.ItemSubcategoryID VALUES ({company_id}, 'SubCatX', {cat_id}, 1)"
    )
    supplier_id = scalar_or_insert(
        f"SELECT TOP 1 SupplierID FROM Suppliers WHERE CompanyID={company_id}",
        f"INSERT INTO Suppliers (CompanyID, FirstName, IsActive) OUTPUT INSERTED.SupplierID VALUES ({company_id}, 'ProvX', 1)"
    )
    warehouse_id = scalar_or_insert(
        f"SELECT TOP 1 WarehouseID FROM Warehouses WHERE CompanyID={company_id}",
        f"INSERT INTO Warehouses (CompanyID, WarehouseName, Address) OUTPUT INSERTED.WarehouseID VALUES ({company_id}, 'DepoX', 'Addr')"
    )

    item_res = db_session.execute(text(
        "INSERT INTO Items (CompanyID, BranchID, BrandID, ItemCode, ItemDescription, ItemCategoryID, ItemSubcategoryID, SupplierID, ControlStock, ReplenishmentStock, IsOffer, OEM, LastModified, WarehouseID, IsActive) OUTPUT INSERTED.ItemID VALUES (:cid, :bid, :brandid, 'CODEX', 'DESCX', :catid, :subcatid, :supid, 0, 0, 0, NULL, '2025-08-16', :whid, 1)"
    ), {"cid": company_id, "bid": branch_id, "brandid": brand_id, "catid": cat_id, "subcatid": subcat_id, "supid": supplier_id, "whid": warehouse_id})
    item_id = item_res.scalar()
    db_session.commit()

    data = PriceListItemsCreate(
        PriceListID=pricelist_id,
        ItemID=item_id,
        Price=100.0,
        EffectiveDate=datetime(2025, 8, 16, 0, 0, 0),
    )
    obj = create_pricelistitem(db_session, data)
    assert obj and obj.PriceListID == pricelist_id and obj.ItemID == item_id and float(
        obj.Price) == 100.0

    all_objs = get_pricelistitems(db_session)
    assert any(o.PriceListID == pricelist_id and o.ItemID ==
               item_id for o in all_objs)

    update = PriceListItemsUpdate(Price=200.0)
    updated = update_pricelistitem(db_session, pricelist_id, item_id, update)
    assert updated and float(updated.Price) == 200.0

    deleted = delete_pricelistitem(db_session, pricelist_id, item_id)
    assert deleted and deleted.PriceListID == pricelist_id and deleted.ItemID == item_id
    assert all(not (o.PriceListID == pricelist_id and o.ItemID == item_id)
               for o in get_pricelistitems(db_session))
