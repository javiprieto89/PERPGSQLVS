from datetime import datetime, timezone
import pytest
from app.graphql.crud.carmodels import create_carmodels, get_carmodels, update_carmodels, delete_carmodels
from app.graphql.schemas.carmodels import CarModelsCreate, CarModelsUpdate
from app.models.carbrands import CarBrands


def test_create_get_update_delete_carmodels(db_session):
    # Crear dependencia CarBrand
    carbrand = CarBrands(CarBrandName="CarBrand Test")
    db_session.add(carbrand)
    db_session.commit()
    db_session.refresh(carbrand)
    # Crear
    data = CarModelsCreate(CarBrandID=carbrand.CarBrandID, Model="Modelo Test")
    obj = create_carmodels(db_session, data)
    assert obj.Model == "Modelo Test"
    # Obtener
    all_objs = get_carmodels(db_session)
    assert any(o.CarModelID == obj.CarModelID for o in all_objs)
    # Actualizar
    update = CarModelsUpdate(Model="Modelo Modificado")
    updated = update_carmodels(db_session, obj.CarModelID, update)
    assert updated.Model == "Modelo Modificado"
    # Eliminar
    deleted = delete_carmodels(db_session, obj.CarModelID)
    assert deleted.CarModelID == obj.CarModelID
    assert all(o.CarModelID != obj.CarModelID for o in get_carmodels(db_session))