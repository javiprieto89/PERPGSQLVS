# app/utils/filter_schemas.py

FILTER_SCHEMAS = {
    "clients": [
        {"field": "ClientID", "label": "ID de cliente", "type": "number"},
        {"field": "DocTypeID", "label": "Tipo de documento", "type": "select", "relationModel": "DocType"},
        {"field": "DocNumber", "label": "Número de documento", "type": "text"},
        {"field": "FirstName", "label": "Nombre", "type": "text"},
        {"field": "LastName", "label": "Apellido", "type": "text"},
        {"field": "Phone", "label": "Teléfono", "type": "text"},
        {"field": "Email", "label": "Correo electrónico", "type": "text"},
        {"field": "Address", "label": "Dirección", "type": "text"},
        {"field": "City", "label": "Ciudad", "type": "text"},
        {"field": "PostalCode", "label": "Código postal", "type": "text"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"},
        {"field": "CountryID", "label": "País", "type": "select", "relationModel": "Country"},
        {"field": "ProvinceID", "label": "Provincia", "type": "select", "relationModel": "Province", "dependsOn": "CountryID"},
        {"field": "PriceListID", "label": "Lista de precios", "type": "select", "relationModel": "PriceList"},
        {"field": "VendorID", "label": "Vendedor", "type": "select", "relationModel": "Vendor"},
    ],
    "suppliers": [
        {"field": "SupplierID", "label": "ID de proveedor", "type": "number"},
        {"field": "DocTypeID", "label": "Tipo de documento", "type": "select", "relationModel": "DocType"},
        {"field": "DocNumber", "label": "Número de documento", "type": "text"},
        {"field": "FirstName", "label": "Nombre", "type": "text"},
        {"field": "LastName", "label": "Apellido", "type": "text"},
        {"field": "Phone", "label": "Teléfono", "type": "text"},
        {"field": "Email", "label": "Correo electrónico", "type": "text"},
        {"field": "Address", "label": "Dirección", "type": "text"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"},
        {"field": "CountryID", "label": "País", "type": "select", "relationModel": "Country"},
        {"field": "ProvinceID", "label": "Provincia", "type": "select", "relationModel": "Province", "dependsOn": "CountryID"},
        {"field": "City", "label": "Ciudad", "type": "text"},
        {"field": "PostalCode", "label": "Código postal", "type": "text"},
    ],
    "items": [
        {"field": "ItemID", "label": "ID de ítem", "type": "number"},
        {"field": "CompanyID", "label": "Compañía", "type": "select", "relationModel": "Company"},
        {"field": "BranchID", "label": "Sucursal", "type": "select", "relationModel": "Branch", "dependsOn": "CompanyID"},
        {"field": "Code", "label": "Código", "type": "text"},
        {"field": "Description", "label": "Descripción", "type": "text"},
        {"field": "BrandID", "label": "Marca", "type": "select", "relationModel": "Brand"},
        {"field": "BrandName", "label": "Marca (nombre)", "type": "text"},
        {"field": "ItemCategoryID", "label": "Categoría", "type": "select", "relationModel": "ItemCategory"},
        {"field": "CategoryName", "label": "Categoría (nombre)", "type": "text"},
        {"field": "ItemSubcategoryID", "label": "Subcategoría", "type": "select", "relationModel": "ItemSubcategory", "dependsOn": "ItemCategoryID"},
        {"field": "SubcategoryName", "label": "Subcategoría (nombre)", "type": "text"},
        {"field": "SupplierID", "label": "Proveedor", "type": "select", "relationModel": "Supplier"},
        {"field": "SupplierName", "label": "Proveedor (nombre)", "type": "text"},
        {"field": "ControlStock", "label": "Control de stock", "type": "boolean"},
        {"field": "ReplenishmentStock", "label": "Stock de reposición", "type": "number"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"},
        {"field": "IsOffer", "label": "Es oferta", "type": "boolean"},
        {"field": "OEM", "label": "OEM", "type": "text"},
        {"field": "WarehouseID", "label": "Depósito", "type": "select", "relationModel": "Warehouse"},
        {"field": "WarehouseName", "label": "Depósito (nombre)", "type": "text"},
        {"field": "LastModified", "label": "Última modificación", "type": "text"},
    ],
    "brands": [
        {"field": "BrandID", "label": "ID de marca", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ],
    "carbrands": [
        {"field": "CarBrandID", "label": "ID de marca de auto", "type": "number"},
        {"field": "CompanyID", "label": "Compañía", "type": "select", "relationModel": "Company"},
        {"field": "Name", "label": "Nombre", "type": "text"}
    ],
    "carmodels": [
        {"field": "CarModelID", "label": "ID de modelo", "type": "number"},
        {"field": "CarBrandID", "label": "Marca", "type": "select", "relationModel": "CarBrand"},
        {"field": "CarBrandName", "label": "Marca (nombre)", "type": "text"},
        {"field": "Model", "label": "Modelo", "type": "text"}
    ],
    "cars": [
        {"field": "CarID", "label": "ID de auto", "type": "number"},
        {"field": "CarModelID", "label": "Modelo", "type": "select", "relationModel": "CarModel"},
        {"field": "CarModelName", "label": "Modelo (nombre)", "type": "text"},
        {"field": "CarBrandID", "label": "Marca", "type": "select", "relationModel": "CarBrand"},
        {"field": "CarBrandName", "label": "Marca (nombre)", "type": "text"},
        {"field": "ClientID", "label": "Cliente", "type": "select", "relationModel": "Client"},
        {"field": "ClientName", "label": "Cliente (nombre)", "type": "text"},
        {"field": "LicensePlate", "label": "Patente", "type": "text"},
        {"field": "Year", "label": "Año", "type": "number"},
        {"field": "LastServiceMileage", "label": "Km último servicio", "type": "number"},
        {"field": "IsDebtor", "label": "Es deudor", "type": "boolean"},
        {"field": "DiscountID", "label": "Descuento", "type": "select", "relationModel": "Discount"},
        {"field": "DiscountName", "label": "Descuento (nombre)", "type": "text"}
    ],
    "itemcategories": [
        {"field": "ItemCategoryID", "label": "ID de categoría", "type": "number"},
        {"field": "CategoryName", "label": "Nombre", "type": "text"}
    ],
    "itemsubcategories": [
        {"field": "ItemSubcategoryID", "label": "ID de subcategoría", "type": "number"},
        {"field": "ItemCategoryID", "label": "Categoría", "type": "select", "relationModel": "ItemCategory"},
        {"field": "CategoryName", "label": "Categoría (nombre)", "type": "text"},
        {"field": "SubcategoryName", "label": "Nombre", "type": "text"}
    ],
    "countries": [
        {"field": "CountryID", "label": "ID de país", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"}
    ],
    "provinces": [
        {"field": "ProvinceID", "label": "ID de provincia", "type": "number"},
        {"field": "CountryID", "label": "País", "type": "select", "relationModel": "Country"},
        {"field": "CountryName", "label": "País (nombre)", "type": "text"},
        {"field": "Name", "label": "Nombre", "type": "text"}
    ],
    "pricelists": [
        {"field": "PriceListID", "label": "ID de lista de precios", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"},
        {"field": "Description", "label": "Descripción", "type": "text"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ],
    "roles": [
        {"field": "RoleID", "label": "ID de rol", "type": "number"},
        {"field": "RoleName", "label": "Nombre", "type": "text"}
    ],
    "vendors": [
        {"field": "VendorID", "label": "ID de vendedor", "type": "number"},
        {"field": "VendorName", "label": "Nombre del vendedor", "type": "text"},
        {"field": "Commission", "label": "Comisión", "type": "number"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ],
    "branches": [
        {"field": "BranchID", "label": "ID de sucursal", "type": "number"},
        {"field": "CompanyID", "label": "Compañía", "type": "select", "relationModel": "Company"},
        {"field": "CompanyName", "label": "Compañía (nombre)", "type": "text"},
        {"field": "Name", "label": "Nombre", "type": "text"},
        {"field": "Address", "label": "Dirección", "type": "text"},
        {"field": "Phone", "label": "Teléfono", "type": "text"}
    ],
    "companydata": [
        {"field": "CompanyID", "label": "ID de compañía", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"},
        {"field": "Address", "label": "Dirección", "type": "text"},
        {"field": "CUIT", "label": "CUIT", "type": "text"},
        {"field": "GrossIncome", "label": "Ingresos brutos", "type": "text"},
        {"field": "StartDate", "label": "Fecha de inicio", "type": "text"}
    ],
    "sysdoctypes": [
        {"field": "DocTypeID", "label": "ID de tipo de documento", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"}
    ],
    "discounts": [
        {"field": "DiscountID", "label": "ID de descuento", "type": "number"},
        {"field": "DiscountName", "label": "Nombre del descuento", "type": "text"},
        {"field": "Percentage", "label": "Porcentaje", "type": "number"}
    ],
    "creditcardgroups": [
        {"field": "CreditCardGroupID", "label": "ID de grupo", "type": "number"},
        {"field": "GroupName", "label": "Nombre del grupo", "type": "text"}
    ],
    "creditcards": [
        {"field": "CreditCardID", "label": "ID de tarjeta", "type": "number"},
        {"field": "CreditCardGroupID", "label": "Grupo", "type": "select", "relationModel": "CreditCardGroup"},
        {"field": "GroupName", "label": "Grupo (nombre)", "type": "text"},
        {"field": "CardName", "label": "Nombre de tarjeta", "type": "text"},
        {"field": "Surcharge", "label": "Recargo", "type": "number"},
        {"field": "Installments", "label": "Cuotas", "type": "number"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ],
    "saleconditions": [
        {"field": "SaleConditionID", "label": "ID de condición", "type": "number"},
        {"field": "CreditCardID", "label": "Tarjeta", "type": "select", "relationModel": "CreditCard"},
        {"field": "CardName", "label": "Tarjeta (nombre)", "type": "text"},
        {"field": "Name", "label": "Nombre", "type": "text"},
        {"field": "DueDate", "label": "Vencimiento", "type": "text"},
        {"field": "Surcharge", "label": "Recargo", "type": "number"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ],
    "servicetypes": [
        {"field": "ServiceTypeID", "label": "ID de tipo", "type": "number"},
        {"field": "Type", "label": "Nombre", "type": "text"}
    ],
    "users": [
        {"field": "UserID", "label": "ID de usuario", "type": "number"},
        {"field": "Nickname", "label": "Usuario", "type": "text"},
        {"field": "Fullname", "label": "Nombre completo", "type": "text"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ],
    "warehouses": [
        {"field": "WarehouseID", "label": "ID de depósito", "type": "number"},
        {"field": "CompanyID", "label": "Compañía", "type": "select", "relationModel": "Company"},
        {"field": "CompanyName", "label": "Compañía (nombre)", "type": "text"},
        {"field": "BranchID", "label": "Sucursal", "type": "select", "relationModel": "Branch", "dependsOn": "CompanyID"},
        {"field": "BranchName", "label": "Sucursal (nombre)", "type": "text"},
        {"field": "Name", "label": "Nombre", "type": "text"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ],
    "orders": [
        {"field": "OrderID", "label": "ID de orden", "type": "number"},
        {"field": "CompanyID", "label": "Compañía", "type": "select", "relationModel": "Company"},
        {"field": "CompanyName", "label": "Compañía (nombre)", "type": "text"},
        {"field": "BranchID", "label": "Sucursal", "type": "select", "relationModel": "Branch", "dependsOn": "CompanyID"},
        {"field": "BranchName", "label": "Sucursal (nombre)", "type": "text"},
        {"field": "Date", "label": "Fecha", "type": "text"},
        {"field": "ClientID", "label": "Cliente", "type": "select", "relationModel": "Client"},
        {"field": "ClientName", "label": "Cliente (nombre)", "type": "text"},
        {"field": "CarID", "label": "Auto", "type": "select", "relationModel": "Car"},
        {"field": "CarLicensePlate", "label": "Patente", "type": "text"},
        {"field": "IsService", "label": "Es servicio", "type": "boolean"},
        {"field": "ServiceTypeID", "label": "Tipo de servicio", "type": "select", "relationModel": "ServiceType"},
        {"field": "Mileage", "label": "Kilometraje", "type": "number"},
        {"field": "NextServiceMileage", "label": "Próximo servicio km", "type": "number"},
        {"field": "Notes", "label": "Notas", "type": "text"},
        {"field": "SaleConditionID", "label": "Condición de venta", "type": "select", "relationModel": "SaleCondition"},
        {"field": "DiscountID", "label": "Descuento", "type": "select", "relationModel": "Discount"},
        {"field": "Subtotal", "label": "Subtotal", "type": "number"},
        {"field": "Total", "label": "Total", "type": "number"},
        {"field": "VAT", "label": "IVA", "type": "number"},
        {"field": "UserID", "label": "Usuario", "type": "select", "relationModel": "User"},
        {"field": "UserName", "label": "Usuario (nombre)", "type": "text"},
        {"field": "StatusID", "label": "Estado", "type": "select", "relationModel": "Sysorderstatus"},
        {"field": "StatusName", "label": "Estado (nombre)", "type": "text"},
        {"field": "PriceListID", "label": "Lista de precios", "type": "select", "relationModel": "PriceList"},
        {"field": "WarehouseID", "label": "Depósito", "type": "select", "relationModel": "Warehouse"}
    ],
    "orderdetails": [
        {"field": "OrderDetailID", "label": "ID de detalle", "type": "number"},
        {"field": "OrderID", "label": "Orden", "type": "select", "relationModel": "Order"},
        {"field": "ItemID", "label": "Ítem", "type": "select", "relationModel": "Item"},
        {"field": "ItemCode", "label": "Código ítem", "type": "text"},
        {"field": "ItemDescription", "label": "Descripción ítem", "type": "text"},
        {"field": "Quantity", "label": "Cantidad", "type": "number"},
        {"field": "UnitPrice", "label": "Precio unitario", "type": "number"},
        {"field": "TotalPrice", "label": "Precio total", "type": "number"},
        {"field": "Discount", "label": "Descuento", "type": "number"}
    ],
    "itemstock": [
        {"field": "ItemStockID", "label": "ID de stock", "type": "number"},
        {"field": "ItemID", "label": "Ítem", "type": "select", "relationModel": "Item"},
        {"field": "ItemCode", "label": "Código ítem", "type": "text"},
        {"field": "ItemDescription", "label": "Descripción ítem", "type": "text"},
        {"field": "CompanyID", "label": "Compañía", "type": "select", "relationModel": "Company"},
        {"field": "BranchID", "label": "Sucursal", "type": "select", "relationModel": "Branch", "dependsOn": "CompanyID"},
        {"field": "WarehouseID", "label": "Depósito", "type": "select", "relationModel": "Warehouse"},
        {"field": "SupplierID", "label": "Proveedor", "type": "select", "relationModel": "Supplier"},
        {"field": "Quantity", "label": "Cantidad", "type": "number"},
        {"field": "MinStockLevel", "label": "Stock mínimo", "type": "number"},
        {"field": "LastModified", "label": "Última modificación", "type": "text"}
    ],
    "pricelistitems": [
        {"field": "PriceListItemID", "label": "ID precio lista", "type": "number"},
        {"field": "PriceListID", "label": "Lista de precios", "type": "select", "relationModel": "PriceList"},
        {"field": "ItemID", "label": "Ítem", "type": "select", "relationModel": "Item"},
        {"field": "ItemCode", "label": "Código ítem", "type": "text"},
        {"field": "ItemDescription", "label": "Descripción ítem", "type": "text"},
        {"field": "Price", "label": "Precio", "type": "number"},
        {"field": "LastModified", "label": "Última modificación", "type": "text"}
    ],

    "documents": [
        {"field": "DocumentID", "label": "ID de documento", "type": "number"},
        {"field": "CompanyID", "label": "Compañía", "type": "select", "relationModel": "Company"},
        {"field": "BranchID", "label": "Sucursal", "type": "select", "relationModel": "Branch", "dependsOn": "CompanyID"},
        {"field": "DocumentTypeID", "label": "Tipo de documento", "type": "select", "relationModel": "SysDocumentType"},
        {"field": "Description", "label": "Descripción", "type": "text"},
        {"field": "DocumentNumber", "label": "Número", "type": "number"},
        {"field": "PointOfSale", "label": "Punto de venta", "type": "number"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"},
        {"field": "Testing", "label": "Prueba", "type": "boolean"},
        {"field": "ShouldAccount", "label": "Contabiliza", "type": "boolean"},
        {"field": "MovesStock", "label": "Mueve stock", "type": "boolean"},
        {"field": "IsFiscal", "label": "Fiscal", "type": "boolean"},
        {"field": "IsElectronic", "label": "Electrónico", "type": "boolean"},
        {"field": "IsManual", "label": "Manual", "type": "boolean"},
        {"field": "IsQuotation", "label": "Cotización", "type": "boolean"},
        {"field": "MaxItems", "label": "Máx ítems", "type": "number"}
    ]
}