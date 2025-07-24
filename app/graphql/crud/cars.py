# crud/cars.py
from sqlalchemy.orm import Session
from app.models.cars import Cars
from app.models.carmodels import CarModels
from app.models.orders import Orders
from app.models.orderhistory import OrderHistory
from app.models.carbrands import CarBrands
from app.models.clients import Clients  # AGREGADO: Importar el modelo de clientes
from app.graphql.schemas.cars import CarsCreate, CarsUpdate


def get_cars(db: Session):
    results = db.query(
        Cars,
        CarModels.Model.label("CarModelName"),
        CarBrands.Name.label("CarBrandName"),
        CarBrands.CarBrandID.label("CarBrandID"),
        # AGREGADO: Información del cliente
        Clients.FirstName.label("ClientFirstName"),
        Clients.LastName.label("ClientLastName")
    ).join(CarModels, Cars.CarModelID == CarModels.CarModelID)\
     .join(CarBrands, CarModels.CarBrandID == CarBrands.CarBrandID)\
     .join(Clients, Cars.ClientID == Clients.ClientID).all()  # AGREGADO: Join con clientes
    
    cars = []
    for c, model_name, brand_name, brand_id, client_first_name, client_last_name in results:
        setattr(c, "CarModelName", model_name)
        setattr(c, "CarBrandName", brand_name)
        setattr(c, "CarBrandID", brand_id)
        # AGREGADO: Agregar información del cliente
        setattr(c, "ClientFirstName", client_first_name)
        setattr(c, "ClientLastName", client_last_name)
        # AGREGADO: Crear nombre completo del cliente
        client_full_name = f"{client_first_name or ''} {client_last_name or ''}".strip()
        setattr(c, "ClientName", client_full_name if client_full_name else "Sin nombre")
        cars.append(c)
    return cars


def get_cars_by_id(db: Session, carid: int):
    result = db.query(
        Cars,
        CarModels.Model.label("CarModelName"),
        CarBrands.Name.label("CarBrandName"),
        CarBrands.CarBrandID.label("CarBrandID"),
        # AGREGADO: Información del cliente
        Clients.FirstName.label("ClientFirstName"),
        Clients.LastName.label("ClientLastName")
    ).join(CarModels, Cars.CarModelID == CarModels.CarModelID)\
     .join(CarBrands, CarModels.CarBrandID == CarBrands.CarBrandID)\
     .join(Clients, Cars.ClientID == Clients.ClientID)\
     .filter(Cars.CarID == carid).first()
    
    if result:
        c, model_name, brand_name, brand_id, client_first_name, client_last_name = result
        setattr(c, "CarModelName", model_name)
        setattr(c, "CarBrandName", brand_name)
        setattr(c, "CarBrandID", brand_id)
        # AGREGADO: Agregar información del cliente
        setattr(c, "ClientFirstName", client_first_name)
        setattr(c, "ClientLastName", client_last_name)
        client_full_name = f"{client_first_name or ''} {client_last_name or ''}".strip()
        setattr(c, "ClientName", client_full_name if client_full_name else "Sin nombre")
        return c
    return None


def get_cars_by_client_id(db: Session, client_id: int):
    results = db.query(
        Cars,
        CarModels.Model.label("CarModelName"),
        CarBrands.Name.label("CarBrandName"),
        CarBrands.CarBrandID.label("CarBrandID"),
        # AGREGADO: Información del cliente
        Clients.FirstName.label("ClientFirstName"),
        Clients.LastName.label("ClientLastName")
    ).join(CarModels, Cars.CarModelID == CarModels.CarModelID)\
     .join(CarBrands, CarModels.CarBrandID == CarBrands.CarBrandID)\
     .join(Clients, Cars.ClientID == Clients.ClientID)\
     .filter(Cars.ClientID == client_id).all()
    
    cars = []
    for c, model_name, brand_name, brand_id, client_first_name, client_last_name in results:
        setattr(c, "CarModelName", model_name)
        setattr(c, "CarBrandName", brand_name)
        setattr(c, "CarBrandID", brand_id)
        # AGREGADO: Agregar información del cliente
        setattr(c, "ClientFirstName", client_first_name)
        setattr(c, "ClientLastName", client_last_name)
        client_full_name = f"{client_first_name or ''} {client_last_name or ''}".strip()
        setattr(c, "ClientName", client_full_name if client_full_name else "Sin nombre")
        cars.append(c)
    return cars


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