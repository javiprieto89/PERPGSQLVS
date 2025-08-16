import pytest
from app.graphql.crud.provinces import create_provinces, get_provinces, update_provinces, delete_provinces
from app.graphql.schemas.provinces import ProvincesCreate, ProvincesUpdate


def test_create_get_update_delete_provinces(db_session):
    # Crear con campos obligatorios y FK válida
    data = ProvincesCreate(CountryID=54, Name="Provincia Test")
    obj = create_provinces(db_session, data)
    assert obj is not None
    assert str(getattr(obj, 'Name', '')) == "Provincia Test" and int(
        getattr(obj, 'CountryID', 0)) == 54
    # Obtener
    all_objs = get_provinces(db_session)
    assert any(int(getattr(o, 'ProvinceID', 0)) == int(getattr(obj, 'ProvinceID', 0)) and int(
        getattr(o, 'CountryID', 0)) == int(getattr(obj, 'CountryID', 0)) for o in all_objs)
    # Actualizar
    update = ProvincesUpdate(Name="Provincia Modificada")
    updated = update_provinces(db_session, int(
        getattr(obj, 'CountryID', 0)), int(getattr(obj, 'ProvinceID', 0)), update)
    assert updated is not None
    assert str(getattr(updated, 'Name', '')) == "Provincia Modificada"
    # Eliminar
    deleted = delete_provinces(db_session, int(
        getattr(obj, 'CountryID', 0)), int(getattr(obj, 'ProvinceID', 0)))
    assert deleted is not None
    assert int(getattr(deleted, 'ProvinceID', 0)) == int(getattr(obj, 'ProvinceID', 0)) and int(
        getattr(deleted, 'CountryID', 0)) == int(getattr(obj, 'CountryID', 0))
    assert all(not (int(getattr(o, 'ProvinceID', 0)) == int(getattr(obj, 'ProvinceID', 0)) and int(
        getattr(o, 'CountryID', 0)) == int(getattr(obj, 'CountryID', 0))) for o in get_provinces(db_session))
