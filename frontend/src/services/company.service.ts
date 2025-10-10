import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  CompanyCreate,
  CompanyInDb,
  CompanyUpdate,
} from "~/graphql/_generated/graphql";

export const companyOperations = {
  async getAllCompanies(): Promise<CompanyInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_COMPANIES);
      return data.allCompany || [];
    } catch (error) {
      console.error("Error obteniendo compañías:", error);
      throw error;
    }
  },

  async getCompanyById(id: string): Promise<CompanyInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_COMPANY_BY_ID, { id });
      return data.companydataById;
    } catch (error) {
      console.error("Error obteniendo compañía:", error);
      throw error;
    }
  },

  async createCompany(dataInput: CompanyCreate): Promise<CompanyInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_COMPANY, {
        input: dataInput,
      });
      return data.createCompany;
    } catch (error) {
      console.error("Error creando compañía:", error);
      throw error;
    }
  },

  async updateCompany(
    id: string,
    dataInput: CompanyUpdate
  ): Promise<CompanyInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_COMPANY, {
        companyID: id,
        input: dataInput,
      });
      return data.updateCompany;
    } catch (error) {
      console.error("Error actualizando compañía:", error);
      throw error;
    }
  },

  async deleteCompany(id: string): Promise<CompanyInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_COMPANY, {
        companyID: id,
      });
      return data.deleteCompany;
    } catch (error) {
      console.error("Error eliminando compañía:", error);
      throw error;
    }
  },
};
