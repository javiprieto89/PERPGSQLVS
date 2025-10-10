import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  CreditCardGroupsCreate,
  CreditCardGroupsInDb,
  CreditCardGroupsUpdate,
  CreditCardsCreate,
  CreditCardsInDb,
  CreditCardsUpdate,
} from "~/graphql/_generated/graphql";

export const creditCardGroupOperations = {
  async getAllGroups(): Promise<CreditCardGroupsInDb[]> {
    const data = await graphqlClient.query(QUERIES.GET_ALL_CREDITCARDGROUPS);
    return data.allCreditcardgroups || [];
  },

  async getGroupById(id: string): Promise<CreditCardGroupsInDb> {
    const data = await graphqlClient.query(QUERIES.GET_CREDITCARDGROUP_BY_ID, {
      id,
    });
    return data.creditcardgroupById;
  },

  async createGroup(
    input: CreditCardGroupsCreate
  ): Promise<CreditCardGroupsInDb> {
    const data = await graphqlClient.mutation(
      MUTATIONS.CREATE_CREDITCARDGROUP,
      {
        input,
      }
    );
    return data.createCreditcardgroup;
  },

  async updateGroup(
    id: string,
    input: CreditCardGroupsUpdate
  ): Promise<CreditCardGroupsInDb> {
    const data = await graphqlClient.mutation(
      MUTATIONS.UPDATE_CREDITCARDGROUP,
      {
        id,
        input,
      }
    );
    return data.updateCreditcardgroup;
  },

  async deleteGroup(id: string): Promise<CreditCardGroupsInDb> {
    const data = await graphqlClient.mutation(
      MUTATIONS.DELETE_CREDITCARDGROUP,
      { id }
    );
    return data.deleteCreditcardgroup;
  },
};

export const creditCardOperations = {
  async getAllCards(): Promise<CreditCardsInDb[]> {
    const data = await graphqlClient.query(QUERIES.GET_ALL_CREDITCARDS);
    return data.allCreditcards || [];
  },

  async getCardById(id: string): Promise<CreditCardsInDb> {
    const data = await graphqlClient.query(QUERIES.GET_CREDITCARD_BY_ID, {
      id,
    });
    return data.creditcardById;
  },

  async createCard(input: CreditCardsCreate): Promise<CreditCardsInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.CREATE_CREDITCARD, {
      input,
    });
    return data.createCreditcard;
  },

  async updateCard(
    id: string,
    input: CreditCardsUpdate
  ): Promise<CreditCardsInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CREDITCARD, {
      id,
      input,
    });
    return data.updateCreditcard;
  },

  async deleteCard(id: string): Promise<CreditCardsInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.DELETE_CREDITCARD, {
      id,
    });
    return data.deleteCreditcard;
  },
};
