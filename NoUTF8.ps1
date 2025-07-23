function Find-NonUtf8Files {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Path,
        [switch]$IncludeAllFiles  # Opcional: incluir incluso archivos binarios
    )
    
    if (-not (Test-Path $Path)) {
        Write-Host "❌ La ruta '$Path' no existe" -ForegroundColor Red
        return
    }
    
    Write-Host "🔍 Buscando archivos no UTF-8 en: $Path" -ForegroundColor Cyan
    Write-Host ""
    
    $foundFiles = 0
    
    Get-ChildItem -Path $Path -Recurse -File | ForEach-Object {
        # Si no queremos incluir todos los archivos, saltamos algunos binarios obvios
        if (-not $IncludeAllFiles) {
            $skipExtensions = @('.exe', '.dll', '.bin', '.zip', '.rar', '.7z', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.ico', '.mp3', '.mp4', '.avi', '.mkv', '.mov')
            if ($skipExtensions -contains $_.Extension.ToLower()) {
                return
            }
        }
        
        try {
            $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
            
            if ($bytes.Length -gt 0) {
                # Verificar si tiene BOM UTF-8
                $hasUtf8Bom = ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)
                
                if (-not $hasUtf8Bom) {
                    # Probar UTF-8 estricto
                    try {
                        $utf8 = [System.Text.UTF8Encoding]::new($false, $true)
                        $text = $utf8.GetString($bytes)
                        
                        # Si contiene el carácter de reemplazo, no es UTF-8 válido
                        if ($text.Contains([char]0xFFFD)) {
                            throw "No es UTF-8"
                        }
                    }
                    catch {
                        $foundFiles++
                        Write-Host "🔴 NO UTF-8: $($_.Name)" -ForegroundColor Red
                        Write-Host "   Ruta: $($_.FullName)" -ForegroundColor Gray
                        Write-Host "   Extensión: $($_.Extension)" -ForegroundColor Yellow
                        Write-Host ""
                    }
                }
            }
        }
        catch {
            # Error al leer el archivo (probablemente binario o sin permisos)
            if ($IncludeAllFiles) {
                Write-Host "⚠️  Error al leer: $($_.Name)" -ForegroundColor Magenta
            }
        }
    }
    
    Write-Host "✅ Búsqueda completada. Archivos no UTF-8 encontrados: $foundFiles" -ForegroundColor Green
}