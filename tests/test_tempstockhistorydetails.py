import pytest
from app.graphql.crud.tempstockhistorydetails import (
    create_tempstockhistorydetails,
    get_tempstockhistorydetails,
    update_tempstockhistorydetails,
    delete_tempstockhistorydetails,
)
from app.graphql.schemas.tempstockhistorydetails import (
    TempStockHistoryDetailsCreate,
    TempStockHistoryDetailsUpdate,
)


@pytest.mark.usefixtures("order_base_dependencies")
def test_create_get_update_delete_tempstockhistorydetails(db_session, order_base_dependencies):
    deps = order_base_dependencies
    create_data = TempStockHistoryDetailsCreate(
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        UserID=deps["UserID"],
        ItemID=deps["ItemID"],
        WarehouseID=deps["WarehouseID"],
        Quantity=5,
        Reason="Carga inicial",
    )
    obj = create_tempstockhistorydetails(db_session, create_data)
    assert obj.Quantity == 5

    # Obtener todos y validar que aparece
    all_objs = get_tempstockhistorydetails(db_session)
    assert any(
        o.TempStockEntryID == obj.TempStockEntryID
        and o.CompanyID == deps["CompanyID"]
        and o.BranchID == deps["BranchID"]
        for o in all_objs
    )

    # Actualizar cantidad
    update_data = TempStockHistoryDetailsUpdate(Quantity=9, Reason="Ajuste")
    updated = update_tempstockhistorydetails(db_session, obj.TempStockEntryID, update_data)
    assert updated is not None
    assert updated.Quantity == 9
    assert updated.Reason == "Ajuste"

    # Eliminar
    deleted = delete_tempstockhistorydetails(db_session, obj.TempStockEntryID)
    assert deleted is not None
    assert deleted.TempStockEntryID == obj.TempStockEntryID
    remaining_ids = [o.TempStockEntryID for o in get_tempstockhistorydetails(db_session)]
    assert obj.TempStockEntryID not in remaining_ids