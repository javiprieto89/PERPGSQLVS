# ============================================================
# Backup de la base de datos LubricentroDB2 a archivo .bak
# Servidor : 127.0.0.1
# Usuario  : sa
# Clave    : Ladeda78
# Destino  : .\db\LubricentroDB2.bak
# Modo     : Sobrescribe si existe + usa compresión
# ============================================================

param (
    [string]$Server = "127.0.0.1",
    [string]$User = "sa",
    [string]$Password = "Ladeda78",
    [string]$Database = "LubricentroDB2",
    [string]$BackupFile = ".\db\LubricentroDB2.bak"
)

Write-Host "============================================================"
Write-Host " Generando backup de la base de datos: $Database"
Write-Host "============================================================"

# Asegurar que la carpeta db exista
$backupDir = Split-Path -Parent $BackupFile
if (-not (Test-Path $backupDir)) {
    Write-Host "Creando carpeta de destino: $backupDir"
    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
}

# Eliminar backup anterior si existe
if (Test-Path $BackupFile) {
    Write-Host "Eliminando backup anterior..."
    Remove-Item $BackupFile -Force
}

# Comando de backup
$backupCmd = @"
BACKUP DATABASE [$Database]
TO DISK = N'$BackupFile'
WITH INIT, COMPRESSION, STATS = 5;
"@

try {
    Write-Host "Iniciando backup..."
    Invoke-Sqlcmd -S $Server -U $User -P $Password -C -Query $backupCmd
    Write-Host "Backup completado correctamente en $BackupFile"
} catch {
    Write-Host "ERROR durante el backup: $($_.Exception.Message)"
    exit 1
}

Write-Host "Proceso finalizado."
exit 0
