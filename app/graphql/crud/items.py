# app/graphql/crud/items.py
from sqlalchemy.orm import Session, joinedload
from app.models.pricelistitems import PriceListItems
from app.models.orderdetails import OrderDetails
from app.models.items import Items
from app.graphql.schemas.items import ItemsCreate, ItemsUpdate
from dataclasses import asdict

def get_items(db: Session):
    """Obtener items con todas sus relaciones"""
    return db.query(Items).options(
        joinedload(Items.brands_),
        joinedload(Items.itemCategories_),
        joinedload(Items.itemSubcategories_),
        joinedload(Items.suppliers_),
        joinedload(Items.warehouses_),
        joinedload(Items.branches_),
        joinedload(Items.companyData_),
    ).all()

def get_items_by_id(db: Session, item_id: int):
    """Obtener item por ID con sus relaciones"""
    return (
        db.query(Items)
        .options(
            joinedload(Items.brands_),
            joinedload(Items.itemCategories_),
            joinedload(Items.itemSubcategories_),
            joinedload(Items.suppliers_),
            joinedload(Items.warehouses_),
            joinedload(Items.branches_),
            joinedload(Items.companyData_),
        )
        .filter(Items.ItemID == item_id)
        .first()
    )

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

