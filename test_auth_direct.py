from app.auth import authenticate_user
from app.db import SessionLocal
import sys
sys.path.insert(0, r'C:\Users\javie\OneDrive\_Development\PERPGSQLVS')


db = SessionLocal()
try:
    print("Probando autenticación...")
    result = authenticate_user(db, "javierp", "Estronci@")
    if result:
        print(f"✅ ÉXITO: {result.user.Nickname}")
        print(f"   Estado password: {result.password_state}")
        print(f"   Requiere cambio: {result.requires_password_change}")
    else:
        print("❌ FALLÓ: authenticate_user retornó None")
except Exception as e:
    print(f"❌ ERROR: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
finally:
    db.close()
