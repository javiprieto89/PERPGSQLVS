# crud/cars.py
from sqlalchemy.orm import Session, joinedload
from app.models.cars import Cars
from app.models.carmodels import CarModels
from app.models.orders import Orders
from app.models.orderhistory import OrderHistory
from app.models.carbrands import CarBrands
from app.models.clients import Clients  # AGREGADO: Importar el modelo de clientes
from app.graphql.schemas.cars import CarsCreate, CarsUpdate


def get_cars(db: Session):
    return (
        db.query(Cars)
        .options(
            joinedload(Cars.carModels_).joinedload(CarModels.carBrand),
            joinedload(Cars.clients_),
            joinedload(Cars.discounts_),
        )
        .all()
    )


def get_cars_by_company(db: Session, company_id: int):
    """Retrieve cars filtered by CompanyID"""
    return (
        db.query(Cars)
        .options(
            joinedload(Cars.carModels_).joinedload(CarModels.carBrand),
            joinedload(Cars.clients_),
            joinedload(Cars.discounts_),
        )
        .filter(Cars.CompanyID == company_id)
        .all()
    )


def get_cars_by_id(db: Session, carid: int):
    return (
        db.query(Cars)
        .options(
            joinedload(Cars.carModels_).joinedload(CarModels.carBrand),
            joinedload(Cars.clients_),
            joinedload(Cars.discounts_),
        )
        .filter(Cars.CarID == carid)
        .first()
    )


def get_cars_by_client_id(db: Session, client_id: int):
    return (
        db.query(Cars)
        .options(
            joinedload(Cars.carModels_).joinedload(CarModels.carBrand),
            joinedload(Cars.clients_),
            joinedload(Cars.discounts_),
        )
        .filter(Cars.ClientID == client_id)
        .all()
    )


def create_cars(db: Session, data: CarsCreate):
    obj = Cars(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_cars(db: Session, carid: int, data: CarsUpdate):
    obj = get_cars_by_id(db, carid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_cars(db: Session, carid: int):
    obj = get_cars_by_id(db, carid)
    if obj:
        linked_orders = db.query(Orders).filter(Orders.CarID == carid).first() is not None
        linked_history = db.query(OrderHistory).filter(OrderHistory.CarID == carid).first() is not None
        if linked_orders or linked_history:
            raise ValueError("Cannot delete car because it is referenced by existing orders")
        db.delete(obj)
        db.commit()
    return obj