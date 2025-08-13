import pytest
from app.graphql.crud.brands import create_brands, get_brands, update_brands, delete_brands
from app.graphql.schemas.brands import BrandsCreate, BrandsUpdate
from app.models.companydata import CompanyData


def test_create_get_update_delete_brands(db_session):
    # Crear dependencia CompanyData
    company = CompanyData(Name="Test Company")
    db_session.add(company)
    db_session.commit()
    db_session.refresh(company)
    # Crear
    data = BrandsCreate(Name="Marca Test", IsActive=True,
                        CompanyID=company.CompanyID)
    obj = create_brands(db_session, data)
    assert obj.Name == "Marca Test"
    # Obtener
    all_brands = get_brands(db_session)
    assert any(b.BrandID == obj.BrandID for b in all_brands)
    # Actualizar
    update = BrandsUpdate(Name="Marca Modificada")
    updated = update_brands(db_session, obj.BrandID, update)
    assert updated.Name == "Marca Modificada"
    # Eliminar
    deleted = delete_brands(db_session, obj.BrandID)
    assert deleted.BrandID == obj.BrandID
    assert all(b.BrandID != obj.BrandID for b in get_brands(db_session))
