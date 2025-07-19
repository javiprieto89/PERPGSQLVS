# app/graphql/crud/pricelistitems.py
from sqlalchemy.orm import Session
from app.models.pricelistitems import PriceListItems
from app.models.pricelists import PriceLists
from app.models.items import Items
from app.graphql.schemas.pricelistitems import (
    PriceListItemsCreate,
    PriceListItemsUpdate,
)


def get_pricelistitems(db: Session):
    query = (
        db.query(
            PriceListItems,
            PriceLists.Name.label("PriceListName"),
            Items.Code.label("Code"),
            Items.Description.label("Description"),
        )
        .join(PriceLists, PriceListItems.PriceListID == PriceLists.PriceListID)
        .join(Items, PriceListItems.ItemID == Items.ItemID)
    )
    rows = query.all()
    results = []
    for pli, list_name, code, desc in rows:
        setattr(pli, "PriceListName", list_name)
        setattr(pli, "Code", code)
        setattr(pli, "Description", desc)
        results.append(pli)
    return results


def get_pricelistitem(db: Session, pricelist_id: int, item_id: int):
    query = (
        db.query(
            PriceListItems,
            PriceLists.Name.label("PriceListName"),
            Items.Code.label("Code"),
            Items.Description.label("Description"),
        )
        .join(PriceLists, PriceListItems.PriceListID == PriceLists.PriceListID)
        .join(Items, PriceListItems.ItemID == Items.ItemID)
        .filter(
            PriceListItems.PriceListID == pricelist_id,
            PriceListItems.ItemID == item_id,
        )
    )
    result = query.first()
    if result:
        pli, list_name, code, desc = result
        setattr(pli, "PriceListName", list_name)
        setattr(pli, "Code", code)
        setattr(pli, "Description", desc)
        return pli
    return None


def get_pricelistitems_filtered(
    db: Session, pricelist_id: int | None = None, item_id: int | None = None
):
    query = (
        db.query(
            PriceListItems,
            PriceLists.Name.label("PriceListName"),
            Items.Code.label("Code"),
            Items.Description.label("Description"),
        )
        .join(PriceLists, PriceListItems.PriceListID == PriceLists.PriceListID)
        .join(Items, PriceListItems.ItemID == Items.ItemID)
    )
    if pricelist_id is not None:
        query = query.filter(PriceListItems.PriceListID == pricelist_id)
    if item_id is not None:
        query = query.filter(PriceListItems.ItemID == item_id)
    rows = query.all()
    results = []
    for pli, list_name, code, desc in rows:
        setattr(pli, "PriceListName", list_name)
        setattr(pli, "Code", code)
        setattr(pli, "Description", desc)
        results.append(pli)
    return results


def create_pricelistitem(db: Session, data: PriceListItemsCreate):
    obj = PriceListItems(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_pricelistitem(
    db: Session, pricelist_id: int, item_id: int, data: PriceListItemsUpdate
):
    obj = get_pricelistitem(db, pricelist_id, item_id)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_pricelistitem(db: Session, pricelist_id: int, item_id: int):
    obj = get_pricelistitem(db, pricelist_id, item_id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj

