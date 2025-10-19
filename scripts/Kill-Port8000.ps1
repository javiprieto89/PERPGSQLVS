Param(
    [Parameter(Mandatory = $false)]
    [int]$BackendPort = 8000,
    [Parameter(Mandatory = $false)]
    [int]$FrontendPort = 5173
)

# Forzar consola en UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Stop-ProcessesOnPort {
    param(
        [int]$Port,
        [string]$Description
    )
    
    Write-Host "=== BUSCANDO PROCESOS EN PUERTO $Port ($Description) ===" -ForegroundColor Cyan
    
    # Patron para netstat que incluya espacio tras el puerto
    $pattern = ":$Port\s"
    
    # Extraer PIDs unicos
    $targetPids = netstat -ano | Select-String $pattern | ForEach-Object {
        ($_ -split '\s+')[-1]
    } | Sort-Object -Unique
    
    if ($targetPids) {
        Write-Host "`nProcesos detectados usando el puerto $Port :`n" -ForegroundColor Yellow
        foreach ($targetPid in $targetPids) {
            try {
                $proc = Get-Process -Id $targetPid -ErrorAction Stop
                Write-Host "  PID: $targetPid | Nombre: $($proc.ProcessName)" -ForegroundColor White
            }
            catch {
                Write-Host "  PID: $targetPid | No se pudo obtener el nombre del proceso." -ForegroundColor DarkYellow
            }
        }
        
        $confirm = Read-Host "`nQueres terminar estos procesos en puerto $Port ? (S/N)"
        if ($confirm -match '^[sS]') {
            foreach ($targetPid in $targetPids) {
                try {
                    Stop-Process -Id $targetPid -Force -ErrorAction Stop
                    Write-Host "Proceso $targetPid terminado." -ForegroundColor Green
                }
                catch {
                    Write-Host "Error al intentar terminar el proceso $targetPid : $($_.Exception.Message)" -ForegroundColor Red
                }
            }
        }
    }
    else {
        Write-Host "No hay procesos usando directamente el puerto $Port ." -ForegroundColor Yellow
    }
}

# Matar procesos en puerto backend (8000)
Stop-ProcessesOnPort -Port $BackendPort -Description "Backend"

# Matar procesos en puerto frontend (5173)
Stop-ProcessesOnPort -Port $FrontendPort -Description "Frontend"

Write-Host "`n=== BUSCANDO PROCESOS PYTHON/UVICORN COLGADOS ===" -ForegroundColor Cyan

# Buscar procesos Python/Uvicorn especificamente relacionados con tu proyecto
$pythonProcesses = Get-Process -ErrorAction SilentlyContinue | Where-Object { 
    $_.ProcessName -match "python|uvicorn"
}

if ($pythonProcesses) {
    Write-Host "`nProcesos Python/Uvicorn encontrados:" -ForegroundColor Yellow
    foreach ($proc in $pythonProcesses) {
        try {
            $startTime = $proc.StartTime.ToString("HH:mm:ss")
            $cpuTime = [math]::Round($proc.CPU, 2)
            Write-Host "  PID: $($proc.Id) | Nombre: $($proc.ProcessName) | Inicio: $startTime | CPU: $cpuTime s" -ForegroundColor White
        }
        catch {
            Write-Host "  PID: $($proc.Id) | Nombre: $($proc.ProcessName) | (Error obteniendo detalles)" -ForegroundColor DarkYellow
        }
    }

    $confirmKillPython = Read-Host "`nQueres terminar TODOS los procesos Python/Uvicorn? (S/N)"
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

Write-Host "`n=== BUSCANDO PROCESOS VITE/NODE COLGADOS ===" -ForegroundColor Cyan

# Buscar procesos Node/Vite especificamente relacionados con tu proyecto
$nodeProcesses = Get-Process -ErrorAction SilentlyContinue | Where-Object { 
    $_.ProcessName -match "node|vite"
}

if ($nodeProcesses) {
    Write-Host "`nProcesos Node/Vite encontrados:" -ForegroundColor Yellow
    foreach ($proc in $nodeProcesses) {
        try {
            $startTime = $proc.StartTime.ToString("HH:mm:ss")
            $cpuTime = [math]::Round($proc.CPU, 2)
            Write-Host "  PID: $($proc.Id) | Nombre: $($proc.ProcessName) | Inicio: $startTime | CPU: $cpuTime s" -ForegroundColor White
        }
        catch {
            Write-Host "  PID: $($proc.Id) | Nombre: $($proc.ProcessName) | (Error obteniendo detalles)" -ForegroundColor DarkYellow
        }
    }

    $confirmKillNode = Read-Host "`nQueres terminar TODOS los procesos Node/Vite? (S/N)"
    if ($confirmKillNode -match '^[sS]') {
        foreach ($proc in $nodeProcesses) {
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
    Write-Host "No se encontraron procesos Node/Vite." -ForegroundColor Green
}

Write-Host "`n=== BUSQUEDA DE PROCESOS ZOMBIE/COLGADOS ===" -ForegroundColor Cyan

$suspiciousProcesses = Get-Process | Where-Object { 
    (-not $_.Responding) -and 
    ($_.ProcessName -match "python|uvicorn|node|vite|cmd|powershell|conhost")
}

if ($suspiciousProcesses) {
    Write-Host "`nProcesos que no responden encontrados:" -ForegroundColor Red
    foreach ($proc in $suspiciousProcesses) {
        Write-Host "  PID: $($proc.Id) | Nombre: $($proc.ProcessName) | Estado: NO RESPONDE" -ForegroundColor Red
    }

    $confirmKillZombie = Read-Host "`nQueres terminar los procesos que no responden? (S/N)"
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

Write-Host "`n=== VERIFICACION FINAL ===" -ForegroundColor Cyan
Start-Sleep -Seconds 2

# Verificar puerto backend
$backendPattern = ":$BackendPort\s"
$backendCheck = netstat -ano | Select-String $backendPattern
if ($backendCheck) {
    Write-Host "ADVERTENCIA! El puerto $BackendPort (backend) aun esta ocupado:" -ForegroundColor Red
    $backendCheck | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
}
else {
    Write-Host "Puerto $BackendPort (backend) liberado correctamente." -ForegroundColor Green
}

# Verificar puerto frontend
$frontendPattern = ":$FrontendPort\s"
$frontendCheck = netstat -ano | Select-String $frontendPattern
if ($frontendCheck) {
    Write-Host "ADVERTENCIA! El puerto $FrontendPort (frontend) aun esta ocupado:" -ForegroundColor Red
    $frontendCheck | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
}
else {
    Write-Host "Puerto $FrontendPort (frontend) liberado correctamente." -ForegroundColor Green
}

if ($backendCheck -or $frontendCheck) {
    Write-Host "`nSi el problema persiste, prueba:" -ForegroundColor Yellow
    Write-Host "  1. Reiniciar la terminal/consola donde estaba corriendo el backend/frontend" -ForegroundColor White
    Write-Host "  2. Cerrar completamente VSCode o tu IDE" -ForegroundColor White
    Write-Host "  3. Usar puertos diferentes:" -ForegroundColor White
    Write-Host "     - Backend: uvicorn app.main:app --port 8001" -ForegroundColor White
    Write-Host "     - Frontend: npm run dev -- --port 5174" -ForegroundColor White
}

Write-Host "`nPresiona cualquier tecla para salir..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')