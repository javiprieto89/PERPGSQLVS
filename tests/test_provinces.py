import pytest
from app.graphql.crud.provinces import create_provinces, get_provinces, update_provinces, delete_provinces
from app.graphql.schemas.provinces import ProvincesCreate, ProvincesUpdate


def test_create_get_update_delete_provinces(db_session):
    # Crear
    data = ProvincesCreate(Name="Provincia Test")
    obj = create_provinces(db_session, data)
    assert obj.Name == "Provincia Test"
    # Obtener
    all_objs = get_provinces(db_session)
    assert any(o.ProvinceID == obj.ProvinceID for o in all_objs)
    # Actualizar
    update = ProvincesUpdate(Name="Provincia Modificada")
    updated = update_provinces(db_session, obj.ProvinceID, update)
    assert updated.Name == "Provincia Modificada"
    # Eliminar
    deleted = delete_provinces(db_session, obj.ProvinceID)
    assert deleted.ProvinceID == obj.ProvinceID
    assert all(o.ProvinceID != obj.ProvinceID for o in get_provinces(db_session))
