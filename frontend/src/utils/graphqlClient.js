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

    // NUEVA QUERY AGREGADA
    GET_PROVINCES_BY_COUNTRY: `
        query GetProvincesByCountry($countryID: Int!) {
            provincesByCountry(countryID: $countryID) {
                ProvinceID
                Name
                CountryID
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
    GET_ITEM_BY_ID: `
        query GetItemById($id: Int!) {
            itemsById(id: $id) {
                ItemID
                CompanyID
                BranchID
                BrandID
                Code
                Description
                ItemCategoryID
                ItemSubcategoryID
                SupplierID
                ControlStock
                ReplenishmentStock
                IsOffer
                OEM
                LastModified
                WarehouseID
                IsActive
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

    // CATEGORÍAS DE ÍTEM
    GET_ALL_ITEMCATEGORIES: `
        query GetAllItemCategories {
            allItemcategories {
                ItemCategoryID
                CategoryName
            }
        }
    `,
    GET_ITEMCATEGORY_BY_ID: `
        query GetItemCategoryById($id: Int!) {
            itemcategoriesById(id: $id) {
                ItemCategoryID
                CategoryName
            }
        }
    `,

    // SUBCATEGORÍAS DE ÍTEM
    GET_ALL_ITEMSUBCATEGORIES: `
        query GetAllItemSubcategories {
            allItemsubcategories {
                ItemSubcategoryID
                ItemCategoryID
                SubcategoryName
            }
        }
    `,
    GET_ITEMSUBCATEGORY_BY_ID: `
        query GetItemSubcategoryById($id: Int!) {
            itemsubcategoriesById(id: $id) {
                ItemSubcategoryID
                ItemCategoryID
                SubcategoryName
            }
        }
    `,

    // NUEVA QUERY AGREGADA
    GET_ITEMSUBCATEGORIES_BY_CATEGORY: `
        query GetItemSubcategoriesByCategory($categoryID: Int!) {
            itemsubcategoriesByCategory(categoryID: $categoryID) {
                ItemSubcategoryID
                SubcategoryName
                ItemCategoryID
            }
        }
    `,

    // MARCAS DE AUTO
    GET_ALL_CARBRANDS: `
        query GetAllCarBrands {
            allCarbrands {
                CarBrandID
                Name
            }
        }
    `,
    GET_CARBRAND_BY_ID: `
        query GetCarBrandById($id: Int!) {
            carbrandsById(id: $id) {
                CarBrandID
                Name
            }
        }
    `,

    // MODELOS DE AUTO
    GET_ALL_CARMODELS: `
        query GetAllCarModels {
            allCarmodels {
                CarModelID
                CarBrandID
                Model
                CarBrandName
            }
        }
    `,
    GET_CARMODEL_BY_ID: `
        query GetCarModelById($id: Int!) {
            carmodelsById(id: $id) {
                CarModelID
                CarBrandID
                Model
                CarBrandName
            }
        }
    `,
    GET_CARMODELS_BY_BRAND: `
        query GetCarModelsByBrand($brandID: Int!) {
            carmodelsByBrand(carBrandID: $brandID) {
                CarModelID
                CarBrandID
                Model
                CarBrandName
            }
        }
    `,

    // AUTOS
    GET_ALL_CARS: `
        query GetAllCars {
            allCars {
                CarID
                LicensePlate
                Year
                CarModelID
                CarModelName
                CarBrandID
                CarBrandName
                ClientID
                LastServiceMileage
                IsDebtor
                DiscountID
            }
        }
    `,
    GET_CAR_BY_ID: `
        query GetCarById($id: Int!) {
            carsById(id: $id) {
                CarID
                LicensePlate
                Year
                CarModelID
                CarModelName
                CarBrandID
                CarBrandName
                ClientID
                LastServiceMileage
                IsDebtor
                DiscountID
            }
        }
    `,

    // DESCUENTOS
    GET_ALL_DISCOUNTS: `
        query GetAllDiscounts {
            allDiscounts {
                DiscountID
                DiscountName
                Percentage
            }
        }
    `,

    // GRUPOS DE TARJETAS DE CRÉDITO
    GET_ALL_CREDITCARDGROUPS: `
        query GetAllCreditCardGroups {
            allCreditcardgroups {
                CreditCardGroupID
                GroupName
            }
        }
    `,
    GET_CREDITCARDGROUP_BY_ID: `
        query GetCreditCardGroupById($id: Int!) {
            creditcardgroupById(id: $id) {
                CreditCardGroupID
                GroupName
            }
        }
    `,

    // TARJETAS DE CRÉDITO
    GET_ALL_CREDITCARDS: `
        query GetAllCreditCards {
            allCreditcards {
                CreditCardID
                CreditCardGroupID
                CardName
                Surcharge
                Installments
                IsActive
            }
        }
    `,
    GET_CREDITCARD_BY_ID: `
        query GetCreditCardById($id: Int!) {
            creditcardById(id: $id) {
                CreditCardID
                CreditCardGroupID
                CardName
                Surcharge
                Installments
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

    // CONDICIONES DE VENTA
    GET_ALL_SALECONDITIONS: `
        query GetAllSaleConditions {
            allSaleconditions {
                SaleConditionID
                CreditCardID
                Name
                DueDate
                Surcharge
                IsActive
            }
        }
    `,
    GET_SALECONDITION_BY_ID: `
        query GetSaleConditionById($id: Int!) {
            saleconditionsById(id: $id) {
                SaleConditionID
                CreditCardID
                Name
                DueDate
                Surcharge
                IsActive
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
    `,

    // CATEGORÍAS DE ÍTEM
    CREATE_ITEMCATEGORY: `
        mutation CreateItemCategory($input: ItemCategoriesCreate!) {
            createItemcategory(data: $input) {
                ItemCategoryID
                CategoryName
            }
        }
    `,
    UPDATE_ITEMCATEGORY: `
        mutation UpdateItemCategory($categoryID: Int!, $input: ItemCategoriesUpdate!) {
            updateItemcategory(categoryID: $categoryID, data: $input) {
                ItemCategoryID
                CategoryName
            }
        }
    `,
    DELETE_ITEMCATEGORY: `
        mutation DeleteItemCategory($categoryID: Int!) {
            deleteItemcategory(categoryID: $categoryID)
        }
    `,

    // SUBCATEGORÍAS DE ÍTEM
    CREATE_ITEMSUBCATEGORY: `
        mutation CreateItemSubcategory($input: ItemSubcategoriesCreate!) {
            createItemsubcategory(data: $input) {
                ItemSubcategoryID
                ItemCategoryID
                SubcategoryName
            }
        }
    `,
    UPDATE_ITEMSUBCATEGORY: `
        mutation UpdateItemSubcategory($subcategoryID: Int!, $input: ItemSubcategoriesUpdate!) {
            updateItemsubcategory(subcategoryID: $subcategoryID, data: $input) {
                ItemSubcategoryID
                ItemCategoryID
                SubcategoryName
            }
        }
    `,
    DELETE_ITEMSUBCATEGORY: `
        mutation DeleteItemSubcategory($subcategoryID: Int!) {
            deleteItemsubcategory(subcategoryID: $subcategoryID)
        }
    `,
    // MARCAS DE AUTO
    CREATE_CARBRAND: `
        mutation CreateCarBrand($input: CarBrandsCreate!) {
            createCarbrand(data: $input) {
                CarBrandID
                Name
            }
        }
    `,
    UPDATE_CARBRAND: `
        mutation UpdateCarBrand($carBrandID: Int!, $input: CarBrandsUpdate!) {
            updateCarbrand(carBrandID: $carBrandID, data: $input) {
                CarBrandID
                Name
            }
        }
    `,
    DELETE_CARBRAND: `
        mutation DeleteCarBrand($carBrandID: Int!) {
            deleteCarbrand(carBrandID: $carBrandID)
        }
    `,

    // MODELOS DE AUTO
    CREATE_CARMODEL: `
        mutation CreateCarModel($input: CarModelsCreate!) {
            createCarmodel(data: $input) {
                CarModelID
                CarBrandID
                Model
            }
        }
    `,
    UPDATE_CARMODEL: `
        mutation UpdateCarModel($carModelID: Int!, $input: CarModelsUpdate!) {
            updateCarmodel(carModelID: $carModelID, data: $input) {
                CarModelID
                CarBrandID
                Model
            }
        }
    `,
    DELETE_CARMODEL: `
        mutation DeleteCarModel($carModelID: Int!) {
            deleteCarmodel(carModelID: $carModelID)
        }
    `,

    // AUTOS
    CREATE_CAR: `
        mutation CreateCar($input: CarsCreate!) {
            createCar(data: $input) {
                CarID
                LicensePlate
                Year
                CarModelID
                ClientID
                LastServiceMileage
                IsDebtor
                DiscountID
            }
        }
    `,
    UPDATE_CAR: `
        mutation UpdateCar($carID: Int!, $input: CarsUpdate!) {
            updateCar(carID: $carID, data: $input) {
                CarID
                LicensePlate
                Year
                CarModelID
                ClientID
                LastServiceMileage
                IsDebtor
                DiscountID
            }
        }
    `,
    DELETE_CAR: `
        mutation DeleteCar($carID: Int!) {
            deleteCar(carID: $carID)
        }
    `,

    // GRUPOS DE TARJETAS DE CRÉDITO
    CREATE_CREDITCARDGROUP: `
        mutation CreateCreditCardGroup($input: CreditCardGroupsCreate!) {
            createCreditcardgroup(data: $input) {
                CreditCardGroupID
                GroupName
            }
        }
    `,
    UPDATE_CREDITCARDGROUP: `
        mutation UpdateCreditCardGroup($id: Int!, $input: CreditCardGroupsUpdate!) {
            updateCreditcardgroup(id: $id, data: $input) {
                CreditCardGroupID
                GroupName
            }
        }
    `,
    DELETE_CREDITCARDGROUP: `
        mutation DeleteCreditCardGroup($id: Int!) {
            deleteCreditcardgroup(id: $id)
        }
    `,

    // TARJETAS DE CRÉDITO
    CREATE_CREDITCARD: `
        mutation CreateCreditCard($input: CreditCardsCreate!) {
            createCreditcard(data: $input) {
                CreditCardID
                CreditCardGroupID
                CardName
                Surcharge
                Installments
                IsActive
            }
        }
    `,
    UPDATE_CREDITCARD: `
        mutation UpdateCreditCard($id: Int!, $input: CreditCardsUpdate!) {
            updateCreditcard(id: $id, data: $input) {
                CreditCardID
                CreditCardGroupID
                CardName
                Surcharge
                Installments
                IsActive
            }
        }
    `,
    DELETE_CREDITCARD: `
        mutation DeleteCreditCard($id: Int!) {
            deleteCreditcard(id: $id)
        }
    `,

    // CONDICIONES DE VENTA
    CREATE_SALECONDITION: `
        mutation CreateSaleCondition($input: SaleConditionsCreate!) {
            createSalecondition(data: $input) {
                SaleConditionID
                CreditCardID
                Name
                DueDate
                Surcharge
                IsActive
            }
        }
    `,
    UPDATE_SALECONDITION: `
        mutation UpdateSaleCondition($saleConditionID: Int!, $input: SaleConditionsUpdate!) {
            updateSalecondition(saleConditionID: $saleConditionID, data: $input) {
                SaleConditionID
                CreditCardID
                Name
                DueDate
                Surcharge
                IsActive
            }
        }
    `,
    DELETE_SALECONDITION: `
        mutation DeleteSaleCondition($saleConditionID: Int!) {
            deleteSalecondition(saleConditionID: $saleConditionID)
        }
    `,

    // ÍTEMS
    CREATE_ITEM: `
        mutation CreateItem($input: ItemsCreate!) {
            createItem(data: $input) {
                ItemID
                Code
            }
        }
    `,
    UPDATE_ITEM: `
        mutation UpdateItem($itemID: Int!, $input: ItemsUpdate!) {
            updateItem(itemID: $itemID, data: $input) {
                ItemID
                Code
            }
        }
    `,
    DELETE_ITEM: `
        mutation DeleteItem($itemID: Int!) {
            deleteItem(itemID: $itemID)
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

export const carBrandOperations = {
    async getAllCarBrands() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_CARBRANDS);
            return data.allCarbrands || [];
        } catch (error) {
            console.error("Error obteniendo marcas de auto:", error);
            throw error;
        }
    },

    async getCarBrandById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CARBRAND_BY_ID, { id });
            return data.carbrandsById;
        } catch (error) {
            console.error("Error obteniendo marca de auto:", error);
            throw error;
        }
    },

    async createCarBrand(carBrandData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_CARBRAND, {
                input: carBrandData
            });
            return data.createCarbrand;
        } catch (error) {
            console.error("Error creando marca de auto:", error);
            throw error;
        }
    },

    async updateCarBrand(id, carBrandData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CARBRAND, {
                carBrandID: id,
                input: carBrandData
            });
            return data.updateCarbrand;
        } catch (error) {
            console.error("Error actualizando marca de auto:", error);
            throw error;
        }
    },

    async deleteCarBrand(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_CARBRAND, {
                carBrandID: id
            });
            return data.deleteCarbrand;
        } catch (error) {
            console.error("Error eliminando marca de auto:", error);
            throw error;
        }
    }
};

export const carModelOperations = {
    async getAllCarModels() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_CARMODELS);
            return data.allCarmodels || [];
        } catch (error) {
            console.error("Error obteniendo modelos de auto:", error);
            throw error;
        }
    },

    async getCarModelById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CARMODEL_BY_ID, { id });
            return data.carmodelsById;
        } catch (error) {
            console.error("Error obteniendo modelo de auto:", error);
            throw error;
        }
    },

    async getCarModelsByBrand(brandID) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CARMODELS_BY_BRAND, { brandID: parseInt(brandID) });
            return data.carmodelsByBrand || [];
        } catch (error) {
            console.error("Error obteniendo modelos de auto por marca:", error);
            throw error;
        }
    },

    async createCarModel(carmodelData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_CARMODEL, {
                input: carmodelData
            });
            return data.createCarmodel;
        } catch (error) {
            console.error("Error creando modelo de auto:", error);
            throw error;
        }
    },

    async updateCarModel(id, carmodelData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CARMODEL, {
                carModelID: id,
                input: carmodelData
            });
            return data.updateCarmodel;
        } catch (error) {
            console.error("Error actualizando modelo de auto:", error);
            throw error;
        }
    },

    async deleteCarModel(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_CARMODEL, {
                carModelID: id
            });
            return data.deleteCarmodel;
        } catch (error) {
            console.error("Error eliminando modelo de auto:", error);
            throw error;
        }
    }
};

export const carOperations = {
    async getAllCars() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_CARS);
            return data.allCars || [];
        } catch (error) {
            console.error("Error obteniendo autos:", error);
            throw error;
        }
    },

    async getCarById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CAR_BY_ID, { id });
            return data.carsById;
        } catch (error) {
            console.error("Error obteniendo auto:", error);
            throw error;
        }
    },

    async createCar(carData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_CAR, { input: carData });
            return data.createCar;
        } catch (error) {
            console.error("Error creando auto:", error);
            throw error;
        }
    },

    async updateCar(id, carData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CAR, {
                carID: id,
                input: carData
            });
            return data.updateCar;
        } catch (error) {
            console.error("Error actualizando auto:", error);
            throw error;
        }
    },

    async deleteCar(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_CAR, { carID: id });
            return data.deleteCar;
        } catch (error) {
            console.error("Error eliminando auto:", error);
            throw error;
        }
    }
};

export const discountOperations = {
    async getAllDiscounts() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_DISCOUNTS);
            return data.allDiscounts || [];
        } catch (error) {
            console.error("Error obteniendo descuentos:", error);
            throw error;
        }
    }
};

export const saleConditionOperations = {
    async getAllSaleConditions() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_SALECONDITIONS);
            return data.allSaleconditions || [];
        } catch (error) {
            console.error("Error obteniendo condiciones de venta:", error);
            throw error;
        }
    },

    async getSaleConditionById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_SALECONDITION_BY_ID, { id });
            return data.saleconditionsById;
        } catch (error) {
            console.error("Error obteniendo condición de venta:", error);
            throw error;
        }
    },

    async createSaleCondition(scData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_SALECONDITION, {
                input: scData
            });
            return data.createSalecondition;
        } catch (error) {
            console.error("Error creando condición de venta:", error);
            throw error;
        }
    },

    async updateSaleCondition(id, scData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_SALECONDITION, {
                saleConditionID: id,
                input: scData
            });
            return data.updateSalecondition;
        } catch (error) {
            console.error("Error actualizando condición de venta:", error);
            throw error;
        }
    },

    async deleteSaleCondition(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_SALECONDITION, {
                saleConditionID: id
            });
            return data.deleteSalecondition;
        } catch (error) {
            console.error("Error eliminando condición de venta:", error);
            throw error;
        }
    }
};

export const creditCardGroupOperations = {
    async getAllGroups() {
        const data = await graphqlClient.query(QUERIES.GET_ALL_CREDITCARDGROUPS);
        return data.allCreditcardgroups || [];
    },

    async getGroupById(id) {
        const data = await graphqlClient.query(QUERIES.GET_CREDITCARDGROUP_BY_ID, { id });
        return data.creditcardgroupById;
    },

    async createGroup(input) {
        const data = await graphqlClient.mutation(MUTATIONS.CREATE_CREDITCARDGROUP, {
            input
        });
        return data.createCreditcardgroup;
    },

    async updateGroup(id, input) {
        const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CREDITCARDGROUP, {
            id,
            input
        });
        return data.updateCreditcardgroup;
    },

    async deleteGroup(id) {
        const data = await graphqlClient.mutation(MUTATIONS.DELETE_CREDITCARDGROUP, { id });
        return data.deleteCreditcardgroup;
    }
};

export const creditCardOperations = {
    async getAllCards() {
        const data = await graphqlClient.query(QUERIES.GET_ALL_CREDITCARDS);
        return data.allCreditcards || [];
    },

    async getCardById(id) {
        const data = await graphqlClient.query(QUERIES.GET_CREDITCARD_BY_ID, { id });
        return data.creditcardById;
    },

    async createCard(input) {
        const data = await graphqlClient.mutation(MUTATIONS.CREATE_CREDITCARD, { input });
        return data.createCreditcard;
    },

    async updateCard(id, input) {
        const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CREDITCARD, { id, input });
        return data.updateCreditcard;
    },

    async deleteCard(id) {
        const data = await graphqlClient.mutation(MUTATIONS.DELETE_CREDITCARD, { id });
        return data.deleteCreditcard;
    }
};

export const itemCategoryOperations = {
    async getAllItemCategories() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_ITEMCATEGORIES);
            return data.allItemcategories || [];
        } catch (error) {
            console.error("Error obteniendo categorías:", error);
            throw error;
        }
    },

    async getItemCategoryById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ITEMCATEGORY_BY_ID, { id });
            return data.itemcategoriesById;
        } catch (error) {
            console.error("Error obteniendo categoría:", error);
            throw error;
        }
    },

    async createItemCategory(categoryData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_ITEMCATEGORY, {
                input: categoryData
            });
            return data.createItemcategory;
        } catch (error) {
            console.error("Error creando categoría:", error);
            throw error;
        }
    },

    async updateItemCategory(id, categoryData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ITEMCATEGORY, {
                categoryID: id,
                input: categoryData
            });
            return data.updateItemcategory;
        } catch (error) {
            console.error("Error actualizando categoría:", error);
            throw error;
        }
    },

    async deleteItemCategory(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_ITEMCATEGORY, {
                categoryID: id
            });
            return data.deleteItemcategory;
        } catch (error) {
            console.error("Error eliminando categoría:", error);
            throw error;
        }
    }
};

export const itemSubcategoryOperations = {
    async getAllItemSubcategories() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_ITEMSUBCATEGORIES);
            return data.allItemsubcategories || [];
        } catch (error) {
            console.error("Error obteniendo subcategorías:", error);
            throw error;
        }
    },

    async getItemSubcategoryById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ITEMSUBCATEGORY_BY_ID, { id });
            return data.itemsubcategoriesById;
        } catch (error) {
            console.error("Error obteniendo subcategoría:", error);
            throw error;
        }
    },

    // NUEVA FUNCIÓN AGREGADA
    async getItemSubcategoriesByCategory(categoryID) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ITEMSUBCATEGORIES_BY_CATEGORY, {
                categoryID: parseInt(categoryID)
            });
            return data.itemsubcategoriesByCategory || [];
        } catch (error) {
            console.error("Error obteniendo subcategorías por categoría:", error);
            throw error;
        }
    },

    async createItemSubcategory(subcategoryData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_ITEMSUBCATEGORY, {
                input: subcategoryData
            });
            return data.createItemsubcategory;
        } catch (error) {
            console.error("Error creando subcategoría:", error);
            throw error;
        }
    },

    async updateItemSubcategory(id, subcategoryData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ITEMSUBCATEGORY, {
                subcategoryID: id,
                input: subcategoryData
            });
            return data.updateItemsubcategory;
        } catch (error) {
            console.error("Error actualizando subcategoría:", error);
            throw error;
        }
    },

    async deleteItemSubcategory(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_ITEMSUBCATEGORY, {
                subcategoryID: id
            });
            return data.deleteItemsubcategory;
        } catch (error) {
            console.error("Error eliminando subcategoría:", error);
            throw error;
        }
    }
};

export const itemOperations = {
    async getAllItems() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_ITEMS);
            return data.allItems || [];
        } catch (error) {
            console.error("Error obteniendo ítems:", error);
            throw error;
        }
    },

    async getItemById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ITEM_BY_ID, { id });
            return data.itemsById;
        } catch (error) {
            console.error("Error obteniendo ítem:", error);
            throw error;
        }
    },

    async createItem(itemData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_ITEM, {
                input: itemData
            });
            return data.createItem;
        } catch (error) {
            console.error("Error creando ítem:", error);
            throw error;
        }
    },

    async updateItem(id, itemData) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ITEM, {
                itemID: id,
                input: itemData
            });
            return data.updateItem;
        } catch (error) {
            console.error("Error actualizando ítem:", error);
            throw error;
        }
    },

    async deleteItem(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_ITEM, {
                itemID: id
            });
            return data.deleteItem;
        } catch (error) {
            console.error("Error eliminando ítem:", error);
            throw error;
        }
    }
};

// NUEVA OPERACIÓN AGREGADA
export const provinceOperations = {
    async getAllProvinces() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_PROVINCES);
            return data.allProvinces || [];
        } catch (error) {
            console.error("Error obteniendo provincias:", error);
            throw error;
        }
    },

    async getProvincesByCountry(countryID) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_PROVINCES_BY_COUNTRY, {
                countryID: parseInt(countryID)
            });
            return data.provincesByCountry || [];
        } catch (error) {
            console.error("Error obteniendo provincias por país:", error);
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