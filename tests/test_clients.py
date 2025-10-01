from datetime import datetime, timezone
import pytest
from app.graphql.crud.clients import create_clients, get_clients, update_clients, delete_clients
from app.graphql.schemas.clients import ClientsCreate, ClientsUpdate
from app.models.company import Company
from app.models.branches import Branches


# --- FK helpers injected ---
def _ensure_min_refs_for_clients(db):
    # try to import ORM models; fall back to CRUD if needed
    try:
        from app.models.countries import Countries
        from app.models.provinces import Provinces
        from app.models.pricelists import PriceLists
        from app.models.vendors import Vendors
        from app.models.sysidentitydoctypes import SysIdentityDocTypes
    except Exception:
        Countries = Provinces = PriceLists = Vendors = SysIdentityDocTypes = None

    # Create Country if none
    country_id = None
    if Countries:
        obj = db.query(Countries).first()
        if not obj:
            obj = Countries(CountryName="Test Country")
            db.add(obj); db.commit(); db.refresh(obj)
        country_id = getattr(obj, "CountryID", None)

    # Create Province if none (needs country)
    province_id = None
    if Provinces:
        obj = db.query(Provinces).first()
        if not obj:
            kwargs = {"ProvinceName":"Test Province"}
            if country_id is not None:
                kwargs["CountryID"] = country_id
            obj = Provinces(**kwargs)
            db.add(obj); db.commit(); db.refresh(obj)
        province_id = getattr(obj, "ProvinceID", None)
        if country_id and hasattr(obj, "CountryID") and getattr(obj, "CountryID", None) != country_id:
            # align province country if mismatch
            try:
                setattr(obj, "CountryID", country_id); db.add(obj); db.commit()
            except Exception: db.rollback()

    # Create PriceList if none
    pricelist_id = None
    if PriceLists:
        obj = db.query(PriceLists).first()
        if not obj:
            kwargs = {"PriceListName":"Test PriceList"}
            if country_id is not None and hasattr(PriceLists, "CountryID"):
                kwargs["CountryID"] = country_id
            if province_id is not None and hasattr(PriceLists, "ProvinceID"):
                kwargs["ProvinceID"] = province_id
            obj = PriceLists(**kwargs)
            db.add(obj); db.commit(); db.refresh(obj)
        pricelist_id = getattr(obj, "PriceListID", None)

    # Create Vendor if none
    vendor_id = None
    if Vendors:
        obj = db.query(Vendors).first()
        if not obj:
            obj = Vendors(VendorName="Test Vendor")
            db.add(obj); db.commit(); db.refresh(obj)
        vendor_id = getattr(obj, "VendorID", None)

    # Ensure a DocType
    doctype_id = None
    if SysIdentityDocTypes:
        obj = db.query(SysIdentityDocTypes).first()
        if not obj:
            obj = SysIdentityDocTypes(DocTypeName="DNI")
            db.add(obj); db.commit(); db.refresh(obj)
        doctype_id = getattr(obj, "DocTypeID", None)

    return {
        "CountryID": country_id or 1,
        "ProvinceID": province_id or 1,
        "PriceListID": pricelist_id or 1,
        "VendorID": vendor_id or 1,
        "DocTypeID": doctype_id or 1
    }
# --- end helpers ---


def test_create_get_update_delete_clients(db_session):
    # Crear dependencias mínimas
    company = Company(CompanyName="Test Company")
    db_session.add(company)
    db_session.commit()
    db_session.refresh(company)
    branch = Branches(CompanyID=company.CompanyID, BranchName="Sucursal Test")
    db_session.add(branch)
    db_session.commit()
    db_session.refresh(branch)
    # Crear
    data = fk = _get_fk_ids(db_session)
    ClientsCreate(CompanyID=company.CompanyID, BranchID=branch.BranchID, FirstName="Cliente Test",
                         DocTypeID=fk.get("DocTypeID"), CountryID=fk.get("CountryID"), ProvinceID=fk.get("ProvinceID"), PriceListID=fk.get("PriceListID"), VendorID=fk.get("VendorID"), IsActive=True)
    obj = create_clients(db_session, data)
    assert obj.FirstName == "Cliente Test"
    # Crear cliente sin sucursal
    data_without_branch = ClientsCreate(
        CompanyID=company.CompanyID,
        BranchID=None,
        FirstName="Cliente Sin Sucursal",
        DocTypeID=1,
        CountryID=1,
        ProvinceID=1,
        PriceListID=1,
        VendorID=1,
        IsActive=True,
    )
    obj_without_branch = create_clients(db_session, data_without_branch)
    assert obj_without_branch.BranchID is None
    # Verificar consulta por BranchID None
    clients_without_branch = get_clients_by_branch(
        db_session, company.CompanyID, None)
    assert any(
        c.ClientID == obj_without_branch.ClientID for c in clients_without_branch)

    # Limpieza del cliente sin sucursal
    delete_clients(db_session, obj_without_branch.ClientID)

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