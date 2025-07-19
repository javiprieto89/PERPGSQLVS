# Listar archivos no ignorados por .gitignore (sin usar Git)
$root = Get-Location
$gitignore = "$root\.gitignore"
$salida = "$root\archivos_visibles.txt"

if (-not (Test-Path $gitignore)) {
    Write-Error "No se encontró el archivo .gitignore"
    exit 1
}

# Cargar patrones válidos del .gitignore
$rawPatterns = Get-Content $gitignore | Where-Object {
    ($_ -notmatch '^\s*$') -and ($_ -notmatch '^\s*#')
}

# Función para verificar si un archivo debe ser ignorado
function Test-GitIgnoreMatch {
    param(
        [string]$FilePath,
        [string]$Pattern
    )
    
    $pattern = $Pattern.Trim()
    
    # Convertir separadores de ruta
    $filePath = $FilePath -replace '\\', '/'
    
    # Si el patrón termina con /, es un directorio
    if ($pattern.EndsWith('/')) {
        $pattern = $pattern.TrimEnd('/')
        # Verificar si el archivo está dentro de este directorio
        return $filePath -like "*/$pattern/*" -or $filePath -like "$pattern/*"
    }
    
    # Si el patrón empieza con /, es desde la raíz
    if ($pattern.StartsWith('/')) {
        $pattern = $pattern.TrimStart('/')
        return $filePath -like "$pattern" -or $filePath -like "$pattern/*"
    }
    
    # Si contiene /, es un patrón de ruta específica
    if ($pattern.Contains('/')) {
        return $filePath -like "*/$pattern" -or $filePath -like "$pattern" -or $filePath -like "*/$pattern/*"
    }
    
    # Patrón simple - puede estar en cualquier lugar
    # Verificar nombre de archivo
    $fileName = Split-Path $filePath -Leaf
    if ($fileName -like $pattern) {
        return $true
    }
    
    # Verificar cualquier parte de la ruta
    $pathParts = $filePath -split '/'
    foreach ($part in $pathParts) {
        if ($part -like $pattern) {
            return $true
        }
    }
    
    # Verificar rutas que contengan el patrón
    return $filePath -like "*/$pattern/*" -or $filePath -like "$pattern/*"
}

# Recorrer archivos
$archivosVisibles = @()

Get-ChildItem -Recurse -File | ForEach-Object {
    $relPath = $_.FullName.Substring($root.Path.Length + 1)
    
    $ignorado = $false
    foreach ($pattern in $rawPatterns) {
        if (Test-GitIgnoreMatch -FilePath $relPath -Pattern $pattern) {
            $ignorado = $true
            break
        }
    }
    
    if (-not $ignorado) {
        $archivosVisibles += $relPath
    }
}

# Guardar archivo
$archivosVisibles | Sort-Object | Set-Content -Encoding UTF8 $salida
Write-Host "`n✔ Exportado a $salida (archivos visibles: $($archivosVisibles.Count))"

# Mostrar algunos ejemplos de archivos ignorados para verificación
Write-Host "`n📋 Primeros 10 archivos visibles:"
$archivosVisibles | Select-Object -First 10 | ForEach-Object {
    Write-Host "  $_"
}