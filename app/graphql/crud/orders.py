# app/graphql/crud/orders.py
from sqlalchemy.orm import Session
from dataclasses import asdict

from app.models.orders import Orders
from app.models.orderdetails import OrderDetails
from app.graphql.schemas.orders import OrdersCreate, OrdersUpdate


def get_orders(db: Session):
    return db.query(Orders).all()


def get_orders_by_id(db: Session, orderid: int):
    return db.query(Orders).filter(Orders.OrderID == orderid).first()


def create_orders(db: Session, data: OrdersCreate):
    # Extraer los ítems de la orden
    items_data = data.Items if hasattr(data, "Items") else []

    # Crear orden sin los ítems
    order_data = asdict(data)
    # eliminar los ítems del dict para no pasarlos al modelo
    order_data.pop("Items", None)  # Corregido: Items con mayúscula
    order = Orders(**order_data)
    db.add(order)
    db.flush()  # necesario para obtener orderID antes de los detalles

    # Crear detalles con nombres de atributos correctos
    for item in items_data:
        detail = OrderDetails(
            OrderID=order.OrderID,  # Corregido: OrderID con mayúsculas
            ItemID=item.ItemID,     # Corregido: ItemID con mayúsculas
            Quantity=item.Quantity, # Corregido: Quantity con mayúscula
            UnitPrice=item.UnitPrice,  # Corregido: UnitPrice con mayúsculas
            Description=item.Description,  # Corregido: Description con mayúscula
        )
        db.add(detail)

    db.commit()
    db.refresh(order)
    return order


def update_orders(db: Session, orderid: int, data: OrdersUpdate):
    obj = get_orders_by_id(db, orderid)
    if obj:
        update_data = asdict(data)
        # No se actualizan ítems desde esta función
        update_data.pop("Items", None)  # Corregido: Items con mayúscula
        for k, v in update_data.items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_orders(db: Session, orderid: int):
    obj = get_orders_by_id(db, orderid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj