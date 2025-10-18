import { graphqlClient } from "~/graphql/graphql-client";

import {
  CreatePricelistDocument,
  CreatePricelistItemDocument,
  DeletePricelistDocument,
  DeletePricelistItemDocument,
  GetAllPricelistItemsDocument,
  GetPricelistByIdDocument,
  GetPriceListFormDataDocument,
  GetPriceListsDocument,
  UpdatePricelistDocument,
  UpdatePricelistItemDocument,
  type CreatePricelistMutation,
  type DeletePricelistItemMutation,
  type DeletePricelistMutation,
  type GetAllPricelistItemsQuery,
  type GetPricelistByIdQuery,
  type GetPriceListFormDataQuery,
  type GetPriceListsQuery,
  type PriceListItemsCreate,
  type PriceListItemsUpdate,
  type PriceListsCreate,
  type PriceListsUpdate,
} from "~/graphql/_generated/graphql";

export const pricelistOperations = {
  async getAllPriceLists() {
    const data = await graphqlClient.query<GetPriceListsQuery>(
      GetPriceListsDocument
    );
    return data.allPricelists || [];
  },
  async getPriceListsFormData() {
    const data = await graphqlClient.query<GetPriceListFormDataQuery>(
      GetPriceListFormDataDocument
    );
    return data;
  },
  async getPriceListById(id: string) {
    const data = await graphqlClient.query<GetPricelistByIdQuery>(
      GetPricelistByIdDocument,
      { id }
    );
    return data.pricelistsById;
  },
  async createPriceList(input: PriceListsCreate) {
    const data = await graphqlClient.mutation<CreatePricelistMutation>(
      CreatePricelistDocument,
      {
        input,
      }
    );
    return data.createPricelist;
  },
  async updatePricelist(id: string, input: PriceListsUpdate) {
    const data = await graphqlClient.mutation<PriceListsUpdate>(
      UpdatePricelistDocument,
      {
        pricelistID: id,
        input,
      }
    );
    return data;
  },
  async deletePricelist(id: string) {
    const data = await graphqlClient.mutation<DeletePricelistMutation>(
      DeletePricelistDocument,
      {
        pricelistID: id,
      }
    );
    return data.deletePricelist;
  },
};

export const pricelistItemOperations = {
  async getAllPricelistItems() {
    const data = await graphqlClient.query<GetAllPricelistItemsQuery>(
      GetAllPricelistItemsDocument
    );
    return data.allPricelistitems || [];
  },
  async getFiltered(priceListID?: string, itemID?: string) {
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
    const data = await graphqlClient.query<GetAllPricelistItemsQuery>(
      GetAllPricelistItemsDocument,
      vars
    );
    return data.allPricelistitems || [];
  },
  async createPricelistItem(input: PriceListItemsCreate) {
    const data = await graphqlClient.mutation<PriceListItemsCreate>(
      CreatePricelistItemDocument,
      {
        input,
      }
    );
    return data;
  },
  async updatePricelistItem(
    priceListID: string,
    itemID: string,
    input: PriceListItemsUpdate
  ) {
    const data = await graphqlClient.mutation<PriceListItemsUpdate>(
      UpdatePricelistItemDocument,
      {
        pricelistID: priceListID,
        itemID,
        input,
      }
    );
    return data;
  },
  async deletePricelistItem(priceListID: string, itemID: string) {
    const data = await graphqlClient.mutation<DeletePricelistItemMutation>(
      DeletePricelistItemDocument,
      {
        pricelistID: priceListID,
        itemID,
      }
    );
    return data.deletePricelistitem;
  },
};
