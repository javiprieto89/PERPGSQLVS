import { type CompanyInDb } from "~/graphql/_generated/graphql";

// frontend/src/features/stock/stockTypes.ts

import {
  type BranchesInDb,
  type WarehousesInDb,
} from "~/graphql/_generated/graphql";

export type Warehouse = WarehousesInDb;

export type Company = CompanyInDb;

export interface Branch extends BranchesInDb {
  BranchID: number;
  CompanyID: number;
  BranchName: string;
}

export interface Item {
  itemID?: number;
  ItemID?: number;
  code?: string;
  Code?: string;
  description?: string;
  Description?: string;
  price?: number;
  brandName?: string;
  BrandName?: string;
  categoryName?: string;
  subcategoryName?: string;
  supplierName?: string;
  SupplierName?: string;
  oem?: string;
  OEM?: string;
}

export interface TempStockEntry {
  TempStockEntryID: number;
  SessionID: string;
  CompanyID: number;
  BranchID: number;
  UserID: number;
  ItemID: number;
  WarehouseID: number;
  Quantity: number;
}

export interface StockEntryDetails {
  warehouseId: string;
  quantity: number;
}

export interface StockEntryFormState {
  sessionId: string;
  warehouses: Warehouse[];
  companies: Company[];
  branches: Branch[];
  entries: TempStockEntry[];
  showItemSearch: boolean;
  showItemConfirm: boolean;
  selectedItem: Item | null;
  companyID: string;
  branchID: string;
  showCompanyModal: boolean;
  showBranchModal: boolean;
  quantity: number;
  loading: boolean;
  error: string | null;
}
