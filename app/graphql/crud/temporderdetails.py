# app/graphql/crud/temporderdetails.py - Versión type-safe
from sqlalchemy.orm import Session
from typing import List, Optional, Any
from dataclasses import asdict
from uuid import uuid4, UUID

from app.models.temporderdetails import TempOrderDetails
# No dependemos de schemas GraphQL; este CRUD es interno


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


def _ensure_uuid(value: str | UUID) -> UUID:
    """Convertir un valor a UUID si es necesario."""
    if isinstance(value, UUID):
        return value
    return UUID(str(value))


def get_temporderdetails(db: Session) -> List[TempOrderDetails]:
    return db.query(TempOrderDetails).all()


def get_temporderdetail_by_session(
    db: Session,
    session_id: str,
    item_id: int,
) -> Optional[TempOrderDetails]:
    """Obtener un ``TempOrderDetail`` por ``OrderSessionID`` e ``ItemID``"""
    session_uuid = _ensure_uuid(session_id)
    return (
        db.query(TempOrderDetails)
        .filter(
            TempOrderDetails.OrderSessionID == session_uuid,
            TempOrderDetails.ItemID == item_id,
        )
        .first()
    )


def create_temporderdetails(db: Session, data: Any) -> TempOrderDetails:
    # Convertir dataclass a diccionario y filtrar valores None
    # Aceptar dataclass u objeto dict-like
    try:
        data_dict = {k: v for k, v in asdict(data).items() if v is not None}
    except Exception:
        data_dict = {k: v for k, v in dict(data).items() if v is not None}

    # Generar OrderSessionID si no se proporciona
    if "OrderSessionID" not in data_dict or data_dict["OrderSessionID"] is None:
        data_dict["OrderSessionID"] = uuid4()

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
    data: Any,
) -> Optional[TempOrderDetails]:
    """Actualizar un item temporal usando ``OrderSessionID`` e ``ItemID``"""
    # Buscar el registro por OrderSessionID e ItemID
    obj = get_temporderdetail_by_session(db, session_id, item_id)
    if not obj:
        return None

    # Actualizar solo los campos que no son None
    try:
        src = asdict(data)
    except Exception:
        src = dict(data)
    for field, value in src.items():
        if value is not None and hasattr(obj, field):
            setattr(obj, field, value)

    db.commit()
    db.refresh(obj)
    return obj


def delete_temporderdetails(
    db: Session,
    session_id: str,
    item_id: int,
) -> Optional[TempOrderDetails]:
    """Eliminar un item temporal específico"""
    obj = get_temporderdetail_by_session(db, session_id, item_id)
    if not obj:
        return None
    db.delete(obj)
    db.commit()
    return obj


def get_temporderdetails_by_session(db: Session, session_id: str) -> List[TempOrderDetails]:
    """Obtener todos los TempOrderDetails de una sesión específica"""
    session_uuid = _ensure_uuid(session_id)
    return db.query(TempOrderDetails).filter(TempOrderDetails.OrderSessionID == session_uuid).all()


def get_temporderdetails_by_order(db: Session, order_id: int) -> List[TempOrderDetails]:
    """Obtener todos los TempOrderDetails de una orden específica"""
    return db.query(TempOrderDetails).filter(TempOrderDetails.OrderID == order_id).all()


def delete_temporderdetails_by_session(db: Session, session_id: str) -> int:
    """Eliminar todos los TempOrderDetails de una sesión y retornar cantidad eliminada"""
    session_uuid = _ensure_uuid(session_id)
    count = (
        db.query(TempOrderDetails)
        .filter(TempOrderDetails.OrderSessionID == session_uuid)
        .delete(synchronize_session=False)
    )
    db.commit()
    return count


def delete_temporderdetails_by_order(db: Session, order_id: int) -> int:
    """Eliminar todos los TempOrderDetails asociados a una orden."""
    count = db.query(TempOrderDetails).filter(TempOrderDetails.OrderID == order_id).delete(synchronize_session=False)
    db.commit()
    return count


def get_temporderdetail_by_detail_id(db: Session, detail_id: int) -> Optional[TempOrderDetails]:
    """Obtener un ``TempOrderDetail`` por ``OrderDetailID``"""
    return db.query(TempOrderDetails).filter(TempOrderDetails.OrderDetailID == detail_id).first()


def update_temporderdetails_by_detail_id(
    db: Session, detail_id: int, data: Any
) -> Optional[TempOrderDetails]:
    """Actualizar un item temporal usando su ``OrderDetailID``"""
    obj = get_temporderdetail_by_detail_id(db, detail_id)
    if not obj:
        return None

    try:
        src = asdict(data)
    except Exception:
        src = dict(data)
    for field, value in src.items():
        if value is not None and hasattr(obj, field):
            setattr(obj, field, value)

    db.commit()
    db.refresh(obj)
    return obj


def delete_temporderdetails_by_detail_id(db: Session, detail_id: int) -> int:
    """Eliminar un ``TempOrderDetail`` usando su ``OrderDetailID``"""
    count = (
        db.query(TempOrderDetails).filter(TempOrderDetails.OrderDetailID == detail_id).delete(synchronize_session=False)
    )
    db.commit()
    return count


def load_orderdetails_to_temp(db: Session, order_id: int, user_id: int, company_id: int, branch_id: int) -> str:
    """
    Cargar OrderDetails existentes a TempOrderDetails para edición
    Retorna el OrderSessionID generado
    """
    from app.models.orderdetails import OrderDetails

    # Limpiar cualquier sesión previa asociada a esta orden
    delete_temporderdetails_by_order(db, order_id)

    # Generar session ID base para la edición
    session_id = uuid4()

    from app.models.orders import Orders

    order = db.query(Orders).filter(Orders.OrderID == order_id).first()
    if not order:
        raise ValueError(f"Orden {order_id} no encontrada")

    price_list_id = _safe_get_int(order, "PriceListID")

    # Obtener los OrderDetails de la orden
    order_details = db.query(OrderDetails).filter(OrderDetails.OrderID == order_id).all()

    existing = {}
    for detail in order_details:
        item_id = _safe_get_int(detail, "ItemID")
        quantity = _safe_get_int(detail, "Quantity")
        warehouse_id = _safe_get_int(detail, "WarehouseID")
        unit_price = detail.UnitPrice

        detail_session_id = session_id
        if item_id in existing:
            prev = existing[item_id]
            if (
                prev["PriceListID"] != price_list_id
                or prev["WarehouseID"] != warehouse_id
                or prev["Quantity"] != quantity
                or prev["UnitPrice"] != unit_price
            ):
                detail_session_id = uuid4()
                existing[item_id] = {
                    "PriceListID": price_list_id,
                    "WarehouseID": warehouse_id,
                    "Quantity": quantity,
                    "UnitPrice": unit_price,
                    "SessionID": detail_session_id,
                }
            else:
                detail_session_id = prev["SessionID"]
        else:
            existing[item_id] = {
                "PriceListID": price_list_id,
                "WarehouseID": warehouse_id,
                "Quantity": quantity,
                "UnitPrice": unit_price,
                "SessionID": detail_session_id,
            }

        temp_detail = TempOrderDetails(
            CompanyID=company_id,
            BranchID=branch_id,
            UserID=user_id,
            OrderID=order_id,
            OrderDetailID=_safe_get_int(detail, "OrderDetailID"),
            OrderSessionID=detail_session_id,
            ItemID=item_id,
            Quantity=quantity,
            WarehouseID=warehouse_id,
            PriceListID=price_list_id,
            UnitPrice=unit_price,
            Description=getattr(detail, 'LineDescription', getattr(detail, 'Description', None)),
        )
        db.add(temp_detail)

    db.commit()
    return str(session_id)

