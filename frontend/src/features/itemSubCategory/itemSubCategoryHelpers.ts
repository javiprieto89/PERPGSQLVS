import { z } from "zod/v4";
import type {
  ItemSubcategoriesCreate,
  ItemSubcategoriesInDb,
  ItemSubcategoriesUpdate,
} from "~/graphql/_generated/graphql";
import { AuthStorage } from "~/utils/auth.storage";

export const formSchema = z.object({
  SubcategoryName: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  ItemSubcategoryID: z.number().optional(),
  ItemCategoryID: z.number(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const itemCategoryHelpers = {
  prepareDataFormSchema: (
    data: Omit<ItemSubcategoriesInDb, "CompanyID">
  ): FormSchema => {
    return {
      SubcategoryName: data.SubcategoryName || "",
      ItemSubcategoryID: data.ItemSubcategoryID || undefined,
      ItemCategoryID: data.CategoryData?.ItemCategoryID || 0,
    };
  },

  prepareToInsert: (data: FormSchema): ItemSubcategoriesCreate => {
    const companyID = Number(AuthStorage.getSelectedAccess()?.CompanyID);

    return {
      SubcategoryName: data.SubcategoryName.trim(),
      ItemCategoryID: data.ItemCategoryID,
      CompanyID: companyID,
    };
  },

  prepareToUpdate: (data: FormSchema): ItemSubcategoriesUpdate => {
    const companyID = Number(AuthStorage.getSelectedAccess()?.CompanyID);

    return {
      SubcategoryName: data.SubcategoryName.trim(),
      ItemCategoryID: data.ItemCategoryID,
      CompanyID: companyID,
    };
  },
};
