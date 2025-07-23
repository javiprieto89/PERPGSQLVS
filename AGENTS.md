# AGENTS.md - Sistema ERP Lubricentro

## 📋 Descripción General

Este documento describe todos los agentes, procesos automatizados y componentes del sistema ERP para lubricentros desarrollado con **Starlette + Strawberry GraphQL + SQLAlchemy** (backend) y **React + Vite** (frontend).

## 🏗️ Arquitectura del Sistema

```
ERP Lubricentro
├── Backend (Python)
│   ├── Starlette (Framework ASGI)
│   ├── Strawberry GraphQL (API)
│   ├── SQLAlchemy (ORM)
│   └── SQL Server (Base de datos)
└── Frontend (JavaScript)
    ├── React (UI Framework)
    ├── Vite (Build tool)
    └── React Router (Routing)
```

## 🤖 Agentes y Middlewares del Sistema

### 1. **RateLimitMiddleware** (Agente de Control de Tráfico)
- **Ubicación**: `main.py`
- **Función**: Protege la API contra ataques de fuerza bruta y sobrecarga
- **Configuración**: 100 peticiones por minuto por IP
- **Comportamiento**: 
  - Rastrea timestamps de peticiones por IP
  - Limpia automáticamente registros antiguos (>1 minuto)
  - Retorna HTTP 429 si se excede el límite

```python
# Configuración actual
RATE_LIMIT = 100  # peticiones por minuto
CLEANUP_WINDOW = 60  # segundos
```

### 2. **ProcessTimeMiddleware** (Agente de Monitoreo)
- **Ubicación**: `main.py`
- **Función**: Monitorea performance y tiempo de respuesta
- **Características**:
  - Logs de todas las peticiones HTTP
  - Medición de tiempo de procesamiento
  - Headers de respuesta con métricas (`X-Process-Time`)
  - Logging diferenciado por status code

### 3. **GraphQLContextMiddleware** (Agente de Autenticación)
- **Ubicación**: `main.py`
- **Función**: Gestiona contexto de usuario y autenticación JWT
- **Responsabilidades**:
  - Extrae y valida tokens JWT
  - Inyecta información de usuario en el contexto GraphQL
  - Rastrea tiempo de inicio de peticiones

### 4. **CachedResolvers** (Agente de Cache)
- **Ubicación**: `app/graphql/resolvers/cached_resolvers.py`
- **Función**: Optimiza consultas frecuentes con sistema de cache
- **Beneficios**:
  - Reduce carga en base de datos
  - Mejora tiempo de respuesta
  - Cache inteligente basado en patrones de uso

## 📊 Módulos del ERP

### **Gestión de Inventario**
- **Items**: Productos y servicios del lubricentro
- **ItemCategories**: Categorización de productos
- **ItemSubcategories**: Subcategorización detallada
- **ItemStock**: Control de stock en tiempo real
- **StockHistory**: Historial de movimientos de inventario
- **TempStockEntries**: Entradas temporales de stock

### **Gestión de Precios**
- **PriceLists**: Listas de precios por cliente/categoria
- **PriceListItems**: Items específicos en listas de precios
- **ItemPriceHistory**: Historial de cambios de precios
- **Discounts**: Sistema de descuentos

### **Gestión de Órdenes y Ventas**
- **Orders**: Órdenes de venta principales
- **OrderDetails**: Detalles de items en órdenes
- **OrderHistory**: Historial de cambios en órdenes
- **OrderHistoryDetails**: Detalles del historial
- **TempOrderDetails**: Órdenes temporales/borradores
- **OrderStatus**: Estados de las órdenes

### **Gestión de Clientes y Proveedores**
- **Clients**: Base de datos de clientes
- **Suppliers**: Gestión de proveedores
- **Vendors**: Vendedores externos
- **Cars**: Vehículos de clientes
- **CarBrands**: Marcas de vehículos
- **CarModels**: Modelos específicos

### **Gestión Administrativa**
- **Users**: Usuarios del sistema
- **Roles**: Roles y permisos
- **UserAccess**: Control de acceso
- **sysUserActions**: Acciones disponibles
- **UserActivityLog**: Log de actividad de usuarios
- **Branches**: Sucursales
- **Warehouses**: Almacenes

### **Gestión Financiera**
- **Transactions**: Transacciones financieras
- **TransactionTypes**: Tipos de transacciones
- **AccountBalances**: Balances de cuentas
- **CreditCards**: Tarjetas de crédito
- **CreditCardGroups**: Grupos de tarjetas

### **Configuración del Sistema**
- **CompanyData**: Datos de la empresa
- **Countries**: Países
- **Provinces**: Provincias/Estados
- **DocumentTypes**: Tipos de documentos
- **SaleConditions**: Condiciones de venta
- **ServiceType**: Tipos de servicios

## 🔧 Herramientas de Utilidad

### **Cache System** (`app/utils/cache.py`)
- Sistema de cache en memoria para optimización
- Invalidación automática de cache
- Configuración por tipo de dato

### **Pagination** (`app/utils/pagination.py`)
- Paginación inteligente para grandes datasets
- Optimización de consultas SQL
- Soporte para filtros y ordenamiento

### **Generic Filters** (`app/utils/generic_filters.py`)
- Sistema de filtros reutilizable
- Construcción dinámica de queries
- Soporte para múltiples tipos de datos

### **Item Helpers** (`app/utils/item_helpers.py`)
- Funciones auxiliares para manejo de productos
- Cálculos de stock y precios
- Validaciones de negocio

## 🚀 Endpoints Principales

### **REST Endpoints**
```
GET  /                 - Información general de la API
GET  /health          - Health check del sistema
GET  /metrics         - Métricas de uso y performance
POST /graphql/        - Endpoint principal GraphQL
```

### **GraphQL Schema**
- **Queries**: Consultas de datos (todos los módulos)
- **Mutations**: Operaciones de escritura (CRUD completo)
- **Tipos**: Definiciones de tipos GraphQL para cada entidad

## 📈 Monitoreo y Métricas

### **Métricas Disponibles** (`/metrics`)
```json
{
  "active_connections": "número de IPs activas",
  "total_requests_last_minute": "peticiones en el último minuto"
}
```

### **Health Check** (`/health`)
```json
{
  "status": "healthy",
  "timestamp": "tiempo actual",
  "version": "1.0.0",
  "graphql_endpoint": "/graphql/"
}
```

## 🔐 Seguridad

### **Autenticación JWT**
- Tokens de acceso con expiración
- Validación en cada petición GraphQL
- Información de usuario en contexto

### **Control de Acceso**
- Sistema de roles y permisos
- Log de actividad de usuarios
- Control de acceso granular por módulo

### **Rate Limiting**
- Protección contra abuso
- Límites por IP
- Configuración flexible

## 🗄️ Base de Datos

### **Configuración**
- **Motor**: SQL Server
- **ORM**: SQLAlchemy 2.0
- **Driver**: pyodbc
- **Pool de conexiones**: Configurado automáticamente

### **Migraciones**
- Auto-creación de tablas en desarrollo
- Control de versiones de schema
- Backup automático recomendado

## 🔄 Procesos Automatizados

### **1. Limpieza de Rate Limiting**
- **Frecuencia**: Cada petición
- **Función**: Elimina registros antiguos de rate limiting
- **Beneficio**: Mantiene memoria baja

### **2. Cache Invalidation**
- **Trigger**: Mutaciones que modifican datos
- **Función**: Invalida cache relacionado
- **Beneficio**: Consistencia de datos

### **3. Activity Logging**
- **Trigger**: Todas las acciones de usuario
- **Función**: Registra actividad para auditoría
- **Beneficio**: Trazabilidad completa

## 🛠️ Configuración de Desarrollo

### **Variables de Entorno**
```bash
DATABASE_URL=mssql+pyodbc://USER:PASSWORD@HOST/DB?driver=ODBC+Driver+17+for+SQL+Server
ENVIRONMENT=development
JWT_SECRET_KEY=your-secret-key
```

### **Comandos de Desarrollo**
```bash
# Backend
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# Frontend
npm run dev

# Linting
npm run lint
```

## 📚 Estructura de Archivos GraphQL

```
app/graphql/
├── schema.py           # Schema principal
├── types.py           # Tipos GraphQL base
├── crud/              # Operaciones CRUD
├── mutations/         # Mutaciones GraphQL
├── resolvers/         # Resolvers GraphQL
└── schemas/           # Definiciones de tipos
```

## 🔍 Debugging y Logs

### **Logs del Sistema**
- **Nivel**: INFO por defecto
- **Incluye**: Peticiones HTTP, tiempos de respuesta, errores
- **Formato**: Timestamp + Nivel + Mensaje

### **GraphQL Introspection**
- Habilitado en desarrollo
- Documentación automática del schema
- Playground disponible en `/graphql/`

## 🚀 Deployment

### **Producción**
- Cambiar `ENVIRONMENT` a `production`
- Configurar variables de entorno seguras
- Habilitar HTTPS
- Configurar proxy reverso (nginx recomendado)

### **Escalabilidad**
- Soporte para múltiples workers
- Cache Redis recomendado para producción
- Balanceador de carga para alta disponibilidad

## 📞 Soporte

Para dudas sobre la implementación de agentes o procesos automatizados, consultar:
- Documentación GraphQL: `/graphql/` (modo desarrollo)
- Logs del sistema: Revisar salida de uvicorn
- Métricas: Endpoint `/metrics`