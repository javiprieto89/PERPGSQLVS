from datetime import datetime, timezone
import pytest
from app.graphql.crud.accountbalances import create_accountbalances, get_accountbalances, update_accountbalances, delete_accountbalances
from app.graphql.schemas.accountbalances import AccountBalancesCreate, AccountBalancesUpdate
from app.models.company import Company
from app.models.branches import Branches


def test_create_get_update_delete_accountbalances(db_session):
    # Crear
    company = db_session.query(Company).first()
    if not company:
        company = Company(CompanyName="TestCo", Address="Addr", CUIT="123", GrossIncome="GI", StartDate=datetime.now(timezone.utc).date(), Logo=b"-")
        db_session.add(company); db_session.commit(); db_session.refresh(company)
    branch = db_session.query(Branches).filter(Branches.CompanyID == company.CompanyID).first()
    if not branch:
        branch = Branches(CompanyID=company.CompanyID, BranchName="Main", Address="Addr", Phone="000", Logo=b"-")
        db_session.add(branch); db_session.commit(); db_session.refresh(branch)

    data = AccountBalancesCreate(CompanyID=company.CompanyID, BranchID=branch.BranchID, Balance=100.0)
    obj = create_accountbalances(db_session, data)
    assert obj.Balance == 100.0
    # Obtener
    all_objs = get_accountbalances(db_session)
    assert any(o.AccountID == obj.AccountID for o in all_objs)
    # Actualizar
    update = AccountBalancesUpdate(Balance=200.0)
    updated = update_accountbalances(db_session, obj.AccountID, update)
    assert updated.Balance == 200.0
    # Eliminar
    deleted = delete_accountbalances(db_session, obj.AccountID)
    assert deleted.AccountID == obj.AccountID
    assert all(o.AccountID !=
               obj.AccountID for o in get_accountbalances(db_session))