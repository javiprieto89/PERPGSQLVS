// frontend/src/utils/graphql/mutations.js
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
            deleteClient(clientID: $clientID) {
                success
                message
            }
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
            deleteSupplier(supplierID: $supplierID) {
                success
                message
            }
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
            deleteBrand(brandID: $brandID) {
                success
                message
            }
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
            deleteItemcategory(categoryID: $categoryID) {
                success
                message
            }
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
            deleteItemsubcategory(subcategoryID: $subcategoryID) {
                success
                message
            }
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
            deleteCarbrand(carBrandID: $carBrandID) {
                success
                message
            }
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
            deleteCarmodel(carModelID: $carModelID) {
                success
                message
            }
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
            deleteCar(carID: $carID) {
                success
                message
            }
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
            deleteCreditcardgroup(id: $id) {
                success
                message
            }
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
            deleteCreditcard(id: $id) {
                success
                message
            }
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
            deleteSalecondition(saleConditionID: $saleConditionID) {
                success
                message
            }
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
            deleteItem(itemID: $itemID) {
                success
                message
            }
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
            deletePricelist(pricelistID: $pricelistID) {
                success
                message
            }
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
            deleteWarehouse(warehouseID: $warehouseID) {
                success
                message
            }
        }
    `,

    // EMPRESAS
    CREATE_COMPANY: `
        mutation CreateCompany($input: CompanyDataCreate!) {
            createCompany(data: $input) {
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
    UPDATE_COMPANY: `
        mutation UpdateCompany($companyID: Int!, $input: CompanyDataUpdate!) {
            updateCompany(companyID: $companyID, data: $input) {
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
    DELETE_COMPANY: `
        mutation DeleteCompany($companyID: Int!) {
            deleteCompany(companyID: $companyID)
        }
    `,

    // SUCURSALES
    CREATE_BRANCH: `
        mutation CreateBranch($input: BranchesCreate!) {
            createBranch(data: $input) {
                BranchID
                CompanyID
                Name
            }
        }
    `,
    UPDATE_BRANCH: `
        mutation UpdateBranch($branchID: Int!, $input: BranchesUpdate!) {
            updateBranch(branchID: $branchID, data: $input) {
                BranchID
                CompanyID
                Name
            }
        }
    `,
    DELETE_BRANCH: `
        mutation DeleteBranch($branchID: Int!) {
            deleteBranch(branchID: $branchID)
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
            deleteOrder(orderID: $orderID) {
                success
                message
            }
        }
    `,

    // ROLES
    CREATE_ROLE: `
        mutation CreateRole($input: RolesCreate!) {
            createRole(data: $input) {
                RoleID
                RoleName
            }
        }
    `,
    UPDATE_ROLE: `
        mutation UpdateRole($roleID: Int!, $input: RolesUpdate!) {
            updateRole(roleID: $roleID, data: $input) {
                RoleID
                RoleName
            }
        }
    `,
    DELETE_ROLE: `
        mutation DeleteRole($roleID: Int!) {
            deleteRole(roleID: $roleID)
        }
    `,

    // USERS
    CREATE_USER_RECORD: `
        mutation CreateUserRecord($input: UserCreate!) {
            createUserRecord(data: $input) {
                UserID
                Nickname
                FullName
                IsActive
            }
        }
    `,
    UPDATE_USER_RECORD: `
        mutation UpdateUserRecord($userID: Int!, $input: UserUpdate!) {
            updateUserRecord(userID: $userID, data: $input) {
                UserID
                Nickname
                FullName
                IsActive
            }
        }
    `,
    DELETE_USER_RECORD: `
        mutation DeleteUserRecord($userID: Int!) {
            deleteUserRecord(userID: $userID)
        }
    `,

    // USER ACCESS
    CREATE_USERACCESS: `
        mutation CreateUseraccess($input: UserAccessCreate!) {
            createUseraccess(data: $input) {
                UserID
                CompanyID
                BranchID
                RoleID
            }
        }
    `,
    UPDATE_USERACCESS: `
        mutation UpdateUseraccess(
            $oldUserID: Int!,
            $oldCompanyID: Int!,
            $oldBranchID: Int!,
            $oldRoleID: Int!,
            $newData: UserAccessCreate!
        ) {
            updateUseraccess(
                oldUserID: $oldUserID,
                oldCompanyID: $oldCompanyID,
                oldBranchID: $oldBranchID,
                oldRoleID: $oldRoleID,
                newData: $newData
            ) {
                UserID
                CompanyID
                BranchID
                RoleID
            }
        }
    `,
    DELETE_USERACCESS: `
        mutation DeleteUseraccess($userID: Int!, $companyID: Int!, $branchID: Int!, $roleID: Int!) {
            deleteUseraccess(userID: $userID, companyID: $companyID, branchID: $branchID, roleID: $roleID)
        }
    `
};

// ===== FUNCIONES AUXILIARES =====
