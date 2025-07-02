Param(
    [Parameter(Mandatory = $false)]
    [int]$Port = 8000
)

# Forzar consola en UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "=== BUSCANDO PROCESOS EN PUERTO ${Port} ===" -ForegroundColor Cyan

# Patrón para netstat que incluya espacio tras el puerto
$pattern = ":{0}\s" -f $Port

# Extraer PIDs únicos
$targetPids = netstat -ano | Select-String $pattern | ForEach-Object {
    ($_ -split '\s+')[-1]
} | Sort-Object -Unique

if ($targetPids) {
    Write-Host "`nProcesos detectados usando el puerto ${Port}:`n" -ForegroundColor Yellow
    foreach ($targetPid in $targetPids) {
        try {
            $proc = Get-Process -Id $targetPid -ErrorAction Stop
            Write-Host "  PID: ${targetPid} | Nombre: $($proc.ProcessName)" -ForegroundColor White
        }
        catch {
            Write-Host "  PID: ${targetPid} | No se pudo obtener el nombre del proceso." -ForegroundColor DarkYellow
        }
    }

    $confirm = Read-Host "`n¿Querés terminar estos procesos? (S/N)"
    if ($confirm -match '^[sS]') {
        foreach ($targetPid in $targetPids) {
            try {
                Stop-Process -Id $targetPid -Force -ErrorAction Stop
                Write-Host "Proceso ${targetPid} terminado." -ForegroundColor Green
            }
            catch {
                Write-Host "Error al intentar terminar el proceso ${targetPid}: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
}
else {
    Write-Host "No hay procesos usando directamente el puerto ${Port}." -ForegroundColor Yellow
}

Write-Host "`n=== BUSCANDO PROCESOS PYTHON/UVICORN COLGADOS ===" -ForegroundColor Cyan

# Buscar procesos Python/Uvicorn específicamente relacionados con tu proyecto
$pythonProcesses = Get-Process -ErrorAction SilentlyContinue | Where-Object { 
    $_.ProcessName -match "python|uvicorn" -and
    ($_.CommandLine -like "*app.main*" -or 
    $_.CommandLine -like "*uvicorn*" -or
    $_.CommandLine -like "*8000*" -or
    $_.Path -like "*perpenv*" -or
    $_.Path -like "*PERPGSQLVS*")
}

if (-not $pythonProcesses) {
    $pythonProcesses = Get-Process -ErrorAction SilentlyContinue | Where-Object { 
        $_.ProcessName -match "python|uvicorn"
    }
}

if ($pythonProcesses) {
    Write-Host "`nProcesos Python/Uvicorn encontrados:" -ForegroundColor Yellow
    foreach ($proc in $pythonProcesses) {
        try {
            $startTime = $proc.StartTime.ToString("HH:mm:ss")
            $cpuTime = [math]::Round($proc.CPU, 2)
            Write-Host "  PID: $($proc.Id) | Nombre: $($proc.ProcessName) | Inicio: $startTime | CPU: ${cpuTime}s" -ForegroundColor White

            # Intentar mostrar la línea de comandos si es posible
            try {
                $cmdLine = (Get-WmiObject Win32_Process -Filter "ProcessId = $($proc.Id)").CommandLine
                if ($cmdLine -and $cmdLine.Length -gt 0) {
                    $shortCmd = if ($cmdLine.Length -gt 80) { $cmdLine.Substring(0, 80) + "..." } else { $cmdLine }
                    Write-Host "       CMD: $shortCmd" -ForegroundColor DarkGray
                }
            }
            catch {
                # Ignorar si no se puede obtener CommandLine
            }
        }
        catch {
            Write-Host "  PID: $($proc.Id) | Nombre: $($proc.ProcessName) | (Error obteniendo detalles)" -ForegroundColor DarkYellow
        }
    }

    $confirmKillPython = Read-Host "`n¿Querés terminar TODOS los procesos Python/Uvicorn? (S/N)"
    if ($confirmKillPython -match '^[sS]') {
        foreach ($proc in $pythonProcesses) {
            try {
                Write-Host "Terminando proceso $($proc.Id) - $($proc.ProcessName)..." -ForegroundColor Yellow
                Stop-Process -Id $proc.Id -Force -ErrorAction Stop
                Write-Host "Proceso $($proc.Id) terminado." -ForegroundColor Green
            }
            catch {
                Write-Host "Error terminando proceso $($proc.Id): $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
}
else {
    Write-Host "No se encontraron procesos Python/Uvicorn." -ForegroundColor Green
}

Write-Host "`n=== BÚSQUEDA DE PROCESOS ZOMBIE/COLGADOS ===" -ForegroundColor Cyan

$suspiciousProcesses = Get-Process | Where-Object { 
    (-not $_.Responding) -and 
    ($_.ProcessName -match "python|uvicorn|cmd|powershell|conhost")
}

if ($suspiciousProcesses) {
    Write-Host "`nProcesos que no responden encontrados:" -ForegroundColor Red
    foreach ($proc in $suspiciousProcesses) {
        Write-Host "  PID: $($proc.Id) | Nombre: $($proc.ProcessName) | Estado: NO RESPONDE" -ForegroundColor Red
    }

    $confirmKillZombie = Read-Host "`n¿Querés terminar los procesos que no responden? (S/N)"
    if ($confirmKillZombie -match '^[sS]') {
        foreach ($proc in $suspiciousProcesses) {
            try {
                Write-Host "Terminando proceso zombie $($proc.Id) - $($proc.ProcessName)..." -ForegroundColor Red
                Stop-Process -Id $proc.Id -Force -ErrorAction Stop
                Write-Host "Proceso zombie $($proc.Id) terminado." -ForegroundColor Green
            }
            catch {
                Write-Host "Error terminando proceso zombie $($proc.Id): $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
}
else {
    Write-Host "No se encontraron procesos zombie." -ForegroundColor Green
}

Write-Host "`n=== VERIFICACIÓN FINAL ===" -ForegroundColor Cyan
Start-Sleep -Seconds 2

$finalCheck = netstat -ano | Select-String $pattern
if ($finalCheck) {
    Write-Host "¡ADVERTENCIA! El puerto ${Port} aún está ocupado:" -ForegroundColor Red
    $finalCheck | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }

    Write-Host "`nSi el problema persiste, prueba:" -ForegroundColor Yellow
    Write-Host "  1. Reiniciar la terminal/consola donde estaba corriendo el backend" -ForegroundColor White
    Write-Host "  2. Cerrar completamente VSCode o tu IDE" -ForegroundColor White
    Write-Host "  3. Usar un puerto diferente: uvicorn app.main:app --port 8001" -ForegroundColor White
}
else {
    Write-Host "✓ Puerto ${Port} liberado correctamente." -ForegroundColor Green
}

Write-Host "`nPresiona cualquier tecla para salir..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
