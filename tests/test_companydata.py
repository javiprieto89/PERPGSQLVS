import pytest
from app.graphql.crud.companydata import create_companydata, get_companydata, update_companydata, delete_companydata
from app.graphql.schemas.companydata import CompanyDataCreate, CompanyDataUpdate


def test_create_get_update_delete_companydata(db_session):
    # Crear
    data = CompanyDataCreate(Name="Empresa Test")
    obj = create_companydata(db_session, data)
    assert obj.Name == "Empresa Test"
    # Obtener
    all_objs = get_companydata(db_session)
    assert any(o.CompanyID == obj.CompanyID for o in all_objs)
    # Actualizar
    update = CompanyDataUpdate(Name="Empresa Modificada")
    updated = update_companydata(db_session, obj.CompanyID, update)
    assert updated.Name == "Empresa Modificada"
    # Eliminar
    deleted = delete_companydata(db_session, obj.CompanyID)
    assert deleted.CompanyID == obj.CompanyID
    assert all(o.CompanyID != obj.CompanyID for o in get_companydata(db_session))
