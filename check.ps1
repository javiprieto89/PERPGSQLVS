param(
    [string]$dir1,
    [string]$dir2
)

# Validación de directorios
if (-not (Test-Path $dir1)) {
    Write-Host "❌ El directorio '$dir1' no existe." -ForegroundColor Red
    exit
}

if (-not (Test-Path $dir2)) {
    Write-Host "❌ El directorio '$dir2' no existe." -ForegroundColor Red
    exit
}

# Obtener archivos como rutas relativas desde la raíz de cada directorio
$files1 = Get-ChildItem -Path $dir1 -Recurse -File | ForEach-Object {
    $_.FullName.Substring($dir1.Length).TrimStart('\')
}
$files2 = Get-ChildItem -Path $dir2 -Recurse -File | ForEach-Object {
    $_.FullName.Substring($dir2.Length).TrimStart('\')
}

# Comparar archivos
$soloEnDir1 = Compare-Object -ReferenceObject $files1 -DifferenceObject $files2 -PassThru | Where-Object { $_ -in $files1 }
$soloEnDir2 = Compare-Object -ReferenceObject $files1 -DifferenceObject $files2 -PassThru | Where-Object { $_ -in $files2 }

# Mostrar resultados
Write-Host "`n📁 Archivos solo en ${dir1}:" -ForegroundColor Cyan
if ($soloEnDir1) {
    $soloEnDir1 | ForEach-Object { Write-Host " - $_" }
} else {
    Write-Host " (ninguno)"
}

Write-Host "`n📁 Archivos solo en ${dir2}:" -ForegroundColor Yellow
if ($soloEnDir2) {
    $soloEnDir2 | ForEach-Object { Write-Host " - $_" }
} else {
    Write-Host " (ninguno)"
}
