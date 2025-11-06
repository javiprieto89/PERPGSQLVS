@echo off
REM ─────────────────────────────────────────────
REM 🚀 Iniciar entorno completo (Backend + Frontend)
REM Backend: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
REM Frontend: pnpm run dev (desde carpeta ./frontend)
REM ─────────────────────────────────────────────

echo ============================================
echo 🔥 Iniciando entorno completo de desarrollo
echo ============================================
echo.

REM ─── BACKEND ─────────────────────────────────
echo [Backend] Activando entorno virtual...
call .\venv\Scripts\activate.bat

echo [Backend] Iniciando servidor Uvicorn...
start "Backend - Uvicorn" cmd /k "uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

REM ─── FRONTEND ────────────────────────────────
echo [Frontend] Iniciando pnpm run dev...
start "Frontend - PNPM" cmd /k "cd frontend && pnpm run dev"

echo.
echo ✅ Todo iniciado correctamente.
echo (Se abrieron dos ventanas: Backend y Frontend)
