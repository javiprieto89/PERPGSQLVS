import { type RmaRecord } from "~/services/rma.service";

export const rmaHelpers = {
  rmaToFormData: (rma: RmaRecord) => ({
    CompanyID: rma.CompanyID,
    BranchID: rma.BranchID,
    RmaTypeID: rma.RmaTypeID,
    WarehouseID: rma.WarehouseID,
    UserID: rma.UserID,
    StatusID: rma.StatusID,
    ClientID: rma.ClientID ?? undefined,
    SupplierID: rma.SupplierID ?? undefined,
    RelatedOrderID: rma.RelatedOrderID ?? undefined,
    RelatedPIID: rma.RelatedPIID ?? undefined,
    PriceListID: rma.PriceListID ?? undefined,
    DocumentID: rma.DocumentID ?? undefined,
    Notes: rma.Notes ?? "",
    Subtotal: rma.Subtotal ?? undefined,
    VatAmount: rma.VatAmount ?? undefined,
    Total: rma.Total ?? undefined,
  }),
};
