# app/graphql/crud/orders.py
from sqlalchemy.orm import Session
from dataclasses import asdict

from uuid import uuid4

from app.models.orders import Orders
from app.models.orderdetails import OrderDetails
from app.models.temporderdetails import TempOrderDetails
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
    # Eliminar los ítems del dict para no pasarlos al modelo
    order_data.pop("Items", None)
    
    # Crear el objeto Orders con los datos correctos
    order = Orders(**order_data)
    db.add(order)
    db.flush()  # necesario para obtener orderID antes de los detalles

    # Guardar temporalmente los detalles de la orden
    session_id = uuid4()
    for item in items_data:
        temp_detail = TempOrderDetails(
            OrderID=order.OrderID,
            CompanyID=order.CompanyID,
            BranchID=order.BranchID,
            UserID=order.UserID,
            ItemID=item.ItemID,
            Quantity=item.Quantity,
            WarehouseID=order.WarehouseID,
            PriceListID=order.PriceListID,
            UnitPrice=item.UnitPrice,
            Description=item.Description,
            OrderSessionID=session_id,
        )
        db.add(temp_detail)

    db.commit()
    db.refresh(order)
    return order


def update_orders(db: Session, orderid: int, data: OrdersUpdate):
    obj = get_orders_by_id(db, orderid)
    if obj:
        update_data = asdict(data)
        # No se actualizan ítems desde esta función
        update_data.pop("Items", None)
        
        # Actualizar solo los campos que no son None
        for k, v in update_data.items():
            if v is not None:
                setattr(obj, k, v)
        
        db.commit()
        db.refresh(obj)
    return obj


def delete_orders(db: Session, orderid: int):
    obj = get_orders_by_id(db, orderid)
    if obj:
        # Delete associated order details first to avoid foreign key issues
        db.query(OrderDetails).filter(OrderDetails.OrderID == orderid).delete(synchronize_session=False)
        # Persist removal of details before deleting the order itself
        db.commit()
        db.delete(obj)
        db.commit()
    return obj


def finalize_order(db: Session, orderid: int, session_id: str):
    """Move items from TempOrderDetails to OrderDetails when the order is saved."""
    order = get_orders_by_id(db, orderid)
    if not order:
        return None

    temp_items = (
        db.query(TempOrderDetails)
        .filter(
            TempOrderDetails.OrderID == orderid,
            TempOrderDetails.OrderSessionID == session_id,
        )
        .all()
    )

    # Remove existing order details
    db.query(OrderDetails).filter(OrderDetails.OrderID == orderid).delete(
        synchronize_session=False
    )

    # Create new order details from temp entries
    for t in temp_items:
        detail = OrderDetails(
            OrderID=orderid,
            ItemID=t.ItemID,
            Quantity=t.Quantity,
            UnitPrice=t.UnitPrice,
            Description=t.Description,
            WarehouseID=t.WarehouseID,
        )
        db.add(detail)

    # Remove temp items
    for t in temp_items:
        db.delete(t)

    db.commit()
    db.refresh(order)
    return order
