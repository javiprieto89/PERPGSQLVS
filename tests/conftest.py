from datetime import datetime, timezone
import contextlib
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db import Base
import app.models  # noqa: F401  # register models for metadata


@pytest.fixture(scope="session")
def engine():
    # Conexión a SQL Server de pruebas
    TEST_DB_URL = (
        "mssql+pyodbc://sa:Ladeda78@127.0.0.1/LubricentroDB2?driver=ODBC+Driver+17+for+SQL+Server&TrustServerCertificate=yes&Encrypt=no"
    )
    engine = create_engine(TEST_DB_URL)
    Base.metadata.create_all(engine)
    return engine


# ===== Global minimum seed to satisfy FKs across tests =====
def _seed_min_refs_util(db):
    try:
        # Import models defensively; some may not exist in all repos.
        from app.models.company import Company
        from app.models.branches import Branches
    except Exception:
        Company = Branches = None

    try:
        from app.models.countries import Countries
    except Exception:
        Countries = None

    try:
        from app.models.provinces import Provinces
    except Exception:
        Provinces = None

    try:
        from app.models.currencies import Currencies
    except Exception:
        Currencies = None

    try:
        from app.models.pricelists import PriceLists
    except Exception:
        PriceLists = None

    try:
        from app.models.vendors import Vendors
    except Exception:
        Vendors = None

    try:
        from app.models.sysidentitydoctypes import SysIdentityDocTypes
    except Exception:
        SysIdentityDocTypes = None

    # Company & Branch (some tables reference them)
    if Company and not db.query(Company).first():
        comp = Company(CompanyName="Test Company")
        db.add(comp); db.commit(); db.refresh(comp)
    else:
        comp = db.query(Company).first() if Company else None

    if Branches and not db.query(Branches).first():
        if comp and hasattr(Branches, "CompanyID"):
            br = Branches(CompanyID=getattr(comp, "CompanyID"), BranchName="Main Branch")
        else:
            br = Branches(BranchName="Main Branch")
        db.add(br); db.commit()
    # Countries
    if Countries and not db.query(Countries).first():
        c = Countries(CountryName="Test Country")
        db.add(c); db.commit(); db.refresh(c)
    else:
        c = db.query(Countries).first() if Countries else None
    # Provinces
    if Provinces and not db.query(Provinces).first():
        if c and hasattr(Provinces, "CountryID"):
            p = Provinces(CountryID=getattr(c, "CountryID"), ProvinceName="Test Province")
        else:
            p = Provinces(ProvinceName="Test Province")
        db.add(p); db.commit()
    # Currencies
    if Currencies and not db.query(Currencies).first():
        cur = Currencies(Code="USD", Name="US Dollar") if hasattr(Currencies, "Code") else Currencies(CurrencyName="US Dollar")
        db.add(cur); db.commit()
    # PriceLists
    if PriceLists and not db.query(PriceLists).first():
        if c and hasattr(PriceLists, "CountryID"):
            db.add(PriceLists(PriceListName="Base", CountryID=getattr(c, "CountryID")))
        else:
            db.add(PriceLists(PriceListName="Base"))
        db.commit()
    # Vendors
    if Vendors and not db.query(Vendors).first():
        db.add(Vendors(VendorName="Default Vendor")); db.commit()
    # SysIdentityDocTypes
    if SysIdentityDocTypes and not db.query(SysIdentityDocTypes).first():
        db.add(SysIdentityDocTypes(DocTypeName="DNI")); db.commit()

# ---- Common FK getters ----
def _get_fk_ids(db):
    out = {}
    try:
        from app.models.countries import Countries
        c = db.query(Countries).first()
        if c: out["CountryID"] = getattr(c, "CountryID", None)
    except Exception:
        pass
    try:
        from app.models.provinces import Provinces
        p = db.query(Provinces).first()
        if p:
            out["ProvinceID"] = getattr(p, "ProvinceID", None)
            if "CountryID" not in out and hasattr(p, "CountryID"):
                out["CountryID"] = getattr(p, "CountryID", None)
    except Exception:
        pass
    try:
        from app.models.pricelists import PriceLists
        pl = db.query(PriceLists).first()
        if pl: out["PriceListID"] = getattr(pl, "PriceListID", None)
    except Exception:
        pass
    try:
        from app.models.vendors import Vendors
        v = db.query(Vendors).first()
        if v: out["VendorID"] = getattr(v, "VendorID", None)
    except Exception:
        pass
    try:
        from app.models.sysidentitydoctypes import SysIdentityDocTypes
        d = db.query(SysIdentityDocTypes).first()
        if d: out["DocTypeID"] = getattr(d, "DocTypeID", None)
    except Exception:
        pass
    return out

# ===== end seed =====


@pytest.fixture(scope="function")
def db_session(engine):
    """Devuelve una sesión limpia por test con rollback al finalizar.

    Nota: Si necesitas datos mínimos para FKs se usan los seeders arriba.
    """
    connection = engine.connect()
    trans = connection.begin()
    SessionLocal = sessionmaker(bind=connection, autoflush=False, autocommit=False, future=True)
    session = SessionLocal()
    # Sembrar referencias mínimas para que no fallen las inserciones iniciales
    try:
        _seed_min_refs_util(session)
    except Exception:
        pass
    try:
        yield session
    finally:
        # Cerrar y revertir todo para aislar los tests
        with contextlib.suppress(Exception):
            session.close()
        with contextlib.suppress(Exception):
            if hasattr(trans, "is_active") and trans.is_active:
                trans.rollback()
        with contextlib.suppress(Exception):
            connection.close()


@pytest.fixture()
def tenant_ids(db_session):
    """Devuelve (company_id, branch_id) asegurando existencia previa."""
    from app.models.company import Company
    from app.models.branches import Branches
    company = db_session.query(Company).first()
    if not company:
        company = Company(CompanyName="Test Company", Address="Addr", CUIT="1", GrossIncome="GI", StartDate=datetime.now(timezone.utc).date(), Logo=b"-")
        db_session.add(company); db_session.commit(); db_session.refresh(company)
    branch = db_session.query(Branches).filter(Branches.CompanyID==company.CompanyID).first()
    if not branch:
        branch = Branches(CompanyID=company.CompanyID, BranchName="Main", Address="Addr", Phone="000", Logo=b"-")
        db_session.add(branch); db_session.commit(); db_session.refresh(branch)
    return company.CompanyID, branch.BranchID


# ===== Helper compuesto para crear dependencias de Item / PriceList / Currency / User =====
@pytest.fixture()
def seeded_dependencies(db_session, tenant_ids):
    """Crea (o reutiliza) entidades mínimas multi-tenant relacionadas necesarias para ItemPriceHistories y otros tests.

    Devuelve diccionario con IDs: CompanyID, BranchID, BrandID, ItemCategoryID, ItemSubcategoryID,
    SupplierID, WarehouseID, ItemID, PriceListID, CurrencyID, UserID.
    """
    company_id, branch_id = tenant_ids
    from sqlalchemy import text

    def scalar_or_insert(select_sql: str, insert_sql: str, params=None):
        val = db_session.execute(text(select_sql), params or {}).scalar()
        if not val:
            val = db_session.execute(text(insert_sql), params or {}).scalar()
        return val

    brand_id = scalar_or_insert(
        f"SELECT TOP 1 BrandID FROM Brands WHERE CompanyID={company_id}",
        f"INSERT INTO Brands (CompanyID, BrandName, IsActive) OUTPUT INSERTED.BrandID VALUES ({company_id}, 'SeedBrand', 1)"
    )
    cat_id = scalar_or_insert(
        f"SELECT TOP 1 ItemCategoryID FROM ItemCategories WHERE CompanyID={company_id}",
        f"INSERT INTO ItemCategories (CompanyID, ItemCategoryName, IsActive) OUTPUT INSERTED.ItemCategoryID VALUES ({company_id}, 'SeedCat', 1)"
    )
    subcat_id = scalar_or_insert(
        f"SELECT TOP 1 ItemSubcategoryID FROM ItemSubcategories WHERE CompanyID={company_id}",
        f"INSERT INTO ItemSubcategories (CompanyID, ItemSubcategoryName, ItemCategoryID, IsActive) OUTPUT INSERTED.ItemSubcategoryID VALUES ({company_id}, 'SeedSubCat', {cat_id}, 1)"
    )
    supplier_id = scalar_or_insert(
        f"SELECT TOP 1 SupplierID FROM Suppliers WHERE CompanyID={company_id}",
        f"INSERT INTO Suppliers (CompanyID, FirstName, IsActive) OUTPUT INSERTED.SupplierID VALUES ({company_id}, 'SeedSupplier', 1)"
    )
    warehouse_id = scalar_or_insert(
        f"SELECT TOP 1 WarehouseID FROM Warehouses WHERE CompanyID={company_id}",
        f"INSERT INTO Warehouses (CompanyID, WarehouseName, Address) OUTPUT INSERTED.WarehouseID VALUES ({company_id}, 'SeedWarehouse', 'Addr')"
    )
    # Currency
    currency_id = scalar_or_insert(
        "SELECT TOP 1 CurrencyID FROM sysCurrencies",
        "INSERT INTO sysCurrencies (CurrencyCode, CurrencyName, IsActive) OUTPUT INSERTED.CurrencyID VALUES ('USD','US Dollar',1)"
    )
    # User (mínimo) - si no existe creamos uno básico
    user_id = scalar_or_insert(
        "SELECT TOP 1 UserID FROM Users",
        f"INSERT INTO Users (UserName, PasswordHash, Email, IsActive) OUTPUT INSERTED.UserID VALUES ('seeduser','x','seed@example.com',1)"
    )
    # PriceList multi-tenant
    pricelist_id = scalar_or_insert(
        f"SELECT TOP 1 PriceListID FROM PriceLists WHERE CompanyID={company_id}",
        f"INSERT INTO PriceLists (CompanyID, PriceListName, PriceListDescription, IsActive, CreatedDate) OUTPUT INSERTED.PriceListID VALUES ({company_id}, 'SeedList', 'Seed Desc', 1, GETDATE())"
    )
    # Item base
    item_id = scalar_or_insert(
        f"SELECT TOP 1 ItemID FROM Items WHERE CompanyID={company_id}",
        f"INSERT INTO Items (CompanyID, BranchID, BrandID, ItemCode, ItemDescription, ItemCategoryID, ItemSubcategoryID, SupplierID, ControlStock, ReplenishmentStock, IsOffer, OEM, LastModified, WarehouseID, IsActive) OUTPUT INSERTED.ItemID VALUES ({company_id}, {branch_id}, {brand_id}, 'SEEDCODE', 'Seed Item', {cat_id}, {subcat_id}, {supplier_id}, 0, 0, 0, NULL, GETDATE(), {warehouse_id}, 1)"
    )
    db_session.commit()
    return {
        "CompanyID": company_id,
        "BranchID": branch_id,
        "BrandID": brand_id,
        "ItemCategoryID": cat_id,
        "ItemSubcategoryID": subcat_id,
        "SupplierID": supplier_id,
        "WarehouseID": warehouse_id,
        "ItemID": item_id,
        "PriceListID": pricelist_id,
        "CurrencyID": currency_id,
        "UserID": user_id,
    }


# ===== Dependencias mínimas para órdenes (Cliente, Descuento, Vendedor, Estado, Condición de venta) =====
@pytest.fixture()
def order_base_dependencies(db_session, seeded_dependencies):
    """Crea (o reutiliza) entidades adicionales necesarias para crear Orders con Items.

    Devuelve diccionario con los IDs añadidos: ClientID, DiscountID, VendorID, SaleConditionID, OrderStatusID.
    Reutiliza CompanyID, BranchID y PriceListID de seeded_dependencies.
    """
    from sqlalchemy import text

    company_id = seeded_dependencies["CompanyID"]
    branch_id = seeded_dependencies["BranchID"]
    price_list_id = seeded_dependencies["PriceListID"]
    user_id = seeded_dependencies["UserID"]

    def scalar_or_insert(select_sql: str, insert_sql: str, params=None):
        val = db_session.execute(text(select_sql), params or {}).scalar()
        if not val:
            val = db_session.execute(text(insert_sql), params or {}).scalar()
        return val

    # País y provincia (IDs fijos mínimos)
    country_id = scalar_or_insert(
        "SELECT TOP 1 CountryID FROM Countries",
        "INSERT INTO Countries (CountryID, CountryName) OUTPUT INSERTED.CountryID VALUES (1, 'CountrySeed')"
    )
    province_id = scalar_or_insert(
        f"SELECT TOP 1 ProvinceID FROM Provinces WHERE CountryID={country_id}",
        f"INSERT INTO Provinces (CountryID, ProvinceName) OUTPUT INSERTED.ProvinceID VALUES ({country_id}, 'ProvSeed')"
    )
    # DocType
    # DocType: usar INSERT con control de duplicado (puede ejecutarse varias veces en misma sesión de test)
    from sqlalchemy.exc import IntegrityError
    try:
        doctype_id = scalar_or_insert(
            "SELECT TOP 1 DocTypeID FROM SysIdentityDocTypes",
            "INSERT INTO SysIdentityDocTypes (DocTypeID, DocTypeName, IsActive) OUTPUT INSERTED.DocTypeID VALUES (1,'DNI',1)"
        )
    except IntegrityError:
        # Ya existe, recuperar
        doctype_id = db_session.execute(text("SELECT TOP 1 DocTypeID FROM SysIdentityDocTypes")) .scalar()
    # Vendor
    vendor_id = scalar_or_insert(
        f"SELECT TOP 1 VendorID FROM Vendors WHERE CompanyID={company_id}",
        f"INSERT INTO Vendors (CompanyID, VendorName, Commission, IsActive) OUTPUT INSERTED.VendorID VALUES ({company_id}, 'SeedVendor', 0, 1)"
    )
    # Discount
    discount_id = scalar_or_insert(
        f"SELECT TOP 1 DiscountID FROM Discounts WHERE CompanyID={company_id}",
        f"INSERT INTO Discounts (CompanyID, DiscountName, Percentage) OUTPUT INSERTED.DiscountID VALUES ({company_id}, 'SeedDiscount', 0)"
    )
    # CreditCardGroup -> CreditCard -> SaleCondition
    cc_group_id = scalar_or_insert(
        f"SELECT TOP 1 CreditCardGroupID FROM CreditCardGroups WHERE CompanyID={company_id}",
        f"INSERT INTO CreditCardGroups (CompanyID, GroupName) OUTPUT INSERTED.CreditCardGroupID VALUES ({company_id}, 'SeedGroup')"
    )
    credit_card_id = scalar_or_insert(
        f"SELECT TOP 1 CreditCardID FROM CreditCards WHERE CompanyID={company_id}",
        f"INSERT INTO CreditCards (CompanyID, CardName, CreditCardGroupID, IsActive, Surcharge, Installments) OUTPUT INSERTED.CreditCardID VALUES ({company_id}, 'SeedCard', {cc_group_id}, 1, 0, 1)"
    )
    sale_condition_id = scalar_or_insert(
        f"SELECT TOP 1 SaleConditionID FROM SaleConditions WHERE CompanyID={company_id}",
        f"INSERT INTO SaleConditions (CompanyID, CreditCardID, Name, DueDate, Surcharge, IsActive) OUTPUT INSERTED.SaleConditionID VALUES ({company_id}, {credit_card_id}, 'Contado', GETDATE(), 0, 1)"
    )
    # SysOrderStatus
    order_status_id = scalar_or_insert(
        "SELECT TOP 1 OrderStatusID FROM SysOrderStatus",
        "INSERT INTO SysOrderStatus (Status) OUTPUT INSERTED.OrderStatusID VALUES ('Pendiente')"
    )
    # Documento comercial mínimo (CompanyID, BranchID, DocumentID identity). Usar uno si ya existe.
    document_id = scalar_or_insert(
        f"SELECT TOP 1 DocumentID FROM CommercialDocuments WHERE CompanyID={company_id} AND BranchID={branch_id}",
        f"INSERT INTO CommercialDocuments (CompanyID, BranchID, DocTypeID, Prefix, Number_, IssueDate, TotalAmount) OUTPUT INSERTED.DocumentID VALUES ({company_id}, {branch_id}, {doctype_id}, 'PR', 1, GETDATE(), 0)"
    )
    # Client (referencia a PriceList, Vendor, DocType, Country/Province)
    client_id = scalar_or_insert(
        f"SELECT TOP 1 ClientID FROM Clients WHERE CompanyID={company_id}",
        " ".join([
            "INSERT INTO Clients (CompanyID, BranchID, DocTypeID, FirstName, IsActive, CountryID, ProvinceID, PriceListID, VendorID, DocNumber, LastName, Phone, Email, Address, City, PostalCode)",
            f"OUTPUT INSERTED.ClientID VALUES ({company_id}, {branch_id}, {doctype_id}, 'ClienteSeed', 1, {country_id}, {province_id}, {price_list_id}, {vendor_id}, 'X', 'Apellido', '000', 'seed@client.test', 'Addr', 'City', 'PC')"
        ])
    )

    db_session.commit()
    return {
        **seeded_dependencies,
        "ClientID": client_id,
        "DiscountID": discount_id,
        "VendorID": vendor_id,
        "SaleConditionID": sale_condition_id,
        "OrderStatusID": order_status_id,
        "DocTypeID": doctype_id,
        "CountryID": country_id,
        "ProvinceID": province_id,
        "CreditCardID": credit_card_id,
        "UserID": user_id,
        "DocumentID": document_id,
    }

