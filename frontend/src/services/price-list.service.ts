import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  PriceListItemsCreate,
  PriceListItemsInDb,
  PriceListItemsUpdate,
  PriceListsCreate,
  PriceListsInDb,
  PriceListsUpdate,
} from "~/graphql/_generated/graphql";

export const pricelistOperations = {
  async getAllPricelists(): Promise<PriceListsInDb[]> {
    const data = await graphqlClient.query(QUERIES.GET_PRICE_LISTS);
    return data.allPricelists || [];
  },
  async getPricelistById(id: string): Promise<PriceListsInDb> {
    const data = await graphqlClient.query(QUERIES.GET_PRICELIST_BY_ID, { id });
    return data.pricelistsById;
  },
  async createPricelist(input: PriceListsCreate): Promise<PriceListsInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.CREATE_PRICELIST, {
      input,
    });
    return data.createPricelist;
  },
  async updatePricelist(
    id: string,
    input: PriceListsUpdate
  ): Promise<PriceListsInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.UPDATE_PRICELIST, {
      pricelistID: id,
      input,
    });
    return data.updatePricelist;
  },
  async deletePricelist(id: string): Promise<PriceListsInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.DELETE_PRICELIST, {
      pricelistID: id,
    });
    return data.deletePricelist;
  },
};

export const pricelistItemOperations = {
  async getAllPricelistItems(): Promise<PriceListItemsInDb[]> {
    const data = await graphqlClient.query(QUERIES.GET_ALL_PRICELIST_ITEMS);
    return data.allPricelistitems || [];
  },
  async getFiltered(
    priceListID?: string,
    itemID?: string
  ): Promise<PriceListItemsInDb[]> {
    const vars: { priceListID?: number; itemID?: number } = {};
    if (
      priceListID !== undefined &&
      priceListID !== null &&
      priceListID !== ""
    ) {
      vars.priceListID = Number(priceListID);
    }
    if (itemID !== undefined && itemID !== null && itemID !== "") {
      vars.itemID = Number(itemID);
    }
    const data = await graphqlClient.query(
      QUERIES.GET_PRICELIST_ITEMS_FILTERED,
      vars
    );
    return data.pricelistitemsFiltered || [];
  },
  async createPricelistItem(
    input: PriceListItemsCreate
  ): Promise<PriceListItemsInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.CREATE_PRICELIST_ITEM, {
      input,
    });
    return data.createPricelistitem;
  },
  async updatePricelistItem(
    priceListID: string,
    itemID: string,
    input: PriceListItemsUpdate
  ): Promise<PriceListItemsInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.UPDATE_PRICELIST_ITEM, {
      pricelistID: priceListID,
      itemID,
      input,
    });
    return data.updatePricelistitem;
  },
  async deletePricelistItem(
    priceListID: string,
    itemID: string
  ): Promise<PriceListItemsInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.DELETE_PRICELIST_ITEM, {
      pricelistID: priceListID,
      itemID,
    });
    return data.deletePricelistitem;
  },
};
