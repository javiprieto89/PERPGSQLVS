from types import SimpleNamespace

from app.graphql.crud.warehouses import (
    create_warehouses,
    delete_warehouses,
    get_warehouses,
    get_warehouses_by_id,
    update_warehouses,
)
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_warehouse_payload(company_id: int, name: str, address: str):
    return SimpleNamespace(
        CompanyID=company_id,
        WarehouseName=name,
        Addres=address,
    )


def _execute_warehouses_operation(db_session, company_id: int, operation: str):
    def _logic():
        if operation == "insert":
            warehouse = create_warehouses(
                db_session,
                _build_warehouse_payload(company_id, unique_code("Warehouse"), "Dir 1"),
            )
            return "ok", {"warehouse_id": warehouse.WarehouseID}

        if operation == "read":
            warehouse = create_warehouses(
                db_session,
                _build_warehouse_payload(company_id, unique_code("WarehouseR"), "Dir 2"),
            )
            fetched = get_warehouses_by_id(db_session, warehouse.WarehouseID)
            if not fetched:
                return "error", "warehouses_read_not_found"
            return "ok", {"warehouse_id": fetched.WarehouseID}

        if operation == "read_all":
            create_warehouses(
                db_session,
                _build_warehouse_payload(company_id, unique_code("WarehouseA"), "Dir 3"),
            )
            results = get_warehouses(db_session)
            if not results:
                return "error", "warehouses_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            warehouse = create_warehouses(
                db_session,
                _build_warehouse_payload(company_id, unique_code("WarehouseU"), "Dir 4"),
            )
            new_name = unique_code("WarehouseU2")
            updated = update_warehouses(
                db_session,
                warehouse.WarehouseID,
                SimpleNamespace(WarehouseName=new_name, Addres="Dir 4 bis"),
            )
            if not updated or updated.WarehouseName != new_name:
                return "error", "warehouses_update_failed"
            return "ok", {"warehouse_id": updated.WarehouseID}

        if operation == "delete":
            warehouse = create_warehouses(
                db_session,
                _build_warehouse_payload(company_id, unique_code("WarehouseD"), "Dir 5"),
            )
            delete_warehouses(db_session, warehouse.WarehouseID)
            remaining = {w.WarehouseID for w in get_warehouses(db_session)}
            if warehouse.WarehouseID in remaining:
                return "error", "warehouses_delete_failed"
            return "ok", {"warehouse_id": warehouse.WarehouseID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_warehouses_flow(db_session, tenant_ids):
    company_id, _ = tenant_ids
    run_entity_flow(
        "warehouses",
        "insert",
        lambda op: _execute_warehouses_operation(db_session, company_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
