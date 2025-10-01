import pytest
from app.graphql.crud.orderhistory import (
    create_orderhistory,
    get_orderhistory,
    update_orderhistory,
    delete_orderhistory,
)
from app.graphql.schemas.orderhistory import OrderHistoryCreate, OrderHistoryUpdate
from app.graphql.crud.orders import create_orders
from app.graphql.schemas.orders import OrdersCreate


@pytest.mark.usefixtures("order_base_dependencies")
def test_create_get_update_delete_orderhistory(db_session, order_base_dependencies):
    deps = order_base_dependencies
    # Crear primero una orden real para tener OrderID válido
    order = create_orders(db_session, OrdersCreate(
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        ClientID=deps["ClientID"],
        Subtotal=0.0,
        DiscountAmount=0.0,
        TotalTaxAmount=0.0,
        Total=0.0,
        UserID=deps["UserID"],
        PriceListID=deps["PriceListID"],
        OrderStatusID=deps["OrderStatusID"],
        WarehouseID=deps["WarehouseID"],
        SaleConditionID=deps["SaleConditionID"],
        DiscountID=deps["DiscountID"],
        VendorID=deps["VendorID"],
        Items=[],
    ))
    order_id = order.OrderID

    # OrderHistory schema actual (OrderHistoryCreate) no contiene UserID / Date_ / ServiceTypeID en definición GraphQL.
    # Proveemos los campos existentes; los faltantes los maneja el modelo con defaults o los ignoramos en inserción.
    hist = create_orderhistory(db_session, OrderHistoryCreate(
        OrderID=order_id,
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        ClientID=deps["ClientID"],
        Status="Nuevo",
    ))
    assert getattr(hist, "Status", None) == "Nuevo"

    all_hist = get_orderhistory(db_session)
    assert any(h.OrderHistoryID == hist.OrderHistoryID for h in all_hist)

    updated = update_orderhistory(db_session, hist.OrderHistoryID, OrderHistoryUpdate(Status="Cerrado"))
    assert updated is not None and updated.Status == "Cerrado"

    deleted = delete_orderhistory(db_session, hist.OrderHistoryID)
    assert deleted is not None and deleted.OrderHistoryID == hist.OrderHistoryID
    assert all(h.OrderHistoryID != hist.OrderHistoryID for h in get_orderhistory(db_session))