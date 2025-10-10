import { z } from "zod/v4";
import type { GetSuppliersByIdQuery } from "~/graphql/_generated/graphql";

import { documentIdentitySchema } from "~/lib/zod";
import { isValidEmail } from "~/utils/helpers";

export const formSchema = z.object({
  SupplierID: z.number().optional(),
  Address: z.string().nullable().optional(),
  // BranchID: z.string().optional(),
  City: z.string().max(100).nullable().optional(),
  CompanyID: z.string().optional(),
  CountryID: z.string().optional(),
  DocNumber: documentIdentitySchema.optional(),
  DocTypeID: z.string().optional(),
  Email: z.email().min(5).max(60).optional(),
  FirstName: z.string().min(2).max(100),
  IsActive: z.boolean().optional(),
  LastName: z.string().min(2).max(100).nullable().optional(),
  Phone: z.string().optional(),
  PostalCode: z.string().max(20).optional(),
  ProvinceID: z.string().optional(),
});

export type SupplierFormSchema = z.infer<typeof formSchema>;

// ===== FUNCIONES AUXILIARES DE PROVEEDORES =====
export const supplierHelpers = {
  validateSupplierData(data: Record<string, any>) {
    const errors = [];
    if (!data.firstName?.trim()) {
      errors.push("El nombre es obligatorio");
    }
    if (data.email && !isValidEmail(data.email)) {
      errors.push("El formato del email no es válido");
    }
    return errors;
  },
  prepareData(formData: Record<string, any>) {
    return {
      DocTypeID: formData.DocTypeID ? parseInt(formData.DocTypeID) : null,
      CompanyID: formData.CompanyID ? parseInt(formData.CompanyID) : null,
      // BranchID: formData.BranchID ? parseInt(formData.BranchID) : null,
      DocNumber: formData.DocNumber?.toString()?.trim() || null,
      FirstName: formData.FirstName?.trim() || "",
      LastName: formData.LastName?.trim() || null,
      Phone: formData.Phone?.trim() || null,
      Email: formData.Email?.trim() || null,
      Address: formData.Address?.trim() || null,
      IsActive: Boolean(formData.IsActive !== false),
      CountryID: formData.CountryID ? parseInt(formData.CountryID) : null,
      ProvinceID: formData.ProvinceID ? parseInt(formData.ProvinceID) : null,
      City: formData.City?.trim() || null,
      PostalCode: formData.PostalCode?.trim() || null,
    };
  },
  prepareDataFormSchema(data?: GetSuppliersByIdQuery) {
    if (!data?.suppliersById) return;
    const d = data.suppliersById;
    return {
      SupplierID: d.SupplierID,
      Address: d.Address,
      City: d.City,
      CompanyID: String(d.CompanyID || ""),
      CountryID: String(d.CountryID || ""),
      DocNumber: Number(d.DocNumber || 0),
      DocTypeID: String(d.DocTypeID || ""),
      Email: d.Email || "",
      FirstName: d.FirstName,
      IsActive: Boolean(d.IsActive),
      LastName: d.LastName,
      Phone: d.Phone || "",
      PostalCode: d.PostalCode || "",
      ProvinceID: String(d.ProvinceID || ""),
    };
  },
};
