import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  BranchesCreate,
  BranchesInDb,
  BranchesUpdate,
  DeleteBranchMutation,
} from "~/graphql/_generated/graphql";

export const branchOperations = {
  async getAllBranches(): Promise<BranchesInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_BRANCHES);
      return data.allBranches || [];
    } catch (error) {
      console.error("Error obteniendo sucursales:", error);
      throw error;
    }
  },

  async getBranchById(companyID: string, id: string): Promise<BranchesInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_BRANCH_BY_ID, {
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
      const data = await graphqlClient.query(
        `query { branchesByCompany(companyID: ${
          "" + companyID
        }) { BranchID Name CompanyID } }`
      );
      return data.branchesByCompany || [];
    } catch (error) {
      console.error("Error obteniendo sucursales por compañía:", error);
      throw error;
    }
  },

  async createBranch(dataInput: BranchesCreate): Promise<BranchesInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_BRANCH, {
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
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_BRANCH, {
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
        MUTATIONS.DELETE_BRANCH,
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
