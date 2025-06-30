# S:\scripts\Kill-Port8000.ps1
Write-Host "Buscando procesos usando el puerto 8000..."

# Obtener el/los PID que usan el puerto 8000
$targetPids = netstat -ano | Select-String ":8000\s.*LISTENING" | ForEach-Object {
    ($_ -split '\s+')[-1]
} | Select-Object -Unique

if (-not $targetPids) {
    Write-Host "No hay ningún proceso escuchando en el puerto 8000." -ForegroundColor Yellow
    return
}

foreach ($targetPid in $targetPids) {
    try {
        $proc = Get-Process -Id $targetPid -ErrorAction Stop
        Write-Host "`nProceso encontrado:"
        Write-Host "  Nombre : $($proc.ProcessName)"
        Write-Host "  PID    : $targetPid"
    } catch {
        Write-Host "`nPID $targetPid ya no existe o no se pudo obtener el proceso."
    }
}

Write-Host "`n¿Querés terminar estos procesos? (S/N): " -NoNewline
$confirm = Read-Host

if ($confirm -match '^[sS]') {
    foreach ($targetPid in $targetPids) {
        try {
            Stop-Process -Id $targetPid -Force -ErrorAction Stop
            Write-Host "Proceso $targetPid terminado." -ForegroundColor Green
        } catch {
            Write-Host ('Error al intentar terminar el proceso ' + $targetPid + ': ' + $_.Exception.Message) -ForegroundColor Red
        }
    }
} else {
    Write-Host "Cancelado por el usuario." -ForegroundColor Cyan
}
