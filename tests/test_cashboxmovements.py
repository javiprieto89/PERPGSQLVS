from datetime import datetime, timezone
import pytest
from app.graphql.crud.cashboxmovements import create_cashboxmovements, get_cashboxmovements, update_cashboxmovements, delete_cashboxmovements
from app.graphql.schemas.cashboxmovements import CashBoxMovementsCreate, CashBoxMovementsUpdate
from app.models.cashboxes import CashBoxes
from app.models.company import Company
from app.models.branches import Branches


def test_create_get_update_delete_cashboxmovements(db_session):
    # Crear dependencias mínimas
    company = Company(CompanyName="Test Company")
    db_session.add(company)
    db_session.commit()
    db_session.refresh(company)
    branch = Branches(CompanyID=company.CompanyID, BranchName="Sucursal Test")
    db_session.add(branch)
    db_session.commit()
    db_session.refresh(branch)
    cashbox = CashBoxes(CompanyID=company.CompanyID, BranchID=branch.BranchID,
                        Name="Caja Test", InitialBalance=1000.0, CurrentBalance=1000.0, IsActive=True)
    db_session.add(cashbox)
    db_session.commit()
    db_session.refresh(cashbox)
    # Crear
    data = CashBoxMovementsCreate(CashBoxID=cashbox.CashBoxID, CompanyID=company.CompanyID,
                                  BranchID=branch.BranchID, MovementDate="2025-08-11", Amount=100.0, MovementType="Ingreso")
    obj = create_cashboxmovements(db_session, data)
    assert obj.Amount == 100.0
    # Obtener
    all_objs = get_cashboxmovements(db_session)
    assert any(o.CashBoxMovementID == obj.CashBoxMovementID for o in all_objs)
    # Actualizar
    update = CashBoxMovementsUpdate(Amount=200.0)
    updated = update_cashboxmovements(
        db_session, obj.CashBoxMovementID, update)
    assert updated.Amount == 200.0
    # Eliminar
    deleted = delete_cashboxmovements(db_session, obj.CashBoxMovementID)
    assert deleted.CashBoxMovementID == obj.CashBoxMovementID
    assert all(o.CashBoxMovementID !=
               obj.CashBoxMovementID for o in get_cashboxmovements(db_session))