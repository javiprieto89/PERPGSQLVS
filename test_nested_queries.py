"""
Script de prueba para verificar que todas las queries de entidades financieras
funcionan correctamente con datos anidados (campos *Data).

Basado en el éxito de PurchaseInvoices, este script prueba:
- Transactions
- Checks
- CashBoxes
- CashBoxMovements
- AccountBalances
"""
from app.utils import obj_to_schema
from app.graphql.crud.accountbalances import get_accountbalances
from app.graphql.crud.cashboxmovements import get_cashboxmovements
from app.graphql.crud.cashboxes import get_cashboxes
from app.graphql.crud.checks import get_checks
from app.graphql.crud.transactions import get_transactions
from app.db import SessionLocal
import asyncio
import sys
from pathlib import Path

# Agregar el directorio raíz al path
sys.path.insert(0, str(Path(__file__).parent))


def test_transactions():
    print("\n" + "="*80)
    print("🔍 Testing TRANSACTIONS with nested data...")
    print("="*80)

    db = SessionLocal()
    try:
        transactions = get_transactions(db)
        print(f"✅ Found {len(transactions)} transactions")

        if transactions:
            # Tomar la primera transacción
            trans = transactions[0]
            print(f"\n📄 Transaction ID: {trans.TransactionID}")

            # Verificar campos anidados
            nested_fields = {
                'branches_': 'BranchName',
            }

            for field_name, attr_name in nested_fields.items():
                if hasattr(trans, field_name):
                    related_obj = getattr(trans, field_name)
                    if related_obj and hasattr(related_obj, attr_name):
                        value = getattr(related_obj, attr_name)
                        print(f"  ✅ {field_name} -> {attr_name}: {value}")
                    elif related_obj is None:
                        print(f"  ⚪ {field_name}: NULL (permitido)")
                    else:
                        print(
                            f"  ⚠️  {field_name}: No tiene atributo {attr_name}")
                else:
                    print(f"  ❌ {field_name}: No existe en el modelo")

            # Convertir a schema GraphQL
            print("\n📦 Testing GraphQL schema conversion...")
            # Importar el schema type necesario
            from app.graphql.schemas.transactions import TransactionsInDB
            schema_obj = obj_to_schema(TransactionsInDB, trans)

            if hasattr(schema_obj, 'CompanyData'):
                print(f"  ✅ CompanyData existe en schema")
            if hasattr(schema_obj, 'BranchData'):
                print(f"  ✅ BranchData existe en schema")
            if hasattr(schema_obj, 'ClientData'):
                print(f"  ✅ ClientData existe en schema")

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


def test_checks():
    print("\n" + "="*80)
    print("🔍 Testing CHECKS with nested data...")
    print("="*80)

    db = SessionLocal()
    try:
        checks = get_checks(db)
        print(f"✅ Found {len(checks)} checks")

        if checks:
            check = checks[0]
            print(f"\n📄 Check ID: {check.CheckID}")

            nested_fields = {
                'Banks_': 'BankName',
                'CheckStatuses_': 'StatusDescription',
                'company_': 'CompanyName',
            }

            for field_name, attr_name in nested_fields.items():
                if hasattr(check, field_name):
                    related_obj = getattr(check, field_name)
                    if related_obj and hasattr(related_obj, attr_name):
                        value = getattr(related_obj, attr_name)
                        print(f"  ✅ {field_name} -> {attr_name}: {value}")
                    elif related_obj is None:
                        print(f"  ⚪ {field_name}: NULL (permitido)")
                else:
                    print(f"  ❌ {field_name}: No existe")

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


def test_cashboxes():
    print("\n" + "="*80)
    print("🔍 Testing CASHBOXES with nested data...")
    print("="*80)

    db = SessionLocal()
    try:
        cashboxes = get_cashboxes(db)
        print(f"✅ Found {len(cashboxes)} cashboxes")

        if cashboxes:
            cashbox = cashboxes[0]
            print(f"\n📄 CashBox ID: {cashbox.CashBoxID}")

            nested_fields = {
                'branches_': 'BranchName',
                'users_': 'Username',
            }

            for field_name, attr_name in nested_fields.items():
                if hasattr(cashbox, field_name):
                    related_obj = getattr(cashbox, field_name)
                    if related_obj and hasattr(related_obj, attr_name):
                        value = getattr(related_obj, attr_name)
                        print(f"  ✅ {field_name} -> {attr_name}: {value}")
                    elif related_obj is None:
                        print(f"  ⚪ {field_name}: NULL (permitido)")
                else:
                    print(f"  ❌ {field_name}: No existe")

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


def test_cashboxmovements():
    print("\n" + "="*80)
    print("🔍 Testing CASHBOXMOVEMENTS with nested data...")
    print("="*80)

    db = SessionLocal()
    try:
        movements = get_cashboxmovements(db)
        print(f"✅ Found {len(movements)} movements")

        if movements:
            movement = movements[0]
            print(f"\n📄 Movement ID: {movement.CashBoxMovementID}")

            nested_fields = {
                'branches_': 'BranchName',
                'cashBoxes_': 'Name',
                'users_': 'Username',
            }

            for field_name, attr_name in nested_fields.items():
                if hasattr(movement, field_name):
                    related_obj = getattr(movement, field_name)
                    if related_obj and hasattr(related_obj, attr_name):
                        value = getattr(related_obj, attr_name)
                        print(f"  ✅ {field_name} -> {attr_name}: {value}")
                    elif related_obj is None:
                        print(f"  ⚪ {field_name}: NULL (permitido)")
                else:
                    print(f"  ❌ {field_name}: No existe")

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


def test_accountbalances():
    print("\n" + "="*80)
    print("🔍 Testing ACCOUNTBALANCES with nested data...")
    print("="*80)

    db = SessionLocal()
    try:
        balances = get_accountbalances(db)
        print(f"✅ Found {len(balances)} account balances")

        if balances:
            balance = balances[0]
            print(f"\n📄 Account ID: {balance.AccountID}")

            nested_fields = {
                'clients_': 'FirstName',
                'suppliers_': 'FirstName',
            }

            for field_name, attr_name in nested_fields.items():
                if hasattr(balance, field_name):
                    related_obj = getattr(balance, field_name)
                    if related_obj and hasattr(related_obj, attr_name):
                        value = getattr(related_obj, attr_name)
                        print(f"  ✅ {field_name} -> {attr_name}: {value}")
                    elif related_obj is None:
                        print(f"  ⚪ {field_name}: NULL (permitido)")
                else:
                    print(f"  ❌ {field_name}: No existe")

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    print("\n" + "="*80)
    print("🚀 TESTING ALL ENTITIES WITH NESTED DATA")
    print("="*80)
    print("Verificando que todas las queries funcionan como PurchaseInvoices")

    test_transactions()
    test_checks()
    test_cashboxes()
    test_cashboxmovements()
    test_accountbalances()

    print("\n" + "="*80)
    print("✅ TESTING COMPLETED")
    print("="*80)
