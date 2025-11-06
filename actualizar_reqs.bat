@echo off
REM ============================================================
REM Actualizar requirements.txt desde el entorno virtual
REM ============================================================

setlocal

REM 1️⃣ Verificar si existe entorno virtual
if exist ".\venv\Scripts\activate.bat" (
    call .\venv\Scripts\activate.bat
) else (
    echo No se encontró el entorno virtual en .\venv\
    pause
    exit /b
)

REM 2️⃣ Verificar que pip esté disponible
python -m pip --version >nul 2>&1
if errorlevel 1 (
    echo No se detectó pip en el entorno virtual.
    echo Ejecuta: python -m ensurepip
    pause
    exit /b
)

REM 3️⃣ Generar o actualizar requirements.txt
echo Actualizando requirements.txt...
python -m pip freeze > requirements.txt

if %errorlevel%==0 (
    echo requirements.txt actualizado correctamente.
) else (
    echo Error al generar requirements.txt.
    pause
    exit /b
)

REM 4️⃣ Finalizar
echo.
echo Proceso completado.
pause
endlocal
