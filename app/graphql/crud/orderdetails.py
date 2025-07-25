# app/graphql/crud/orderdetails.py
from sqlalchemy.orm import Session, joinedload
from app.models.orderdetails import OrderDetails
from app.models.items import Items
from app.models.warehouses import Warehouses
from app.graphql.schemas.orderdetails import OrderDetailsCreate, OrderDetailsUpdate


def get_orderdetails(db: Session):
    results = (
        db.query(
            OrderDetails,
            Items.Description.label("ItemName"),
            Warehouses.Name.label("WarehouseName"),
        )
        .join(Items, OrderDetails.ItemID == Items.ItemID)
        .join(Warehouses, OrderDetails.WarehouseID == Warehouses.WarehouseID)
        .all()
    )

    orderdetails = []
    for od, item_name, warehouse_name in results:
        setattr(od, "ItemName", item_name)
        setattr(od, "WarehouseName", warehouse_name)
        orderdetails.append(od)
    return orderdetails


def get_orderdetails_by_id(db: Session, orderdetailid: int):
    result = (
        db.query(
            OrderDetails,
            Items.Description.label("ItemName"),
            Warehouses.Name.label("WarehouseName"),
        )
        .join(Items, OrderDetails.ItemID == Items.ItemID)
        .join(Warehouses, OrderDetails.WarehouseID == Warehouses.WarehouseID)
        .filter(OrderDetails.OrderDetailID == orderdetailid)
        .first()
    )

    if result:
        od, item_name, warehouse_name = result
        setattr(od, "ItemName", item_name)
        setattr(od, "WarehouseName", warehouse_name)
        return od
    return None


def create_orderdetails(db: Session, data: OrderDetailsCreate):
    # Crear el objeto OrderDetails solo con los campos válidos
    obj_data = {}
    
    # Solo incluir OrderID si está presente (no es None)
    if data.OrderID is not None:
        obj_data['OrderID'] = data.OrderID
        
    obj_data.update({
        'ItemID': data.ItemID,
        'Quantity': data.Quantity,
        'UnitPrice': data.UnitPrice,
        'Description': data.Description
    })
    
    if data.LastModified is not None:
        obj_data['LastModified'] = data.LastModified
    
    obj = OrderDetails(**obj_data)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_orderdetails(db: Session, orderdetailid: int, data: OrderDetailsUpdate):
    obj = get_orderdetails_by_id(db, orderdetailid)
    if obj:
        # Actualizar solo los campos que no son None
        update_fields = [
            'OrderID', 'ItemID', 'Quantity', 'UnitPrice', 
            'Description', 'LastModified'
        ]
        
        for field in update_fields:
            value = getattr(data, field, None)
            if value is not None:
                setattr(obj, field, value)
                
        db.commit()
        db.refresh(obj)
    return obj


def delete_orderdetails(db: Session, orderdetailid: int):
    obj = get_orderdetails_by_id(db, orderdetailid)
    if obj:
        db.delete(obj)
        db.commit()
    return obj