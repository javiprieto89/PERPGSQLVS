from datetime import datetime, timezone
import pytest
from app.graphql.crud.branches import create_branches, get_branches, update_branches, delete_branches
from app.graphql.schemas.branches import BranchesCreate, BranchesUpdate
from app.models.company import Company


def test_create_get_update_delete_branches(db_session):
    # Crear dependencia Company
    company = db_session.query(Company).first()
    if not company:
        company = Company(CompanyName="Test Company", Address="Addr", CUIT="1",
                          GrossIncome="GI", StartDate=datetime.now(timezone.utc).date(), Logo=b"-")
        db_session.add(company)
        db_session.commit()
        db_session.refresh(company)
    # Crear
    data = BranchesCreate(CompanyID=company.CompanyID,
                          BranchName="Sucursal Test")
    obj = create_branches(db_session, data)
    assert obj.BranchName == "Sucursal Test"
    # Obtener
    all_objs = get_branches(db_session)
    assert any(o.BranchID == obj.BranchID for o in all_objs)
    # Actualizar
    update = BranchesUpdate(BranchName="Sucursal Modificada")
    updated = update_branches(db_session, obj.CompanyID, obj.BranchID, update)
    assert updated.BranchName == "Sucursal Modificada"
    # Eliminar
    deleted = delete_branches(db_session, obj.CompanyID, obj.BranchID)
    assert deleted.BranchID == obj.BranchID
    assert all(o.BranchID != obj.BranchID for o in get_branches(db_session))
