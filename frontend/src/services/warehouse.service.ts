import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  WarehousesCreate,
  WarehousesInDb,
  WarehousesUpdate,
} from "~/graphql/_generated/graphql";

export const warehouseOperations = {
  async getAllWarehouses(): Promise<WarehousesInDb[]> {
    const data = await graphqlClient.query(QUERIES.GET_ALL_WAREHOUSES);
    return data.allWarehouses || [];
  },
  async getWarehouseById(id: string): Promise<WarehousesInDb> {
    const data = await graphqlClient.query(QUERIES.GET_WAREHOUSE_BY_ID, { id });
    return data.warehousesById;
  },
  async createWarehouse(input: WarehousesCreate): Promise<WarehousesInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.CREATE_WAREHOUSE, {
      input,
    });
    return data.createWarehouse;
  },
  async updateWarehouse(
    id: string,
    input: WarehousesUpdate
  ): Promise<WarehousesInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.UPDATE_WAREHOUSE, {
      warehouseID: id,
      input,
    });
    return data.updateWarehouse;
  },
  async deleteWarehouse(id: string): Promise<WarehousesInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.DELETE_WAREHOUSE, {
      warehouseID: id,
    });
    return data.deleteWarehouse;
  },
};
