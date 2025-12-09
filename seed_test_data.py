"""
Script para generar datos de prueba usando mutations de GraphQL.
Respeta dependencias y relaciones entre tablas.
"""
from app.models.provinces import Provinces
from app.models.countries import Countries
from app.models.itemcategories import ItemCategories
from app.models.syscurrencies import SysCurrencies
from app.models.checkstatuses import CheckStatuses
from app.models.bankaccounts import BankAccounts
from app.models.banks import Banks
from app.models.warehouses import Warehouses
from app.models.items import Items
from app.models.clients import Clients
from app.models.suppliers import Suppliers
from app.models.users import Users
from app.models.branches import Branches
from app.models.company import Company
from app.db import SessionLocal
from sqlalchemy.orm import Session
import asyncio
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))


def check_and_create_base_data(db: Session):
    """Verifica y crea datos base necesarios para todas las relaciones"""

    print("\n" + "="*80)
    print("🔍 VERIFICANDO Y CREANDO DATOS BASE")
    print("="*80)

    # 1. Company
    company = db.query(Company).first()
    if not company:
        print("📝 Creando Company...")
        company = Company(
            CompanyID=1,
            CompanyName="Lubricentro Test SA",
            TaxID="20-12345678-9",
            Address="Av. Test 123",
            Phone="1234-5678",
            Email="test@lubricentro.com"
        )
        db.add(company)
        db.commit()
        db.refresh(company)
        print(f"✅ Company creada: {company.CompanyName}")
    else:
        print(f"✅ Company existe: {company.CompanyName}")

    # 2. Countries
    country = db.query(Countries).first()
    if not country:
        print("📝 Creando Country...")
        country = Countries(
            CountryID=1,
            CountryName="Argentina"
        )
        db.add(country)
        db.commit()
        db.refresh(country)
        print(f"✅ Country creado: {country.CountryName}")
    else:
        print(f"✅ Country existe: {country.CountryName}")

    # 3. Provinces
    province = db.query(Provinces).first()
    if not province:
        print("📝 Creando Province...")
        province = Provinces(
            ProvinceID=1,
            ProvinceName="Buenos Aires",
            CountryID=country.CountryID
        )
        db.add(province)
        db.commit()
        db.refresh(province)
        print(f"✅ Province creada: {province.ProvinceName}")
    else:
        print(f"✅ Province existe: {province.ProvinceName}")

    # 4. Branch
    branch = db.query(Branches).filter(
        Branches.CompanyID == company.CompanyID
    ).first()
    if not branch:
        print("📝 Creando Branch...")
        branch = Branches(
            CompanyID=company.CompanyID,
            BranchID=1,
            BranchName="Sucursal Central",
            Address="Av. Principal 456",
            Phone="1234-9999"
        )
        db.add(branch)
        db.commit()
        db.refresh(branch)
        print(f"✅ Branch creada: {branch.BranchName}")
    else:
        print(f"✅ Branch existe: {branch.BranchName}")

    # 5. Users
    user = db.query(Users).first()
    if not user:
        print("📝 Creando User...")
        user = Users(
            UserID=1,
            Username="admin",
            Password="admin123",  # En producción debería estar hasheado
            FullName="Administrador Test",
            Email="admin@test.com",
            RoleID=1,
            IsActive=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        print(f"✅ User creado: {user.FullName}")
    else:
        print(f"✅ User existe: {user.FullName}")

    # 6. Currencies
    currency = db.query(SysCurrencies).first()
    if not currency:
        print("📝 Creando Currency...")
        currency = SysCurrencies(
            CurrencyID=1,
            Code="ARS",
            CurrencyName="Peso Argentino",
            Symbol="$",
            IsBase=True
        )
        db.add(currency)
        db.commit()
        db.refresh(currency)
        print(f"✅ Currency creada: {currency.Code}")
    else:
        print(f"✅ Currency existe: {currency.Code}")

    # 7. Suppliers
    supplier = db.query(Suppliers).first()
    if not supplier:
        print("📝 Creando Supplier...")
        supplier = Suppliers(
            SupplierID=1,
            CompanyID=company.CompanyID,
            FirstName="Juan",
            LastName="Proveedor",
            TaxID="20-98765432-1",
            Address="Calle Proveedor 789",
            Phone="1111-2222",
            Email="proveedor@test.com"
        )
        db.add(supplier)
        db.commit()
        db.refresh(supplier)
        print(f"✅ Supplier creado: {supplier.FirstName} {supplier.LastName}")
    else:
        print(f"✅ Supplier existe: {supplier.FirstName} {supplier.LastName}")

    # 8. Clients
    client = db.query(Clients).first()
    if not client:
        print("📝 Creando Client...")
        client = Clients(
            ClientID=1,
            CompanyID=company.CompanyID,
            FirstName="María",
            LastName="Cliente",
            TaxID="27-11223344-5",
            Address="Calle Cliente 321",
            Phone="3333-4444",
            Email="cliente@test.com"
        )
        db.add(client)
        db.commit()
        db.refresh(client)
        print(f"✅ Client creado: {client.FirstName} {client.LastName}")
    else:
        print(f"✅ Client existe: {client.FirstName} {client.LastName}")

    # 9. Item Categories
    category = db.query(ItemCategories).first()
    if not category:
        print("📝 Creando ItemCategory...")
        category = ItemCategories(
            ItemCategoryID=1,
            CompanyID=company.CompanyID,
            CategoryName="Lubricantes",
            Description="Aceites y lubricantes para motor"
        )
        db.add(category)
        db.commit()
        db.refresh(category)
        print(f"✅ ItemCategory creada: {category.CategoryName}")
    else:
        print(f"✅ ItemCategory existe: {category.CategoryName}")

    # 10. Items
    item = db.query(Items).first()
    if not item:
        print("📝 Creando Item...")
        item = Items(
            ItemID=1,
            CompanyID=company.CompanyID,
            ItemCode="ACE001",
            ItemDescription="Aceite Sintético 5W40",
            ItemCategoryID=category.ItemCategoryID,
            UnitPrice=15000.00,
            IsActive=True
        )
        db.add(item)
        db.commit()
        db.refresh(item)
        print(f"✅ Item creado: {item.ItemCode} - {item.ItemDescription}")
    else:
        print(f"✅ Item existe: {item.ItemCode} - {item.ItemDescription}")

    # 11. Warehouses
    warehouse = db.query(Warehouses).first()
    if not warehouse:
        print("📝 Creando Warehouse...")
        warehouse = Warehouses(
            WarehouseID=1,
            CompanyID=company.CompanyID,
            BranchID=branch.BranchID,
            WarehouseName="Depósito Principal",
            Address="Av. Depósito 100",
            IsActive=True
        )
        db.add(warehouse)
        db.commit()
        db.refresh(warehouse)
        print(f"✅ Warehouse creado: {warehouse.WarehouseName}")
    else:
        print(f"✅ Warehouse existe: {warehouse.WarehouseName}")

    # 12. Banks
    bank = db.query(Banks).first()
    if not bank:
        print("📝 Creando Bank...")
        bank = Banks(
            BankID=1,
            CompanyID=company.CompanyID,
            Name="Banco Test",
            Code="001",
            Address="Av. Banco 500"
        )
        db.add(bank)
        db.commit()
        db.refresh(bank)
        print(f"✅ Bank creado: {bank.Name}")
    else:
        print(f"✅ Bank existe: {bank.Name}")

    # 13. BankAccounts
    bank_account = db.query(BankAccounts).first()
    if not bank_account:
        print("📝 Creando BankAccount...")
        bank_account = BankAccounts(
            BankAccountID=1,
            CompanyID=company.CompanyID,
            BankID=bank.BankID,
            AccountNumber="1234567890",
            CurrencyID=currency.CurrencyID,
            IsActive=True,
            Alias="Cuenta Principal"
        )
        db.add(bank_account)
        db.commit()
        db.refresh(bank_account)
        print(f"✅ BankAccount creada: {bank_account.AccountNumber}")
    else:
        print(f"✅ BankAccount existe: {bank_account.AccountNumber}")

    # 14. CheckStatuses
    check_status = db.query(CheckStatuses).first()
    if not check_status:
        print("📝 Creando CheckStatus...")
        check_status = CheckStatuses(
            CheckStatusID=1,
            StatusCode="CARTERA",
            StatusName="En cartera",
            IsActive=True
        )
        db.add(check_status)
        db.commit()
        db.refresh(check_status)
        print(f"✅ CheckStatus creado: {check_status.StatusName}")
    else:
        print(f"✅ CheckStatus existe: {check_status.StatusName}")

    print("\n✅ Todos los datos base están listos\n")

    return {
        'company': company,
        'branch': branch,
        'user': user,
        'supplier': supplier,
        'client': client,
        'item': item,
        'warehouse': warehouse,
        'currency': currency,
        'bank': bank,
        'bank_account': bank_account,
        'check_status': check_status,
        'country': country,
        'province': province,
        'category': category
    }


def create_purchase_invoices(db: Session, base_data: dict):
    """Crea facturas de compra con detalles"""
    from app.models.purchaseinvoices import PurchaseInvoices
    from app.models.purchaseinvoicedetails import PurchaseInvoiceDetails
    from datetime import datetime

    print("\n" + "="*80)
    print("📦 CREANDO PURCHASE INVOICES")
    print("="*80)

    # Verificar si ya existen
    existing = db.query(PurchaseInvoices).count()
    if existing > 0:
        print(f"✅ Ya existen {existing} Purchase Invoices")
        return

    # Crear 3 facturas de prueba
    for i in range(1, 4):
        print(f"\n📝 Creando Purchase Invoice {i}...")

        invoice = PurchaseInvoices(
            CompanyID=base_data['company'].CompanyID,
            BranchID=base_data['branch'].BranchID,
            SupplierID=base_data['supplier'].SupplierID,
            InvoiceNumber=f"FC-{i:04d}",
            InvoiceDate=datetime.now(),
            TotalAmount=15000.00 * i,
            IsPaid=False,
            UserID=base_data['user'].UserID
        )
        db.add(invoice)
        db.flush()  # Para obtener el ID sin commit

        print(f"  ✅ Factura creada: {invoice.InvoiceNumber}")

        # Crear 2 detalles por factura
        for j in range(1, 3):
            detail = PurchaseInvoiceDetails(
                CompanyID=base_data['company'].CompanyID,
                BranchID=base_data['branch'].BranchID,
                PurchaseInvoiceID=invoice.PurchaseInvoiceID,
                ItemID=base_data['item'].ItemID,
                WarehouseID=base_data['warehouse'].WarehouseID,
                Quantity=j * 5,
                UnitPrice=15000.00,
                TotalPrice=15000.00 * j * 5
            )
            db.add(detail)
            print(f"    ✅ Detalle {j} agregado: {detail.Quantity} unidades")

        db.commit()
        print(f"  💾 Purchase Invoice {i} guardada con sus detalles")


def create_transactions(db: Session, base_data: dict):
    """Crea transacciones - SKIP si hay constraint violations"""
    from app.models.transactions import Transactions
    from datetime import datetime

    print("\n" + "="*80)
    print("💰 SKIPPING TRANSACTIONS (requiere más datos de sistema)")
    print("="*80)


def create_checks(db: Session, base_data: dict):
    """Crea cheques"""
    from app.models.checks import Checks
    from datetime import datetime, timedelta

    print("\n" + "="*80)
    print("📝 CREANDO CHECKS")
    print("="*80)

    existing = db.query(Checks).count()
    if existing > 0:
        print(f"✅ Ya existen {existing} Checks")
        return

    for i in range(1, 4):
        print(f"\n📝 Creando Check {i}...")

        check = Checks(
            CompanyID=base_data['company'].CompanyID,
            Number=f"CH{i:08d}",
            CurrencyID=base_data['currency'].CurrencyID,
            Amount=25000.00 * i,
            IssueDate=datetime.now().date(),
            DueDate=(datetime.now() + timedelta(days=30)).date(),
            BankID=base_data['bank'].BankID,
            CheckStatusID=base_data['check_status'].CheckStatusID,
            DrawerName=f"Cliente {i}",
            HolderName=base_data['company'].CompanyName
        )
        db.add(check)
        db.commit()
        db.refresh(check)
        print(f"  ✅ Check creado: {check.Number}")


def create_cashboxes(db: Session, base_data: dict):
    """Crea cajas"""
    from app.models.cashboxes import CashBoxes
    from datetime import datetime

    print("\n" + "="*80)
    print("💵 CREANDO CASHBOXES")
    print("="*80)

    existing = db.query(CashBoxes).count()
    if existing > 0:
        print(f"✅ Ya existen {existing} CashBoxes")
        return

    for i in range(1, 3):
        print(f"\n📝 Creando CashBox {i}...")

        cashbox = CashBoxes(
            CompanyID=base_data['company'].CompanyID,
            BranchID=base_data['branch'].BranchID,
            Name=f"Caja {i}",
            Description=f"Caja de prueba {i}",
            IsActive=True,
            OpenDate=datetime.now(),
            InitialBalance=50000.00,
            CurrentBalance=50000.00,
            UserID=base_data['user'].UserID,
            Notes=f"Caja operativa {i}"
        )
        db.add(cashbox)
        db.commit()
        db.refresh(cashbox)
        print(f"  ✅ CashBox creada: {cashbox.Name}")


def create_cashbox_movements(db: Session, base_data: dict):
    """Crea movimientos de caja"""
    from app.models.cashboxes import CashBoxes
    from app.models.cashboxmovements import CashBoxMovements
    from datetime import datetime

    print("\n" + "="*80)
    print("📊 CREANDO CASHBOX MOVEMENTS")
    print("="*80)

    existing = db.query(CashBoxMovements).count()
    if existing > 0:
        print(f"✅ Ya existen {existing} CashBox Movements")
        return

    cashbox = db.query(CashBoxes).first()
    if not cashbox:
        print("⚠️  No hay CashBoxes, creando primero...")
        create_cashboxes(db, base_data)
        cashbox = db.query(CashBoxes).first()

        # Verificar que se creó correctamente
        if not cashbox:
            print("❌ Error: No se pudo crear CashBox")
            return

    for i in range(1, 5):
        print(f"\n📝 Creando CashBox Movement {i}...")

        movement = CashBoxMovements(
            CashBoxID=cashbox.CashBoxID,
            CompanyID=base_data['company'].CompanyID,
            BranchID=base_data['branch'].BranchID,
            MovementDate=datetime.now(),
            Amount=5000.00 * i * (-1 if i % 2 == 0 else 1),
            MovementType="Ingreso" if i % 2 == 1 else "Egreso",
            Description=f"Movimiento de prueba {i}",
            UserID=base_data['user'].UserID,
            Notes=f"Nota del movimiento {i}"
        )
        db.add(movement)
        db.commit()
        db.refresh(movement)
        print(
            f"  ✅ Movement creado: {movement.MovementType} ${movement.Amount}")


def create_account_balances(db: Session, base_data: dict):
    """Crea balances de cuentas"""
    from app.models.accountbalances import AccountBalances

    print("\n" + "="*80)
    print("💼 CREANDO ACCOUNT BALANCES")
    print("="*80)

    existing = db.query(AccountBalances).count()
    if existing > 0:
        print(f"✅ Ya existen {existing} Account Balances")
        return

    # Balance para cliente
    print("\n📝 Creando Account Balance para Cliente...")
    balance_client = AccountBalances(
        ClientID=base_data['client'].ClientID,
        SupplierID=None,
        Balance=150000.00
    )
    db.add(balance_client)

    # Balance para proveedor
    print("📝 Creando Account Balance para Proveedor...")
    balance_supplier = AccountBalances(
        ClientID=None,
        SupplierID=base_data['supplier'].SupplierID,
        Balance=-75000.00
    )
    db.add(balance_supplier)

    db.commit()
    print("  ✅ Account Balances creados")


def main():
    print("\n" + "="*80)
    print("🚀 INICIANDO GENERACIÓN DE DATOS DE PRUEBA")
    print("="*80)

    db = SessionLocal()

    try:
        # 1. Crear datos base
        base_data = check_and_create_base_data(db)

        # 2. Crear Purchase Invoices
        create_purchase_invoices(db, base_data)

        # 3. Crear Transactions
        create_transactions(db, base_data)

        # 4. Crear Checks
        create_checks(db, base_data)

        # 5. Crear CashBoxes
        create_cashboxes(db, base_data)

        # 6. Crear CashBox Movements
        create_cashbox_movements(db, base_data)

        # 7. Crear Account Balances
        create_account_balances(db, base_data)

        print("\n" + "="*80)
        print("✅ GENERACIÓN DE DATOS COMPLETADA")
        print("="*80)
        print("\nAhora puedes ejecutar queries de prueba con datos reales!")

    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    main()
