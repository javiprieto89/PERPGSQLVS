import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";
import { QUERIES } from "~/graphql/queries/queries.js";

import type {
  CashBoxesCreate,
  CashBoxesInDb,
  CashBoxesUpdate,
  CashBoxMovementsCreate,
  CashBoxMovementsInDb,
  CashBoxMovementsUpdate,
} from "~/graphql/_generated/graphql";

export const cashboxOperations = {
  async getAllCashboxes(): Promise<CashBoxesInDb[]> {
    const data = await graphqlClient.query(QUERIES.GET_ALL_CASHBOXES);
    return data.allCashboxes || [];
  },
  async getCashboxById(id: string): Promise<CashBoxesInDb> {
    const data = await graphqlClient.query(QUERIES.GET_CASHBOX_BY_ID, { id });
    return data.cashboxesById;
  },
  async createCashbox(input: CashBoxesCreate): Promise<CashBoxesInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.CREATE_CASHBOX, {
      input,
    });
    return data.createCashbox;
  },
  async updateCashbox(
    id: string,
    input: CashBoxesUpdate
  ): Promise<CashBoxesInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.UPDATE_CASHBOX, {
      cashBoxID: id,
      input,
    });
    return data.updateCashbox;
  },
  async deleteCashbox(id: string): Promise<CashBoxesInDb> {
    const data = await graphqlClient.mutation(MUTATIONS.DELETE_CASHBOX, {
      cashBoxID: id,
    });
    return data.deleteCashbox;
  },
};

export const cashboxMovementOperations = {
  async getAllCashboxmovements(): Promise<CashBoxMovementsInDb[]> {
    const data = await graphqlClient.query(QUERIES.GET_ALL_CASHBOXMOVEMENTS);
    return data.allCashboxmovements || [];
  },
  async getCashboxmovementById(id: string): Promise<CashBoxMovementsInDb> {
    const data = await graphqlClient.query(QUERIES.GET_CASHBOXMOVEMENT_BY_ID, {
      id,
    });
    return data.cashboxmovementsById;
  },
  async createCashboxmovement(
    input: CashBoxMovementsCreate
  ): Promise<CashBoxMovementsInDb> {
    const data = await graphqlClient.mutation(
      MUTATIONS.CREATE_CASHBOXMOVEMENT,
      { input }
    );
    return data.createCashboxmovement;
  },
  async updateCashboxmovement(
    id: string,
    input: CashBoxMovementsUpdate
  ): Promise<CashBoxMovementsInDb> {
    const data = await graphqlClient.mutation(
      MUTATIONS.UPDATE_CASHBOXMOVEMENT,
      { movementID: id, input }
    );
    return data.updateCashboxmovement;
  },
  async deleteCashboxmovement(id: string): Promise<CashBoxMovementsInDb> {
    const data = await graphqlClient.mutation(
      MUTATIONS.DELETE_CASHBOXMOVEMENT,
      { movementID: id }
    );
    return data.deleteCashboxmovement;
  },
};
