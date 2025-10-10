import { graphqlClient } from "~/graphql/graphql-client";
import { QUERIES } from "~/graphql/queries/queries.js";

import type { ProvincesInDb } from "~/graphql/_generated/graphql";

// NUEVA OPERACIÓN AGREGADA
export const provinceOperations = {
  async getAllProvinces(): Promise<ProvincesInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_PROVINCES);
      return data.allProvinces || [];
    } catch (error) {
      console.error("Error obteniendo provincias:", error);
      throw error;
    }
  },

  async getProvincesByCountry(countryID: string): Promise<ProvincesInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_PROVINCES_BY_COUNTRY, {
        countryID: parseInt(countryID),
      });
      return data.provincesByCountry || [];
    } catch (error) {
      console.error("Error obteniendo provincias por país:", error);
      throw error;
    }
  },
};
