import GetAllServicetypesGQL from "~/graphql/queries/GetAllServicetypes.graphql";
import GetServicetypeByIdGQL from "~/graphql/queries/GetServicetypeById.graphql";
import CreateServicetypeGQL from "~/graphql/mutations/CreateServicetype.graphql";
import UpdateServicetypeGQL from "~/graphql/mutations/UpdateServicetype.graphql";
import DeleteServicetypeGQL from "~/graphql/mutations/DeleteServicetype.graphql";
import { graphqlClient } from "~/graphql/graphql-client";

import type {
  ServiceTypesCreate,
  ServiceTypesInDb,
  ServiceTypesUpdate,
} from "~/graphql/_generated/graphql";

export const serviceTypeOperations = {
  async getAllServicetypes(): Promise<ServiceTypesInDb[]> {
    const data = await graphqlClient.query(GetAllServicetypesGQL);
    return data.allServicetypes || [];
  },
  async getServicetypeById(id: string): Promise<ServiceTypesInDb> {
    const data = await graphqlClient.query(GetServicetypeByIdGQL, {
      id,
    });
    return data.servicetypesById;
  },
  async createServicetype(
    input: ServiceTypesCreate
  ): Promise<ServiceTypesInDb> {
    const data = await graphqlClient.mutation(CreateServicetypeGQL, {
      input,
    });
    return data.createServicetype;
  },
  async updateServicetype(
    id: string,
    input: ServiceTypesUpdate
  ): Promise<ServiceTypesInDb> {
    const data = await graphqlClient.mutation(UpdateServicetypeGQL, {
      serviceTypeID: id,
      input,
    });
    return data.updateServicetype;
  },
  async deleteServicetype(id: string): Promise<ServiceTypesInDb> {
    const data = await graphqlClient.mutation(DeleteServicetypeGQL, {
      serviceTypeID: id,
    });
    return data.deleteServicetype;
  },
};
