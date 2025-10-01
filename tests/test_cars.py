from datetime import datetime, timezone
import pytest
from app.graphql.crud.cars import create_cars, get_cars, update_cars, delete_cars
from app.graphql.schemas.cars import CarsCreate, CarsUpdate
from app.models.carmodels import CarModels
from app.models.clients import Clients
from app.models.discounts import Discounts
from app.models.company import Company


def test_create_get_update_delete_cars(db_session):
    # Crear dependencias mínimas
    company = Company(CompanyName="Test Company")
    db_session.add(company)
    db_session.commit()
    db_session.refresh(company)
    carmodel = CarModels(CarBrandID=1, Model="Modelo Test")
    db_session.add(carmodel)
    db_session.commit()
    db_session.refresh(carmodel)
    client = Clients(CompanyID=company.CompanyID, BranchID=1, DocTypeID=1, FirstName="Cliente Test",
                     CountryID=1, ProvinceID=1, PriceListID=1, VendorID=1, IsActive=True)
    db_session.add(client)
    db_session.commit()
    db_session.refresh(client)
    discount = Discounts(DiscountName="Descuento Test", Percentage=10.0)
    db_session.add(discount)
    db_session.commit()
    db_session.refresh(discount)
    # Crear
    data = CarsCreate(CarModelID=carmodel.CarModelID, ClientID=client.ClientID,
                      LicensePlate="ABC123", DiscountID=discount.DiscountID)
    obj = create_cars(db_session, data)
    assert obj.LicensePlate == "ABC123"
    # Obtener
    all_objs = get_cars(db_session)
    assert any(o.CarID == obj.CarID for o in all_objs)
    # Actualizar
    update = CarsUpdate(LicensePlate="XYZ789")
    updated = update_cars(db_session, obj.CarID, update)
    assert updated.LicensePlate == "XYZ789"
    # Eliminar
    deleted = delete_cars(db_session, obj.CarID)
    assert deleted.CarID == obj.CarID
    assert all(o.CarID != obj.CarID for o in get_cars(db_session))