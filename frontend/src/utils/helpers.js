// frontend/src/graphql/helpers.js
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
            CompanyID: formData.companyID ? parseInt(formData.companyID) : null,
            BranchID: formData.branchID ? parseInt(formData.branchID) : null,
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
            CompanyID: formData.companyID ? parseInt(formData.companyID) : null,
            BranchID: formData.branchID ? parseInt(formData.branchID) : null,
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
