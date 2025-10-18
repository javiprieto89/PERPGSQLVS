import type {
  CreateUserPermissionsMutation,
  CreateUserRecordMutation,
  DeleteUserPermissionsMutation,
  DeleteUserRecordMutation,
  GetAllUserPermissionsQuery,
  GetAllUsersQuery,
  GetUserByIdQuery,
  UpdateUserPermissionsMutation,
  UpdateUserRecordMutation,
  UserCreate,
  UserPermissionsCreate,
  UserUpdate,
} from "~/graphql/_generated/graphql";
import { GetAllUserPermissionsDocument } from "~/graphql/_generated/graphql";
import { graphqlClient } from "~/graphql/graphql-client";
import CreateUserPermissionsGQL from "~/graphql/mutations/CreateUserPermissions.graphql";
import CreateUserRecordGQL from "~/graphql/mutations/CreateUserRecord.graphql";
import DeleteUserPermissionsGQL from "~/graphql/mutations/DeleteUserPermissions.graphql";
import DeleteUserRecordGQL from "~/graphql/mutations/DeleteUserRecord.graphql";
import UpdateUserPermissionsGQL from "~/graphql/mutations/UpdateUserPermissions.graphql";
import UpdateUserRecordGQL from "~/graphql/mutations/UpdateUserRecord.graphql";
import GetAllUsersGQL from "~/graphql/queries/GetAllUsers.graphql";
import GetUserByIdGQL from "~/graphql/queries/GetUserById.graphql";
import GetUserpermissionsByIdGQL from "~/graphql/queries/GetUserpermissionsById.graphql";

export const userService = {
  async getAllUsers() {
    try {
      const data = await graphqlClient.query<GetAllUsersQuery>(GetAllUsersGQL);
      return data.allUsers || [];
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      throw error;
    }
  },

  async getUserById(id: string) {
    try {
      const data = await graphqlClient.query<GetUserByIdQuery>(GetUserByIdGQL, {
        id,
      });
      return data.usersById;
    } catch (error) {
      console.error("Error obteniendo usuario:", error);
      throw error;
    }
  },

  async createUser(userData: UserCreate) {
    try {
      const data = await graphqlClient.mutation<CreateUserRecordMutation>(
        CreateUserRecordGQL,
        {
          input: userData,
        }
      );
      return data.createUserRecord;
    } catch (error) {
      console.error("Error creando usuario:", error);
      throw error;
    }
  },

  async updateUser(id: string, userData: Omit<UserUpdate, "UserID">) {
    try {
      // El esquema UserUpdate exige incluir el ID dentro del input
      const data = await graphqlClient.mutation<UpdateUserRecordMutation>(
        UpdateUserRecordGQL,
        {
          userID: id,
          input: { UserID: id, ...userData },
        }
      );
      return data.updateUserRecord;
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      throw error;
    }
  },

  async deleteUser(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteUserRecordMutation>(
        DeleteUserRecordGQL,
        {
          userID: id,
        }
      );
      return data.deleteUserRecord;
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      throw error;
    }
  },
};

export const userPermissionsOperations = {
  async getAllUserPermissions() {
    try {
      const data = await graphqlClient.query<GetAllUserPermissionsQuery>(
        GetAllUserPermissionsDocument
      );
      return data.allUserpermissions || [];
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
  ) {
    try {
      const data = await graphqlClient.query<GetUserByIdQuery>(
        GetUserpermissionsByIdGQL,
        {
          userID,
          companyID,
          branchID,
          roleID,
        }
      );
      return data.usersById;
    } catch (error) {
      console.error("Error obteniendo asignación:", error);
      throw error;
    }
  },

  async create(data: UserPermissionsCreate) {
    try {
      const res = await graphqlClient.mutation<CreateUserPermissionsMutation>(
        CreateUserPermissionsGQL,
        {
          input: data,
        }
      );
      return res.createUserpermissions;
    } catch (error) {
      console.error("Error creando asignación:", error);
      throw error;
    }
  },

  async update(oldKeys: any, newData: UserPermissionsCreate) {
    try {
      const res = await graphqlClient.mutation<UpdateUserPermissionsMutation>(
        UpdateUserPermissionsGQL,
        {
          ...oldKeys,
          newData,
        }
      );
      return res.updateUserpermissions;
    } catch (error) {
      console.error("Error actualizando asignación:", error);
      throw error;
    }
  },

  async delete(keys: any) {
    try {
      const res = await graphqlClient.mutation<DeleteUserPermissionsMutation>(
        DeleteUserPermissionsGQL,
        keys
      );
      return res.deleteUserpermissions;
    } catch (error) {
      console.error("Error eliminando asignación:", error);
      throw error;
    }
  },
};
