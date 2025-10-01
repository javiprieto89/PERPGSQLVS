import pytest
from app.graphql.crud.orderdetails import (
    create_orderdetails,
    get_orderdetails,
    update_orderdetails,
    delete_orderdetails,
)
from app.graphql.crud.orders import create_orders, finalize_order
from app.graphql.schemas.orderdetails import OrderDetailsCreate, OrderDetailsUpdate
from app.graphql.schemas.orders import OrdersCreate


@pytest.mark.usefixtures("order_base_dependencies")
def test_create_get_update_delete_orderdetails(db_session, order_base_dependencies):
    deps = order_base_dependencies
    company_id = deps["CompanyID"]
    branch_id = deps["BranchID"]

    # Primero crear una orden básica sin items para obtener OrderID
    o = create_orders(db_session, OrdersCreate(
        CompanyID=company_id,
        BranchID=branch_id,
        ClientID=deps["ClientID"],
        Subtotal=0.0,
        Total=0.0,
        DiscountAmount=0.0,
        TotalTaxAmount=0.0,
        UserID=deps["UserID"],
        PriceListID=deps["PriceListID"],
        OrderStatusID=deps["OrderStatusID"],
        WarehouseID=deps["WarehouseID"],
        SaleConditionID=deps["SaleConditionID"],
        DiscountID=deps["DiscountID"],
        VendorID=deps["VendorID"],
        Items=[],
    ))
    order_id = o.OrderID

    # Crear detalle manual directo (simula post-finalize) usando el CRUD específico
    detail = create_orderdetails(db_session, OrderDetailsCreate(
        CompanyID=company_id,
        BranchID=branch_id,
        OrderID=order_id,
        ItemID=deps["ItemID"],
        WarehouseID=deps["WarehouseID"],
        Quantity=1,
        UnitPrice=10.0,
        LineDescription="Detalle seed",
    ))
    assert detail.Quantity == 1

    # Obtener y asegurar presencia
    all_details = get_orderdetails(db_session)
    assert any(d.OrderDetailID == detail.OrderDetailID for d in all_details)

    # Actualizar cantidad
    updated = update_orderdetails(db_session, detail.OrderDetailID, OrderDetailsUpdate(Quantity=3))
    assert updated is not None and updated.Quantity == 3

    # Eliminar
    deleted = delete_orderdetails(db_session, detail.OrderDetailID)
    assert deleted is not None and deleted.OrderDetailID == detail.OrderDetailID
    assert all(d.OrderDetailID != detail.OrderDetailID for d in get_orderdetails(db_session))