from app.graphql.crud.countries import (
    create_countries,
    delete_countries,
    get_countries,
    get_countries_by_id,
    update_countries,
)
from app.graphql.schemas.countries import CountriesCreate, CountriesUpdate
from tests.interactive import run_entity_flow, safe_db_call, unique_code


def _execute_countries_operation(db_session, operation: str):
    def _logic():
        if operation == "insert":
            country = create_countries(
                db_session,
                CountriesCreate(Name=unique_code("Country")),
            )
            return "ok", {"country_id": country.CountryID}

        if operation == "read":
            country = create_countries(
                db_session,
                CountriesCreate(Name=unique_code("CountryR")),
            )
            fetched = get_countries_by_id(db_session, country.CountryID)
            if not fetched:
                return "error", "countries_read_not_found"
            return "ok", {"country_id": fetched.CountryID}

        if operation == "read_all":
            create_countries(
                db_session,
                CountriesCreate(Name=unique_code("CountryA")),
            )
            results = get_countries(db_session)
            if not results:
                return "error", "countries_read_all_empty"
            return "ok", {"count": len(results)}

        if operation == "update":
            country = create_countries(
                db_session,
                CountriesCreate(Name=unique_code("CountryU")),
            )
            new_name = unique_code("CountryU2")
            updated = update_countries(
                db_session,
                country.CountryID,
                CountriesUpdate(Name=new_name),
            )
            if not updated:
                return "error", "countries_update_not_found"
            return "ok", {"country_id": updated.CountryID}

        if operation == "delete":
            country = create_countries(
                db_session,
                CountriesCreate(Name=unique_code("CountryD")),
            )
            delete_countries(db_session, country.CountryID)
            remaining = {c.CountryID for c in get_countries(db_session)}
            if country.CountryID in remaining:
                return "error", "countries_delete_failed"
            return "ok", {"country_id": country.CountryID}

        return "error", f"operacion_no_soportada:{operation}"

    return safe_db_call(db_session, _logic)


def test_countries_flow(db_session):
    run_entity_flow(
        "countries",
        "insert",
        lambda op: _execute_countries_operation(db_session, op),
        valid_ops={"insert", "read", "read_all", "update", "delete"},
    )
