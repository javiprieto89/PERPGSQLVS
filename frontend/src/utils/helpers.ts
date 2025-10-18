// Validar email
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== FUNCIONES AUXILIARES DE ÓRDENES - NUEVAS =====
export const orderHelpers = {
  validateOrderData(orderData: Record<string, any>) {
    const errors = [];

    // Campos requeridos
    if (!orderData.CompanyID) errors.push("ID de compañía es requerido");
    if (!orderData.BranchID) errors.push("ID de sucursal es requerido");
    if (!orderData.Date_) errors.push("Fecha es requerida");
    if (!orderData.ClientID) errors.push("Cliente es requerido");
    if (!orderData.SaleConditionID)
      errors.push("Condición de venta es requerida");
    if (!orderData.DiscountID) errors.push("Descuento es requerido");
    if (orderData.Subtotal === undefined || orderData.Subtotal === null)
      errors.push("Subtotal es requerido");
    if (orderData.Total === undefined || orderData.Total === null)
      errors.push("Total es requerido");
    if (
      orderData.TotalTaxAmount === undefined ||
      orderData.TotalTaxAmount === null
    )
      errors.push("IVA es requerido");
    if (!orderData.UserID) errors.push("Usuario es requerido");
    if (!orderData.DocumentID) errors.push("ID de documento es requerido");
    if (!orderData.PriceListID) errors.push("Lista de precios es requerida");
    if (!orderData.OrderStatusID) errors.push("Estado de orden es requerido");
    if (!orderData.WarehouseID) errors.push("Depósito es requerido");

    // Validaciones de tipo
    if (orderData.Subtotal && orderData.Subtotal < 0)
      errors.push("El subtotal no puede ser negativo");
    if (orderData.Total && orderData.Total < 0)
      errors.push("El total no puede ser negativo");
    if (orderData.TotalTaxAmount && orderData.TotalTaxAmount < 0)
      errors.push("El IVA no puede ser negativo");
    if (orderData.Mileage && orderData.Mileage < 0)
      errors.push("El kilometraje no puede ser negativo");

    return errors;
  },

  formatOrderForDisplay(order: Record<string, any>) {
    return {
      ...order,
      FormattedDate: order.Date_
        ? new Date(order.Date_).toLocaleDateString()
        : "",
      FormattedTotal: order.Total ? `${order.Total.toFixed(2)}` : "$0.00",
      ServiceText: order.IsService ? "Sí" : "No",
      StatusDisplay:
        order.OrderStatusID === 1
          ? "Pendiente"
          : order.OrderStatusID === 2
          ? "En proceso"
          : order.OrderStatusID === 3
          ? "Completada"
          : "Desconocido",
    };
  },

  prepareOrderData(formData: Record<string, any>) {
    return {
      CompanyID: parseInt(formData.CompanyID),
      BranchID: parseInt(formData.BranchID),
      Date_: new Date(formData.Date_),
      ClientID: parseInt(formData.ClientID),
      SaleConditionID: parseInt(formData.SaleConditionID),
      DiscountID: parseInt(formData.DiscountID),
      Subtotal: parseFloat(formData.Subtotal),
      Total: parseFloat(formData.Total),
      TotalTaxAmount: parseFloat(formData.TotalTaxAmount),
      UserID: parseInt(formData.UserID),
      DocumentID: parseInt(formData.DocumentID),
      PriceListID: parseInt(formData.PriceListID),
      OrderStatusID: parseInt(formData.OrderStatusID),
      WarehouseID: parseInt(formData.WarehouseID),

      // Campos opcionales
      CarID: formData.CarID ? parseInt(formData.CarID) : null,
      IsService: Boolean(formData.IsService),
      ServiceTypeID: formData.ServiceTypeID
        ? parseInt(formData.ServiceTypeID)
        : null,
      Mileage: formData.Mileage ? parseInt(formData.Mileage) : null,
      NextServiceMileage: formData.NextServiceMileage
        ? parseInt(formData.NextServiceMileage)
        : null,
      Notes: formData.Notes?.trim() || null,

      // Items de la orden
      Items: formData.Items || [],
    };
  },
};
