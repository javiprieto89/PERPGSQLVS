"""
Script para probar queries GraphQL con datos anidados
"""
import requests
import json

GRAPHQL_URL = "http://localhost:8000/graphql/"

# Query 1: PurchaseInvoices (ya probada exitosamente)
purchase_invoices_query = """
{
  allPurchaseinvoices {
    PurchaseInvoiceID
    InvoiceNumber
    TotalAmount
    SupplierData {
      SupplierID
      FirstName
      LastName
    }
    UserData {
      UserID
      FullName
    }
    BranchData {
      BranchID
      BranchName
    }
    PurchaseInvoiceDetailsData {
      PurchaseInvoiceDetailID
      Quantity
      UnitPrice
      ItemData {
        ItemID
        ItemCode
        ItemDescription
      }
      WarehouseData {
        WarehouseID
        WarehouseName
      }
    }
  }
}
"""

# Query 2: Checks con datos anidados
checks_query = """
{
  allChecks {
    CheckID
    Number
    Amount
    IssueDate
    CompanyData {
      CompanyID
      CompanyName
    }
    BanksData {
      BankID
      Name
    }
    CheckStatusesData {
      CheckStatusID
      StatusName
    }
  }
}
"""

# Query 3: CashBoxes con datos anidados
cashboxes_query = """
{
  allCashBoxes {
    CashBoxID
    Name
    CurrentBalance
    BranchesData {
      BranchID
      BranchName
    }
    UsersData {
      UserID
      FullName
    }
  }
}
"""

# Query 4: CashBoxMovements con datos anidados
cashboxmovements_query = """
{
  allCashBoxMovements {
    CashBoxMovementID
    Amount
    MovementType
    Description
    BranchesData {
      BranchID
      BranchName
    }
    CashBoxesData {
      CashBoxID
      Name
    }
    UsersData {
      UserID
      FullName
    }
  }
}
"""


def execute_query(query_name, query):
    """Ejecuta una query GraphQL y muestra resultados"""
    print("\n" + "="*80)
    print(f"🔍 Ejecutando: {query_name}")
    print("="*80)

    try:
        response = requests.post(
            GRAPHQL_URL,
            json={"query": query},
            headers={"Content-Type": "application/json"}
        )

        if response.status_code == 200:
            data = response.json()

            if "errors" in data:
                print(f"❌ Error en query:")
                print(json.dumps(data["errors"], indent=2))
            else:
                print(f"✅ Query exitosa!")
                print(json.dumps(data["data"], indent=2))
        else:
            print(f"❌ HTTP Error {response.status_code}")
            print(response.text)

    except Exception as e:
        print(f"❌ Exception: {e}")


if __name__ == "__main__":
    print("\n" + "="*80)
    print("🚀 TESTING GRAPHQL QUERIES WITH NESTED DATA")
    print("="*80)

    # Test 1: PurchaseInvoices
    execute_query("allPurchaseinvoices", purchase_invoices_query)

    # Test 2: Checks
    execute_query("allChecks", checks_query)

    # Test 3: CashBoxes
    execute_query("allCashBoxes", cashboxes_query)

    # Test 4: CashBoxMovements
    execute_query("allCashBoxMovements", cashboxmovements_query)

    print("\n" + "="*80)
    print("✅ TODAS LAS QUERIES COMPLETADAS")
    print("="*80)
