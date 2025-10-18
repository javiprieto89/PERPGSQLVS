import {
  CreateClientDocument,
  DeleteClientDocument,
  GetAllClientsDocument,
  GetClientByIdDocument,
  GetClientsByBranchDocument,
  GetClientsByCompanyDocument,
  ToggleClientStatusDocument,
  UpdateClientDocument,
  type CreateClientMutation,
  type DeleteClientMutation,
  type GetAllClientsQuery,
  type GetClientByIdQuery,
  type GetClientFormDataQuery,
  type GetClientsByBranchQuery,
  type GetClientsByCompanyQuery,
  type ToggleClientStatusMutation,
  type UpdateClientMutation,
  type VendorsInDb,
} from "~/graphql/_generated/graphql";
import { graphqlClient } from "~/graphql/graphql-client";

import { clientHelpers } from "~/features/client/clientHelpers";
import GetClientFormDataGQL from "~/graphql/queries/GetClientFormData.graphql";

// ===== FUNCIONES DE CLIENTES =====
export const clientOperations = {
  // Obtener todos los clientes
  async getAllClients() {
    try {
      const data = await graphqlClient.query<GetAllClientsQuery>(
        GetAllClientsDocument
      );
      return data.allClients || [];
    } catch (error) {
      console.error("Error obteniendo clientes:", error);
      throw error;
    }
  },

  // Obtener cliente por ID
  async getClientById(ClientID: string) {
    try {
      const data = await graphqlClient.query<GetClientByIdQuery>(
        GetClientByIdDocument,
        {
          id: ClientID,
        }
      );
      return data.clientsById;
    } catch (error) {
      console.error("Error obteniendo cliente:", error);
      throw error;
    }
  },

  async getClientsByCompany(companyID: string) {
    try {
      const data = await graphqlClient.query<GetClientsByCompanyQuery>(
        GetClientsByCompanyDocument,
        {
          companyID: parseInt(companyID),
        }
      );
      return data.clientsByCompany || [];
    } catch (error) {
      console.error("Error obteniendo clientes por compañía:", error);
      throw error;
    }
  },

  async getClientsByBranch(companyID: string, branchID: string) {
    try {
      // QUERIES.GET_CLIENTS_BY_BRANCH
      const data = await graphqlClient.query<GetClientsByBranchQuery>(
        GetClientsByBranchDocument,
        {
          companyID: parseInt(companyID),
          branchID: parseInt(branchID),
        }
      );
      return data.clientsByBranch || [];
    } catch (error) {
      console.error("Error obteniendo clientes por sucursal:", error);
      throw error;
    }
  },

  // Crear nuevo cliente
  async createClient(clientData: Record<string, any>) {
    try {
      // Validar datos
      const errors = clientHelpers.validateData(clientData);
      if (errors.length > 0) {
        throw new Error(`Errores de validación: ${errors.join(", ")}`);
      }

      // Preparar datos
      const preparedData = clientHelpers.prepareData(clientData);

      // Crear cliente
      const data = (await graphqlClient.mutation(CreateClientDocument, {
        input: preparedData,
      })) as CreateClientMutation;

      return data.createClient;
    } catch (error) {
      console.error("Error creando cliente:", error);
      throw error;
    }
  },

  // Actualizar cliente
  async updateClient(ClientID: number, clientData: Record<string, any>) {
    try {
      // Validar datos
      const errors = clientHelpers.validateData(clientData);
      if (errors.length > 0) {
        throw new Error(`Errores de validación: ${errors.join(", ")}`);
      }

      // Preparar datos
      const preparedData = clientHelpers.prepareData(clientData);
      console.log("clientData", clientData);
      console.log("preparedData", preparedData);

      // Actualizar cliente MUTATIONS.UPDATE_CLIENT
      const data = (await graphqlClient.mutation(UpdateClientDocument, {
        clientID: ClientID,
        input: preparedData,
      })) as UpdateClientMutation;

      return data.updateClient;
    } catch (error) {
      console.error("Error actualizando cliente:", error);
      throw error;
    }
  },

  // Eliminar cliente
  async deleteClient(ClientID: string) {
    try {
      // MUTATIONS.DELETE_CLIENT
      const data = (await graphqlClient.mutation(DeleteClientDocument, {
        ClientID: ClientID,
      })) as DeleteClientMutation;

      return data.deleteClient;
    } catch (error) {
      console.error("Error eliminando cliente:", error);
      throw error;
    }
  },

  // Cambiar estado activo/inactivo
  async toggleClientStatus(ClientID: string, isActive: boolean) {
    try {
      // MUTATIONS.TOGGLE_CLIENT_STATUS
      const data = (await graphqlClient.mutation(ToggleClientStatusDocument, {
        ClientID: ClientID,
        isActive: isActive,
      })) as ToggleClientStatusMutation;

      return data.updateClient;
    } catch (error) {
      console.error("Error cambiando estado del cliente:", error);
      throw error;
    }
  },

  // Obtener datos para formulario de cliente
  async getClientFormData() {
    try {
      const data = await graphqlClient.query<GetClientFormDataQuery>(
        GetClientFormDataGQL
      );
      return {
        docTypes: data.docTypes || [],
        countries: data.countries || [],
        provinces: data.provinces || [],
        companies: data.companies || [],
        priceLists: data.priceLists?.filter((pl) => pl.IsActive) || [],
        vendors: data.vendors?.filter((v: VendorsInDb) => v.IsActive) || [],
      };
    } catch (error) {
      console.error("Error obteniendo datos del formulario:", error);
      throw error;
    }
  },
};
