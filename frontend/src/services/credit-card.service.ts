import { graphqlClient } from "~/graphql/graphql-client";
import CreateCreditCardGQL from "~/graphql/mutations/CreateCreditCard.graphql";
import CreateCreditCardGroupGQL from "~/graphql/mutations/CreateCreditCardGroup.graphql";
import DeleteCreditCardGQL from "~/graphql/mutations/DeleteCreditCard.graphql";
import DeleteCreditCardGroupGQL from "~/graphql/mutations/DeleteCreditCardGroup.graphql";
import UpdateCreditCardGQL from "~/graphql/mutations/UpdateCreditCard.graphql";
import UpdateCreditCardGroupGQL from "~/graphql/mutations/UpdateCreditCardGroup.graphql";
import GetAllCreditCardGroupsGQL from "~/graphql/queries/GetAllCreditCardGroups.graphql";
import GetAllCreditCardsGQL from "~/graphql/queries/GetAllCreditCards.graphql";
import GetCreditCardByIdGQL from "~/graphql/queries/GetCreditCardById.graphql";
import GetCreditCardGroupByIdGQL from "~/graphql/queries/GetCreditCardGroupById.graphql";

import type {
  CreateCreditCardGroupMutation,
  CreateCreditCardMutation,
  CreditCardGroupsCreate,
  CreditCardGroupsInDb,
  CreditCardGroupsUpdate,
  CreditCardsCreate,
  CreditCardsUpdate,
  DeleteCreditCardGroupMutation,
  DeleteCreditCardMutation,
  GetAllCreditCardGroupsQuery,
  GetAllCreditCardsQuery,
  GetCreditCardByIdQuery,
  GetCreditCardGroupByIdQuery,
  UpdateCreditCardGroupMutation,
  UpdateCreditCardMutation,
} from "~/graphql/_generated/graphql";

export const creditCardGroupOperations = {
  async getAllGroups(): Promise<CreditCardGroupsInDb[]> {
    const data = await graphqlClient.query<GetAllCreditCardGroupsQuery>(
      GetAllCreditCardGroupsGQL
    );
    return data.allCreditcardgroups || [];
  },

  async getGroupById(id: string) {
    const data = await graphqlClient.query<GetCreditCardGroupByIdQuery>(
      GetCreditCardGroupByIdGQL,
      {
        id,
      }
    );
    return data.creditcardgroupById;
  },

  async createGroup(input: CreditCardGroupsCreate) {
    const data = await graphqlClient.mutation<CreateCreditCardGroupMutation>(
      CreateCreditCardGroupGQL,
      {
        input,
      }
    );
    return data.createCreditcardgroup;
  },

  async updateGroup(id: string, input: CreditCardGroupsUpdate) {
    const data = await graphqlClient.mutation<UpdateCreditCardGroupMutation>(
      UpdateCreditCardGroupGQL,
      {
        id,
        input,
      }
    );
    return data.updateCreditcardgroup;
  },

  async deleteCreditCardGroup(id: number) {
    const data = await graphqlClient.mutation<DeleteCreditCardGroupMutation>(
      DeleteCreditCardGroupGQL,
      { id }
    );
    return data.deleteCreditcardgroup;
  },
};

export const creditCardOperations = {
  async getAllCards() {
    const data = await graphqlClient.query<GetAllCreditCardsQuery>(
      GetAllCreditCardsGQL
    );
    return data.allCreditcards || [];
  },

  async getCardById(id: string) {
    const data = await graphqlClient.query<GetCreditCardByIdQuery>(
      GetCreditCardByIdGQL,
      {
        id,
      }
    );
    return data.creditcardById;
  },

  async createCard(input: CreditCardsCreate) {
    const data = await graphqlClient.mutation<CreateCreditCardMutation>(
      CreateCreditCardGQL,
      {
        input,
      }
    );
    return data.createCreditcard;
  },

  async updateCard(id: string, input: CreditCardsUpdate) {
    const data = await graphqlClient.mutation<UpdateCreditCardMutation>(
      UpdateCreditCardGQL,
      {
        id,
        input,
      }
    );
    return data.updateCreditcard;
  },

  async deleteCreditCard(id: number) {
    const data = await graphqlClient.mutation<DeleteCreditCardMutation>(
      DeleteCreditCardGQL,
      {
        id,
      }
    );
    return data.deleteCreditcard;
  },
};
