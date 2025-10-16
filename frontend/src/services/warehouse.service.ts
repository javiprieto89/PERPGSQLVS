import GetWarehousesGQL from "~/graphql/queries/GetWarehouses.graphql";
import GetWarehouseByIdGQL from "~/graphql/queries/GetWarehouseById.graphql";
import CreateWarehouseGQL from "~/graphql/mutations/CreateWarehouse.graphql";
import UpdateWarehouseGQL from "~/graphql/mutations/UpdateWarehouse.graphql";
import DeleteWarehouseGQL from "~/graphql/mutations/DeleteWarehouse.graphql";
import { graphqlClient } from "~/graphql/graphql-client";

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
      GetWarehousesGQL
    );
    return data.allWarehouses || [];
  },
  async getWarehouseById(id: string) {
    const data = await graphqlClient.query<GetWarehouseByIdQuery>(
      GetWarehouseByIdGQL,
      { id }
    );
    return data.warehousesById;
  },
  async createWarehouse(input: WarehousesCreate) {
    const data = await graphqlClient.mutation<CreateWarehouseMutation>(
      CreateWarehouseGQL,
      {
        input,
      }
    );
    return data.createWarehouse;
  },
  async updateWarehouse(id: string, input: WarehousesUpdate) {
    const data = await graphqlClient.mutation<UpdateWarehouseMutation>(
      UpdateWarehouseGQL,
      {
        warehouseID: id,
        input,
      }
    );
    return data.updateWarehouse;
  },
  async deleteWarehouse(id: string) {
    const data = await graphqlClient.mutation<DeleteWarehouseMutation>(
      DeleteWarehouseGQL,
      {
        warehouseID: id,
      }
    );
    return data.deleteWarehouse;
  },
};
