import pytest
from app.graphql.crud.branches import create_branches, get_branches, update_branches, delete_branches
from app.graphql.schemas.branches import BranchesCreate, BranchesUpdate
from app.models.companydata import CompanyData


def test_create_get_update_delete_branches(db_session):
    # Crear dependencia CompanyData
    company = CompanyData(Name="Test Company")
    db_session.add(company)
    db_session.commit()
    db_session.refresh(company)
    # Crear
    data = BranchesCreate(CompanyID=company.CompanyID, Name="Sucursal Test")
    obj = create_branches(db_session, data)
    assert obj.Name == "Sucursal Test"
    # Obtener
    all_objs = get_branches(db_session)
    assert any(o.BranchID == obj.BranchID for o in all_objs)
    # Actualizar
    update = BranchesUpdate(Name="Sucursal Modificada")
    updated = update_branches(db_session, obj.BranchID, update)
    assert updated.Name == "Sucursal Modificada"
    # Eliminar
    deleted = delete_branches(db_session, obj.BranchID)
    assert deleted.BranchID == obj.BranchID
    assert all(o.BranchID != obj.BranchID for o in get_branches(db_session))
