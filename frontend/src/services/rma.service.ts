import { apolloClient } from "~/lib/apollo";

// Import GraphQL operations from .graphql files
import CreateRmaGQL from "~/graphql/mutations/CreateRma.graphql";
import DeleteRmaGQL from "~/graphql/mutations/DeleteRma.graphql";
import UpdateRmaGQL from "~/graphql/mutations/UpdateRma.graphql";
import GetAllRmasGQL from "~/graphql/queries/GetAllRmas.graphql";
import GetRmaByIdGQL from "~/graphql/queries/GetRmaById.graphql";
import { AuthHelper } from "~/utils/authHelper";

export type RmaRecord = {
  CompanyID: number;
  BranchID: number;
  RmaID: number;
  RmaDate: string;
  RmaTypeID: number;
  ClientID?: number | null;
  SupplierID?: number | null;
  RelatedOrderID?: number | null;
  RelatedPIID?: number | null;
  WarehouseID: number;
  UserID: number;
  PriceListID?: number | null;
  DocumentID?: number | null;
  StatusID: number;
  Notes?: string | null;
  Subtotal?: number | null;
  VatAmount?: number | null;
  Total?: number | null;
};

export type RmaInput = {
  CompanyID: number;
  BranchID: number;
  RmaTypeID: number;
  WarehouseID: number;
  UserID: number;
  StatusID: number;
  ClientID?: number | null;
  SupplierID?: number | null;
  RelatedOrderID?: number | null;
  RelatedPIID?: number | null;
  PriceListID?: number | null;
  DocumentID?: number | null;
  Notes?: string | null;
  Subtotal?: number | null;
  VatAmount?: number | null;
  Total?: number | null;
};

export type RMAFilter = {
  CompanyID?: number | null;
  BranchID?: number | null;
  RmaTypeID?: number | null;
  StatusID?: number | null;
  UserID?: number | null;
  ClientID?: number | null;
  SupplierID?: number | null;
};

// Type definitions for GraphQL responses
type GetAllRmasResponse = {
  allRmas: RmaRecord[];
};

type GetRmaByIdResponse = {
  rmaById: RmaRecord | null;
};

type CreateRmaResponse = {
  createRma: RmaRecord;
};

type UpdateRmaResponse = {
  updateRma: RmaRecord | null;
};

type DeleteRmaResponse = {
  deleteRma: boolean;
};

// Modern Apollo Client-based service
export const rmaService = {
  async getAll(filter?: RMAFilter): Promise<RmaRecord[]> {
    try {
      const { data } = await apolloClient.query<GetAllRmasResponse>({
        query: GetAllRmasGQL,
        variables: {
          CompanyID: AuthHelper.getSelectedAccess()?.CompanyID,
          ...filter,
        },
        fetchPolicy: "cache-first",
      });
      return data?.allRmas ?? [];
    } catch (error) {
      console.error("Error fetching RMAs:", error);
      throw new Error("Failed to fetch RMAs");
    }
  },

  async getById(
    companyID: number,
    branchID: number,
    rmaID: number
  ): Promise<RmaRecord | null> {
    try {
      const { data } = await apolloClient.query<GetRmaByIdResponse>({
        query: GetRmaByIdGQL,
        variables: { companyID, branchID, rmaID },
        fetchPolicy: "cache-first",
      });
      return data?.rmaById ?? null;
    } catch (error) {
      console.error("Error fetching RMA by ID:", error);
      throw new Error("Failed to fetch RMA");
    }
  },

  async create(input: RmaInput): Promise<RmaRecord> {
    try {
      const { data } = await apolloClient.mutate<CreateRmaResponse>({
        mutation: CreateRmaGQL,
        variables: { input },
        update(cache, { data: mutationData }) {
          if (mutationData?.createRma) {
            // Update the cache with the new RMA
            const existingRmas = cache.readQuery<GetAllRmasResponse>({
              query: GetAllRmasGQL,
              variables: {
                filter: {
                  CompanyID: mutationData.createRma.CompanyID,
                  BranchID: mutationData.createRma.BranchID,
                },
              },
            });

            if (existingRmas) {
              cache.writeQuery({
                query: GetAllRmasGQL,
                variables: {
                  filter: {
                    CompanyID: mutationData.createRma.CompanyID,
                    BranchID: mutationData.createRma.BranchID,
                  },
                },
                data: {
                  allRmas: [...existingRmas.allRmas, mutationData.createRma],
                },
              });
            }
          }
        },
      });

      if (!data?.createRma) {
        throw new Error("No data returned from create mutation");
      }

      return data.createRma;
    } catch (error) {
      console.error("Error creating RMA:", error);
      throw new Error("Failed to create RMA");
    }
  },

  async update(
    companyID: number,
    branchID: number,
    rmaID: number,
    input: Partial<RmaInput>
  ): Promise<RmaRecord> {
    try {
      const { data } = await apolloClient.mutate<UpdateRmaResponse>({
        mutation: UpdateRmaGQL,
        variables: { companyID, branchID, rmaID, input },
        update(cache, { data: mutationData }) {
          if (mutationData?.updateRma) {
            // Update the cache with the updated RMA
            cache.modify({
              id: cache.identify({
                __typename: "Rma",
                CompanyID: companyID,
                BranchID: branchID,
                RmaID: rmaID,
              }),
              fields: {
                StatusID: () => mutationData.updateRma?.StatusID,
                Notes: () => mutationData.updateRma?.Notes,
                Subtotal: () => mutationData.updateRma?.Subtotal,
                VatAmount: () => mutationData.updateRma?.VatAmount,
                Total: () => mutationData.updateRma?.Total,
              },
            });
          }
        },
      });

      if (!data?.updateRma) {
        throw new Error("Failed to update RMA - no data returned");
      }

      return data.updateRma;
    } catch (error) {
      console.error("Error updating RMA:", error);
      throw new Error("Failed to update RMA");
    }
  },

  async remove(
    companyID: number,
    branchID: number,
    rmaID: number
  ): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate<DeleteRmaResponse>({
        mutation: DeleteRmaGQL,
        variables: { companyID, branchID, rmaID },
        update(cache) {
          // Remove from cache
          const existingRmas = cache.readQuery<GetAllRmasResponse>({
            query: GetAllRmasGQL,
            variables: { filter: { CompanyID: companyID, BranchID: branchID } },
          });

          if (existingRmas) {
            cache.writeQuery({
              query: GetAllRmasGQL,
              variables: {
                filter: { CompanyID: companyID, BranchID: branchID },
              },
              data: {
                allRmas: existingRmas.allRmas.filter(
                  (rma) => rma.RmaID !== rmaID
                ),
              },
            });
          }
        },
      });

      return data?.deleteRma ?? false;
    } catch (error) {
      console.error("Error deleting RMA:", error);
      throw new Error("Failed to delete RMA");
    }
  },
};
