# app/graphql/mutations/orders.py - Versión type-safe
import strawberry
from typing import Optional
from app.graphql.schemas.orders import OrdersCreate, OrdersUpdate, OrdersInDB
from app.graphql.crud.orders import (
    create_orders,
    update_orders,
    delete_orders,
    finalize_order,
    get_order_details_in_progress,
    _safe_get_int,
)
from app.utils import obj_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class OrderResponse:
    """Respuesta extendida para operaciones de órdenes"""
    order: OrdersInDB
    sessionID: Optional[str] = None
    message: Optional[str] = None


@strawberry.type
class OrdersMutations:
    @strawberry.mutation
    def create_order(self, info: Info, data: OrdersCreate) -> OrderResponse:
        """
        Crear nueva orden. Los detalles se guardan en TempOrderDetails hasta finalizar.
        """
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_orders(db, data)
            session_id = getattr(obj, '_temp_session_id', None)
            
            return OrderResponse(
                order=obj_to_schema(OrdersInDB, obj),
                sessionID=session_id,
                message="Orden creada. Detalles guardados temporalmente."
            )
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_order(
        self, info: Info, orderID: int, data: OrdersUpdate
    ) -> Optional[OrderResponse]:
        """
        Actualizar orden. Si tiene detalles, se cargan a TempOrderDetails para edición.
        """
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_orders(db, orderID, data)
            if not updated:
                return None
                
            session_id = getattr(updated, '_temp_session_id', None)
            message = "Orden actualizada."
            if session_id:
                message += " Detalles cargados para edición."
                
            return OrderResponse(
                order=obj_to_schema(OrdersInDB, updated),
                sessionID=session_id,
                message=message
            )
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_order(self, info: Info, orderID: int) -> bool:
        """Eliminar orden y todos sus detalles"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_orders(db, orderID)
            return deleted is not None
        finally:
            db_gen.close()

    @strawberry.mutation
    def finalize_order(
        self, info: Info, orderID: int, sessionID: str
    ) -> Optional[OrderResponse]:
        """
        Finalizar orden: mover detalles de TempOrderDetails a OrderDetails.
        Llamar cuando el usuario confirma definitivamente la orden.
        """
        db_gen = get_db()
        db = next(db_gen)
        try:
            finalized = finalize_order(db, orderID, sessionID)
            if not finalized:
                return None
                
            return OrderResponse(
                order=obj_to_schema(OrdersInDB, finalized),
                sessionID=None,
                message="Orden finalizada exitosamente. Detalles guardados definitivamente."
            )
        finally:
            db_gen.close()

    @strawberry.mutation
    def save_order_draft(
        self, info: Info, orderID: int, sessionID: str
    ) -> Optional[OrderResponse]:
        """
        Guardar borrador de orden sin finalizar.
        Los detalles permanecen en TempOrderDetails para continuar editando después.
        """
        db_gen = get_db()
        db = next(db_gen)
        try:
            from app.graphql.crud.orders import get_orders_by_id
            order = get_orders_by_id(db, orderID)
            if not order:
                return None
                
            # Verificar que existan detalles temporales
            details_in_progress = get_order_details_in_progress(db, sessionID)

            return OrderResponse(
                order=obj_to_schema(OrdersInDB, order),
                sessionID=sessionID,
                message=f"Borrador guardado con {len(details_in_progress)} detalles temporales."
            )
        finally:
            db_gen.close()

    @strawberry.mutation 
    def cancel_order_editing(
        self, info: Info, orderID: int, sessionID: str
    ) -> bool:
        """
        Cancelar edición de orden: eliminar detalles temporales sin guardar cambios.
        """
        db_gen = get_db()
        db = next(db_gen)
        try:
            from app.graphql.crud.temporderdetails import delete_temporderdetails_by_session
            count = delete_temporderdetails_by_session(db, sessionID)
            return count > 0
        finally:
            db_gen.close()