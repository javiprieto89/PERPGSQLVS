import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  ItemCategoriesCreate,
  ItemCategoriesInDb,
  ItemCategoriesUpdate,
  ItemsCreate,
  ItemsInDb,
  ItemSubcategoriesCreate,
  ItemSubcategoriesInDb,
  ItemSubcategoriesUpdate,
  ItemsUpdate,
} from "~/graphql/_generated/graphql";

export const itemCategoryOperations = {
  async getAllItemCategories(): Promise<ItemCategoriesInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_ITEMCATEGORIES);
      return data.allItemcategories || [];
    } catch (error) {
      console.error("Error obteniendo categorías:", error);
      throw error;
    }
  },

  async getItemCategoryById(id: string): Promise<ItemCategoriesInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ITEMCATEGORY_BY_ID, {
        id,
      });
      return data.itemcategoriesById;
    } catch (error) {
      console.error("Error obteniendo categoría:", error);
      throw error;
    }
  },

  async createItemCategory(
    categoryData: ItemCategoriesCreate
  ): Promise<ItemCategoriesInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_ITEMCATEGORY, {
        input: categoryData,
      });
      return data.createItemcategory;
    } catch (error) {
      console.error("Error creando categoría:", error);
      throw error;
    }
  },

  async updateItemCategory(
    id: string,
    categoryData: ItemCategoriesUpdate
  ): Promise<ItemCategoriesInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ITEMCATEGORY, {
        categoryID: id,
        input: categoryData,
      });
      return data.updateItemcategory;
    } catch (error) {
      console.error("Error actualizando categoría:", error);
      throw error;
    }
  },

  async deleteItemCategory(id: string): Promise<ItemCategoriesInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_ITEMCATEGORY, {
        categoryID: id,
      });
      return data.deleteItemcategory;
    } catch (error) {
      console.error("Error eliminando categoría:", error);
      throw error;
    }
  },
};

export const itemSubcategoryOperations = {
  async getAllItemSubcategories(): Promise<ItemSubcategoriesInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_ITEMSUBCATEGORIES);
      return data.allItemsubcategories || [];
    } catch (error) {
      console.error("Error obteniendo subcategorías:", error);
      throw error;
    }
  },

  async getItemSubcategoryById(id: string): Promise<ItemSubcategoriesInDb> {
    try {
      const data = await graphqlClient.query(
        QUERIES.GET_ITEMSUBCATEGORY_BY_ID,
        { id }
      );
      return data.itemsubcategoriesById;
    } catch (error) {
      console.error("Error obteniendo subcategoría:", error);
      throw error;
    }
  },

  // NUEVA FUNCIÓN AGREGADA
  async getItemSubcategoriesByCategory(
    categoryID: string
  ): Promise<ItemSubcategoriesInDb[]> {
    try {
      const data = await graphqlClient.query(
        QUERIES.GET_ITEMSUBCATEGORIES_BY_CATEGORY,
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

  async createItemSubcategory(
    subcategoryData: ItemSubcategoriesCreate
  ): Promise<ItemSubcategoriesInDb> {
    try {
      const data = await graphqlClient.mutation(
        MUTATIONS.CREATE_ITEMSUBCATEGORY,
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
  ): Promise<ItemSubcategoriesInDb> {
    try {
      const data = await graphqlClient.mutation(
        MUTATIONS.UPDATE_ITEMSUBCATEGORY,
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

  async deleteItemSubcategory(id: string): Promise<ItemSubcategoriesInDb> {
    try {
      const data = await graphqlClient.mutation(
        MUTATIONS.DELETE_ITEMSUBCATEGORY,
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
  async getAllItems(): Promise<ItemsInDb[]> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ALL_ITEMS);
      return data.allItems || [];
    } catch (error) {
      console.error("Error obteniendo ítems:", error);
      throw error;
    }
  },

  async getItemById(id: string): Promise<ItemsInDb> {
    try {
      const data = await graphqlClient.query(QUERIES.GET_ITEM_BY_ID, { id });
      return data.itemsById;
    } catch (error) {
      console.error("Error obteniendo ítem:", error);
      throw error;
    }
  },

  async createItem(itemData: ItemsCreate): Promise<ItemsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.CREATE_ITEM, {
        input: itemData,
      });
      return data.createItem;
    } catch (error) {
      console.error("Error creando ítem:", error);
      throw error;
    }
  },

  async updateItem(id: string, itemData: ItemsUpdate): Promise<ItemsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.UPDATE_ITEM, {
        itemID: id,
        input: itemData,
      });
      return data.updateItem;
    } catch (error) {
      console.error("Error actualizando ítem:", error);
      throw error;
    }
  },

  async deleteItem(id: string): Promise<ItemsInDb> {
    try {
      const data = await graphqlClient.mutation(MUTATIONS.DELETE_ITEM, {
        itemID: id,
      });
      return data.deleteItem;
    } catch (error) {
      console.error("Error eliminando ítem:", error);
      throw error;
    }
  },

  async searchItems(
    search: string = "",
    page: number = 1,
    limit: number = 50
  ): Promise<ItemsInDb[]> {
    try {
      const variables = {
        filters: search ? { search } : null,
        pagination: { page, limit },
      };
      const data = await graphqlClient.query(QUERIES.SEARCH_ITEMS, variables);
      return data.searchItems?.items || [];
    } catch (error) {
      console.error("Error buscando ítems:", error);
      throw error;
    }
  },
};
