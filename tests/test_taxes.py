from app.graphql.crud.taxes import (
    create_taxes,
    delete_taxes,
    get_taxes,
    get_taxes_by_id,
    update_taxes,
)
from app.graphql.schemas.taxes import TaxesCreate, TaxesUpdate
from app.models.countries import Countries
from app.models.provinces import Provinces
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _ensure_geography(db_session):
    country = db_session.query(Countries).first()
    if not country:
        country = Countries(CountryName="SeedCountry")
        db_session.add(country)
        db_session.commit()
        db_session.refresh(country)

    province = (
        db_session.query(Provinces)
        .filter(Provinces.CountryID == getattr(country, "CountryID"))
        .first()
    )
    if not province:
        province = Provinces(
            CountryID=getattr(country, "CountryID"),
            ProvinceName="SeedProvince",
        )
        db_session.add(province)
        db_session.commit()
        db_session.refresh(province)

    return {
        "country_id": getattr(country, "CountryID"),
        "province_id": getattr(province, "ProvinceID"),
    }


def _build_tax_payload(company_id, branch_id, country_id, province_id, name, percent):
    payload = TaxesCreate(
        CompanyID=company_id,
        CountryID=country_id,
        ProvinceID=province_id,
        TaxName=name,
        TaxPercent=float(percent),
        IsActive=True,
    )
    setattr(payload, "BranchID", branch_id)
    return payload


def _execute_taxes_operation(db_session, deps, operation: str):
    def _logic():
        company_id = deps["company_id"]
        branch_id = deps["branch_id"]
        country_id = deps["country_id"]
        province_id = deps["province_id"]

        if operation == "insert":
            payload = _build_tax_payload(
                company_id,
                branch_id,
                country_id,
                province_id,
                unique_code("Tax"),
                21.0,
            )
            tax = create_taxes(db_session, payload)
            return "ok", {"tax_id": tax.TaxID}

        if operation == "read":
            payload = _build_tax_payload(
                company_id,
                branch_id,
                country_id,
                province_id,
                unique_code("TaxR"),
                10.0,
            )
            tax = create_taxes(db_session, payload)
            fetched = get_taxes_by_id(db_session, tax.TaxID)
            if not fetched:
                return "error", "taxes_read_not_found"
            return "ok", {"tax_id": fetched.TaxID}

        if operation == "read_all":
            payload = _build_tax_payload(
                company_id,
                branch_id,
                country_id,
                province_id,
                unique_code("TaxA"),
                12.5,
            )
            create_taxes(db_session, payload)
            results = get_taxes(db_session)
            if not results:
                return "error", "taxes_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            payload = _build_tax_payload(
                company_id,
                branch_id,
                country_id,
                province_id,
                unique_code("TaxU"),
                15.0,
            )
            tax = create_taxes(db_session, payload)
            new_percent = 19.5
            updated = update_taxes(
                db_session,
                tax.TaxID,
                TaxesUpdate(TaxPercent=new_percent, TaxName=unique_code("TaxU2")),
            )
            if not updated or float(updated.TaxPercent) != float(new_percent):
                return "error", "taxes_update_failed"
            return "ok", {"tax_id": updated.TaxID}

        if operation == "delete":
            payload = _build_tax_payload(
                company_id,
                branch_id,
                country_id,
                province_id,
                unique_code("TaxD"),
                8.0,
            )
            tax = create_taxes(db_session, payload)
            delete_taxes(db_session, tax.TaxID)
            remaining = {t.TaxID for t in get_taxes(db_session)}
            if tax.TaxID in remaining:
                return "error", "taxes_delete_failed"
            return "ok", {"tax_id": tax.TaxID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_taxes_flow(db_session, tenant_ids):
    company_id, branch_id = tenant_ids
    geo = _ensure_geography(db_session)
    deps = {
        "company_id": company_id,
        "branch_id": branch_id,
        **geo,
    }
    run_entity_flow(
        "taxes",
        "insert",
        lambda op: _execute_taxes_operation(db_session, deps, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
