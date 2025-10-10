import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  SaleConditionsCreate,
  SaleConditionsInDb,
  SaleConditionsUpdate,
} from "~/graphql/_generated/graphql";

export const saleConditionOperations = {
  async getAllSaleConditions(): Promise<SaleConditionsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_SALECONDITIONS);
      return data.allSaleconditions || [];
    } catch (error) {
      console.error("Error obteniendo condiciones de venta:", error);
      throw error;
    }
  },

  async getSaleConditionById(id: string): Promise<SaleConditionsInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_SALECONDITION_BY_ID, {
        id,
      });
      return data.saleconditionsById;
    } catch (error) {
      console.error("Error obteniendo condición de venta:", error);
      throw error;
    }
  },

  async createSaleCondition(
    scData: SaleConditionsCreate
  ): Promise<SaleConditionsInDb> {
    try {
      const data = await graphqlClient.mutation(
        MUTATIONS.CREATE_SALECONDITION,
        {
          input: scData,
        }
      );
      return data.createSalecondition;
    } catch (error) {
      console.error("Error creando condición de venta:", error);
      throw error;
    }
  },

  async updateSaleCondition(
    id: string,
    scData: SaleConditionsUpdate
  ): Promise<SaleConditionsInDb> {
    try {
      const data = await graphqlClient.mutation(
        MUTATIONS.UPDATE_SALECONDITION,
        {
          saleConditionID: id,
          input: scData,
        }
      );
      return data.updateSalecondition;
    } catch (error) {
      console.error("Error actualizando condición de venta:", error);
      throw error;
    }
  },

  async deleteSaleCondition(id: string): Promise<SaleConditionsInDb> {
    try {
      const data = await graphqlClient.mutation(
        MUTATIONS.DELETE_SALECONDITION,
        {
          saleConditionID: id,
        }
      );
      return data.deleteSalecondition;
    } catch (error) {
      console.error("Error eliminando condición de venta:", error);
      throw error;
    }
  },
};
