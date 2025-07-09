# PERPGSQLVS

PERPGSQLVS es un pequeño proyecto full-stack compuesto por un backend basado en Starlette y un frontend en React. La API expone endpoints GraphQL y REST, mientras que el frontend utiliza Vite y Tailwind CSS.

## Configuración

Copiá el archivo `.env.template` como `.env` y ajustá las variables necesarias para tu entorno. Al menos deberías establecer `SQLALCHEMY_DATABASE_URL`, `ENVIRONMENT`, `DEBUG` y `SECRET_KEY`.

## Estructura del proyecto

- `app/`: lógica de negocio, modelos, resolvers GraphQL, API REST
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

## SETUP

### Backend

```bash
# crear y activar entorno virtual
python -m venv perpgsqlvs
perpgsqlvs\scripts\activate  # en Windows
# o source perpgsqlvs/bin/activate en Linux/macOS

# instalar dependencias
pip install -r requirements.txt

# iniciar la API
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install

# compilar Tailwind en modo observación
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch

# iniciar servidor de desarrollo
npm run dev
```

### ESLint

Ejecutá `npm run lint` desde la raíz del repositorio o dentro de `frontend/` para analizar el código JS/React.

## DEPLOYMENT

El script `deploy.py` automatiza un flujo básico de despliegue. Ejecutá:

```bash
python deploy.py
```

O directamente para producción:

```bash
python deploy.py start
```

Esto verifica dependencias, instala paquetes, opcionalmente realiza un backup y ejecuta la API con Uvicorn.
