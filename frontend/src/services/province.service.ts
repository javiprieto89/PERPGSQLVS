import GetProvincesGQL from "~/graphql/queries/GetProvinces.graphql";
import GetProvincesByCountryGQL from "~/graphql/queries/GetProvincesByCountry.graphql";
import { graphqlClient } from "~/graphql/graphql-client";

import type { ProvincesInDb } from "~/graphql/_generated/graphql";

// NUEVA OPERACIÓN AGREGADA
export const provinceOperations = {
  async getAllProvinces(): Promise<ProvincesInDb[]> {
    try {
      const data = await graphqlClient.query(GetProvincesGQL);
      return data.allProvinces || [];
    } catch (error) {
      console.error("Error obteniendo provincias:", error);
      throw error;
    }
  },

  async getProvincesByCountry(countryID: string): Promise<ProvincesInDb[]> {
    try {
      const data = await graphqlClient.query(GetProvincesByCountryGQL, {
        countryID: parseInt(countryID),
      });
      return data.provincesByCountry || [];
    } catch (error) {
      console.error("Error obteniendo provincias por país:", error);
      throw error;
    }
  },
};
