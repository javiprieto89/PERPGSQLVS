# crud/clients.py
from sqlalchemy.orm import Session
from sqlalchemy import exists
from app.models.clients import Clients
from app.models.orders import Orders
from app.graphql.schemas.clients import ClientsCreate, ClientsUpdate


def get_clients(db: Session):
    return db.query(Clients).all()


def get_clients_by_id(db: Session, clientid: int):
    return db.query(Clients).filter(Clients.ClientID == clientid).first()


def create_clients(db: Session, data: ClientsCreate):
    obj = Clients(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_clients(db: Session, clientid: int, data: ClientsUpdate):
    obj = get_clients_by_id(db, clientid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_clients(db: Session, clientid: int):
    obj = get_clients_by_id(db, clientid)
    if obj:
        # Check for existing orders before deleting
        has_orders = db.query(Orders).filter(Orders.ClientID == clientid).first() is not None
        if has_orders:
            raise ValueError("Client has associated orders and cannot be deleted")
        db.delete(obj)
        db.commit()
    return obj
