import GetAllDiscountsGQL from "~/graphql/queries/GetAllDiscounts.graphql";
import GetDiscountByIdGQL from "~/graphql/queries/GetDiscountById.graphql";
import CreateDiscountGQL from "~/graphql/mutations/CreateDiscount.graphql";
import UpdateDiscountGQL from "~/graphql/mutations/UpdateDiscount.graphql";
import DeleteDiscountGQL from "~/graphql/mutations/DeleteDiscount.graphql";
import { graphqlClient } from "~/graphql/graphql-client";

import type {
  DiscountsCreate,
  DiscountsInDb,
  DiscountsUpdate,
} from "~/graphql/_generated/graphql";

export const discountOperations = {
  async getAllDiscounts(): Promise<DiscountsInDb[]> {
    try {
      const data = await graphqlClient.query(GetAllDiscountsGQL);
      return data.allDiscounts || [];
    } catch (error) {
      console.error("Error obteniendo descuentos:", error);
      throw error;
    }
  },

  async getDiscountById(id: string): Promise<DiscountsInDb> {
    try {
      const data = await graphqlClient.query(GetDiscountByIdGQL, {
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
      const data = await graphqlClient.mutation(CreateDiscountGQL, {
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
      const data = await graphqlClient.mutation(UpdateDiscountGQL, {
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
      const data = await graphqlClient.mutation(DeleteDiscountGQL, {
        id,
      });
      return data.deleteDiscount;
    } catch (error) {
      console.error("Error eliminando descuento:", error);
      throw error;
    }
  },
};
