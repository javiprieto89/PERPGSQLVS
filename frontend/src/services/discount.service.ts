import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  DiscountsCreate,
  DiscountsInDb,
  DiscountsUpdate,
} from "~/graphql/_generated/graphql";

export const discountOperations = {
  async getAllDiscounts(): Promise<DiscountsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_DISCOUNTS);
      return data.allDiscounts || [];
    } catch (error) {
      console.error("Error obteniendo descuentos:", error);
      throw error;
    }
  },

  async getDiscountById(id: string): Promise<DiscountsInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_DISCOUNT_BY_ID, {
        id,
      });
      return data.discountsById;
    } catch (error) {
      console.error("Error obteniendo descuento:", error);
      throw error;
    }
  },

  async createDiscount(discountData: DiscountsCreate): Promise<DiscountsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_DISCOUNT, {
        input: discountData,
      });
      return data.createDiscount;
    } catch (error) {
      console.error("Error creando descuento:", error);
      throw error;
    }
  },

  async updateDiscount(
    id: string,
    discountData: DiscountsUpdate
  ): Promise<DiscountsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_DISCOUNT, {
        id,
        input: discountData,
      });
      return data.updateDiscount;
    } catch (error) {
      console.error("Error actualizando descuento:", error);
      throw error;
    }
  },

  async deleteDiscount(id: string): Promise<DiscountsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_DISCOUNT, {
        id,
      });
      return data.deleteDiscount;
    } catch (error) {
      console.error("Error eliminando descuento:", error);
      throw error;
    }
  },
};
