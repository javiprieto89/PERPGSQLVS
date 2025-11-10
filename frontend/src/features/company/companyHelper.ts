import { z } from "zod/v4";
import type {
  CompanyCreate,
  CompanyInDb,
  CompanyUpdate,
  GetCompanyByIdQuery,
} from "~/graphql/_generated/graphql";
import { documentIdentitySchema } from "~/lib/zod";

type Data = CompanyInDb | CompanyUpdate | CompanyCreate;

export const formSchema = z.object({
  Address: z.string().nullable(),
  CompanyID: z.string().optional().nullable(),
  CompanyName: z.string().min(1).max(100),
  LastName: z.string().min(2).max(100).nullable().optional(),
  Phone: z.string(),
  DocNumber: documentIdentitySchema,
  DocTypeID: z.string(),
  Email: z.email().min(5).max(60),
  IsActive: z.boolean(),
  PostalCode: z.string().max(20),
  PriceListID: z.string(),
  ProvinceID: z.string(),
  VendorID: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const companyHelpers = {
  // Validar datos de cliente antes de enviar
  validateData(data: Data) {
    const errors = [];

    console.log("validateData -> data", data);

    if (!data.CompanyName?.trim()) {
      errors.push("El nombre es obligatorio");
    }

    return errors;
  },

  // Preparar datos para crear cliente
  prepareToInsert(formData: Record<string, any>): Data {
    return {
      Address: String(formData.Address)?.trim() || null,
      CompanyName: String(formData.CompanyName)?.trim() || null,
      CompanyID: Number(formData.CompanyID),
      Phone: String(formData.Phone)?.trim() || null,
      VendorID: Number(formData.VendorID) || 1,
      PriceListID: Number(formData.PriceListID) || 1,
      PostalCode: String(formData.PostalCode)?.trim() || null,
      IsActive: Boolean(formData.IsActive !== "false"), // Default true
      DocTypeID: Number(formData.DocTypeID) || 1,
      DocNumber: String(formData.DocNumber)?.trim() || null,
      CountryID: Number(formData.CountryID) || 1,
      ProvinceID: Number(formData.ProvinceID) || 1,
      Email: String(formData.Email)?.trim() || null,
      City: String(formData.City)?.trim() || null,
    };
  },

  prepareDataFormSchema(data?: GetCompanyByIdQuery) {
    if (!data?.companyById) return;
    const d = data.companyById;

    return {
      Address: d.Address,
      CUIT: String(d.CUIT || ""),
      CompanyID: String(d.CompanyID || ""),
      CompanyName: d.CompanyName,
      Grossincome: String(d.Grossincome || ""),
      Logo: String(d.Logo || ""),
      Startdate: String(d.Startdate || ""),
    };
  },

  // Formatear cliente para mostrar
  formatForDisplay(client: Record<string, string>) {
    return {
      ...client,
      StatusText: client.IsActive ? "Activo" : "Inactivo",
      ContactInfo: client.Email || client.Phone || "Sin contacto",
    };
  },
};
