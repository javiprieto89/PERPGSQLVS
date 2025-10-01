from datetime import datetime, timezone
import pytest
from app.graphql.crud.countries import create_countries, get_countries, update_countries, delete_countries
from app.graphql.schemas.countries import CountriesCreate, CountriesUpdate


def test_create_get_update_delete_countries(db_session):
    # Crear
    data = CountriesCreate(Name="País Test")
    obj = create_countries(db_session, data)
    assert obj.Name == "País Test"
    # Obtener
    all_objs = get_countries(db_session)
    assert any(o.CountryID == obj.CountryID for o in all_objs)
    # Actualizar
    update = CountriesUpdate(Name="País Modificado")
    updated = update_countries(db_session, obj.CountryID, update)
    assert updated.Name == "País Modificado"
    # Eliminar
    deleted = delete_countries(db_session, obj.CountryID)
    assert deleted.CountryID == obj.CountryID
    assert all(o.CountryID != obj.CountryID for o in get_countries(db_session))