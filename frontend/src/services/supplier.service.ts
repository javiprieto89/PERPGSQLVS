import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import { supplierHelpers } from "~/features/suppliers/supplierHelpers";
import type {
  CreateSupplierMutation,
  DeleteSupplierMutation,
  GetAllSuppliersQuery,
  GetSupplierFormDataQuery,
  GetSuppliersByCompanyQuery,
  SuppliersCreate,
  SuppliersInDb,
  SuppliersUpdate,
  ToggleSupplierStatusMutation,
  UpdateSupplierMutation,
} from "~/graphql/_generated/graphql";

// ===== FUNCIONES DE PROVEEDORES =====
export const supplierOperations = {
  async getAllSuppliers(): Promise<SuppliersInDb[]> {
    try {
      const data = await graphqlClient.query<GetAllSuppliersQuery>(
        QUERIES.GET_ALL_SUPPLIERS
      );
      return data.allSuppliers || [];
    } catch (error) {
      console.error("Error obteniendo proveedores:", error);
      throw error;
    }
  },

  async getSuppliersByCompany(companyID: string): Promise<SuppliersInDb[]> {
    try {
      const data = await graphqlClient.query<GetSuppliersByCompanyQuery>(
        QUERIES.GET_SUPPLIERS_BY_COMPANY,
        {
          companyID: parseInt(companyID),
        }
      );
      return data.suppliersByCompany || [];
    } catch (error) {
      console.error("Error obteniendo proveedores por compañía:", error);
      throw error;
    }
  },

  // async getSuppliersByBranch(
  //   companyID: string,
  //   branchID: string
  // ): Promise<SuppliersInDb[]> {
  //   try {
  //     const data = await graphqlClient.query(QUERIES.GET_SUPPLIERS_BY_BRANCH, {
  //       companyID: parseInt(companyID),
  //       branchID: parseInt(branchID),
  //     });
  //     return data.suppliersByBranch || [];
  //   } catch (error) {
  //     console.error("Error obteniendo proveedores por sucursal:", error);
  //     throw error;
  //   }
  // },

  async createSupplier(supplierData: SuppliersCreate): Promise<SuppliersInDb> {
    try {
      const errors = supplierHelpers.validateSupplierData(supplierData);
      if (errors.length > 0) {
        throw new Error(`Errores de validación: ${errors.join(", ")}`);
      }
      const prepared = supplierHelpers.prepareData(supplierData);
      const data = await graphqlClient.mutation<CreateSupplierMutation>(
        MUTATIONS.CREATE_SUPPLIER,
        {
          input: prepared,
        }
      );
      return data.createSupplier;
    } catch (error) {
      console.error("Error creando proveedor:", error);
      throw error;
    }
  },

  async updateSupplier(id: string, supplierData: SuppliersUpdate) {
    try {
      const errors = supplierHelpers.validateSupplierData(supplierData);
      if (errors.length > 0) {
        throw new Error(`Errores de validación: ${errors.join(", ")}`);
      }
      const prepared = supplierHelpers.prepareData(supplierData);
      const data = await graphqlClient.mutation<UpdateSupplierMutation>(
        MUTATIONS.UPDATE_SUPPLIER,
        {
          supplierID: id,
          input: prepared,
        }
      );
      return data.updateSupplier;
    } catch (error) {
      console.error("Error actualizando proveedor:", error);
      throw error;
    }
  },

  async deleteSupplier(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteSupplierMutation>(
        MUTATIONS.DELETE_SUPPLIER,
        {
          supplierID: id,
        }
      );
      return data.deleteSupplier;
    } catch (error) {
      console.error("Error eliminando proveedor:", error);
      throw error;
    }
  },

  async toggleSupplierStatus(id: string, isActive: boolean) {
    try {
      const data = await graphqlClient.mutation<ToggleSupplierStatusMutation>(
        MUTATIONS.TOGGLE_SUPPLIER_STATUS,
        {
          supplierID: id,
          isActive,
        }
      );
      return data.updateSupplier;
    } catch (error) {
      console.error("Error cambiando estado del proveedor:", error);
      throw error;
    }
  },

  // Obtener datos para formulario de proveedor
  async getSupplierFormData() {
    try {
      const data = await graphqlClient.query<GetSupplierFormDataQuery>(
        QUERIES.GET_SUPPLIER_FORM_DATA
      );
      return data;
    } catch (error) {
      console.error("Error obteniendo datos del formulario:", error);
      throw error;
    }
  },
};
