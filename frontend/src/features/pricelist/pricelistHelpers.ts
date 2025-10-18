import { z } from "zod/v4";
import type {
  GetPricelistByIdQuery,
  PriceListsCreate,
  PriceListsUpdate,
} from "~/graphql/_generated/graphql";

/**
 * Zod validation schema for PriceList form
 */
export const formSchema = z.object({
  PriceListID: z.number().optional(),
  CompanyID: z.string().min(1, "La compañía es requerida"),
  PriceListName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  PriceListDescription: z
    .string()
    .max(500, "La descripción no puede exceder 500 caracteres")
    .nullable()
    .optional(),
  IsActive: z.boolean(),
});

export type FormSchema = z.infer<typeof formSchema>;

/**
 * Helper functions for PriceList data transformation and validation
 */
export const pricelistHelpers = {
  /**
   * Validate pricelist data before submission
   */
  validateData(pricelistData: PriceListsUpdate | PriceListsCreate) {
    const errors: string[] = [];

    if (!pricelistData.PriceListName?.trim()) {
      errors.push("El nombre de la lista de precios es obligatorio");
    }

    if (pricelistData.PriceListName && pricelistData.PriceListName.length < 2) {
      errors.push("El nombre debe tener al menos 2 caracteres");
    }

    if (
      pricelistData.PriceListName &&
      pricelistData.PriceListName.length > 100
    ) {
      errors.push("El nombre no puede exceder 100 caracteres");
    }

    if (
      pricelistData.PriceListDescription &&
      pricelistData.PriceListDescription.length > 500
    ) {
      errors.push("La descripción no puede exceder 500 caracteres");
    }

    if (!pricelistData.CompanyID) {
      errors.push("La compañía es obligatoria");
    }

    return errors;
  },

  /**
   * Prepare form data for GraphQL mutation (Create or Update)
   * Converts form values to the correct types and handles null values
   */
  prepareData(
    formData: Record<string, any>
  ): PriceListsUpdate | PriceListsCreate {
    return {
      CompanyID: Number(formData.CompanyID) || null,
      PriceListName: String(formData.PriceListName)?.trim() || "",
      PriceListDescription: formData.PriceListDescription
        ? String(formData.PriceListDescription).trim()
        : null,
      IsActive: Boolean(formData.IsActive !== false), // Default true
    };
  },

  /**
   * Prepare data from GraphQL query for form initialization
   * Converts database values to form-compatible format
   */
  prepareDataFormSchema(data?: GetPricelistByIdQuery) {
    if (!data?.pricelistsById) return undefined;

    const pricelist = data.pricelistsById;

    return {
      PriceListID: pricelist.PriceListID,
      CompanyID: String(pricelist.CompanyID || ""),
      PriceListName: pricelist.PriceListName || "",
      PriceListDescription: pricelist.PriceListDescription || "",
      IsActive: pricelist.IsActive !== false,
    };
  },

  /**
   * Format pricelist data for display
   */
  formatForDisplay(pricelist: any) {
    return {
      ...pricelist,
      StatusText: pricelist.IsActive ? "Activo" : "Inactivo",
      FormattedDescription: pricelist.PriceListDescription || "Sin descripción",
    };
  },
};
