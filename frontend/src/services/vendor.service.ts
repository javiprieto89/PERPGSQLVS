import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  VendorsCreate,
  VendorsInDb,
  VendorsUpdate,
} from "~/graphql/_generated/graphql";

export const vendorOperations = {
  async getAllVendors(): Promise<VendorsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_VENDORS);
      return data.allVendors || [];
    } catch (error) {
      console.error("Error obteniendo vendedores:", error);
      throw error;
    }
  },
  async createVendor(vendorData: VendorsCreate): Promise<VendorsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_VENDOR, {
        input: vendorData,
      });
      return data.createVendor;
    } catch (error) {
      console.error("Error creando vendedor:", error);
      throw error;
    }
  },
  async updateVendor(
    id: string,
    vendorData: VendorsUpdate
  ): Promise<VendorsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_VENDOR, {
        vendorID: id,
        input: vendorData,
      });
      return data.updateVendor;
    } catch (error) {
      console.error("Error actualizando vendedor:", error);
      throw error;
    }
  },
  async deleteVendor(id: string): Promise<VendorsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_VENDOR, {
        vendorID: id,
      });
      return data.deleteVendor;
    } catch (error) {
      console.error("Error eliminando vendedor:", error);
      throw error;
    }
  },
  async toggleVendorStatus(
    id: string,
    isActive: boolean
  ): Promise<VendorsInDb> {
    try {
      const data = await graphqlClient.mutation(
        MUTATIONS.TOGGLE_VENDOR_STATUS,
        {
          vendorID: id,
          isActive,
        }
      );
      return data.toggleVendorStatus;
    } catch (error) {
      console.error("Error cambiando estado del vendedor:", error);
      throw error;
    }
  },
};
