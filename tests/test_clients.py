import pytest
from app.graphql.crud.clients import create_clients, get_clients, update_clients, delete_clients
from app.graphql.schemas.clients import ClientsCreate, ClientsUpdate
from app.models.companydata import CompanyData
from app.models.branches import Branches


def test_create_get_update_delete_clients(db_session):
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
    data = ClientsCreate(CompanyID=company.CompanyID, BranchID=branch.BranchID, FirstName="Cliente Test",
                         DocTypeID=1, CountryID=1, ProvinceID=1, PriceListID=1, VendorID=1, IsActive=True)
    obj = create_clients(db_session, data)
    assert obj.FirstName == "Cliente Test"
    # Obtener
    all_objs = get_clients(db_session)
    assert any(o.ClientID == obj.ClientID for o in all_objs)
    # Actualizar
    update = ClientsUpdate(FirstName="Cliente Modificado")
    updated = update_clients(db_session, obj.ClientID, update)
    assert updated.FirstName == "Cliente Modificado"
    # Eliminar
    deleted = delete_clients(db_session, obj.ClientID)
    assert deleted.ClientID == obj.ClientID
    assert all(o.ClientID != obj.ClientID for o in get_clients(db_session))
