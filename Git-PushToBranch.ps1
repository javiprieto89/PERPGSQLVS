# S:\scripts\Git-PushToBranch.ps1
param (
    [Parameter(Mandatory = $true)]
    [string]$Branch
)

Write-Host "========================================="
Write-Host "Subiendo cambios a la rama: $Branch"
Write-Host "========================================="

# Verificar si hay cambios sin commitear
$changes = git status --porcelain

if (-not $changes) {
    Write-Host "No hay cambios para commitear." -ForegroundColor Yellow
    return
}

# Pedir mensaje de commit
Write-Host "`nIngresá el mensaje para el commit:" -ForegroundColor Cyan
$message = Read-Host

if (-not $message) {
    Write-Host "No se ingresó mensaje de commit. Cancelando." -ForegroundColor Red
    return
}

# Ejecutar git add
git add .

# Hacer commit
git commit -m "$message"

# Verificar si la rama existe localmente
$localBranches = git branch --list $Branch

if (-not $localBranches) {
    Write-Host "La rama '$Branch' no existe localmente. Intentando crearla..." -ForegroundColor Yellow
    git checkout -b $Branch
} else {
    git checkout $Branch
}

# Push
git push origin $Branch

Write-Host "`nCambios subidos correctamente a '$Branch'" -ForegroundColor Green
