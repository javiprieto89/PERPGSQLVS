# app/graphql/utils/filter_schemas.py

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
        {"field": "BranchID", "label": "Sucursal", "type": "select", "relationModel": "Branch"},
        {"field": "Code", "label": "Código", "type": "text"},
        {"field": "Description", "label": "Descripción", "type": "text"},
        {"field": "BrandID", "label": "Marca", "type": "select", "relationModel": "Brand"},
        {"field": "ItemCategoryID", "label": "Categoría", "type": "select", "relationModel": "ItemCategory"},
        {"field": "ItemSubcategoryID", "label": "Subcategoría", "type": "select", "relationModel": "ItemSubcategory", "dependsOn": "ItemCategoryID"},
        {"field": "SupplierID", "label": "Proveedor", "type": "select", "relationModel": "Supplier"},
        {"field": "ControlStock", "label": "Control de stock", "type": "boolean"},
        {"field": "ReplenishmentStock", "label": "Stock de reposición", "type": "number"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"},
        {"field": "OEM", "label": "OEM", "type": "text"},
        {"field": "WarehouseID", "label": "Depósito", "type": "select", "relationModel": "Warehouse"},
        {"field": "LastModified", "label": "Última modificación", "type": "text"},
    ],
    "brands": [
        {"field": "BrandID", "label": "ID de marca", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ],
    "carbrands": [
        {"field": "CarBrandID", "label": "ID de marca de auto", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"}
    ],
    "itemcategories": [
        {"field": "ItemCategoryID", "label": "ID de categoría", "type": "number"},
        {"field": "CategoryName", "label": "Nombre", "type": "text"}
    ],
    "countries": [
        {"field": "CountryID", "label": "ID de país", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"}
    ],
    "provinces": [
        {"field": "ProvinceID", "label": "ID de provincia", "type": "number"},
        {"field": "CountryID", "label": "País", "type": "select", "relationModel": "Country"},
        {"field": "Name", "label": "Nombre", "type": "text"}
    ],
    "pricelists": [
        {"field": "PriceListID", "label": "ID de lista de precios", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"},
        {"field": "Description", "label": "Descripción", "type": "text"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ],
    "vendors": [
        {"field": "VendorID", "label": "ID de vendedor", "type": "number"},
        {"field": "VendorName", "label": "Nombre del vendedor", "type": "text"},
        {"field": "Commission", "label": "Comisión", "type": "number"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ],
    "ordertypes": [
        {"field": "OrderTypeID", "label": "ID de tipo de orden", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ],
    "documenttypes": [
        {"field": "DocumentTypeID", "label": "ID de tipo de documento", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"}
    ],
    "userroles": [
        {"field": "RoleID", "label": "ID de rol", "type": "number"},
        {"field": "Name", "label": "Nombre", "type": "text"}
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
        {"field": "BranchID", "label": "Sucursal", "type": "select", "relationModel": "Branch"},
        {"field": "Name", "label": "Nombre", "type": "text"},
        {"field": "IsActive", "label": "Activo", "type": "boolean"}
    ]
    # ...agregá más entidades según vayas necesitando...
}
