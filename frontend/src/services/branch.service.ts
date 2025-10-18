import { graphqlClient } from "~/graphql/graphql-client";
import CreateBranchGQL from "~/graphql/mutations/CreateBranch.graphql";
import DeleteBranchGQL from "~/graphql/mutations/DeleteBranch.graphql";
import UpdateBranchGQL from "~/graphql/mutations/UpdateBranch.graphql";
import GetAllBranchesGQL from "~/graphql/queries/GetAllBranches.graphql";
import GetBranchByIdGQL from "~/graphql/queries/GetBranchById.graphql";
import GetBranchesByCompanyGQL from "~/graphql/queries/GetBranchesByCompany.graphql";

import type {
  BranchesCreate,
  BranchesInDb,
  BranchesUpdate,
  CreateBranchMutation,
  DeleteBranchMutation,
  GetAllBranchesQuery,
  GetBranchByIdQuery,
  GetBranchesByCompanyQuery,
  UpdateBranchMutation,
} from "~/graphql/_generated/graphql";

export const branchOperations = {
  async getAllBranches(): Promise<BranchesInDb[]> {
    try {
      const data = await graphqlClient.query<GetAllBranchesQuery>(
        GetAllBranchesGQL
      );
      return data.allBranches || [];
    } catch (error) {
      console.error("Error obteniendo sucursales:", error);
      throw error;
    }
  },

  async getBranchById(companyID: string, id: string): Promise<BranchesInDb> {
    try {
      const data = await graphqlClient.query<GetBranchByIdQuery>(
        GetBranchByIdGQL,
        {
          companyID,
          id,
        }
      );
      return data.branchesById!;
    } catch (error) {
      console.error("Error obteniendo sucursal:", error);
      throw error;
    }
  },

  async getBranchesByCompany(companyID: number): Promise<BranchesInDb[]> {
    try {
      const data = await graphqlClient.query<GetBranchesByCompanyQuery>(
        GetBranchesByCompanyGQL,
        {
          companyID: companyID,
        }
      );
      return data.branchesByCompany || [];
    } catch (error) {
      console.error("Error obteniendo sucursales por compañía:", error);
      throw error;
    }
  },

  async createBranch(dataInput: BranchesCreate): Promise<BranchesInDb> {
    try {
      const data = await graphqlClient.mutation<CreateBranchMutation>(
        CreateBranchGQL,
        {
          input: dataInput,
        }
      );
      return data.createBranch;
    } catch (error) {
      console.error("Error creando sucursal:", error);
      throw error;
    }
  },

  async updateBranch(companyID: string, id: string, dataInput: BranchesUpdate) {
    try {
      const data = await graphqlClient.mutation<UpdateBranchMutation>(
        UpdateBranchGQL,
        {
          companyID,
          branchID: id,
          input: dataInput,
        }
      );
      return data.updateBranch;
    } catch (error) {
      console.error("Error actualizando sucursal:", error);
      throw error;
    }
  },

  async deleteBranch(companyID: number, id: number) {
    try {
      const data = await graphqlClient.mutation<DeleteBranchMutation>(
        DeleteBranchGQL,
        {
          companyID,
          branchID: id,
        }
      );
      return data.deleteBranch;
    } catch (error) {
      console.error("Error eliminando sucursal:", error);
      throw error;
    }
  },
};
