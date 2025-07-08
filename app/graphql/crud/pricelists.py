# graphql/crud/pricelists.py
from sqlalchemy.orm import Session
from sqlalchemy import exists
from app.models.clients import Clients
from app.models.orders import Orders
from app.models.pricelistitems import PriceListItems
from app.models.itempricehistory import ItemPriceHistory
from app.models.temporderdetails import TempOrderDetails
from app.models.pricelists import PriceLists
from app.graphql.schemas.pricelists import PriceListsCreate, PriceListsUpdate


def get_pricelists(db: Session):
    return db.query(PriceLists).all()


def get_pricelists_by_id(db: Session, pricelistid: int):
    return db.query(PriceLists).filter(PriceLists.PriceListID == pricelistid).first()


def create_pricelists(db: Session, data: PriceListsCreate):
    obj = PriceLists(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_pricelists(db: Session, pricelistid: int, data: PriceListsUpdate):
    obj = get_pricelists_by_id(db, pricelistid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_pricelists(db: Session, pricelistid: int):
    obj = get_pricelists_by_id(db, pricelistid)
    if obj:
        linked_clients = db.query(exists().where(Clients.PriceListID == pricelistid)).scalar()
        linked_orders = db.query(exists().where(Orders.PriceListID == pricelistid)).scalar()
        linked_items = db.query(
            exists().where(PriceListItems.PriceListID == pricelistid)
        ).scalar()
        linked_history = db.query(
            exists().where(ItemPriceHistory.PriceListID == pricelistid)
        ).scalar()
        linked_temp = db.query(
            exists().where(TempOrderDetails.PriceListID == pricelistid)
        ).scalar()
        if any([linked_clients, linked_orders, linked_items, linked_history, linked_temp]):
            raise ValueError(
                "Cannot delete price list because it is referenced by other records"
            )
        db.delete(obj)
        db.commit()
    return obj
