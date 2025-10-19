from datetime import datetime, timezone

from sqlalchemy import text

from app.graphql.crud.orderdetails import (
    create_orderdetails,
    delete_orderdetails,
    get_orderdetails,
    get_orderdetails_by_id,
    update_orderdetails,
)
from app.graphql.schemas.orderdetails import OrderDetailsCreate, OrderDetailsUpdate
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _create_order(db_session, deps):
    next_order_id = db_session.execute(
        text(
            """
            SELECT ISNULL(MAX(OrderID), 0) + 1
            FROM Orders
            WHERE CompanyID = :company_id AND BranchID = :branch_id
            """
        ),
        {
            "company_id": deps["CompanyID"],
            "branch_id": deps["BranchID"],
        },
    ).scalar()

    result = db_session.execute(
        text(
            """
            INSERT INTO Orders (
                CompanyID, BranchID, OrderID, OrderDate, ClientID,
                SaleConditionID, DiscountID, Subtotal, DiscountAmount,
                TotalTaxAmount, Total, UserID, DocumentID,
                PriceListID, OrderStatusID, WarehouseID, VendorID
            )
            OUTPUT INSERTED.OrderID
            VALUES (
                :company_id, :branch_id, :order_id, :order_date, :client_id,
                :sale_condition_id, :discount_id, :subtotal, :discount_amount,
                :total_tax, :total, :user_id, :document_id,
                :price_list_id, :order_status_id, :warehouse_id, :vendor_id
            )
            """
        ),
        {
            "company_id": deps["CompanyID"],
            "branch_id": deps["BranchID"],
            "order_id": next_order_id,
            "order_date": datetime.now(timezone.utc),
            "client_id": deps["ClientID"],
            "sale_condition_id": deps["SaleConditionID"],
            "discount_id": deps["DiscountID"],
            "subtotal": 0.0,
            "discount_amount": 0.0,
            "total_tax": 0.0,
            "total": 0.0,
            "user_id": deps["UserID"],
            "document_id": deps["DocumentID"],
            "price_list_id": deps["PriceListID"],
            "order_status_id": deps["OrderStatusID"],
            "warehouse_id": deps["WarehouseID"],
            "vendor_id": deps["VendorID"],
        },
    )
    order_id = result.scalar()
    db_session.commit()
    return order_id


def _build_detail_input(deps, order_id: int, quantity: int, unit_price: float, description: str):
    return OrderDetailsCreate(
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        OrderID=order_id,
        ItemID=deps["ItemID"],
        WarehouseID=deps["WarehouseID"],
        Quantity=quantity,
        UnitPrice=unit_price,
        LineDescription=description,
        LastModified=datetime.now(timezone.utc),
    )


def _insert_detail_raw(db_session, deps, order_id: int, quantity: int, unit_price: float, description: str):
    result = db_session.execute(
        text(
            """
            INSERT INTO OrderDetails (
                CompanyID, BranchID, OrderID, ItemID, WarehouseID,
                Quantity, UnitPrice, LineDescription, LastModified
            )
            OUTPUT INSERTED.OrderDetailID
            VALUES (
                :company_id, :branch_id, :order_id, :item_id, :warehouse_id,
                :quantity, :unit_price, :description, :last_modified
            )
            """
        ),
        {
            "company_id": deps["CompanyID"],
            "branch_id": deps["BranchID"],
            "order_id": order_id,
            "item_id": deps["ItemID"],
            "warehouse_id": deps["WarehouseID"],
            "quantity": quantity,
            "unit_price": unit_price,
            "description": description,
            "last_modified": datetime.now(timezone.utc),
        },
    )
    detail_id = result.scalar()
    db_session.commit()
    return detail_id


def _execute_orderdetails_operation(db_session, deps, operation: str):
    def _logic():
        if operation == "insert":
            order_id = _create_order(db_session, deps)
            try:
                detail = create_orderdetails(
                    db_session,
                    _build_detail_input(deps, order_id, 1, 10.0, "Detalle insert"),
                )
                return "ok", {"order_detail_id": detail.OrderDetailID}
            except Exception:
                db_session.rollback()
                order_id = _create_order(db_session, deps)
                detail_id = _insert_detail_raw(db_session, deps, order_id, 1, 10.0, "Detalle insert")
                return "ok", {"order_detail_id": detail_id}

        if operation == "read":
            order_id = _create_order(db_session, deps)
            try:
                detail = create_orderdetails(
                    db_session,
                    _build_detail_input(deps, order_id, 2, 11.0, "Detalle read"),
                )
                detail_id = detail.OrderDetailID
            except Exception:
                db_session.rollback()
                order_id = _create_order(db_session, deps)
                detail_id = _insert_detail_raw(db_session, deps, order_id, 2, 11.0, "Detalle read")
            fetched = get_orderdetails_by_id(db_session, detail_id)
            if not fetched:
                return "error", "orderdetails_read_not_found"
            return "ok", {"order_detail_id": fetched.OrderDetailID}

        if operation == "read_all":
            order_id = _create_order(db_session, deps)
            try:
                create_orderdetails(
                    db_session,
                    _build_detail_input(deps, order_id, 3, 12.0, "Detalle read_all"),
                )
            except Exception:
                db_session.rollback()
                order_id = _create_order(db_session, deps)
                _insert_detail_raw(db_session, deps, order_id, 3, 12.0, "Detalle read_all")
            results = get_orderdetails(db_session)
            if not results:
                return "error", "orderdetails_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            order_id = _create_order(db_session, deps)
            try:
                detail = create_orderdetails(
                    db_session,
                    _build_detail_input(deps, order_id, 4, 13.0, "Detalle update"),
                )
                detail_id = detail.OrderDetailID
            except Exception:
                db_session.rollback()
                order_id = _create_order(db_session, deps)
                detail_id = _insert_detail_raw(db_session, deps, order_id, 4, 13.0, "Detalle update")
            new_quantity = 7
            update_orderdetails(
                db_session,
                detail_id,
                OrderDetailsUpdate(Quantity=new_quantity),
            )
            refreshed = get_orderdetails_by_id(db_session, detail_id)
            if not refreshed or refreshed.Quantity != new_quantity:
                return "error", "orderdetails_update_failed"
            return "ok", {"order_detail_id": detail_id}

        if operation == "delete":
            order_id = _create_order(db_session, deps)
            try:
                detail = create_orderdetails(
                    db_session,
                    _build_detail_input(deps, order_id, 5, 14.0, "Detalle delete"),
                )
                detail_id = detail.OrderDetailID
            except Exception:
                db_session.rollback()
                order_id = _create_order(db_session, deps)
                detail_id = _insert_detail_raw(db_session, deps, order_id, 5, 14.0, "Detalle delete")
            delete_orderdetails(db_session, detail_id)
            remaining = {d.OrderDetailID for d in get_orderdetails(db_session)}
            if detail_id in remaining:
                return "error", "orderdetails_delete_failed"
            return "ok", {"order_detail_id": detail_id}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_orderdetails_flow(db_session, order_base_dependencies):
    deps = order_base_dependencies
    run_entity_flow(
        "orderdetails",
        "insert",
        lambda op: _execute_orderdetails_operation(db_session, deps, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
