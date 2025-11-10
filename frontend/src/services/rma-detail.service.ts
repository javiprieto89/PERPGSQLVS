import { apolloClient } from "~/lib/apollo";

// Import GraphQL operations from .graphql files
import CreateRmaDetailGQL from "~/graphql/mutations/CreateRmaDetail.graphql";
import DeleteRmaDetailGQL from "~/graphql/mutations/DeleteRmaDetail.graphql";
import UpdateRmaDetailGQL from "~/graphql/mutations/UpdateRmaDetail.graphql";
import GetAllRmaDetailsGQL from "~/graphql/queries/GetAllRmaDetails.graphql";
import GetRmaDetailByIdGQL from "~/graphql/queries/GetRmaDetailById.graphql";

export type RmaDetailRecord = {
  CompanyID: number;
  BranchID: number;
  RmaID: number;
  RmaDetailID: number;
  ItemID: number;
  WarehouseID: number;
  Quantity: number;
  UnitPrice: number;
  LineDescription?: string | null;
  LastModified: string;
};

export type RmaDetailInput = {
  CompanyID: number;
  BranchID: number;
  RmaID: number;
  ItemID: number;
  WarehouseID: number;
  Quantity: number;
  UnitPrice: number;
  LineDescription?: string | null;
};

export type RmaDetailFilter = {
  CompanyID?: number | null;
  BranchID?: number | null;
  RmaID?: number | null;
  ItemID?: number | null;
};

// Type definitions for GraphQL responses
type GetAllRmaDetailsResponse = {
  allRmaDetails: RmaDetailRecord[];
};

type GetRmaDetailByIdResponse = {
  rmaDetailById: RmaDetailRecord | null;
};

type CreateRmaDetailResponse = {
  createRmaDetail: RmaDetailRecord;
};

type UpdateRmaDetailResponse = {
  updateRmaDetail: RmaDetailRecord | null;
};

type DeleteRmaDetailResponse = {
  deleteRmaDetail: boolean;
};

// Modern Apollo Client-based service
export const rmaDetailService = {
  async getAll(filter?: RmaDetailFilter): Promise<RmaDetailRecord[]> {
    try {
      const { data } = await apolloClient.query<GetAllRmaDetailsResponse>({
        query: GetAllRmaDetailsGQL,
        variables: { filter },
        fetchPolicy: "cache-first",
      });
      return data?.allRmaDetails ?? [];
    } catch (error) {
      console.error("Error fetching RMA details:", error);
      throw new Error("Failed to fetch RMA details");
    }
  },

  async getById(
    companyID: number,
    branchID: number,
    rmaID: number,
    rmaDetailID: number
  ): Promise<RmaDetailRecord | null> {
    try {
      const { data } = await apolloClient.query<GetRmaDetailByIdResponse>({
        query: GetRmaDetailByIdGQL,
        variables: { companyID, branchID, rmaID, rmaDetailID },
        fetchPolicy: "cache-first",
      });
      return data?.rmaDetailById ?? null;
    } catch (error) {
      console.error("Error fetching RMA detail by ID:", error);
      throw new Error("Failed to fetch RMA detail");
    }
  },

  async create(input: RmaDetailInput): Promise<RmaDetailRecord> {
    try {
      const { data } = await apolloClient.mutate<CreateRmaDetailResponse>({
        mutation: CreateRmaDetailGQL,
        variables: { input },
        update(cache, { data: mutationData }) {
          if (mutationData?.createRmaDetail) {
            // Update the cache with the new RMA detail
            const existingDetails = cache.readQuery<GetAllRmaDetailsResponse>({
              query: GetAllRmaDetailsGQL,
              variables: {
                filter: {
                  CompanyID: mutationData.createRmaDetail.CompanyID,
                  BranchID: mutationData.createRmaDetail.BranchID,
                  RmaID: mutationData.createRmaDetail.RmaID,
                },
              },
            });

            if (existingDetails) {
              cache.writeQuery({
                query: GetAllRmaDetailsGQL,
                variables: {
                  filter: {
                    CompanyID: mutationData.createRmaDetail.CompanyID,
                    BranchID: mutationData.createRmaDetail.BranchID,
                    RmaID: mutationData.createRmaDetail.RmaID,
                  },
                },
                data: {
                  allRmaDetails: [
                    ...existingDetails.allRmaDetails,
                    mutationData.createRmaDetail,
                  ],
                },
              });
            }
          }
        },
      });

      if (!data?.createRmaDetail) {
        throw new Error("No data returned from create mutation");
      }

      return data.createRmaDetail;
    } catch (error) {
      console.error("Error creating RMA detail:", error);
      throw new Error("Failed to create RMA detail");
    }
  },

  async update(
    companyID: number,
    branchID: number,
    rmaID: number,
    rmaDetailID: number,
    input: Partial<RmaDetailInput>
  ): Promise<RmaDetailRecord> {
    try {
      const { data } = await apolloClient.mutate<UpdateRmaDetailResponse>({
        mutation: UpdateRmaDetailGQL,
        variables: { companyID, branchID, rmaID, rmaDetailID, input },
        update(cache, { data: mutationData }) {
          if (mutationData?.updateRmaDetail) {
            // Update the cache with the updated RMA detail
            cache.modify({
              id: cache.identify({
                __typename: "RmaDetail",
                CompanyID: companyID,
                BranchID: branchID,
                RmaID: rmaID,
                RmaDetailID: rmaDetailID,
              }),
              fields: {
                Quantity: () => mutationData.updateRmaDetail?.Quantity,
                UnitPrice: () => mutationData.updateRmaDetail?.UnitPrice,
                LineDescription: () =>
                  mutationData.updateRmaDetail?.LineDescription,
                LastModified: () => mutationData.updateRmaDetail?.LastModified,
              },
            });
          }
        },
      });

      if (!data?.updateRmaDetail) {
        throw new Error("Failed to update RMA detail - no data returned");
      }

      return data.updateRmaDetail;
    } catch (error) {
      console.error("Error updating RMA detail:", error);
      throw new Error("Failed to update RMA detail");
    }
  },

  async remove(
    companyID: number,
    branchID: number,
    rmaID: number,
    rmaDetailID: number
  ): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate<DeleteRmaDetailResponse>({
        mutation: DeleteRmaDetailGQL,
        variables: { companyID, branchID, rmaID, rmaDetailID },
        update(cache) {
          // Remove from cache
          const existingDetails = cache.readQuery<GetAllRmaDetailsResponse>({
            query: GetAllRmaDetailsGQL,
            variables: {
              filter: {
                CompanyID: companyID,
                BranchID: branchID,
                RmaID: rmaID,
              },
            },
          });

          if (existingDetails) {
            cache.writeQuery({
              query: GetAllRmaDetailsGQL,
              variables: {
                filter: {
                  CompanyID: companyID,
                  BranchID: branchID,
                  RmaID: rmaID,
                },
              },
              data: {
                allRmaDetails: existingDetails.allRmaDetails.filter(
                  (detail) => detail.RmaDetailID !== rmaDetailID
                ),
              },
            });
          }
        },
      });

      return data?.deleteRmaDetail ?? false;
    } catch (error) {
      console.error("Error deleting RMA detail:", error);
      throw new Error("Failed to delete RMA detail");
    }
  },
};
