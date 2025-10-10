import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  CarsInDb,
  ClientsInDb,
  DiscountsInDb,
  OrdersCreate,
  OrdersInDb,
  OrdersUpdate,
  PriceListsInDb,
  SaleConditionsInDb,
  ServiceTypesInDb,
  SysOrderStatusInDb,
  TempOrderDetailsCreate,
  TempOrderDetailsInDb,
  TempOrderDetailsUpdate,
  WarehousesInDb,
} from "~/graphql/_generated/graphql";

export const sysOrderStatusOperations = {
  async getAllSysorderstatus(): Promise<SysOrderStatusInDb[]> {
    const data = await graphqlClient.query(QUERIES.GET_ALL_SYSORDERSTATUS);
    return data.allSysorderstatus || [];
  },
};

// ===== FUNCIONES DE ÓRDENES - NUEVAS Y COMPLETAS =====
export const orderOperations = {
  async getAllOrders(): Promise<OrdersInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_ORDERS);
      return data.allOrders || [];
    } catch (error) {
      console.error("Error obteniendo órdenes:", error);
      throw error;
    }
  },

  async getOrderById(id: string): Promise<OrdersInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ORDER_BY_ID, { id });
      return data.ordersById;
    } catch (error) {
      console.error("Error obteniendo orden:", error);
      throw error;
    }
  },

  async createOrder(orderData: OrdersCreate): Promise<OrdersInDb> {
    try {
      // Validar datos requeridos
      const errors = orderHelpers.validateOrderData(orderData);
      if (errors.length > 0) {
        throw new Error(`Errores de validación: ${errors.join(", ")}`);
      }

      // Preparar datos
      const preparedData = orderHelpers.prepareOrderData(orderData);

      const data = await graphqlClient.mutation(MUTATIONS.CREATE_ORDER, {
        input: preparedData,
      });

      return data.createOrder;
    } catch (error) {
      console.error("Error creando orden:", error);
      throw error;
    }
  },

  async updateOrder(id: string, orderData: OrdersUpdate): Promise<OrdersInDb> {
    try {
      // Preparar datos para actualización (solo campos no nulos)
      const preparedData = {};

      if (orderData.CompanyID)
        preparedData.CompanyID = parseInt(orderData.CompanyID);
      if (orderData.BranchID)
        preparedData.BranchID = parseInt(orderData.BranchID);
      if (orderData.Date_) preparedData.Date_ = new Date(orderData.Date_);
      if (orderData.ClientID)
        preparedData.ClientID = parseInt(orderData.ClientID);
      if (orderData.CarID) preparedData.CarID = parseInt(orderData.CarID);
      if (orderData.IsService !== undefined)
        preparedData.IsService = Boolean(orderData.IsService);
      if (orderData.ServiceTypeID)
        preparedData.ServiceTypeID = parseInt(orderData.ServiceTypeID);
      if (orderData.Mileage) preparedData.Mileage = parseInt(orderData.Mileage);
      if (orderData.NextServiceMileage)
        preparedData.NextServiceMileage = parseInt(
          orderData.NextServiceMileage
        );
      if (orderData.Notes !== undefined)
        preparedData.Notes = orderData.Notes?.trim() || null;
      if (orderData.SaleConditionID)
        preparedData.SaleConditionID = parseInt(orderData.SaleConditionID);
      if (orderData.DiscountID)
        preparedData.DiscountID = parseInt(orderData.DiscountID);
      if (orderData.Subtotal !== undefined)
        preparedData.Subtotal = parseFloat(orderData.Subtotal);
      if (orderData.Total !== undefined)
        preparedData.Total = parseFloat(orderData.Total);
      if (orderData.VAT !== undefined)
        preparedData.VAT = parseFloat(orderData.VAT);
      if (orderData.UserID) preparedData.UserID = parseInt(orderData.UserID);
      if (orderData.DocumentID)
        preparedData.DocumentID = parseInt(orderData.DocumentID);
      if (orderData.OrderStatusID)
        preparedData.OrderStatusID = parseInt(orderData.OrderStatusID);
      if (orderData.PriceListID)
        preparedData.PriceListID = parseInt(orderData.PriceListID);
      if (orderData.WarehouseID)
        preparedData.WarehouseID = parseInt(orderData.WarehouseID);

      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ORDER, {
        orderID: id,
        input: preparedData,
      });

      return data.updateOrder;
    } catch (error) {
      console.error("Error actualizando orden:", error);
      throw error;
    }
  },

  async deleteOrder(id: string): Promise<OrdersInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_ORDER, {
        orderID: id,
      });

      return data.deleteOrder;
    } catch (error) {
      console.error("Error eliminando orden:", error);
      throw error;
    }
  },

  // Función auxiliar para obtener datos del formulario de órdenes
  async getOrderFormData(): Promise<{
    clients: ClientsInDb[];
    cars: CarsInDb[];
    saleConditions: SaleConditionsInDb[];
    discounts: DiscountsInDb[];
    priceLists: PriceListsInDb[];
    warehouses: WarehousesInDb[];
    serviceTypes: ServiceTypesInDb[];
    orderStatus: SysOrderStatusInDb[];
  }> {
    try {
      const [
        clients,
        cars,
        saleConditions,
        discounts,
        priceLists,
        warehouses,
        serviceTypes,
        orderStatus,
      ] = await Promise.all([
        clientOperations.getAllClients(),
        carOperations.getAllCars(),
        saleConditionOperations.getAllSaleConditions(),
        discountOperations.getAllDiscounts(),
        pricelistOperations.getAllPricelists(),
        warehouseOperations.getAllWarehouses(),
        serviceTypeOperations.getAllServicetypes(),
        sysOrderStatusOperations.getAllSysorderstatus(),
      ]);

      return {
        clients: clients.filter((c) => c.IsActive),
        cars,
        saleConditions: saleConditions.filter((sc) => sc.IsActive),
        discounts,
        priceLists: priceLists.filter((pl) => pl.IsActive),
        warehouses,
        serviceTypes,
        orderStatus,
      };
    } catch (error) {
      console.error("Error obteniendo datos del formulario de órdenes:", error);
      throw error;
    }
  },
};

// ===== FUNCIONES PARA ITEMS TEMPORALES =====
export const tempOrderOperations = {
  async createTempItem(
    data: TempOrderDetailsCreate
  ): Promise<TempOrderDetailsInDb> {
    try {
      const result = await graphqlClient.mutation(
        MUTATIONS.CREATE_TEMPORDERDETAIL,
        { input: data }
      );
      return result.createTemporderdetail;
    } catch (error) {
      console.error("Error creando item temporal:", error);
      throw error;
    }
  },

  async updateTempItem(
    sessionID: string,
    itemID: string,
    data: TempOrderDetailsUpdate
  ): Promise<TempOrderDetailsInDb> {
    try {
      const result = await graphqlClient.mutation(
        MUTATIONS.UPDATE_TEMPORDERDETAIL,
        { sessionID, itemID, input: data }
      );
      return result.updateTemporderdetail;
    } catch (error) {
      console.error("Error actualizando item temporal:", error);
      throw error;
    }
  },

  async deleteTempItem(sessionID: string, itemID: string): Promise<boolean> {
    try {
      await graphqlClient.mutation(MUTATIONS.DELETE_TEMPORDERDETAIL, {
        sessionID,
        itemID,
      });
      return true;
    } catch (error) {
      console.error("Error eliminando item temporal:", error);
      throw error;
    }
  },

  async clearTempSession(
    sessionID: string,
    useKeepAlive: boolean = false
  ): Promise<boolean> {
    try {
      await graphqlClient.mutation(
        MUTATIONS.CLEAR_TEMP_SESSION,
        { sessionID },
        useKeepAlive ? { keepalive: true } : {}
      );
      return true;
    } catch (error) {
      console.error("Error limpiando sesión temporal:", error);
      throw error;
    }
  },

  async loadOrderForEditing(
    orderID: string,
    userID: string,
    companyID: string,
    branchID: string
  ): Promise<any> {
    try {
      const result = await graphqlClient.mutation(
        MUTATIONS.LOAD_ORDER_FOR_EDITING,
        { orderID, userID, companyID, branchID }
      );
      return result.loadOrderForEditing;
    } catch (error) {
      console.error("Error cargando orden para edición:", error);
      throw error;
    }
  },

  async getTempItems(sessionID: string): Promise<TempOrderDetailsInDb[]> {
    try {
      const result = await graphqlClient.query(
        MUTATIONS.GET_TEMP_ITEMS_BY_SESSION,
        { sessionID }
      );
      return result.temporderdetailsBySession || [];
    } catch (error) {
      console.error("Error obteniendo items temporales:", error);
      throw error;
    }
  },

  async getTempItemsByOrder(orderID: string): Promise<TempOrderDetailsInDb[]> {
    try {
      const result = await graphqlClient.query(
        MUTATIONS.GET_TEMP_ITEMS_BY_ORDER,
        { orderID }
      );
      return result.temporderdetailsByOrder || [];
    } catch (error) {
      console.error("Error obteniendo items temporales:", error);
      throw error;
    }
  },
};
