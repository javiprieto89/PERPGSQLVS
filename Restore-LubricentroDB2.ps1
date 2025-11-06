# ============================================================
# Restaurar base de datos LubricentroDB2 (versión simplificada)
# ============================================================

param (
    [string]$Server = "127.0.0.1",
    [string]$User = "sa",
    [string]$Password = "Ladeda78",
    [string]$Database = "LubricentroDB2"
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BackupFile = Join-Path $ScriptDir ".\db\LubricentroDB2.bak"
$BackupFile = (Resolve-Path $BackupFile -ErrorAction Stop).Path

Write-Host "============================================================"
Write-Host " Restaurando base de datos: $Database"
Write-Host "============================================================"

if (-not (Test-Path $BackupFile)) {
    Write-Host "ERROR: No se encontró el archivo de backup en $BackupFile"
    exit 1
}

$dropCmd = @"
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'$Database')
BEGIN
    ALTER DATABASE [$Database] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [$Database];
END
"@

$restoreCmd = @"
RESTORE DATABASE [$Database]
FROM DISK = N'$BackupFile'
WITH REPLACE, RECOVERY;
"@

try {
    Write-Host "Eliminando base existente (si aplica)..."
    & sqlcmd.exe -S $Server -U $User -P $Password -C -Q "$dropCmd"

    Write-Host "Restaurando base desde: $BackupFile"
    & sqlcmd.exe -S $Server -U $User -P $Password -C -Q "$restoreCmd"

    Write-Host "Base de datos restaurada correctamente."
}
catch {
    Write-Host "ERROR durante la restauración: $($_.Exception.Message)"
    exit 1
}

Write-Host "Proceso completado."
exit 0
