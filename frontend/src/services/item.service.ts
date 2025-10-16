import GetAllItemCategoriesGQL from "~/graphql/queries/GetAllItemCategories.graphql";
import GetItemCategoryByIdGQL from "~/graphql/queries/GetItemCategoryById.graphql";
import CreateItemCategoryGQL from "~/graphql/mutations/CreateItemCategory.graphql";
import UpdateItemCategoryGQL from "~/graphql/mutations/UpdateItemCategory.graphql";
import DeleteItemCategoryGQL from "~/graphql/mutations/DeleteItemCategory.graphql";
import GetAllItemSubcategoriesGQL from "~/graphql/queries/GetAllItemSubcategories.graphql";
import GetItemSubcategoryByIdGQL from "~/graphql/queries/GetItemSubcategoryById.graphql";
import GetItemSubcategoriesByCategoryGQL from "~/graphql/queries/GetItemSubcategoriesByCategory.graphql";
import CreateItemSubcategoryGQL from "~/graphql/mutations/CreateItemSubcategory.graphql";
import UpdateItemSubcategoryGQL from "~/graphql/mutations/UpdateItemSubcategory.graphql";
import DeleteItemSubcategoryGQL from "~/graphql/mutations/DeleteItemSubcategory.graphql";
import GetAllItemsGQL from "~/graphql/queries/GetAllItems.graphql";
import GetItemByIdGQL from "~/graphql/queries/GetItemById.graphql";
import SearchItemsGQL from "~/graphql/queries/SearchItems.graphql";
import CreateItemGQL from "~/graphql/mutations/CreateItem.graphql";
import UpdateItemGQL from "~/graphql/mutations/UpdateItem.graphql";
import DeleteItemGQL from "~/graphql/mutations/DeleteItem.graphql";
import { graphqlClient } from "~/graphql/graphql-client";

import type {
  CreateItemCategoryMutation,
  CreateItemMutation,
  CreateItemSubcategoryMutation,
  DeleteItemCategoryMutation,
  DeleteItemMutation,
  DeleteItemSubcategoryMutation,
  GetAllItemCategoriesQuery,
  GetAllItemsQuery,
  GetAllItemSubcategoriesQuery,
  GetItemByIdQuery,
  GetItemCategoryByIdQuery,
  GetItemSubcategoriesByCategoryQuery,
  GetItemSubcategoryByIdQuery,
  ItemCategoriesCreate,
  ItemCategoriesUpdate,
  ItemsCreate,
  ItemSubcategoriesCreate,
  ItemSubcategoriesUpdate,
  ItemsUpdate,
  SearchItemsQuery,
  UpdateItemCategoryMutation,
  UpdateItemMutation,
  UpdateItemSubcategoryMutation,
} from "~/graphql/_generated/graphql";

export const itemCategoryOperations = {
  async getAllItemCategories() {
    try {
      const data = await graphqlClient.query<GetAllItemCategoriesQuery>(
        GetAllItemCategoriesGQL
      );
      return data.allItemcategories || [];
    } catch (error) {
      console.error("Error obteniendo categorías:", error);
      throw error;
    }
  },

  async getItemCategoryById(id: string) {
    try {
      const data = await graphqlClient.query<GetItemCategoryByIdQuery>(
        GetItemCategoryByIdGQL,
        {
          id,
        }
      );
      return data.itemcategoriesById;
    } catch (error) {
      console.error("Error obteniendo categoría:", error);
      throw error;
    }
  },

  async createItemCategory(categoryData: ItemCategoriesCreate) {
    try {
      const data = await graphqlClient.mutation<CreateItemCategoryMutation>(
        CreateItemCategoryGQL,
        {
          input: categoryData,
        }
      );
      return data.createItemcategory;
    } catch (error) {
      console.error("Error creando categoría:", error);
      throw error;
    }
  },

  async updateItemCategory(id: string, categoryData: ItemCategoriesUpdate) {
    try {
      const data = await graphqlClient.mutation<UpdateItemCategoryMutation>(
        UpdateItemCategoryGQL,
        {
          categoryID: id,
          input: categoryData,
        }
      );
      return data.updateItemcategory;
    } catch (error) {
      console.error("Error actualizando categoría:", error);
      throw error;
    }
  },

  async deleteItemCategory(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteItemCategoryMutation>(
        DeleteItemCategoryGQL,
        {
          categoryID: id,
        }
      );
      return data.deleteItemcategory;
    } catch (error) {
      console.error("Error eliminando categoría:", error);
      throw error;
    }
  },
};

export const itemSubcategoryOperations = {
  async getAllItemSubcategories() {
    try {
      const data = await graphqlClient.query<GetAllItemSubcategoriesQuery>(
        GetAllItemSubcategoriesGQL
      );
      return data.allItemsubcategories || [];
    } catch (error) {
      console.error("Error obteniendo subcategorías:", error);
      throw error;
    }
  },

  async getItemSubcategoryById(id: string) {
    try {
      const data = await graphqlClient.query<GetItemSubcategoryByIdQuery>(
        GetItemSubcategoryByIdGQL,
        { id }
      );
      return data.itemsubcategoriesById;
    } catch (error) {
      console.error("Error obteniendo subcategoría:", error);
      throw error;
    }
  },

  // NUEVA FUNCIÓN AGREGADA
  async getItemSubcategoriesByCategory(categoryID: string) {
    try {
      const data =
        await graphqlClient.query<GetItemSubcategoriesByCategoryQuery>(
          GetItemSubcategoriesByCategoryGQL,
          {
            categoryID: parseInt(categoryID),
          }
        );
      return data.itemsubcategoriesByCategory || [];
    } catch (error) {
      console.error("Error obteniendo subcategorías por categoría:", error);
      throw error;
    }
  },

  async createItemSubcategory(subcategoryData: ItemSubcategoriesCreate) {
    try {
      const data = await graphqlClient.mutation<CreateItemSubcategoryMutation>(
        CreateItemSubcategoryGQL,
        {
          input: subcategoryData,
        }
      );
      return data.createItemsubcategory;
    } catch (error) {
      console.error("Error creando subcategoría:", error);
      throw error;
    }
  },

  async updateItemSubcategory(
    id: string,
    subcategoryData: ItemSubcategoriesUpdate
  ) {
    try {
      const data = await graphqlClient.mutation<UpdateItemSubcategoryMutation>(
        UpdateItemSubcategoryGQL,
        {
          subcategoryID: id,
          input: subcategoryData,
        }
      );
      return data.updateItemsubcategory;
    } catch (error) {
      console.error("Error actualizando subcategoría:", error);
      throw error;
    }
  },

  async deleteItemSubcategory(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteItemSubcategoryMutation>(
        DeleteItemSubcategoryGQL,
        {
          subcategoryID: id,
        }
      );
      return data.deleteItemsubcategory;
    } catch (error) {
      console.error("Error eliminando subcategoría:", error);
      throw error;
    }
  },
};

export const itemOperations = {
  async getAllItems() {
    try {
      const data = await graphqlClient.query<GetAllItemsQuery>(
        GetAllItemsGQL
      );
      return data.allItems || [];
    } catch (error) {
      console.error("Error obteniendo ítems:", error);
      throw error;
    }
  },

  async getItemById(id: string) {
    try {
      const data = await graphqlClient.query<GetItemByIdQuery>(
        GetItemByIdGQL,
        { id }
      );
      return data.itemsById;
    } catch (error) {
      console.error("Error obteniendo ítem:", error);
      throw error;
    }
  },

  async createItem(itemData: ItemsCreate) {
    try {
      const data = await graphqlClient.mutation<CreateItemMutation>(
        CreateItemGQL,
        {
          input: itemData,
        }
      );
      return data.createItem;
    } catch (error) {
      console.error("Error creando ítem:", error);
      throw error;
    }
  },

  async updateItem(id: string, itemData: ItemsUpdate) {
    try {
      const data = await graphqlClient.mutation<UpdateItemMutation>(
        UpdateItemGQL,
        {
          itemID: id,
          input: itemData,
        }
      );
      return data.updateItem;
    } catch (error) {
      console.error("Error actualizando ítem:", error);
      throw error;
    }
  },

  async deleteItem(id: string) {
    try {
      const data = await graphqlClient.mutation<DeleteItemMutation>(
        DeleteItemGQL,
        {
          itemID: id,
        }
      );
      return data.deleteItem;
    } catch (error) {
      console.error("Error eliminando ítem:", error);
      throw error;
    }
  },

  async searchItems(search: string = "", page: number = 1, limit: number = 50) {
    try {
      const variables = {
        filters: search ? { search } : null,
        pagination: { page, limit },
      };
      const data = await graphqlClient.query<SearchItemsQuery>(
        SearchItemsGQL,
        variables
      );
      return data.searchItems?.items || [];
    } catch (error) {
      console.error("Error buscando ítems:", error);
      throw error;
    }
  },
};
