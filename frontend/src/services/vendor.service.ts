import GetVendorsGQL from "~/graphql/queries/GetVendors.graphql";
import CreateVendorGQL from "~/graphql/mutations/CreateVendor.graphql";
import UpdateVendorGQL from "~/graphql/mutations/UpdateVendor.graphql";
import DeleteVendorGQL from "~/graphql/mutations/DeleteVendor.graphql";
import ToggleVendorStatusGQL from "~/graphql/mutations/ToggleVendorStatus.graphql";
import { graphqlClient } from "~/graphql/graphql-client";

import type {
  VendorsCreate,
  VendorsInDb,
  VendorsUpdate,
} from "~/graphql/_generated/graphql";

export const vendorOperations = {
  async getAllVendors(): Promise<VendorsInDb[]> {
    try {
      const data = await graphqlClient.query(GetVendorsGQL);
      return data.allVendors || [];
    } catch (error) {
      console.error("Error obteniendo vendedores:", error);
      throw error;
    }
  },
  async createVendor(vendorData: VendorsCreate): Promise<VendorsInDb> {
    try {
      const data = await graphqlClient.mutation(CreateVendorGQL, {
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
      const data = await graphqlClient.mutation(UpdateVendorGQL, {
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
      const data = await graphqlClient.mutation(DeleteVendorGQL, {
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
        ToggleVendorStatusGQL,
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
