import { apolloClient } from "~/lib/apollo";

// Import GraphQL operations from .graphql files
import CreateBankReconciliationGQL from "~/graphql/mutations/CreateBankReconciliation.graphql";
import DeleteBankReconciliationGQL from "~/graphql/mutations/DeleteBankReconciliation.graphql";
import UpdateBankReconciliationGQL from "~/graphql/mutations/UpdateBankReconciliation.graphql";
import GetAllBankReconciliationsGQL from "~/graphql/queries/GetAllBankReconciliations.graphql";
import GetBankReconciliationByIdGQL from "~/graphql/queries/GetBankReconciliationById.graphql";
import GetBankReconciliationsByAccountGQL from "~/graphql/queries/GetBankReconciliationsByAccount.graphql";

export type BankReconciliation = {
  ReconciliationID: number;
  CompanyID: number;
  BankAccountID: number;
  StatementDate: string;
  ClosingBalance: number;
  CreatedAt: string;
  Notes?: string | null;
};

export type BankReconciliationInput = {
  CompanyID: number;
  BankAccountID: number;
  StatementDate: string;
  ClosingBalance: number;
  Notes?: string | null;
};

type GetAllBankReconciliationsResponse = {
  allBankreconciliations: BankReconciliation[];
};

type GetBankReconciliationsByAccountResponse = {
  bankreconciliationsByAccount: BankReconciliation[];
};

type GetBankReconciliationByIdResponse = {
  bankreconciliationById: BankReconciliation | null;
};

type CreateBankReconciliationResponse = {
  createBankreconciliation: BankReconciliation;
};

type UpdateBankReconciliationResponse = {
  updateBankreconciliation: BankReconciliation | null;
};

type DeleteBankReconciliationResponse = {
  deleteBankreconciliation: boolean;
};

// Modern Apollo Client-based service
export const bankReconciliationService = {
  async getAll(): Promise<BankReconciliation[]> {
    try {
      const { data } =
        await apolloClient.query<GetAllBankReconciliationsResponse>({
          query: GetAllBankReconciliationsGQL,
          fetchPolicy: "cache-first",
        });
      return data?.allBankreconciliations ?? [];
    } catch (error) {
      console.error("Error fetching bank reconciliations:", error);
      throw new Error("Failed to fetch bank reconciliations");
    }
  },

  async getByAccount(
    bankAccountID: number,
    companyID?: number
  ): Promise<BankReconciliation[]> {
    try {
      const { data } =
        await apolloClient.query<GetBankReconciliationsByAccountResponse>({
          query: GetBankReconciliationsByAccountGQL,
          variables: { bankAccountID, companyID },
          fetchPolicy: "cache-first",
        });
      return data?.bankreconciliationsByAccount ?? [];
    } catch (error) {
      console.error("Error fetching bank reconciliations by account:", error);
      throw new Error("Failed to fetch bank reconciliations by account");
    }
  },

  async getById(
    reconciliationID: number,
    companyID?: number
  ): Promise<BankReconciliation | null> {
    try {
      const { data } =
        await apolloClient.query<GetBankReconciliationByIdResponse>({
          query: GetBankReconciliationByIdGQL,
          variables: { reconciliationID, companyID },
          fetchPolicy: "cache-first",
        });
      return data?.bankreconciliationById ?? null;
    } catch (error) {
      console.error("Error fetching bank reconciliation by ID:", error);
      throw new Error("Failed to fetch bank reconciliation");
    }
  },

  async create(input: BankReconciliationInput): Promise<BankReconciliation> {
    try {
      const { data } =
        await apolloClient.mutate<CreateBankReconciliationResponse>({
          mutation: CreateBankReconciliationGQL,
          variables: { input },
          update(cache, { data: mutationData }) {
            if (mutationData?.createBankreconciliation) {
              // Update the cache with the new reconciliation
              const existingReconciliations =
                cache.readQuery<GetAllBankReconciliationsResponse>({
                  query: GetAllBankReconciliationsGQL,
                });

              if (existingReconciliations) {
                cache.writeQuery({
                  query: GetAllBankReconciliationsGQL,
                  data: {
                    allBankreconciliations: [
                      ...existingReconciliations.allBankreconciliations,
                      mutationData.createBankreconciliation,
                    ],
                  },
                });
              }
            }
          },
        });

      if (!data?.createBankreconciliation) {
        throw new Error("No data returned from create mutation");
      }

      return data.createBankreconciliation;
    } catch (error) {
      console.error("Error creating bank reconciliation:", error);
      throw new Error("Failed to create bank reconciliation");
    }
  },

  async update(
    reconciliationID: number,
    input: Partial<BankReconciliationInput>,
    companyID?: number
  ): Promise<BankReconciliation> {
    try {
      const { data } =
        await apolloClient.mutate<UpdateBankReconciliationResponse>({
          mutation: UpdateBankReconciliationGQL,
          variables: { reconciliationID, input, companyID },
          update(cache, { data: mutationData }) {
            if (mutationData?.updateBankreconciliation) {
              // Update the cache with the updated reconciliation
              cache.modify({
                id: cache.identify({
                  __typename: "BankReconciliation",
                  ReconciliationID: reconciliationID,
                }),
                fields: {
                  StatementDate: () =>
                    mutationData.updateBankreconciliation?.StatementDate,
                  ClosingBalance: () =>
                    mutationData.updateBankreconciliation?.ClosingBalance,
                  Notes: () => mutationData.updateBankreconciliation?.Notes,
                },
              });
            }
          },
        });

      if (!data?.updateBankreconciliation) {
        throw new Error(
          "Failed to update bank reconciliation - no data returned"
        );
      }

      return data.updateBankreconciliation;
    } catch (error) {
      console.error("Error updating bank reconciliation:", error);
      throw new Error("Failed to update bank reconciliation");
    }
  },

  async remove(reconciliationID: number, companyID?: number): Promise<boolean> {
    try {
      const { data } =
        await apolloClient.mutate<DeleteBankReconciliationResponse>({
          mutation: DeleteBankReconciliationGQL,
          variables: { reconciliationID, companyID },
          update(cache) {
            // Remove from cache
            const existingReconciliations =
              cache.readQuery<GetAllBankReconciliationsResponse>({
                query: GetAllBankReconciliationsGQL,
              });

            if (existingReconciliations) {
              cache.writeQuery({
                query: GetAllBankReconciliationsGQL,
                data: {
                  allBankreconciliations:
                    existingReconciliations.allBankreconciliations.filter(
                      (reconciliation) =>
                        reconciliation.ReconciliationID !== reconciliationID
                    ),
                },
              });
            }
          },
        });

      return data?.deleteBankreconciliation ?? false;
    } catch (error) {
      console.error("Error deleting bank reconciliation:", error);
      throw new Error("Failed to delete bank reconciliation");
    }
  },
};
