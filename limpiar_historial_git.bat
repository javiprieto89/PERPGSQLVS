@echo off
setlocal enabledelayedexpansion

:: ==== VERIFICAR QUE SEA UN REPO GIT ====
if not exist ".git" (
    echo [ERROR] Esta carpeta no es un repositorio Git.
    exit /b 1
)

:: ==== USAR PARÁMETRO O PEDIR INPUT ====
if "%~1"=="" (
    set /p COMMIT_MSG=Escribí el nuevo mensaje para todos los commits: 
    if "!COMMIT_MSG!"=="" (
        echo [ERROR] El mensaje no puede estar vacío.
        exit /b 1
    )
) else (
    set "COMMIT_MSG=%~1"
)

:: ==== VERIFICAR git-filter-repo ====
where git-filter-repo >nul 2>nul
if errorlevel 1 (
    echo [ERROR] git-filter-repo no está instalado.
    echo Descargalo desde: https://github.com/newren/git-filter-repo/releases
    exit /b 1
)

:: ==== CONFIRMACIÓN ====
echo.
echo Vas a reemplazar todos los mensajes de commit por:
echo "%COMMIT_MSG%"
echo En el repo ubicado en: %CD%
pause

:: ==== REESCRIBIR HISTORIAL ====
git filter-repo --message-callback "return b'%COMMIT_MSG%'"

:: ==== PUSH FORZADO ====
echo Subiendo cambios con push --force...
git push origin --force

echo.
echo [✔] Historial limpiado con éxito.
pause
