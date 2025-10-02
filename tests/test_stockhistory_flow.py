import pytest
from app.graphql.crud.tempstockhistorydetails import (
    create_tempstock_entry,
    get_tempstock_entries,
    delete_tempstock_entry,
)
from app.graphql.crud.stockhistorydetails import (
    migrate_temp_to_history,
    get_stock_history_details,
)


@pytest.mark.usefixtures("order_base_dependencies")
def test_temp_to_stockhistory_migration(db_session, order_base_dependencies):
    deps = order_base_dependencies
    company_id = deps["CompanyID"]
    branch_id = deps["BranchID"]
    # Crear 2 entradas temporales
    entry1 = create_tempstock_entry(db_session, {
        "CompanyID": company_id,
        "BranchID": branch_id,
        "UserID": deps["UserID"],
        "ItemID": deps["ItemID"],
        "WarehouseID": deps["WarehouseID"],
        "Quantity": 5,
        "Reason": "Ingreso inicial",
    })
    entry2 = create_tempstock_entry(db_session, {
        "CompanyID": company_id,
        "BranchID": branch_id,
        "UserID": deps["UserID"],
        "ItemID": deps["ItemID"],
        "WarehouseID": deps["WarehouseID"],
        "Quantity": 3,
        "Reason": "Ajuste",
    })
    temps = get_tempstock_entries(db_session, company_id, branch_id)
    assert len(temps) >= 2
    # Migrar a un StockHistoryID artificial (ej: 1)
    migrated = migrate_temp_to_history(
        db_session, company_id, branch_id, stock_history_id=1)
    assert migrated >= 2
    # Verificar que existen detalles creados
    details = get_stock_history_details(
        db_session, company_id, branch_id, stock_history_id=1)
    assert len(details) >= 2
    # Borrar una entrada temporal residual (si quedó alguna no procesada)
    remaining = [t for t in get_tempstock_entries(
        db_session, company_id, branch_id) if t.IsProcessed == 0]
    for r in remaining:
        delete_tempstock_entry(db_session, company_id,
                               branch_id, r.TempStockEntryID)
    # Afirmar que ya no quedan sin procesar
    assert all(t.IsProcessed == 1 for t in get_tempstock_entries(
        db_session, company_id, branch_id))
