from types import SimpleNamespace

from app.graphql.crud.clients import (
    create_clients,
    delete_clients,
    get_clients,
    get_clients_by_company,
    get_clients_by_id,
    update_clients,
)
from app.graphql.schemas.clients import ClientsCreate, ClientsUpdate
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _build_client_input(deps, first_name: str, branch_id):
    return ClientsCreate(
        CompanyID=deps["CompanyID"],
        BranchID=branch_id,
        DocTypeID=deps["DocTypeID"],
        DocNumber=unique_code("DOC"),
        FirstName=first_name,
        LastName="Apellido",
        Phone="000",
        Email=f"{unique_code('client').lower()}@mail.test",
        Address="Dirección test",
        City="Ciudad",
        PostalCode="CP",
        IsActive=True,
        CountryID=deps["CountryID"],
        ProvinceID=deps["ProvinceID"],
        PriceListID=deps["PriceListID"],
        VendorID=deps["VendorID"],
    )


def _execute_clients_operation(db_session, deps, operation: str):
    company_id = deps["CompanyID"]
    branch_id = deps["BranchID"]

    def _logic():
        if operation == "insert":
            client = create_clients(
                db_session,
                _build_client_input(deps, unique_code("Cliente"), branch_id),
            )
            return "ok", {"client_id": client.ClientID}

        if operation == "read":
            client = create_clients(
                db_session,
                _build_client_input(deps, unique_code("ClienteR"), branch_id),
            )
            fetched = get_clients_by_id(db_session, client.ClientID)
            if not fetched:
                return "error", "clients_read_not_found"
            return "ok", {"client_id": fetched.ClientID}

        if operation == "read_all":
            create_clients(
                db_session,
                _build_client_input(deps, unique_code("ClienteA"), branch_id),
            )
            results = get_clients_by_company(db_session, company_id)
            if not results:
                return "error", "clients_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            client = create_clients(
                db_session,
                _build_client_input(deps, unique_code("ClienteU"), branch_id),
            )
            new_name = unique_code("ClienteU2")
            update_clients(
                db_session,
                client.ClientID,
                ClientsUpdate(FirstName=new_name),
            )
            refreshed = get_clients_by_id(db_session, client.ClientID)
            if not refreshed or refreshed.FirstName != new_name:
                return "error", "clients_update_failed"
            return "ok", {"client_id": client.ClientID}

        if operation == "delete":
            client = create_clients(
                db_session,
                _build_client_input(deps, unique_code("ClienteD"), branch_id),
            )
            delete_clients(db_session, client.ClientID)
            remaining = {c.ClientID for c in get_clients(db_session)}
            if client.ClientID in remaining:
                return "error", "clients_delete_failed"
            return "ok", {"client_id": client.ClientID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_clients_flow(db_session, order_base_dependencies):
    deps = order_base_dependencies
    run_entity_flow(
        "clients",
        "insert",
        lambda op: _execute_clients_operation(db_session, deps, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
