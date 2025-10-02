from datetime import date
import pytest
from app.graphql.crud.items import create_items, get_items, update_items, delete_items
from app.graphql.schemas.items import ItemsCreate, ItemsUpdate
from app.models.brands import Brands
from app.models.itemcategories import ItemCategories
from app.models.itemsubcategories import ItemSubcategories
from app.models.suppliers import Suppliers
from app.models.warehouses import Warehouses


@pytest.mark.usefixtures("tenant_ids")
def test_create_get_update_delete_items(db_session, tenant_ids):
    company_id, branch_id = tenant_ids

    # Crear dependencias mínimas requeridas
    brand = db_session.query(Brands).filter(
        Brands.CompanyID == company_id).first()
    if not brand:
        brand = Brands(CompanyID=company_id, BrandName="BrandTest")
        db_session.add(brand)
        db_session.commit()
        db_session.refresh(brand)
    cat = db_session.query(ItemCategories).filter(
        ItemCategories.CompanyID == company_id).first()
    if not cat:
        cat = ItemCategories(CompanyID=company_id, ItemCategoryName="CatTest")
        db_session.add(cat)
        db_session.commit()
        db_session.refresh(cat)
    sub = db_session.query(ItemSubcategories).filter(
        ItemSubcategories.CompanyID == company_id).first()
    if not sub:
        sub = ItemSubcategories(
            CompanyID=company_id, ItemCategoryID=cat.ItemCategoryID, ItemSubcategoryName="SubTest")
        db_session.add(sub)
        db_session.commit()
        db_session.refresh(sub)
    supplier = db_session.query(Suppliers).filter(
        Suppliers.CompanyID == company_id).first()
    if not supplier:
        supplier = Suppliers(CompanyID=company_id, SupplierName="SuppTest")
        db_session.add(supplier)
        db_session.commit()
        db_session.refresh(supplier)
    wh = db_session.query(Warehouses).filter(
        Warehouses.CompanyID == company_id).first()
    if not wh:
        wh = Warehouses(CompanyID=company_id,
                        BranchID=branch_id, WarehouseName="Main WH")
        db_session.add(wh)
        db_session.commit()
        db_session.refresh(wh)

    data = ItemsCreate(
        CompanyID=company_id,
        BranchID=branch_id,
        BrandID=brand.BrandID,
        ItemCode="ITEM001",
        ItemDescription="Item Test",
        ItemCategoryID=cat.ItemCategoryID,
        ItemSubcategoryID=sub.ItemSubcategoryID,
        SupplierID=supplier.SupplierID,
        ControlStock=True,
        ReplenishmentStock=0,
        IsOffer=False,
        OEM=None,
        LastModified=None,
        WarehouseID=wh.WarehouseID,
        IsActive=True,
    )
    obj = create_items(db_session, data)
    assert obj.ItemCode == "ITEM001"

    # Obtener
    all_objs = get_items(db_session)
    assert any(o.ItemID == obj.ItemID for o in all_objs)

    # Actualizar
    update = ItemsUpdate(ItemDescription="Item Modificado")
    updated = update_items(db_session, obj.CompanyID, obj.ItemID, update)
    assert updated is not None and updated.ItemDescription == "Item Modificado"

    # Eliminar
    deleted = delete_items(db_session, obj.CompanyID, obj.ItemID)
    assert deleted is not None and deleted.ItemID == obj.ItemID
    assert all(o.ItemID != obj.ItemID for o in get_items(db_session))
