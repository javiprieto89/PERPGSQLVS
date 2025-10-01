from datetime import datetime, timezone
import pytest
from app.graphql.crud.brands import create_brands, get_brands, update_brands, delete_brands
from app.graphql.schemas.brands import BrandsCreate, BrandsUpdate
from app.models.company import Company


def test_create_get_update_delete_brands(db_session):
    # Crear dependencia Company
    company = db_session.query(Company).first()
    if not company:
        company = Company(CompanyName="Test Company", Address="Addr", CUIT="1", GrossIncome="GI", StartDate=datetime.now(timezone.utc).date(), Logo=b"-")
        db_session.add(company)
        db_session.commit()
        db_session.refresh(company)
    # Crear
    data = BrandsCreate(BrandName="Marca Test", IsActive=True, CompanyID=company.CompanyID)
    obj = create_brands(db_session, data)
    assert obj.BrandName == "Marca Test"
    # Obtener
    all_brands = get_brands(db_session)
    assert any(b.BrandID == obj.BrandID for b in all_brands)
    # Actualizar
    update = BrandsUpdate(BrandName="Marca Modificada")
    updated = update_brands(db_session, obj.CompanyID, obj.BrandID, update)
    assert updated.BrandName == "Marca Modificada"
    # Eliminar
    deleted = delete_brands(db_session, obj.CompanyID, obj.BrandID)
    assert deleted.BrandID == obj.BrandID
    assert all(b.BrandID != obj.BrandID for b in get_brands(db_session))