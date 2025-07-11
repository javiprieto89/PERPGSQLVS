﻿# app/graphql/crud/temporderdetails.py - Versión type-safe
from sqlalchemy.orm import Session
from typing import List, Optional, Any
from dataclasses import asdict
from uuid import uuid4, UUID

from app.models.temporderdetails import TempOrderDetails
from app.graphql.schemas.temporderdetails import (
    TempOrderDetailsCreate,
    TempOrderDetailsUpdate,
)


def _safe_get_int(obj: Any, field_name: str) -> int:
    """Obtener un campo entero de forma segura desde un objeto SQLAlchemy"""
    value = getattr(obj, field_name, None)
    if value is None:
        raise ValueError(f"Campo {field_name} no encontrado o es None")
    # Si ya es un entero, devolverlo
    if isinstance(value, int):
        return value
    # Si es un string, convertirlo
    if isinstance(value, str):
        return int(value)
    # Si tiene método __int__, usarlo
    if hasattr(value, '__int__'):
        return int(value)
    # Como último recurso, intentar convertir el valor directamente
    try:
        return int(value)
    except (ValueError, TypeError) as e:
        raise ValueError(f"No se puede convertir {field_name}={value} a int: {e}")


def get_temporderdetails(db: Session) -> List[TempOrderDetails]:
    return db.query(TempOrderDetails).all()


def get_temporderdetail_by_session(
    db: Session, session_id: str
) -> Optional[TempOrderDetails]:
    return (
        db.query(TempOrderDetails)
        .filter(TempOrderDetails.OrderSessionID == session_id)
        .first()
    )


def create_temporderdetails(
    db: Session, data: TempOrderDetailsCreate
) -> TempOrderDetails:
    # Convertir dataclass a diccionario y filtrar valores None
    data_dict = {k: v for k, v in asdict(data).items() if v is not None}
    
    # Generar OrderSessionID si no se proporciona
    if "OrderSessionID" not in data_dict or data_dict["OrderSessionID"] is None:
        data_dict["OrderSessionID"] = uuid4()
    
    # Verificar campos obligatorios
    required_fields = ['CompanyID', 'BranchID', 'UserID', 'ItemID', 'Quantity', 'WarehouseID', 'PriceListID', 'UnitPrice', 'Description']
    for field in required_fields:
        if field not in data_dict or data_dict[field] is None:
            raise ValueError(f"Campo obligatorio faltante: {field}")
    
    obj = TempOrderDetails(**data_dict)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_temporderdetails(
    db: Session, session_id: str, data: TempOrderDetailsUpdate
) -> Optional[TempOrderDetails]:
    # Buscar el registro por OrderSessionID
    obj = get_temporderdetail_by_session(db, session_id)
    if not obj:
        return None
    
    # Actualizar solo los campos que no son None
    for field, value in asdict(data).items():
        if value is not None and hasattr(obj, field):
            setattr(obj, field, value)
    
    db.commit()
    db.refresh(obj)
    return obj


def delete_temporderdetails(db: Session, session_id: str) -> Optional[TempOrderDetails]:
    obj = get_temporderdetail_by_session(db, session_id)
    if not obj:
        return None
    db.delete(obj)
    db.commit()
    return obj


def get_temporderdetails_by_session(
    db: Session, session_id: str
) -> List[TempOrderDetails]:
    """Obtener todos los TempOrderDetails de una sesión específica"""
    return (
        db.query(TempOrderDetails)
        .filter(TempOrderDetails.OrderSessionID == session_id)
        .all()
    )


def get_temporderdetails_by_order(
    db: Session, order_id: int
) -> List[TempOrderDetails]:
    """Obtener todos los TempOrderDetails de una orden específica"""
    return (
        db.query(TempOrderDetails)
        .filter(TempOrderDetails.OrderID == order_id)
        .all()
    )


def delete_temporderdetails_by_session(
    db: Session, session_id: str
) -> int:
    """Eliminar todos los TempOrderDetails de una sesión y retornar cantidad eliminada"""
    count = (
        db.query(TempOrderDetails)
        .filter(TempOrderDetails.OrderSessionID == session_id)
        .delete(synchronize_session=False)
    )
    db.commit()
    return count


def load_orderdetails_to_temp(
    db: Session, order_id: int, user_id: int, company_id: int, branch_id: int
) -> str:
    """
    Cargar OrderDetails existentes a TempOrderDetails para edición
    Retorna el OrderSessionID generado
    """
    from app.models.orderdetails import OrderDetails
    
    # Generar nuevo session ID para la edición
    session_id = uuid4()
    
    # Obtener los OrderDetails de la orden
    order_details = (
        db.query(OrderDetails)
        .filter(OrderDetails.OrderID == order_id)
        .all()
    )
    
    # Copiar cada OrderDetail a TempOrderDetails
    for detail in order_details:
        # Obtener datos adicionales de la orden original
        from app.models.orders import Orders
        order = db.query(Orders).filter(Orders.OrderID == order_id).first()
        
        if not order:
            raise ValueError(f"Orden {order_id} no encontrada")
        
        temp_detail = TempOrderDetails(
            CompanyID=company_id,
            BranchID=branch_id,
            UserID=user_id,
            OrderID=order_id,
            OrderDetailID=_safe_get_int(detail, 'OrderDetailID'),
            OrderSessionID=session_id,
            ItemID=_safe_get_int(detail, 'ItemID'),
            Quantity=_safe_get_int(detail, 'Quantity'),
            WarehouseID=_safe_get_int(detail, 'WarehouseID'),
            PriceListID=_safe_get_int(order, 'PriceListID'),
            UnitPrice=detail.UnitPrice,
            Description=detail.Description
        )
        db.add(temp_detail)
    
    db.commit()
    return str(session_id)