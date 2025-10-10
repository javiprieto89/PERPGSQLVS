import type { UserCreate, UserUpdate } from "~/graphql/_generated/graphql";
import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  UseraccessCreate,
  UseraccessInDb,
  UseraccessUpdate,
} from "~/graphql/_generated/graphql";

export const userService = {
  async getAllUsers() {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_USERS);
      return data.allUsers || [];
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      throw error;
    }
  },

  async getUserById(id: string) {
    try {
      const data = await graphqlClient.query(QUERIES.GET_USER_BY_ID, { id });
      return data.usersById;
    } catch (error) {
      console.error("Error obteniendo usuario:", error);
      throw error;
    }
  },

  async createUser(userData: UserCreate) {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_USER_RECORD, {
        input: userData,
      });
      return data.createUserRecord;
    } catch (error) {
      console.error("Error creando usuario:", error);
      throw error;
    }
  },

  async updateUser(id: string, userData: Omit<UserUpdate, "UserID">) {
    try {
      // El esquema UserUpdate exige incluir el ID dentro del input
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_USER_RECORD, {
        userID: id,
        input: { UserID: id, ...userData },
      });
      return data.updateUserRecord;
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      throw error;
    }
  },

  async deleteUser(id: string) {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_USER_RECORD, {
        userID: id,
      });
      return data.deleteUserRecord;
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      throw error;
    }
  },
};

export const userPermissionsOperations = {
  async getAllUserPermissions(): Promise<UseraccessInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_USERACCESS);
      return data.allUseraccess || [];
    } catch (error) {
      console.error("Error obteniendo roles y usuarios:", error);
      throw error;
    }
  },

  async getById(
    userID: string,
    companyID: string,
    branchID: string,
    roleID: string
  ): Promise<UseraccessInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_USERACCESS_BY_ID, {
        userID,
        companyID,
        branchID,
        roleID,
      });
      return data.useraccessById;
    } catch (error) {
      console.error("Error obteniendo asignación:", error);
      throw error;
    }
  },

  async create(data: UseraccessCreate): Promise<UseraccessInDb> {
    try {
      const res = await graphqlClient.mutation(MUTATIONS.CREATE_USERACCESS, {
        input: data,
      });
      return res.createUserpermissions;
    } catch (error) {
      console.error("Error creando asignación:", error);
      throw error;
    }
  },

  async update(
    oldKeys: any,
    newData: UseraccessUpdate
  ): Promise<UseraccessInDb> {
    try {
      const res = await graphqlClient.mutation(MUTATIONS.UPDATE_USERACCESS, {
        ...oldKeys,
        newData,
      });
      return res.updateUseraccess;
    } catch (error) {
      console.error("Error actualizando asignación:", error);
      throw error;
    }
  },

  async delete(keys: any): Promise<UseraccessInDb> {
    try {
      const res = await graphqlClient.mutation(
        MUTATIONS.DELETE_USERACCESS,
        keys
      );
      return res.deleteUserpermissions;
    } catch (error) {
      console.error("Error eliminando asignación:", error);
      throw error;
    }
  },
};
