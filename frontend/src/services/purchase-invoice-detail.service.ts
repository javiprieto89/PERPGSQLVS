import { apolloClient } from "~/lib/apollo";

// Import GraphQL operations from .graphql files
import CreatePurchaseInvoiceDetailGQL from "~/graphql/mutations/CreatePurchaseInvoiceDetail.graphql";
import DeletePurchaseInvoiceDetailGQL from "~/graphql/mutations/DeletePurchaseInvoiceDetail.graphql";
import UpdatePurchaseInvoiceDetailGQL from "~/graphql/mutations/UpdatePurchaseInvoiceDetail.graphql";
import GetPurchaseInvoiceDetailByIdGQL from "~/graphql/queries/GetPurchaseInvoiceDetailById.graphql";
import GetPurchaseInvoiceDetailsGQL from "~/graphql/queries/GetPurchaseInvoiceDetails.graphql";

export type PurchaseInvoiceDetail = {
  CompanyID: number;
  BranchID: number;
  PurchaseInvoiceID: number;
  PurchaseInvoiceDetailID: number;
  ItemID: number;
  WarehouseID: number;
  Quantity: number;
  UnitPrice: number;
  Notes?: string | null;
};

export type PurchaseInvoiceDetailInput = {
  CompanyID: number;
  BranchID: number;
  PurchaseInvoiceID: number;
  ItemID: number;
  WarehouseID: number;
  Quantity: number;
  UnitPrice: number;
  Notes?: string | null;
};

// Type definitions for GraphQL responses
type GetPurchaseInvoiceDetailsResponse = {
  allPurchaseinvoicedetails: PurchaseInvoiceDetail[];
};

type GetPurchaseInvoiceDetailByIdResponse = {
  purchaseinvoicedetailById: PurchaseInvoiceDetail | null;
};

type CreatePurchaseInvoiceDetailResponse = {
  createPurchaseinvoicedetail: PurchaseInvoiceDetail;
};

type UpdatePurchaseInvoiceDetailResponse = {
  updatePurchaseinvoicedetail: PurchaseInvoiceDetail | null;
};

type DeletePurchaseInvoiceDetailResponse = {
  deletePurchaseinvoicedetail: boolean;
};

// Modern Apollo Client-based service
export const purchaseInvoiceDetailService = {
  async getAll(params: {
    companyID?: number | null;
    branchID?: number | null;
    purchaseInvoiceID?: number | null;
  }): Promise<PurchaseInvoiceDetail[]> {
    try {
      const { data } =
        await apolloClient.query<GetPurchaseInvoiceDetailsResponse>({
          query: GetPurchaseInvoiceDetailsGQL,
          variables: params,
          fetchPolicy: "cache-first",
        });
      return data?.allPurchaseinvoicedetails ?? [];
    } catch (error) {
      console.error("Error fetching purchase invoice details:", error);
      throw new Error("Failed to fetch purchase invoice details");
    }
  },

  async getById(
    companyID: number,
    branchID: number,
    purchaseInvoiceID: number,
    purchaseInvoiceDetailID: number
  ): Promise<PurchaseInvoiceDetail | null> {
    try {
      const { data } =
        await apolloClient.query<GetPurchaseInvoiceDetailByIdResponse>({
          query: GetPurchaseInvoiceDetailByIdGQL,
          variables: {
            companyID,
            branchID,
            purchaseInvoiceID,
            purchaseInvoiceDetailID,
          },
          fetchPolicy: "cache-first",
        });
      return data?.purchaseinvoicedetailById ?? null;
    } catch (error) {
      console.error("Error fetching purchase invoice detail by ID:", error);
      throw new Error("Failed to fetch purchase invoice detail");
    }
  },

  async create(
    input: PurchaseInvoiceDetailInput
  ): Promise<PurchaseInvoiceDetail> {
    try {
      const { data } =
        await apolloClient.mutate<CreatePurchaseInvoiceDetailResponse>({
          mutation: CreatePurchaseInvoiceDetailGQL,
          variables: { input },
          update(cache, { data: mutationData }) {
            if (mutationData?.createPurchaseinvoicedetail) {
              // Update the cache with the new purchase invoice detail
              const existingDetails =
                cache.readQuery<GetPurchaseInvoiceDetailsResponse>({
                  query: GetPurchaseInvoiceDetailsGQL,
                  variables: {
                    companyID:
                      mutationData.createPurchaseinvoicedetail.CompanyID,
                    branchID: mutationData.createPurchaseinvoicedetail.BranchID,
                    purchaseInvoiceID:
                      mutationData.createPurchaseinvoicedetail
                        .PurchaseInvoiceID,
                  },
                });

              if (existingDetails) {
                cache.writeQuery({
                  query: GetPurchaseInvoiceDetailsGQL,
                  variables: {
                    companyID:
                      mutationData.createPurchaseinvoicedetail.CompanyID,
                    branchID: mutationData.createPurchaseinvoicedetail.BranchID,
                    purchaseInvoiceID:
                      mutationData.createPurchaseinvoicedetail
                        .PurchaseInvoiceID,
                  },
                  data: {
                    allPurchaseinvoicedetails: [
                      ...existingDetails.allPurchaseinvoicedetails,
                      mutationData.createPurchaseinvoicedetail,
                    ],
                  },
                });
              }
            }
          },
        });

      if (!data?.createPurchaseinvoicedetail) {
        throw new Error("No data returned from create mutation");
      }

      return data.createPurchaseinvoicedetail;
    } catch (error) {
      console.error("Error creating purchase invoice detail:", error);
      throw new Error("Failed to create purchase invoice detail");
    }
  },

  async update(
    companyID: number,
    branchID: number,
    purchaseInvoiceID: number,
    purchaseInvoiceDetailID: number,
    input: Partial<PurchaseInvoiceDetailInput>
  ): Promise<PurchaseInvoiceDetail> {
    try {
      const { data } =
        await apolloClient.mutate<UpdatePurchaseInvoiceDetailResponse>({
          mutation: UpdatePurchaseInvoiceDetailGQL,
          variables: {
            companyID,
            branchID,
            purchaseInvoiceID,
            purchaseInvoiceDetailID,
            input,
          },
          update(cache, { data: mutationData }) {
            if (mutationData?.updatePurchaseinvoicedetail) {
              // Update the cache with the updated purchase invoice detail
              cache.modify({
                id: cache.identify({
                  __typename: "PurchaseInvoiceDetail",
                  CompanyID: companyID,
                  BranchID: branchID,
                  PurchaseInvoiceID: purchaseInvoiceID,
                  PurchaseInvoiceDetailID: purchaseInvoiceDetailID,
                }),
                fields: {
                  Quantity: () =>
                    mutationData.updatePurchaseinvoicedetail?.Quantity,
                  UnitPrice: () =>
                    mutationData.updatePurchaseinvoicedetail?.UnitPrice,
                  Notes: () => mutationData.updatePurchaseinvoicedetail?.Notes,
                },
              });
            }
          },
        });

      if (!data?.updatePurchaseinvoicedetail) {
        throw new Error(
          "Failed to update purchase invoice detail - no data returned"
        );
      }

      return data.updatePurchaseinvoicedetail;
    } catch (error) {
      console.error("Error updating purchase invoice detail:", error);
      throw new Error("Failed to update purchase invoice detail");
    }
  },

  async remove(
    companyID: number,
    branchID: number,
    purchaseInvoiceID: number,
    purchaseInvoiceDetailID: number
  ): Promise<boolean> {
    try {
      const { data } =
        await apolloClient.mutate<DeletePurchaseInvoiceDetailResponse>({
          mutation: DeletePurchaseInvoiceDetailGQL,
          variables: {
            companyID,
            branchID,
            purchaseInvoiceID,
            purchaseInvoiceDetailID,
          },
          update(cache) {
            // Remove from cache
            const existingDetails =
              cache.readQuery<GetPurchaseInvoiceDetailsResponse>({
                query: GetPurchaseInvoiceDetailsGQL,
                variables: { companyID, branchID, purchaseInvoiceID },
              });

            if (existingDetails) {
              cache.writeQuery({
                query: GetPurchaseInvoiceDetailsGQL,
                variables: { companyID, branchID, purchaseInvoiceID },
                data: {
                  allPurchaseinvoicedetails:
                    existingDetails.allPurchaseinvoicedetails.filter(
                      (detail) =>
                        detail.PurchaseInvoiceDetailID !==
                        purchaseInvoiceDetailID
                    ),
                },
              });
            }
          },
        });

      return data?.deletePurchaseinvoicedetail ?? false;
    } catch (error) {
      console.error("Error deleting purchase invoice detail:", error);
      throw new Error("Failed to delete purchase invoice detail");
    }
  },
};
