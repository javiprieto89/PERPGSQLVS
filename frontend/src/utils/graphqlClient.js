const GRAPHQL_ENDPOINT = "http://127.0.0.1:8000/graphql/";

class GraphQLClient {
    constructor() {
        this.endpoint = GRAPHQL_ENDPOINT;
    }

    async query(query, variables = {}) {
        const token = sessionStorage.getItem("token");

        console.log("GraphQL Request:", {
            endpoint: this.endpoint,
            query: query.substring(0, 100) + "...",
            variables,
            hasToken: !!token
        });

        try {
            const response = await fetch(this.endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify({
                    query,
                    variables,
                }),
            });

            console.log("Response Status:", response.status, response.statusText);

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                const errorText = await response.text();
                console.error("HTTP Error Response:", errorText);
                throw new Error(`HTTP ${response.status}: ${response.statusText}\n${errorText}`);
            }

            // Verificar el tipo de contenido
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const responseText = await response.text();
                console.error("Invalid Content-Type:", contentType);
                throw new Error(`Expected JSON but got ${contentType}. Response: ${responseText.substring(0, 500)}...`);
            }

            // Parsear JSON
            const responseText = await response.text();
            let result;

            try {
                result = JSON.parse(responseText);
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError);
                throw new Error(`Failed to parse JSON: ${parseError.message}`);
            }

            console.log("GraphQL Response:", result);

            // Verificar errores de GraphQL
            if (result.errors && result.errors.length > 0) {
                console.error("GraphQL Errors:", result.errors);
                const error = new Error(`GraphQL Error: ${result.errors[0].message}`);
                error.response = result;
                throw error;
            }

            return result.data;

        } catch (error) {
            console.error("GraphQL Client Error:", error);

            // Si es un error de red
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error(`No se pudo conectar al servidor GraphQL en ${this.endpoint}. Verifica que el servidor esté ejecutándose.`);
            }

            throw error;
        }
    }

    async mutation(mutation, variables = {}) {
        return this.query(mutation, variables);
    }

    // Método para verificar conectividad
    async checkConnection() {
        try {
            const response = await fetch(this.endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `query { __typename }`
                }),
            });

            console.log("Connection check:", response.status);
            return response.status === 200;
        } catch (error) {
            console.error("Connection check failed:", error);
            return false;
        }
    }
}

export const graphqlClient = new GraphQLClient();

// ===== CONSULTAS (QUERIES) =====
export const QUERIES = {
    // CLIENTES - Usando los nombres exactos de tu schema
    GET_ALL_CLIENTS: `
        query GetAllClients {
            allClients {
                ClientID
                DocTypeID
                DocNumber
                FirstName
                LastName
                Phone
                Email
                Address
                City
                PostalCode
                IsActive
                CountryID
                ProvinceID
                PriceListID
                VendorID
            }
        }
    `,

    GET_CLIENT_BY_ID: `
        query GetClientById($id: Int!) {
            clientsById(id: $id) {
                ClientID
                DocTypeID
                DocNumber
                FirstName
                LastName
                Phone
                Email
                Address
                City
                PostalCode
                IsActive
                CountryID
                ProvinceID
                PriceListID
                VendorID
            }
        }
    `,

    // DATOS MAESTROS PARA FORMULARIOS
    GET_DOCUMENT_TYPES: `
        query GetDocumentTypes {
            allDocumenttypes {
                DocTypeID
                Name
            }
        }
    `,

    GET_COUNTRIES: `
        query GetCountries {
            allCountries {
                CountryID
                Name
            }
        }
    `,

    GET_PROVINCES: `
        query GetProvinces {
            allProvinces {
                ProvinceID
                CountryID
                Name
            }
        }
    `,

    GET_PRICE_LISTS: `
        query GetPriceLists {
            allPricelists {
                PriceListID
                Name
                Description
                IsActive
            }
        }
    `,

    GET_VENDORS: `
        query GetVendors {
            allVendors {
                VendorID
                VendorName
                Commission
                IsActive
            }
        }
    `,

    // COMBOS PARA FORMULARIOS
    GET_CLIENT_FORM_DATA: `
        query GetClientFormData {
            docTypes: allDoctypes {
                DocTypeID
                Name
            }
            countries: allCountries {
                CountryID
                Name
            }
            provinces: allProvinces {
                ProvinceID
                CountryID
                Name
            }
            priceLists: allPricelists {
                PriceListID
                Name
                Description
                IsActive
            }
            vendors: allVendors {
                VendorID
                VendorName
                IsActive
            }
        }
    `,

    // ITEMS
    GET_ALL_ITEMS: `
        query GetAllItems {
            allItems {
                ItemID
                CompanyID
                BranchID
                Code
                Description
                BrandID
                ItemCategoryID
                ItemSubcategoryID
                SupplierID
                ControlStock
                ReplenishmentStock
                IsActive
                OEM
                WarehouseID
                LastModified
            }
        }
    `,

    // ORDENES
    GET_ALL_ORDERS: `
        query GetAllOrders {
            allOrders {
                OrderID
                CompanyID
                BranchID
                Date
                ClientID
                CarID
                IsService
                ServiceTypeID
                Mileage
                NextServiceMileage
                Notes
                SaleConditionID
                DiscountID
                Subtotal
                Total
                VAT
                UserID
                DocumentID
                StatusID
                PriceListID
                OrderstatusID
                WarehouseID
            }
        }
    `,

    // PROVEEDORES
    GET_ALL_SUPPLIERS: `
        query GetAllSuppliers {
            allSuppliers {
                SupplierID
                DocTypeID
                DocNumber
                FirstName
                LastName
                Phone
                Email
                Address
                IsActive
                CountryID
                ProvinceID
                City
                PostalCode
            }
        }
    `,
    // Alias para compatibilidad
    GET_SUPPLIERS: `
        query GetSuppliers {
            allSuppliers {
                SupplierID
                DocTypeID
                DocNumber
                FirstName
                LastName
                Phone
                Email
                Address
                IsActive
                CountryID
                ProvinceID
                City
                PostalCode
            }
        }
    `,

    // MARCAS
    GET_ALL_BRANDS: `
        query GetAllBrands {
            allBrands {
                BrandID
                Name
                IsActive
            }
        }
    `,
    GET_BRAND_BY_ID: `
        query GetBrandById($id: Int!) {
            brandsById(id: $id) {
                BrandID
                Name
                IsActive
            }
        }
    `,

    // DASHBOARD COMPLETO
    GET_DASHBOARD_DATA: `
        query GetDashboardData {
            clients: allClients {
                ClientID
                IsActive
            }
            items: allItems {
                ItemID
                CompanyID
                IsActive
                ControlStock
                ReplenishmentStock
            }
            orders: allOrders {
                OrderID
                CompanyID
                StatusID
                Total
                Date
            }
            itemstock: allItemstock {
                ItemID
                Quantity
                MinStockLevel
                CompanyID
            }
        }
    `,

    // BÚSQUEDA DE CLIENTES
    SEARCH_CLIENTS: `
        query SearchClients($searchTerm: String!, $isActive: Boolean) {
            allClients {
                ClientID
                DocNumber
                FirstName
                LastName
                Phone
                Email
                City
                IsActive
            }
        }
    `
};

// ===== MUTACIONES (MUTATIONS) =====
export const MUTATIONS = {
    // CREAR CLIENTE
    CREATE_CLIENT: `
        mutation CreateClient($input: ClientsCreate!) {
            createClient(data: $input) {
                ClientID
                DocTypeID
                DocNumber
                FirstName
                LastName
                Phone
                Email
                Address
                City
                PostalCode
                IsActive
                CountryID
                ProvinceID
                PriceListID
                VendorID
            }
        }
    `,

    // ACTUALIZAR CLIENTE
    UPDATE_CLIENT: `
        mutation UpdateClient($clientID: Int!, $input: ClientsUpdate!) {
            updateClient(clientID: $clientID, data: $input) {
                ClientID
                DocTypeID
                DocNumber
                FirstName
                LastName
                Phone
                Email
                Address
                City
                PostalCode
                IsActive
                CountryID
                ProvinceID
                PriceListID
                VendorID
            }
        }
    `,

    // ELIMINAR CLIENTE
    DELETE_CLIENT: `
        mutation DeleteClient($clientID: Int!) {
            deleteClient(clientID: $clientID)
        }
    `,

    // ACTIVAR/DESACTIVAR CLIENTE
    TOGGLE_CLIENT_STATUS: `
        mutation ToggleClientStatus($clientID: Int!, $isActive: Boolean!) {
            updateClient(clientID: $clientID, data: { IsActive: $isActive }) {
                ClientID
                IsActive
            }
        }
    `,

    // CREAR PROVEEDOR
    CREATE_SUPPLIER: `
        mutation CreateSupplier($input: SuppliersCreate!) {
            createSupplier(data: $input) {
                SupplierID
                DocTypeID
                DocNumber
                FirstName
                LastName
                Phone
                Email
                Address
                IsActive
                CountryID
                ProvinceID
                City
                PostalCode
            }
        }
    `,

    // ACTUALIZAR PROVEEDOR
    UPDATE_SUPPLIER: `
        mutation UpdateSupplier($supplierID: Int!, $input: SuppliersUpdate!) {
            updateSupplier(supplierID: $supplierID, data: $input) {
                SupplierID
                DocTypeID
                DocNumber
                FirstName
                LastName
                Phone
                Email
                Address
                IsActive
                CountryID
                ProvinceID
                City
                PostalCode
            }
        }
    `,

    // ELIMINAR PROVEEDOR
    DELETE_SUPPLIER: `
        mutation DeleteSupplier($supplierID: Int!) {
            deleteSupplier(supplierID: $supplierID)
        }
    `,

    // ACTIVAR/DESACTIVAR PROVEEDOR
    TOGGLE_SUPPLIER_STATUS: `
        mutation ToggleSupplierStatus($supplierID: Int!, $isActive: Boolean!) {
            updateSupplier(supplierID: $supplierID, data: { IsActive: $isActive }) {
                SupplierID
                IsActive
            }
        }
    `,

    // MARCAS
    CREATE_BRAND: `
        mutation CreateBrand($input: BrandsCreate!) {
            createBrand(data: $input) {
                BrandID
                Name
                IsActive
            }
        }
    `,
    UPDATE_BRAND: `
        mutation UpdateBrand($brandID: Int!, $input: BrandsUpdate!) {
            updateBrand(brandID: $brandID, data: $input) {
                BrandID
                Name
                IsActive
            }
        }
    `,
    DELETE_BRAND: `
        mutation DeleteBrand($brandID: Int!) {
            deleteBrand(brandID: $brandID)
        }
    `
};

// ===== FUNCIONES AUXILIARES =====
export const clientHelpers = {
    // Validar datos de cliente antes de enviar
    validateClientData(clientData) {
        const errors = [];

        if (!clientData.firstName?.trim()) {
            errors.push("El nombre es obligatorio");
        }

        if (!clientData.docTypeID) {
            errors.push("El tipo de documento es obligatorio");
        }

        if (!clientData.countryID) {
            errors.push("El país es obligatorio");
        }

        if (!clientData.provinceID) {
            errors.push("La provincia es obligatoria");
        }

        if (!clientData.priceListID) {
            errors.push("La lista de precios es obligatoria");
        }

        if (!clientData.vendorID) {
            errors.push("El vendedor es obligatorio");
        }

        if (clientData.email && !this.isValidEmail(clientData.email)) {
            errors.push("El formato del email no es válido");
        }

        return errors;
    },

    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Preparar datos para crear cliente
    prepareClientData(formData) {
        return {
            DocTypeID: parseInt(formData.docTypeID) || 1,
            DocNumber: formData.docNumber?.trim() || null,
            FirstName: formData.firstName?.trim() || "",
            LastName: formData.lastName?.trim() || null,
            Phone: formData.phone?.trim() || null,
            Email: formData.email?.trim() || null,
            Address: formData.address?.trim() || null,
            City: formData.city?.trim() || null,
            PostalCode: formData.postalCode?.trim() || null,
            IsActive: Boolean(formData.isActive !== false), // Default true
            CountryID: parseInt(formData.countryID) || 1,
            ProvinceID: parseInt(formData.provinceID) || 1,
            PriceListID: parseInt(formData.priceListID) || 1,
            VendorID: parseInt(formData.vendorID) || 1,
        };
    },

    // Formatear cliente para mostrar
    formatClientForDisplay(client) {
        return {
            ...client,
            FullName: `${client.FirstName} ${client.LastName || ''}`.trim(),
            StatusText: client.IsActive ? 'Activo' : 'Inactivo',
            ContactInfo: client.Email || client.Phone || 'Sin contacto',
        };
    }
};

// ===== FUNCIONES AUXILIARES DE PROVEEDORES =====
export const supplierHelpers = {
    validateSupplierData(data) {
        const errors = [];
        if (!data.firstName?.trim()) {
            errors.push("El nombre es obligatorio");
        }
        if (data.email && !clientHelpers.isValidEmail(data.email)) {
            errors.push("El formato del email no es válido");
        }
        return errors;
    },
    prepareSupplierData(formData) {
        return {
            DocTypeID: formData.docTypeID ? parseInt(formData.docTypeID) : null,
            DocNumber: formData.docNumber?.trim() || null,
            FirstName: formData.firstName?.trim() || "",
            LastName: formData.lastName?.trim() || null,
            Phone: formData.phone?.trim() || null,
            Email: formData.email?.trim() || null,
            Address: formData.address?.trim() || null,
            IsActive: Boolean(formData.isActive !== false),
            CountryID: formData.countryID ? parseInt(formData.countryID) : null,
            ProvinceID: formData.provinceID ? parseInt(formData.provinceID) : null,
            City: formData.city?.trim() || null,
            PostalCode: formData.postalCode?.trim() || null,
        };
    }
};

export const dashboardHelpers = {
    processDashboardData(data, companyId = null) {
        const clients = data.clients || [];
        const items = data.items || [];
        const orders = data.orders || [];
        const itemstock = data.itemstock || [];

        // Filtrar por empresa si se especifica
        const filteredItems = companyId
            ? items.filter(item => item.CompanyID === companyId)
            : items;

        const filteredOrders = companyId
            ? orders.filter(order => order.CompanyID === companyId)
            : orders;

        const filteredStock = companyId
            ? itemstock.filter(stock => stock.CompanyID === companyId)
            : itemstock;

        // Calcular fecha del mes actual
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Filtrar órdenes del mes actual
        const monthlyOrders = filteredOrders.filter(order => {
            if (!order.Date) return false;
            const orderDate = new Date(order.Date);
            return orderDate.getMonth() === currentMonth &&
                orderDate.getFullYear() === currentYear;
        });

        // Calcular items con stock bajo
        const lowStockItems = filteredStock.filter(stock => {
            const item = filteredItems.find(i => i.ItemID === stock.ItemID);
            return item &&
                item.ControlStock &&
                stock.Quantity <= (stock.MinStockLevel || item.ReplenishmentStock || 0) &&
                stock.Quantity > 0;
        });

        return {
            totalClients: clients.length,
            activeClients: clients.filter(c => c.IsActive).length,
            totalItems: filteredItems.length,
            activeItems: filteredItems.filter(i => i.IsActive).length,
            lowStockItems: lowStockItems.length,
            totalOrders: filteredOrders.length,
            pendingOrders: filteredOrders.filter(o => [1, 2].includes(o.StatusID)).length,
            completedOrders: filteredOrders.filter(o => o.StatusID === 3).length,
            monthlySales: monthlyOrders.reduce((sum, order) => sum + (parseFloat(order.Total) || 0), 0),
            monthlyOrdersCount: monthlyOrders.length
        };
    }
};

// ===== FUNCIONES DE CLIENTES =====
export const clientOperations = {
    // Obtener todos los clientes
    async getAllClients() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_CLIENTS);
            return data.allClients || [];
        } catch (error) {
            console.error("Error obteniendo clientes:", error);
            throw error;
        }
    },

    // Obtener cliente por ID
    async getClientById(clientId) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CLIENT_BY_ID, { id: clientId });
            return data.clientsById;
        } catch (error) {
            console.error("Error obteniendo cliente:", error);
            throw error;
        }
    },

    // Crear nuevo cliente
    async createClient(clientData) {
        try {
            // Validar datos
            const errors = clientHelpers.validateClientData(clientData);
            if (errors.length > 0) {
                throw new Error(`Errores de validación: ${errors.join(', ')}`);
            }

            // Preparar datos
            const preparedData = clientHelpers.prepareClientData(clientData);

            // Crear cliente
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_CLIENT, {
                input: preparedData
            });

            return data.createClient;
        } catch (error) {
            console.error("Error creando cliente:", error);
            throw error;
        }
    },

    // Actualizar cliente
    async updateClient(clientId, clientData) {
        try {
            // Validar datos
            const errors = clientHelpers.validateClientData(clientData);
            if (errors.length > 0) {
                throw new Error(`Errores de validación: ${errors.join(', ')}`);
            }

            // Preparar datos
            const preparedData = clientHelpers.prepareClientData(clientData);

            // Actualizar cliente
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CLIENT, {
                clientID: clientId,
                input: preparedData
            });

            return data.updateClient;
        } catch (error) {
            console.error("Error actualizando cliente:", error);
            throw error;
        }
    },

    // Eliminar cliente
    async deleteClient(clientId) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_CLIENT, {
                clientID: clientId
            });

            return data.deleteClient;
        } catch (error) {
            console.error("Error eliminando cliente:", error);
            throw error;
        }
    },

    // Cambiar estado activo/inactivo
    async toggleClientStatus(clientId, isActive) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.TOGGLE_CLIENT_STATUS, {
                clientID: clientId,
                isActive: isActive
            });

            return data.updateClient;
        } catch (error) {
            console.error("Error cambiando estado del cliente:", error);
            throw error;
        }
    },

    // Obtener datos para formulario de cliente
    async getClientFormData() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CLIENT_FORM_DATA);
            return {
                documentTypes: data.docTypes || [],
                countries: data.countries || [],
                provinces: data.provinces || [],
                priceLists: data.priceLists?.filter(pl => pl.IsActive) || [],
                vendors: data.vendors?.filter(v => v.IsActive) || []
            };
        } catch (error) {
            console.error("Error obteniendo datos del formulario:", error);
            throw error;
        }
    }
};

// ===== FUNCIONES DE PROVEEDORES =====
export const supplierOperations = {
    async getAllSuppliers() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_SUPPLIERS);
            return data.allSuppliers || [];
        } catch (error) {
            console.error("Error obteniendo proveedores:", error);
            throw error;
        }
    },

    async createSupplier(supplierData) {
        try {
            const errors = supplierHelpers.validateSupplierData(supplierData);
            if (errors.length > 0) {
                throw new Error(`Errores de validación: ${errors.join(', ')}`);
            }
            const prepared = supplierHelpers.prepareSupplierData(supplierData);
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_SUPPLIER, {
                input: prepared
            });
            return data.createSupplier;
        } catch (error) {
            console.error("Error creando proveedor:", error);
            throw error;
        }
    },

    async updateSupplier(id, supplierData) {
        try {
            const errors = supplierHelpers.validateSupplierData(supplierData);
            if (errors.length > 0) {
                throw new Error(`Errores de validación: ${errors.join(', ')}`);
            }
            const prepared = supplierHelpers.prepareSupplierData(supplierData);
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_SUPPLIER, {
                supplierID: id,
                input: prepared
            });
            return data.updateSupplier;
        } catch (error) {
            console.error("Error actualizando proveedor:", error);
            throw error;
        }
    },

    async deleteSupplier(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_SUPPLIER, {
                supplierID: id
            });
            return data.deleteSupplier;
        } catch (error) {
            console.error("Error eliminando proveedor:", error);
            throw error;
        }
    },

    async toggleSupplierStatus(id, isActive) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.TOGGLE_SUPPLIER_STATUS, {
                supplierID: id,
                isActive
            });
            return data.updateSupplier;
        } catch (error) {
            console.error("Error cambiando estado del proveedor:", error);
            throw error;
        }
    },

    // Obtener datos para formulario de proveedor
    async getSupplierFormData() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CLIENT_FORM_DATA);
            return {
                documentTypes: data.docTypes || [],
                countries: data.countries || [],
                provinces: data.provinces || []
            };
        } catch (error) {
            console.error("Error obteniendo datos del formulario:", error);
            throw error;
        }
    }
};

// ===== FUNCIONES DE MARCAS =====
export const brandOperations = {
    async getAllBrands() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_BRANDS);
            return data.allBrands || [];
        } catch (error) {
            console.error("Error obteniendo marcas:", error);
            throw error;
        }
    },

    async getBrandById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_BRAND_BY_ID, { id });
            return data.brandsById;
        } catch (error) {
            console.error("Error obteniendo marca:", error);
            throw error;
        }
    },

    async createBrand(brandData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_BRAND, {
                input: brandData
            });
            return data.createBrand;
        } catch (error) {
            console.error("Error creando marca:", error);
            throw error;
        }
    },

    async updateBrand(id, brandData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_BRAND, {
                brandID: id,
                input: brandData
            });
            return data.updateBrand;
        } catch (error) {
            console.error("Error actualizando marca:", error);
            throw error;
        }
    },

    async deleteBrand(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_BRAND, { brandID: id });
            return data.deleteBrand;
        } catch (error) {
            console.error("Error eliminando marca:", error);
            throw error;
        }
    }
};

// ===== DIAGNÓSTICO =====
export const diagnosticGraphQL = async () => {
    console.log("🔍 Iniciando diagnóstico de GraphQL...");

    // 1. Verificar conectividad básica
    console.log("1. Verificando conectividad...");
    const isConnected = await graphqlClient.checkConnection();
    console.log("   Conectividad:", isConnected ? "✅ OK" : "❌ FALLO");

    if (!isConnected) {
        console.error("❌ No se puede conectar al servidor GraphQL");
        return false;
    }

    // 2. Probar consulta de clientes
    console.log("2. Probando consulta de clientes...");
    try {
        const clients = await clientOperations.getAllClients();
        console.log("   ✅ Clientes obtenidos:", clients.length);
    } catch (error) {
        console.error("   ❌ Error obteniendo clientes:", error.message);
        return false;
    }

    // 3. Probar datos del formulario
    console.log("3. Probando datos del formulario...");
    try {
        const formData = await clientOperations.getClientFormData();
        console.log("   ✅ Tipos de documento:", formData.documentTypes.length);
        console.log("   ✅ Países:", formData.countries.length);
        console.log("   ✅ Provincias:", formData.provinces.length);
        console.log("   ✅ Listas de precios:", formData.priceLists.length);
        console.log("   ✅ Vendedores:", formData.vendors.length);
    } catch (error) {
        console.error("   ❌ Error obteniendo datos del formulario:", error.message);
        return false;
    }

    console.log("✅ Diagnóstico completado exitosamente");
    return true;
};

// Ejecutar diagnóstico automáticamente en desarrollo
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    setTimeout(() => {
        diagnosticGraphQL();
    }, 2000);
}