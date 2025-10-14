// frontend/src/features/stock/stockHelpers.ts

import type { BranchesInDb } from "~/graphql/_generated/graphql";
import type { Item } from "./stockTypes";

export const stockHelpers = {
  /**
   * Filter branches by company ID
   */
  filterBranchesByCompany(
    branches: BranchesInDb[],
    companyID: string
  ): BranchesInDb[] {
    if (!companyID) return branches;
    return branches.filter((b) => b.CompanyID === parseInt(companyID));
  },

  /**
   * Get item ID from an item object (handles both formats)
   */
  getItemId(item: Item): number {
    return item.itemID || item.ItemID || 0;
  },

  /**
   * Normalize item object to consistent format
   */
  normalizeItem(item: Item): Item {
    return {
      itemID: item.itemID || item.ItemID,
      ItemID: item.itemID || item.ItemID,
      code: item.code || item.Code,
      Code: item.code || item.Code,
      description: item.description || item.Description,
      Description: item.description || item.Description,
      price: item.price || 0,
      brandName: item.brandName || item.BrandName,
      BrandName: item.brandName || item.BrandName,
      categoryName: item.categoryName,
      subcategoryName: item.subcategoryName,
      supplierName: item.supplierName || item.SupplierName,
      SupplierName: item.supplierName || item.SupplierName,
      oem: item.oem || item.OEM,
      OEM: item.oem || item.OEM,
    };
  },

  /**
   * Create entry data for API
   */
  createEntryData(params: {
    sessionId: string;
    companyID: string;
    branchID: string;
    userId: number;
    itemID: number;
    warehouseId: string;
    quantity: number;
  }) {
    return {
      SessionID: params.sessionId,
      CompanyID: parseInt(params.companyID),
      BranchID: parseInt(params.branchID),
      UserID: params.userId,
      ItemID: params.itemID,
      WarehouseID: parseInt(params.warehouseId),
      Quantity: parseInt(String(params.quantity)),
    };
  },
};
