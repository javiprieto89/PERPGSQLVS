from datetime import datetime, timezone
import pytest
from app.graphql.crud.carbrands import create_carbrands, get_carbrands, update_carbrands, delete_carbrands
from app.graphql.schemas.carbrands import CarBrandsCreate, CarBrandsUpdate


def test_create_get_update_delete_carbrands(db_session):
    # Crear
    data = CarBrandsCreate(Name="CarBrand Test")
    obj = create_carbrands(db_session, data)
    assert obj.Name == "CarBrand Test"
    # Obtener
    all_objs = get_carbrands(db_session)
    assert any(o.CarBrandID == obj.CarBrandID for o in all_objs)
    # Actualizar
    update = CarBrandsUpdate(Name="CarBrand Modificada")
    updated = update_carbrands(db_session, obj.CarBrandID, update)
    assert updated.Name == "CarBrand Modificada"
    # Eliminar
    deleted = delete_carbrands(db_session, obj.CarBrandID)
    assert deleted.CarBrandID == obj.CarBrandID
    assert all(o.CarBrandID != obj.CarBrandID for o in get_carbrands(db_session))