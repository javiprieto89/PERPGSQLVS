import GetAllCompaniesGQL from "~/graphql/queries/GetAllCompanies.graphql";
import GetCompanyByIdGQL from "~/graphql/queries/GetCompanyById.graphql";
import CreateCompanyGQL from "~/graphql/mutations/CreateCompany.graphql";
import UpdateCompanyGQL from "~/graphql/mutations/UpdateCompany.graphql";
import DeleteCompanyGQL from "~/graphql/mutations/DeleteCompany.graphql";
import { graphqlClient } from "~/graphql/graphql-client";

import type {
  CompanyCreate,
  CompanyInDb,
  CompanyUpdate,
  CreateCompanyMutation,
  DeleteCompanyMutation,
  GetAllCompaniesQuery,
  GetCompanyByIdQuery,
  UpdateCompanyMutation,
} from "~/graphql/_generated/graphql";

export const companyOperations = {
  async getAllCompanies(): Promise<CompanyInDb[]> {
    try {
      const data = await graphqlClient.query<GetAllCompaniesQuery>(
        GetAllCompaniesGQL
      );
      return data.allCompany || [];
    } catch (error) {
      console.error("Error obteniendo compañías:", error);
      throw error;
    }
  },

  async getCompanyById(id: string) {
    try {
      const data = await graphqlClient.query<GetCompanyByIdQuery>(
        GetCompanyByIdGQL,
        { id }
      );
      return data.companyById;
    } catch (error) {
      console.error("Error obteniendo compañía:", error);
      throw error;
    }
  },

  async createCompany(dataInput: CompanyCreate): Promise<CompanyInDb> {
    try {
      const data = await graphqlClient.mutation<CreateCompanyMutation>(
        CreateCompanyGQL,
        {
          input: dataInput,
        }
      );
      return data.createCompany;
    } catch (error) {
      console.error("Error creando compañía:", error);
      throw error;
    }
  },

  async updateCompany(id: string, dataInput: CompanyUpdate) {
    try {
      const data = await graphqlClient.mutation<UpdateCompanyMutation>(
        UpdateCompanyGQL,
        {
          companyID: id,
          input: dataInput,
        }
      );
      return data.updateCompany;
    } catch (error) {
      console.error("Error actualizando compañía:", error);
      throw error;
    }
  },

  async deleteCompany(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteCompanyMutation>(
        DeleteCompanyGQL,
        {
          companyID: id,
        }
      );
      return data.deleteCompany;
    } catch (error) {
      console.error("Error eliminando compañía:", error);
      throw error;
    }
  },
};
