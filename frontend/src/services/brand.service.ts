import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  BrandsCreate,
  BrandsInDb,
  BrandsUpdate,
} from "~/graphql/_generated/graphql";

// ===== FUNCIONES DE MARCAS =====
export const brandOperations = {
  async getAllBrands(): Promise<BrandsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_BRANDS);
      return data.allBrands || [];
    } catch (error) {
      console.error("Error obteniendo marcas:", error);
      throw error;
    }
  },

  async getBrandById(id: string): Promise<BrandsInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_BRAND_BY_ID, { id });
      return data.brandsById;
    } catch (error) {
      console.error("Error obteniendo marca:", error);
      throw error;
    }
  },

  async getBrandsByCompany(companyID: string): Promise<BrandsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_BRANDS_BY_COMPANY, {
        companyID: parseInt(companyID),
      });
      return data.brandsByCompany || [];
    } catch (error) {
      console.error("Error obteniendo marcas por compañía:", error);
      throw error;
    }
  },

  async createBrand(brandData: BrandsCreate): Promise<BrandsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_BRAND, {
        input: brandData,
      });
      return data.createBrand;
    } catch (error) {
      console.error("Error creando marca:", error);
      throw error;
    }
  },

  async updateBrand(id: string, brandData: BrandsUpdate): Promise<BrandsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_BRAND, {
        brandID: id,
        input: brandData,
      });
      return data.updateBrand;
    } catch (error) {
      console.error("Error actualizando marca:", error);
      throw error;
    }
  },

  async deleteBrand(id: string): Promise<BrandsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_BRAND, {
        brandID: id,
      });
      return data.deleteBrand;
    } catch (error) {
      console.error("Error eliminando marca:", error);
      throw error;
    }
  },
};
