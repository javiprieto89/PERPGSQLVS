# app/graphql/crud/orderdetails.py
from sqlalchemy.orm import Session, joinedload
from app.models.orderdetails import OrderDetails
from app.models.items import Items
from app.models.warehouses import Warehouses
from app.graphql.schemas.orderdetails import OrderDetailsCreate, OrderDetailsUpdate


def get_orderdetails(db: Session):
    return (
        db.query(OrderDetails)
        .options(
            joinedload(OrderDetails.items_),
            joinedload(OrderDetails.warehouses_),
        )
        .all()
    )


def get_orderdetails_by_id(db: Session, orderdetailid: int):
    return (
        db.query(OrderDetails)
        .options(
            joinedload(OrderDetails.items_),
            joinedload(OrderDetails.warehouses_),
        )
        .filter(OrderDetails.OrderDetailID == orderdetailid)
        .first()
    )


def create_orderdetails(db: Session, data: OrderDetailsCreate):
    # Crear el objeto OrderDetails solo con los campos válidos
    obj_data = {}
    
    # Solo incluir OrderID si está presente (no es None)
    if data.OrderID is not None:
        obj_data['OrderID'] = data.OrderID
        
    obj_data.update({
        'CompanyID': data.CompanyID,
        'BranchID': data.BranchID,
        'ItemID': data.ItemID,
        'Quantity': data.Quantity,
        'UnitPrice': data.UnitPrice,
        'LineDescription': data.LineDescription
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
            'CompanyID', 'BranchID', 'OrderID', 'ItemID', 'Quantity', 'UnitPrice',
            'LineDescription', 'LastModified'
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
