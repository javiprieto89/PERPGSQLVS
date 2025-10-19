import { apolloClient } from "~/lib/apollo";

// Import GraphQL operations from .graphql files
import CreateCheckGQL from "~/graphql/mutations/CreateCheck.graphql";
import DeleteCheckGQL from "~/graphql/mutations/DeleteCheck.graphql";
import UpdateCheckGQL from "~/graphql/mutations/UpdateCheck.graphql";
import GetAllChecksGQL from "~/graphql/queries/GetAllChecks.graphql";
import GetCheckByIdGQL from "~/graphql/queries/GetCheckById.graphql";
import GetChecksByCompanyGQL from "~/graphql/queries/GetChecksByCompany.graphql";

export type CheckRecord = {
  CheckID: number;
  CompanyID: number;
  Number: string;
  CurrencyID: number;
  Amount: number;
  IssueDate: string;
  DueDate?: string | null;
  BankID?: number | null;
  DrawerName?: string | null;
  HolderName?: string | null;
  CheckStatusID?: number | null;
};

export type CheckInput = {
  CompanyID: number;
  Number: string;
  CurrencyID: number;
  Amount: number;
  IssueDate: string;
  DueDate?: string | null;
  BankID?: number | null;
  DrawerName?: string | null;
  HolderName?: string | null;
  CheckStatusID?: number | null;
};

// Type definitions for GraphQL responses
type GetAllChecksResponse = {
  allChecks: CheckRecord[];
};

type GetChecksByCompanyResponse = {
  checksByCompany: CheckRecord[];
};

type GetCheckByIdResponse = {
  checkById: CheckRecord | null;
};

type CreateCheckResponse = {
  createCheck: CheckRecord;
};

type UpdateCheckResponse = {
  updateCheck: CheckRecord | null;
};

type DeleteCheckResponse = {
  deleteCheck: boolean;
};

// Modern Apollo Client-based service
export const checkService = {
  async getAll(): Promise<CheckRecord[]> {
    try {
      const { data } = await apolloClient.query<GetAllChecksResponse>({
        query: GetAllChecksGQL,
        fetchPolicy: "cache-first",
      });
      return data?.allChecks ?? [];
    } catch (error) {
      console.error("Error fetching checks:", error);
      throw new Error("Failed to fetch checks");
    }
  },

  async getByCompany(companyID: number): Promise<CheckRecord[]> {
    try {
      const { data } = await apolloClient.query<GetChecksByCompanyResponse>({
        query: GetChecksByCompanyGQL,
        variables: { companyID },
        fetchPolicy: "cache-first",
      });
      return data?.checksByCompany ?? [];
    } catch (error) {
      console.error("Error fetching checks by company:", error);
      throw new Error("Failed to fetch checks by company");
    }
  },

  async getById(
    checkID: number,
    companyID?: number
  ): Promise<CheckRecord | null> {
    try {
      const { data } = await apolloClient.query<GetCheckByIdResponse>({
        query: GetCheckByIdGQL,
        variables: { checkID, companyID },
        fetchPolicy: "cache-first",
      });
      return data?.checkById ?? null;
    } catch (error) {
      console.error("Error fetching check by ID:", error);
      throw new Error("Failed to fetch check");
    }
  },

  async create(input: CheckInput): Promise<CheckRecord> {
    try {
      const { data } = await apolloClient.mutate<CreateCheckResponse>({
        mutation: CreateCheckGQL,
        variables: { input },
        update(cache, { data: mutationData }) {
          if (mutationData?.createCheck) {
            // Update the cache with the new check
            const existingChecks = cache.readQuery<GetAllChecksResponse>({
              query: GetAllChecksGQL,
            });

            if (existingChecks) {
              cache.writeQuery({
                query: GetAllChecksGQL,
                data: {
                  allChecks: [
                    ...existingChecks.allChecks,
                    mutationData.createCheck,
                  ],
                },
              });
            }
          }
        },
      });

      if (!data?.createCheck) {
        throw new Error("No data returned from create mutation");
      }

      return data.createCheck;
    } catch (error) {
      console.error("Error creating check:", error);
      throw new Error("Failed to create check");
    }
  },

  async update(
    checkID: number,
    input: Partial<CheckInput>,
    companyID?: number
  ): Promise<CheckRecord> {
    try {
      const { data } = await apolloClient.mutate<UpdateCheckResponse>({
        mutation: UpdateCheckGQL,
        variables: { checkID, input, companyID },
        update(cache, { data: mutationData }) {
          if (mutationData?.updateCheck) {
            // Update the cache with the updated check
            cache.modify({
              id: cache.identify({ __typename: "Check", CheckID: checkID }),
              fields: {
                Number: () => mutationData.updateCheck?.Number,
                Amount: () => mutationData.updateCheck?.Amount,
                IssueDate: () => mutationData.updateCheck?.IssueDate,
                DueDate: () => mutationData.updateCheck?.DueDate,
                DrawerName: () => mutationData.updateCheck?.DrawerName,
                HolderName: () => mutationData.updateCheck?.HolderName,
              },
            });
          }
        },
      });

      if (!data?.updateCheck) {
        throw new Error("Failed to update check - no data returned");
      }

      return data.updateCheck;
    } catch (error) {
      console.error("Error updating check:", error);
      throw new Error("Failed to update check");
    }
  },

  async remove(checkID: number, companyID?: number): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate<DeleteCheckResponse>({
        mutation: DeleteCheckGQL,
        variables: { checkID, companyID },
        update(cache) {
          // Remove from cache
          const existingChecks = cache.readQuery<GetAllChecksResponse>({
            query: GetAllChecksGQL,
          });

          if (existingChecks) {
            cache.writeQuery({
              query: GetAllChecksGQL,
              data: {
                allChecks: existingChecks.allChecks.filter(
                  (check) => check.CheckID !== checkID
                ),
              },
            });
          }
        },
      });

      return data?.deleteCheck ?? false;
    } catch (error) {
      console.error("Error deleting check:", error);
      throw new Error("Failed to delete check");
    }
  },
};
