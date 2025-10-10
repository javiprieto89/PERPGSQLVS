import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  RolesCreate,
  RolesInDb,
  RolesUpdate,
} from "~/graphql/_generated/graphql";

export const roleOperations = {
  async getAllRoles(): Promise<RolesInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_ROLES);
      return data.allRoles || [];
    } catch (error) {
      console.error("Error obteniendo roles:", error);
      throw error;
    }
  },

  async getRoleById(id: string): Promise<RolesInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ROLE_BY_ID, { id });
      return data.rolesById;
    } catch (error) {
      console.error("Error obteniendo rol:", error);
      throw error;
    }
  },

  async createRole(roleData: RolesCreate): Promise<RolesInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_ROLE, {
        input: roleData,
      });
      return data.createRole;
    } catch (error) {
      console.error("Error creando rol:", error);
      throw error;
    }
  },

  async updateRole(id: string, roleData: RolesUpdate): Promise<RolesInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ROLE, {
        roleID: id,
        input: roleData,
      });
      return data.updateRole;
    } catch (error) {
      console.error("Error actualizando rol:", error);
      throw error;
    }
  },

  async deleteRole(id: string): Promise<RolesInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_ROLE, {
        roleID: id,
      });
      return data.deleteRole;
    } catch (error) {
      console.error("Error eliminando rol:", error);
      throw error;
    }
  },
};
