import GetAllBranchesGQL from "~/graphql/queries/GetAllBranches.graphql";
import GetBranchByIdGQL from "~/graphql/queries/GetBranchById.graphql";
import GetBranchesByCompanyGQL from "~/graphql/queries/GetBranchesByCompany.graphql";
import CreateBranchGQL from "~/graphql/mutations/CreateBranch.graphql";
import UpdateBranchGQL from "~/graphql/mutations/UpdateBranch.graphql";
import DeleteBranchGQL from "~/graphql/mutations/DeleteBranch.graphql";
import { graphqlClient } from "~/graphql/graphql-client";

import type {
  BranchesCreate,
  BranchesInDb,
  BranchesUpdate,
  DeleteBranchMutation,
} from "~/graphql/_generated/graphql";

export const branchOperations = {
  async getAllBranches(): Promise<BranchesInDb[]> {
    try {
      const data = await graphqlClient.query(GetAllBranchesGQL);
      return data.allBranches || [];
    } catch (error) {
      console.error("Error obteniendo sucursales:", error);
      throw error;
    }
  },

  async getBranchById(companyID: string, id: string): Promise<BranchesInDb> {
    try {
      const data = await graphqlClient.query(GetBranchByIdGQL, {
        companyID,
        id,
      });
      return data.branchesById;
    } catch (error) {
      console.error("Error obteniendo sucursal:", error);
      throw error;
    }
  },

  async getBranchesByCompany(companyID: string): Promise<BranchesInDb[]> {
    try {
      const data = await graphqlClient.query(GetBranchesByCompanyGQL, {
        companyID: parseInt(companyID),
      });
      return data.branchesByCompany || [];
    } catch (error) {
      console.error("Error obteniendo sucursales por compañía:", error);
      throw error;
    }
  },

  async createBranch(dataInput: BranchesCreate): Promise<BranchesInDb> {
    try {
      const data = await graphqlClient.mutation(CreateBranchGQL, {
        input: dataInput,
      });
      return data.createBranch;
    } catch (error) {
      console.error("Error creando sucursal:", error);
      throw error;
    }
  },

  async updateBranch(
    companyID: string,
    id: string,
    dataInput: BranchesUpdate
  ): Promise<BranchesInDb> {
    try {
      const data = await graphqlClient.mutation(UpdateBranchGQL, {
        companyID,
        branchID: id,
        input: dataInput,
      });
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
