import GetAllCreditCardGroupsGQL from "~/graphql/queries/GetAllCreditCardGroups.graphql";
import GetCreditCardGroupByIdGQL from "~/graphql/queries/GetCreditCardGroupById.graphql";
import CreateCreditCardGroupGQL from "~/graphql/mutations/CreateCreditCardGroup.graphql";
import UpdateCreditCardGroupGQL from "~/graphql/mutations/UpdateCreditCardGroup.graphql";
import DeleteCreditCardGroupGQL from "~/graphql/mutations/DeleteCreditCardGroup.graphql";
import GetAllCreditCardsGQL from "~/graphql/queries/GetAllCreditCards.graphql";
import GetCreditCardByIdGQL from "~/graphql/queries/GetCreditCardById.graphql";
import CreateCreditCardGQL from "~/graphql/mutations/CreateCreditCard.graphql";
import UpdateCreditCardGQL from "~/graphql/mutations/UpdateCreditCard.graphql";
import DeleteCreditCardGQL from "~/graphql/mutations/DeleteCreditCard.graphql";
import { graphqlClient } from "~/graphql/graphql-client";

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
    const data = await graphqlClient.query(GetAllCreditCardGroupsGQL);
    return data.allCreditcardgroups || [];
  },

  async getGroupById(id: string): Promise<CreditCardGroupsInDb> {
    const data = await graphqlClient.query(GetCreditCardGroupByIdGQL, {
      id,
    });
    return data.creditcardgroupById;
  },

  async createGroup(
    input: CreditCardGroupsCreate
  ): Promise<CreditCardGroupsInDb> {
    const data = await graphqlClient.mutation(
      CreateCreditCardGroupGQL,
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
      UpdateCreditCardGroupGQL,
      {
        id,
        input,
      }
    );
    return data.updateCreditcardgroup;
  },

  async deleteGroup(id: string): Promise<CreditCardGroupsInDb> {
    const data = await graphqlClient.mutation(
      DeleteCreditCardGroupGQL,
      { id }
    );
    return data.deleteCreditcardgroup;
  },
};

export const creditCardOperations = {
  async getAllCards(): Promise<CreditCardsInDb[]> {
    const data = await graphqlClient.query(GetAllCreditCardsGQL);
    return data.allCreditcards || [];
  },

  async getCardById(id: string): Promise<CreditCardsInDb> {
    const data = await graphqlClient.query(GetCreditCardByIdGQL, {
      id,
    });
    return data.creditcardById;
  },

  async createCard(input: CreditCardsCreate): Promise<CreditCardsInDb> {
    const data = await graphqlClient.mutation(CreateCreditCardGQL, {
      input,
    });
    return data.createCreditcard;
  },

  async updateCard(
    id: string,
    input: CreditCardsUpdate
  ): Promise<CreditCardsInDb> {
    const data = await graphqlClient.mutation(UpdateCreditCardGQL, {
      id,
      input,
    });
    return data.updateCreditcard;
  },

  async deleteCard(id: string): Promise<CreditCardsInDb> {
    const data = await graphqlClient.mutation(DeleteCreditCardGQL, {
      id,
    });
    return data.deleteCreditcard;
  },
};
