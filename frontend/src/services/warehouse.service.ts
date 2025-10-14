import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  CreateWarehouseMutation,
  DeleteWarehouseMutation,
  GetWarehouseByIdQuery,
  GetWarehousesQuery,
  UpdateWarehouseMutation,
  WarehousesCreate,
  WarehousesUpdate,
} from "~/graphql/_generated/graphql";

export const warehouseOperations = {
  async getAllWarehouses() {
    const data = await graphqlClient.query<GetWarehousesQuery>(
      QUERIES.GET_ALL_WAREHOUSES
    );
    return data.allWarehouses || [];
  },
  async getWarehouseById(id: string) {
    const data = await graphqlClient.query<GetWarehouseByIdQuery>(
      QUERIES.GET_WAREHOUSE_BY_ID,
      { id }
    );
    return data.warehousesById;
  },
  async createWarehouse(input: WarehousesCreate) {
    const data = await graphqlClient.mutation<CreateWarehouseMutation>(
      MUTATIONS.CREATE_WAREHOUSE,
      {
        input,
      }
    );
    return data.createWarehouse;
  },
  async updateWarehouse(id: string, input: WarehousesUpdate) {
    const data = await graphqlClient.mutation<UpdateWarehouseMutation>(
      MUTATIONS.UPDATE_WAREHOUSE,
      {
        warehouseID: id,
        input,
      }
    );
    return data.updateWarehouse;
  },
  async deleteWarehouse(id: string) {
    const data = await graphqlClient.mutation<DeleteWarehouseMutation>(
      MUTATIONS.DELETE_WAREHOUSE,
      {
        warehouseID: id,
      }
    );
    return data.deleteWarehouse;
  },
};
