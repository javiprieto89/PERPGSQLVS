import { type RmaDetailRecord } from "~/services/rma-detail.service";

export const rmaDetailHelpers = {
  rmaDetailToFormData: (rmaDetail: RmaDetailRecord) => ({
    CompanyID: rmaDetail.CompanyID,
    BranchID: rmaDetail.BranchID,
    RmaID: rmaDetail.RmaID,
    ItemID: rmaDetail.ItemID,
    WarehouseID: rmaDetail.WarehouseID,
    Quantity: rmaDetail.Quantity,
    UnitPrice: rmaDetail.UnitPrice,
    LineDescription: rmaDetail.LineDescription ?? "",
  }),
};
