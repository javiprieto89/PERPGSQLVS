# C:\Users\javie\OneDrive\_Development\PERPGSQLVS\Kill-Port8000.ps1
Param(
    [Parameter(Mandatory=$false)]
    [int]$Port = 8000
)

# Forzar consola en UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "Buscando procesos que usan el puerto ${Port}..."

# Patrón para netstat que incluya espacio tras el puerto
$pattern = ":{0}\s" -f $Port

# Extraer PIDs únicos
$targetPids = netstat -ano | Select-String $pattern | ForEach-Object {
    ($_ -split '\s+')[-1]
} | Sort-Object -Unique

if (-not $targetPids) {
    Write-Host "No hay ningún proceso usando el puerto ${Port}." -ForegroundColor Yellow
    return
}

Write-Host "`nProcesos detectados usando el puerto ${Port}:`n"
foreach ($targetPid in $targetPids) {
    try {
        $proc = Get-Process -Id $targetPid -ErrorAction Stop
        Write-Host "  PID: ${targetPid} | Nombre: $($proc.ProcessName)"
    } catch {
        Write-Host "  PID: ${targetPid} | No se pudo obtener el nombre del proceso." -ForegroundColor DarkYellow
    }
}

$confirm = Read-Host "`n¿Querés terminar estos procesos? (S/N)"
if ($confirm -match '^[sS]') {
    foreach ($targetPid in $targetPids) {
        try {
            Stop-Process -Id $targetPid -Force -ErrorAction Stop
            Write-Host "Proceso ${targetPid} terminado." -ForegroundColor Green
        } catch {
            Write-Host "Error al intentar terminar el proceso ${targetPid}: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Start-Sleep -Seconds 2
$stillBusy = netstat -ano | Select-String $pattern

if ($stillBusy) {
    Write-Host "`nEl puerto ${Port} sigue ocupado!" -ForegroundColor Red
    $confirmKillAll = Read-Host "¿Querés matar todos los procesos 'python' o 'uvicorn'? (S/N)"
    if ($confirmKillAll -match '^[sS]') {
        Get-Process | Where-Object { $_.ProcessName -match "python|uvicorn" } | ForEach-Object {
            try {
                Write-Host "Matando proceso $($_.Id) - $($_.ProcessName)..." -ForegroundColor Yellow
                Stop-Process -Id $_.Id -Force -ErrorAction Stop
                Write-Host "Proceso $($_.Id) terminado." -ForegroundColor Green
            } catch {
                Write-Host "Error matando proceso $($_.Id): $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "Saliendo sin matar más procesos." -ForegroundColor Cyan
    }
} else {
    Write-Host "`nEl puerto ${Port} quedó liberado correctamente." -ForegroundColor Green
}
