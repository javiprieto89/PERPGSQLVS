import pytest
from sqlalchemy import text
from app.graphql.crud.itemtaxes import (
    create_itemtaxes,
    get_itemtaxes,
    update_itemtaxes,
    delete_itemtaxes,
)
from app.graphql.schemas.itemtaxes import ItemTaxesCreate, ItemTaxesUpdate


@pytest.mark.usefixtures("tenant_ids")
def test_create_get_update_delete_itemtaxes(db_session, tenant_ids):
    company_id, branch_id = tenant_ids

    # Asegurar Item existente similar a test_pricelistitems (simplificado: crear mínimos si faltan)
    def scalar_or_insert(select_sql, insert_sql):
        val = db_session.execute(text(select_sql)).scalar()
        if not val:
            val = db_session.execute(text(insert_sql)).scalar()
        return val

    brand_id = scalar_or_insert(
        f"SELECT TOP 1 BrandID FROM Brands WHERE CompanyID={company_id}",
        f"INSERT INTO Brands (CompanyID, BrandName, IsActive) OUTPUT INSERTED.BrandID VALUES ({company_id}, 'MarcaTX', 1)"
    )
    cat_id = scalar_or_insert(
        f"SELECT TOP 1 ItemCategoryID FROM ItemCategories WHERE CompanyID={company_id}",
        f"INSERT INTO ItemCategories (CompanyID, ItemCategoryName, IsActive) OUTPUT INSERTED.ItemCategoryID VALUES ({company_id}, 'CatTX', 1)"
    )
    subcat_id = scalar_or_insert(
        f"SELECT TOP 1 ItemSubcategoryID FROM ItemSubcategories WHERE CompanyID={company_id}",
        f"INSERT INTO ItemSubcategories (CompanyID, ItemSubcategoryName, ItemCategoryID, IsActive) OUTPUT INSERTED.ItemSubcategoryID VALUES ({company_id}, 'SubCatTX', {cat_id}, 1)"
    )
    supplier_id = scalar_or_insert(
        f"SELECT TOP 1 SupplierID FROM Suppliers WHERE CompanyID={company_id}",
        f"INSERT INTO Suppliers (CompanyID, FirstName, IsActive) OUTPUT INSERTED.SupplierID VALUES ({company_id}, 'ProvTX', 1)"
    )
    warehouse_id = scalar_or_insert(
        f"SELECT TOP 1 WarehouseID FROM Warehouses WHERE CompanyID={company_id}",
        f"INSERT INTO Warehouses (CompanyID, WarehouseName, Address) OUTPUT INSERTED.WarehouseID VALUES ({company_id}, 'DepoTX', 'Addr')"
    )
    item_id = scalar_or_insert(
        f"SELECT TOP 1 ItemID FROM Items WHERE CompanyID={company_id}",
        f"INSERT INTO Items (CompanyID, BranchID, BrandID, Code, Description, ItemCategoryID, ItemSubcategoryID, SupplierID, ControlStock, ReplenishmentStock, IsOffer, OEM, LastModified, WarehouseID, IsActive) OUTPUT INSERTED.ItemID VALUES ({company_id}, {branch_id}, {brand_id}, 'CODET', 'DESCT', {cat_id}, {subcat_id}, {supplier_id}, 0, 0, 0, NULL, GETDATE(), {warehouse_id}, 1)"
    )

    # Asegurar Tax (depende de Taxes table multi-tenant)
    tax_id = scalar_or_insert(
        f"SELECT TOP 1 TaxID FROM Taxes WHERE CompanyID={company_id} AND BranchID={branch_id}",
        f"INSERT INTO Taxes (CompanyID, BranchID, TaxName, TaxPercent, IsActive) OUTPUT INSERTED.TaxID VALUES ({company_id}, {branch_id}, 'IVA Test', 21.00, 1)"
    )
    db_session.commit()

    data = ItemTaxesCreate(CompanyID=company_id,
                           BranchID=branch_id, ItemID=item_id, TaxID=tax_id)
    obj = create_itemtaxes(db_session, data)
    assert obj and obj.ItemID == item_id and obj.TaxID == tax_id

    all_objs = get_itemtaxes(db_session)
    assert any(o.CompanyID == company_id and o.BranchID ==
               branch_id and o.ItemID == item_id and o.TaxID == tax_id for o in all_objs)

    update = ItemTaxesUpdate()  # no cambio
    updated = update_itemtaxes(
        db_session, company_id, branch_id, item_id, tax_id, update)
    assert updated and updated.ItemID == item_id

    deleted = delete_itemtaxes(
        db_session, company_id, branch_id, item_id, tax_id)
    assert deleted and deleted.ItemID == item_id and deleted.TaxID == tax_id
    assert all(not (o.CompanyID == company_id and o.BranchID == branch_id and o.ItemID ==
               item_id and o.TaxID == tax_id) for o in get_itemtaxes(db_session))
