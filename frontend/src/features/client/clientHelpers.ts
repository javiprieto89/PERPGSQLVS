import { z } from "zod/v4";
import type {
  ClientsCreate,
  ClientsUpdate,
  GetClientByIdQuery,
} from "~/graphql/_generated/graphql";

import { documentIdentitySchema } from "~/lib/zod";
import { isValidEmail } from "~/utils/helpers";

export const formSchema = z.object({
  ClientID: z.number(),
  Address: z.string().nullable(),
  BranchID: z.string(),
  City: z.string().max(100).nullable(),
  CompanyID: z.string(),
  CountryID: z.string(),
  DocNumber: documentIdentitySchema,
  DocTypeID: z.string(),
  Email: z.email().min(5).max(60),
  FirstName: z.string().min(2).max(100),
  IsActive: z.boolean(),
  LastName: z.string().min(2).max(100).nullable().optional(),
  Phone: z.string(),
  PostalCode: z.string().max(20),
  PriceListID: z.string(),
  ProvinceID: z.string(),
  VendorID: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const clientHelpers = {
  // Validar datos de cliente antes de enviar
  validateData(clientData: ClientsUpdate | ClientsCreate) {
    const errors = [];

    console.log("clientData", clientData);

    if (!clientData.FirstName?.trim()) {
      errors.push("El nombre es obligatorio");
    }

    if (!clientData.DocTypeID) {
      errors.push("El tipo de documento es obligatorio");
    }

    if (!clientData.CountryID) {
      errors.push("El país es obligatorio");
    }

    if (!clientData.ProvinceID) {
      errors.push("La provincia es obligatoria");
    }

    if (!clientData.PriceListID) {
      errors.push("La lista de precios es obligatoria");
    }

    if (!clientData.VendorID) {
      errors.push("El vendedor es obligatorio");
    }

    if (clientData.Email && !isValidEmail(clientData.Email)) {
      errors.push("El formato del email no es válido");
    }

    return errors;
  },

  // Preparar datos para crear cliente
  prepareData(formData: Record<string, any>): ClientsUpdate | ClientsCreate {
    return {
      Address: String(formData.Address)?.trim() || null,
      BranchID: Number(formData.BranchID) || null,
      City: String(formData.City)?.trim() || null,
      CompanyID: Number(formData.CompanyID) || null,
      CountryID: Number(formData.CountryID) || 1,
      DocNumber: String(formData.DocNumber)?.trim() || null,
      DocTypeID: Number(formData.DocTypeID) || 1,
      Email: String(formData.Email)?.trim() || null,
      FirstName: String(formData.FirstName)?.trim() || "",
      IsActive: Boolean(formData.IsActive !== "false"), // Default true
      LastName: String(formData.LastName)?.trim() || null,
      Phone: String(formData.Phone)?.trim() || null,
      PostalCode: String(formData.PostalCode)?.trim() || null,
      PriceListID: Number(formData.PriceListID) || 1,
      ProvinceID: Number(formData.ProvinceID) || 1,
      VendorID: Number(formData.VendorID) || 1,
    };
  },

  prepareDataFormSchema(data?: GetClientByIdQuery) {
    if (!data?.clientsById) return;
    const d = data.clientsById;

    return {
      ClientID: d.ClientID,
      Address: d.Address,
      BranchID: String(d.BranchID || ""),
      City: d.City,
      CompanyID: String(d.CompanyID || ""),
      CountryID: String(d.CountryID),
      DocNumber: Number(d.DocNumber),
      DocTypeID: String(d.DocTypeID),
      Email: d.Email || "",
      FirstName: d.FirstName,
      IsActive: d.IsActive || false,
      LastName: d.LastName,
      Phone: d.Phone || "",
      PostalCode: d.PostalCode || "",
      PriceListID: String(d.PriceListID),
      ProvinceID: String(d.ProvinceID),
      VendorID: String(d.VendorID),
    };
  },

  // Formatear cliente para mostrar
  formatClientForDisplay(client: Record<string, string>) {
    return {
      ...client,
      FullName: `${client.FirstName} ${client.LastName || ""}`.trim(),
      StatusText: client.IsActive ? "Activo" : "Inactivo",
      ContactInfo: client.Email || client.Phone || "Sin contacto",
    };
  },
};
