# ============================================================
# Restaurar base de datos LubricentroDB2 desde backup (.bak)
# Servidor : 127.0.0.1
# Usuario  : sa
# Clave    : Ladeda78
# Backup   : .\db\LubricentroDB2.bak
# Acción   : DROP si existe + RESTORE con ubicación por defecto
# ============================================================

param (
    [string]$Server = "127.0.0.1",
    [string]$User = "sa",
    [string]$Password = "Ladeda78",
    [string]$Database = "LubricentroDB2",
    [string]$BackupFile = ".\db\LubricentroDB2.bak"
)

Write-Host "============================================================"
Write-Host " Restaurando base de datos: $Database"
Write-Host "============================================================"

# Verificar existencia del backup
if (-not (Test-Path $BackupFile)) {
    Write-Host "ERROR: No se encontró el archivo de backup en $BackupFile"
    exit 1
}

# Detectar la carpeta DATA predeterminada
try {
    $dataPath = Invoke-Sqlcmd -S $Server -U $User -P $Password -C -Query "
        DECLARE @dataPath NVARCHAR(260);
        EXEC master.dbo.xp_instance_regread 
            N'HKEY_LOCAL_MACHINE', 
            N'Software\Microsoft\MSSQLServer\MSSQLServer', 
            N'DefaultData', 
            @dataPath OUTPUT;
        SELECT @dataPath AS DefaultDataPath;
    " | Select-Object -ExpandProperty DefaultDataPath
} catch {
    Write-Host "No se pudo detectar la carpeta DATA. Se usará la predeterminada."
    $dataPath = "C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\"
}

# Asegurar barra final
if (-not $dataPath.EndsWith("\")) { $dataPath += "\" }

# Armar nombres de archivos destino
$mdf = "$($dataPath)$($Database).mdf"
$ldf = "$($dataPath)$($Database)_log.ldf"

# Comandos SQL
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
WITH MOVE '$Database' TO N'$mdf',
     MOVE '${Database}_log' TO N'$ldf',
     REPLACE, RECOVERY;
"@

try {
    Write-Host "Cerrando conexiones y eliminando base existente (si aplica)..."
    Invoke-Sqlcmd -S $Server -U $User -P $Password -C -Query $dropCmd

    Write-Host "Restaurando base desde $BackupFile..."
    Invoke-Sqlcmd -S $Server -U $User -P $Password -C -Query $restoreCmd

    Write-Host "Base de datos restaurada correctamente."
} catch {
    Write-Host "ERROR durante la restauración: $($_.Exception.Message)"
    exit 1
}

Write-Host "Proceso completado."
exit 0
