from sqlalchemy import text

from app.graphql.crud.itemtaxes import create_itemtaxes, get_itemtaxes
from app.graphql.crud.taxes import create_taxes
from app.graphql.schemas.itemtaxes import ItemTaxesCreate
from app.graphql.schemas.taxes import TaxesCreate
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _create_tax(db_session, deps, tax_name: str, percent: float):
    payload = TaxesCreate(
        CompanyID=deps["CompanyID"],
        CountryID=deps["CountryID"],
        ProvinceID=deps["ProvinceID"],
        TaxName=tax_name,
        TaxPercent=percent,
        IsActive=True,
    )
    setattr(payload, "BranchID", deps["BranchID"])
    tax = create_taxes(db_session, payload)
    return tax.TaxID


def _build_item_tax_input(deps, item_id: int, tax_id: int) -> ItemTaxesCreate:
    return ItemTaxesCreate(
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        ItemID=item_id,
        TaxID=tax_id,
    )


def _update_item_tax_raw(db_session, deps, item_id: int, old_tax_id: int, new_tax_id: int):
    db_session.execute(
        text(
            """
            UPDATE ItemTaxes
            SET TaxID = :new_tax_id
            WHERE CompanyID = :company_id
              AND BranchID = :branch_id
              AND ItemID = :item_id
              AND TaxID = :old_tax_id
            """
        ),
        {
            "company_id": deps["CompanyID"],
            "branch_id": deps["BranchID"],
            "item_id": item_id,
            "old_tax_id": old_tax_id,
            "new_tax_id": new_tax_id,
        },
    )
    db_session.commit()


def _delete_item_tax_raw(db_session, deps, item_id: int, tax_id: int):
    db_session.execute(
        text(
            """
            DELETE FROM ItemTaxes
            WHERE CompanyID = :company_id
              AND BranchID = :branch_id
              AND ItemID = :item_id
              AND TaxID = :tax_id
            """
        ),
        {
            "company_id": deps["CompanyID"],
            "branch_id": deps["BranchID"],
            "item_id": item_id,
            "tax_id": tax_id,
        },
    )
    db_session.commit()


def _exists_entry(entries, deps, item_id: int, tax_id: int):
    for entry in entries:
        if (
            getattr(entry, "CompanyID", None) == deps["CompanyID"]
            and getattr(entry, "BranchID", None) == deps["BranchID"]
            and getattr(entry, "ItemID", None) == item_id
            and getattr(entry, "TaxID", None) == tax_id
        ):
            return True
    return False


def _execute_itemtaxes_operation(db_session, deps, item_id: int, operation: str):
    def _logic():
        if operation == "insert":
            tax_id = _create_tax(db_session, deps, unique_code("Tax"), 21.0)
            create_itemtaxes(
                db_session,
                _build_item_tax_input(deps, item_id, tax_id),
            )
            return "ok", {"tax_id": tax_id}

        if operation == "read":
            tax_id = _create_tax(db_session, deps, unique_code("TaxR"), 10.0)
            create_itemtaxes(
                db_session,
                _build_item_tax_input(deps, item_id, tax_id),
            )
            entries = get_itemtaxes(db_session)
            if not _exists_entry(entries, deps, item_id, tax_id):
                return "error", "itemtaxes_read_not_found"
            return "ok", {"tax_id": tax_id}

        if operation == "read_all":
            tax_id = _create_tax(db_session, deps, unique_code("TaxA"), 12.5)
            create_itemtaxes(
                db_session,
                _build_item_tax_input(deps, item_id, tax_id),
            )
            results = get_itemtaxes(db_session)
            if not results:
                return "error", "itemtaxes_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            initial_tax_id = _create_tax(db_session, deps, unique_code("TaxU"), 15.0)
            create_itemtaxes(
                db_session,
                _build_item_tax_input(deps, item_id, initial_tax_id),
            )
            new_tax_id = _create_tax(db_session, deps, unique_code("TaxU2"), 18.0)
            _update_item_tax_raw(db_session, deps, item_id, initial_tax_id, new_tax_id)
            entries = get_itemtaxes(db_session)
            if not _exists_entry(entries, deps, item_id, new_tax_id):
                return "error", "itemtaxes_update_failed"
            return "ok", {"tax_id": new_tax_id}

        if operation == "delete":
            tax_id = _create_tax(db_session, deps, unique_code("TaxD"), 5.0)
            create_itemtaxes(
                db_session,
                _build_item_tax_input(deps, item_id, tax_id),
            )
            _delete_item_tax_raw(db_session, deps, item_id, tax_id)
            entries = get_itemtaxes(db_session)
            if _exists_entry(entries, deps, item_id, tax_id):
                return "error", "itemtaxes_delete_failed"
            return "ok", {"tax_id": tax_id}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_itemtaxes_flow(db_session, seeded_dependencies, order_base_dependencies):
    deps = {
        "CompanyID": seeded_dependencies["CompanyID"],
        "BranchID": seeded_dependencies["BranchID"],
        "CountryID": order_base_dependencies["CountryID"],
        "ProvinceID": order_base_dependencies["ProvinceID"],
    }
    item_id = seeded_dependencies["ItemID"]
    run_entity_flow(
        "itemtaxes",
        "insert",
        lambda op: _execute_itemtaxes_operation(db_session, deps, item_id, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
