# PERPGSQLVS

PERPGSQLVS es un pequeño proyecto full-stack compuesto por un backend basado en Python GraphQL y un frontend en React. La API expone endpoints GraphQL, mientras que el frontend utiliza Vite y Tailwind CSS.

## Configuración

Copiá el archivo `.env.template` como `.env` y ajustá las variables necesarias para tu entorno. Al menos deberías establecer `SQLALCHEMY_DATABASE_URL`, `ENVIRONMENT`, `DEBUG` y `SECRET_KEY`.

## Estructura del proyecto

- `app/`: lógica de negocio, modelos, resolvers GraphQL, esquemas
- `frontend/`: aplicación React con Vite y Tailwind CSS
- `db/`: scripts y diagramas de la base de datos

## Base de datos (carpeta `db/`)

Incluye todo lo necesario para crear y entender la base:

- `init_database.sql`: script SQL completo que crea todas las tablas, relaciones y datos de prueba
- `LubricentroDB2.dbml`: modelo en formato dbml para importar en [dbdiagram.io](https://dbdiagram.io)
- `LubricentroDB2_diagrama.png`: imagen del diagrama entidad-relación generado a partir del .dbml

### Restaurar base desde SQL Server Management Studio (SSMS)

1. Abrí SSMS y conectate a tu servidor
2. Abrí el archivo `init_database.sql` desde la carpeta `db/`
3. Ejecutalo (Ctrl + E o botón "Ejecutar")

### Restaurar desde consola con `sqlcmd`

```bash
sqlcmd -S .\SQLEXPRESS -i db\init_database.sql
```

> Cambiá `.\SQLEXPRESS` por el nombre de tu servidor SQL si es diferente.

### Restaurar desde Azure Data Studio

1. Abrí Azure Data Studio
2. Archivo → Abrir → `init_database.sql`
3. Ejecutá todo el script (F5)

## INICIO RÁPIDO

Para desarrollo diario, usá el **inicio rápido** que levanta ambos servidores inmediatamente:

```bash
python deploy_full_stack.py
```

Esto iniciará:
- **Backend** (Python GraphQL): http://localhost:8000
- **Frontend** (React + Vite): http://localhost:5173

## SETUP MANUAL

### Backend

```bash
# crear y activar entorno virtual
python -m venv perpgsqlvs
perpgsqlvs\scripts\activate  # en Windows
# o source perpgsqlvs/bin/activate en Linux/macOS

# instalar dependencias
pip install -r requirements.txt

# iniciar la API GraphQL
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install

# iniciar servidor de desarrollo (Tailwind CSS se levanta automáticamente)
npm run dev
```

### ESLint

Ejecutá `npm run lint` desde la raíz del repositorio o dentro de `frontend/` para analizar el código JS/React.

## DEPLOYMENT

El script `deploy_full_stack.py` incluye varios modos para diferentes situaciones:

### 🚀 Inicio rápido (recomendado para desarrollo)
```bash
python deploy_full_stack.py        # Sin parámetros = inicio rápido
python deploy_full_stack.py start  # Equivalente
```
**Qué hace:** Inicia backend y frontend inmediatamente sin verificaciones pesadas.

### 🔧 Setup completo (primera vez o cambios importantes)
```bash
python deploy_full_stack.py setup
```
**Qué hace:** 
- Verificaciones completas de prerequisitos
- Instalación/actualización de dependencias
- Build de producción del frontend
- Configuración de archivos `.env`
- Actualización de base de datos
- Inicio de servidores

### 🎯 Modos específicos
```bash
python deploy_full_stack.py backend-only   # Solo servidor Python GraphQL
python deploy_full_stack.py frontend-only  # Solo TailwindCSS + Vite
python deploy_full_stack.py check          # Solo verificar prerequisitos
python deploy_full_stack.py help           # Mostrar ayuda completa
```

## URLs del proyecto

Una vez iniciado, tendrás acceso a:

- **Frontend**: http://localhost:5173
- **Backend GraphQL**: http://localhost:8000
- **GraphQL Playground**: http://localhost:8000/docs (o /graphql dependiendo de tu configuración)

## Tecnologías utilizadas

### Backend
- **Python** con **uvicorn**
- **GraphQL** (Strawberry o similar)
- **SQL Server** como base de datos
- **SQLAlchemy** para ORM

### Frontend  
- **React** con **Vite**
- **TailwindCSS** para estilos
- **NPM** para gestión de paquetes

## Flujo de trabajo recomendado

1. **Primer setup**: `python deploy_full_stack.py setup`
2. **Desarrollo diario**: `python deploy_full_stack.py`
3. **Solo una parte**: `python deploy_full_stack.py backend-only` o `frontend-only`
4. **Verificar entorno**: `python deploy_full_stack.py check`

## Scripts adicionales

El proyecto también incluye:
- `deploy.py`: Script original solo para backend
- `Git-PushToBranch.ps1`: Script PowerShell para Git
- `Kill-Port8000.ps1`: Script para liberar el puerto 8000

## Gestión temporal de ítems en órdenes

Durante la creación o edición de una orden, los ítems se almacenan en la tabla
`TempOrderDetails`. Esto permite modificarlos libremente desde el frontend sin
afectar la orden real. Cuando se confirma la operación, se debe invocar la
mutación `finalizeOrder` enviando el `orderID` y el `sessionID`; dicha acción
mueve los registros temporales a `OrderDetails` y aplica los cambios de forma
permanente.
Si al crear un ítem no enviás un `sessionID`, el backend generará uno
automáticamente y lo devolverá en la respuesta. Utilizá ese mismo `sessionID`
para los ítems siguientes y para la mutación `finalizeOrder`.
Cuando se crea una orden enviando una lista de ítems, dichos registros también
se almacenan en `TempOrderDetails` con un `sessionID` único hasta su
confirmación definitiva.

Para modificar un ítem temporal utilizá la mutación `update_temporderdetail`.
Debés enviar el `sessionID` devuelto al crear el ítem.
Con ese valor se localiza exactamente el registro dentro de `TempOrderDetails`.

