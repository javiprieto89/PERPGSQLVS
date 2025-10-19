import { apolloClient } from "~/lib/apollo";

// Import GraphQL operations from .graphql files
import CreateBankGQL from "~/graphql/mutations/CreateBank.graphql";
import DeleteBankGQL from "~/graphql/mutations/DeleteBank.graphql";
import UpdateBankGQL from "~/graphql/mutations/UpdateBank.graphql";
import GetAllBanksGQL from "~/graphql/queries/GetAllBanks.graphql";
import GetBankByIdGQL from "~/graphql/queries/GetBankById.graphql";

export type Bank = {
  BankID: number;
  Name: string;
  IsActive: boolean;
};

export type BankInput = {
  Name: string;
  IsActive?: boolean;
};

// Type definitions for GraphQL responses
type GetAllBanksResponse = {
  allBanks: Bank[];
};

type GetBankByIdResponse = {
  bankById: Bank | null;
};

type CreateBankResponse = {
  createBank: Bank;
};

type UpdateBankResponse = {
  updateBank: Bank | null;
};

type DeleteBankResponse = {
  deleteBank: boolean;
};

// Modern Apollo Client-based service
export const bankService = {
  async getAll(): Promise<Bank[]> {
    try {
      const { data } = await apolloClient.query<GetAllBanksResponse>({
        query: GetAllBanksGQL,
        fetchPolicy: "cache-first",
      });
      return data?.allBanks ?? [];
    } catch (error) {
      console.error("Error fetching banks:", error);
      throw new Error("Failed to fetch banks");
    }
  },

  async getById(bankID: number): Promise<Bank | null> {
    try {
      const { data } = await apolloClient.query<GetBankByIdResponse>({
        query: GetBankByIdGQL,
        variables: { bankID },
        fetchPolicy: "cache-first",
      });
      return data?.bankById ?? null;
    } catch (error) {
      console.error("Error fetching bank by ID:", error);
      throw new Error("Failed to fetch bank");
    }
  },

  async create(input: BankInput): Promise<Bank> {
    try {
      const { data } = await apolloClient.mutate<CreateBankResponse>({
        mutation: CreateBankGQL,
        variables: { input },
        update(cache, { data: mutationData }) {
          if (mutationData?.createBank) {
            // Update the cache with the new bank
            const existingBanks = cache.readQuery<GetAllBanksResponse>({
              query: GetAllBanksGQL,
            });

            if (existingBanks) {
              cache.writeQuery({
                query: GetAllBanksGQL,
                data: {
                  allBanks: [
                    ...existingBanks.allBanks,
                    mutationData.createBank,
                  ],
                },
              });
            }
          }
        },
      });

      if (!data?.createBank) {
        throw new Error("No data returned from create mutation");
      }

      return data.createBank;
    } catch (error) {
      console.error("Error creating bank:", error);
      throw new Error("Failed to create bank");
    }
  },

  async update(bankID: number, input: BankInput): Promise<Bank> {
    try {
      const { data } = await apolloClient.mutate<UpdateBankResponse>({
        mutation: UpdateBankGQL,
        variables: { bankID, input },
        update(cache, { data: mutationData }) {
          if (mutationData?.updateBank) {
            // Update the cache with the updated bank
            cache.modify({
              id: cache.identify({ __typename: "Bank", BankID: bankID }),
              fields: {
                Name: () => mutationData.updateBank?.Name,
                IsActive: () => mutationData.updateBank?.IsActive,
              },
            });
          }
        },
      });

      if (!data?.updateBank) {
        throw new Error("Failed to update bank - no data returned");
      }

      return data.updateBank;
    } catch (error) {
      console.error("Error updating bank:", error);
      throw new Error("Failed to update bank");
    }
  },

  async remove(bankID: number): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate<DeleteBankResponse>({
        mutation: DeleteBankGQL,
        variables: { bankID },
        update(cache) {
          // Remove from cache
          const existingBanks = cache.readQuery<GetAllBanksResponse>({
            query: GetAllBanksGQL,
          });

          if (existingBanks) {
            cache.writeQuery({
              query: GetAllBanksGQL,
              data: {
                allBanks: existingBanks.allBanks.filter(
                  (bank) => bank.BankID !== bankID
                ),
              },
            });
          }
        },
      });

      return data?.deleteBank ?? false;
    } catch (error) {
      console.error("Error deleting bank:", error);
      throw new Error("Failed to delete bank");
    }
  },
};
