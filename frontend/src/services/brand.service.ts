import GetAllBrandsGQL from "~/graphql/queries/GetAllBrands.graphql";
import GetBrandByIdGQL from "~/graphql/queries/GetBrandById.graphql";
import GetBrandsByCompanyGQL from "~/graphql/queries/GetBrandsByCompany.graphql";
import CreateBrandGQL from "~/graphql/mutations/createBrand.graphql";
import UpdateBrandGQL from "~/graphql/mutations/updateBrand.graphql";
import DeleteBrandGQL from "~/graphql/mutations/deleteBrand.graphql";
import { graphqlClient } from "~/graphql/graphql-client";

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
        GetAllBrandsGQL
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
        GetBrandByIdGQL,
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
        GetBrandsByCompanyGQL,
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
        CreateBrandGQL,
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
        UpdateBrandGQL,
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
        DeleteBrandGQL,
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
