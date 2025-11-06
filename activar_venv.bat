@echo off
REM ─────────────────────────────────────────────
REM 🐍 Activar entorno virtual de Python (PowerShell)
REM Ejecuta: .\venv\Scripts\activate.ps1 desde la raíz del proyecto
REM ─────────────────────────────────────────────

echo Activando entorno virtual...
powershell -ExecutionPolicy Bypass -NoExit -Command "Set-Location '%~dp0'; .\venv\Scripts\Activate.ps1"
echo Entorno virtual activado.