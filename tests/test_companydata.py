from datetime import datetime, timezone
import pytest
from app.graphql.crud.company import create_company, get_company, update_company, delete_company
from app.graphql.schemas.company import CompanyCreate, CompanyUpdate


def test_create_get_update_delete_company(db_session):
    # Crear
    data = CompanyCreate(Name="Empresa Test")
    obj = create_company(db_session, data)
    assert obj.Name == "Empresa Test"
    # Obtener
    all_objs = get_company(db_session)
    assert any(o.CompanyID == obj.CompanyID for o in all_objs)
    # Actualizar
    update = CompanyUpdate(Name="Empresa Modificada")
    updated = update_company(db_session, obj.CompanyID, update)
    assert updated.Name == "Empresa Modificada"
    # Eliminar
    deleted = delete_company(db_session, obj.CompanyID)
    assert deleted.CompanyID == obj.CompanyID
    assert all(o.CompanyID != obj.CompanyID for o in get_company(db_session))