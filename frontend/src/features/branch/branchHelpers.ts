import { z } from "zod/v4";
import type {
  BranchesCreate,
  BranchesInDb,
  BranchesUpdate,
  GetBranchByIdQuery,
} from "~/graphql/_generated/graphql";

type Data = BranchesInDb | BranchesUpdate | BranchesCreate;

export const formSchema = z.object({
  Address: z.string().nullable(),
  BranchID: z.string().optional().nullable(),
  CompanyID: z.string(),
  BranchName: z.string().min(1).max(100),
  LastName: z.string().min(2).max(100).nullable().optional(),
  Phone: z.string(),
  // DocNumber: documentIdentitySchema,
  // DocTypeID: z.string(),
  // Email: z.email().min(5).max(60),
  // IsActive: z.boolean(),
  // PostalCode: z.string().max(20),
  // PriceListID: z.string(),
  // ProvinceID: z.string(),
  // VendorID: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const branchHelpers = {
  // Validar datos de cliente antes de enviar
  validateData(data: Data) {
    const errors = [];

    console.log("validateData -> data", data);

    if (!data.BranchName?.trim()) {
      errors.push("El nombre es obligatorio");
    }

    return errors;
  },

  // Preparar datos para crear cliente
  prepareToInsert(formData: Record<string, any>): Data {
    return {
      Address: String(formData.Address)?.trim() || null,
      BranchName: String(formData.BranchName)?.trim() || null,
      CompanyID: Number(formData.CompanyID) || null,
      Phone: String(formData.Phone)?.trim() || null,
      // BranchID: Number(formData.BranchID),
      // VendorID: Number(formData.VendorID) || 1,
      // PriceListID: Number(formData.PriceListID) || 1,
      // PostalCode: String(formData.PostalCode)?.trim() || null,
      // IsActive: Boolean(formData.IsActive !== "false"), // Default true
      // DocTypeID: Number(formData.DocTypeID) || 1,
      // DocNumber: String(formData.DocNumber)?.trim() || null,
      // CountryID: Number(formData.CountryID) || 1,
      // ProvinceID: Number(formData.ProvinceID) || 1,
      // Email: String(formData.Email)?.trim() || null,
      // City: String(formData.City)?.trim() || null,
    };
  },

  prepareDataFormSchema(data?: GetBranchByIdQuery) {
    if (!data?.branchesById) return;
    const d = data.branchesById;

    return {
      Address: d.Address,
      BranchID: String(d.BranchID || ""),
      BranchName: d.BranchName,
      CompanyID: String(d.CompanyID || ""),
      Phone: d.Phone || "",
      // City: d.City,
      // ClientID: d.ClientID,
      // CountryID: String(d.CountryID),
      // DocNumber: Number(d.DocNumber),
      // DocTypeID: String(d.DocTypeID),
      // Email: d.Email || "",
      // FirstName: d.FirstName,
      // IsActive: d.IsActive || false,
      // PostalCode: d.PostalCode || "",
      // PriceListID: String(d.PriceListID),
      // ProvinceID: String(d.ProvinceID),
      // VendorID: String(d.VendorID),
    };
  },

  // Formatear cliente para mostrar
  formatClientForDisplay(client: Record<string, string>) {
    return {
      ...client,
      StatusText: client.IsActive ? "Activo" : "Inactivo",
      ContactInfo: client.Email || client.Phone || "Sin contacto",
    };
  },
};
