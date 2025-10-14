import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  BrandsCreate,
  BrandsInDb,
  BrandsUpdate,
  CreateBrand2Mutation,
  DeleteBrandMutation,
  GetAllBrandsQuery,
  GetBrandByIdQuery,
  GetBrandsByCompanyQuery,
  UpdateBrandMutation,
} from "~/graphql/_generated/graphql";

// ===== FUNCIONES DE MARCAS =====
export const brandOperations = {
  async getAllBrands(): Promise<BrandsInDb[]> {
    try {
      const data = await graphqlClient.query<GetAllBrandsQuery>(
        QUERIES.GET_ALL_BRANDS
      );
      return data.allBrands || [];
    } catch (error) {
      console.error("Error obteniendo marcas:", error);
      throw error;
    }
  },

  async getBrandById(id: string) {
    try {
      const data = await graphqlClient.query<GetBrandByIdQuery>(
        QUERIES.GET_BRAND_BY_ID,
        { id }
      );
      return data.brandsById;
    } catch (error) {
      console.error("Error obteniendo marca:", error);
      throw error;
    }
  },

  async getBrandsByCompany(companyID: string) {
    try {
      const data = await graphqlClient.query<GetBrandsByCompanyQuery>(
        QUERIES.GET_BRANDS_BY_COMPANY,
        {
          companyID: parseInt(companyID),
        }
      );
      return data.brandsByCompany || [];
    } catch (error) {
      console.error("Error obteniendo marcas por compañía:", error);
      throw error;
    }
  },

  async createBrand(brandData: BrandsCreate): Promise<BrandsInDb> {
    try {
      const data = await graphqlClient.mutation<CreateBrand2Mutation>(
        MUTATIONS.CREATE_BRAND,
        {
          input: brandData,
        }
      );
      return data.createBrand;
    } catch (error) {
      console.error("Error creando marca:", error);
      throw error;
    }
  },

  async updateBrand(id: string, brandData: BrandsUpdate) {
    try {
      const data = await graphqlClient.mutation<UpdateBrandMutation>(
        MUTATIONS.UPDATE_BRAND,
        {
          brandID: id,
          input: brandData,
        }
      );
      return data.updateBrand;
    } catch (error) {
      console.error("Error actualizando marca:", error);
      throw error;
    }
  },

  async deleteBrand(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteBrandMutation>(
        MUTATIONS.DELETE_BRAND,
        {
          brandID: id,
        }
      );
      return data.deleteBrand;
    } catch (error) {
      console.error("Error eliminando marca:", error);
      throw error;
    }
  },
};
