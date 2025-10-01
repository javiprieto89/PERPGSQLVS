# app/graphql/crud/orders.py - Versión type-safe
from sqlalchemy.orm import joinedload
from sqlalchemy.orm import Session
from dataclasses import asdict
from uuid import uuid4, UUID
from typing import Optional, Any

from app.models.orders import Orders
from app.models.orderdetails import OrderDetails
from app.models.temporderdetails import TempOrderDetails
from app.graphql.schemas.orders import OrdersCreate, OrdersUpdate
from app.graphql.crud.temporderdetails import (
    load_orderdetails_to_temp,
    get_temporderdetails_by_session,
    delete_temporderdetails_by_session,
    get_temporderdetails_by_order,
    delete_temporderdetails_by_order,
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
        raise ValueError(
            f"No se puede convertir {field_name}={value} a int: {e}")


def get_orders(db: Session):
    return (
        db.query(Orders)
        .options(
            joinedload(Orders.company_),
            joinedload(Orders.branches_),
            joinedload(Orders.saleConditions_),
            # sys types no expuestos
            joinedload(Orders.warehouses_),
            joinedload(Orders.clients_),
            joinedload(Orders.discounts_),
            joinedload(Orders.priceLists_),
            joinedload(Orders.vendors_),
            joinedload(Orders.documents_),
            # sys order status no expuestos
            joinedload(Orders.cars_),
            joinedload(Orders.serviceType_),
            joinedload(Orders.users_),
        )
        .all()
    )


def update_orders(db: Session, company_id: int, branch_id: int, orderid: int, data: OrdersUpdate) -> Optional[Orders]:
    """Actualizar campos de Orders con mapeo de nombres y, si hay Items, cargar a temporales."""
    order = get_orders_by_id(db, company_id, branch_id, orderid)
    if not order:
        return None

    payload = asdict(data)
    payload.pop('CompanyID', None)
    payload.pop('BranchID', None)
    if payload.get('OrderDate') is None:
        payload.pop('OrderDate', None)
    items = payload.pop('Items', None)

    # Aplicar el resto de campos no None
    for k, v in payload.items():
        if v is not None and hasattr(order, k):
            setattr(order, k, v)

    # Si vienen items para edición, cargar detalles actuales a temporales
    if items:
        user_id = _safe_get_int(order, 'UserID')
        load_orderdetails_to_temp(db, orderid, user_id, company_id, branch_id)
        # Dejar una pista para la mutation
        order._temp_session_id = str(uuid4())

    db.commit()
    db.refresh(order)
    return order


def get_orders_by_id(db: Session, company_id: int, branch_id: int, orderid: int):
    return (
        db.query(Orders)
        .options(
            joinedload(Orders.company_),
            joinedload(Orders.branches_),
            joinedload(Orders.saleConditions_),
            # sys types no expuestos
            joinedload(Orders.warehouses_),
            joinedload(Orders.clients_),
            joinedload(Orders.discounts_),
            joinedload(Orders.priceLists_),
            joinedload(Orders.vendors_),
            joinedload(Orders.documents_),
            # sys order status no expuestos
            joinedload(Orders.cars_),
            joinedload(Orders.serviceType_),
            joinedload(Orders.users_),
        )
        .filter(Orders.CompanyID == company_id, Orders.BranchID == branch_id, Orders.OrderID == orderid)
        .first()
    )


def create_orders(db: Session, data: OrdersCreate):
    """
    Crear nueva orden y guardar items en TempOrderDetails.
    Los items se moverán a OrderDetails cuando se finalice la orden.
    """
    # Extraer los ítems de la orden
    items_data = data.Items if hasattr(data, "Items") else []

    # Crear orden sin los ítems
    order_data = asdict(data)
    if order_data.get('OrderDate') is None:
        order_data.pop('OrderDate', None)
    if order_data.get('DiscountAmount') is None:
        order_data['DiscountAmount'] = 0.0
    if order_data.get('TotalTaxAmount') is None:
        order_data['TotalTaxAmount'] = 0.0
    order_data.pop("Items", None)  # Eliminar items del dict para el modelo

    # Crear el objeto Orders
    order = Orders(**order_data)
    db.add(order)
    db.flush()  # Necesario para obtener orderID antes de los detalles

    # Generar session ID único para esta orden
    session_id = uuid4()

    # Guardar items en TempOrderDetails
    for item in items_data:
        # Obtener WarehouseID de forma segura
        warehouse_id = (
            getattr(item, "WarehouseID", None)
            if hasattr(item, "WarehouseID") and item.WarehouseID
            else _safe_get_int(order, "WarehouseID")
        )

        temp_detail = TempOrderDetails(
            CompanyID=_safe_get_int(order, "CompanyID"),
            BranchID=_safe_get_int(order, "BranchID"),
            UserID=_safe_get_int(order, "UserID"),
            OrderID=_safe_get_int(order, "OrderID"),
            OrderSessionID=session_id,
            ItemID=item.ItemID,
            Quantity=item.Quantity,
            WarehouseID=warehouse_id,
            PriceListID=_safe_get_int(order, "PriceListID"),
            UnitPrice=item.UnitPrice,
            Description=getattr(item, 'LineDescription',
                                getattr(item, 'Description', None)),
        )
        db.add(temp_detail)

    db.commit()
    db.refresh(order)

    # Agregar el session_id al objeto para referencia
    order._temp_session_id = str(session_id)

    return order


# def update_orders(db: Session, orderid: int, data: OrdersUpdate):
#     """Actualizar orden y preparar los items para edición.

#     Siempre carga los ``OrderDetails`` existentes a ``TempOrderDetails`` para
#     que puedan modificarse desde el frontend, independientemente de si el
#     payload incluye items nuevos o no.
#     """
#     obj = get_orders_by_id(db, orderid)
#     if not obj:
#         return None

#     update_data = asdict(data)
#     # ``Items`` puede venir para futuras funcionalidades, pero por ahora sólo se
#     # extrae para evitar que intente asignarse directamente al modelo ``Orders``.
#     update_data.pop("Items", None)

#     # Actualizar campos de la orden (excluyendo items)
#     for k, v in update_data.items():
#         if v is not None and hasattr(obj, k):
#             setattr(obj, k, v)

#     # Siempre cargar los detalles existentes a ``TempOrderDetails`` para poder
#     # editarlos desde la UI. Si ya existe una sesión previa, se generará una
#     # nueva para evitar colisiones.
#     db.flush()
#     db.refresh(obj)

#     session_id = load_orderdetails_to_temp(
#         db,
#         orderid,
#         _safe_get_int(obj, "UserID"),
#         _safe_get_int(obj, "CompanyID"),
#         _safe_get_int(obj, "BranchID"),
#     )
#     obj._temp_session_id = session_id

#     db.commit()
#     db.refresh(obj)
#     return obj


def delete_orders(db: Session, company_id: int, branch_id: int, orderid: int):
    """Eliminar orden y sus detalles relacionados"""
    obj = get_orders_by_id(db, company_id, branch_id, orderid)
    if not obj:
        return None

    # Eliminar OrderDetails relacionados
    db.query(OrderDetails).filter(OrderDetails.OrderID == orderid).delete(
        synchronize_session=False
    )

    # Eliminar TempOrderDetails relacionados (si existen)
    db.query(TempOrderDetails).filter(TempOrderDetails.OrderID == orderid).delete(
        synchronize_session=False
    )

    # Eliminar la orden
    db.delete(obj)
    db.commit()
    return obj


def finalize_order(db: Session, company_id: int, branch_id: int, orderid: int, session_id: str) -> Optional[Orders]:
    """
    Finalizar orden: mover items de TempOrderDetails a OrderDetails y limpiar temporales.
    ``session_id`` se mantiene por compatibilidad pero se ignorará y se usará ``orderid``
    para obtener todos los registros temporales de la orden.
    """
    order = get_orders_by_id(db, company_id, branch_id, orderid)
    if not order:
        return None

    # Obtener items temporales de la orden (ignorar session_id)
    temp_items = get_temporderdetails_by_order(db, orderid)

    if not temp_items:
        # Si no hay items temporales, la orden ya está finalizada o no tiene items
        return order

    # Eliminar OrderDetails existentes para reemplazarlos
    db.query(OrderDetails).filter(OrderDetails.OrderID == orderid).delete(
        synchronize_session=False
    )

    # Crear nuevos OrderDetails desde TempOrderDetails
    for temp_item in temp_items:
        order_detail = OrderDetails(
            CompanyID=_safe_get_int(order, 'CompanyID'),
            BranchID=_safe_get_int(order, 'BranchID'),
            OrderID=orderid,
            ItemID=_safe_get_int(temp_item, "ItemID"),
            WarehouseID=_safe_get_int(temp_item, "WarehouseID"),
            Quantity=_safe_get_int(temp_item, "Quantity"),
            UnitPrice=temp_item.UnitPrice,
            LineDescription=temp_item.Description,
        )
        db.add(order_detail)

    # Limpiar todos los TempOrderDetails de la orden
    delete_temporderdetails_by_order(db, orderid)

    db.commit()
    db.refresh(order)
    return order


def add_item_to_order(
    db: Session,
    order_id: int,
    company_id: int,
    branch_id: int,
    session_id: Optional[str],
    item_data: dict,
) -> TempOrderDetails:
    """
    Agregar un item a una orden en proceso (guardarlo en TempOrderDetails).
    Se usa durante la creación/edición de órdenes antes de finalizar.
    """
    order = get_orders_by_id(db, company_id, branch_id,order_id)
    if not order:
        raise ValueError(f"Orden {order_id} no encontrada")

    # Obtener WarehouseID de forma segura
    warehouse_id = (
        item_data.get("WarehouseID")
        if "WarehouseID" in item_data and item_data["WarehouseID"]
        else _safe_get_int(order, "WarehouseID")
    )

    # Normalizar session ID a UUID
    if not session_id:
        session_uuid = uuid4()
    else:
        session_uuid = UUID(session_id)
    # Crear entrada temporal
    temp_detail = TempOrderDetails(
        CompanyID=_safe_get_int(order, "CompanyID"),
        BranchID=_safe_get_int(order, "BranchID"),
        UserID=_safe_get_int(order, "UserID"),
        OrderID=order_id,
        OrderSessionID=session_uuid,
        ItemID=item_data["ItemID"],
        Quantity=item_data["Quantity"],
        WarehouseID=warehouse_id,
        PriceListID=_safe_get_int(order, "PriceListID"),
        UnitPrice=item_data["UnitPrice"],
        Description=item_data["Description"],
    )

    db.add(temp_detail)
    db.commit()
    db.refresh(temp_detail)
    return temp_detail


def remove_item_from_order(db: Session, session_id: str, item_id: int) -> bool:
    """
    Eliminar un item específico de una orden en proceso (desde TempOrderDetails).
    """
    temp_item = (
        db.query(TempOrderDetails)
        .filter(
            TempOrderDetails.OrderSessionID == session_id,
            TempOrderDetails.ItemID == item_id,
        )
        .first()
    )

    if not temp_item:
        return False

    db.delete(temp_item)
    db.commit()
    return True


def get_order_items_in_progress(db: Session, session_id: str) -> list:
    """
    Obtener todos los items de una orden en proceso (desde TempOrderDetails).
    """
    return get_temporderdetails_by_session(db, session_id)
