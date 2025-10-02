import pytest
from datetime import datetime

from app.graphql.crud.orders import (
    create_orders,
    get_orders,
    update_orders,
    delete_orders,
    finalize_order,
    add_item_to_order,
    remove_item_from_order,
    get_order_items_in_progress,
)
from app.models.orderdetails import OrderDetails
from app.graphql.crud.temporderdetails import get_temporderdetails_by_order
from app.graphql.schemas.orders import OrdersCreate, OrdersUpdate
from app.graphql.schemas.orderdetails import OrderDetailsCreate


@pytest.mark.usefixtures("order_base_dependencies")
def test_create_finalize_update_delete_orders(db_session, order_base_dependencies):
    deps = order_base_dependencies
    company_id = deps["CompanyID"]
    branch_id = deps["BranchID"]
    # Crear orden con un item en Items (se almacena en TempOrderDetails inicialmente)
    item_payload = OrderDetailsCreate(
        CompanyID=company_id,
        BranchID=branch_id,
        ItemID=deps["ItemID"],
        WarehouseID=deps["WarehouseID"],
        Quantity=2,
        UnitPrice=10.0,
        LineDescription="Linea seed",
    )
    order_input = OrdersCreate(
        CompanyID=company_id,
        BranchID=branch_id,
        ClientID=deps["ClientID"],
        DocumentID=deps["DocumentID"],
        Subtotal=20.0,
        DiscountAmount=0.0,
        TotalTaxAmount=0.0,
        Total=20.0,
        OrderDate=datetime(2025, 1, 1, 0, 0, 0),
        SaleConditionID=deps["SaleConditionID"],
        DiscountID=deps["DiscountID"],
        UserID=deps["UserID"],
        PriceListID=deps["PriceListID"],
        OrderStatusID=deps["OrderStatusID"],
        WarehouseID=deps["WarehouseID"],
        VendorID=deps["VendorID"],
        Items=[item_payload],
    )
    order = create_orders(db_session, order_input)
    assert order.CompanyID == company_id
    order_id = order.OrderID
    assert order_id > 0
    # Verificar que el item quedó en temporales (no en OrderDetails todavía)
    temp_items = get_temporderdetails_by_order(db_session, order_id)
    assert len(temp_items) == 1
    # Finalizar la orden (mueve de temporales a OrderDetails)
    finalized = finalize_order(db_session, company_id, branch_id, order_id, getattr(
        order, "_temp_session_id", ""))
    assert finalized is not None and finalized.OrderID == order_id
    # Ahora los temporales deberían haberse migrado
    temp_items_after = get_temporderdetails_by_order(db_session, order_id)
    assert len(temp_items_after) == 0
    # Debe existir exactamente 1 detalle migrado
    details = db_session.query(OrderDetails).filter(
        OrderDetails.CompanyID == company_id,
        OrderDetails.BranchID == branch_id,
        OrderDetails.OrderID == order_id,
    ).all()
    assert len(details) == 1
    # Refrescar listado
    all_orders = get_orders(db_session)
    assert any(o.OrderID == order_id for o in all_orders)
    # Actualizar una nota
    updated = update_orders(db_session, company_id, branch_id,
                            order_id, OrdersUpdate(Notes="nota actualizada"))
    assert updated is not None and updated.Notes == "nota actualizada"
    # Eliminar
    deleted = delete_orders(db_session, company_id, branch_id, order_id)
    assert deleted is not None and deleted.OrderID == order_id
    assert all(o.OrderID != order_id for o in get_orders(db_session))


@pytest.mark.usefixtures("order_base_dependencies")
def test_add_remove_items_flow(db_session, order_base_dependencies):
    deps = order_base_dependencies
    company_id = deps["CompanyID"]
    branch_id = deps["BranchID"]

    # Crear orden inicialmente sin items
    order = create_orders(db_session, OrdersCreate(
        CompanyID=company_id,
        BranchID=branch_id,
        ClientID=deps["ClientID"],
        Subtotal=0.0,
        DiscountAmount=0.0,
        TotalTaxAmount=0.0,
        Total=0.0,
        UserID=deps["UserID"],
        DocumentID=deps["DocumentID"],
        PriceListID=deps["PriceListID"],
        OrderStatusID=deps["OrderStatusID"],
        WarehouseID=deps["WarehouseID"],
        SaleConditionID=deps["SaleConditionID"],
        DiscountID=deps["DiscountID"],
        VendorID=deps["VendorID"],
        Items=[],
    ))
    order_id = order.OrderID

    # Agregar item A
    temp_a = add_item_to_order(db_session, order_id, company_id, branch_id, getattr(order, "_temp_session_id", None), {
        "ItemID": deps["ItemID"],
        "Quantity": 3,
        "WarehouseID": deps["WarehouseID"],
        "UnitPrice": 10.0,
        "Description": "Item A",
    })
    assert temp_a.Quantity == 3
    # Usar el session id efectivo persistido en el registro temporal (garantiza coincidencia de PK)
    session_id_effective = str(temp_a.OrderSessionID)

    # Agregar segundo item (mismo producto con diferente qty para simular edición)
    temp_b = add_item_to_order(db_session, order_id, company_id, branch_id, session_id_effective, {
        "ItemID": deps["ItemID"],
        "Quantity": 1,
        "WarehouseID": deps["WarehouseID"],
        "UnitPrice": 10.0,
        "Description": "Item A mod",
    })
    assert temp_b.Quantity == 1

    # Listar items en progreso (solo 1 por upsert de mismo ItemID)
    progress_items = get_order_items_in_progress(
        db_session, session_id_effective)
    assert len(progress_items) == 1

    # Eliminar uno (usar itemID del segundo)
    removed = remove_item_from_order(
        db_session, session_id_effective, temp_b.ItemID)
    assert removed is True

    # Verificar eliminación deja 0
    progress_after = get_order_items_in_progress(
        db_session, session_id_effective)
    assert len(progress_after) == 0

    # Finalizar (no debe fallar aunque no haya temporales)
    finalized = finalize_order(
        db_session, company_id, branch_id, order_id, session_id_effective)
    assert finalized is not None and finalized.OrderID == order_id


@pytest.mark.usefixtures("order_base_dependencies")
def test_finalize_with_multiple_items(db_session, order_base_dependencies):
    deps = order_base_dependencies
    company_id = deps["CompanyID"]
    branch_id = deps["BranchID"]

    # Crear orden base
    order = create_orders(db_session, OrdersCreate(
        CompanyID=company_id,
        BranchID=branch_id,
        ClientID=deps["ClientID"],
        Subtotal=0.0,
        DiscountAmount=0.0,
        TotalTaxAmount=0.0,
        Total=0.0,
        UserID=deps["UserID"],
        DocumentID=deps["DocumentID"],
        PriceListID=deps["PriceListID"],
        OrderStatusID=deps["OrderStatusID"],
        WarehouseID=deps["WarehouseID"],
        SaleConditionID=deps["SaleConditionID"],
        DiscountID=deps["DiscountID"],
        VendorID=deps["VendorID"],
        Items=[],
    ))
    order_id = order.OrderID

    # Agregar dos ítems distintos simulando que tenemos otro ItemID (clonar el existente variando precio)
    session_id = getattr(order, "_temp_session_id", None)
    item_id_a = deps["ItemID"]

    temp_a = add_item_to_order(db_session, order_id, company_id, branch_id, session_id, {
        "ItemID": item_id_a,
        "Quantity": 2,
        "WarehouseID": deps["WarehouseID"],
        "UnitPrice": 10.0,
        "Description": "Item A",
    })
    session_id_effective = str(temp_a.OrderSessionID)

    # Para un segundo ítem necesitamos realmente otro Item en la base. Creamos uno rápido vía SQL directo.
    from sqlalchemy import text
    second_item_id = db_session.execute(text(
        f"INSERT INTO Items (CompanyID, BranchID, BrandID, ItemCode, ItemDescription, ItemCategoryID, ItemSubcategoryID, SupplierID, ControlStock, ReplenishmentStock, IsOffer, OEM, LastModified, WarehouseID, IsActive) OUTPUT INSERTED.ItemID VALUES ({company_id},{branch_id},{deps['BrandID']}, 'CODE2','Second Item',{deps['ItemCategoryID']},{deps['ItemSubcategoryID']},{deps['SupplierID']},0,0,0,NULL,GETDATE(),{deps['WarehouseID']},1)"
    )).scalar()
    db_session.commit()

    add_item_to_order(db_session, order_id, company_id, branch_id, session_id_effective, {
        "ItemID": second_item_id,
        "Quantity": 1,
        "WarehouseID": deps["WarehouseID"],
        "UnitPrice": 25.0,
        "Description": "Item B",
    })

    # Verificación de temporales: ahora deben existir 2 (IDs distintos)
    progress = get_order_items_in_progress(db_session, session_id_effective)
    assert len(progress) == 2

    # Finalizar migrando ambos
    finalize_order(db_session, company_id, branch_id,
                   order_id, session_id_effective)

    # Ya no debería haber temporales
    assert len(get_order_items_in_progress(
        db_session, session_id_effective)) == 0

    # Deben existir 2 OrderDetails para la orden
    details = db_session.query(OrderDetails).filter(
        OrderDetails.CompanyID == company_id,
        OrderDetails.BranchID == branch_id,
        OrderDetails.OrderID == order_id,
    ).all()
    assert len(details) == 2

    # Idempotencia: volver a finalizar no duplica
    finalize_order(db_session, company_id, branch_id,
                   order_id, session_id_effective)
    details_after = db_session.query(OrderDetails).filter(
        OrderDetails.CompanyID == company_id,
        OrderDetails.BranchID == branch_id,
        OrderDetails.OrderID == order_id,
    ).all()
    assert len(details_after) == 2
