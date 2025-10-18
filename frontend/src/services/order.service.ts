import { graphqlClient } from "~/graphql/graphql-client";

import {
  CreateOrderDocument,
  DeleteOrderDocument,
  GetAllOrderDetailsDocument,
  GetAllOrdersDocument,
  GetOrderByIdDocument,
  UpdateOrderDocument,
  type CreateOrderMutation,
  type DeleteOrderMutation,
  type GetAllOrderDetailsQuery,
  type GetAllOrdersQuery,
  type GetOrderByIdQuery,
  type OrdersCreate,
  type OrdersUpdate,
  type UpdateOrderMutation,
} from "~/graphql/_generated/graphql";
import { orderHelpers } from "~/utils/helpers";

// Import other service operations
import { carOperations } from "./car.service";
import { clientOperations } from "./client.service";
import { discountOperations } from "./discount.service";
import { pricelistOperations } from "./price-list.service";
import { saleConditionOperations } from "./sale.service";
import { serviceTypeOperations } from "./service-type.service";
import { warehouseOperations } from "./warehouse.service";

// ===== UTILITY FUNCTIONS =====

/**
 * Sanitize and prepare order payload for GraphQL mutations
 * - Removes undefined/null values
 * - Converts types appropriately
 * - Trims strings
 * - Only includes allowed fields
 *
 * @param data - Raw order data (Create or Update)
 * @returns Sanitized payload ready for GraphQL
 */
function sanitizeOrderPayload<T extends OrdersCreate | OrdersUpdate>(
  data: T
): Partial<T> {
  const allowedFields: (keyof OrdersCreate | keyof OrdersUpdate)[] = [
    "CompanyID",
    "BranchID",
    "OrderDate",
    "ClientID",
    "CarID",
    "IsService",
    "ServiceTypeID",
    "Mileage",
    "NextServiceMileage",
    "Notes",
    "SaleConditionID",
    "DiscountID",
    "Subtotal",
    "Total",
    "TotalTaxAmount",
    "UserID",
    "DocumentID",
    "OrderStatusID",
    "PriceListID",
    "WarehouseID",
    "Items", // For create operations
  ];

  const payload: Partial<T> = {};

  for (const field of allowedFields) {
    const value = data[field as keyof T];

    // Skip undefined values
    if (value === undefined) continue;

    // Handle each field type appropriately
    switch (field) {
      // Integer fields
      case "CompanyID":
      case "BranchID":
      case "ClientID":
      case "CarID":
      case "ServiceTypeID":
      case "Mileage":
      case "NextServiceMileage":
      case "SaleConditionID":
      case "DiscountID":
      case "UserID":
      case "DocumentID":
      case "OrderStatusID":
      case "PriceListID":
      case "WarehouseID":
        if (value !== null) {
          payload[field as keyof T] = (
            typeof value === "string" ? parseInt(value, 10) : Number(value)
          ) as T[keyof T];
        } else {
          payload[field as keyof T] = null as T[keyof T];
        }
        break;

      // Float fields
      case "Subtotal":
      case "Total":
      case "TotalTaxAmount":
        if (value !== null) {
          payload[field as keyof T] = (
            typeof value === "string" ? parseFloat(value) : Number(value)
          ) as T[keyof T];
        } else {
          payload[field as keyof T] = null as T[keyof T];
        }
        break;

      // Date field
      case "OrderDate":
        if (value !== null) {
          payload[field as keyof T] = (
            value instanceof Date ? value : new Date(value as string)
          ) as T[keyof T];
        } else {
          payload[field as keyof T] = null as T[keyof T];
        }
        break;

      // Boolean field
      case "IsService":
        payload[field as keyof T] = Boolean(value) as T[keyof T];
        break;

      // String field (Notes)
      case "Notes":
        if (value !== null && typeof value === "string") {
          const trimmed = value.trim();
          payload[field as keyof T] = (trimmed || null) as T[keyof T];
        } else {
          payload[field as keyof T] = null as T[keyof T];
        }
        break;

      // Array field (Items for create)
      case "Items":
        payload[field as keyof T] = (
          Array.isArray(value) ? value : []
        ) as T[keyof T];
        break;

      default:
        payload[field as keyof T] = value as T[keyof T];
    }
  }

  return payload;
}

// ===== ORDER STATUS OPERATIONS =====
export const sysOrderStatusOperations = {
  // allOrderdetails / getAllSysorderstatus
  async getAllSysorderstatus() {
    const data = await graphqlClient.query<GetAllOrderDetailsQuery>(
      GetAllOrderDetailsDocument
    );
    console.log(
      "sysOrderStatusOperations.getAllSysorderstatus is not yet implemented."
    );
    return data.allOrderdetails || [];
  },
};

// ===== FUNCIONES DE ÓRDENES - NUEVAS Y COMPLETAS =====
export const orderOperations = {
  async getAllOrders() {
    try {
      const data = await graphqlClient.query<GetAllOrdersQuery>(
        GetAllOrdersDocument
      );
      return data.allOrders || [];
    } catch (error) {
      console.error("Error obteniendo órdenes:", error);
      throw error;
    }
  },

  async getOrderById(id: string) {
    try {
      const data = await graphqlClient.query<GetOrderByIdQuery>(
        GetOrderByIdDocument,
        { id }
      );
      return data.ordersById;
    } catch (error) {
      console.error("Error obteniendo orden:", error);
      throw error;
    }
  },

  async createOrder(orderData: OrdersCreate) {
    try {
      // Validate required data
      const errors = orderHelpers.validateOrderData(orderData);
      if (errors.length > 0) {
        throw new Error(`Errores de validación: ${errors.join(", ")}`);
      }

      // Sanitize and prepare data
      const sanitizedData = sanitizeOrderPayload(orderData);

      const data = await graphqlClient.mutation<CreateOrderMutation>(
        CreateOrderDocument,
        {
          input: sanitizedData,
        }
      );

      return data.createOrder;
    } catch (error) {
      console.error("Error creando orden:", error);
      throw error;
    }
  },

  async updateOrder(id: string, orderData: OrdersUpdate) {
    try {
      // Sanitize and prepare data for update
      const sanitizedData = sanitizeOrderPayload(orderData);

      // Optional: validate before sending
      const errors = orderHelpers.validateOrderData(sanitizedData);
      if (errors.length > 0) {
        console.warn(`Order update validation warnings: ${errors.join(", ")}`);
      }

      const data = await graphqlClient.mutation<UpdateOrderMutation>(
        UpdateOrderDocument,
        {
          orderID: id,
          input: sanitizedData,
        }
      );

      return data.updateOrder;
    } catch (error) {
      console.error("Error actualizando orden:", error);
      throw error;
    }
  },

  async deleteOrder(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteOrderMutation>(
        DeleteOrderDocument,
        {
          orderID: id,
        }
      );

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
        orderStatus,
      ] = await Promise.all([
        clientOperations.getAllClients(),
        carOperations.getAllCars(),
        saleConditionOperations.getAllSaleConditions(),
        discountOperations.getAllDiscounts(),
        pricelistOperations.getAllPriceLists(),
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
  async createTempItem(data: []): Promise<null> {
    try {
      // const result = await graphqlClient.mutation<CreateTempOrderDetailMutation>(
      //   MUTATIONS.CREATE_TEMPORDERDETAIL,
      //   { input: data }
      // );
      // return result.createTemporderdetail;
      console.log("tempOrderOperations.createTempItem is not yet implemented.");
      return null;
    } catch (error) {
      console.error("Error creando item temporal:", error);
      throw error;
    }
  },

  async updateTempItem(
    sessionID: string,
    itemID: string,
    data: { [key: string]: any }
  ): Promise<void> {
    try {
      // const result = await graphqlClient.mutation(
      //   MUTATIONS.UPOrderDateTEMPORDERDETAIL,
      //   { sessionID, itemID, input: data }
      // );
      // return result.updateTemporderdetail;
      console.log("tempOrderOperations.updateTempItem is not yet implemented.");
    } catch (error) {
      console.error("Error actualizando item temporal:", error);
      throw error;
    }
  },

  async deleteTempItem(sessionID: string, itemID: string): Promise<boolean> {
    try {
      // await graphqlClient.mutation(MUTATIONS.DELETE_TEMPORDERDETAIL, {
      //   sessionID,
      //   itemID,
      // });
      // return true;
      console.log("tempOrderOperations.deleteTempItem is not yet implemented.");
      return false;
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
      // await graphqlClient.mutation(
      //   MUTATIONS.CLEAR_TEMP_SESSION,
      //   { sessionID },
      //   useKeepAlive ? { keepalive: true } : {}
      // );
      // return true;
      console.log(
        "tempOrderOperations.clearTempSession is not yet implemented."
      );
      return false;
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
  ): Promise<void> {
    try {
      // const result = await graphqlClient.mutation<LoadOrderForEditingMutation>(
      //   MUTATIONS.LOAD_ORDER_FOR_EDITING,
      //   { orderID, userID, companyID, branchID }
      // );
      // return result.loadOrderForEditing;
      console.log(
        "tempOrderOperations.loadOrderForEditing is not yet implemented."
      );
      return;
    } catch (error) {
      console.error("Error cargando orden para edición:", error);
      throw error;
    }
  },

  async getTempItems(sessionID: string): Promise<void> {
    try {
      // const result = await graphqlClient.query(
      //   MUTATIONS.GET_TEMP_ITEMS_BY_SESSION,
      //   { sessionID }
      // );
      // return result.temporderdetailsBySession || [];
      console.log("tempOrderOperations.getTempItems is not yet implemented.");
      return;
    } catch (error) {
      console.error("Error obteniendo items temporales:", error);
      throw error;
    }
  },

  async getTempItemsByOrder(orderID: string): Promise<void> {
    try {
      // const result = await graphqlClient.query(
      //   MUTATIONS.GET_TEMP_ITEMS_BY_ORDER,
      //   { orderID }
      // );
      // return result.temporderdetailsByOrder || [];
      console.log(
        "tempOrderOperations.getTempItemsByOrder is not yet implemented."
      );
      return;
    } catch (error) {
      console.error("Error obteniendo items temporales:", error);
      throw error;
    }
  },
};
