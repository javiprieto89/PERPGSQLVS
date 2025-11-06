@echo off
REM ─────────────────────────────────────────────
REM 🚀 Levantar servidor Uvicorn desde la raíz del proyecto
REM Ejecuta: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
REM ─────────────────────────────────────────────

echo Iniciando servidor Uvicorn...
call .\venv\Scripts\activate.bat
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
