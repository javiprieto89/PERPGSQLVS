"""
Script completo de prueba con login y queries GraphQL con datos anidados
"""
import requests
import json

BASE_URL = "http://localhost:8000"
GRAPHQL_URL = f"{BASE_URL}/graphql/"
LOGIN_URL = f"{BASE_URL}/login"

# Credenciales
NICKNAME = "javierp"
PASSWORD = "Estronci@"


def login():
    """Realiza login mediante GraphQL mutation y retorna el token"""
    print("\n" + "="*80)
    print("🔐 INICIANDO LOGIN")
    print("="*80)

    login_mutation = f"""
    mutation {{
      login(input: {{nickname: "{NICKNAME}", password: "{PASSWORD}"}}) {{
        success
        message
        token
        refreshToken
        refreshExpiresAt
        sessionId
        user {{
          UserID
          Nickname
          FullName
          IsActive
          IsFullAdmin
        }}
      }}
    }}
    """

    try:
        response = requests.post(
            GRAPHQL_URL,
            json={"query": login_mutation},
            headers={"Content-Type": "application/json"}
        )

        if response.status_code == 200:
            data = response.json()

            if "errors" in data:
                print(f"❌ Error en login:")
                for error in data["errors"]:
                    print(f"   - {error.get('message', error)}")
                return None

            login_data = data.get("data", {}).get("login", {})
            token = login_data.get("token")
            user = login_data.get("user", {})
            success = login_data.get("success", False)
            message = login_data.get("message", "")

            if not success:
                print(f"❌ Login fallido: {message}")
                return None

            print(f"✅ Login exitoso!")
            print(f"   Usuario: {user.get('FullName')}")
            print(f"   UserID: {user.get('UserID')}")
            print(f"   Nickname: {user.get('Nickname')}")
            print(f"   Token: {token[:50] if token else 'N/A'}...")

            return token
        else:
            print(f"❌ Login fallido - HTTP {response.status_code}")
            print(response.text)
            return None

    except Exception as e:
        print(f"❌ Error en login: {e}")
        import traceback
        traceback.print_exc()
        return None


def execute_query(query_name, query, token):
    """Ejecuta una query GraphQL con autenticación"""
    print("\n" + "="*80)
    print(f"🔍 Ejecutando: {query_name}")
    print("="*80)

    try:
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

        response = requests.post(
            GRAPHQL_URL,
            json={"query": query},
            headers=headers
        )

        if response.status_code == 200:
            data = response.json()

            if "errors" in data:
                print(f"❌ Error en query:")
                for error in data["errors"]:
                    print(f"   - {error.get('message', error)}")
                return False
            else:
                print(f"✅ Query exitosa!")

                # Mostrar datos formateados
                result_data = data.get("data", {})
                for key, value in result_data.items():
                    if isinstance(value, list):
                        print(f"\n📊 {key}: {len(value)} registros")
                        if value:
                            print(f"   Primer registro:")
                            print(json.dumps(value[0], indent=6))
                    else:
                        print(f"\n📄 {key}:")
                        print(json.dumps(value, indent=4))

                return True
        else:
            print(f"❌ HTTP Error {response.status_code}")
            print(response.text)
            return False

    except Exception as e:
        print(f"❌ Exception: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    print("\n" + "="*80)
    print("🚀 PRUEBA COMPLETA DE GRAPHQL CON LOGIN")
    print("="*80)

    # 1. Login
    token = login()
    if not token:
        print("\n❌ No se pudo obtener token. Abortando.")
        return

    # 2. Definir queries
    queries = {
        "PurchaseInvoices con datos anidados": """
        {
          allPurchaseinvoices {
            PurchaseInvoiceID
            InvoiceNumber
            TotalAmount
            InvoiceDate
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
              Address
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
        """,

        "Checks con datos anidados": """
        {
          allChecks {
            CheckID
            Number
            Amount
            IssueDate
            DueDate
            DrawerName
            CompanyData {
              CompanyID
              CompanyName
            }
            BankData {
              BankID
              Name
            }
            CheckStatusData {
              CheckStatusID
              StatusCode
              StatusName
            }
            CurrencyData {
              CurrencyID
              Code
              CurrencyName
              Symbol
            }
          }
        }
        """,

        "CashBoxes con datos anidados": """
        {
          allCashboxes {
            CashBoxID
            Name
            Description
            InitialBalance
            CurrentBalance
            IsActive
            OpenDate
            BranchData {
              BranchID
              BranchName
              Address
              Phone
            }
            UserData {
              UserID
              FullName
            }
          }
        }
        """,

        "CashBoxMovements con datos anidados": """
        {
          allCashboxmovements {
            CashBoxMovementID
            Amount
            MovementType
            Description
            MovementDate
            Notes
            BranchData {
              BranchID
              BranchName
            }
            CashBoxData {
              CashBoxID
              Name
              CurrentBalance
            }
            UserData {
              UserID
              FullName
            }
          }
        }
        """,

        "Items con categorías": """
        {
          allItems {
            ItemID
            ItemCode
            ItemDescription
            IsActive
            CategoryData {
              ItemCategoryID
              CategoryName
            }
          }
        }
        """,

        "Suppliers básico": """
        {
          allSuppliers {
            SupplierID
            FirstName
            LastName
            Email
            Phone
          }
        }
        """,

        "Clients básico": """
        {
          allClients {
            ClientID
            FirstName
            LastName
            Email
            Phone
          }
        }
        """
    }

    # 3. Ejecutar todas las queries
    results = {}
    for name, query in queries.items():
        success = execute_query(name, query, token)
        results[name] = "✅" if success else "❌"

    # 4. Resumen final
    print("\n" + "="*80)
    print("📊 RESUMEN DE RESULTADOS")
    print("="*80)

    for name, result in results.items():
        print(f"{result} {name}")

    total = len(results)
    success_count = sum(1 for r in results.values() if r == "✅")

    print("\n" + "="*80)
    print(f"✅ Completado: {success_count}/{total} queries exitosas")
    print("="*80)


if __name__ == "__main__":
    main()
