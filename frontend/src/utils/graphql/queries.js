// frontend/src/utils/graphql/queries.js
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
    GET_CLIENTS_BY_COMPANY: `
        query GetClientsByCompany($companyID: Int!) {
            clientsByCompany(companyID: $companyID) {
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
                CompanyID
                BranchID
            }
        }
    `,
    GET_CLIENTS_BY_BRANCH: `
        query GetClientsByBranch($companyID: Int!, $branchID: Int!) {
            clientsByBranch(companyID: $companyID, branchID: $branchID) {
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
                CompanyID
                BranchID
            }
        }
    `,

    // DATOS MAESTROS PARA FORMULARIOS
    GET_SYSDOCUMENT_TYPES: `
        query GetSysDocumentTypes {
            allSysdocumenttypes {
                DocumentTypeID
                Name
            }
        }
    `,

    // TIPOS DE DOCUMENTO PARA CLIENTES/PROVEEDORES
    GET_SYSDOC_TYPES: `
        query GetSysDocTypes {
            allSysdoctypes {
                DocTypeID
                Name
                IsActive
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
    GET_ALL_PRICELIST_ITEMS: `
        query GetAllPricelistItems {
            allPricelistitems {
                PriceListID
                ItemID
                Price
                EffectiveDate
                PriceListName
                Code
                Description
            }
        }
    `,
    GET_PRICELIST_ITEMS_FILTERED: `
        query GetPricelistItemsFiltered($priceListID: Int, $itemID: Int) {
            pricelistitemsFiltered(pricelistID: $priceListID, itemID: $itemID) {
                PriceListID
                ItemID
                Price
                EffectiveDate
                PriceListName
                Code
                Description
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
    GET_ALL_SYSORDERSTATUS: `
        query GetAllSysorderstatus {
            allSysorderstatus {
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
    // Alias para compatibilidad
    GET_ALL_VENDORS: `
        query GetAllVendors {
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

    // ROLES
    GET_ALL_ROLES: `
        query GetAllRoles {
            allRoles {
                RoleID
                RoleName
            }
        }
    `,

    GET_ROLE_BY_ID: `
        query GetRoleById($id: Int!) {
            rolesById(id: $id) {
                RoleID
                RoleName
            }
        }
    `,
    // ROLES Y USUARIOS (UserAccess)
    GET_ALL_USERACCESS: `
        query GetAllUseraccess {
            allUseraccess {
                UserID
                CompanyID
                BranchID
                RoleID
                UserData { FullName }
                CompanyData { Name }
                BranchData { Name }
                RoleData { RoleName }
            }
        }
    `,

    GET_USERACCESS_BY_ID: `
        query GetUseraccessById($userID: Int!, $companyID: Int!, $branchID: Int!, $roleID: Int!) {
            useraccessById(userID: $userID, companyID: $companyID, branchID: $branchID, roleID: $roleID) {
                UserID
                CompanyID
                BranchID
                RoleID
                UserData { FullName }
                CompanyData { Name }
                BranchData { Name }
                RoleData { RoleName }
            }
        }
    `,

    // COMBOS PARA FORMULARIOS
    GET_CLIENT_FORM_DATA: `
        query GetClientFormData {
            sysDocTypes: allSysdoctypes {
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
            companies: allCompanydata {
                CompanyID
                Name
            }
            branches: allBranches {
                BranchID
                CompanyID
                Name
            }
        }
    `,

    // FORMULARIO DE PROVEEDORES
    GET_SUPPLIER_FORM_DATA: `
        query GetSupplierFormData {
            sysDocTypes: allSysdoctypes {
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
            companies: allCompanydata {
                CompanyID
                Name
            }
            branches: allBranches {
                BranchID
                CompanyID
                Name
            }
        }
    `,

    // FORMULARIO DE AUTOS
    GET_CAR_FORM_DATA: `
        query GetCarFormData {
            companies: allCompanydata {
                CompanyID
                Name
            }
            carBrands: allCarbrands {
                CarBrandID
                CompanyID
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
    GET_SUPPLIERS_BY_COMPANY: `
        query GetSuppliersByCompany($companyID: Int!) {
            suppliersByCompany(companyID: $companyID) {
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
                CompanyID
                BranchID
            }
        }
    `,
    GET_SUPPLIERS_BY_BRANCH: `
        query GetSuppliersByBranch($companyID: Int!, $branchID: Int!) {
            suppliersByBranch(companyID: $companyID, branchID: $branchID) {
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
                CompanyID
                BranchID
            }
        }
    `,

    // MARCAS
    GET_ALL_BRANDS: `
        query GetAllBrands {
            allBrands {
                BrandID
                CompanyID
                Name
                IsActive
            }
        }
    `,
    GET_BRAND_BY_ID: `
        query GetBrandById($id: Int!) {
            brandsById(id: $id) {
                BrandID
                CompanyID
                Name
                IsActive
            }
        }
    `,
    GET_BRANDS_BY_COMPANY: `
        query GetBrandsByCompany($companyID: Int!) {
            brandsByCompany(companyID: $companyID) {
                BrandID
                CompanyID
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
                CompanyID
                Name
            }
        }
    `,
    GET_CARBRAND_BY_ID: `
        query GetCarBrandById($id: Int!) {
            carbrandsById(id: $id) {
                CarBrandID
                CompanyID
                Name
            }
        }
    `,
    GET_CARBRANDS_BY_COMPANY: `
        query GetCarBrandsByCompany($companyID: Int!) {
            carbrandsByCompany(companyID: $companyID) {
                CarBrandID
                CompanyID
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
                CompanyID
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
                CompanyID
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
    GET_CARS_BY_COMPANY: `
        query GetCarsByCompany($companyID: Int!) {
            carsByCompany(companyID: $companyID) {
                CarID
                CompanyID
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
    GET_DISCOUNT_BY_ID: `
        query GetDiscountById($id: Int!) {
            discountsById(id: $id) {
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

    // EMPRESAS
    GET_ALL_COMPANIES: `
        query GetAllCompanies {
            allCompanydata {
                CompanyID
                Name
                Address
                CUIT
                Grossincome
                Startdate
                Logo
            }
        }
    `,
    GET_COMPANY_BY_ID: `
        query GetCompanyById($id: Int!) {
            companydataById(id: $id) {
                CompanyID
                Name
                Address
                CUIT
                Grossincome
                Startdate
                Logo
            }
        }
    `,

    // SUCURSALES
    GET_ALL_BRANCHES: `
        query GetAllBranches {
            allBranches {
                BranchID
                CompanyID
                Name
                Address
                Phone
            }
        }
    `,
    GET_BRANCH_BY_ID: `
        query GetBranchById($companyID: Int!, $id: Int!) {
            branchesById(companyID: $companyID, id: $id) {
                BranchID
                CompanyID
                Name
                Address
                Phone
            }
        }
    `,

    // DOCUMENTOS
    GET_ALL_DOCUMENTS: `
        query GetAllDocuments {
            allDocuments {
                DocumentID
                CompanyID
                BranchID
                DocumentTypeID
                Description
                DocumentNumber
                PointOfSale
                IsActive
                Testing
                ShouldAccount
                MovesStock
                IsFiscal
                IsElectronic
                IsManual
                IsQuotation
                MaxItems
            }
        }
    `,
    GET_DOCUMENT_BY_ID: `
        query GetDocumentById($id: Int!) {
            documentsById(id: $id) {
                DocumentID
                CompanyID
                BranchID
                DocumentTypeID
                Description
                DocumentNumber
                PointOfSale
                IsActive
                Testing
                ShouldAccount
                MovesStock
                IsFiscal
                IsElectronic
                IsManual
                IsQuotation
                MaxItems
            }
        }
    `,

    // CAJAS
    GET_ALL_CASHBOXES: `
        query GetAllCashboxes {
            allCashboxes {
                CashBoxID
                CompanyID
                BranchID
                Name
                Description
                IsActive
                OpenDate
                CloseDate
                InitialBalance
                CurrentBalance
                UserID
                Notes
            }
        }
    `,
    GET_CASHBOX_BY_ID: `
        query GetCashboxById($id: Int!) {
            cashboxesById(id: $id) {
                CashBoxID
                CompanyID
                BranchID
                Name
                Description
                IsActive
                OpenDate
                CloseDate
                InitialBalance
                CurrentBalance
                UserID
                Notes
            }
        }
    `,

    // MOVIMIENTOS DE CAJA
    GET_ALL_CASHBOXMOVEMENTS: `
        query GetAllCashboxmovements {
            allCashboxmovements {
                CashBoxMovementID
                CashBoxID
                CompanyID
                BranchID
                MovementDate
                Amount
                MovementType
                Description
                UserID
                Notes
            }
        }
    `,
    GET_CASHBOXMOVEMENT_BY_ID: `
        query GetCashboxmovementById($id: Int!) {
            cashboxmovementsById(id: $id) {
                CashBoxMovementID
                CashBoxID
                CompanyID
                BranchID
                MovementDate
                Amount
                MovementType
                Description
                UserID
                Notes
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
