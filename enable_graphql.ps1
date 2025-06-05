
# enable_graphql.ps1
# Script para habilitar GraphQL en un backend FastAPI basado en modelos SQLAlchemy

param (
    [string]$AppPath = ".\app"
)

Write-Host "📦 Iniciando adaptación de backend FastAPI a GraphQL..."

# 1. Instalar dependencia strawberry
Write-Host "🔧 Instalando Strawberry GraphQL..."
pip install strawberry-graphql[fastapi] | Out-Null

# 2. Crear carpeta graphql si no existe
$graphqlPath = Join-Path $AppPath "graphql"
if (!(Test-Path $graphqlPath)) {
    New-Item -Path $graphqlPath -ItemType Directory | Out-Null
    Write-Host "📁 Carpeta 'graphql' creada en $graphqlPath"
}

# 3. Crear archivo types.py
$typesPath = Join-Path $graphqlPath "types.py"
@"
# types.py - generado automáticamente
import strawberry
"@ | Out-File -Encoding UTF8 $typesPath

# 4. Leer modelos desde app/models
$modelDir = Join-Path $AppPath "models"
$modelFiles = Get-ChildItem -Path $modelDir -Filter *.py

foreach ($file in $modelFiles) {
    $modelName = $file.BaseName
    $lines = Get-Content $file.FullName

    # Buscar clase con el mismo nombre que el archivo o CamelCase probable
    $classLine = $lines | Where-Object { $_ -match "class\s+\w+\(Base\)" }

    if ($classLine) {
        $className = ($classLine -replace "class\s+(\w+)\(Base\).*", '$1').Trim()

        @"
@strawberry.type
class ${className}:
    pass  # TODO: completar campos manualmente

"@ | Add-Content $typesPath
    }
}

Write-Host "✅ Archivo 'types.py' generado con clases base."

# 5. Crear archivo schema.py con base de Query
$schemaPath = Join-Path $graphqlPath "schema.py"
@"
# schema.py - generado automáticamente
import strawberry
from .types import *

@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "GraphQL listo 🚀"

schema = strawberry.Schema(query=Query)
"@ | Out-File -Encoding UTF8 $schemaPath

Write-Host "✅ Archivo 'schema.py' generado."

# 6. Instrucciones para main.py
Write-Host "`n📌 COPIÁ Y PEGÁ esto en tu main.py:"
Write-Host @"
# >>> INICIO BLOQUE GRAPHQL
from strawberry.fastapi import GraphQLRouter
from app.graphql.schema import schema

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")
# <<< FIN BLOQUE GRAPHQL
"@

Write-Host "`n✅ Adaptación completa. Accedé a: http://localhost:8000/graphql"
