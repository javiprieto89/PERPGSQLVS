import pytest
from app.graphql.crud.orderhistorydetails import (
    create_orderhistorydetails,
    get_orderhistorydetails,
    update_orderhistorydetails,
    delete_orderhistorydetails,
)
from app.graphql.crud.orderhistory import create_orderhistory
from app.graphql.schemas.orderhistory import OrderHistoryCreate
from app.graphql.schemas.orderhistorydetails import (
    OrderHistoryDetailsCreate,
    OrderHistoryDetailsUpdate,
)
from app.graphql.crud.orders import create_orders
from app.graphql.schemas.orders import OrdersCreate


@pytest.mark.usefixtures("order_base_dependencies")
def test_create_get_update_delete_orderhistorydetails(db_session, order_base_dependencies):
    deps = order_base_dependencies

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

    hist = create_orderhistory(db_session, OrderHistoryCreate(
        OrderID=order.OrderID,
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        ClientID=deps["ClientID"],
        Status="Nuevo",
    ))

    history_id = getattr(hist, "OrderHistoryID", None)
    assert isinstance(history_id, int) and history_id > 0

    detail = create_orderhistorydetails(db_session, OrderHistoryDetailsCreate(
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        OrderHistoryID=history_id,
        ItemID=deps["ItemID"],
        WarehouseID=deps["WarehouseID"],
        Quantity=1,
        UnitPrice=10.0,
        Description="detalle seed",
    ))
    assert detail.Quantity == 1

    all_details = get_orderhistorydetails(db_session, company_id=deps["CompanyID"], branch_id=deps["BranchID"], orderhistory_id=history_id)
    assert any(d.OrderHistoryDetailID == detail.OrderHistoryDetailID for d in all_details)

    updated = update_orderhistorydetails(db_session, detail.OrderHistoryDetailID, OrderHistoryDetailsUpdate(Quantity=2))
    assert updated is not None and updated.Quantity == 2

    deleted = delete_orderhistorydetails(db_session, detail.OrderHistoryDetailID)
    assert deleted is not None and deleted.OrderHistoryDetailID == detail.OrderHistoryDetailID
    assert all(d.OrderHistoryDetailID != detail.OrderHistoryDetailID for d in get_orderhistorydetails(db_session))