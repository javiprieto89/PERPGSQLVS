from app.graphql.crud.suppliers import (
    create_suppliers,
    delete_suppliers,
    get_suppliers,
    get_suppliers_by_id,
    update_suppliers,
)
from app.graphql.schemas.suppliers import SuppliersCreate, SuppliersUpdate
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_supplier_input(deps, first_name: str) -> SuppliersCreate:
    return SuppliersCreate(
        CompanyID=deps["CompanyID"],
        DocTypeID=deps["DocTypeID"],
        DocNumber=unique_code("DOC"),
        FirstName=first_name,
        LastName="Proveedor",
        Phone="000",
        Email=f"{unique_code('supplier').lower()}@mail.test",
        Address="Dirección proveedor",
        City="Ciudad",
        PostalCode="CP",
        IsActive=True,
        CountryID=deps["CountryID"],
        ProvinceID=deps["ProvinceID"],
    )


def _execute_suppliers_operation(db_session, deps, operation: str):
    def _logic():
        if operation == "insert":
            supplier = create_suppliers(
                db_session,
                _build_supplier_input(deps, unique_code("Proveedor")),
            )
            return "ok", {"supplier_id": supplier.SupplierID}

        if operation == "read":
            supplier = create_suppliers(
                db_session,
                _build_supplier_input(deps, unique_code("ProveedorR")),
            )
            fetched = get_suppliers_by_id(db_session, supplier.SupplierID)
            if not fetched:
                return "error", "suppliers_read_not_found"
            return "ok", {"supplier_id": fetched.SupplierID}

        if operation == "read_all":
            create_suppliers(
                db_session,
                _build_supplier_input(deps, unique_code("ProveedorA")),
            )
            results = get_suppliers(db_session)
            if not results:
                return "error", "suppliers_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            supplier = create_suppliers(
                db_session,
                _build_supplier_input(deps, unique_code("ProveedorU")),
            )
            new_name = unique_code("ProveedorU2")
            update_suppliers(
                db_session,
                supplier.SupplierID,
                SuppliersUpdate(FirstName=new_name),
            )
            refreshed = get_suppliers_by_id(db_session, supplier.SupplierID)
            if not refreshed or refreshed.FirstName != new_name:
                return "error", "suppliers_update_failed"
            return "ok", {"supplier_id": supplier.SupplierID}

        if operation == "delete":
            supplier = create_suppliers(
                db_session,
                _build_supplier_input(deps, unique_code("ProveedorD")),
            )
            delete_suppliers(db_session, supplier.SupplierID)
            remaining = {s.SupplierID for s in get_suppliers(db_session)}
            if supplier.SupplierID in remaining:
                return "error", "suppliers_delete_failed"
            return "ok", {"supplier_id": supplier.SupplierID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_suppliers_flow(db_session, order_base_dependencies):
    deps = order_base_dependencies
    run_entity_flow(
        "suppliers",
        "insert",
        lambda op: _execute_suppliers_operation(db_session, deps, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
