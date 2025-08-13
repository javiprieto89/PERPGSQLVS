# AFIP / ARCA

Configuración afip para desarrollo/pruebas

> Usando CUIT especial que no requiere certificado, consultar datos en .env

```
AFIP_CUIT=
AFIP_CERT_PATH=
AFIP_CERT_PASSWORD=
AFIP_KEY_PATH=
AFIP_PRODUCTION=true
```

Crear entorno de Python

```bash
python -m venv perpgsqlvs
```

Setear el entorno de Python

```bash
perpgsqlvs\scripts\actívate
```

Instalar dependencias de Python

```bash
pip install -r requirements.txt
```

Arrancar el backend

```bash
uvicorn app.main:app --reload
```

Arrancar el frontend (Tailwind CSS incluido)

```bash
npm run dev
```

```bash
cd frontend && npm install
```

# Tailwind

Concurrently + tailwind:

> Deprecado: ya no es necesario, concurrently se creó por una configuración de tailwind que finalmente fué fixeada

#### Configuración de paleta de color

Podés editar la paleta de color de la web en el archivo `frontend/src/styles/tailwind.css`

# GraphQL

playground: http://computron.selfip.com:8000/graphql/

#### Codegen

Librería que lee los archivos .graphql para luego generar los archivos necesario de consultas + hooks en react

Usar GraphQL Code Generator (graphql-codegen) te va a permitir:

✅ Tipado automático para data, variables y errors
✅ Mejor DX con autocompletado
✅ Seguridad en tiempo de compilación
✅ Importar operaciones por nombre si usás documentMode: "named"

##### Instalación

Asegurate de tener instalado el paquete `graphql-codegen/cli`

```bash
npm install -D @graphql-codegen/cli
```

Luego lo podés inicializar

```bash
npx graphql-codegen init
```

Durante el asistente, elegí:
`Frontend` → `React`

¿Qué se usa para los documentos GraphQL? → `GraphQL` files (e.g. .graphql)

¿Dónde están tus operaciones GraphQL? → `src/graphql/\*_/_.graphql`

¿Dónde está tu schema? → `http://localhost:8000/graphql` (o donde tengas el endpoint activo)

¿Dónde guardar los archivos generados? → src/graphql/**generated**/

¿Deseás generar hooks de React? → Yes

###### 2. Revisión del archivo codegen.ts o codegen.yml

```yml
# codegen.yml
overwrite: true
schema: http://localhost:8000/graphql
documents: src/graphql/**/*.graphql
generates:
  src/graphql/_generated/:
    preset: client
    plugins: []
```

### Correr Codegen

Codegen sirve para crear los hooks de cada query creada dentro de la carpeta `/graphql` y lo compara con el servidor de GraphQL para validar el schema.

```bash
npm run codegen
```

```bash
npx graphql-codegen --watch
```
