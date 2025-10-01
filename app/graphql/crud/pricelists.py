# graphql/crud/pricelists.py
from sqlalchemy.orm import Session
from app.models.clients import Clients
from app.models.orders import Orders
from app.models.pricelistitems import PriceListItems
from app.models.itempricehistories import ItemPriceHistories
from app.models.temporderdetails import TempOrderDetails
from app.models.pricelists import PriceLists
from app.graphql.schemas.pricelists import PriceListsCreate, PriceListsUpdate


def get_pricelists(db: Session):
    return db.query(PriceLists).all()


def get_pricelists_by_id(db: Session, company_id: int, pricelistid: int):
    return (
        db.query(PriceLists)
        .filter(PriceLists.CompanyID == company_id, PriceLists.PriceListID == pricelistid)
        .first()
    )


def create_pricelists(db: Session, data: PriceListsCreate):
    obj = PriceLists(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_pricelists(db: Session, company_id: int, pricelistid: int, data: PriceListsUpdate):
    obj = get_pricelists_by_id(db, company_id, pricelistid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_pricelists(db: Session, company_id: int, pricelistid: int):
    obj = get_pricelists_by_id(db, company_id, pricelistid)
    if obj:
        linked_clients = (
            db.query(Clients)
            .filter(Clients.CompanyID == company_id, Clients.PriceListID == pricelistid)
            .first()
            is not None
        )
        linked_orders = (
            db.query(Orders)
            .filter(Orders.CompanyID == company_id, Orders.PriceListID == pricelistid)
            .first()
            is not None
        )
        linked_items = (
            db.query(PriceListItems)
            .join(PriceLists, PriceLists.PriceListID == PriceListItems.PriceListID)
            .filter(PriceLists.CompanyID == company_id, PriceListItems.PriceListID == pricelistid)
            .first()
            is not None
        )
        linked_history = (
            db.query(ItemPriceHistories)
            .filter(
                ItemPriceHistories.CompanyID == company_id,
                ItemPriceHistories.PriceListID == pricelistid,
            )
            .first()
            is not None
        )
        if any([linked_clients, linked_orders, linked_items, linked_history]):
            raise ValueError(
                "Cannot delete price list because it is referenced by other records"
            )
        db.delete(obj)
        db.commit()
    return obj

