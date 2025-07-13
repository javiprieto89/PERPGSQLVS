# app/graphql/mutations/temporderdetails.py
import strawberry
from typing import Optional, List
from uuid import UUID

from app.graphql.schemas.temporderdetails import (
    TempOrderDetailsCreate,
    TempOrderDetailsUpdate,
    TempOrderDetailsInDB,
)
from app.graphql.crud.temporderdetails import (
    create_temporderdetails,
    update_temporderdetails,
    delete_temporderdetails,
    get_temporderdetails_by_session,
    delete_temporderdetails_by_session,
    update_temporderdetails_by_detail_id,
    delete_temporderdetails_by_detail_id,
    load_orderdetails_to_temp,
)
from app.graphql.crud.orders import (
    add_item_to_order,
    remove_item_from_order,
)
from app.utils import obj_to_schema, list_to_schema
from app.db import get_db
from strawberry.types import Info


@strawberry.input
class AddItemToOrderInput:
    """Input para agregar item a orden en proceso"""
    OrderID: int
    SessionID: Optional[str] = None
    ItemID: int
    Quantity: int
    UnitPrice: float
    Description: str
    WarehouseID: Optional[int] = None


@strawberry.type
class TempOrderDetailsMutations:
    @strawberry.mutation
    def create_temporderdetail(
        self, info: Info, data: TempOrderDetailsCreate
    ) -> TempOrderDetailsInDB:
        """Crear un nuevo item temporal en una orden"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            obj = create_temporderdetails(db, data)
            return obj_to_schema(TempOrderDetailsInDB, obj)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_temporderdetail(
        self,
        info: Info,
        sessionID: str,
        itemID: int,
        data: TempOrderDetailsUpdate,
    ) -> Optional[TempOrderDetailsInDB]:
        """Actualizar un item temporal usando ``sessionID`` e ``itemID``"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_temporderdetails(db, sessionID, itemID, data)
            return obj_to_schema(TempOrderDetailsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_temporderdetail(
        self,
        info: Info,
        sessionID: str,
        itemID: int,
    ) -> bool:
        """Eliminar un item temporal específico"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            deleted = delete_temporderdetails(db, sessionID, itemID)
            return deleted is not None
        finally:
            db_gen.close()

    @strawberry.mutation
    def add_item_to_order(
        self, info: Info, data: AddItemToOrderInput
    ) -> TempOrderDetailsInDB:
        """Agregar item a una orden en proceso (guarda en TempOrderDetails)"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            item_data = {
                'ItemID': data.ItemID,
                'Quantity': data.Quantity,
                'UnitPrice': data.UnitPrice,
                'Description': data.Description,
            }
            if data.WarehouseID:
                item_data['WarehouseID'] = data.WarehouseID
                
            temp_item = add_item_to_order(db, data.OrderID, data.SessionID, item_data)
            return obj_to_schema(TempOrderDetailsInDB, temp_item)
        finally:
            db_gen.close()

    @strawberry.mutation
    def remove_item_from_order(
        self, info: Info, sessionID: str, itemID: int
    ) -> bool:
        """Eliminar item específico de una orden en proceso"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            return remove_item_from_order(db, sessionID, itemID)
        finally:
            db_gen.close()

    @strawberry.mutation
    def clear_temp_session(self, info: Info, sessionID: str) -> bool:
        """Limpiar todos los items temporales de una sesión"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            count = delete_temporderdetails_by_session(db, sessionID)
            return count > 0
        finally:
            db_gen.close()

    @strawberry.mutation
    def load_order_for_editing(
        self, info: Info, orderID: int, userID: int, companyID: int, branchID: int
    ) -> str:
        """
        Cargar una orden existente para edición.
        Copia OrderDetails a TempOrderDetails y retorna el SessionID.
        """
        db_gen = get_db()
        db = next(db_gen)
        try:
            session_id = load_orderdetails_to_temp(db, orderID, userID, companyID, branchID)
            return session_id
        finally:
            db_gen.close()

    @strawberry.mutation
    def get_temp_items_by_session(
        self, info: Info, sessionID: str
    ) -> List[TempOrderDetailsInDB]:
        """Obtener todos los items temporales de una sesión"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            items = get_temporderdetails_by_session(db, sessionID)
            return list_to_schema(TempOrderDetailsInDB, items)
        finally:
            db_gen.close()

    @strawberry.mutation
    def update_temp_item_by_detail_id(
        self, info: Info, detailID: int, data: TempOrderDetailsUpdate
    ) -> Optional[TempOrderDetailsInDB]:
        """Actualizar un item temporal usando ``OrderDetailID``"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            updated = update_temporderdetails_by_detail_id(db, detailID, data)
            return obj_to_schema(TempOrderDetailsInDB, updated) if updated else None
        finally:
            db_gen.close()

    @strawberry.mutation
    def delete_temp_item_by_detail_id(self, info: Info, detailID: int) -> bool:
        """Eliminar un item temporal por ``OrderDetailID``"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            count = delete_temporderdetails_by_detail_id(db, detailID)
            return count > 0
        finally:
            db_gen.close()
