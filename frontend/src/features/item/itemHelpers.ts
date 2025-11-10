import { z } from "zod/v4";
import type {
  GetItemByIdQuery,
  ItemsCreate,
  ItemsInDb,
  ItemsUpdate,
} from "~/graphql/_generated/graphql";
import { AuthStorage } from "~/utils/auth.storage";

type Data = ItemsInDb;
type Mutation = ItemsUpdate | ItemsCreate;

export const formSchema = z.object({
  CompanyID: z.number(),
  BranchID: z.number(),
  BrandID: z.number(),
  ItemCode: z.string(),
  ItemDescription: z.string(),
  ItemCategoryID: z.number(),
  ItemSubcategoryID: z.number(),
  SupplierID: z.number(),
  ControlStock: z.boolean(),
  ReplenishmentStock: z.number(),
  IsOffer: z.boolean(),
  OEM: z.string(),
  WarehouseID: z.number(),
  IsActive: z.boolean(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const itemHelpers = {
  // Validar datos de cliente antes de enviar
  validateData(data: Data) {
    const errors = [];

    console.log("validateData -> data", data);

    if (!data.ItemCode?.trim()) {
      errors.push("El codigo es obligatorio");
    }

    return errors;
  },

  // Preparar datos para crear cliente
  prepareToInsert(formData: Record<string, any>): Mutation {
    return {
      BranchID:
        Number(formData.BranchID) ||
        Number(AuthStorage.getSelectedAccess()?.BranchID) ||
        1,
      BrandID: Number(formData.BrandID),
      CompanyID:
        Number(formData.CompanyID) ||
        Number(AuthStorage.getSelectedAccess()?.CompanyID),
      ControlStock: formData.ControlStock,
      IsActive: formData.IsActive,
      IsOffer: Boolean(formData.IsOffer),
      ItemCategoryID: Number(formData.ItemCategoryID),
      ItemCode: formData.ItemCode,
      ItemDescription: formData.ItemDescription,
      ItemSubcategoryID: Number(formData.ItemSubcategoryID),
      OEM: formData.OEM ? String(formData.OEM) : null,
      ReplenishmentStock: formData.ReplenishmentStock
        ? Number(formData.ReplenishmentStock)
        : 0,
      SupplierID: Number(formData.SupplierID),
      // TODO check default warehouseID
      WarehouseID: Number(formData.WarehouseID) || 1,
    };
  },

  prepareDataFormSchema(data?: GetItemByIdQuery): FormSchema | undefined {
    if (!data?.itemsById) return;
    const d = data.itemsById;

    return {
      // Address: d.Address,
      // BranchName: d.BranchName,
      // Phone: d.Phone || "",
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
      // BranchID: String(d.BranchID || ""),
      BranchID: d.BranchID,
      BrandID: d.BrandID,
      CompanyID: d.CompanyID,
      ControlStock: d.ControlStock,
      IsActive: d.IsActive,
      IsOffer: d.IsOffer,
      ItemCategoryID: d.ItemCategoryID,
      ItemCode: d.ItemCode,
      ItemDescription: d.ItemDescription,
      ItemSubcategoryID: d.ItemSubcategoryID,
      OEM: String(d.OEM),
      ReplenishmentStock: d.ReplenishmentStock,
      SupplierID: d.SupplierID,
      WarehouseID: d.WarehouseID,
    };
  },
};
