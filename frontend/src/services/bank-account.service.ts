import { apolloClient } from "~/lib/apollo";

// Import GraphQL operations from .graphql files
import CreateBankAccountGQL from "~/graphql/mutations/CreateBankAccount.graphql";
import DeleteBankAccountGQL from "~/graphql/mutations/DeleteBankAccount.graphql";
import UpdateBankAccountGQL from "~/graphql/mutations/UpdateBankAccount.graphql";
import GetAllBankAccountsGQL from "~/graphql/queries/GetAllBankAccounts.graphql";
import GetBankAccountByIdGQL from "~/graphql/queries/GetBankAccountById.graphql";
import GetBankAccountsByCompanyGQL from "~/graphql/queries/GetBankAccountsByCompany.graphql";

export type BankAccount = {
  BankAccountID: number;
  CompanyID: number;
  BankID: number;
  AccountNumber: string;
  CurrencyID: number;
  Alias?: string | null;
  IsActive: boolean;
};

export type BankAccountInput = {
  CompanyID: number;
  BankID: number;
  AccountNumber: string;
  CurrencyID: number;
  Alias?: string | null;
  IsActive?: boolean;
};

// Type definitions for GraphQL responses
type GetAllBankAccountsResponse = {
  allBankaccounts: BankAccount[];
};

type GetBankAccountsByCompanyResponse = {
  bankaccountsByCompany: BankAccount[];
};

type GetBankAccountByIdResponse = {
  bankaccountById: BankAccount | null;
};

type CreateBankAccountResponse = {
  createBankaccount: BankAccount;
};

type UpdateBankAccountResponse = {
  updateBankaccount: BankAccount | null;
};

type DeleteBankAccountResponse = {
  deleteBankaccount: boolean;
};

// Modern Apollo Client-based service
export const bankAccountService = {
  async getAll(): Promise<BankAccount[]> {
    try {
      const { data } = await apolloClient.query<GetAllBankAccountsResponse>({
        query: GetAllBankAccountsGQL,
        fetchPolicy: "cache-first",
      });
      return data?.allBankaccounts ?? [];
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
      throw new Error("Failed to fetch bank accounts");
    }
  },

  async getByCompany(companyID: number): Promise<BankAccount[]> {
    try {
      const { data } =
        await apolloClient.query<GetBankAccountsByCompanyResponse>({
          query: GetBankAccountsByCompanyGQL,
          variables: { companyID },
          fetchPolicy: "cache-first",
        });
      return data?.bankaccountsByCompany ?? [];
    } catch (error) {
      console.error("Error fetching bank accounts by company:", error);
      throw new Error("Failed to fetch bank accounts by company");
    }
  },

  async getById(
    bankAccountID: number,
    companyID?: number
  ): Promise<BankAccount | null> {
    try {
      const { data } = await apolloClient.query<GetBankAccountByIdResponse>({
        query: GetBankAccountByIdGQL,
        variables: { bankAccountID, companyID },
        fetchPolicy: "cache-first",
      });
      return data?.bankaccountById ?? null;
    } catch (error) {
      console.error("Error fetching bank account by ID:", error);
      throw new Error("Failed to fetch bank account");
    }
  },

  async create(input: BankAccountInput): Promise<BankAccount> {
    try {
      const { data } = await apolloClient.mutate<CreateBankAccountResponse>({
        mutation: CreateBankAccountGQL,
        variables: { input },
        update(cache, { data: mutationData }) {
          if (mutationData?.createBankaccount) {
            // Update the cache with the new bank account
            const existingAccounts =
              cache.readQuery<GetAllBankAccountsResponse>({
                query: GetAllBankAccountsGQL,
              });

            if (existingAccounts) {
              cache.writeQuery({
                query: GetAllBankAccountsGQL,
                data: {
                  allBankaccounts: [
                    ...existingAccounts.allBankaccounts,
                    mutationData.createBankaccount,
                  ],
                },
              });
            }
          }
        },
      });

      if (!data?.createBankaccount) {
        throw new Error("No data returned from create mutation");
      }

      return data.createBankaccount;
    } catch (error) {
      console.error("Error creating bank account:", error);
      throw new Error("Failed to create bank account");
    }
  },

  async update(
    bankAccountID: number,
    input: Partial<BankAccountInput>,
    companyID?: number
  ): Promise<BankAccount> {
    try {
      const { data } = await apolloClient.mutate<UpdateBankAccountResponse>({
        mutation: UpdateBankAccountGQL,
        variables: { bankAccountID, input, companyID },
        update(cache, { data: mutationData }) {
          if (mutationData?.updateBankaccount) {
            // Update the cache with the updated bank account
            cache.modify({
              id: cache.identify({
                __typename: "BankAccount",
                BankAccountID: bankAccountID,
              }),
              fields: {
                AccountNumber: () =>
                  mutationData.updateBankaccount?.AccountNumber,
                Alias: () => mutationData.updateBankaccount?.Alias,
                IsActive: () => mutationData.updateBankaccount?.IsActive,
                // Update other fields as needed
              },
            });
          }
        },
      });

      if (!data?.updateBankaccount) {
        throw new Error("Failed to update bank account - no data returned");
      }

      return data.updateBankaccount;
    } catch (error) {
      console.error("Error updating bank account:", error);
      throw new Error("Failed to update bank account");
    }
  },

  async remove(bankAccountID: number, companyID?: number): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate<DeleteBankAccountResponse>({
        mutation: DeleteBankAccountGQL,
        variables: { bankAccountID, companyID },
        update(cache) {
          // Remove from cache
          const existingAccounts = cache.readQuery<GetAllBankAccountsResponse>({
            query: GetAllBankAccountsGQL,
          });

          if (existingAccounts) {
            cache.writeQuery({
              query: GetAllBankAccountsGQL,
              data: {
                allBankaccounts: existingAccounts.allBankaccounts.filter(
                  (account) => account.BankAccountID !== bankAccountID
                ),
              },
            });
          }
        },
      });

      return data?.deleteBankaccount ?? false;
    } catch (error) {
      console.error("Error deleting bank account:", error);
      throw new Error("Failed to delete bank account");
    }
  },
};
