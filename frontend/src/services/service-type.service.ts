import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  ServiceTypesCreate,
  ServiceTypesInDb,
  ServiceTypesUpdate,
} from "~/graphql/_generated/graphql";

export const serviceTypeOperations = {
  async getAllServicetypes(): Promise<ServiceTypesInDb[]> {
    const data = await graphqlClient.query(QUERIES.GET_ALL_SERVICETYPES);
    return data.allServicetypes || [];
  },
  async getServicetypeById(id: string): Promise<ServiceTypesInDb> {
    const data = await graphqlClient.query(QUERIES.GET_SERVICETYPE_BY_ID, {
      id,
    });
    return data.servicetypesById;
  },
  async createServicetype(
    input: ServiceTypesCreate
  ): Promise<ServiceTypesInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.CREATE_SERVICETYPE, {
      input,
    });
    return data.createServicetype;
  },
  async updateServicetype(
    id: string,
    input: ServiceTypesUpdate
  ): Promise<ServiceTypesInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.UPDATE_SERVICETYPE, {
      serviceTypeID: id,
      input,
    });
    return data.updateServicetype;
  },
  async deleteServicetype(id: string): Promise<ServiceTypesInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.DELETE_SERVICETYPE, {
      serviceTypeID: id,
    });
    return data.deleteServicetype;
  },
};
