import { graphqlClient } from "~/graphql/graphql-client";
import { MUTATIONS } from "~/graphql/mutations/mutations.js";

import type {
  TempStockHistoryDetailsCreate,
  TempStockHistoryDetailsInDb,
} from "~/graphql/_generated/graphql";

export const tempStockOperations = {
  async createEntry(
    input: TempStockHistoryDetailsCreate
  ): Promise<TempStockHistoryDetailsInDb> {
    const res = await graphqlClient.mutation(MUTATIONS.CREATE_TEMPSTOCKENTRY, {
      input,
    });
    return res.createTempstockhistorydetail;
  },

  async getSessionEntries(
    sessionID: string
  ): Promise<TempStockHistoryDetailsInDb[]> {
    const res = await graphqlClient.query(MUTATIONS.GET_TEMP_STOCK_BY_SESSION, {
      sessionID,
    });
    return res.tempstockhistorydetailsBySession || [];
  },

  async processSession(sessionID: string): Promise<any> {
    const res = await graphqlClient.mutation(MUTATIONS.PROCESS_STOCK_SESSION, {
      sessionID,
    });
    return res.processStockSession;
  },
};
