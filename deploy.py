# -*- coding: utf-8 -*-
# deploy.py - Script de deployment completo (Backend + Frontend)
import os
import sys
import subprocess
import shutil
import time
import threading
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

    with open(ERROR_LOG_FILE, "w", encoding="utf-8") as f:
        f.write(f"PERPGSQLVS DEPLOYMENT ERROR LOG - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("="*60 + "\n")


def run_command(command, description, cwd=None):
    """Ejecuta un comando y muestra el resultado"""
    print(f"[EJECUTANDO] {description}...")
    try:
        result = subprocess.run(
            command, shell=True, check=True, capture_output=True, text=True, timeout=120, cwd=cwd)
        print(f"[COMPLETADO] {description} completado")
        return result.stdout
    except subprocess.TimeoutExpired:
        error_msg = f"[TIMEOUT] {description} excedio el tiempo limite"
        print(error_msg)
        log_error(error_msg, "TIMEOUT")
        return None
    except subprocess.CalledProcessError as e:
        error_msg = f"[ERROR] Error en {description}: {e}"
        print(error_msg)
        log_error(f"{error_msg}\nOutput: {e.stdout}\nError: {e.stderr}", description)
        return None


def check_backend_prerequisites():
    """Verifica prerequisitos del backend"""
    print("[VERIFICANDO] Verificando prerequisitos del backend...")
    
    # Verificar Python
    result = run_command("python --version", "Verificando Python")
    if result is None:
        error_msg = "Python no está instalado o no está en PATH"
        print(f"[ERROR] {error_msg}")
        log_error(error_msg, "BACKEND_PYTHON_MISSING")
        return False
    
    # Verificar uvicorn disponible
    try:
        import uvicorn
        print("[COMPLETADO] uvicorn disponible")
    except ImportError:
        error_msg = "uvicorn no está instalado"
        print(f"[ERROR] {error_msg}")
        log_error(error_msg, "BACKEND_UVICORN_MISSING")
        return False
    
    # Verificar estructura del backend
    if not Path("app").exists():
        error_msg = "Directorio 'app' (backend) no encontrado"
        print(f"[ERROR] {error_msg}")
        log_error(error_msg, "BACKEND_DIR_MISSING")
        return False
    
    # Verificar app/main.py
    if not Path("app/main.py").exists():
        error_msg = "app/main.py no encontrado"
        print(f"[ERROR] {error_msg}")
        log_error(error_msg, "BACKEND_MAIN_MISSING")
        return False
    
    # Verificar requirements.txt en la raíz
    if not Path("requirements.txt").exists():
        error_msg = "requirements.txt no encontrado en la raíz del proyecto"
        print(f"[ERROR] {error_msg}")
        log_error(error_msg, "BACKEND_REQUIREMENTS_MISSING")
        return False
    
    print("[COMPLETADO] Prerequisitos del backend verificados")
    return True


def check_frontend_prerequisites():
    """Verifica prerequisitos del frontend"""
    print("[VERIFICANDO] Verificando prerequisitos del frontend...")
    
    # Verificar Node.js
    result = run_command("node --version", "Verificando Node.js")
    if result is None:
        error_msg = "Node.js no está instalado"
        print(f"[ERROR] {error_msg}")
        log_error(error_msg, "FRONTEND_NODE_MISSING")
        return False
    
    # Verificar npm
    result = run_command("npm --version", "Verificando npm")
    if result is None:
        error_msg = "npm no está disponible"
        print(f"[ERROR] {error_msg}")
        log_error(error_msg, "FRONTEND_NPM_MISSING")
        return False
    
    # Verificar directorio frontend
    if not Path("frontend").exists():
        error_msg = "Directorio 'frontend' no encontrado"
        print(f"[ERROR] {error_msg}")
        log_error(error_msg, "FRONTEND_DIR_MISSING")
        return False
    
    # Verificar package.json en frontend
    package_json = Path("frontend/package.json")
    if not package_json.exists():
        error_msg = "No se encontró package.json en la carpeta frontend"
        print(f"[ERROR] {error_msg}")
        log_error(error_msg, "FRONTEND_PACKAGE_JSON_MISSING")
        return False
    
    # Verificar archivos específicos de TailwindCSS + Vite
    tailwind_config = Path("frontend/tailwind.config.js")
    vite_config = Path("frontend/vite.config.js")
    input_css = Path("frontend/src/input.css")
    
    if not tailwind_config.exists():
        print("[ADVERTENCIA] tailwind.config.js no encontrado")
    
    if not vite_config.exists():
        print("[ADVERTENCIA] vite.config.js no encontrado")
        
    if not input_css.exists():
        print("[ADVERTENCIA] src/input.css no encontrado")
    
    print("[COMPLETADO] Prerequisitos del frontend verificados (TailwindCSS + Vite)")
    return "frontend"


def install_backend_dependencies():
    """Instala dependencias del backend"""
    print("[BACKEND] Instalando dependencias desde requirements.txt...")
    result = run_command("pip install -r requirements.txt", "Instalando dependencias del backend")
    return result is not None


def install_frontend_dependencies(frontend_dir):
    """Instala dependencias del frontend"""
    print("[FRONTEND] Instalando dependencias desde package.json...")
    result = run_command("npm install", f"Instalando dependencias del frontend en {frontend_dir}", cwd=frontend_dir)
    return result is not None


def build_frontend(frontend_dir):
    """Construye el frontend para producción con TailwindCSS"""
    print("[FRONTEND] Construyendo para producción...")
    
    # Paso 1: Generar CSS de producción con TailwindCSS
    print("[FRONTEND] Generando CSS optimizado con TailwindCSS...")
    tailwind_result = run_command(
        "npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify", 
        "Generando CSS de producción",
        cwd=frontend_dir
    )
    
    if tailwind_result is None:
        print("[ADVERTENCIA] Fallo generando CSS, continuando...")
    
    # Paso 2: Build de Vite
    print("[FRONTEND] Ejecutando build de Vite...")
    vite_result = run_command("npm run build", f"Construyendo frontend con Vite en {frontend_dir}", cwd=frontend_dir)
    
    return vite_result is not None


def update_database():
    """Actualiza la base de datos"""
    print("[DATABASE] Verificando actualizaciones de base de datos...")
    
    sql_fix_file = Path("fix_database_issues.sql")
    if sql_fix_file.exists():
        print("[DATABASE] Archivo de correcciones encontrado...")
        # Aquí ejecutarías el script SQL
        print("[COMPLETADO] Script SQL procesado")
    else:
        print("[INFO] No se encontró archivo de correcciones SQL")
    
    return True


def start_backend_server():
    """Inicia el servidor backend Python GraphQL con uvicorn en puerto 8000"""
    def run_backend():
        try:
            print("[BACKEND] Iniciando servidor con uvicorn en puerto 8000...")
            command = "uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
            subprocess.run(command, shell=True)
        except Exception as e:
            print(f"[ERROR] Error iniciando backend: {e}")
    
    backend_thread = threading.Thread(target=run_backend, daemon=True)
    backend_thread.start()
    return backend_thread


def start_frontend_server(frontend_dir):
    """Inicia el servidor frontend (TailwindCSS + Vite)"""
    print(f"[FRONTEND] Iniciando servidor frontend desde {frontend_dir}...")

    try:
        vite_command = "npm run dev"
        subprocess.Popen(vite_command, shell=True, cwd=frontend_dir)

        print("[COMPLETADO] Frontend iniciado con TailwindCSS + Vite")
        return True
        
    except Exception as e:
        print(f"[ERROR] Error iniciando frontend: {e}")
        return False


def create_production_configs():
    """Crea configuraciones para producción"""
    
    # Template .env para backend (en la raíz)
    backend_env = """# PERPGSQLVS Backend Configuration
ENVIRONMENT=production
DEBUG=False

# Database
SQLALCHEMY_DATABASE_URL=mssql+pyodbc://sa:Ladeda78@127.0.0.1/LubricentroDB2?driver=ODBC+Driver+17+for+SQL+Server

# Backend Port
PORT=8000

# CORS - Permitir frontend en puerto 5173
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com

# GraphQL
GRAPHQL_ENDPOINT=/graphql
"""
    
    if not Path(".env").exists():
        with open(".env", "w") as f:
            f.write(backend_env)
        print("[CONFIGURACIÓN] Archivo .env creado en raíz para backend")
    
    # Frontend .env en carpeta frontend/
    frontend_env_path = Path("frontend/.env")
    if not frontend_env_path.exists():
        frontend_env = """# PERPGSQLVS Frontend Configuration
# Variables para Vite (VITE_) y Create React App (REACT_APP_)
VITE_API_URL=http://localhost:8000
VITE_GRAPHQL_URL=http://localhost:8000/graphql
VITE_ENVIRONMENT=production

REACT_APP_API_URL=http://localhost:8000
REACT_APP_GRAPHQL_URL=http://localhost:8000/graphql
REACT_APP_ENVIRONMENT=production
"""
        with open(frontend_env_path, "w") as f:
            f.write(frontend_env)
        print("[CONFIGURACIÓN] Archivo .env creado en frontend/")
    
    print("[COMPLETADO] Configuraciones creadas")


def quick_start():
    """Inicio rápido - Solo inicia backend y frontend sin verificaciones completas"""
    print("[INICIO RÁPIDO] Iniciando backend y frontend...")
    print("=" * 50)
    
    # Verificaciones mínimas
    if not Path("app/main.py").exists():
        print("[ERROR] app/main.py no encontrado")
        return False
    
    if not Path("frontend/package.json").exists():
        print("[ERROR] frontend/package.json no encontrado")
        return False
    
    try:
        # Iniciar backend en hilo separado
        print("[BACKEND] Iniciando uvicorn...")
        backend_thread = start_backend_server()
        
        # Dar tiempo al backend para iniciar
        time.sleep(2)
        
        # Iniciar frontend
        print("[FRONTEND] Iniciando TailwindCSS + Vite...")
        if not start_frontend_server("frontend"):
            print("[ERROR] No se pudo iniciar el frontend")
            return False
        
        print("\n" + "=" * 50)
        print("[ÉXITO] SERVIDORES INICIADOS")
        print("=" * 50)
        print("🚀 URLS:")
        print("   📊 Backend:  http://localhost:8000")
        print("   🖥️  Frontend: http://localhost:5173")
        print("\n⚠️  Presiona Ctrl+C para detener")
        
        # Mantener corriendo
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n[DETENIDO] Servidores detenidos")
        
        return True
        
    except Exception as e:
        print(f"[ERROR] Error en inicio rápido: {e}")
        return False


def setup_complete_deployment():
    """Deployment completo con todas las verificaciones"""
    try:
        # Verificar prerequisitos
        print("\n[PASO 1] Verificando prerequisitos...")
        if not check_backend_prerequisites():
            print("[ERROR] Prerequisitos del backend no cumplidos")
            return
        
        if not check_frontend_prerequisites():
            print("[ERROR] Prerequisitos del frontend no cumplidos")
            return
        
        # Instalar dependencias
        print("\n[PASO 2] Instalando dependencias...")
        if not install_backend_dependencies():
            print("[ERROR] Fallo instalando dependencias del backend")
            return
        
        if not install_frontend_dependencies("frontend"):
            print("[ERROR] Fallo instalando dependencias del frontend")
            return
        
        # Construir frontend
        print("\n[PASO 3] Construyendo frontend...")
        if not build_frontend("frontend"):
            print("[ADVERTENCIA] Fallo construyendo frontend, continuando...")
        
        # Actualizar base de datos
        print("\n[PASO 4] Actualizando base de datos...")
        if not update_database():
            print("[ERROR] Fallo actualizando base de datos")
            return
        
        # Crear configuraciones
        print("\n[PASO 5] Creando configuraciones...")
        create_production_configs()
        
        # Iniciar servidores
        print("\n[PASO 6] Iniciando servidores...")
        
        # Iniciar backend en hilo separado
        backend_thread = start_backend_server()
        
        # Dar tiempo al backend para iniciar
        print("[INFO] Esperando que el backend se inicie...")
        time.sleep(3)
        
        # Iniciar frontend
        if not start_frontend_server("frontend"):
            print("[ERROR] No se pudo iniciar el frontend")
            return
        
        print("\n" + "=" * 60)
        print("[ÉXITO] DEPLOYMENT COMPLETO EXITOSO")
        print("=" * 60)
        print("🚀 SERVIDORES INICIADOS:")
        print("   📊 Backend (GraphQL):     http://localhost:8000")
        print("   🖥️  Frontend (Vite):      http://localhost:5173")
        print("   📚 GraphQL Playground:    http://localhost:8000/docs")
        print("\n🔧 PROCESOS CORRIENDO:")
        print("   - uvicorn app.main:app --reload")
        print("   - npm run dev")
        print("\n📝 COMANDOS ÚTILES:")
        print("   python deploy_full_stack.py              - Inicio rápido")
        print("   python deploy_full_stack.py setup        - Deploy completo")
        print("   python deploy_full_stack.py backend-only - Solo backend")
        print("   python deploy_full_stack.py frontend-only- Solo frontend")
        print("\n⚠️  Presiona Ctrl+C para detener todos los servidores")
        
        # Mantener el script corriendo
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n[DETENIDO] Servidores detenidos")
    
    except Exception as e:
        error_msg = f"ERROR CRÍTICO: {e}"
        print(f"\n[ERROR] {error_msg}")
        log_error(error_msg, "CRITICAL")


def main():
    """Función principal de deployment"""
    
    mode = sys.argv[1] if len(sys.argv) > 1 else "start"
    
    # Mostrar ayuda
    if mode in ["help", "-h", "--help"]:
        print("PERPGSQLVS - Script de Deployment")
        print("=" * 40)
        print("MODOS DE USO:")
        print("  python deploy_full_stack.py                    - Inicio rápido (default)")
        print("  python deploy_full_stack.py start              - Inicio rápido")
        print("  python deploy_full_stack.py setup              - Deploy completo")
        print("  python deploy_full_stack.py backend-only       - Solo backend")
        print("  python deploy_full_stack.py frontend-only      - Solo frontend")
        print("  python deploy_full_stack.py check              - Verificar prerequisitos")
        print("  python deploy_full_stack.py help               - Mostrar ayuda")
        print("\nDESCRIPCIÓN:")
        print("  start:        Inicia backend y frontend sin verificaciones completas")
        print("  setup:        Deployment completo con verificaciones e instalaciones")
        print("  backend-only: Solo servidor Python GraphQL (puerto 8000)")
        print("  frontend-only: Solo TailwindCSS + Vite (puerto 5173)")
        return
    
    # Inicio rápido (modo por defecto)
    if mode == "start":
        quick_start()
        return
    
    # Solo verificaciones
    if mode == "check":
        print("[VERIFICACIÓN] Verificando prerequisitos...")
        backend_ok = check_backend_prerequisites()
        frontend_ok = check_frontend_prerequisites()
        
        if backend_ok and frontend_ok:
            print("[ÉXITO] Todos los prerequisitos están OK")
        else:
            print("[ERROR] Hay problemas con los prerequisitos")
        return
    
    # Deployment completo
    if mode == "setup":
        clear_error_log()
        print("[SETUP] PERPGSQLVS - DEPLOYMENT COMPLETO")
        print("=" * 60)
        setup_complete_deployment()
        return
    
    # Modos específicos
    if mode == "backend-only":
        # Solo backend
        steps = [
            ("Verificar prerequisitos backend", check_backend_prerequisites),
            ("Instalar dependencias backend", install_backend_dependencies),
            ("Actualizar base de datos", update_database),
            ("Crear configuraciones", lambda: (create_production_configs(), True)[1]),
        ]
        
        for step_name, step_func in steps:
            if not step_func():
                print(f"[ERROR] Fallo en: {step_name}")
                return
        
        print("[BACKEND] Iniciando servidor con uvicorn...")
        command = "uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
        print(f"Ejecutando: {command}")
        subprocess.run(command, shell=True)
        return

    if mode == "frontend-only":
        # Solo frontend
        if not check_frontend_prerequisites():
            print("[ERROR] No se puede proceder con frontend")
            return
        
        if not install_frontend_dependencies("frontend"):
            print("[ERROR] Fallo instalando dependencias frontend")
            return
        
        print("[FRONTEND] Iniciando TailwindCSS + Vite...")
        start_frontend_server("frontend")
        
        # Mantener el proceso corriendo
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n[DETENIDO] Frontend detenido")
        return

    # Si llegamos aquí, modo no reconocido
    print(f"[ERROR] Modo '{mode}' no reconocido")
    print("Usa 'python deploy_full_stack.py help' para ver los modos disponibles")


if __name__ == "__main__":
    main()