# app/graphql/crud/temporderdetails.py - Versión type-safe
from sqlalchemy.orm import Session
from typing import List, Optional, Any
from dataclasses import asdict
from uuid import uuid4, UUID

from app.models.temporderdetails import TempOrderDetails
from app.models.items import Items
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
    if hasattr(value, "__int__"):
        return int(value)
    # Como último recurso, intentar convertir el valor directamente
    try:
        return int(value)
    except (ValueError, TypeError) as e:
        raise ValueError(f"No se puede convertir {field_name}={value} a int: {e}")


def get_temporderdetails(db: Session) -> List[TempOrderDetails]:
    return db.query(TempOrderDetails).all()


def get_temporderdetail_by_session(
    db: Session,
    session_id: str,
    item_id: int,
    order_detail_id: Optional[int] = None,
) -> Optional[TempOrderDetails]:
    """Obtener un ``TempOrderDetail`` por ``OrderSessionID`` e ``ItemID``.

    Si ``order_detail_id`` se proporciona, también se filtra por ese campo para
    garantizar que se obtenga un único registro cuando existen múltiples ítems
    con el mismo ``ItemID`` en una sesión.
    """
    query = (
        db.query(TempOrderDetails)
        .join(Items, TempOrderDetails.ItemID == Items.ItemID)
        .filter(
            TempOrderDetails.OrderSessionID == session_id,
            TempOrderDetails.ItemID == item_id,
        )
    )
    if order_detail_id is not None:
        query = query.filter(TempOrderDetails.OrderDetailID == order_detail_id)

    result = query.first()
    if result:
        result.ItemCode = result.items_.Code if result.items_ else None
    return result


def create_temporderdetails(
    db: Session, data: TempOrderDetailsCreate
) -> TempOrderDetails:
    # Convertir dataclass a diccionario y filtrar valores None
    data_dict = {k: v for k, v in asdict(data).items() if v is not None}

    # Obtener o generar OrderSessionID base
    if "OrderSessionID" in data_dict and data_dict["OrderSessionID"] is not None:
        base_session_uuid = UUID(str(data_dict["OrderSessionID"]))
    else:
        base_session_uuid = uuid4()

    # Verificar si ya existe un item con la misma combinación
    exists = (
        db.query(TempOrderDetails)
        .filter(
            TempOrderDetails.OrderSessionID == base_session_uuid,
            TempOrderDetails.ItemID == data_dict["ItemID"],
        )
        .first()
    )

    session_uuid = base_session_uuid if not exists else uuid4()
    data_dict["OrderSessionID"] = session_uuid

    # Verificar campos obligatorios
    required_fields = [
        "CompanyID",
        "BranchID",
        "UserID",
        "ItemID",
        "Quantity",
        "WarehouseID",
        "PriceListID",
        "UnitPrice",
        "Description",
    ]
    for field in required_fields:
        if field not in data_dict or data_dict[field] is None:
            raise ValueError(f"Campo obligatorio faltante: {field}")

    obj = TempOrderDetails(**data_dict)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_temporderdetails(
    db: Session,
    session_id: str,
    item_id: int,
    data: TempOrderDetailsUpdate,
    order_detail_id: Optional[int] = None,
) -> Optional[TempOrderDetails]:
    """Actualizar un item temporal.

    Se identifica por ``session_id`` y ``item_id``. Si ``order_detail_id`` se
    suministra, también se filtra por ese campo para evitar conflictos en caso de
    que existan múltiples registros con el mismo ``ItemID`` en la misma sesión.
    """
    obj = get_temporderdetail_by_session(db, session_id, item_id, order_detail_id)
    if not obj:
        return None

    # Actualizar solo los campos que no son None
    for field, value in asdict(data).items():
        if value is not None and hasattr(obj, field):
            setattr(obj, field, value)

    db.commit()
    db.refresh(obj)
    return obj


def delete_temporderdetails(
    db: Session,
    session_id: str,
    item_id: int,
    order_detail_id: Optional[int] = None,
) -> Optional[TempOrderDetails]:
    """Eliminar un item temporal específico"""
    obj = get_temporderdetail_by_session(db, session_id, item_id, order_detail_id)
    if not obj:
        return None
    db.delete(obj)
    db.commit()
    return obj


def get_temporderdetails_by_session(
    db: Session, session_id: str
) -> List[TempOrderDetails]:
    """Obtener todos los TempOrderDetails de una sesión específica"""
    items = (
        db.query(TempOrderDetails)
        .join(Items, TempOrderDetails.ItemID == Items.ItemID)
        .filter(TempOrderDetails.OrderSessionID == session_id)
        .all()
    )
    for obj in items:
        obj.ItemCode = obj.items_.Code if obj.items_ else None
    return items


def get_temporderdetails_by_order(db: Session, order_id: int) -> List[TempOrderDetails]:
    """Obtener todos los TempOrderDetails de una orden específica"""
    return db.query(TempOrderDetails).filter(TempOrderDetails.OrderID == order_id).all()


def delete_temporderdetails_by_session(db: Session, session_id: str) -> int:
    """Eliminar todos los TempOrderDetails de una sesión y retornar cantidad eliminada"""
    count = (
        db.query(TempOrderDetails)
        .filter(TempOrderDetails.OrderSessionID == session_id)
        .delete(synchronize_session=False)
    )
    db.commit()
    return count


def delete_temporderdetails_by_order(db: Session, order_id: int) -> int:
    """Eliminar todos los TempOrderDetails asociados a una orden"""
    count = (
        db.query(TempOrderDetails)
        .filter(TempOrderDetails.OrderID == order_id)
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
        db.query(OrderDetails).filter(OrderDetails.OrderID == order_id).all()
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
            OrderDetailID=_safe_get_int(detail, "OrderDetailID"),
            OrderSessionID=session_id,
            ItemID=_safe_get_int(detail, "ItemID"),
            Quantity=_safe_get_int(detail, "Quantity"),
            WarehouseID=_safe_get_int(detail, "WarehouseID"),
            PriceListID=_safe_get_int(order, "PriceListID"),
            UnitPrice=detail.UnitPrice,
            Description=detail.Description,
        )
        db.add(temp_detail)

    db.commit()
    return str(session_id)
