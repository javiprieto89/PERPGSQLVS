import { apolloClient } from "~/lib/apollo";

// Import GraphQL operations from .graphql files
import CreateCheckMovementGQL from "~/graphql/mutations/CreateCheckMovement.graphql";
import DeleteCheckMovementGQL from "~/graphql/mutations/DeleteCheckMovement.graphql";
import UpdateCheckMovementGQL from "~/graphql/mutations/UpdateCheckMovement.graphql";
import GetAllCheckMovementsGQL from "~/graphql/queries/GetAllCheckMovements.graphql";
import GetCheckMovementByIdGQL from "~/graphql/queries/GetCheckMovementById.graphql";
import GetCheckMovementsByCheckGQL from "~/graphql/queries/GetCheckMovementsByCheck.graphql";
import GetCheckMovementsByCompanyGQL from "~/graphql/queries/GetCheckMovementsByCompany.graphql";

export type CheckMovement = {
  CheckMovementID: number;
  CompanyID: number;
  CheckID: number;
  EventDate: string;
  EventType: string;
  BankAccountID?: number | null;
  BranchID?: number | null;
  TransactionID?: number | null;
  Notes?: string | null;
};

export type CheckMovementInput = {
  CompanyID: number;
  CheckID: number;
  EventDate: string;
  EventType: string;
  BankAccountID?: number | null;
  BranchID?: number | null;
  TransactionID?: number | null;
  Notes?: string | null;
};

type GetAllCheckMovementsResponse = {
  allCheckmovements: CheckMovement[];
};

type GetCheckMovementsByCompanyResponse = {
  checkmovementsByCompany: CheckMovement[];
};

type GetCheckMovementsByCheckResponse = {
  checkmovementsByCheck: CheckMovement[];
};

type GetCheckMovementByIdResponse = {
  checkmovementById: CheckMovement | null;
};

type CreateCheckMovementResponse = {
  createCheckmovement: CheckMovement;
};

type UpdateCheckMovementResponse = {
  updateCheckmovement: CheckMovement | null;
};

type DeleteCheckMovementResponse = {
  deleteCheckmovement: boolean;
};

// Modern Apollo Client-based service
export const checkMovementService = {
  async getAll(): Promise<CheckMovement[]> {
    try {
      const { data } = await apolloClient.query<GetAllCheckMovementsResponse>({
        query: GetAllCheckMovementsGQL,
        fetchPolicy: "cache-first",
      });
      return data?.allCheckmovements ?? [];
    } catch (error) {
      console.error("Error fetching check movements:", error);
      throw new Error("Failed to fetch check movements");
    }
  },

  async getByCompany(companyID: number): Promise<CheckMovement[]> {
    try {
      const { data } =
        await apolloClient.query<GetCheckMovementsByCompanyResponse>({
          query: GetCheckMovementsByCompanyGQL,
          variables: { companyID },
          fetchPolicy: "cache-first",
        });
      return data?.checkmovementsByCompany ?? [];
    } catch (error) {
      console.error("Error fetching check movements by company:", error);
      throw new Error("Failed to fetch check movements by company");
    }
  },

  async getByCheck(
    checkID: number,
    companyID?: number
  ): Promise<CheckMovement[]> {
    try {
      const { data } =
        await apolloClient.query<GetCheckMovementsByCheckResponse>({
          query: GetCheckMovementsByCheckGQL,
          variables: { checkID, companyID },
          fetchPolicy: "cache-first",
        });
      return data?.checkmovementsByCheck ?? [];
    } catch (error) {
      console.error("Error fetching check movements by check:", error);
      throw new Error("Failed to fetch check movements by check");
    }
  },

  async getById(
    checkMovementID: number,
    companyID?: number
  ): Promise<CheckMovement | null> {
    try {
      const { data } = await apolloClient.query<GetCheckMovementByIdResponse>({
        query: GetCheckMovementByIdGQL,
        variables: { checkMovementID, companyID },
        fetchPolicy: "cache-first",
      });
      return data?.checkmovementById ?? null;
    } catch (error) {
      console.error("Error fetching check movement by ID:", error);
      throw new Error("Failed to fetch check movement");
    }
  },

  async create(input: CheckMovementInput): Promise<CheckMovement> {
    try {
      const { data } = await apolloClient.mutate<CreateCheckMovementResponse>({
        mutation: CreateCheckMovementGQL,
        variables: { input },
        update(cache, { data: mutationData }) {
          if (mutationData?.createCheckmovement) {
            // Update the cache with the new check movement
            const existingMovements =
              cache.readQuery<GetAllCheckMovementsResponse>({
                query: GetAllCheckMovementsGQL,
              });

            if (existingMovements) {
              cache.writeQuery({
                query: GetAllCheckMovementsGQL,
                data: {
                  allCheckmovements: [
                    ...existingMovements.allCheckmovements,
                    mutationData.createCheckmovement,
                  ],
                },
              });
            }
          }
        },
      });

      if (!data?.createCheckmovement) {
        throw new Error("No data returned from create mutation");
      }

      return data.createCheckmovement;
    } catch (error) {
      console.error("Error creating check movement:", error);
      throw new Error("Failed to create check movement");
    }
  },

  async update(
    checkMovementID: number,
    input: Partial<CheckMovementInput>,
    companyID?: number
  ): Promise<CheckMovement> {
    try {
      const { data } = await apolloClient.mutate<UpdateCheckMovementResponse>({
        mutation: UpdateCheckMovementGQL,
        variables: { checkMovementID, input, companyID },
        update(cache, { data: mutationData }) {
          if (mutationData?.updateCheckmovement) {
            // Update the cache with the updated check movement
            cache.modify({
              id: cache.identify({
                __typename: "CheckMovement",
                CheckMovementID: checkMovementID,
              }),
              fields: {
                EventDate: () => mutationData.updateCheckmovement?.EventDate,
                EventType: () => mutationData.updateCheckmovement?.EventType,
                Notes: () => mutationData.updateCheckmovement?.Notes,
              },
            });
          }
        },
      });

      if (!data?.updateCheckmovement) {
        throw new Error("Failed to update check movement - no data returned");
      }

      return data.updateCheckmovement;
    } catch (error) {
      console.error("Error updating check movement:", error);
      throw new Error("Failed to update check movement");
    }
  },

  async remove(checkMovementID: number, companyID?: number): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate<DeleteCheckMovementResponse>({
        mutation: DeleteCheckMovementGQL,
        variables: { checkMovementID, companyID },
        update(cache) {
          // Remove from cache
          const existingMovements =
            cache.readQuery<GetAllCheckMovementsResponse>({
              query: GetAllCheckMovementsGQL,
            });

          if (existingMovements) {
            cache.writeQuery({
              query: GetAllCheckMovementsGQL,
              data: {
                allCheckmovements: existingMovements.allCheckmovements.filter(
                  (movement) => movement.CheckMovementID !== checkMovementID
                ),
              },
            });
          }
        },
      });

      return data?.deleteCheckmovement ?? false;
    } catch (error) {
      console.error("Error deleting check movement:", error);
      throw new Error("Failed to delete check movement");
    }
  },
};
