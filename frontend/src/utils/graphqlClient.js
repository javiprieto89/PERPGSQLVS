// utils/graphqlClient.js
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
    GET_PRICELIST_BY_ID: `
        query GetPricelistById($id: Int!) {
            pricelistsById(id: $id) {
                PriceListID
                Name
                Description
                IsActive
            }
        }
    `,
    GET_ALL_WAREHOUSES: `
        query GetWarehouses {
            allWarehouses {
                WarehouseID
                Name
                Addres
            }
        }
    `,
    GET_WAREHOUSE_BY_ID: `
        query GetWarehouseById($id: Int!) {
            warehousesById(id: $id) {
                WarehouseID
                Name
                Addres
            }
        }
    `,

    // SERVICETYPES
    GET_ALL_SERVICETYPES: `
        query GetAllServicetypes {
            allServicetypes {
                ServiceTypeID
                Type
            }
        }
    `,
    GET_SERVICETYPE_BY_ID: `
        query GetServicetypeById($id: Int!) {
            servicetypesById(id: $id) {
                ServiceTypeID
                Type
            }
        }
    `,

    // ORDER STATUS
    GET_ALL_ORDERSTATUS: `
        query GetAllOrderstatus {
            allOrderstatus {
                OrderStatusID
                Status
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

    GET_ALL_USERS: `
        query GetAllUsers {
            allUsers {
                UserID
                Nickname
                FullName
                IsActive
            }
        }
    `,

    GET_USER_BY_ID: `
        query GetUserById($id: Int!) {
            usersById(id: $id) {
                UserID
                Nickname
                FullName
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

    // FORMULARIO DE PROVEEDORES
    GET_SUPPLIER_FORM_DATA: `
        query GetSupplierFormData {
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
        }
    `,

    // FORMULARIO DE AUTOS
    GET_CAR_FORM_DATA: `
        query GetCarFormData {
            carBrands: allCarbrands {
                CarBrandID
                Name
            }
            carModels: allCarmodels {
                CarModelID
                CarBrandID
                Model
            }
            clients: allClients {
                ClientID
                FirstName
                LastName
            }
            discounts: allDiscounts {
                DiscountID
                DiscountName
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

    SEARCH_ITEMS: `
        query SearchItems($filters: ItemFilters, $pagination: ItemPagination) {
            searchItems(filters: $filters, pagination: $pagination) {
                items {
                    ItemID
                    Code
                    Description
                    Price
                }
                total
            }
        }
    `,

    // ORDENES - CORREGIDO
    GET_ALL_ORDERS: `
        query GetAllOrders {
            allOrders {
                OrderID
                CompanyID
                BranchID
                Date_
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
                PriceListID
                OrderStatusID
                WarehouseID
            }
        }
    `,

    // NUEVA QUERY PARA ORDER BY ID
    GET_ORDER_BY_ID: `
        query GetOrderById($id: Int!) {
            ordersById(id: $id) {
                OrderID
                CompanyID
                BranchID
                Date_
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
                PriceListID
                OrderStatusID
                WarehouseID
                Items {
                    OrderDetailID
                    ItemID
                    Quantity
                    UnitPrice
                    Description
                }
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
                CategoryName
            }
        }
    `,
    GET_ITEMSUBCATEGORY_BY_ID: `
        query GetItemSubcategoryById($id: Int!) {
            itemsubcategoriesById(id: $id) {
                ItemSubcategoryID
                ItemCategoryID
                SubcategoryName
                CategoryName
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
                ClientFirstName
                ClientLastName
                ClientName
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
                ClientFirstName
                ClientLastName
                ClientName
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
                GroupName
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
                GroupName
                CardName
                Surcharge
                Installments
                IsActive
            }
        }
    `,

    // DASHBOARD COMPLETO - CORREGIDO
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
                OrderStatusID
                Total
                Date_
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
    `,
    CREATE_PRICELIST: `
        mutation CreatePricelist($input: PriceListsCreate!) {
            createPricelist(data: $input) {
                PriceListID
                Name
                Description
                IsActive
            }
        }
    `,
    UPDATE_PRICELIST: `
        mutation UpdatePricelist($pricelistID: Int!, $input: PriceListsUpdate!) {
            updatePricelist(pricelistID: $pricelistID, data: $input) {
                PriceListID
                Name
                Description
                IsActive
            }
        }
    `,
    DELETE_PRICELIST: `
        mutation DeletePricelist($pricelistID: Int!) {
            deletePricelist(pricelistID: $pricelistID)
        }
    `,
    CREATE_WAREHOUSE: `
        mutation CreateWarehouse($input: WarehousesCreate!) {
            createWarehouse(data: $input) {
                WarehouseID
                Name
                Addres
            }
        }
    `,
    UPDATE_WAREHOUSE: `
        mutation UpdateWarehouse($warehouseID: Int!, $input: WarehousesUpdate!) {
            updateWarehouse(warehouseID: $warehouseID, data: $input) {
                WarehouseID
                Name
                Addres
            }
        }
    `,
    DELETE_WAREHOUSE: `
        mutation DeleteWarehouse($warehouseID: Int!) {
            deleteWarehouse(warehouseID: $warehouseID)
        }
    `,

    // ======= ORDENES - NUEVAS MUTACIONES CORREGIDAS =======
    CREATE_ORDER: `
        mutation CreateOrder($input: OrdersCreate!) {
            createOrder(data: $input) {
                OrderID
                CompanyID
                BranchID
                Date_
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
                PriceListID
                OrderStatusID
                WarehouseID
            }
        }
    `,

    UPDATE_ORDER: `
        mutation UpdateOrder($orderID: Int!, $input: OrdersUpdate!) {
            updateOrder(orderID: $orderID, data: $input) {
                OrderID
                CompanyID
                BranchID
                Date_
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
                PriceListID
                OrderStatusID
                WarehouseID
            }
        }
    `,

    DELETE_ORDER: `
        mutation DeleteOrder($orderID: Int!) {
            deleteOrder(orderID: $orderID)
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

// ===== FUNCIONES AUXILIARES DE ÓRDENES - NUEVAS =====
export const orderHelpers = {
    validateOrderData(orderData) {
        const errors = [];

        // Campos requeridos
        if (!orderData.CompanyID) errors.push("ID de compañía es requerido");
        if (!orderData.BranchID) errors.push("ID de sucursal es requerido");
        if (!orderData.Date_) errors.push("Fecha es requerida");
        if (!orderData.ClientID) errors.push("Cliente es requerido");
        if (!orderData.SaleConditionID) errors.push("Condición de venta es requerida");
        if (!orderData.DiscountID) errors.push("Descuento es requerido");
        if (orderData.Subtotal === undefined || orderData.Subtotal === null) errors.push("Subtotal es requerido");
        if (orderData.Total === undefined || orderData.Total === null) errors.push("Total es requerido");
        if (orderData.VAT === undefined || orderData.VAT === null) errors.push("IVA es requerido");
        if (!orderData.UserID) errors.push("Usuario es requerido");
        if (!orderData.DocumentID) errors.push("ID de documento es requerido");
        if (!orderData.PriceListID) errors.push("Lista de precios es requerida");
        if (!orderData.OrderStatusID) errors.push("Estado de orden es requerido");
        if (!orderData.WarehouseID) errors.push("Depósito es requerido");

        // Validaciones de tipo
        if (orderData.Subtotal && orderData.Subtotal < 0) errors.push("El subtotal no puede ser negativo");
        if (orderData.Total && orderData.Total < 0) errors.push("El total no puede ser negativo");
        if (orderData.VAT && orderData.VAT < 0) errors.push("El IVA no puede ser negativo");
        if (orderData.Mileage && orderData.Mileage < 0) errors.push("El kilometraje no puede ser negativo");

        return errors;
    },

    formatOrderForDisplay(order) {
        return {
            ...order,
            FormattedDate: order.Date_ ? new Date(order.Date_).toLocaleDateString() : '',
            FormattedTotal: order.Total ? `${order.Total.toFixed(2)}` : '$0.00',
            ServiceText: order.IsService ? 'Sí' : 'No',
            StatusDisplay: order.OrderStatusID === 1 ? 'Pendiente' : 
                          order.OrderStatusID === 2 ? 'En proceso' : 
                          order.OrderStatusID === 3 ? 'Completada' : 'Desconocido'
        };
    },

    prepareOrderData(formData) {
        return {
            CompanyID: parseInt(formData.CompanyID),
            BranchID: parseInt(formData.BranchID),
            Date_: new Date(formData.Date_),
            ClientID: parseInt(formData.ClientID),
            SaleConditionID: parseInt(formData.SaleConditionID),
            DiscountID: parseInt(formData.DiscountID),
            Subtotal: parseFloat(formData.Subtotal),
            Total: parseFloat(formData.Total),
            VAT: parseFloat(formData.VAT),
            UserID: parseInt(formData.UserID),
            DocumentID: parseInt(formData.DocumentID),
            PriceListID: parseInt(formData.PriceListID),
            OrderStatusID: parseInt(formData.OrderStatusID),
            WarehouseID: parseInt(formData.WarehouseID),
            
            // Campos opcionales
            CarID: formData.CarID ? parseInt(formData.CarID) : null,
            IsService: Boolean(formData.IsService),
            ServiceTypeID: formData.ServiceTypeID ? parseInt(formData.ServiceTypeID) : null,
            Mileage: formData.Mileage ? parseInt(formData.Mileage) : null,
            NextServiceMileage: formData.NextServiceMileage ? parseInt(formData.NextServiceMileage) : null,
            Notes: formData.Notes?.trim() || null,
            
            // Items de la orden
            Items: formData.Items || []
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

        // Filtrar órdenes del mes actual - CORREGIDO
        const monthlyOrders = filteredOrders.filter(order => {
            if (!order.Date_) return false; // Corregido: usar Date_ en lugar de Date
            const orderDate = new Date(order.Date_);
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
            pendingOrders: filteredOrders.filter(o => [1, 2].includes(o.OrderStatusID)).length,
            completedOrders: filteredOrders.filter(o => o.OrderStatusID === 3).length,
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
            const data = await graphqlClient.query(QUERIES.GET_SUPPLIER_FORM_DATA);
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

export const vendorOperations = {
    async getAllVendors() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_VENDORS);
            return data.allVendors || [];
        } catch (error) {
            console.error("Error obteniendo vendedores:", error);
            throw error;
        }
    }
};

export const userOperations = {
    async getAllUsers() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_USERS);
            return data.allUsers || [];
        } catch (error) {
            console.error("Error obteniendo usuarios:", error);
            throw error;
        }
    },

    async getUserById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_USER_BY_ID, { id });
            return data.usersById;
        } catch (error) {
            console.error("Error obteniendo usuario:", error);
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

function sanitizeCarPayload(data) {
    const allowed = [
        'CarModelID',
        'ClientID',
        'LicensePlate',
        'Year',
        'LastServiceMileage',
        'IsDebtor',
        'DiscountID'
    ];
    const payload = {};
    for (const field of allowed) {
        if (data[field] !== undefined) {
            payload[field] = data[field];
        }
    }
    return payload;
}

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

    async getCarFormData() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_CAR_FORM_DATA);
            return {
                carBrands: data.carBrands || [],
                carModels: data.carModels || [],
                clients: data.clients || [],
                discounts: data.discounts || []
            };
        } catch (error) {
            console.error("Error obteniendo datos del formulario de autos:", error);
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
            const data = await graphqlClient.mutation(MUTATIONS.CREATE_CAR, { input: sanitizeCarPayload(carData) });
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
                input: sanitizeCarPayload(carData)
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
    },

    async searchItems(search = "", page = 1, limit = 50) {
        try {
            const variables = {
                filters: search ? { search } : null,
                pagination: { page, limit },
            };
            const data = await graphqlClient.query(QUERIES.SEARCH_ITEMS, variables);
            return data.searchItems?.items || [];
        } catch (error) {
            console.error("Error buscando ítems:", error);
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

export const pricelistOperations = {
    async getAllPricelists() {
        const data = await graphqlClient.query(QUERIES.GET_PRICE_LISTS);
        return data.allPricelists || [];
    },
    async getPricelistById(id) {
        const data = await graphqlClient.query(QUERIES.GET_PRICELIST_BY_ID, { id });
        return data.pricelistsById;
    },
    async createPricelist(input) {
        const data = await graphqlClient.mutation(MUTATIONS.CREATE_PRICELIST, { input });
        return data.createPricelist;
    },
    async updatePricelist(id, input) {
        const data = await graphqlClient.mutation(MUTATIONS.UPDATE_PRICELIST, { pricelistID: id, input });
        return data.updatePricelist;
    },
    async deletePricelist(id) {
        const data = await graphqlClient.mutation(MUTATIONS.DELETE_PRICELIST, { pricelistID: id });
        return data.deletePricelist;
    }
};

export const warehouseOperations = {
    async getAllWarehouses() {
        const data = await graphqlClient.query(QUERIES.GET_ALL_WAREHOUSES);
        return data.allWarehouses || [];
    },
    async getWarehouseById(id) {
        const data = await graphqlClient.query(QUERIES.GET_WAREHOUSE_BY_ID, { id });
        return data.warehousesById;
    },
    async createWarehouse(input) {
        const data = await graphqlClient.mutation(MUTATIONS.CREATE_WAREHOUSE, { input });
        return data.createWarehouse;
    },
    async updateWarehouse(id, input) {
        const data = await graphqlClient.mutation(MUTATIONS.UPDATE_WAREHOUSE, { warehouseID: id, input });
        return data.updateWarehouse;
    },
    async deleteWarehouse(id) {
        const data = await graphqlClient.mutation(MUTATIONS.DELETE_WAREHOUSE, { warehouseID: id });
        return data.deleteWarehouse;
    }
};

export const serviceTypeOperations = {
    async getAllServicetypes() {
        const data = await graphqlClient.query(QUERIES.GET_ALL_SERVICETYPES);
        return data.allServicetypes || [];
    },
    async getServicetypeById(id) {
        const data = await graphqlClient.query(QUERIES.GET_SERVICETYPE_BY_ID, { id });
        return data.servicetypesById;
    }
};

export const orderStatusOperations = {
    async getAllOrderstatus() {
        const data = await graphqlClient.query(QUERIES.GET_ALL_ORDERSTATUS);
        return data.allOrderstatus || [];
    }
};

// ===== FUNCIONES DE ÓRDENES - NUEVAS Y COMPLETAS =====
export const orderOperations = {
    async getAllOrders() {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ALL_ORDERS);
            return data.allOrders || [];
        } catch (error) {
            console.error("Error obteniendo órdenes:", error);
            throw error;
        }
    },

    async getOrderById(id) {
        try {
            const data = await graphqlClient.query(QUERIES.GET_ORDER_BY_ID, { id });
            return data.ordersById;
        } catch (error) {
            console.error("Error obteniendo orden:", error);
            throw error;
        }
    },

    async createOrder(orderData) {
        try {
            // Validar datos requeridos
            const errors = orderHelpers.validateOrderData(orderData);
            if (errors.length > 0) {
                throw new Error(`Errores de validación: ${errors.join(', ')}`);
            }

            // Preparar datos
            const preparedData = orderHelpers.prepareOrderData(orderData);

            const data = await graphqlClient.mutation(MUTATIONS.CREATE_ORDER, {
                input: preparedData
            });

            return data.createOrder;
        } catch (error) {
            console.error("Error creando orden:", error);
            throw error;
        }
    },

    async updateOrder(id, orderData) {
        try {
            // Preparar datos para actualización (solo campos no nulos)
            const preparedData = {};
            
            if (orderData.CompanyID) preparedData.CompanyID = parseInt(orderData.CompanyID);
            if (orderData.BranchID) preparedData.BranchID = parseInt(orderData.BranchID);
            if (orderData.Date_) preparedData.Date_ = new Date(orderData.Date_);
            if (orderData.ClientID) preparedData.ClientID = parseInt(orderData.ClientID);
            if (orderData.CarID) preparedData.CarID = parseInt(orderData.CarID);
            if (orderData.IsService !== undefined) preparedData.IsService = Boolean(orderData.IsService);
            if (orderData.ServiceTypeID) preparedData.ServiceTypeID = parseInt(orderData.ServiceTypeID);
            if (orderData.Mileage) preparedData.Mileage = parseInt(orderData.Mileage);
            if (orderData.NextServiceMileage) preparedData.NextServiceMileage = parseInt(orderData.NextServiceMileage);
            if (orderData.Notes !== undefined) preparedData.Notes = orderData.Notes?.trim() || null;
            if (orderData.SaleConditionID) preparedData.SaleConditionID = parseInt(orderData.SaleConditionID);
            if (orderData.DiscountID) preparedData.DiscountID = parseInt(orderData.DiscountID);
            if (orderData.Subtotal !== undefined) preparedData.Subtotal = parseFloat(orderData.Subtotal);
            if (orderData.Total !== undefined) preparedData.Total = parseFloat(orderData.Total);
            if (orderData.VAT !== undefined) preparedData.VAT = parseFloat(orderData.VAT);
            if (orderData.UserID) preparedData.UserID = parseInt(orderData.UserID);
            if (orderData.DocumentID) preparedData.DocumentID = parseInt(orderData.DocumentID);
            if (orderData.OrderStatusID) preparedData.OrderStatusID = parseInt(orderData.OrderStatusID);
            if (orderData.PriceListID) preparedData.PriceListID = parseInt(orderData.PriceListID);
            if (orderData.WarehouseID) preparedData.WarehouseID = parseInt(orderData.WarehouseID);

            const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ORDER, {
                orderID: id,
                input: preparedData
            });

            return data.updateOrder;
        } catch (error) {
            console.error("Error actualizando orden:", error);
            throw error;
        }
    },

    async deleteOrder(id) {
        try {
            const data = await graphqlClient.mutation(MUTATIONS.DELETE_ORDER, {
                orderID: id
            });

            return data.deleteOrder;
        } catch (error) {
            console.error("Error eliminando orden:", error);
            throw error;
        }
    },

    // Función auxiliar para obtener datos del formulario de órdenes
    async getOrderFormData() {
        try {
            const [
                clients,
                cars,
                saleConditions,
                discounts,
                priceLists,
                warehouses,
                serviceTypes,
                orderStatus
            ] = await Promise.all([
                clientOperations.getAllClients(),
                carOperations.getAllCars(),
                saleConditionOperations.getAllSaleConditions(),
                discountOperations.getAllDiscounts(),
                pricelistOperations.getAllPricelists(),
                warehouseOperations.getAllWarehouses(),
                serviceTypeOperations.getAllServicetypes(),
                orderStatusOperations.getAllOrderstatus()
            ]);

            return {
                clients: clients.filter(c => c.IsActive),
                cars,
                saleConditions: saleConditions.filter(sc => sc.IsActive),
                discounts,
                priceLists: priceLists.filter(pl => pl.IsActive),
                warehouses,
                serviceTypes,
                orderStatus
            };
        } catch (error) {
            console.error("Error obteniendo datos del formulario de órdenes:", error);
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

    // 3. Probar consulta de órdenes
    console.log("3. Probando consulta de órdenes...");
    try {
        const orders = await orderOperations.getAllOrders();
        console.log("   ✅ Órdenes obtenidas:", orders.length);
    } catch (error) {
        console.error("   ❌ Error obteniendo órdenes:", error.message);
        return false;
    }

    // 4. Probar datos del formulario
    console.log("4. Probando datos del formulario...");
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