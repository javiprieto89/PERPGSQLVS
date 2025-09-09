from sqlalchemy.orm import Session
from app.models.warehouses import Warehouses
from app.models.items import Items
from app.models.orderdetails import OrderDetails
from app.models.orders import Orders
from app.graphql.schemas.warehouses import WarehousesCreate, WarehousesUpdate


def get_warehouses(db: Session):
    return db.query(Warehouses).all()


def get_warehouses_by_id(db: Session, warehouseid: int):
    return db.query(Warehouses).filter(Warehouses.WarehouseID == warehouseid).first()


def create_warehouses(db: Session, data: WarehousesCreate):
    obj = Warehouses(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_warehouses(db: Session, warehouseid: int, data: WarehousesUpdate):
    obj = get_warehouses_by_id(db, warehouseid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_warehouses(db: Session, warehouseid: int):
    obj = get_warehouses_by_id(db, warehouseid)
    if obj:
        linked_items = db.query(Items).filter(Items.WarehouseID == warehouseid).first() is not None
        linked_orders = db.query(Orders).filter(Orders.WarehouseID == warehouseid).first() is not None
        linked_order_details = (
            db.query(OrderDetails)
            .filter(OrderDetails.WarehouseID == warehouseid)
            .first()
            is not None
        )
        if linked_items or linked_orders or linked_order_details:
            raise ValueError(
                "Cannot delete warehouse because it is referenced by existing records"
            )
        db.delete(obj)
        db.commit()
    return obj

