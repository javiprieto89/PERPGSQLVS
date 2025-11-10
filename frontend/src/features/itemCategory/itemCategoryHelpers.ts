import { z } from "zod";
import type {
  ItemCategoriesCreate,
  ItemCategoriesInDb,
  ItemCategoriesUpdate,
} from "~/graphql/_generated/graphql";
import { AuthStorage } from "~/utils/auth.storage";

export const formSchema = z.object({
  CategoryName: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
});

export type FormSchema = z.infer<typeof formSchema>;

export const itemCategoryHelpers = {
  prepareDataFormSchema: (data: {
    itemcategoriesById: ItemCategoriesInDb;
  }): FormSchema => {
    return {
      CategoryName: data.itemcategoriesById.CategoryName || "",
    };
  },

  prepareToInsert: (data: FormSchema): ItemCategoriesCreate => {
    const companyID = Number(AuthStorage.getSelectedAccess()?.CompanyID);

    return {
      CategoryName: data.CategoryName.trim(),
      CompanyID: companyID,
    };
  },

  prepareToUpdate: (data: FormSchema): ItemCategoriesUpdate => {
    const companyID = Number(AuthStorage.getSelectedAccess()?.CompanyID);

    return {
      CategoryName: data.CategoryName.trim(),
      CompanyID: companyID,
    };
  },
};
