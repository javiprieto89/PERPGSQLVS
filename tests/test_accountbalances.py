import pytest
from app.graphql.crud.accountbalances import create_accountbalances, get_accountbalances, update_accountbalances, delete_accountbalances
from app.graphql.schemas.accountbalances import AccountBalancesCreate, AccountBalancesUpdate
from app.models.companydata import CompanyData
from app.models.branches import Branches


def test_create_get_update_delete_accountbalances(db_session):
    # Crear
    data = AccountBalancesCreate(Balance=100.0)
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
