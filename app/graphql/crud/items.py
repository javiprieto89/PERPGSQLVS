# app/graphql/crud/items.py
from sqlalchemy.orm import Session
from app.models.pricelistitems import PriceListItems
from app.models.orderdetails import OrderDetails
from app.models.items import Items
from app.models.brands import Brands
from app.models.itemcategories import ItemCategories
from app.models.itemsubcategories import ItemSubcategories
from app.graphql.schemas.items import ItemsCreate, ItemsUpdate
from dataclasses import asdict

def get_items(db: Session):
    """Obtener items junto con nombres relacionados"""
    results = db.query(
        Items,
        Brands.Name.label("BrandName"),
        ItemCategories.CategoryName.label("CategoryName"),
        ItemSubcategories.SubcategoryName.label("SubcategoryName"),
    ).join(Brands, Brands.BrandID == Items.BrandID)
    results = results.join(ItemCategories, ItemCategories.ItemCategoryID == Items.ItemCategoryID)
    results = results.join(ItemSubcategories, ItemSubcategories.ItemSubcategoryID == Items.ItemSubcategoryID)
    rows = results.all()

    items = []
    for item, brand_name, cat_name, sub_name in rows:
        setattr(item, "BrandName", brand_name)
        setattr(item, "CategoryName", cat_name)
        setattr(item, "SubcategoryName", sub_name)
        items.append(item)
    return items

def get_items_by_id(db: Session, item_id: int):
    """Obtener item por ID con nombres relacionados"""
    result = db.query(
        Items,
        Brands.Name.label("BrandName"),
        ItemCategories.CategoryName.label("CategoryName"),
        ItemSubcategories.SubcategoryName.label("SubcategoryName"),
    ).join(Brands, Brands.BrandID == Items.BrandID)
    result = result.join(ItemCategories, ItemCategories.ItemCategoryID == Items.ItemCategoryID)
    result = result.join(ItemSubcategories, ItemSubcategories.ItemSubcategoryID == Items.ItemSubcategoryID)
    result = result.filter(Items.ItemID == item_id).first()
    if result:
        item, brand_name, cat_name, sub_name = result
        setattr(item, "BrandName", brand_name)
        setattr(item, "CategoryName", cat_name)
        setattr(item, "SubcategoryName", sub_name)
        return item
    return None

def create_items(db: Session, item: ItemsCreate):
    db_item = Items(**asdict(item))
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_items(db: Session, item_id: int, item: ItemsUpdate):
    db_item = get_items_by_id(db, item_id)
    if db_item:
        for key, value in asdict(item).items():
            if value is not None:
                setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item

def delete_items(db: Session, item_id: int):
    db_item = get_items_by_id(db, item_id)
    if db_item:
        linked_price_list = (
            db.query(PriceListItems)
            .filter(PriceListItems.ItemID == item_id)
            .first()
            is not None
        )
        linked_order_detail = (
            db.query(OrderDetails)
            .filter(OrderDetails.ItemID == item_id)
            .first()
            is not None
        )
        if linked_price_list or linked_order_detail:
            raise ValueError(
                "Cannot delete item because it is referenced by existing records"
            )
        db.delete(db_item)
        db.commit()
    return db_item
