import pytest
from app.graphql.crud.cashboxes import create_cashboxes, get_cashboxes, update_cashboxes, delete_cashboxes
from app.graphql.schemas.cashboxes import CashBoxesCreate, CashBoxesUpdate
from app.models.companydata import CompanyData
from app.models.branches import Branches


def test_create_get_update_delete_cashboxes(db_session):
    # Crear dependencias mínimas
    company = CompanyData(Name="Test Company")
    db_session.add(company)
    db_session.commit()
    db_session.refresh(company)
    branch = Branches(CompanyID=company.CompanyID, Name="Sucursal Test")
    db_session.add(branch)
    db_session.commit()
    db_session.refresh(branch)
    # Crear
    data = CashBoxesCreate(CompanyID=company.CompanyID, BranchID=branch.BranchID,
                           Name="Caja Test", InitialBalance=1000.0, CurrentBalance=1000.0, IsActive=True)
    obj = create_cashboxes(db_session, data)
    assert obj.Name == "Caja Test"
    # Obtener
    all_objs = get_cashboxes(db_session)
    assert any(o.CashBoxID == obj.CashBoxID for o in all_objs)
    # Actualizar
    update = CashBoxesUpdate(Name="Caja Modificada")
    updated = update_cashboxes(db_session, obj.CashBoxID, update)
    assert updated.Name == "Caja Modificada"
    # Eliminar
    deleted = delete_cashboxes(db_session, obj.CashBoxID)
    assert deleted.CashBoxID == obj.CashBoxID
    assert all(o.CashBoxID != obj.CashBoxID for o in get_cashboxes(db_session))
