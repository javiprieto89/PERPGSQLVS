import { graphqlClient } from "~/graphql/graphql-client";
import CreateRoleGQL from "~/graphql/mutations/CreateRole.graphql";
import DeleteRoleGQL from "~/graphql/mutations/DeleteRole.graphql";
import UpdateRoleGQL from "~/graphql/mutations/UpdateRole.graphql";
import GetAllRolesGQL from "~/graphql/queries/GetAllRoles.graphql";
import GetRoleByIdGQL from "~/graphql/queries/GetRoleById.graphql";

import type {
  RolesCreate,
  RolesInDb,
  RolesUpdate,
} from "~/graphql/_generated/graphql";

export const roleOperations = {
  async getAllRoles(): Promise<RolesInDb[]> {
    try {
      const data = await graphqlClient.query(GetAllRolesGQL);
      return data.allRoles || [];
    } catch (error) {
      console.error("Error obteniendo roles:", error);
      throw error;
    }
  },

  async getRoleById(id: string): Promise<RolesInDb> {
    try {
      const data = await graphqlClient.query(GetRoleByIdGQL, { id });
      return data.rolesById;
    } catch (error) {
      console.error("Error obteniendo rol:", error);
      throw error;
    }
  },

  async createRole(roleData: RolesCreate): Promise<RolesInDb> {
    try {
      const data = await graphqlClient.mutation(CreateRoleGQL, {
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
      const data = await graphqlClient.mutation(UpdateRoleGQL, {
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
      const data = await graphqlClient.mutation(DeleteRoleGQL, {
        roleID: id,
      });
      return data.deleteRole;
    } catch (error) {
      console.error("Error eliminando rol:", error);
      throw error;
    }
  },
};
