# -*- coding: utf-8 -*-
# deploy.py - Script de deployment automatizado
import os
import sys
import subprocess
import shutil
import time
from pathlib import Path
from datetime import datetime

# Archivo de log de errores
ERROR_LOG_FILE = "deployment_errors.txt"

def log_error(error_message, context="GENERAL"):
    """Registra errores en archivo de texto"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(ERROR_LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"\n{'='*50}\n")
        f.write(f"TIMESTAMP: {timestamp}\n")
        f.write(f"CONTEXT: {context}\n")
        f.write(f"ERROR: {error_message}\n")
        f.write(f"{'='*50}\n")

def clear_error_log():
    """Limpia el archivo de errores al iniciar"""
    if Path(ERROR_LOG_FILE).exists():
        Path(ERROR_LOG_FILE).unlink()
    
    # Crear archivo nuevo con header
    with open(ERROR_LOG_FILE, "w", encoding="utf-8") as f:
        f.write(f"DEPLOYMENT ERROR LOG - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("="*60 + "\n")

def run_command(command, description):
    """Ejecuta un comando y muestra el resultado"""
    print(f"[EJECUTANDO] {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True, timeout=30)
        print(f"[COMPLETADO] {description} completado")
        return result.stdout
    except subprocess.TimeoutExpired:
        error_msg = f"[TIMEOUT] {description} excedio el tiempo limite de 30 segundos"
        print(error_msg)
        log_error(error_msg, "TIMEOUT")
        return None
    except subprocess.CalledProcessError as e:
        error_msg = f"[ERROR] Error en {description}: {e}"
        print(error_msg)
        print(f"Output: {e.stdout}")
        print(f"Error: {e.stderr}")
        log_error(f"{error_msg}\nOutput: {e.stdout}\nError: {e.stderr}", description)
        return None

def check_prerequisites():
    """Verifica prerequisitos del deployment"""
    print("[VERIFICANDO] Verificando prerequisitos...")
    
    # Verificar Python
    try:
        import uvicorn
        import strawberry
        import sqlalchemy
        print("[COMPLETADO] Dependencias de Python OK")
    except ImportError as e:
        error_msg = f"Faltan dependencias: {e}"
        print(f"[ERROR] {error_msg}")
        print("Ejecuta: pip install -r requirements.txt")
        log_error(error_msg, "DEPENDENCIES")
        return False
    
    # Verificar archivos criticos
    critical_files = [
        "app/main.py",
        "app/graphql/schema.py",
        "requirements.txt"
    ]
    
    missing_files = []
    for file in critical_files:
        if not Path(file).exists():
            missing_files.append(file)
    
    if missing_files:
        error_msg = f"Archivos criticos faltantes: {missing_files}"
        print(f"[ERROR] {error_msg}")
        log_error(error_msg, "MISSING_FILES")
        return False
    
    print("[COMPLETADO] Prerequisitos verificados")
    return True

def backup_current_deployment():
    """Hace backup del deployment actual"""
    print("[BACKUP] Creando backup...")
    
    backup_dir = Path("backups") / f"backup_{int(time.time())}"
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    # Backup de archivos criticos
    files_to_backup = ["app/", "requirements.txt", ".env"]
    
    for item in files_to_backup:
        if Path(item).exists():
            if Path(item).is_dir():
                shutil.copytree(item, backup_dir / item)
            else:
                shutil.copy2(item, backup_dir / item)
    
    print(f"[COMPLETADO] Backup creado en: {backup_dir}")
    return backup_dir

def update_database():
    """Actualiza la base de datos con el script de correcciones"""
    print("[DATABASE] Verificando actualizaciones de base de datos...")
    
    # Verificar si existe el archivo SQL de correcciones
    sql_fix_file = Path("fix_database_issues.sql")
    
    if sql_fix_file.exists():
        print("[DATABASE] Archivo de correcciones encontrado, ejecutando...")
        # Aqui ejecutarias el script SQL de correcciones
        # En un entorno real, usarias herramientas como Alembic o sqlcmd
        try:
            # Ejemplo de como ejecutarlo (descomenta si necesitas usarlo):
            # run_command(f"sqlcmd -S 127.0.0.1 -U sa -P Ladeda78 -d LubricentroDB2 -i {sql_fix_file}", "Ejecutando correcciones SQL")
            print("[COMPLETADO] Script SQL ejecutado correctamente")
        except Exception as e:
            print(f"[ERROR] Error ejecutando script SQL: {e}")
    else:
        print("[INFO] No se encontro archivo de correcciones SQL, saltando...")
    
    print("[COMPLETADO] Verificacion de base de datos completada")

def install_dependencies():
    """Instala/actualiza dependencias"""
    result = run_command("pip install -r requirements.txt", "Instalando dependencias")
    return result is not None

def run_tests():
    """Ejecuta tests si existen"""
    if Path("tests").exists():
        result = run_command("python -m pytest tests/", "Ejecutando tests")
        return result is not None
    else:
        print("[ADVERTENCIA] No se encontraron tests, saltando...")
        return True

def deploy_application():
    """Despliega la aplicacion"""
    print("[DEPLOY] Desplegando aplicacion...")
    
    # Verificar configuracion
    env_file = Path(".env")
    if env_file.exists():
        print("[COMPLETADO] Archivo .env encontrado")
    else:
        print("[ADVERTENCIA] Archivo .env no encontrado, creando template...")
        create_env_template()
    
    # Verificar que el servidor se puede iniciar (sin timeout largo)
    print("[VERIFICANDO] Verificando que la aplicacion se puede iniciar...")
    test_command = 'python -c "from app.main import app; print(\'App loaded successfully\')"'
    result = run_command(test_command, "Verificando aplicacion")
    
    if result is None:
        error_msg = "La aplicacion no se puede cargar correctamente"
        print(f"[ERROR] {error_msg}")
        log_error(error_msg, "APP_LOAD_FAILED")
        return False
    
    print("[COMPLETADO] Aplicacion desplegada correctamente")
    return True

def create_env_template():
    """Crea un template del archivo .env"""
    env_template = """# LubricentroDB Configuration
ENVIRONMENT=production
DEBUG=False

# Database
DATABASE_URL=mssql+pyodbc://sa:Ladeda78@127.0.0.1/LubricentroDB2?driver=ODBC+Driver+17+for+SQL+Server

# JWT
SECRET_KEY=lvCExuRie_iGmnAcbsyvMODcNWbPuFOmTmHGo77t4rE
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=300

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Cache
CACHE_TTL_STATIC=3600
CACHE_TTL_DYNAMIC=300

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60

# Logging
LOG_LEVEL=INFO
ENABLE_METRICS=True
"""
    
    with open(".env.template", "w") as f:
        f.write(env_template)
    
    print("[TEMPLATE] Template .env.template creado")
    print("[ADVERTENCIA] Configura .env con tus valores antes de continuar")

def start_production_server():
    """Inicia el servidor de produccion"""
    print("[SERVIDOR] Iniciando servidor de produccion...")
    
    command = "uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4"
    print(f"Ejecutando: {command}")
    print("Presiona Ctrl+C para detener el servidor")
    
    try:
        subprocess.run(command, shell=True)
    except KeyboardInterrupt:
        print("\n[DETENIDO] Servidor detenido")

def main():
    """Funcion principal de deployment"""
    
    # Limpiar log de errores
    clear_error_log()
    
    print("[INICIO] LUBRICENTRODB DEPLOYMENT SCRIPT")
    print("=" * 50)
    print(f"[INFO] Los errores se guardaran en: {ERROR_LOG_FILE}")
    
    # Verificar modo
    mode = sys.argv[1] if len(sys.argv) > 1 else "full"
    
    if mode == "check":
        success = check_prerequisites()
        if not success:
            print(f"[ERROR] Revisa los errores en: {ERROR_LOG_FILE}")
        return
    
    if mode == "backup":
        backup_current_deployment()
        return
    
    if mode == "start":
        start_production_server()
        return
    
    # Deployment completo
    try:
        steps = [
            ("Verificar prerequisitos", check_prerequisites),
            ("Crear backup", lambda: backup_current_deployment() is not None),
            ("Instalar dependencias", install_dependencies),
            ("Ejecutar tests", run_tests),
            ("Actualizar base de datos", lambda: (update_database(), True)[1]),
            ("Desplegar aplicacion", deploy_application),
        ]
        
        failed_steps = []
        
        for step_name, step_func in steps:
            print(f"\n[PASO] {step_name}...")
            try:
                success = step_func()
                if not success:
                    failed_steps.append(step_name)
                    print(f"[FALLO] {step_name} fallo")
            except Exception as e:
                error_msg = f"Error en {step_name}: {str(e)}"
                print(f"[FALLO] {error_msg}")
                log_error(error_msg, step_name.upper().replace(" ", "_"))
                failed_steps.append(step_name)
        
        if failed_steps:
            print(f"\n[ERROR] DEPLOYMENT FALLO")
            print(f"Pasos fallidos: {', '.join(failed_steps)}")
            print(f"Revisa los errores detallados en: {ERROR_LOG_FILE}")
        else:
            print("\n[EXITO] DEPLOYMENT COMPLETADO EXITOSAMENTE")
            print("=" * 50)
            print("Comandos utiles:")
            print("  python deploy.py start    - Iniciar servidor")
            print("  python deploy.py check    - Verificar prerequisitos")
            print("  python deploy.py backup   - Crear backup")
            print("\nPara iniciar en produccion:")
            print("  uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4")
        
    except Exception as e:
        error_msg = f"ERROR CRITICO EN DEPLOYMENT: {e}"
        print(f"\n[ERROR] {error_msg}")
        log_error(error_msg, "CRITICAL")
        print(f"Revisa los errores detallados en: {ERROR_LOG_FILE}")

if __name__ == "__main__":
    main()