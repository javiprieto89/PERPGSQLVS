import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AccountBalancesInDb = {
  __typename?: 'AccountBalancesInDB';
  AccountID: Scalars['Int']['output'];
  Balance: Scalars['Float']['output'];
  ClientID?: Maybe<Scalars['Int']['output']>;
  SupplierID?: Maybe<Scalars['Int']['output']>;
};

export type AddItemToOrderInput = {
  Description: Scalars['String']['input'];
  ItemID: Scalars['Int']['input'];
  OrderID: Scalars['Int']['input'];
  Quantity: Scalars['Int']['input'];
  SessionID?: InputMaybe<Scalars['String']['input']>;
  UnitPrice: Scalars['Float']['input'];
  WarehouseID?: InputMaybe<Scalars['Int']['input']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type BranchesCreate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  CompanyID: Scalars['Int']['input'];
  Logo?: InputMaybe<Scalars['String']['input']>;
  Name: Scalars['String']['input'];
  Phone?: InputMaybe<Scalars['String']['input']>;
};

export type BranchesInDb = {
  __typename?: 'BranchesInDB';
  Address?: Maybe<Scalars['String']['output']>;
  BranchID: Scalars['Int']['output'];
  CompanyData?: Maybe<CompanyDataInDb>;
  CompanyID: Scalars['Int']['output'];
  Logo?: Maybe<Scalars['String']['output']>;
  Name: Scalars['String']['output'];
  Phone?: Maybe<Scalars['String']['output']>;
};

export type BranchesUpdate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  Bame?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  Logo?: InputMaybe<Scalars['String']['input']>;
  Phone?: InputMaybe<Scalars['String']['input']>;
};

export type BrandsCreate = {
  CompanyID: Scalars['Int']['input'];
  IsActive?: Scalars['Boolean']['input'];
  Name: Scalars['String']['input'];
};

export type BrandsInDb = {
  __typename?: 'BrandsInDB';
  BrandID: Scalars['Int']['output'];
  CompanyData?: Maybe<CompanyDataInDb>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
  IsActive?: Maybe<Scalars['Boolean']['output']>;
  Name: Scalars['String']['output'];
};

export type BrandsUpdate = {
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
};

export type CarBrandsCreate = {
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  Name: Scalars['String']['input'];
};

export type CarBrandsInDb = {
  __typename?: 'CarBrandsInDB';
  CarBrandID: Scalars['Int']['output'];
  CompanyID?: Maybe<Scalars['Int']['output']>;
  Name: Scalars['String']['output'];
};

export type CarBrandsUpdate = {
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
};

export type CarModelsCreate = {
  CarBrandID: Scalars['Int']['input'];
  Model: Scalars['String']['input'];
};

export type CarModelsInDb = {
  __typename?: 'CarModelsInDB';
  CarBrandData?: Maybe<CarBrandsInDb>;
  CarBrandID: Scalars['Int']['output'];
  CarModelID: Scalars['Int']['output'];
  Model: Scalars['String']['output'];
};

export type CarModelsUpdate = {
  CarBrandID?: InputMaybe<Scalars['Int']['input']>;
  Model?: InputMaybe<Scalars['String']['input']>;
};

export type CarsCreate = {
  CarModelID: Scalars['Int']['input'];
  ClientID: Scalars['Int']['input'];
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  DiscountID: Scalars['Int']['input'];
  IsDebtor?: InputMaybe<Scalars['Boolean']['input']>;
  LastServiceMileage?: InputMaybe<Scalars['Int']['input']>;
  LicensePlate: Scalars['String']['input'];
  Year?: InputMaybe<Scalars['Int']['input']>;
};

export type CarsInDb = {
  __typename?: 'CarsInDB';
  CarBrandData?: Maybe<CarBrandsInDb>;
  CarID: Scalars['Int']['output'];
  CarModelData?: Maybe<CarModelsInDb>;
  CarModelID: Scalars['Int']['output'];
  ClientData?: Maybe<ClientsInDb>;
  ClientID: Scalars['Int']['output'];
  CompanyData?: Maybe<CompanyDataInDb>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
  DiscountData?: Maybe<DiscountsInDb>;
  DiscountID: Scalars['Int']['output'];
  IsDebtor?: Maybe<Scalars['Boolean']['output']>;
  LastServiceMileage?: Maybe<Scalars['Int']['output']>;
  LicensePlate: Scalars['String']['output'];
  Year?: Maybe<Scalars['Int']['output']>;
};

export type CarsUpdate = {
  CarModelID?: InputMaybe<Scalars['Int']['input']>;
  ClientID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  DiscountID?: InputMaybe<Scalars['Int']['input']>;
  IsDebtor?: InputMaybe<Scalars['Boolean']['input']>;
  LastServiceMileage?: InputMaybe<Scalars['Int']['input']>;
  LicensePlate?: InputMaybe<Scalars['String']['input']>;
  Year?: InputMaybe<Scalars['Int']['input']>;
};

export type CashBoxMovementsCreate = {
  Amount: Scalars['Float']['input'];
  BranchID: Scalars['Int']['input'];
  CashBoxID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  Description?: InputMaybe<Scalars['String']['input']>;
  MovementType: Scalars['String']['input'];
  Notes?: InputMaybe<Scalars['String']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
};

export type CashBoxMovementsInDb = {
  __typename?: 'CashBoxMovementsInDB';
  Amount: Scalars['Float']['output'];
  BranchID: Scalars['Int']['output'];
  CashBoxID: Scalars['Int']['output'];
  CashBoxMovementID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  Description?: Maybe<Scalars['String']['output']>;
  MovementDate: Scalars['DateTime']['output'];
  MovementType: Scalars['String']['output'];
  Notes?: Maybe<Scalars['String']['output']>;
  UserID?: Maybe<Scalars['Int']['output']>;
};

export type CashBoxMovementsUpdate = {
  Amount?: InputMaybe<Scalars['Float']['input']>;
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CashBoxID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  Description?: InputMaybe<Scalars['String']['input']>;
  MovementType?: InputMaybe<Scalars['String']['input']>;
  Notes?: InputMaybe<Scalars['String']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
};

export type CashBoxesCreate = {
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  Description?: InputMaybe<Scalars['String']['input']>;
  Name: Scalars['String']['input'];
  Notes?: InputMaybe<Scalars['String']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
};

export type CashBoxesInDb = {
  __typename?: 'CashBoxesInDB';
  BranchID: Scalars['Int']['output'];
  CashBoxID: Scalars['Int']['output'];
  CloseDate?: Maybe<Scalars['DateTime']['output']>;
  CompanyID: Scalars['Int']['output'];
  CurrentBalance: Scalars['Float']['output'];
  Description?: Maybe<Scalars['String']['output']>;
  InitialBalance: Scalars['Float']['output'];
  IsActive: Scalars['Boolean']['output'];
  Name: Scalars['String']['output'];
  Notes?: Maybe<Scalars['String']['output']>;
  OpenDate?: Maybe<Scalars['DateTime']['output']>;
  UserID?: Maybe<Scalars['Int']['output']>;
};

export type CashBoxesUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CloseDate?: InputMaybe<Scalars['DateTime']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  CurrentBalance?: InputMaybe<Scalars['Float']['input']>;
  Description?: InputMaybe<Scalars['String']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
  Notes?: InputMaybe<Scalars['String']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
};

export type ClientsCreate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  City?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  CountryID: Scalars['Int']['input'];
  DocNumber?: InputMaybe<Scalars['String']['input']>;
  DocTypeID: Scalars['Int']['input'];
  Email?: InputMaybe<Scalars['String']['input']>;
  FirstName: Scalars['String']['input'];
  IsActive?: Scalars['Boolean']['input'];
  LastName?: InputMaybe<Scalars['String']['input']>;
  Phone?: InputMaybe<Scalars['String']['input']>;
  PostalCode?: InputMaybe<Scalars['String']['input']>;
  PriceListID: Scalars['Int']['input'];
  ProvinceID: Scalars['Int']['input'];
  VendorID?: Scalars['Int']['input'];
};

export type ClientsInDb = {
  __typename?: 'ClientsInDB';
  Address?: Maybe<Scalars['String']['output']>;
  BranchData?: Maybe<BranchesInDb>;
  BranchID?: Maybe<Scalars['Int']['output']>;
  City?: Maybe<Scalars['String']['output']>;
  ClientID: Scalars['Int']['output'];
  CompanyData?: Maybe<CompanyDataInDb>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
  CountryID: Scalars['Int']['output'];
  CountryName?: Maybe<Scalars['String']['output']>;
  DocNumber?: Maybe<Scalars['String']['output']>;
  DocTypeID: Scalars['Int']['output'];
  DocTypeName?: Maybe<Scalars['String']['output']>;
  Email?: Maybe<Scalars['String']['output']>;
  FirstName: Scalars['String']['output'];
  IsActive: Scalars['Boolean']['output'];
  LastName?: Maybe<Scalars['String']['output']>;
  Phone?: Maybe<Scalars['String']['output']>;
  PostalCode?: Maybe<Scalars['String']['output']>;
  PriceListID: Scalars['Int']['output'];
  PriceListName?: Maybe<Scalars['String']['output']>;
  ProvinceID: Scalars['Int']['output'];
  ProvinceName?: Maybe<Scalars['String']['output']>;
  VendorID: Scalars['Int']['output'];
  VendorName?: Maybe<Scalars['String']['output']>;
};

export type ClientsUpdate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  City?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  CountryID?: InputMaybe<Scalars['Int']['input']>;
  DocNumber?: InputMaybe<Scalars['String']['input']>;
  DocTypeID?: InputMaybe<Scalars['Int']['input']>;
  Email?: InputMaybe<Scalars['String']['input']>;
  FirstName?: InputMaybe<Scalars['String']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  LastName?: InputMaybe<Scalars['String']['input']>;
  Phone?: InputMaybe<Scalars['String']['input']>;
  PostalCode?: InputMaybe<Scalars['String']['input']>;
  PriceListID?: InputMaybe<Scalars['Int']['input']>;
  ProvinceID?: InputMaybe<Scalars['Int']['input']>;
  VendorID?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyDataCreate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  CUIT?: InputMaybe<Scalars['String']['input']>;
  Grossincome?: InputMaybe<Scalars['String']['input']>;
  Logo?: InputMaybe<Scalars['String']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
  Startdate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CompanyDataInDb = {
  __typename?: 'CompanyDataInDB';
  Address?: Maybe<Scalars['String']['output']>;
  CUIT?: Maybe<Scalars['String']['output']>;
  CompanyID: Scalars['Int']['output'];
  Grossincome?: Maybe<Scalars['String']['output']>;
  Logo?: Maybe<Scalars['String']['output']>;
  Name?: Maybe<Scalars['String']['output']>;
  Startdate?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanyDataUpdate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  CUIT?: InputMaybe<Scalars['String']['input']>;
  Grossincome?: InputMaybe<Scalars['String']['input']>;
  Logo?: InputMaybe<Scalars['String']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
  Startdate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CountriesInDb = {
  __typename?: 'CountriesInDB';
  CountryID: Scalars['Int']['output'];
  Name: Scalars['String']['output'];
};

export type CreditCardGroupsCreate = {
  GroupName?: InputMaybe<Scalars['String']['input']>;
};

export type CreditCardGroupsInDb = {
  __typename?: 'CreditCardGroupsInDB';
  CreditCardGroupID: Scalars['Int']['output'];
  GroupName?: Maybe<Scalars['String']['output']>;
};

export type CreditCardGroupsUpdate = {
  GroupName?: InputMaybe<Scalars['String']['input']>;
};

export type CreditCardsCreate = {
  CardName?: InputMaybe<Scalars['String']['input']>;
  CreditCardGroupID?: InputMaybe<Scalars['Int']['input']>;
  Installments?: InputMaybe<Scalars['Int']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Surcharge?: InputMaybe<Scalars['Float']['input']>;
};

export type CreditCardsInDb = {
  __typename?: 'CreditCardsInDB';
  CardName: Scalars['String']['output'];
  CreditCardGroupID: Scalars['Int']['output'];
  CreditCardID: Scalars['Int']['output'];
  GroupData?: Maybe<CreditCardGroupsInDb>;
  Installments?: Maybe<Scalars['Int']['output']>;
  IsActive?: Maybe<Scalars['Boolean']['output']>;
  Surcharge?: Maybe<Scalars['Float']['output']>;
};

export type CreditCardsUpdate = {
  CardName: Scalars['String']['input'];
  CreditCardGroupID: Scalars['Int']['input'];
  Installments?: InputMaybe<Scalars['Int']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Surcharge?: InputMaybe<Scalars['Float']['input']>;
};

export type DashboardFilters = {
  branchId?: InputMaybe<Scalars['Int']['input']>;
  companyId: Scalars['Int']['input'];
  dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  dateTo?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DashboardStats = {
  __typename?: 'DashboardStats';
  activeClients: Scalars['Int']['output'];
  activeItems: Scalars['Int']['output'];
  completedOrders: Scalars['Int']['output'];
  lowStockItems: Scalars['Int']['output'];
  monthlySales: Scalars['Float']['output'];
  pendingOrders: Scalars['Int']['output'];
  totalClients: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DiscountsCreate = {
  DiscountName: Scalars['String']['input'];
  Percentage: Scalars['Float']['input'];
};

export type DiscountsInDb = {
  __typename?: 'DiscountsInDB';
  DiscountID: Scalars['Int']['output'];
  DiscountName: Scalars['String']['output'];
  Percentage: Scalars['Float']['output'];
};

export type DiscountsUpdate = {
  DiscountName: Scalars['String']['input'];
  Percentage: Scalars['Float']['input'];
};

export type DocumentsCreate = {
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  Description: Scalars['String']['input'];
  DocumentNumber: Scalars['Int']['input'];
  DocumentTypeID: Scalars['Int']['input'];
  IsActive: Scalars['Boolean']['input'];
  IsElectronic?: InputMaybe<Scalars['Boolean']['input']>;
  IsFiscal?: InputMaybe<Scalars['Boolean']['input']>;
  IsManual?: InputMaybe<Scalars['Boolean']['input']>;
  IsQuotation?: InputMaybe<Scalars['Boolean']['input']>;
  MaxItems?: InputMaybe<Scalars['Int']['input']>;
  MovesStock: Scalars['Boolean']['input'];
  PointOfSale: Scalars['Int']['input'];
  ShouldAccount: Scalars['Boolean']['input'];
  Testing: Scalars['Boolean']['input'];
};

export type DocumentsInDb = {
  __typename?: 'DocumentsInDB';
  BranchID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  Description: Scalars['String']['output'];
  DocumentID: Scalars['Int']['output'];
  DocumentNumber: Scalars['Int']['output'];
  DocumentTypeID: Scalars['Int']['output'];
  IsActive: Scalars['Boolean']['output'];
  IsElectronic?: Maybe<Scalars['Boolean']['output']>;
  IsFiscal?: Maybe<Scalars['Boolean']['output']>;
  IsManual?: Maybe<Scalars['Boolean']['output']>;
  IsQuotation?: Maybe<Scalars['Boolean']['output']>;
  MaxItems?: Maybe<Scalars['Int']['output']>;
  MovesStock: Scalars['Boolean']['output'];
  PointOfSale: Scalars['Int']['output'];
  ShouldAccount: Scalars['Boolean']['output'];
  Testing: Scalars['Boolean']['output'];
};

export type DocumentsUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  Description?: InputMaybe<Scalars['String']['input']>;
  DocumentNumber?: InputMaybe<Scalars['Int']['input']>;
  DocumentTypeID?: InputMaybe<Scalars['Int']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  IsElectronic?: InputMaybe<Scalars['Boolean']['input']>;
  IsFiscal?: InputMaybe<Scalars['Boolean']['input']>;
  IsManual?: InputMaybe<Scalars['Boolean']['input']>;
  IsQuotation?: InputMaybe<Scalars['Boolean']['input']>;
  MaxItems?: InputMaybe<Scalars['Int']['input']>;
  MovesStock?: InputMaybe<Scalars['Boolean']['input']>;
  PointOfSale?: InputMaybe<Scalars['Int']['input']>;
  ShouldAccount?: InputMaybe<Scalars['Boolean']['input']>;
  Testing?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FilterField = {
  __typename?: 'FilterField';
  dependsOn?: Maybe<Scalars['String']['output']>;
  field: Scalars['String']['output'];
  label: Scalars['String']['output'];
  relationModel?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type GlobalSearchResult = {
  __typename?: 'GlobalSearchResult';
  clients: Array<ClientsInDb>;
  items: Array<ItemsInDb>;
  orders: Array<OrdersInDb>;
  stats: SearchStats;
};

export type ItemCategoriesCreate = {
  CategoryName: Scalars['String']['input'];
};

export type ItemCategoriesInDb = {
  __typename?: 'ItemCategoriesInDB';
  CategoryName: Scalars['String']['output'];
  ItemCategoryID: Scalars['Int']['output'];
};

export type ItemCategoriesUpdate = {
  CategoryName?: InputMaybe<Scalars['String']['input']>;
};

export type ItemFilters = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  brandID?: InputMaybe<Scalars['Int']['input']>;
  categoryID?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  controlStock?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isOffer?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  subcategoryID?: InputMaybe<Scalars['Int']['input']>;
  supplierID?: InputMaybe<Scalars['Int']['input']>;
  warehouseID?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemPagination = {
  limit?: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: Scalars['Int']['input'];
};

export type ItemPriceHistoryInDb = {
  __typename?: 'ItemPriceHistoryInDB';
  EffectiveDate: Scalars['DateTime']['output'];
  ItemID: Scalars['Int']['output'];
  Price: Scalars['Float']['output'];
  PriceHistoryID: Scalars['Int']['output'];
};

export type ItemSearchResult = {
  __typename?: 'ItemSearchResult';
  Brand?: Maybe<BrandsInDb>;
  Category?: Maybe<ItemCategoriesInDb>;
  Code: Scalars['String']['output'];
  Description: Scalars['String']['output'];
  ItemID: Scalars['Int']['output'];
  Price?: Maybe<Scalars['Float']['output']>;
  StockQuantity?: Maybe<Scalars['Int']['output']>;
  Subcategory?: Maybe<ItemSubcategoriesInDb>;
  Supplier?: Maybe<SuppliersInDb>;
  Warehouse?: Maybe<WarehousesInDb>;
};

export type ItemStockInDb = {
  __typename?: 'ItemStockInDB';
  BatchNumber?: Maybe<Scalars['String']['output']>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
  ExpiryDate?: Maybe<Scalars['DateTime']['output']>;
  ItemID: Scalars['Int']['output'];
  LastModified?: Maybe<Scalars['DateTime']['output']>;
  MaxStockLevel?: Maybe<Scalars['Int']['output']>;
  MinStockLevel?: Maybe<Scalars['Int']['output']>;
  Quantity?: Maybe<Scalars['Int']['output']>;
  StockLocation?: Maybe<Scalars['String']['output']>;
  StockStatus?: Maybe<Scalars['String']['output']>;
  SupplierID?: Maybe<Scalars['Int']['output']>;
  WarehouseID: Scalars['Int']['output'];
  rRservedQuantity?: Maybe<Scalars['Int']['output']>;
};

export type ItemSubcategoriesCreate = {
  ItemCategoryID: Scalars['Int']['input'];
  SubcategoryName: Scalars['String']['input'];
};

export type ItemSubcategoriesInDb = {
  __typename?: 'ItemSubcategoriesInDB';
  CategoryData?: Maybe<ItemCategoriesInDb>;
  ItemCategoryID: Scalars['Int']['output'];
  ItemSubcategoryID: Scalars['Int']['output'];
  SubcategoryName: Scalars['String']['output'];
};

export type ItemSubcategoriesUpdate = {
  ItemCategoryID?: InputMaybe<Scalars['Int']['input']>;
  SubcategoryName?: InputMaybe<Scalars['String']['input']>;
};

export type ItemsCreate = {
  BranchID: Scalars['Int']['input'];
  BrandID: Scalars['Int']['input'];
  Code: Scalars['String']['input'];
  CompanyID: Scalars['Int']['input'];
  ControlStock: Scalars['Boolean']['input'];
  Description: Scalars['String']['input'];
  IsActive: Scalars['Boolean']['input'];
  IsOffer: Scalars['Boolean']['input'];
  ItemCategoryID: Scalars['Int']['input'];
  ItemSubcategoryID: Scalars['Int']['input'];
  LastModified?: InputMaybe<Scalars['Date']['input']>;
  OEM?: InputMaybe<Scalars['String']['input']>;
  ReplenishmentStock: Scalars['Int']['input'];
  SupplierID: Scalars['Int']['input'];
  WarehouseID: Scalars['Int']['input'];
};

export type ItemsInDb = {
  __typename?: 'ItemsInDB';
  BranchData?: Maybe<BranchesInDb>;
  BranchID: Scalars['Int']['output'];
  BrandData?: Maybe<BrandsInDb>;
  BrandID: Scalars['Int']['output'];
  CategoryData?: Maybe<ItemCategoriesInDb>;
  Code: Scalars['String']['output'];
  CompanyData?: Maybe<CompanyDataInDb>;
  CompanyID: Scalars['Int']['output'];
  ControlStock: Scalars['Boolean']['output'];
  Description: Scalars['String']['output'];
  IsActive: Scalars['Boolean']['output'];
  IsOffer: Scalars['Boolean']['output'];
  ItemCategoryID: Scalars['Int']['output'];
  ItemID: Scalars['Int']['output'];
  ItemSubcategoryID: Scalars['Int']['output'];
  LastModified?: Maybe<Scalars['Date']['output']>;
  OEM?: Maybe<Scalars['String']['output']>;
  ReplenishmentStock: Scalars['Int']['output'];
  SubcategoryData?: Maybe<ItemSubcategoriesInDb>;
  SupplierData?: Maybe<SuppliersInDb>;
  SupplierID: Scalars['Int']['output'];
  WarehouseData?: Maybe<WarehousesInDb>;
  WarehouseID: Scalars['Int']['output'];
};

export type ItemsResponse = {
  __typename?: 'ItemsResponse';
  hasNext: Scalars['Boolean']['output'];
  hasPrev: Scalars['Boolean']['output'];
  items: Array<ItemSearchResult>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ItemsUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  BrandID?: InputMaybe<Scalars['Int']['input']>;
  Code?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  ControlStock?: InputMaybe<Scalars['Boolean']['input']>;
  Description?: InputMaybe<Scalars['String']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  IsOffer?: InputMaybe<Scalars['Boolean']['input']>;
  ItemCategoryID?: InputMaybe<Scalars['Int']['input']>;
  ItemSubcategoryID?: InputMaybe<Scalars['Int']['input']>;
  LastModified?: InputMaybe<Scalars['Date']['input']>;
  OEM?: InputMaybe<Scalars['String']['input']>;
  ReplenishmentStock?: InputMaybe<Scalars['Int']['input']>;
  SupplierID?: InputMaybe<Scalars['Int']['input']>;
  WarehouseID?: InputMaybe<Scalars['Int']['input']>;
};

export type LoginInput = {
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserInfo>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToOrder: TempOrderDetailsInDb;
  bulkActivateItems: Scalars['Boolean']['output'];
  bulkDeactivateItems: Scalars['Boolean']['output'];
  cancelOrderEditing: Scalars['Boolean']['output'];
  changePassword: AuthResponse;
  clearTempSession: Scalars['Boolean']['output'];
  createBranch: BranchesInDb;
  createBrand: BrandsInDb;
  createCar: CarsInDb;
  createCarbrand: CarBrandsInDb;
  createCarmodel: CarModelsInDb;
  createCashbox: CashBoxesInDb;
  createCashboxmovement: CashBoxMovementsInDb;
  createClient: ClientsInDb;
  createCompany: CompanyDataInDb;
  createCreditcard: CreditCardsInDb;
  createCreditcardgroup: CreditCardGroupsInDb;
  createDiscount: DiscountsInDb;
  createDocument: DocumentsInDb;
  createItem: ItemsInDb;
  createItemcategory: ItemCategoriesInDb;
  createItemsubcategory: ItemSubcategoriesInDb;
  createOrder: OrderResponse;
  createPricelist: PriceListsInDb;
  createPricelistitem: PriceListItemsInDb;
  createRole: RolesInDb;
  createSalecondition: SaleConditionsInDb;
  createServicetype: ServiceTypeInDb;
  createStockhistory: StockHistoryInDb;
  createSupplier: SuppliersInDb;
  createSysdoctype: SysDocTypesInDb;
  createSysdocumenttype: SysDocumentTypesInDb;
  createSysuseraction: SysUserActionsInDb;
  createTemporderdetail: TempOrderDetailsInDb;
  createTempstockhistorydetail: TempStockHistoryDetailsInDb;
  createUser: AuthResponse;
  createUserRecord: UsersInDb;
  createUseraccess: UserAccessInDb;
  createVendor: VendorsInDb;
  createWarehouse: WarehousesInDb;
  deleteBranch: Scalars['Boolean']['output'];
  deleteBrand: Scalars['Boolean']['output'];
  deleteCar: Scalars['Boolean']['output'];
  deleteCarbrand: Scalars['Boolean']['output'];
  deleteCarmodel: Scalars['Boolean']['output'];
  deleteCashbox: Scalars['Boolean']['output'];
  deleteCashboxmovement: Scalars['Boolean']['output'];
  deleteClient: DeleteResponse;
  deleteCompany: Scalars['Boolean']['output'];
  deleteCreditcard: Scalars['Boolean']['output'];
  deleteCreditcardgroup: Scalars['Boolean']['output'];
  deleteDiscount: Scalars['Boolean']['output'];
  deleteDocument: DeleteResponse;
  deleteItem: Scalars['Boolean']['output'];
  deleteItemcategory: Scalars['Boolean']['output'];
  deleteItemsubcategory: Scalars['Boolean']['output'];
  deleteOrder: Scalars['Boolean']['output'];
  deletePricelist: Scalars['Boolean']['output'];
  deletePricelistitem: Scalars['Boolean']['output'];
  deleteRole: Scalars['Boolean']['output'];
  deleteSalecondition: DeleteResponse;
  deleteServicetype: DeleteResponse;
  deleteStockhistory: Scalars['Boolean']['output'];
  deleteSupplier: Scalars['Boolean']['output'];
  deleteSysdoctype: DeleteResponse;
  deleteSysdocumenttype: DeleteResponse;
  deleteSysuseraction: DeleteResponse;
  deleteTempItemByDetailId: Scalars['Boolean']['output'];
  deleteTemporderdetail: Scalars['Boolean']['output'];
  deleteTempstockhistorydetail: Scalars['Boolean']['output'];
  deleteUserRecord: Scalars['Boolean']['output'];
  deleteUseraccess: Scalars['Boolean']['output'];
  deleteVendor: Scalars['Boolean']['output'];
  deleteWarehouse: Scalars['Boolean']['output'];
  finalizeOrder?: Maybe<OrderResponse>;
  getTempItemsBySession: Array<TempOrderDetailsInDb>;
  loadOrderForEditing: Scalars['String']['output'];
  login: LoginResponse;
  processStockSession: Array<StockHistoryInDb>;
  removeItemFromOrder: Scalars['Boolean']['output'];
  saveOrderDraft?: Maybe<OrderResponse>;
  toggleClientStatus?: Maybe<ClientsInDb>;
  toggleSupplierStatus?: Maybe<SuppliersInDb>;
  toggleVendorStatus?: Maybe<VendorsInDb>;
  updateBranch?: Maybe<BranchesInDb>;
  updateBrand?: Maybe<BrandsInDb>;
  updateCar?: Maybe<CarsInDb>;
  updateCarbrand?: Maybe<CarBrandsInDb>;
  updateCarmodel?: Maybe<CarModelsInDb>;
  updateCashbox?: Maybe<CashBoxesInDb>;
  updateCashboxmovement?: Maybe<CashBoxMovementsInDb>;
  updateClient?: Maybe<ClientsInDb>;
  updateCompany?: Maybe<CompanyDataInDb>;
  updateCreditcard?: Maybe<CreditCardsInDb>;
  updateCreditcardgroup?: Maybe<CreditCardGroupsInDb>;
  updateDiscount?: Maybe<DiscountsInDb>;
  updateDocument?: Maybe<DocumentsInDb>;
  updateItem?: Maybe<ItemsInDb>;
  updateItemcategory?: Maybe<ItemCategoriesInDb>;
  updateItemsubcategory?: Maybe<ItemSubcategoriesInDb>;
  updateOrder?: Maybe<OrderResponse>;
  updatePricelist?: Maybe<PriceListsInDb>;
  updatePricelistitem?: Maybe<PriceListItemsInDb>;
  updateRole?: Maybe<RolesInDb>;
  updateSalecondition?: Maybe<SaleConditionsInDb>;
  updateServicetype?: Maybe<ServiceTypeInDb>;
  updateStockhistory?: Maybe<StockHistoryInDb>;
  updateSupplier?: Maybe<SuppliersInDb>;
  updateSysdoctype?: Maybe<SysDocTypesInDb>;
  updateSysdocumenttype?: Maybe<SysDocumentTypesInDb>;
  updateSysuseraction?: Maybe<SysUserActionsInDb>;
  updateTempItemByDetailId?: Maybe<TempOrderDetailsInDb>;
  updateTemporderdetail?: Maybe<TempOrderDetailsInDb>;
  updateTempstockhistorydetail?: Maybe<TempStockHistoryDetailsInDb>;
  updateUserRecord?: Maybe<UsersInDb>;
  updateUseraccess: UserAccessInDb;
  updateVendor?: Maybe<VendorsInDb>;
  updateWarehouse?: Maybe<WarehousesInDb>;
};


export type MutationAddItemToOrderArgs = {
  data: AddItemToOrderInput;
};


export type MutationBulkActivateItemsArgs = {
  itemIds: Array<Scalars['Int']['input']>;
};


export type MutationBulkDeactivateItemsArgs = {
  itemIds: Array<Scalars['Int']['input']>;
};


export type MutationCancelOrderEditingArgs = {
  orderID: Scalars['Int']['input'];
  sessionID: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  input: PasswordChangeInput;
};


export type MutationClearTempSessionArgs = {
  sessionID: Scalars['String']['input'];
};


export type MutationCreateBranchArgs = {
  data: BranchesCreate;
};


export type MutationCreateBrandArgs = {
  data: BrandsCreate;
};


export type MutationCreateCarArgs = {
  data: CarsCreate;
};


export type MutationCreateCarbrandArgs = {
  data: CarBrandsCreate;
};


export type MutationCreateCarmodelArgs = {
  data: CarModelsCreate;
};


export type MutationCreateCashboxArgs = {
  data: CashBoxesCreate;
};


export type MutationCreateCashboxmovementArgs = {
  data: CashBoxMovementsCreate;
};


export type MutationCreateClientArgs = {
  data: ClientsCreate;
};


export type MutationCreateCompanyArgs = {
  data: CompanyDataCreate;
};


export type MutationCreateCreditcardArgs = {
  data: CreditCardsCreate;
};


export type MutationCreateCreditcardgroupArgs = {
  data: CreditCardGroupsCreate;
};


export type MutationCreateDiscountArgs = {
  data: DiscountsCreate;
};


export type MutationCreateDocumentArgs = {
  data: DocumentsCreate;
};


export type MutationCreateItemArgs = {
  data: ItemsCreate;
};


export type MutationCreateItemcategoryArgs = {
  data: ItemCategoriesCreate;
};


export type MutationCreateItemsubcategoryArgs = {
  data: ItemSubcategoriesCreate;
};


export type MutationCreateOrderArgs = {
  data: OrdersCreate;
};


export type MutationCreatePricelistArgs = {
  data: PriceListsCreate;
};


export type MutationCreatePricelistitemArgs = {
  data: PriceListItemsCreate;
};


export type MutationCreateRoleArgs = {
  data: RolesCreate;
};


export type MutationCreateSaleconditionArgs = {
  data: SaleConditionsCreate;
};


export type MutationCreateServicetypeArgs = {
  data: ServiceTypeCreate;
};


export type MutationCreateStockhistoryArgs = {
  data: StockHistoryCreate;
};


export type MutationCreateSupplierArgs = {
  data: SuppliersCreate;
};


export type MutationCreateSysdoctypeArgs = {
  data: SysDocTypesCreate;
};


export type MutationCreateSysdocumenttypeArgs = {
  data: SysDocumentTypesCreate;
};


export type MutationCreateSysuseractionArgs = {
  data: SysUserActionsCreate;
};


export type MutationCreateTemporderdetailArgs = {
  data: TempOrderDetailsCreate;
};


export type MutationCreateTempstockhistorydetailArgs = {
  data: TempStockHistoryDetailsCreate;
};


export type MutationCreateUserArgs = {
  input: UserCreateInput;
};


export type MutationCreateUserRecordArgs = {
  data: UserCreate;
};


export type MutationCreateUseraccessArgs = {
  data: UserAccessCreate;
};


export type MutationCreateVendorArgs = {
  data: VendorsCreate;
};


export type MutationCreateWarehouseArgs = {
  data: WarehousesCreate;
};


export type MutationDeleteBranchArgs = {
  branchID: Scalars['Int']['input'];
  companyID: Scalars['Int']['input'];
};


export type MutationDeleteBrandArgs = {
  brandID: Scalars['Int']['input'];
};


export type MutationDeleteCarArgs = {
  carID: Scalars['Int']['input'];
};


export type MutationDeleteCarbrandArgs = {
  carBrandID: Scalars['Int']['input'];
};


export type MutationDeleteCarmodelArgs = {
  carModelID: Scalars['Int']['input'];
};


export type MutationDeleteCashboxArgs = {
  cashBoxID: Scalars['Int']['input'];
};


export type MutationDeleteCashboxmovementArgs = {
  movementID: Scalars['Int']['input'];
};


export type MutationDeleteClientArgs = {
  clientID: Scalars['Int']['input'];
};


export type MutationDeleteCompanyArgs = {
  companyID: Scalars['Int']['input'];
};


export type MutationDeleteCreditcardArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCreditcardgroupArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteDiscountArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteDocumentArgs = {
  documentID: Scalars['Int']['input'];
};


export type MutationDeleteItemArgs = {
  itemID: Scalars['Int']['input'];
};


export type MutationDeleteItemcategoryArgs = {
  categoryID: Scalars['Int']['input'];
};


export type MutationDeleteItemsubcategoryArgs = {
  subcategoryID: Scalars['Int']['input'];
};


export type MutationDeleteOrderArgs = {
  orderID: Scalars['Int']['input'];
};


export type MutationDeletePricelistArgs = {
  pricelistID: Scalars['Int']['input'];
};


export type MutationDeletePricelistitemArgs = {
  itemID: Scalars['Int']['input'];
  pricelistID: Scalars['Int']['input'];
};


export type MutationDeleteRoleArgs = {
  roleID: Scalars['Int']['input'];
};


export type MutationDeleteSaleconditionArgs = {
  saleConditionID: Scalars['Int']['input'];
};


export type MutationDeleteServicetypeArgs = {
  serviceTypeID: Scalars['Int']['input'];
};


export type MutationDeleteStockhistoryArgs = {
  historyID: Scalars['Int']['input'];
};


export type MutationDeleteSupplierArgs = {
  supplierID: Scalars['Int']['input'];
};


export type MutationDeleteSysdoctypeArgs = {
  doctypeID: Scalars['Int']['input'];
};


export type MutationDeleteSysdocumenttypeArgs = {
  documentTypeID: Scalars['Int']['input'];
};


export type MutationDeleteSysuseractionArgs = {
  userActionID: Scalars['Int']['input'];
};


export type MutationDeleteTempItemByDetailIdArgs = {
  detailID: Scalars['Int']['input'];
};


export type MutationDeleteTemporderdetailArgs = {
  itemID: Scalars['Int']['input'];
  sessionID: Scalars['String']['input'];
};


export type MutationDeleteTempstockhistorydetailArgs = {
  entryID: Scalars['Int']['input'];
};


export type MutationDeleteUserRecordArgs = {
  userID: Scalars['Int']['input'];
};


export type MutationDeleteUseraccessArgs = {
  branchID: Scalars['Int']['input'];
  companyID: Scalars['Int']['input'];
  roleID: Scalars['Int']['input'];
  userID: Scalars['Int']['input'];
};


export type MutationDeleteVendorArgs = {
  vendorID: Scalars['Int']['input'];
};


export type MutationDeleteWarehouseArgs = {
  warehouseID: Scalars['Int']['input'];
};


export type MutationFinalizeOrderArgs = {
  orderID: Scalars['Int']['input'];
  sessionID: Scalars['String']['input'];
};


export type MutationGetTempItemsBySessionArgs = {
  sessionID: Scalars['String']['input'];
};


export type MutationLoadOrderForEditingArgs = {
  branchID: Scalars['Int']['input'];
  companyID: Scalars['Int']['input'];
  orderID: Scalars['Int']['input'];
  userID: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationProcessStockSessionArgs = {
  sessionID: Scalars['String']['input'];
};


export type MutationRemoveItemFromOrderArgs = {
  itemID: Scalars['Int']['input'];
  sessionID: Scalars['String']['input'];
};


export type MutationSaveOrderDraftArgs = {
  orderID: Scalars['Int']['input'];
  sessionID: Scalars['String']['input'];
};


export type MutationToggleClientStatusArgs = {
  clientID: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
};


export type MutationToggleSupplierStatusArgs = {
  isActive: Scalars['Boolean']['input'];
  supplierID: Scalars['Int']['input'];
};


export type MutationToggleVendorStatusArgs = {
  isActive: Scalars['Boolean']['input'];
  vendorID: Scalars['Int']['input'];
};


export type MutationUpdateBranchArgs = {
  branchID: Scalars['Int']['input'];
  companyID: Scalars['Int']['input'];
  data: BranchesUpdate;
};


export type MutationUpdateBrandArgs = {
  brandID: Scalars['Int']['input'];
  data: BrandsUpdate;
};


export type MutationUpdateCarArgs = {
  carID: Scalars['Int']['input'];
  data: CarsUpdate;
};


export type MutationUpdateCarbrandArgs = {
  carBrandID: Scalars['Int']['input'];
  data: CarBrandsUpdate;
};


export type MutationUpdateCarmodelArgs = {
  carModelID: Scalars['Int']['input'];
  data: CarModelsUpdate;
};


export type MutationUpdateCashboxArgs = {
  cashBoxID: Scalars['Int']['input'];
  data: CashBoxesUpdate;
};


export type MutationUpdateCashboxmovementArgs = {
  data: CashBoxMovementsUpdate;
  movementID: Scalars['Int']['input'];
};


export type MutationUpdateClientArgs = {
  clientID: Scalars['Int']['input'];
  data: ClientsUpdate;
};


export type MutationUpdateCompanyArgs = {
  companyID: Scalars['Int']['input'];
  data: CompanyDataUpdate;
};


export type MutationUpdateCreditcardArgs = {
  data: CreditCardsUpdate;
  id: Scalars['Int']['input'];
};


export type MutationUpdateCreditcardgroupArgs = {
  data: CreditCardGroupsUpdate;
  id: Scalars['Int']['input'];
};


export type MutationUpdateDiscountArgs = {
  data: DiscountsUpdate;
  id: Scalars['Int']['input'];
};


export type MutationUpdateDocumentArgs = {
  data: DocumentsUpdate;
  documentID: Scalars['Int']['input'];
};


export type MutationUpdateItemArgs = {
  data: ItemsUpdate;
  itemID: Scalars['Int']['input'];
};


export type MutationUpdateItemcategoryArgs = {
  categoryID: Scalars['Int']['input'];
  data: ItemCategoriesUpdate;
};


export type MutationUpdateItemsubcategoryArgs = {
  data: ItemSubcategoriesUpdate;
  subcategoryID: Scalars['Int']['input'];
};


export type MutationUpdateOrderArgs = {
  data: OrdersUpdate;
  orderID: Scalars['Int']['input'];
};


export type MutationUpdatePricelistArgs = {
  data: PriceListsUpdate;
  pricelistID: Scalars['Int']['input'];
};


export type MutationUpdatePricelistitemArgs = {
  data: PriceListItemsUpdate;
  itemID: Scalars['Int']['input'];
  pricelistID: Scalars['Int']['input'];
};


export type MutationUpdateRoleArgs = {
  data: RolesUpdate;
  roleID: Scalars['Int']['input'];
};


export type MutationUpdateSaleconditionArgs = {
  data: SaleConditionsUpdate;
  saleConditionID: Scalars['Int']['input'];
};


export type MutationUpdateServicetypeArgs = {
  data: ServiceTypeUpdate;
  serviceTypeID: Scalars['Int']['input'];
};


export type MutationUpdateStockhistoryArgs = {
  data: StockHistoryUpdate;
  historyID: Scalars['Int']['input'];
};


export type MutationUpdateSupplierArgs = {
  data: SuppliersUpdate;
  supplierID: Scalars['Int']['input'];
};


export type MutationUpdateSysdoctypeArgs = {
  data: SysDocTypesUpdate;
  doctypeID: Scalars['Int']['input'];
};


export type MutationUpdateSysdocumenttypeArgs = {
  data: SysDocumentTypesUpdate;
  documentTypeID: Scalars['Int']['input'];
};


export type MutationUpdateSysuseractionArgs = {
  data: SysUserActionsUpdate;
  userActionID: Scalars['Int']['input'];
};


export type MutationUpdateTempItemByDetailIdArgs = {
  data: TempOrderDetailsUpdate;
  detailID: Scalars['Int']['input'];
};


export type MutationUpdateTemporderdetailArgs = {
  data: TempOrderDetailsUpdate;
  itemID: Scalars['Int']['input'];
  sessionID: Scalars['String']['input'];
};


export type MutationUpdateTempstockhistorydetailArgs = {
  data: TempStockHistoryDetailsUpdate;
  entryID: Scalars['Int']['input'];
};


export type MutationUpdateUserRecordArgs = {
  data: UserUpdate;
  userID: Scalars['Int']['input'];
};


export type MutationUpdateUseraccessArgs = {
  newData: UserAccessCreate;
  oldBranchID: Scalars['Int']['input'];
  oldCompanyID: Scalars['Int']['input'];
  oldRoleID: Scalars['Int']['input'];
  oldUserID: Scalars['Int']['input'];
};


export type MutationUpdateVendorArgs = {
  data: VendorsUpdate;
  vendorID: Scalars['Int']['input'];
};


export type MutationUpdateWarehouseArgs = {
  data: WarehousesUpdate;
  warehouseID: Scalars['Int']['input'];
};

export type OrderDetailsCreate = {
  Description?: InputMaybe<Scalars['String']['input']>;
  ItemID: Scalars['Int']['input'];
  LastModified?: InputMaybe<Scalars['DateTime']['input']>;
  OrderID?: InputMaybe<Scalars['Int']['input']>;
  Quantity: Scalars['Int']['input'];
  UnitPrice: Scalars['Float']['input'];
  WarehouseID: Scalars['Int']['input'];
};

export type OrderDetailsInDb = {
  __typename?: 'OrderDetailsInDB';
  Description?: Maybe<Scalars['String']['output']>;
  ItemData?: Maybe<ItemsInDb>;
  ItemID: Scalars['Int']['output'];
  LastModified?: Maybe<Scalars['DateTime']['output']>;
  OrderDetailID: Scalars['Int']['output'];
  OrderID: Scalars['Int']['output'];
  Quantity: Scalars['Int']['output'];
  UnitPrice: Scalars['Float']['output'];
  WarehouseData?: Maybe<WarehousesInDb>;
  WarehouseID: Scalars['Int']['output'];
};

export type OrderDetailsUpdate = {
  Description?: InputMaybe<Scalars['String']['input']>;
  ItemID?: InputMaybe<Scalars['Int']['input']>;
  LastModified?: InputMaybe<Scalars['DateTime']['input']>;
  OrderID?: InputMaybe<Scalars['Int']['input']>;
  Quantity?: InputMaybe<Scalars['Int']['input']>;
  UnitPrice?: InputMaybe<Scalars['Float']['input']>;
  WarehouseID?: InputMaybe<Scalars['Int']['input']>;
};

export type OrderHistoryDetailsInDb = {
  __typename?: 'OrderHistoryDetailsInDB';
  Description?: Maybe<Scalars['String']['output']>;
  HistoryID: Scalars['Int']['output'];
  ItemID: Scalars['Int']['output'];
  OrderHistoryDetailID: Scalars['Int']['output'];
  Quantity: Scalars['Int']['output'];
  UnitPrice: Scalars['Float']['output'];
  lastModified?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderHistoryInDb = {
  __typename?: 'OrderHistoryInDB';
  BranchID?: Maybe<Scalars['Int']['output']>;
  CarID?: Maybe<Scalars['Int']['output']>;
  ClientID?: Maybe<Scalars['Int']['output']>;
  Comments?: Maybe<Scalars['String']['output']>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
  Date?: Maybe<Scalars['DateTime']['output']>;
  HistoryID: Scalars['Int']['output'];
  Mileage?: Maybe<Scalars['Int']['output']>;
  NextServiceMileage?: Maybe<Scalars['Int']['output']>;
  OrderID?: Maybe<Scalars['Int']['output']>;
  ServiceType?: Maybe<Scalars['String']['output']>;
  Status?: Maybe<Scalars['String']['output']>;
  Subtotal?: Maybe<Scalars['Float']['output']>;
  Total?: Maybe<Scalars['Float']['output']>;
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  message?: Maybe<Scalars['String']['output']>;
  order: OrdersInDb;
  sessionID?: Maybe<Scalars['String']['output']>;
};

export type OrdersCreate = {
  BranchID: Scalars['Int']['input'];
  CarID?: InputMaybe<Scalars['Int']['input']>;
  ClientID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  Date_: Scalars['DateTime']['input'];
  DiscountID: Scalars['Int']['input'];
  DocumentID: Scalars['Int']['input'];
  IsService?: InputMaybe<Scalars['Boolean']['input']>;
  Items: Array<OrderDetailsCreate>;
  Mileage?: InputMaybe<Scalars['Int']['input']>;
  NextServiceMileage?: InputMaybe<Scalars['Int']['input']>;
  Notes?: InputMaybe<Scalars['String']['input']>;
  OrderStatusID: Scalars['Int']['input'];
  PriceListID: Scalars['Int']['input'];
  SaleConditionID: Scalars['Int']['input'];
  ServiceTypeID?: InputMaybe<Scalars['Int']['input']>;
  Subtotal: Scalars['Float']['input'];
  Total: Scalars['Float']['input'];
  UserID: Scalars['Int']['input'];
  VAT: Scalars['Float']['input'];
  WarehouseID: Scalars['Int']['input'];
};

export type OrdersInDb = {
  __typename?: 'OrdersInDB';
  BranchData?: Maybe<BranchesInDb>;
  BranchID: Scalars['Int']['output'];
  CarData?: Maybe<CarsInDb>;
  CarID?: Maybe<Scalars['Int']['output']>;
  ClientData?: Maybe<ClientsInDb>;
  ClientID: Scalars['Int']['output'];
  CompanyData?: Maybe<CompanyDataInDb>;
  CompanyID: Scalars['Int']['output'];
  Date_: Scalars['DateTime']['output'];
  DiscountData?: Maybe<DiscountsInDb>;
  DiscountID: Scalars['Int']['output'];
  DocumentData?: Maybe<SysDocumentTypesInDb>;
  DocumentID: Scalars['Int']['output'];
  IsService?: Maybe<Scalars['Boolean']['output']>;
  Items?: Maybe<Array<OrderDetailsInDb>>;
  Mileage?: Maybe<Scalars['Int']['output']>;
  NextServiceMileage?: Maybe<Scalars['Int']['output']>;
  Notes?: Maybe<Scalars['String']['output']>;
  OrderID: Scalars['Int']['output'];
  OrderStatusData?: Maybe<SysOrderStatusInDb>;
  OrderStatusID: Scalars['Int']['output'];
  PriceListData?: Maybe<PriceListsInDb>;
  PriceListID: Scalars['Int']['output'];
  SaleConditionData?: Maybe<SaleConditionsInDb>;
  SaleConditionID: Scalars['Int']['output'];
  ServiceTypeData?: Maybe<ServiceTypeInDb>;
  ServiceTypeID?: Maybe<Scalars['Int']['output']>;
  Subtotal: Scalars['Float']['output'];
  Total: Scalars['Float']['output'];
  UserID: Scalars['Int']['output'];
  VAT: Scalars['Float']['output'];
  WarehouseData?: Maybe<WarehousesInDb>;
  WarehouseID: Scalars['Int']['output'];
};

export type OrdersUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CarID?: InputMaybe<Scalars['Int']['input']>;
  ClientID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  Date_?: InputMaybe<Scalars['DateTime']['input']>;
  DiscountID?: InputMaybe<Scalars['Int']['input']>;
  DocumentID?: InputMaybe<Scalars['Int']['input']>;
  IsService?: InputMaybe<Scalars['Boolean']['input']>;
  Items?: InputMaybe<Array<OrderDetailsUpdate>>;
  Mileage?: InputMaybe<Scalars['Int']['input']>;
  NextServiceMileage?: InputMaybe<Scalars['Int']['input']>;
  Notes?: InputMaybe<Scalars['String']['input']>;
  OrderStatusID?: InputMaybe<Scalars['Int']['input']>;
  PriceListID?: InputMaybe<Scalars['Int']['input']>;
  SaleConditionID?: InputMaybe<Scalars['Int']['input']>;
  ServiceTypeID?: InputMaybe<Scalars['Int']['input']>;
  Subtotal?: InputMaybe<Scalars['Float']['input']>;
  Total?: InputMaybe<Scalars['Float']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
  VAT?: InputMaybe<Scalars['Float']['input']>;
  WarehouseID?: InputMaybe<Scalars['Int']['input']>;
};

export type PasswordChangeInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type PriceListItemsCreate = {
  EffectiveDate?: InputMaybe<Scalars['DateTime']['input']>;
  ItemID: Scalars['Int']['input'];
  Price: Scalars['Float']['input'];
  PriceListID: Scalars['Int']['input'];
};

export type PriceListItemsInDb = {
  __typename?: 'PriceListItemsInDB';
  EffectiveDate: Scalars['DateTime']['output'];
  ItemData?: Maybe<ItemsInDb>;
  ItemID: Scalars['Int']['output'];
  Price: Scalars['Float']['output'];
  PriceListData?: Maybe<PriceListsInDb>;
  PriceListID: Scalars['Int']['output'];
};

export type PriceListItemsUpdate = {
  EffectiveDate?: InputMaybe<Scalars['DateTime']['input']>;
  Price?: InputMaybe<Scalars['Float']['input']>;
};

export type PriceListsCreate = {
  CreatedDate?: InputMaybe<Scalars['DateTime']['input']>;
  Description?: InputMaybe<Scalars['String']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Name: Scalars['String']['input'];
};

export type PriceListsInDb = {
  __typename?: 'PriceListsInDB';
  CreatedDate?: Maybe<Scalars['DateTime']['output']>;
  Description?: Maybe<Scalars['String']['output']>;
  IsActive?: Maybe<Scalars['Boolean']['output']>;
  Name: Scalars['String']['output'];
  PriceListID: Scalars['Int']['output'];
};

export type PriceListsUpdate = {
  CreatedDate?: InputMaybe<Scalars['DateTime']['input']>;
  Description?: InputMaybe<Scalars['String']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
};

export type ProvincesInDb = {
  __typename?: 'ProvincesInDB';
  CountryID: Scalars['Int']['output'];
  Name: Scalars['String']['output'];
  ProvinceID: Scalars['Int']['output'];
  country?: Maybe<CountriesInDb>;
};

export type Query = {
  __typename?: 'Query';
  accountbalancesById?: Maybe<AccountBalancesInDb>;
  activeVendors: Array<VendorsInDb>;
  allAccountbalances: Array<AccountBalancesInDb>;
  allBranches: Array<BranchesInDb>;
  allBrands: Array<BrandsInDb>;
  allCarbrands: Array<CarBrandsInDb>;
  allCarmodels: Array<CarModelsInDb>;
  allCars: Array<CarsInDb>;
  allCashboxes: Array<CashBoxesInDb>;
  allCashboxmovements: Array<CashBoxMovementsInDb>;
  allClients: Array<ClientsInDb>;
  allCompanydata: Array<CompanyDataInDb>;
  allCountries: Array<CountriesInDb>;
  allCreditcardgroups: Array<CreditCardGroupsInDb>;
  allCreditcards: Array<CreditCardsInDb>;
  allDiscounts: Array<DiscountsInDb>;
  allDocuments: Array<DocumentsInDb>;
  allItemcategories: Array<ItemCategoriesInDb>;
  allItempricehistory: Array<ItemPriceHistoryInDb>;
  allItems: Array<ItemsInDb>;
  allItemstock: Array<ItemStockInDb>;
  allItemsubcategories: Array<ItemSubcategoriesInDb>;
  allOrderdetails: Array<OrderDetailsInDb>;
  allOrderhistory: Array<OrderHistoryInDb>;
  allOrderhistorydetails: Array<OrderHistoryDetailsInDb>;
  allOrders: Array<OrdersInDb>;
  allPricelistitems: Array<PriceListItemsInDb>;
  allPricelists: Array<PriceListsInDb>;
  allProvinces: Array<ProvincesInDb>;
  allRoles: Array<RolesInDb>;
  allSaleconditions: Array<SaleConditionsInDb>;
  allServicetypes: Array<ServiceTypeInDb>;
  allStockhistory: Array<StockHistoryInDb>;
  allSuppliers: Array<SuppliersInDb>;
  allSysdoctypes: Array<SysDocTypesInDb>;
  allSysdocumenttypes: Array<SysDocumentTypesInDb>;
  allSysorderstatus: Array<SysOrderStatusInDb>;
  allSystransactiontypes: Array<SysTransactionTypesInDb>;
  allSysuseractions: Array<SysUserActionsInDb>;
  allTemporderdetails: Array<TempOrderDetailsInDb>;
  allTempstockhistorydetails: Array<TempStockHistoryDetailsInDb>;
  allTransactions: Array<TransactionsInDb>;
  allUseraccess: Array<UserAccessInDb>;
  allUsers: Array<UsersInDb>;
  allVendors: Array<VendorsInDb>;
  allWarehouses: Array<WarehousesInDb>;
  branchesByCompany: Array<BranchesInDb>;
  branchesById?: Maybe<BranchesInDb>;
  brandsByCompany: Array<BrandsInDb>;
  brandsById?: Maybe<BrandsInDb>;
  carbrandsByCompany: Array<CarBrandsInDb>;
  carbrandsById?: Maybe<CarBrandsInDb>;
  carmodelsByBrand: Array<CarModelsInDb>;
  carmodelsById?: Maybe<CarModelsInDb>;
  carsByCompany: Array<CarsInDb>;
  carsById?: Maybe<CarsInDb>;
  cashboxesById?: Maybe<CashBoxesInDb>;
  cashboxmovementsById?: Maybe<CashBoxMovementsInDb>;
  clientsByBranch: Array<ClientsInDb>;
  clientsByCompany: Array<ClientsInDb>;
  clientsById?: Maybe<ClientsInDb>;
  companydataById?: Maybe<CompanyDataInDb>;
  countriesById?: Maybe<CountriesInDb>;
  creditcardById?: Maybe<CreditCardsInDb>;
  creditcardgroupById?: Maybe<CreditCardGroupsInDb>;
  creditcardgroupsByName: Array<CreditCardGroupsInDb>;
  creditcardsByName: Array<CreditCardsInDb>;
  currentUser?: Maybe<UserInfo>;
  dashboardStats: DashboardStats;
  discountsById?: Maybe<DiscountsInDb>;
  documentsById?: Maybe<DocumentsInDb>;
  filterFields: Array<FilterField>;
  getAlternativeTestData: Scalars['String']['output'];
  getLowStockItems: Array<ItemSearchResult>;
  getTestVoucherData: Scalars['String']['output'];
  healthCheck: Scalars['String']['output'];
  informacionComprobante: VoucherInfo;
  informacionRapidaComprobante: VoucherBasicInfo;
  itemcategoriesById?: Maybe<ItemCategoriesInDb>;
  itempricehistoryById?: Maybe<ItemPriceHistoryInDb>;
  itemsById?: Maybe<ItemsInDb>;
  itemstockById?: Maybe<ItemStockInDb>;
  itemsubcategoriesByCategory: Array<ItemSubcategoriesInDb>;
  itemsubcategoriesById?: Maybe<ItemSubcategoriesInDb>;
  orderdetailsById?: Maybe<OrderDetailsInDb>;
  orderhistoryById?: Maybe<OrderHistoryInDb>;
  orderhistorydetailsById?: Maybe<OrderHistoryDetailsInDb>;
  ordersById?: Maybe<OrdersInDb>;
  pricelistitemByIds?: Maybe<PriceListItemsInDb>;
  pricelistitemsFiltered: Array<PriceListItemsInDb>;
  pricelistsById?: Maybe<PriceListsInDb>;
  provincesByCountry: Array<ProvincesInDb>;
  provincesById?: Maybe<ProvincesInDb>;
  rolesById?: Maybe<RolesInDb>;
  saleconditionsById?: Maybe<SaleConditionsInDb>;
  searchGlobal: GlobalSearchResult;
  searchItems: ItemsResponse;
  serverInfo: ServerInfo;
  servicetypesById?: Maybe<ServiceTypeInDb>;
  stockhistoryById?: Maybe<StockHistoryInDb>;
  suppliersByBranch: Array<SuppliersInDb>;
  suppliersByCompany: Array<SuppliersInDb>;
  suppliersById?: Maybe<SuppliersInDb>;
  sysdoctypesById?: Maybe<SysDocTypesInDb>;
  sysdocumenttypesById?: Maybe<SysDocumentTypesInDb>;
  sysorderstatusById?: Maybe<SysOrderStatusInDb>;
  systransactiontypesById?: Maybe<SysTransactionTypesInDb>;
  sysuseractionsById?: Maybe<SysUserActionsInDb>;
  sysuseractionsByName: Array<SysUserActionsInDb>;
  temporderdetailBySession?: Maybe<TempOrderDetailsInDb>;
  temporderdetailsByOrder: Array<TempOrderDetailsInDb>;
  temporderdetailsBySession: Array<TempOrderDetailsInDb>;
  tempstockhistorydetailsById?: Maybe<TempStockHistoryDetailsInDb>;
  tempstockhistorydetailsBySession: Array<TempStockHistoryDetailsInDb>;
  testAfipConnection: TestConnectionResult;
  transactionsById?: Maybe<TransactionsInDb>;
  ultimoComprobante: Scalars['Int']['output'];
  useraccessById?: Maybe<UserAccessInDb>;
  usersById?: Maybe<UsersInDb>;
  vendorsById?: Maybe<VendorsInDb>;
  verifyToken?: Maybe<UserInfo>;
  warehousesById?: Maybe<WarehousesInDb>;
};


export type QueryAccountbalancesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBranchesByCompanyArgs = {
  companyID: Scalars['Int']['input'];
};


export type QueryBranchesByIdArgs = {
  companyID: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};


export type QueryBrandsByCompanyArgs = {
  companyID: Scalars['Int']['input'];
};


export type QueryBrandsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCarbrandsByCompanyArgs = {
  companyID: Scalars['Int']['input'];
};


export type QueryCarbrandsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCarmodelsByBrandArgs = {
  carBrandID: Scalars['Int']['input'];
};


export type QueryCarmodelsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCarsByCompanyArgs = {
  companyID: Scalars['Int']['input'];
};


export type QueryCarsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCashboxesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCashboxmovementsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryClientsByBranchArgs = {
  branchID: Scalars['Int']['input'];
  companyID: Scalars['Int']['input'];
};


export type QueryClientsByCompanyArgs = {
  companyID: Scalars['Int']['input'];
};


export type QueryClientsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCompanydataByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCountriesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCreditcardByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCreditcardgroupByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCreditcardgroupsByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryCreditcardsByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryDashboardStatsArgs = {
  filters: DashboardFilters;
};


export type QueryDiscountsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocumentsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFilterFieldsArgs = {
  model: Scalars['String']['input'];
};


export type QueryGetLowStockItemsArgs = {
  companyId: Scalars['Int']['input'];
  limit?: Scalars['Int']['input'];
  warehouseId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInformacionComprobanteArgs = {
  data: VoucherRequest;
};


export type QueryInformacionRapidaComprobanteArgs = {
  data: VoucherRequestBasic;
};


export type QueryItemcategoriesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryItempricehistoryByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryItemsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryItemstockByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryItemsubcategoriesByCategoryArgs = {
  categoryID: Scalars['Int']['input'];
};


export type QueryItemsubcategoriesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrderdetailsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrderhistoryByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrderhistorydetailsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrdersByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPricelistitemByIdsArgs = {
  itemID: Scalars['Int']['input'];
  pricelistID: Scalars['Int']['input'];
};


export type QueryPricelistitemsFilteredArgs = {
  itemID?: InputMaybe<Scalars['Int']['input']>;
  pricelistID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPricelistsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProvincesByCountryArgs = {
  countryID: Scalars['Int']['input'];
};


export type QueryProvincesByIdArgs = {
  countryID: Scalars['Int']['input'];
  provinceID: Scalars['Int']['input'];
};


export type QueryRolesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySaleconditionsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySearchGlobalArgs = {
  companyId: Scalars['Int']['input'];
  limit?: Scalars['Int']['input'];
  query: Scalars['String']['input'];
};


export type QuerySearchItemsArgs = {
  filters?: InputMaybe<ItemFilters>;
  pagination?: InputMaybe<ItemPagination>;
};


export type QueryServicetypesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryStockhistoryByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySuppliersByBranchArgs = {
  branchID: Scalars['Int']['input'];
  companyID: Scalars['Int']['input'];
};


export type QuerySuppliersByCompanyArgs = {
  companyID: Scalars['Int']['input'];
};


export type QuerySuppliersByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySysdoctypesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySysdocumenttypesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySysorderstatusByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySystransactiontypesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySysuseractionsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySysuseractionsByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryTemporderdetailBySessionArgs = {
  sessionID: Scalars['String']['input'];
};


export type QueryTemporderdetailsByOrderArgs = {
  orderID: Scalars['Int']['input'];
};


export type QueryTemporderdetailsBySessionArgs = {
  sessionID: Scalars['String']['input'];
};


export type QueryTempstockhistorydetailsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTempstockhistorydetailsBySessionArgs = {
  sessionID: Scalars['String']['input'];
};


export type QueryTransactionsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUltimoComprobanteArgs = {
  cbteTipo: Scalars['Int']['input'];
  ptoVta: Scalars['Int']['input'];
};


export type QueryUseraccessByIdArgs = {
  branchID: Scalars['Int']['input'];
  companyID: Scalars['Int']['input'];
  roleID: Scalars['Int']['input'];
  userID: Scalars['Int']['input'];
};


export type QueryUsersByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryVendorsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryVerifyTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryWarehousesByIdArgs = {
  id: Scalars['Int']['input'];
};

export type RolesCreate = {
  RoleName: Scalars['String']['input'];
};

export type RolesInDb = {
  __typename?: 'RolesInDB';
  RoleID: Scalars['Int']['output'];
  RoleName: Scalars['String']['output'];
};

export type RolesUpdate = {
  RoleName?: InputMaybe<Scalars['String']['input']>;
};

export type SaleConditionsCreate = {
  CreditCardID: Scalars['Int']['input'];
  DueDate: Scalars['Date']['input'];
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Name: Scalars['String']['input'];
  Surcharge: Scalars['Float']['input'];
};

export type SaleConditionsInDb = {
  __typename?: 'SaleConditionsInDB';
  CreditCardID: Scalars['Int']['output'];
  DueDate: Scalars['Date']['output'];
  IsActive?: Maybe<Scalars['Boolean']['output']>;
  Name: Scalars['String']['output'];
  SaleConditionID: Scalars['Int']['output'];
  Surcharge: Scalars['Float']['output'];
};

export type SaleConditionsUpdate = {
  CreditCardID?: InputMaybe<Scalars['Int']['input']>;
  DueDate?: InputMaybe<Scalars['Date']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
  Surcharge?: InputMaybe<Scalars['Float']['input']>;
};

export type SearchStats = {
  __typename?: 'SearchStats';
  filtersApplied: Array<Scalars['String']['output']>;
  searchTimeMs: Scalars['Float']['output'];
  totalResults: Scalars['Int']['output'];
};

export type ServerInfo = {
  __typename?: 'ServerInfo';
  environment: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  version: Scalars['String']['output'];
};

export type ServiceTypeCreate = {
  Type?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceTypeInDb = {
  __typename?: 'ServiceTypeInDB';
  ServiceTypeID: Scalars['Int']['output'];
  Type?: Maybe<Scalars['String']['output']>;
};

export type ServiceTypeUpdate = {
  Type?: InputMaybe<Scalars['String']['input']>;
};

export type StockHistoryCreate = {
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  ItemID: Scalars['Int']['input'];
  QuantityAfter: Scalars['Int']['input'];
  QuantityBefore: Scalars['Int']['input'];
  QuantityUpdate: Scalars['Int']['input'];
  Reason?: InputMaybe<Scalars['String']['input']>;
  UserID: Scalars['Int']['input'];
  WarehouseID: Scalars['Int']['input'];
};

export type StockHistoryInDb = {
  __typename?: 'StockHistoryInDB';
  BranchID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  ItemID: Scalars['Int']['output'];
  QuantityAfter: Scalars['Int']['output'];
  QuantityBefore: Scalars['Int']['output'];
  QuantityUpdate: Scalars['Int']['output'];
  Reason?: Maybe<Scalars['String']['output']>;
  StockHistoryID: Scalars['Int']['output'];
  TransactionDate: Scalars['DateTime']['output'];
  UserID: Scalars['Int']['output'];
  WarehouseID: Scalars['Int']['output'];
};

export type StockHistoryUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  ItemID?: InputMaybe<Scalars['Int']['input']>;
  QuantityAfter?: InputMaybe<Scalars['Int']['input']>;
  QuantityBefore?: InputMaybe<Scalars['Int']['input']>;
  QuantityUpdate?: InputMaybe<Scalars['Int']['input']>;
  Reason?: InputMaybe<Scalars['String']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
  WarehouseID?: InputMaybe<Scalars['Int']['input']>;
};

export type SuppliersCreate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  City?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  CountryID?: InputMaybe<Scalars['Int']['input']>;
  DocNumber?: InputMaybe<Scalars['String']['input']>;
  DocTypeID?: InputMaybe<Scalars['Int']['input']>;
  Email?: InputMaybe<Scalars['String']['input']>;
  FirstName: Scalars['String']['input'];
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  LastName?: InputMaybe<Scalars['String']['input']>;
  Phone?: InputMaybe<Scalars['String']['input']>;
  PostalCode?: InputMaybe<Scalars['String']['input']>;
  ProvinceID?: InputMaybe<Scalars['Int']['input']>;
};

export type SuppliersInDb = {
  __typename?: 'SuppliersInDB';
  Address?: Maybe<Scalars['String']['output']>;
  BranchData?: Maybe<BranchesInDb>;
  BranchID?: Maybe<Scalars['Int']['output']>;
  City?: Maybe<Scalars['String']['output']>;
  CompanyData?: Maybe<CompanyDataInDb>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
  CountryData?: Maybe<CountriesInDb>;
  CountryID?: Maybe<Scalars['Int']['output']>;
  DocNumber?: Maybe<Scalars['String']['output']>;
  DocTypeData?: Maybe<SysDocTypesInDb>;
  DocTypeID?: Maybe<Scalars['Int']['output']>;
  Email?: Maybe<Scalars['String']['output']>;
  FirstName: Scalars['String']['output'];
  IsActive?: Maybe<Scalars['Boolean']['output']>;
  LastName?: Maybe<Scalars['String']['output']>;
  Phone?: Maybe<Scalars['String']['output']>;
  PostalCode?: Maybe<Scalars['String']['output']>;
  ProvinceData?: Maybe<ProvincesInDb>;
  ProvinceID?: Maybe<Scalars['Int']['output']>;
  SupplierID: Scalars['Int']['output'];
};

export type SuppliersUpdate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  City?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  CountryID?: InputMaybe<Scalars['Int']['input']>;
  DocNumber?: InputMaybe<Scalars['String']['input']>;
  DocTypeID?: InputMaybe<Scalars['Int']['input']>;
  Email?: InputMaybe<Scalars['String']['input']>;
  FirstName?: InputMaybe<Scalars['String']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  LastName?: InputMaybe<Scalars['String']['input']>;
  Phone?: InputMaybe<Scalars['String']['input']>;
  PostalCode?: InputMaybe<Scalars['String']['input']>;
  ProvinceID?: InputMaybe<Scalars['Int']['input']>;
};

export type SysDocTypesCreate = {
  IsActive: Scalars['Boolean']['input'];
  Name: Scalars['String']['input'];
};

export type SysDocTypesInDb = {
  __typename?: 'SysDocTypesInDB';
  DocTypeID: Scalars['Int']['output'];
  IsActive: Scalars['Boolean']['output'];
  Name: Scalars['String']['output'];
};

export type SysDocTypesUpdate = {
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
};

export type SysDocumentTypesCreate = {
  Name: Scalars['String']['input'];
};

export type SysDocumentTypesInDb = {
  __typename?: 'SysDocumentTypesInDB';
  DocumentTypeID: Scalars['Int']['output'];
  Name: Scalars['String']['output'];
};

export type SysDocumentTypesUpdate = {
  Name?: InputMaybe<Scalars['String']['input']>;
};

export type SysOrderStatusInDb = {
  __typename?: 'SysOrderStatusInDB';
  OrderStatusID: Scalars['Int']['output'];
  Status: Scalars['String']['output'];
};

export type SysTransactionTypesInDb = {
  __typename?: 'SysTransactionTypesInDB';
  TransactTypeID: Scalars['Int']['output'];
  TypeName: Scalars['String']['output'];
};

export type SysUserActionsCreate = {
  ActionName?: InputMaybe<Scalars['String']['input']>;
};

export type SysUserActionsInDb = {
  __typename?: 'SysUserActionsInDB';
  ActionID: Scalars['Int']['output'];
  ActionName?: Maybe<Scalars['String']['output']>;
};

export type SysUserActionsUpdate = {
  ActionName?: InputMaybe<Scalars['String']['input']>;
};

export type TempOrderDetailsCreate = {
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  Description: Scalars['String']['input'];
  ItemID: Scalars['Int']['input'];
  OrderDetailID?: InputMaybe<Scalars['Int']['input']>;
  OrderID?: InputMaybe<Scalars['Int']['input']>;
  OrderSessionID?: InputMaybe<Scalars['UUID']['input']>;
  PriceListID: Scalars['Int']['input'];
  Quantity: Scalars['Int']['input'];
  UnitPrice: Scalars['Float']['input'];
  UserID: Scalars['Int']['input'];
  WarehouseID: Scalars['Int']['input'];
};

export type TempOrderDetailsInDb = {
  __typename?: 'TempOrderDetailsInDB';
  BranchID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  Description: Scalars['String']['output'];
  ItemID: Scalars['Int']['output'];
  OrderDetailID?: Maybe<Scalars['Int']['output']>;
  OrderID?: Maybe<Scalars['Int']['output']>;
  OrderSessionID: Scalars['UUID']['output'];
  PriceListID: Scalars['Int']['output'];
  Quantity: Scalars['Int']['output'];
  UnitPrice: Scalars['Float']['output'];
  UserID: Scalars['Int']['output'];
  WarehouseID: Scalars['Int']['output'];
};

export type TempOrderDetailsUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  Description?: InputMaybe<Scalars['String']['input']>;
  ItemID?: InputMaybe<Scalars['Int']['input']>;
  OrderDetailID?: InputMaybe<Scalars['Int']['input']>;
  OrderID?: InputMaybe<Scalars['Int']['input']>;
  OrderSessionID?: InputMaybe<Scalars['UUID']['input']>;
  PriceListID?: InputMaybe<Scalars['Int']['input']>;
  Quantity?: InputMaybe<Scalars['Int']['input']>;
  UnitPrice?: InputMaybe<Scalars['Float']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
  WarehouseID?: InputMaybe<Scalars['Int']['input']>;
};

export type TempStockHistoryDetailsCreate = {
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  ItemID: Scalars['Int']['input'];
  Quantity: Scalars['Int']['input'];
  Reason?: InputMaybe<Scalars['String']['input']>;
  SessionID: Scalars['String']['input'];
  UserID: Scalars['Int']['input'];
  WarehouseID: Scalars['Int']['input'];
};

export type TempStockHistoryDetailsInDb = {
  __typename?: 'TempStockHistoryDetailsInDB';
  BranchID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  EntryDate: Scalars['DateTime']['output'];
  IsProcessed: Scalars['Boolean']['output'];
  ItemID: Scalars['Int']['output'];
  Quantity: Scalars['Int']['output'];
  Reason?: Maybe<Scalars['String']['output']>;
  SessionID: Scalars['String']['output'];
  TempStockEntryID: Scalars['Int']['output'];
  UniqueID: Scalars['UUID']['output'];
  UserID: Scalars['Int']['output'];
  WarehouseID: Scalars['Int']['output'];
};

export type TempStockHistoryDetailsUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  IsProcessed?: InputMaybe<Scalars['Boolean']['input']>;
  ItemID?: InputMaybe<Scalars['Int']['input']>;
  Quantity?: InputMaybe<Scalars['Int']['input']>;
  Reason?: InputMaybe<Scalars['String']['input']>;
  SessionID?: InputMaybe<Scalars['String']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
  WarehouseID?: InputMaybe<Scalars['Int']['input']>;
};

export type TestConnectionResult = {
  __typename?: 'TestConnectionResult';
  details: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type TransactionsInDb = {
  __typename?: 'TransactionsInDB';
  BranchID?: Maybe<Scalars['Int']['output']>;
  ClientID?: Maybe<Scalars['Int']['output']>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
  Notes?: Maybe<Scalars['String']['output']>;
  OrderID?: Maybe<Scalars['Int']['output']>;
  Subtotal?: Maybe<Scalars['Float']['output']>;
  SupplierID?: Maybe<Scalars['Int']['output']>;
  Taxes?: Maybe<Scalars['Float']['output']>;
  Total?: Maybe<Scalars['Float']['output']>;
  TransacTypeID?: Maybe<Scalars['Int']['output']>;
  TransactionDate?: Maybe<Scalars['DateTime']['output']>;
  TransactionID: Scalars['Int']['output'];
};

export type UserAccessCreate = {
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  RoleID: Scalars['Int']['input'];
  UserID: Scalars['Int']['input'];
};

export type UserAccessInDb = {
  __typename?: 'UserAccessInDB';
  BranchData?: Maybe<BranchesInDb>;
  BranchID: Scalars['Int']['output'];
  CompanyData?: Maybe<CompanyDataInDb>;
  CompanyID: Scalars['Int']['output'];
  RoleData?: Maybe<RolesInDb>;
  RoleID: Scalars['Int']['output'];
  UserData?: Maybe<UsersInDb>;
  UserID: Scalars['Int']['output'];
};

export type UserAccessInfo = {
  __typename?: 'UserAccessInfo';
  Branch: Scalars['String']['output'];
  BranchID: Scalars['Int']['output'];
  Company: Scalars['String']['output'];
  CompanyID: Scalars['Int']['output'];
  Role: Scalars['String']['output'];
  RoleID: Scalars['Int']['output'];
  UserID: Scalars['Int']['output'];
};

export type UserCreate = {
  FullName?: InputMaybe<Scalars['String']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Nickname?: InputMaybe<Scalars['String']['input']>;
  Password?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateInput = {
  fullname: Scalars['String']['input'];
  isActive?: Scalars['Boolean']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  FullName?: Maybe<Scalars['String']['output']>;
  IsActive: Scalars['Boolean']['output'];
  Nickname: Scalars['String']['output'];
  UserAccess: Array<UserAccessInfo>;
  UserID: Scalars['Int']['output'];
};

export type UserUpdate = {
  FullName?: InputMaybe<Scalars['String']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Nickname?: InputMaybe<Scalars['String']['input']>;
  Password?: InputMaybe<Scalars['String']['input']>;
  UserID: Scalars['Int']['input'];
};

export type UsersInDb = {
  __typename?: 'UsersInDB';
  FullName?: Maybe<Scalars['String']['output']>;
  IsActive?: Maybe<Scalars['Boolean']['output']>;
  Nickname?: Maybe<Scalars['String']['output']>;
  Password?: Maybe<Scalars['String']['output']>;
  UserID: Scalars['Int']['output'];
};

export type VendorsCreate = {
  Commission?: InputMaybe<Scalars['Float']['input']>;
  IsActive?: Scalars['Boolean']['input'];
  VendorName: Scalars['String']['input'];
};

export type VendorsInDb = {
  __typename?: 'VendorsInDB';
  Commission?: Maybe<Scalars['Float']['output']>;
  IsActive: Scalars['Boolean']['output'];
  VendorID: Scalars['Int']['output'];
  VendorName: Scalars['String']['output'];
};

export type VendorsUpdate = {
  Commission?: InputMaybe<Scalars['Float']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  VendorName?: InputMaybe<Scalars['String']['input']>;
};

export type VoucherBasicInfo = {
  __typename?: 'VoucherBasicInfo';
  raw: Scalars['String']['output'];
};

export type VoucherInfo = {
  __typename?: 'VoucherInfo';
  raw: Scalars['String']['output'];
};

export type VoucherRequest = {
  CbteFch: Scalars['Int']['input'];
  CbteModo?: Scalars['String']['input'];
  CbteNro: Scalars['Int']['input'];
  CbteTipo: Scalars['Int']['input'];
  CodAutorizacion: Scalars['String']['input'];
  CuitEmisor: Scalars['String']['input'];
  DocNroReceptor: Scalars['String']['input'];
  DocTipoReceptor: Scalars['String']['input'];
  ImpTotal: Scalars['Float']['input'];
  PtoVta: Scalars['Int']['input'];
};

export type VoucherRequestBasic = {
  CbteNro: Scalars['Int']['input'];
  CbteTipo: Scalars['Int']['input'];
  PtoVta: Scalars['Int']['input'];
};

export type WarehousesCreate = {
  Addres?: InputMaybe<Scalars['String']['input']>;
  Name: Scalars['String']['input'];
};

export type WarehousesInDb = {
  __typename?: 'WarehousesInDB';
  Addres?: Maybe<Scalars['String']['output']>;
  Name: Scalars['String']['output'];
  WarehouseID: Scalars['Int']['output'];
};

export type WarehousesUpdate = {
  Addres?: InputMaybe<Scalars['String']['input']>;
  Name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBrand2MutationVariables = Exact<{
  input: BrandsCreate;
}>;


export type CreateBrand2Mutation = { __typename?: 'Mutation', createBrand: { __typename?: 'BrandsInDB', BrandID: number, Name: string, IsActive?: boolean | null } };

export type CreateClientMutationVariables = Exact<{
  input: ClientsCreate;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'ClientsInDB', ClientID: number, DocTypeID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, City?: string | null, PostalCode?: string | null, IsActive: boolean, CountryID: number, ProvinceID: number, PriceListID: number, VendorID: number } };

export type CreateSupplierMutationVariables = Exact<{
  input: SuppliersCreate;
}>;


export type CreateSupplierMutation = { __typename?: 'Mutation', createSupplier: { __typename?: 'SuppliersInDB', SupplierID: number, DocTypeID?: number | null, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, IsActive?: boolean | null, CountryID?: number | null, ProvinceID?: number | null, City?: string | null, PostalCode?: string | null } };

export type CreateVendorMutationVariables = Exact<{
  input: VendorsCreate;
}>;


export type CreateVendorMutation = { __typename?: 'Mutation', createVendor: { __typename?: 'VendorsInDB', VendorID: number, VendorName: string, Commission?: number | null, IsActive: boolean } };

export type DeleteBrandMutationVariables = Exact<{
  brandID: Scalars['Int']['input'];
}>;


export type DeleteBrandMutation = { __typename?: 'Mutation', deleteBrand: boolean };

export type DeleteClientMutationVariables = Exact<{
  clientID: Scalars['Int']['input'];
}>;


export type DeleteClientMutation = { __typename?: 'Mutation', deleteClient: { __typename?: 'DeleteResponse', success: boolean, message: string } };

export type DeleteSupplierMutationVariables = Exact<{
  supplierID: Scalars['Int']['input'];
}>;


export type DeleteSupplierMutation = { __typename?: 'Mutation', deleteSupplier: boolean };

export type DeleteVendorMutationVariables = Exact<{
  vendorID: Scalars['Int']['input'];
}>;


export type DeleteVendorMutation = { __typename?: 'Mutation', deleteVendor: boolean };

export type ToggleClientStatusMutationVariables = Exact<{
  clientID: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
}>;


export type ToggleClientStatusMutation = { __typename?: 'Mutation', updateClient?: { __typename?: 'ClientsInDB', ClientID: number, IsActive: boolean } | null };

export type ToggleSupplierStatusMutationVariables = Exact<{
  supplierID: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
}>;


export type ToggleSupplierStatusMutation = { __typename?: 'Mutation', updateSupplier?: { __typename?: 'SuppliersInDB', SupplierID: number, IsActive?: boolean | null } | null };

export type ToggleVendorStatusMutationVariables = Exact<{
  vendorID: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
}>;


export type ToggleVendorStatusMutation = { __typename?: 'Mutation', toggleVendorStatus?: { __typename?: 'VendorsInDB', VendorID: number, IsActive: boolean } | null };

export type UpdateBrandMutationVariables = Exact<{
  brandID: Scalars['Int']['input'];
  input: BrandsUpdate;
}>;


export type UpdateBrandMutation = { __typename?: 'Mutation', updateBrand?: { __typename?: 'BrandsInDB', BrandID: number, Name: string, IsActive?: boolean | null } | null };

export type UpdateClientMutationVariables = Exact<{
  clientID: Scalars['Int']['input'];
  input: ClientsUpdate;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient?: { __typename?: 'ClientsInDB', ClientID: number, DocTypeID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, City?: string | null, PostalCode?: string | null, IsActive: boolean, CountryID: number, ProvinceID: number, PriceListID: number, VendorID: number } | null };

export type UpdateSupplierMutationVariables = Exact<{
  supplierID: Scalars['Int']['input'];
  input: SuppliersUpdate;
}>;


export type UpdateSupplierMutation = { __typename?: 'Mutation', updateSupplier?: { __typename?: 'SuppliersInDB', SupplierID: number, DocTypeID?: number | null, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, IsActive?: boolean | null, CountryID?: number | null, ProvinceID?: number | null, City?: string | null, PostalCode?: string | null } | null };

export type UpdateVendorMutationVariables = Exact<{
  vendorID: Scalars['Int']['input'];
  input: VendorsUpdate;
}>;


export type UpdateVendorMutation = { __typename?: 'Mutation', updateVendor?: { __typename?: 'VendorsInDB', VendorID: number, VendorName: string, Commission?: number | null, IsActive: boolean } | null };

export type GetAllBranchesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBranchesQuery = { __typename?: 'Query', allBranches: Array<{ __typename?: 'BranchesInDB', BranchID: number, CompanyID: number, Name: string, Address?: string | null, Phone?: string | null, CompanyData?: { __typename?: 'CompanyDataInDB', Name?: string | null } | null }> };

export type GetAllBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBrandsQuery = { __typename?: 'Query', allBrands: Array<{ __typename?: 'BrandsInDB', BrandID: number, Name: string, IsActive?: boolean | null }> };

export type GetAllCarBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCarBrandsQuery = { __typename?: 'Query', allCarbrands: Array<{ __typename?: 'CarBrandsInDB', CarBrandID: number, Name: string, CompanyID?: number | null }> };

export type GetAllCarModelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCarModelsQuery = { __typename?: 'Query', allCarmodels: Array<{ __typename?: 'CarModelsInDB', CarModelID: number, CarBrandID: number, Model: string, CarBrandData?: { __typename?: 'CarBrandsInDB', Name: string } | null }> };

export type GetAllCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCarsQuery = { __typename?: 'Query', allCars: Array<{ __typename?: 'CarsInDB', CarID: number, LicensePlate: string, Year?: number | null, CarModelID: number, ClientID: number, LastServiceMileage?: number | null, IsDebtor?: boolean | null, DiscountID: number, CarModelData?: { __typename?: 'CarModelsInDB', Model: string } | null, CarBrandData?: { __typename?: 'CarBrandsInDB', CarBrandID: number, Name: string } | null, ClientData?: { __typename?: 'ClientsInDB', FirstName: string, LastName?: string | null } | null }> };

export type GetAllClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllClientsQuery = { __typename?: 'Query', allClients: Array<{ __typename?: 'ClientsInDB', ClientID: number, DocTypeID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, City?: string | null, PostalCode?: string | null, IsActive: boolean, CountryID: number, ProvinceID: number, PriceListID: number, VendorID: number }> };

export type GetAllCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCompaniesQuery = { __typename?: 'Query', allCompanydata: Array<{ __typename?: 'CompanyDataInDB', CompanyID: number, Name?: string | null, Address?: string | null, CUIT?: string | null, Grossincome?: string | null, Startdate?: any | null, Logo?: string | null }> };

export type GetAllCreditCardGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCreditCardGroupsQuery = { __typename?: 'Query', allCreditcardgroups: Array<{ __typename?: 'CreditCardGroupsInDB', CreditCardGroupID: number, GroupName?: string | null }> };

export type GetAllCreditCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCreditCardsQuery = { __typename?: 'Query', allCreditcards: Array<{ __typename?: 'CreditCardsInDB', CreditCardID: number, CreditCardGroupID: number, CardName: string, Surcharge?: number | null, Installments?: number | null, IsActive?: boolean | null, GroupData?: { __typename?: 'CreditCardGroupsInDB', GroupName?: string | null } | null }> };

export type GetAllDiscountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDiscountsQuery = { __typename?: 'Query', allDiscounts: Array<{ __typename?: 'DiscountsInDB', DiscountID: number, DiscountName: string, Percentage: number }> };

export type GetAllDocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDocumentsQuery = { __typename?: 'Query', allDocuments: Array<{ __typename?: 'DocumentsInDB', DocumentID: number, CompanyID: number, BranchID: number, DocumentTypeID: number, Description: string, DocumentNumber: number, PointOfSale: number, IsActive: boolean, Testing: boolean, ShouldAccount: boolean, MovesStock: boolean, IsFiscal?: boolean | null, IsElectronic?: boolean | null, IsManual?: boolean | null, IsQuotation?: boolean | null, MaxItems?: number | null }> };

export type GetAllItemCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllItemCategoriesQuery = { __typename?: 'Query', allItemcategories: Array<{ __typename?: 'ItemCategoriesInDB', ItemCategoryID: number, CategoryName: string }> };

export type GetAllItemSubcategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllItemSubcategoriesQuery = { __typename?: 'Query', allItemsubcategories: Array<{ __typename?: 'ItemSubcategoriesInDB', ItemSubcategoryID: number, ItemCategoryID: number, SubcategoryName: string, CategoryData?: { __typename?: 'ItemCategoriesInDB', CategoryName: string } | null }> };

export type GetAllItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllItemsQuery = { __typename?: 'Query', allItems: Array<{ __typename?: 'ItemsInDB', ItemID: number, CompanyID: number, BranchID: number, Code: string, Description: string, BrandID: number, ItemCategoryID: number, ItemSubcategoryID: number, SupplierID: number, ControlStock: boolean, ReplenishmentStock: number, IsActive: boolean, OEM?: string | null, WarehouseID: number, LastModified?: any | null }> };

export type GetAllOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrdersQuery = { __typename?: 'Query', allOrders: Array<{ __typename?: 'OrdersInDB', OrderID: number, CompanyID: number, BranchID: number, Date_: any, ClientID: number, CarID?: number | null, IsService?: boolean | null, ServiceTypeID?: number | null, Mileage?: number | null, NextServiceMileage?: number | null, Notes?: string | null, SaleConditionID: number, DiscountID: number, Subtotal: number, Total: number, VAT: number, UserID: number, DocumentID: number, PriceListID: number, OrderStatusID: number, WarehouseID: number }> };

export type GetAllOrderstatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrderstatusQuery = { __typename?: 'Query', allSysorderstatus: Array<{ __typename?: 'SysOrderStatusInDB', OrderStatusID: number, Status: string }> };

export type GetAllPricelistItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPricelistItemsQuery = { __typename?: 'Query', allPricelistitems: Array<{ __typename?: 'PriceListItemsInDB', PriceListID: number, ItemID: number, Price: number, EffectiveDate: any, PriceListData?: { __typename?: 'PriceListsInDB', Name: string, Description?: string | null, IsActive?: boolean | null } | null }> };

export type GetAllRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRolesQuery = { __typename?: 'Query', allRoles: Array<{ __typename?: 'RolesInDB', RoleID: number, RoleName: string }> };

export type GetAllSaleConditionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSaleConditionsQuery = { __typename?: 'Query', allSaleconditions: Array<{ __typename?: 'SaleConditionsInDB', SaleConditionID: number, CreditCardID: number, Name: string, DueDate: any, Surcharge: number, IsActive?: boolean | null }> };

export type GetAllServicetypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllServicetypesQuery = { __typename?: 'Query', allServicetypes: Array<{ __typename?: 'ServiceTypeInDB', ServiceTypeID: number, Type?: string | null }> };

export type GetAllSuppliersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSuppliersQuery = { __typename?: 'Query', allSuppliers: Array<{ __typename?: 'SuppliersInDB', SupplierID: number, DocTypeID?: number | null, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, IsActive?: boolean | null, CountryID?: number | null, ProvinceID?: number | null, City?: string | null, PostalCode?: string | null }> };

export type GetAllUseraccessQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUseraccessQuery = { __typename?: 'Query', allUseraccess: Array<{ __typename?: 'UserAccessInDB', UserID: number, CompanyID: number, BranchID: number, RoleID: number, UserData?: { __typename?: 'UsersInDB', FullName?: string | null } | null, CompanyData?: { __typename?: 'CompanyDataInDB', Name?: string | null } | null, BranchData?: { __typename?: 'BranchesInDB', Name: string } | null, RoleData?: { __typename?: 'RolesInDB', RoleName: string } | null }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'UsersInDB', UserID: number, Nickname?: string | null, FullName?: string | null, IsActive?: boolean | null }> };

export type GetAllVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllVendorsQuery = { __typename?: 'Query', allVendors: Array<{ __typename?: 'VendorsInDB', VendorID: number, VendorName: string, Commission?: number | null, IsActive: boolean }> };

export type GetBranchByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
}>;


export type GetBranchByIdQuery = { __typename?: 'Query', branchesById?: { __typename?: 'BranchesInDB', BranchID: number, CompanyID: number, Name: string, Address?: string | null, Phone?: string | null } | null };

export type GetBranchesByCompanyQueryVariables = Exact<{
  companyID: Scalars['Int']['input'];
}>;


export type GetBranchesByCompanyQuery = { __typename?: 'Query', branchesByCompany: Array<{ __typename?: 'BranchesInDB', BranchID: number, Name: string }> };

export type GetBrandByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetBrandByIdQuery = { __typename?: 'Query', brandsById?: { __typename?: 'BrandsInDB', BrandID: number, Name: string, IsActive?: boolean | null } | null };

export type GetCarBrandByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCarBrandByIdQuery = { __typename?: 'Query', carbrandsById?: { __typename?: 'CarBrandsInDB', CarBrandID: number, Name: string } | null };

export type GetCarByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCarByIdQuery = { __typename?: 'Query', carsById?: { __typename?: 'CarsInDB', CarID: number, LicensePlate: string, Year?: number | null, CarModelID: number, ClientID: number, LastServiceMileage?: number | null, IsDebtor?: boolean | null, DiscountID: number, CarModelData?: { __typename?: 'CarModelsInDB', Model: string } | null, CarBrandData?: { __typename?: 'CarBrandsInDB', Name: string } | null, ClientData?: { __typename?: 'ClientsInDB', FirstName: string, LastName?: string | null } | null } | null };

export type GetCarFormDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarFormDataQuery = { __typename?: 'Query', carBrands: Array<{ __typename?: 'CarBrandsInDB', CarBrandID: number, Name: string }>, carModels: Array<{ __typename?: 'CarModelsInDB', CarModelID: number, CarBrandID: number, Model: string }>, clients: Array<{ __typename?: 'ClientsInDB', ClientID: number, FirstName: string, LastName?: string | null }>, discounts: Array<{ __typename?: 'DiscountsInDB', DiscountID: number, DiscountName: string }> };

export type GetCarModelByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCarModelByIdQuery = { __typename?: 'Query', carmodelsById?: { __typename?: 'CarModelsInDB', CarModelID: number, CarBrandID: number, Model: string, CarBrandData?: { __typename?: 'CarBrandsInDB', Name: string } | null } | null };

export type GetCarModelsByBrandQueryVariables = Exact<{
  brandID: Scalars['Int']['input'];
}>;


export type GetCarModelsByBrandQuery = { __typename?: 'Query', carmodelsByBrand: Array<{ __typename?: 'CarModelsInDB', CarModelID: number, CarBrandID: number, Model: string, CarBrandData?: { __typename?: 'CarBrandsInDB', Name: string } | null }> };

export type GetClientByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetClientByIdQuery = { __typename?: 'Query', clientsById?: { __typename?: 'ClientsInDB', ClientID: number, DocTypeID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, City?: string | null, PostalCode?: string | null, IsActive: boolean, CountryID: number, ProvinceID: number, PriceListID: number, VendorID: number } | null };

export type GetClientFormDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientFormDataQuery = { __typename?: 'Query', docTypes: Array<{ __typename?: 'SysDocTypesInDB', DocTypeID: number, Name: string }>, countries: Array<{ __typename?: 'CountriesInDB', CountryID: number, Name: string }>, provinces: Array<{ __typename?: 'ProvincesInDB', ProvinceID: number, CountryID: number, Name: string }>, priceLists: Array<{ __typename?: 'PriceListsInDB', PriceListID: number, Name: string, Description?: string | null, IsActive?: boolean | null }>, vendors: Array<{ __typename?: 'VendorsInDB', VendorID: number, VendorName: string, IsActive: boolean }> };

export type GetCompanyByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCompanyByIdQuery = { __typename?: 'Query', companydataById?: { __typename?: 'CompanyDataInDB', CompanyID: number, Name?: string | null, Address?: string | null, CUIT?: string | null, Grossincome?: string | null, Startdate?: any | null, Logo?: string | null } | null };

export type GetCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountriesQuery = { __typename?: 'Query', allCountries: Array<{ __typename?: 'CountriesInDB', CountryID: number, Name: string }> };

export type GetCreditCardByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCreditCardByIdQuery = { __typename?: 'Query', creditcardById?: { __typename?: 'CreditCardsInDB', CreditCardID: number, CreditCardGroupID: number, CardName: string, Surcharge?: number | null, Installments?: number | null, IsActive?: boolean | null, GroupData?: { __typename?: 'CreditCardGroupsInDB', GroupName?: string | null } | null } | null };

export type GetCreditCardGroupByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCreditCardGroupByIdQuery = { __typename?: 'Query', creditcardgroupById?: { __typename?: 'CreditCardGroupsInDB', CreditCardGroupID: number, GroupName?: string | null } | null };

export type GetDashboardDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardDataQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'ClientsInDB', ClientID: number, IsActive: boolean }>, items: Array<{ __typename?: 'ItemsInDB', ItemID: number, CompanyID: number, IsActive: boolean, ControlStock: boolean, ReplenishmentStock: number }>, orders: Array<{ __typename?: 'OrdersInDB', OrderID: number, CompanyID: number, OrderStatusID: number, Total: number, Date_: any }>, itemstock: Array<{ __typename?: 'ItemStockInDB', ItemID: number, Quantity?: number | null, MinStockLevel?: number | null, CompanyID?: number | null }> };

export type GetDiscountByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetDiscountByIdQuery = { __typename?: 'Query', discountsById?: { __typename?: 'DiscountsInDB', DiscountID: number, DiscountName: string, Percentage: number } | null };

export type GetDocumentByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetDocumentByIdQuery = { __typename?: 'Query', documentsById?: { __typename?: 'DocumentsInDB', DocumentID: number, CompanyID: number, BranchID: number, DocumentTypeID: number, Description: string, DocumentNumber: number, PointOfSale: number, IsActive: boolean, Testing: boolean, ShouldAccount: boolean, MovesStock: boolean, IsFiscal?: boolean | null, IsElectronic?: boolean | null, IsManual?: boolean | null, IsQuotation?: boolean | null, MaxItems?: number | null } | null };

export type GetDocumentTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDocumentTypesQuery = { __typename?: 'Query', allSysdocumenttypes: Array<{ __typename?: 'SysDocumentTypesInDB', DocumentTypeID: number, Name: string }> };

export type GetFilterFieldsQueryVariables = Exact<{
  model: Scalars['String']['input'];
}>;


export type GetFilterFieldsQuery = { __typename?: 'Query', filterFields: Array<{ __typename?: 'FilterField', field: string, label: string, type: string, relationModel?: string | null, dependsOn?: string | null }> };

export type GetItemByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetItemByIdQuery = { __typename?: 'Query', itemsById?: { __typename?: 'ItemsInDB', ItemID: number, CompanyID: number, BranchID: number, BrandID: number, Code: string, Description: string, ItemCategoryID: number, ItemSubcategoryID: number, SupplierID: number, ControlStock: boolean, ReplenishmentStock: number, IsOffer: boolean, OEM?: string | null, LastModified?: any | null, WarehouseID: number, IsActive: boolean } | null };

export type GetItemCategoryByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetItemCategoryByIdQuery = { __typename?: 'Query', itemcategoriesById?: { __typename?: 'ItemCategoriesInDB', ItemCategoryID: number, CategoryName: string } | null };

export type GetItemSubcategoriesByCategoryQueryVariables = Exact<{
  categoryID: Scalars['Int']['input'];
}>;


export type GetItemSubcategoriesByCategoryQuery = { __typename?: 'Query', itemsubcategoriesByCategory: Array<{ __typename?: 'ItemSubcategoriesInDB', ItemSubcategoryID: number, SubcategoryName: string, ItemCategoryID: number }> };

export type GetItemSubcategoryByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetItemSubcategoryByIdQuery = { __typename?: 'Query', itemsubcategoriesById?: { __typename?: 'ItemSubcategoriesInDB', ItemSubcategoryID: number, ItemCategoryID: number, SubcategoryName: string, CategoryData?: { __typename?: 'ItemCategoriesInDB', CategoryName: string } | null } | null };

export type GetOrderByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', ordersById?: { __typename?: 'OrdersInDB', OrderID: number, CompanyID: number, BranchID: number, Date_: any, ClientID: number, CarID?: number | null, IsService?: boolean | null, ServiceTypeID?: number | null, Mileage?: number | null, NextServiceMileage?: number | null, Notes?: string | null, SaleConditionID: number, DiscountID: number, Subtotal: number, Total: number, VAT: number, UserID: number, DocumentID: number, PriceListID: number, OrderStatusID: number, WarehouseID: number, Items?: Array<{ __typename?: 'OrderDetailsInDB', OrderDetailID: number, ItemID: number, Quantity: number, UnitPrice: number, Description?: string | null }> | null } | null };

export type GetPriceListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPriceListsQuery = { __typename?: 'Query', allPricelists: Array<{ __typename?: 'PriceListsInDB', PriceListID: number, Name: string, Description?: string | null, IsActive?: boolean | null }> };

export type GetPricelistByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPricelistByIdQuery = { __typename?: 'Query', pricelistsById?: { __typename?: 'PriceListsInDB', PriceListID: number, Name: string, Description?: string | null, IsActive?: boolean | null } | null };

export type GetPricelistItemsFilteredQueryVariables = Exact<{
  priceListID?: InputMaybe<Scalars['Int']['input']>;
  itemID?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPricelistItemsFilteredQuery = { __typename?: 'Query', pricelistitemsFiltered: Array<{ __typename?: 'PriceListItemsInDB', PriceListID: number, ItemID: number, Price: number, EffectiveDate: any, PriceListData?: { __typename?: 'PriceListsInDB', Name: string, Description?: string | null } | null }> };

export type GetProvincesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProvincesQuery = { __typename?: 'Query', allProvinces: Array<{ __typename?: 'ProvincesInDB', ProvinceID: number, CountryID: number, Name: string }> };

export type GetProvincesByCountryQueryVariables = Exact<{
  countryID: Scalars['Int']['input'];
}>;


export type GetProvincesByCountryQuery = { __typename?: 'Query', provincesByCountry: Array<{ __typename?: 'ProvincesInDB', ProvinceID: number, Name: string, CountryID: number }> };

export type GetRoleByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetRoleByIdQuery = { __typename?: 'Query', rolesById?: { __typename?: 'RolesInDB', RoleID: number, RoleName: string } | null };

export type GetSaleConditionByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetSaleConditionByIdQuery = { __typename?: 'Query', saleconditionsById?: { __typename?: 'SaleConditionsInDB', SaleConditionID: number, CreditCardID: number, Name: string, DueDate: any, Surcharge: number, IsActive?: boolean | null } | null };

export type GetServicetypeByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetServicetypeByIdQuery = { __typename?: 'Query', servicetypesById?: { __typename?: 'ServiceTypeInDB', ServiceTypeID: number, Type?: string | null } | null };

export type GetSupplierFormDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSupplierFormDataQuery = { __typename?: 'Query', docTypes: Array<{ __typename?: 'SysDocTypesInDB', DocTypeID: number, Name: string }>, countries: Array<{ __typename?: 'CountriesInDB', CountryID: number, Name: string }>, provinces: Array<{ __typename?: 'ProvincesInDB', ProvinceID: number, CountryID: number, Name: string }> };

export type GetSuppliersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSuppliersQuery = { __typename?: 'Query', allSuppliers: Array<{ __typename?: 'SuppliersInDB', SupplierID: number, DocTypeID?: number | null, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, IsActive?: boolean | null, CountryID?: number | null, ProvinceID?: number | null, City?: string | null, PostalCode?: string | null }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', usersById?: { __typename?: 'UsersInDB', UserID: number, Nickname?: string | null, FullName?: string | null, IsActive?: boolean | null } | null };

export type GetUseraccessByIdQueryVariables = Exact<{
  userID: Scalars['Int']['input'];
  companyID: Scalars['Int']['input'];
  branchID: Scalars['Int']['input'];
  roleID: Scalars['Int']['input'];
}>;


export type GetUseraccessByIdQuery = { __typename?: 'Query', useraccessById?: { __typename?: 'UserAccessInDB', UserID: number, CompanyID: number, BranchID: number, RoleID: number, UserData?: { __typename?: 'UsersInDB', Nickname?: string | null, FullName?: string | null } | null, CompanyData?: { __typename?: 'CompanyDataInDB', Name?: string | null } | null, RoleData?: { __typename?: 'RolesInDB', RoleName: string } | null, BranchData?: { __typename?: 'BranchesInDB', Name: string } | null } | null };

export type GetVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorsQuery = { __typename?: 'Query', allVendors: Array<{ __typename?: 'VendorsInDB', VendorID: number, VendorName: string, Commission?: number | null, IsActive: boolean }> };

export type GetWarehouseByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetWarehouseByIdQuery = { __typename?: 'Query', warehousesById?: { __typename?: 'WarehousesInDB', WarehouseID: number, Name: string, Addres?: string | null } | null };

export type GetWarehousesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWarehousesQuery = { __typename?: 'Query', allWarehouses: Array<{ __typename?: 'WarehousesInDB', WarehouseID: number, Name: string, Addres?: string | null }> };

export type SearchClientsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SearchClientsQuery = { __typename?: 'Query', allClients: Array<{ __typename?: 'ClientsInDB', ClientID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, City?: string | null, IsActive: boolean }> };

export type SearchItemsQueryVariables = Exact<{
  filters?: InputMaybe<ItemFilters>;
  pagination?: InputMaybe<ItemPagination>;
}>;


export type SearchItemsQuery = { __typename?: 'Query', searchItems: { __typename?: 'ItemsResponse', total: number, items: Array<{ __typename?: 'ItemSearchResult', ItemID: number, Code: string, Description: string, Price?: number | null }> } };

export type GetOrderMassiveQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrderMassiveQuery = { __typename?: 'Query', allOrders: Array<{ __typename?: 'OrdersInDB', OrderID: number, CompanyID: number, BranchID: number, Date_: any, ClientID: number, CarID?: number | null, IsService?: boolean | null, ServiceTypeID?: number | null, Mileage?: number | null, NextServiceMileage?: number | null, Notes?: string | null, SaleConditionID: number, DiscountID: number, Subtotal: number, Total: number, VAT: number, UserID: number, DocumentID: number, PriceListID: number, OrderStatusID: number, WarehouseID: number }>, allClients: Array<{ __typename?: 'ClientsInDB', ClientID: number, DocTypeID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, City?: string | null, PostalCode?: string | null, IsActive: boolean, CountryID: number, ProvinceID: number, PriceListID: number, VendorID: number }>, allSaleconditions: Array<{ __typename?: 'SaleConditionsInDB', SaleConditionID: number, CreditCardID: number, Name: string, DueDate: any, Surcharge: number, IsActive?: boolean | null }>, allUsers: Array<{ __typename?: 'UsersInDB', UserID: number, Nickname?: string | null, FullName?: string | null, IsActive?: boolean | null }>, allVendors: Array<{ __typename?: 'VendorsInDB', VendorID: number, VendorName: string, Commission?: number | null, IsActive: boolean }> };


export const CreateBrand2Document = gql`
    mutation CreateBrand2($input: BrandsCreate!) {
  createBrand(data: $input) {
    BrandID
    Name
    IsActive
  }
}
    `;
export type CreateBrand2MutationFn = Apollo.MutationFunction<CreateBrand2Mutation, CreateBrand2MutationVariables>;

/**
 * __useCreateBrand2Mutation__
 *
 * To run a mutation, you first call `useCreateBrand2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBrand2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBrand2Mutation, { data, loading, error }] = useCreateBrand2Mutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBrand2Mutation(baseOptions?: Apollo.MutationHookOptions<CreateBrand2Mutation, CreateBrand2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBrand2Mutation, CreateBrand2MutationVariables>(CreateBrand2Document, options);
      }
export type CreateBrand2MutationHookResult = ReturnType<typeof useCreateBrand2Mutation>;
export type CreateBrand2MutationResult = Apollo.MutationResult<CreateBrand2Mutation>;
export type CreateBrand2MutationOptions = Apollo.BaseMutationOptions<CreateBrand2Mutation, CreateBrand2MutationVariables>;
export const CreateClientDocument = gql`
    mutation CreateClient($input: ClientsCreate!) {
  createClient(data: $input) {
    ClientID
    DocTypeID
    DocNumber
    FirstName
    LastName
    Phone
    Email
    Address
    City
    PostalCode
    IsActive
    CountryID
    ProvinceID
    PriceListID
    VendorID
  }
}
    `;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const CreateSupplierDocument = gql`
    mutation CreateSupplier($input: SuppliersCreate!) {
  createSupplier(data: $input) {
    SupplierID
    DocTypeID
    DocNumber
    FirstName
    LastName
    Phone
    Email
    Address
    IsActive
    CountryID
    ProvinceID
    City
    PostalCode
  }
}
    `;
export type CreateSupplierMutationFn = Apollo.MutationFunction<CreateSupplierMutation, CreateSupplierMutationVariables>;

/**
 * __useCreateSupplierMutation__
 *
 * To run a mutation, you first call `useCreateSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSupplierMutation, { data, loading, error }] = useCreateSupplierMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSupplierMutation(baseOptions?: Apollo.MutationHookOptions<CreateSupplierMutation, CreateSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSupplierMutation, CreateSupplierMutationVariables>(CreateSupplierDocument, options);
      }
export type CreateSupplierMutationHookResult = ReturnType<typeof useCreateSupplierMutation>;
export type CreateSupplierMutationResult = Apollo.MutationResult<CreateSupplierMutation>;
export type CreateSupplierMutationOptions = Apollo.BaseMutationOptions<CreateSupplierMutation, CreateSupplierMutationVariables>;
export const CreateVendorDocument = gql`
    mutation CreateVendor($input: VendorsCreate!) {
  createVendor(data: $input) {
    VendorID
    VendorName
    Commission
    IsActive
  }
}
    `;
export type CreateVendorMutationFn = Apollo.MutationFunction<CreateVendorMutation, CreateVendorMutationVariables>;

/**
 * __useCreateVendorMutation__
 *
 * To run a mutation, you first call `useCreateVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVendorMutation, { data, loading, error }] = useCreateVendorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVendorMutation(baseOptions?: Apollo.MutationHookOptions<CreateVendorMutation, CreateVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVendorMutation, CreateVendorMutationVariables>(CreateVendorDocument, options);
      }
export type CreateVendorMutationHookResult = ReturnType<typeof useCreateVendorMutation>;
export type CreateVendorMutationResult = Apollo.MutationResult<CreateVendorMutation>;
export type CreateVendorMutationOptions = Apollo.BaseMutationOptions<CreateVendorMutation, CreateVendorMutationVariables>;
export const DeleteBrandDocument = gql`
    mutation DeleteBrand($brandID: Int!) {
  deleteBrand(brandID: $brandID)
}
    `;
export type DeleteBrandMutationFn = Apollo.MutationFunction<DeleteBrandMutation, DeleteBrandMutationVariables>;

/**
 * __useDeleteBrandMutation__
 *
 * To run a mutation, you first call `useDeleteBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBrandMutation, { data, loading, error }] = useDeleteBrandMutation({
 *   variables: {
 *      brandID: // value for 'brandID'
 *   },
 * });
 */
export function useDeleteBrandMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBrandMutation, DeleteBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBrandMutation, DeleteBrandMutationVariables>(DeleteBrandDocument, options);
      }
export type DeleteBrandMutationHookResult = ReturnType<typeof useDeleteBrandMutation>;
export type DeleteBrandMutationResult = Apollo.MutationResult<DeleteBrandMutation>;
export type DeleteBrandMutationOptions = Apollo.BaseMutationOptions<DeleteBrandMutation, DeleteBrandMutationVariables>;
export const DeleteClientDocument = gql`
    mutation DeleteClient($clientID: Int!) {
  deleteClient(clientID: $clientID) {
    success
    message
  }
}
    `;
export type DeleteClientMutationFn = Apollo.MutationFunction<DeleteClientMutation, DeleteClientMutationVariables>;

/**
 * __useDeleteClientMutation__
 *
 * To run a mutation, you first call `useDeleteClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClientMutation, { data, loading, error }] = useDeleteClientMutation({
 *   variables: {
 *      clientID: // value for 'clientID'
 *   },
 * });
 */
export function useDeleteClientMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClientMutation, DeleteClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument, options);
      }
export type DeleteClientMutationHookResult = ReturnType<typeof useDeleteClientMutation>;
export type DeleteClientMutationResult = Apollo.MutationResult<DeleteClientMutation>;
export type DeleteClientMutationOptions = Apollo.BaseMutationOptions<DeleteClientMutation, DeleteClientMutationVariables>;
export const DeleteSupplierDocument = gql`
    mutation DeleteSupplier($supplierID: Int!) {
  deleteSupplier(supplierID: $supplierID)
}
    `;
export type DeleteSupplierMutationFn = Apollo.MutationFunction<DeleteSupplierMutation, DeleteSupplierMutationVariables>;

/**
 * __useDeleteSupplierMutation__
 *
 * To run a mutation, you first call `useDeleteSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSupplierMutation, { data, loading, error }] = useDeleteSupplierMutation({
 *   variables: {
 *      supplierID: // value for 'supplierID'
 *   },
 * });
 */
export function useDeleteSupplierMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSupplierMutation, DeleteSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSupplierMutation, DeleteSupplierMutationVariables>(DeleteSupplierDocument, options);
      }
export type DeleteSupplierMutationHookResult = ReturnType<typeof useDeleteSupplierMutation>;
export type DeleteSupplierMutationResult = Apollo.MutationResult<DeleteSupplierMutation>;
export type DeleteSupplierMutationOptions = Apollo.BaseMutationOptions<DeleteSupplierMutation, DeleteSupplierMutationVariables>;
export const DeleteVendorDocument = gql`
    mutation DeleteVendor($vendorID: Int!) {
  deleteVendor(vendorID: $vendorID)
}
    `;
export type DeleteVendorMutationFn = Apollo.MutationFunction<DeleteVendorMutation, DeleteVendorMutationVariables>;

/**
 * __useDeleteVendorMutation__
 *
 * To run a mutation, you first call `useDeleteVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVendorMutation, { data, loading, error }] = useDeleteVendorMutation({
 *   variables: {
 *      vendorID: // value for 'vendorID'
 *   },
 * });
 */
export function useDeleteVendorMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVendorMutation, DeleteVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVendorMutation, DeleteVendorMutationVariables>(DeleteVendorDocument, options);
      }
export type DeleteVendorMutationHookResult = ReturnType<typeof useDeleteVendorMutation>;
export type DeleteVendorMutationResult = Apollo.MutationResult<DeleteVendorMutation>;
export type DeleteVendorMutationOptions = Apollo.BaseMutationOptions<DeleteVendorMutation, DeleteVendorMutationVariables>;
export const ToggleClientStatusDocument = gql`
    mutation ToggleClientStatus($clientID: Int!, $isActive: Boolean!) {
  updateClient(clientID: $clientID, data: {IsActive: $isActive}) {
    ClientID
    IsActive
  }
}
    `;
export type ToggleClientStatusMutationFn = Apollo.MutationFunction<ToggleClientStatusMutation, ToggleClientStatusMutationVariables>;

/**
 * __useToggleClientStatusMutation__
 *
 * To run a mutation, you first call `useToggleClientStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleClientStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleClientStatusMutation, { data, loading, error }] = useToggleClientStatusMutation({
 *   variables: {
 *      clientID: // value for 'clientID'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useToggleClientStatusMutation(baseOptions?: Apollo.MutationHookOptions<ToggleClientStatusMutation, ToggleClientStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleClientStatusMutation, ToggleClientStatusMutationVariables>(ToggleClientStatusDocument, options);
      }
export type ToggleClientStatusMutationHookResult = ReturnType<typeof useToggleClientStatusMutation>;
export type ToggleClientStatusMutationResult = Apollo.MutationResult<ToggleClientStatusMutation>;
export type ToggleClientStatusMutationOptions = Apollo.BaseMutationOptions<ToggleClientStatusMutation, ToggleClientStatusMutationVariables>;
export const ToggleSupplierStatusDocument = gql`
    mutation ToggleSupplierStatus($supplierID: Int!, $isActive: Boolean!) {
  updateSupplier(supplierID: $supplierID, data: {IsActive: $isActive}) {
    SupplierID
    IsActive
  }
}
    `;
export type ToggleSupplierStatusMutationFn = Apollo.MutationFunction<ToggleSupplierStatusMutation, ToggleSupplierStatusMutationVariables>;

/**
 * __useToggleSupplierStatusMutation__
 *
 * To run a mutation, you first call `useToggleSupplierStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleSupplierStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleSupplierStatusMutation, { data, loading, error }] = useToggleSupplierStatusMutation({
 *   variables: {
 *      supplierID: // value for 'supplierID'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useToggleSupplierStatusMutation(baseOptions?: Apollo.MutationHookOptions<ToggleSupplierStatusMutation, ToggleSupplierStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleSupplierStatusMutation, ToggleSupplierStatusMutationVariables>(ToggleSupplierStatusDocument, options);
      }
export type ToggleSupplierStatusMutationHookResult = ReturnType<typeof useToggleSupplierStatusMutation>;
export type ToggleSupplierStatusMutationResult = Apollo.MutationResult<ToggleSupplierStatusMutation>;
export type ToggleSupplierStatusMutationOptions = Apollo.BaseMutationOptions<ToggleSupplierStatusMutation, ToggleSupplierStatusMutationVariables>;
export const ToggleVendorStatusDocument = gql`
    mutation ToggleVendorStatus($vendorID: Int!, $isActive: Boolean!) {
  toggleVendorStatus(vendorID: $vendorID, isActive: $isActive) {
    VendorID
    IsActive
  }
}
    `;
export type ToggleVendorStatusMutationFn = Apollo.MutationFunction<ToggleVendorStatusMutation, ToggleVendorStatusMutationVariables>;

/**
 * __useToggleVendorStatusMutation__
 *
 * To run a mutation, you first call `useToggleVendorStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleVendorStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleVendorStatusMutation, { data, loading, error }] = useToggleVendorStatusMutation({
 *   variables: {
 *      vendorID: // value for 'vendorID'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useToggleVendorStatusMutation(baseOptions?: Apollo.MutationHookOptions<ToggleVendorStatusMutation, ToggleVendorStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleVendorStatusMutation, ToggleVendorStatusMutationVariables>(ToggleVendorStatusDocument, options);
      }
export type ToggleVendorStatusMutationHookResult = ReturnType<typeof useToggleVendorStatusMutation>;
export type ToggleVendorStatusMutationResult = Apollo.MutationResult<ToggleVendorStatusMutation>;
export type ToggleVendorStatusMutationOptions = Apollo.BaseMutationOptions<ToggleVendorStatusMutation, ToggleVendorStatusMutationVariables>;
export const UpdateBrandDocument = gql`
    mutation UpdateBrand($brandID: Int!, $input: BrandsUpdate!) {
  updateBrand(brandID: $brandID, data: $input) {
    BrandID
    Name
    IsActive
  }
}
    `;
export type UpdateBrandMutationFn = Apollo.MutationFunction<UpdateBrandMutation, UpdateBrandMutationVariables>;

/**
 * __useUpdateBrandMutation__
 *
 * To run a mutation, you first call `useUpdateBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBrandMutation, { data, loading, error }] = useUpdateBrandMutation({
 *   variables: {
 *      brandID: // value for 'brandID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBrandMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBrandMutation, UpdateBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBrandMutation, UpdateBrandMutationVariables>(UpdateBrandDocument, options);
      }
export type UpdateBrandMutationHookResult = ReturnType<typeof useUpdateBrandMutation>;
export type UpdateBrandMutationResult = Apollo.MutationResult<UpdateBrandMutation>;
export type UpdateBrandMutationOptions = Apollo.BaseMutationOptions<UpdateBrandMutation, UpdateBrandMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($clientID: Int!, $input: ClientsUpdate!) {
  updateClient(clientID: $clientID, data: $input) {
    ClientID
    DocTypeID
    DocNumber
    FirstName
    LastName
    Phone
    Email
    Address
    City
    PostalCode
    IsActive
    CountryID
    ProvinceID
    PriceListID
    VendorID
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      clientID: // value for 'clientID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const UpdateSupplierDocument = gql`
    mutation UpdateSupplier($supplierID: Int!, $input: SuppliersUpdate!) {
  updateSupplier(supplierID: $supplierID, data: $input) {
    SupplierID
    DocTypeID
    DocNumber
    FirstName
    LastName
    Phone
    Email
    Address
    IsActive
    CountryID
    ProvinceID
    City
    PostalCode
  }
}
    `;
export type UpdateSupplierMutationFn = Apollo.MutationFunction<UpdateSupplierMutation, UpdateSupplierMutationVariables>;

/**
 * __useUpdateSupplierMutation__
 *
 * To run a mutation, you first call `useUpdateSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSupplierMutation, { data, loading, error }] = useUpdateSupplierMutation({
 *   variables: {
 *      supplierID: // value for 'supplierID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSupplierMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSupplierMutation, UpdateSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSupplierMutation, UpdateSupplierMutationVariables>(UpdateSupplierDocument, options);
      }
export type UpdateSupplierMutationHookResult = ReturnType<typeof useUpdateSupplierMutation>;
export type UpdateSupplierMutationResult = Apollo.MutationResult<UpdateSupplierMutation>;
export type UpdateSupplierMutationOptions = Apollo.BaseMutationOptions<UpdateSupplierMutation, UpdateSupplierMutationVariables>;
export const UpdateVendorDocument = gql`
    mutation UpdateVendor($vendorID: Int!, $input: VendorsUpdate!) {
  updateVendor(vendorID: $vendorID, data: $input) {
    VendorID
    VendorName
    Commission
    IsActive
  }
}
    `;
export type UpdateVendorMutationFn = Apollo.MutationFunction<UpdateVendorMutation, UpdateVendorMutationVariables>;

/**
 * __useUpdateVendorMutation__
 *
 * To run a mutation, you first call `useUpdateVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVendorMutation, { data, loading, error }] = useUpdateVendorMutation({
 *   variables: {
 *      vendorID: // value for 'vendorID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVendorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVendorMutation, UpdateVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVendorMutation, UpdateVendorMutationVariables>(UpdateVendorDocument, options);
      }
export type UpdateVendorMutationHookResult = ReturnType<typeof useUpdateVendorMutation>;
export type UpdateVendorMutationResult = Apollo.MutationResult<UpdateVendorMutation>;
export type UpdateVendorMutationOptions = Apollo.BaseMutationOptions<UpdateVendorMutation, UpdateVendorMutationVariables>;
export const GetAllBranchesDocument = gql`
    query GetAllBranches {
  allBranches {
    BranchID
    CompanyID
    Name
    Address
    Phone
    CompanyData {
      Name
    }
  }
}
    `;

/**
 * __useGetAllBranchesQuery__
 *
 * To run a query within a React component, call `useGetAllBranchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBranchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBranchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBranchesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllBranchesQuery, GetAllBranchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBranchesQuery, GetAllBranchesQueryVariables>(GetAllBranchesDocument, options);
      }
export function useGetAllBranchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBranchesQuery, GetAllBranchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBranchesQuery, GetAllBranchesQueryVariables>(GetAllBranchesDocument, options);
        }
export function useGetAllBranchesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllBranchesQuery, GetAllBranchesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllBranchesQuery, GetAllBranchesQueryVariables>(GetAllBranchesDocument, options);
        }
export type GetAllBranchesQueryHookResult = ReturnType<typeof useGetAllBranchesQuery>;
export type GetAllBranchesLazyQueryHookResult = ReturnType<typeof useGetAllBranchesLazyQuery>;
export type GetAllBranchesSuspenseQueryHookResult = ReturnType<typeof useGetAllBranchesSuspenseQuery>;
export type GetAllBranchesQueryResult = Apollo.QueryResult<GetAllBranchesQuery, GetAllBranchesQueryVariables>;
export const GetAllBrandsDocument = gql`
    query GetAllBrands {
  allBrands {
    BrandID
    Name
    IsActive
  }
}
    `;

/**
 * __useGetAllBrandsQuery__
 *
 * To run a query within a React component, call `useGetAllBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBrandsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBrandsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBrandsQuery, GetAllBrandsQueryVariables>(GetAllBrandsDocument, options);
      }
export function useGetAllBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBrandsQuery, GetAllBrandsQueryVariables>(GetAllBrandsDocument, options);
        }
export function useGetAllBrandsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllBrandsQuery, GetAllBrandsQueryVariables>(GetAllBrandsDocument, options);
        }
export type GetAllBrandsQueryHookResult = ReturnType<typeof useGetAllBrandsQuery>;
export type GetAllBrandsLazyQueryHookResult = ReturnType<typeof useGetAllBrandsLazyQuery>;
export type GetAllBrandsSuspenseQueryHookResult = ReturnType<typeof useGetAllBrandsSuspenseQuery>;
export type GetAllBrandsQueryResult = Apollo.QueryResult<GetAllBrandsQuery, GetAllBrandsQueryVariables>;
export const GetAllCarBrandsDocument = gql`
    query GetAllCarBrands {
  allCarbrands {
    CarBrandID
    Name
    CompanyID
  }
}
    `;

/**
 * __useGetAllCarBrandsQuery__
 *
 * To run a query within a React component, call `useGetAllCarBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCarBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCarBrandsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCarBrandsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCarBrandsQuery, GetAllCarBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCarBrandsQuery, GetAllCarBrandsQueryVariables>(GetAllCarBrandsDocument, options);
      }
export function useGetAllCarBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCarBrandsQuery, GetAllCarBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCarBrandsQuery, GetAllCarBrandsQueryVariables>(GetAllCarBrandsDocument, options);
        }
export function useGetAllCarBrandsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCarBrandsQuery, GetAllCarBrandsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCarBrandsQuery, GetAllCarBrandsQueryVariables>(GetAllCarBrandsDocument, options);
        }
export type GetAllCarBrandsQueryHookResult = ReturnType<typeof useGetAllCarBrandsQuery>;
export type GetAllCarBrandsLazyQueryHookResult = ReturnType<typeof useGetAllCarBrandsLazyQuery>;
export type GetAllCarBrandsSuspenseQueryHookResult = ReturnType<typeof useGetAllCarBrandsSuspenseQuery>;
export type GetAllCarBrandsQueryResult = Apollo.QueryResult<GetAllCarBrandsQuery, GetAllCarBrandsQueryVariables>;
export const GetAllCarModelsDocument = gql`
    query GetAllCarModels {
  allCarmodels {
    CarModelID
    CarBrandID
    Model
    CarBrandData {
      Name
    }
  }
}
    `;

/**
 * __useGetAllCarModelsQuery__
 *
 * To run a query within a React component, call `useGetAllCarModelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCarModelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCarModelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCarModelsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCarModelsQuery, GetAllCarModelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCarModelsQuery, GetAllCarModelsQueryVariables>(GetAllCarModelsDocument, options);
      }
export function useGetAllCarModelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCarModelsQuery, GetAllCarModelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCarModelsQuery, GetAllCarModelsQueryVariables>(GetAllCarModelsDocument, options);
        }
export function useGetAllCarModelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCarModelsQuery, GetAllCarModelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCarModelsQuery, GetAllCarModelsQueryVariables>(GetAllCarModelsDocument, options);
        }
export type GetAllCarModelsQueryHookResult = ReturnType<typeof useGetAllCarModelsQuery>;
export type GetAllCarModelsLazyQueryHookResult = ReturnType<typeof useGetAllCarModelsLazyQuery>;
export type GetAllCarModelsSuspenseQueryHookResult = ReturnType<typeof useGetAllCarModelsSuspenseQuery>;
export type GetAllCarModelsQueryResult = Apollo.QueryResult<GetAllCarModelsQuery, GetAllCarModelsQueryVariables>;
export const GetAllCarsDocument = gql`
    query GetAllCars {
  allCars {
    CarID
    LicensePlate
    Year
    CarModelID
    ClientID
    LastServiceMileage
    IsDebtor
    DiscountID
    CarModelData {
      Model
    }
    CarBrandData {
      CarBrandID
      Name
    }
    ClientData {
      FirstName
      LastName
    }
  }
}
    `;

/**
 * __useGetAllCarsQuery__
 *
 * To run a query within a React component, call `useGetAllCarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCarsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCarsQuery, GetAllCarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCarsQuery, GetAllCarsQueryVariables>(GetAllCarsDocument, options);
      }
export function useGetAllCarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCarsQuery, GetAllCarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCarsQuery, GetAllCarsQueryVariables>(GetAllCarsDocument, options);
        }
export function useGetAllCarsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCarsQuery, GetAllCarsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCarsQuery, GetAllCarsQueryVariables>(GetAllCarsDocument, options);
        }
export type GetAllCarsQueryHookResult = ReturnType<typeof useGetAllCarsQuery>;
export type GetAllCarsLazyQueryHookResult = ReturnType<typeof useGetAllCarsLazyQuery>;
export type GetAllCarsSuspenseQueryHookResult = ReturnType<typeof useGetAllCarsSuspenseQuery>;
export type GetAllCarsQueryResult = Apollo.QueryResult<GetAllCarsQuery, GetAllCarsQueryVariables>;
export const GetAllClientsDocument = gql`
    query GetAllClients {
  allClients {
    ClientID
    DocTypeID
    DocNumber
    FirstName
    LastName
    Phone
    Email
    Address
    City
    PostalCode
    IsActive
    CountryID
    ProvinceID
    PriceListID
    VendorID
  }
}
    `;

/**
 * __useGetAllClientsQuery__
 *
 * To run a query within a React component, call `useGetAllClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllClientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllClientsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
      }
export function useGetAllClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
        }
export function useGetAllClientsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
        }
export type GetAllClientsQueryHookResult = ReturnType<typeof useGetAllClientsQuery>;
export type GetAllClientsLazyQueryHookResult = ReturnType<typeof useGetAllClientsLazyQuery>;
export type GetAllClientsSuspenseQueryHookResult = ReturnType<typeof useGetAllClientsSuspenseQuery>;
export type GetAllClientsQueryResult = Apollo.QueryResult<GetAllClientsQuery, GetAllClientsQueryVariables>;
export const GetAllCompaniesDocument = gql`
    query GetAllCompanies {
  allCompanydata {
    CompanyID
    Name
    Address
    CUIT
    Grossincome
    Startdate
    Logo
  }
}
    `;

/**
 * __useGetAllCompaniesQuery__
 *
 * To run a query within a React component, call `useGetAllCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>(GetAllCompaniesDocument, options);
      }
export function useGetAllCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>(GetAllCompaniesDocument, options);
        }
export function useGetAllCompaniesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>(GetAllCompaniesDocument, options);
        }
export type GetAllCompaniesQueryHookResult = ReturnType<typeof useGetAllCompaniesQuery>;
export type GetAllCompaniesLazyQueryHookResult = ReturnType<typeof useGetAllCompaniesLazyQuery>;
export type GetAllCompaniesSuspenseQueryHookResult = ReturnType<typeof useGetAllCompaniesSuspenseQuery>;
export type GetAllCompaniesQueryResult = Apollo.QueryResult<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>;
export const GetAllCreditCardGroupsDocument = gql`
    query GetAllCreditCardGroups {
  allCreditcardgroups {
    CreditCardGroupID
    GroupName
  }
}
    `;

/**
 * __useGetAllCreditCardGroupsQuery__
 *
 * To run a query within a React component, call `useGetAllCreditCardGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCreditCardGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCreditCardGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCreditCardGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCreditCardGroupsQuery, GetAllCreditCardGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCreditCardGroupsQuery, GetAllCreditCardGroupsQueryVariables>(GetAllCreditCardGroupsDocument, options);
      }
export function useGetAllCreditCardGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCreditCardGroupsQuery, GetAllCreditCardGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCreditCardGroupsQuery, GetAllCreditCardGroupsQueryVariables>(GetAllCreditCardGroupsDocument, options);
        }
export function useGetAllCreditCardGroupsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCreditCardGroupsQuery, GetAllCreditCardGroupsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCreditCardGroupsQuery, GetAllCreditCardGroupsQueryVariables>(GetAllCreditCardGroupsDocument, options);
        }
export type GetAllCreditCardGroupsQueryHookResult = ReturnType<typeof useGetAllCreditCardGroupsQuery>;
export type GetAllCreditCardGroupsLazyQueryHookResult = ReturnType<typeof useGetAllCreditCardGroupsLazyQuery>;
export type GetAllCreditCardGroupsSuspenseQueryHookResult = ReturnType<typeof useGetAllCreditCardGroupsSuspenseQuery>;
export type GetAllCreditCardGroupsQueryResult = Apollo.QueryResult<GetAllCreditCardGroupsQuery, GetAllCreditCardGroupsQueryVariables>;
export const GetAllCreditCardsDocument = gql`
    query GetAllCreditCards {
  allCreditcards {
    CreditCardID
    CreditCardGroupID
    CardName
    Surcharge
    Installments
    IsActive
    GroupData {
      GroupName
    }
  }
}
    `;

/**
 * __useGetAllCreditCardsQuery__
 *
 * To run a query within a React component, call `useGetAllCreditCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCreditCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCreditCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCreditCardsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCreditCardsQuery, GetAllCreditCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCreditCardsQuery, GetAllCreditCardsQueryVariables>(GetAllCreditCardsDocument, options);
      }
export function useGetAllCreditCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCreditCardsQuery, GetAllCreditCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCreditCardsQuery, GetAllCreditCardsQueryVariables>(GetAllCreditCardsDocument, options);
        }
export function useGetAllCreditCardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCreditCardsQuery, GetAllCreditCardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCreditCardsQuery, GetAllCreditCardsQueryVariables>(GetAllCreditCardsDocument, options);
        }
export type GetAllCreditCardsQueryHookResult = ReturnType<typeof useGetAllCreditCardsQuery>;
export type GetAllCreditCardsLazyQueryHookResult = ReturnType<typeof useGetAllCreditCardsLazyQuery>;
export type GetAllCreditCardsSuspenseQueryHookResult = ReturnType<typeof useGetAllCreditCardsSuspenseQuery>;
export type GetAllCreditCardsQueryResult = Apollo.QueryResult<GetAllCreditCardsQuery, GetAllCreditCardsQueryVariables>;
export const GetAllDiscountsDocument = gql`
    query GetAllDiscounts {
  allDiscounts {
    DiscountID
    DiscountName
    Percentage
  }
}
    `;

/**
 * __useGetAllDiscountsQuery__
 *
 * To run a query within a React component, call `useGetAllDiscountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDiscountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDiscountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDiscountsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDiscountsQuery, GetAllDiscountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDiscountsQuery, GetAllDiscountsQueryVariables>(GetAllDiscountsDocument, options);
      }
export function useGetAllDiscountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDiscountsQuery, GetAllDiscountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDiscountsQuery, GetAllDiscountsQueryVariables>(GetAllDiscountsDocument, options);
        }
export function useGetAllDiscountsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllDiscountsQuery, GetAllDiscountsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllDiscountsQuery, GetAllDiscountsQueryVariables>(GetAllDiscountsDocument, options);
        }
export type GetAllDiscountsQueryHookResult = ReturnType<typeof useGetAllDiscountsQuery>;
export type GetAllDiscountsLazyQueryHookResult = ReturnType<typeof useGetAllDiscountsLazyQuery>;
export type GetAllDiscountsSuspenseQueryHookResult = ReturnType<typeof useGetAllDiscountsSuspenseQuery>;
export type GetAllDiscountsQueryResult = Apollo.QueryResult<GetAllDiscountsQuery, GetAllDiscountsQueryVariables>;
export const GetAllDocumentsDocument = gql`
    query GetAllDocuments {
  allDocuments {
    DocumentID
    CompanyID
    BranchID
    DocumentTypeID
    Description
    DocumentNumber
    PointOfSale
    IsActive
    Testing
    ShouldAccount
    MovesStock
    IsFiscal
    IsElectronic
    IsManual
    IsQuotation
    MaxItems
  }
}
    `;

/**
 * __useGetAllDocumentsQuery__
 *
 * To run a query within a React component, call `useGetAllDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDocumentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDocumentsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>(GetAllDocumentsDocument, options);
      }
export function useGetAllDocumentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>(GetAllDocumentsDocument, options);
        }
export function useGetAllDocumentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>(GetAllDocumentsDocument, options);
        }
export type GetAllDocumentsQueryHookResult = ReturnType<typeof useGetAllDocumentsQuery>;
export type GetAllDocumentsLazyQueryHookResult = ReturnType<typeof useGetAllDocumentsLazyQuery>;
export type GetAllDocumentsSuspenseQueryHookResult = ReturnType<typeof useGetAllDocumentsSuspenseQuery>;
export type GetAllDocumentsQueryResult = Apollo.QueryResult<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>;
export const GetAllItemCategoriesDocument = gql`
    query GetAllItemCategories {
  allItemcategories {
    ItemCategoryID
    CategoryName
  }
}
    `;

/**
 * __useGetAllItemCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllItemCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllItemCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllItemCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllItemCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllItemCategoriesQuery, GetAllItemCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllItemCategoriesQuery, GetAllItemCategoriesQueryVariables>(GetAllItemCategoriesDocument, options);
      }
export function useGetAllItemCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllItemCategoriesQuery, GetAllItemCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllItemCategoriesQuery, GetAllItemCategoriesQueryVariables>(GetAllItemCategoriesDocument, options);
        }
export function useGetAllItemCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllItemCategoriesQuery, GetAllItemCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllItemCategoriesQuery, GetAllItemCategoriesQueryVariables>(GetAllItemCategoriesDocument, options);
        }
export type GetAllItemCategoriesQueryHookResult = ReturnType<typeof useGetAllItemCategoriesQuery>;
export type GetAllItemCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllItemCategoriesLazyQuery>;
export type GetAllItemCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllItemCategoriesSuspenseQuery>;
export type GetAllItemCategoriesQueryResult = Apollo.QueryResult<GetAllItemCategoriesQuery, GetAllItemCategoriesQueryVariables>;
export const GetAllItemSubcategoriesDocument = gql`
    query GetAllItemSubcategories {
  allItemsubcategories {
    ItemSubcategoryID
    ItemCategoryID
    SubcategoryName
    CategoryData {
      CategoryName
    }
  }
}
    `;

/**
 * __useGetAllItemSubcategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllItemSubcategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllItemSubcategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllItemSubcategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllItemSubcategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllItemSubcategoriesQuery, GetAllItemSubcategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllItemSubcategoriesQuery, GetAllItemSubcategoriesQueryVariables>(GetAllItemSubcategoriesDocument, options);
      }
export function useGetAllItemSubcategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllItemSubcategoriesQuery, GetAllItemSubcategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllItemSubcategoriesQuery, GetAllItemSubcategoriesQueryVariables>(GetAllItemSubcategoriesDocument, options);
        }
export function useGetAllItemSubcategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllItemSubcategoriesQuery, GetAllItemSubcategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllItemSubcategoriesQuery, GetAllItemSubcategoriesQueryVariables>(GetAllItemSubcategoriesDocument, options);
        }
export type GetAllItemSubcategoriesQueryHookResult = ReturnType<typeof useGetAllItemSubcategoriesQuery>;
export type GetAllItemSubcategoriesLazyQueryHookResult = ReturnType<typeof useGetAllItemSubcategoriesLazyQuery>;
export type GetAllItemSubcategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllItemSubcategoriesSuspenseQuery>;
export type GetAllItemSubcategoriesQueryResult = Apollo.QueryResult<GetAllItemSubcategoriesQuery, GetAllItemSubcategoriesQueryVariables>;
export const GetAllItemsDocument = gql`
    query GetAllItems {
  allItems {
    ItemID
    CompanyID
    BranchID
    Code
    Description
    BrandID
    ItemCategoryID
    ItemSubcategoryID
    SupplierID
    ControlStock
    ReplenishmentStock
    IsActive
    OEM
    WarehouseID
    LastModified
  }
}
    `;

/**
 * __useGetAllItemsQuery__
 *
 * To run a query within a React component, call `useGetAllItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllItemsQuery, GetAllItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllItemsQuery, GetAllItemsQueryVariables>(GetAllItemsDocument, options);
      }
export function useGetAllItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllItemsQuery, GetAllItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllItemsQuery, GetAllItemsQueryVariables>(GetAllItemsDocument, options);
        }
export function useGetAllItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllItemsQuery, GetAllItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllItemsQuery, GetAllItemsQueryVariables>(GetAllItemsDocument, options);
        }
export type GetAllItemsQueryHookResult = ReturnType<typeof useGetAllItemsQuery>;
export type GetAllItemsLazyQueryHookResult = ReturnType<typeof useGetAllItemsLazyQuery>;
export type GetAllItemsSuspenseQueryHookResult = ReturnType<typeof useGetAllItemsSuspenseQuery>;
export type GetAllItemsQueryResult = Apollo.QueryResult<GetAllItemsQuery, GetAllItemsQueryVariables>;
export const GetAllOrdersDocument = gql`
    query GetAllOrders {
  allOrders {
    OrderID
    CompanyID
    BranchID
    Date_
    ClientID
    CarID
    IsService
    ServiceTypeID
    Mileage
    NextServiceMileage
    Notes
    SaleConditionID
    DiscountID
    Subtotal
    Total
    VAT
    UserID
    DocumentID
    PriceListID
    OrderStatusID
    WarehouseID
  }
}
    `;

/**
 * __useGetAllOrdersQuery__
 *
 * To run a query within a React component, call `useGetAllOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
      }
export function useGetAllOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export function useGetAllOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export type GetAllOrdersQueryHookResult = ReturnType<typeof useGetAllOrdersQuery>;
export type GetAllOrdersLazyQueryHookResult = ReturnType<typeof useGetAllOrdersLazyQuery>;
export type GetAllOrdersSuspenseQueryHookResult = ReturnType<typeof useGetAllOrdersSuspenseQuery>;
export type GetAllOrdersQueryResult = Apollo.QueryResult<GetAllOrdersQuery, GetAllOrdersQueryVariables>;
export const GetAllOrderstatusDocument = gql`
    query GetAllOrderstatus {
  allSysorderstatus {
    OrderStatusID
    Status
  }
}
    `;

/**
 * __useGetAllOrderstatusQuery__
 *
 * To run a query within a React component, call `useGetAllOrderstatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrderstatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrderstatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllOrderstatusQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOrderstatusQuery, GetAllOrderstatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrderstatusQuery, GetAllOrderstatusQueryVariables>(GetAllOrderstatusDocument, options);
      }
export function useGetAllOrderstatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrderstatusQuery, GetAllOrderstatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrderstatusQuery, GetAllOrderstatusQueryVariables>(GetAllOrderstatusDocument, options);
        }
export function useGetAllOrderstatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllOrderstatusQuery, GetAllOrderstatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllOrderstatusQuery, GetAllOrderstatusQueryVariables>(GetAllOrderstatusDocument, options);
        }
export type GetAllOrderstatusQueryHookResult = ReturnType<typeof useGetAllOrderstatusQuery>;
export type GetAllOrderstatusLazyQueryHookResult = ReturnType<typeof useGetAllOrderstatusLazyQuery>;
export type GetAllOrderstatusSuspenseQueryHookResult = ReturnType<typeof useGetAllOrderstatusSuspenseQuery>;
export type GetAllOrderstatusQueryResult = Apollo.QueryResult<GetAllOrderstatusQuery, GetAllOrderstatusQueryVariables>;
export const GetAllPricelistItemsDocument = gql`
    query GetAllPricelistItems {
  allPricelistitems {
    PriceListID
    ItemID
    Price
    EffectiveDate
    PriceListData {
      Name
      Description
      IsActive
    }
  }
}
    `;

/**
 * __useGetAllPricelistItemsQuery__
 *
 * To run a query within a React component, call `useGetAllPricelistItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPricelistItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPricelistItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPricelistItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPricelistItemsQuery, GetAllPricelistItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPricelistItemsQuery, GetAllPricelistItemsQueryVariables>(GetAllPricelistItemsDocument, options);
      }
export function useGetAllPricelistItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPricelistItemsQuery, GetAllPricelistItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPricelistItemsQuery, GetAllPricelistItemsQueryVariables>(GetAllPricelistItemsDocument, options);
        }
export function useGetAllPricelistItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllPricelistItemsQuery, GetAllPricelistItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPricelistItemsQuery, GetAllPricelistItemsQueryVariables>(GetAllPricelistItemsDocument, options);
        }
export type GetAllPricelistItemsQueryHookResult = ReturnType<typeof useGetAllPricelistItemsQuery>;
export type GetAllPricelistItemsLazyQueryHookResult = ReturnType<typeof useGetAllPricelistItemsLazyQuery>;
export type GetAllPricelistItemsSuspenseQueryHookResult = ReturnType<typeof useGetAllPricelistItemsSuspenseQuery>;
export type GetAllPricelistItemsQueryResult = Apollo.QueryResult<GetAllPricelistItemsQuery, GetAllPricelistItemsQueryVariables>;
export const GetAllRolesDocument = gql`
    query GetAllRoles {
  allRoles {
    RoleID
    RoleName
  }
}
    `;

/**
 * __useGetAllRolesQuery__
 *
 * To run a query within a React component, call `useGetAllRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
      }
export function useGetAllRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
        }
export function useGetAllRolesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
        }
export type GetAllRolesQueryHookResult = ReturnType<typeof useGetAllRolesQuery>;
export type GetAllRolesLazyQueryHookResult = ReturnType<typeof useGetAllRolesLazyQuery>;
export type GetAllRolesSuspenseQueryHookResult = ReturnType<typeof useGetAllRolesSuspenseQuery>;
export type GetAllRolesQueryResult = Apollo.QueryResult<GetAllRolesQuery, GetAllRolesQueryVariables>;
export const GetAllSaleConditionsDocument = gql`
    query GetAllSaleConditions {
  allSaleconditions {
    SaleConditionID
    CreditCardID
    Name
    DueDate
    Surcharge
    IsActive
  }
}
    `;

/**
 * __useGetAllSaleConditionsQuery__
 *
 * To run a query within a React component, call `useGetAllSaleConditionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSaleConditionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSaleConditionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSaleConditionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSaleConditionsQuery, GetAllSaleConditionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSaleConditionsQuery, GetAllSaleConditionsQueryVariables>(GetAllSaleConditionsDocument, options);
      }
export function useGetAllSaleConditionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSaleConditionsQuery, GetAllSaleConditionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSaleConditionsQuery, GetAllSaleConditionsQueryVariables>(GetAllSaleConditionsDocument, options);
        }
export function useGetAllSaleConditionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllSaleConditionsQuery, GetAllSaleConditionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllSaleConditionsQuery, GetAllSaleConditionsQueryVariables>(GetAllSaleConditionsDocument, options);
        }
export type GetAllSaleConditionsQueryHookResult = ReturnType<typeof useGetAllSaleConditionsQuery>;
export type GetAllSaleConditionsLazyQueryHookResult = ReturnType<typeof useGetAllSaleConditionsLazyQuery>;
export type GetAllSaleConditionsSuspenseQueryHookResult = ReturnType<typeof useGetAllSaleConditionsSuspenseQuery>;
export type GetAllSaleConditionsQueryResult = Apollo.QueryResult<GetAllSaleConditionsQuery, GetAllSaleConditionsQueryVariables>;
export const GetAllServicetypesDocument = gql`
    query GetAllServicetypes {
  allServicetypes {
    ServiceTypeID
    Type
  }
}
    `;

/**
 * __useGetAllServicetypesQuery__
 *
 * To run a query within a React component, call `useGetAllServicetypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllServicetypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllServicetypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllServicetypesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllServicetypesQuery, GetAllServicetypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllServicetypesQuery, GetAllServicetypesQueryVariables>(GetAllServicetypesDocument, options);
      }
export function useGetAllServicetypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllServicetypesQuery, GetAllServicetypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllServicetypesQuery, GetAllServicetypesQueryVariables>(GetAllServicetypesDocument, options);
        }
export function useGetAllServicetypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllServicetypesQuery, GetAllServicetypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllServicetypesQuery, GetAllServicetypesQueryVariables>(GetAllServicetypesDocument, options);
        }
export type GetAllServicetypesQueryHookResult = ReturnType<typeof useGetAllServicetypesQuery>;
export type GetAllServicetypesLazyQueryHookResult = ReturnType<typeof useGetAllServicetypesLazyQuery>;
export type GetAllServicetypesSuspenseQueryHookResult = ReturnType<typeof useGetAllServicetypesSuspenseQuery>;
export type GetAllServicetypesQueryResult = Apollo.QueryResult<GetAllServicetypesQuery, GetAllServicetypesQueryVariables>;
export const GetAllSuppliersDocument = gql`
    query GetAllSuppliers {
  allSuppliers {
    SupplierID
    DocTypeID
    DocNumber
    FirstName
    LastName
    Phone
    Email
    Address
    IsActive
    CountryID
    ProvinceID
    City
    PostalCode
  }
}
    `;

/**
 * __useGetAllSuppliersQuery__
 *
 * To run a query within a React component, call `useGetAllSuppliersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSuppliersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSuppliersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSuppliersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>(GetAllSuppliersDocument, options);
      }
export function useGetAllSuppliersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>(GetAllSuppliersDocument, options);
        }
export function useGetAllSuppliersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>(GetAllSuppliersDocument, options);
        }
export type GetAllSuppliersQueryHookResult = ReturnType<typeof useGetAllSuppliersQuery>;
export type GetAllSuppliersLazyQueryHookResult = ReturnType<typeof useGetAllSuppliersLazyQuery>;
export type GetAllSuppliersSuspenseQueryHookResult = ReturnType<typeof useGetAllSuppliersSuspenseQuery>;
export type GetAllSuppliersQueryResult = Apollo.QueryResult<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>;
export const GetAllUseraccessDocument = gql`
    query GetAllUseraccess {
  allUseraccess {
    UserID
    CompanyID
    BranchID
    RoleID
    UserData {
      FullName
    }
    CompanyData {
      Name
    }
    BranchData {
      Name
    }
    RoleData {
      RoleName
    }
  }
}
    `;

/**
 * __useGetAllUseraccessQuery__
 *
 * To run a query within a React component, call `useGetAllUseraccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUseraccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUseraccessQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUseraccessQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUseraccessQuery, GetAllUseraccessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUseraccessQuery, GetAllUseraccessQueryVariables>(GetAllUseraccessDocument, options);
      }
export function useGetAllUseraccessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUseraccessQuery, GetAllUseraccessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUseraccessQuery, GetAllUseraccessQueryVariables>(GetAllUseraccessDocument, options);
        }
export function useGetAllUseraccessSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUseraccessQuery, GetAllUseraccessQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUseraccessQuery, GetAllUseraccessQueryVariables>(GetAllUseraccessDocument, options);
        }
export type GetAllUseraccessQueryHookResult = ReturnType<typeof useGetAllUseraccessQuery>;
export type GetAllUseraccessLazyQueryHookResult = ReturnType<typeof useGetAllUseraccessLazyQuery>;
export type GetAllUseraccessSuspenseQueryHookResult = ReturnType<typeof useGetAllUseraccessSuspenseQuery>;
export type GetAllUseraccessQueryResult = Apollo.QueryResult<GetAllUseraccessQuery, GetAllUseraccessQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  allUsers {
    UserID
    Nickname
    FullName
    IsActive
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetAllVendorsDocument = gql`
    query GetAllVendors {
  allVendors {
    VendorID
    VendorName
    Commission
    IsActive
  }
}
    `;

/**
 * __useGetAllVendorsQuery__
 *
 * To run a query within a React component, call `useGetAllVendorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllVendorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllVendorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllVendorsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllVendorsQuery, GetAllVendorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllVendorsQuery, GetAllVendorsQueryVariables>(GetAllVendorsDocument, options);
      }
export function useGetAllVendorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllVendorsQuery, GetAllVendorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllVendorsQuery, GetAllVendorsQueryVariables>(GetAllVendorsDocument, options);
        }
export function useGetAllVendorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllVendorsQuery, GetAllVendorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllVendorsQuery, GetAllVendorsQueryVariables>(GetAllVendorsDocument, options);
        }
export type GetAllVendorsQueryHookResult = ReturnType<typeof useGetAllVendorsQuery>;
export type GetAllVendorsLazyQueryHookResult = ReturnType<typeof useGetAllVendorsLazyQuery>;
export type GetAllVendorsSuspenseQueryHookResult = ReturnType<typeof useGetAllVendorsSuspenseQuery>;
export type GetAllVendorsQueryResult = Apollo.QueryResult<GetAllVendorsQuery, GetAllVendorsQueryVariables>;
export const GetBranchByIdDocument = gql`
    query GetBranchById($id: Int!, $CompanyID: Int!) {
  branchesById(id: $id, companyID: $CompanyID) {
    BranchID
    CompanyID
    Name
    Address
    Phone
  }
}
    `;

/**
 * __useGetBranchByIdQuery__
 *
 * To run a query within a React component, call `useGetBranchByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBranchByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBranchByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      CompanyID: // value for 'CompanyID'
 *   },
 * });
 */
export function useGetBranchByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBranchByIdQuery, GetBranchByIdQueryVariables> & ({ variables: GetBranchByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBranchByIdQuery, GetBranchByIdQueryVariables>(GetBranchByIdDocument, options);
      }
export function useGetBranchByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBranchByIdQuery, GetBranchByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBranchByIdQuery, GetBranchByIdQueryVariables>(GetBranchByIdDocument, options);
        }
export function useGetBranchByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBranchByIdQuery, GetBranchByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBranchByIdQuery, GetBranchByIdQueryVariables>(GetBranchByIdDocument, options);
        }
export type GetBranchByIdQueryHookResult = ReturnType<typeof useGetBranchByIdQuery>;
export type GetBranchByIdLazyQueryHookResult = ReturnType<typeof useGetBranchByIdLazyQuery>;
export type GetBranchByIdSuspenseQueryHookResult = ReturnType<typeof useGetBranchByIdSuspenseQuery>;
export type GetBranchByIdQueryResult = Apollo.QueryResult<GetBranchByIdQuery, GetBranchByIdQueryVariables>;
export const GetBranchesByCompanyDocument = gql`
    query GetBranchesByCompany($companyID: Int!) {
  branchesByCompany(companyID: $companyID) {
    BranchID
    Name
  }
}
    `;

/**
 * __useGetBranchesByCompanyQuery__
 *
 * To run a query within a React component, call `useGetBranchesByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBranchesByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBranchesByCompanyQuery({
 *   variables: {
 *      companyID: // value for 'companyID'
 *   },
 * });
 */
export function useGetBranchesByCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetBranchesByCompanyQuery, GetBranchesByCompanyQueryVariables> & ({ variables: GetBranchesByCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBranchesByCompanyQuery, GetBranchesByCompanyQueryVariables>(GetBranchesByCompanyDocument, options);
      }
export function useGetBranchesByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBranchesByCompanyQuery, GetBranchesByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBranchesByCompanyQuery, GetBranchesByCompanyQueryVariables>(GetBranchesByCompanyDocument, options);
        }
export function useGetBranchesByCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBranchesByCompanyQuery, GetBranchesByCompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBranchesByCompanyQuery, GetBranchesByCompanyQueryVariables>(GetBranchesByCompanyDocument, options);
        }
export type GetBranchesByCompanyQueryHookResult = ReturnType<typeof useGetBranchesByCompanyQuery>;
export type GetBranchesByCompanyLazyQueryHookResult = ReturnType<typeof useGetBranchesByCompanyLazyQuery>;
export type GetBranchesByCompanySuspenseQueryHookResult = ReturnType<typeof useGetBranchesByCompanySuspenseQuery>;
export type GetBranchesByCompanyQueryResult = Apollo.QueryResult<GetBranchesByCompanyQuery, GetBranchesByCompanyQueryVariables>;
export const GetBrandByIdDocument = gql`
    query GetBrandById($id: Int!) {
  brandsById(id: $id) {
    BrandID
    Name
    IsActive
  }
}
    `;

/**
 * __useGetBrandByIdQuery__
 *
 * To run a query within a React component, call `useGetBrandByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBrandByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBrandByIdQuery, GetBrandByIdQueryVariables> & ({ variables: GetBrandByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandByIdQuery, GetBrandByIdQueryVariables>(GetBrandByIdDocument, options);
      }
export function useGetBrandByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandByIdQuery, GetBrandByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandByIdQuery, GetBrandByIdQueryVariables>(GetBrandByIdDocument, options);
        }
export function useGetBrandByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBrandByIdQuery, GetBrandByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBrandByIdQuery, GetBrandByIdQueryVariables>(GetBrandByIdDocument, options);
        }
export type GetBrandByIdQueryHookResult = ReturnType<typeof useGetBrandByIdQuery>;
export type GetBrandByIdLazyQueryHookResult = ReturnType<typeof useGetBrandByIdLazyQuery>;
export type GetBrandByIdSuspenseQueryHookResult = ReturnType<typeof useGetBrandByIdSuspenseQuery>;
export type GetBrandByIdQueryResult = Apollo.QueryResult<GetBrandByIdQuery, GetBrandByIdQueryVariables>;
export const GetCarBrandByIdDocument = gql`
    query GetCarBrandById($id: Int!) {
  carbrandsById(id: $id) {
    CarBrandID
    Name
  }
}
    `;

/**
 * __useGetCarBrandByIdQuery__
 *
 * To run a query within a React component, call `useGetCarBrandByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarBrandByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarBrandByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCarBrandByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCarBrandByIdQuery, GetCarBrandByIdQueryVariables> & ({ variables: GetCarBrandByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarBrandByIdQuery, GetCarBrandByIdQueryVariables>(GetCarBrandByIdDocument, options);
      }
export function useGetCarBrandByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarBrandByIdQuery, GetCarBrandByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarBrandByIdQuery, GetCarBrandByIdQueryVariables>(GetCarBrandByIdDocument, options);
        }
export function useGetCarBrandByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarBrandByIdQuery, GetCarBrandByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarBrandByIdQuery, GetCarBrandByIdQueryVariables>(GetCarBrandByIdDocument, options);
        }
export type GetCarBrandByIdQueryHookResult = ReturnType<typeof useGetCarBrandByIdQuery>;
export type GetCarBrandByIdLazyQueryHookResult = ReturnType<typeof useGetCarBrandByIdLazyQuery>;
export type GetCarBrandByIdSuspenseQueryHookResult = ReturnType<typeof useGetCarBrandByIdSuspenseQuery>;
export type GetCarBrandByIdQueryResult = Apollo.QueryResult<GetCarBrandByIdQuery, GetCarBrandByIdQueryVariables>;
export const GetCarByIdDocument = gql`
    query GetCarById($id: Int!) {
  carsById(id: $id) {
    CarID
    LicensePlate
    Year
    CarModelID
    ClientID
    LastServiceMileage
    IsDebtor
    DiscountID
    CarModelData {
      Model
    }
    CarBrandData {
      Name
    }
    ClientData {
      FirstName
      LastName
    }
  }
}
    `;

/**
 * __useGetCarByIdQuery__
 *
 * To run a query within a React component, call `useGetCarByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCarByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCarByIdQuery, GetCarByIdQueryVariables> & ({ variables: GetCarByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarByIdQuery, GetCarByIdQueryVariables>(GetCarByIdDocument, options);
      }
export function useGetCarByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarByIdQuery, GetCarByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarByIdQuery, GetCarByIdQueryVariables>(GetCarByIdDocument, options);
        }
export function useGetCarByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarByIdQuery, GetCarByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarByIdQuery, GetCarByIdQueryVariables>(GetCarByIdDocument, options);
        }
export type GetCarByIdQueryHookResult = ReturnType<typeof useGetCarByIdQuery>;
export type GetCarByIdLazyQueryHookResult = ReturnType<typeof useGetCarByIdLazyQuery>;
export type GetCarByIdSuspenseQueryHookResult = ReturnType<typeof useGetCarByIdSuspenseQuery>;
export type GetCarByIdQueryResult = Apollo.QueryResult<GetCarByIdQuery, GetCarByIdQueryVariables>;
export const GetCarFormDataDocument = gql`
    query GetCarFormData {
  carBrands: allCarbrands {
    CarBrandID
    Name
  }
  carModels: allCarmodels {
    CarModelID
    CarBrandID
    Model
  }
  clients: allClients {
    ClientID
    FirstName
    LastName
  }
  discounts: allDiscounts {
    DiscountID
    DiscountName
  }
}
    `;

/**
 * __useGetCarFormDataQuery__
 *
 * To run a query within a React component, call `useGetCarFormDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarFormDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarFormDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCarFormDataQuery(baseOptions?: Apollo.QueryHookOptions<GetCarFormDataQuery, GetCarFormDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarFormDataQuery, GetCarFormDataQueryVariables>(GetCarFormDataDocument, options);
      }
export function useGetCarFormDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarFormDataQuery, GetCarFormDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarFormDataQuery, GetCarFormDataQueryVariables>(GetCarFormDataDocument, options);
        }
export function useGetCarFormDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarFormDataQuery, GetCarFormDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarFormDataQuery, GetCarFormDataQueryVariables>(GetCarFormDataDocument, options);
        }
export type GetCarFormDataQueryHookResult = ReturnType<typeof useGetCarFormDataQuery>;
export type GetCarFormDataLazyQueryHookResult = ReturnType<typeof useGetCarFormDataLazyQuery>;
export type GetCarFormDataSuspenseQueryHookResult = ReturnType<typeof useGetCarFormDataSuspenseQuery>;
export type GetCarFormDataQueryResult = Apollo.QueryResult<GetCarFormDataQuery, GetCarFormDataQueryVariables>;
export const GetCarModelByIdDocument = gql`
    query GetCarModelById($id: Int!) {
  carmodelsById(id: $id) {
    CarModelID
    CarBrandID
    Model
    CarBrandData {
      Name
    }
  }
}
    `;

/**
 * __useGetCarModelByIdQuery__
 *
 * To run a query within a React component, call `useGetCarModelByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarModelByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarModelByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCarModelByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCarModelByIdQuery, GetCarModelByIdQueryVariables> & ({ variables: GetCarModelByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarModelByIdQuery, GetCarModelByIdQueryVariables>(GetCarModelByIdDocument, options);
      }
export function useGetCarModelByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarModelByIdQuery, GetCarModelByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarModelByIdQuery, GetCarModelByIdQueryVariables>(GetCarModelByIdDocument, options);
        }
export function useGetCarModelByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarModelByIdQuery, GetCarModelByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarModelByIdQuery, GetCarModelByIdQueryVariables>(GetCarModelByIdDocument, options);
        }
export type GetCarModelByIdQueryHookResult = ReturnType<typeof useGetCarModelByIdQuery>;
export type GetCarModelByIdLazyQueryHookResult = ReturnType<typeof useGetCarModelByIdLazyQuery>;
export type GetCarModelByIdSuspenseQueryHookResult = ReturnType<typeof useGetCarModelByIdSuspenseQuery>;
export type GetCarModelByIdQueryResult = Apollo.QueryResult<GetCarModelByIdQuery, GetCarModelByIdQueryVariables>;
export const GetCarModelsByBrandDocument = gql`
    query GetCarModelsByBrand($brandID: Int!) {
  carmodelsByBrand(carBrandID: $brandID) {
    CarModelID
    CarBrandID
    Model
    CarBrandData {
      Name
    }
  }
}
    `;

/**
 * __useGetCarModelsByBrandQuery__
 *
 * To run a query within a React component, call `useGetCarModelsByBrandQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarModelsByBrandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarModelsByBrandQuery({
 *   variables: {
 *      brandID: // value for 'brandID'
 *   },
 * });
 */
export function useGetCarModelsByBrandQuery(baseOptions: Apollo.QueryHookOptions<GetCarModelsByBrandQuery, GetCarModelsByBrandQueryVariables> & ({ variables: GetCarModelsByBrandQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarModelsByBrandQuery, GetCarModelsByBrandQueryVariables>(GetCarModelsByBrandDocument, options);
      }
export function useGetCarModelsByBrandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarModelsByBrandQuery, GetCarModelsByBrandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarModelsByBrandQuery, GetCarModelsByBrandQueryVariables>(GetCarModelsByBrandDocument, options);
        }
export function useGetCarModelsByBrandSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarModelsByBrandQuery, GetCarModelsByBrandQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarModelsByBrandQuery, GetCarModelsByBrandQueryVariables>(GetCarModelsByBrandDocument, options);
        }
export type GetCarModelsByBrandQueryHookResult = ReturnType<typeof useGetCarModelsByBrandQuery>;
export type GetCarModelsByBrandLazyQueryHookResult = ReturnType<typeof useGetCarModelsByBrandLazyQuery>;
export type GetCarModelsByBrandSuspenseQueryHookResult = ReturnType<typeof useGetCarModelsByBrandSuspenseQuery>;
export type GetCarModelsByBrandQueryResult = Apollo.QueryResult<GetCarModelsByBrandQuery, GetCarModelsByBrandQueryVariables>;
export const GetClientByIdDocument = gql`
    query GetClientById($id: Int!) {
  clientsById(id: $id) {
    ClientID
    DocTypeID
    DocNumber
    FirstName
    LastName
    Phone
    Email
    Address
    City
    PostalCode
    IsActive
    CountryID
    ProvinceID
    PriceListID
    VendorID
  }
}
    `;

/**
 * __useGetClientByIdQuery__
 *
 * To run a query within a React component, call `useGetClientByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClientByIdQuery(baseOptions: Apollo.QueryHookOptions<GetClientByIdQuery, GetClientByIdQueryVariables> & ({ variables: GetClientByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientByIdQuery, GetClientByIdQueryVariables>(GetClientByIdDocument, options);
      }
export function useGetClientByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientByIdQuery, GetClientByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientByIdQuery, GetClientByIdQueryVariables>(GetClientByIdDocument, options);
        }
export function useGetClientByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClientByIdQuery, GetClientByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClientByIdQuery, GetClientByIdQueryVariables>(GetClientByIdDocument, options);
        }
export type GetClientByIdQueryHookResult = ReturnType<typeof useGetClientByIdQuery>;
export type GetClientByIdLazyQueryHookResult = ReturnType<typeof useGetClientByIdLazyQuery>;
export type GetClientByIdSuspenseQueryHookResult = ReturnType<typeof useGetClientByIdSuspenseQuery>;
export type GetClientByIdQueryResult = Apollo.QueryResult<GetClientByIdQuery, GetClientByIdQueryVariables>;
export const GetClientFormDataDocument = gql`
    query GetClientFormData {
  docTypes: allSysdoctypes {
    DocTypeID
    Name
  }
  countries: allCountries {
    CountryID
    Name
  }
  provinces: allProvinces {
    ProvinceID
    CountryID
    Name
  }
  priceLists: allPricelists {
    PriceListID
    Name
    Description
    IsActive
  }
  vendors: allVendors {
    VendorID
    VendorName
    IsActive
  }
}
    `;

/**
 * __useGetClientFormDataQuery__
 *
 * To run a query within a React component, call `useGetClientFormDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientFormDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientFormDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClientFormDataQuery(baseOptions?: Apollo.QueryHookOptions<GetClientFormDataQuery, GetClientFormDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientFormDataQuery, GetClientFormDataQueryVariables>(GetClientFormDataDocument, options);
      }
export function useGetClientFormDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientFormDataQuery, GetClientFormDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientFormDataQuery, GetClientFormDataQueryVariables>(GetClientFormDataDocument, options);
        }
export function useGetClientFormDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClientFormDataQuery, GetClientFormDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClientFormDataQuery, GetClientFormDataQueryVariables>(GetClientFormDataDocument, options);
        }
export type GetClientFormDataQueryHookResult = ReturnType<typeof useGetClientFormDataQuery>;
export type GetClientFormDataLazyQueryHookResult = ReturnType<typeof useGetClientFormDataLazyQuery>;
export type GetClientFormDataSuspenseQueryHookResult = ReturnType<typeof useGetClientFormDataSuspenseQuery>;
export type GetClientFormDataQueryResult = Apollo.QueryResult<GetClientFormDataQuery, GetClientFormDataQueryVariables>;
export const GetCompanyByIdDocument = gql`
    query GetCompanyById($id: Int!) {
  companydataById(id: $id) {
    CompanyID
    Name
    Address
    CUIT
    Grossincome
    Startdate
    Logo
  }
}
    `;

/**
 * __useGetCompanyByIdQuery__
 *
 * To run a query within a React component, call `useGetCompanyByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCompanyByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCompanyByIdQuery, GetCompanyByIdQueryVariables> & ({ variables: GetCompanyByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>(GetCompanyByIdDocument, options);
      }
export function useGetCompanyByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>(GetCompanyByIdDocument, options);
        }
export function useGetCompanyByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>(GetCompanyByIdDocument, options);
        }
export type GetCompanyByIdQueryHookResult = ReturnType<typeof useGetCompanyByIdQuery>;
export type GetCompanyByIdLazyQueryHookResult = ReturnType<typeof useGetCompanyByIdLazyQuery>;
export type GetCompanyByIdSuspenseQueryHookResult = ReturnType<typeof useGetCompanyByIdSuspenseQuery>;
export type GetCompanyByIdQueryResult = Apollo.QueryResult<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>;
export const GetCountriesDocument = gql`
    query GetCountries {
  allCountries {
    CountryID
    Name
  }
}
    `;

/**
 * __useGetCountriesQuery__
 *
 * To run a query within a React component, call `useGetCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCountriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCountriesQuery, GetCountriesQueryVariables>(GetCountriesDocument, options);
      }
export function useGetCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCountriesQuery, GetCountriesQueryVariables>(GetCountriesDocument, options);
        }
export function useGetCountriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCountriesQuery, GetCountriesQueryVariables>(GetCountriesDocument, options);
        }
export type GetCountriesQueryHookResult = ReturnType<typeof useGetCountriesQuery>;
export type GetCountriesLazyQueryHookResult = ReturnType<typeof useGetCountriesLazyQuery>;
export type GetCountriesSuspenseQueryHookResult = ReturnType<typeof useGetCountriesSuspenseQuery>;
export type GetCountriesQueryResult = Apollo.QueryResult<GetCountriesQuery, GetCountriesQueryVariables>;
export const GetCreditCardByIdDocument = gql`
    query GetCreditCardById($id: Int!) {
  creditcardById(id: $id) {
    CreditCardID
    CreditCardGroupID
    CardName
    Surcharge
    Installments
    IsActive
    GroupData {
      GroupName
    }
  }
}
    `;

/**
 * __useGetCreditCardByIdQuery__
 *
 * To run a query within a React component, call `useGetCreditCardByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreditCardByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreditCardByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCreditCardByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCreditCardByIdQuery, GetCreditCardByIdQueryVariables> & ({ variables: GetCreditCardByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCreditCardByIdQuery, GetCreditCardByIdQueryVariables>(GetCreditCardByIdDocument, options);
      }
export function useGetCreditCardByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCreditCardByIdQuery, GetCreditCardByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCreditCardByIdQuery, GetCreditCardByIdQueryVariables>(GetCreditCardByIdDocument, options);
        }
export function useGetCreditCardByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCreditCardByIdQuery, GetCreditCardByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCreditCardByIdQuery, GetCreditCardByIdQueryVariables>(GetCreditCardByIdDocument, options);
        }
export type GetCreditCardByIdQueryHookResult = ReturnType<typeof useGetCreditCardByIdQuery>;
export type GetCreditCardByIdLazyQueryHookResult = ReturnType<typeof useGetCreditCardByIdLazyQuery>;
export type GetCreditCardByIdSuspenseQueryHookResult = ReturnType<typeof useGetCreditCardByIdSuspenseQuery>;
export type GetCreditCardByIdQueryResult = Apollo.QueryResult<GetCreditCardByIdQuery, GetCreditCardByIdQueryVariables>;
export const GetCreditCardGroupByIdDocument = gql`
    query GetCreditCardGroupById($id: Int!) {
  creditcardgroupById(id: $id) {
    CreditCardGroupID
    GroupName
  }
}
    `;

/**
 * __useGetCreditCardGroupByIdQuery__
 *
 * To run a query within a React component, call `useGetCreditCardGroupByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreditCardGroupByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreditCardGroupByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCreditCardGroupByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCreditCardGroupByIdQuery, GetCreditCardGroupByIdQueryVariables> & ({ variables: GetCreditCardGroupByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCreditCardGroupByIdQuery, GetCreditCardGroupByIdQueryVariables>(GetCreditCardGroupByIdDocument, options);
      }
export function useGetCreditCardGroupByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCreditCardGroupByIdQuery, GetCreditCardGroupByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCreditCardGroupByIdQuery, GetCreditCardGroupByIdQueryVariables>(GetCreditCardGroupByIdDocument, options);
        }
export function useGetCreditCardGroupByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCreditCardGroupByIdQuery, GetCreditCardGroupByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCreditCardGroupByIdQuery, GetCreditCardGroupByIdQueryVariables>(GetCreditCardGroupByIdDocument, options);
        }
export type GetCreditCardGroupByIdQueryHookResult = ReturnType<typeof useGetCreditCardGroupByIdQuery>;
export type GetCreditCardGroupByIdLazyQueryHookResult = ReturnType<typeof useGetCreditCardGroupByIdLazyQuery>;
export type GetCreditCardGroupByIdSuspenseQueryHookResult = ReturnType<typeof useGetCreditCardGroupByIdSuspenseQuery>;
export type GetCreditCardGroupByIdQueryResult = Apollo.QueryResult<GetCreditCardGroupByIdQuery, GetCreditCardGroupByIdQueryVariables>;
export const GetDashboardDataDocument = gql`
    query GetDashboardData {
  clients: allClients {
    ClientID
    IsActive
  }
  items: allItems {
    ItemID
    CompanyID
    IsActive
    ControlStock
    ReplenishmentStock
  }
  orders: allOrders {
    OrderID
    CompanyID
    OrderStatusID
    Total
    Date_
  }
  itemstock: allItemstock {
    ItemID
    Quantity
    MinStockLevel
    CompanyID
  }
}
    `;

/**
 * __useGetDashboardDataQuery__
 *
 * To run a query within a React component, call `useGetDashboardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashboardDataQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
      }
export function useGetDashboardDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
        }
export function useGetDashboardDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
        }
export type GetDashboardDataQueryHookResult = ReturnType<typeof useGetDashboardDataQuery>;
export type GetDashboardDataLazyQueryHookResult = ReturnType<typeof useGetDashboardDataLazyQuery>;
export type GetDashboardDataSuspenseQueryHookResult = ReturnType<typeof useGetDashboardDataSuspenseQuery>;
export type GetDashboardDataQueryResult = Apollo.QueryResult<GetDashboardDataQuery, GetDashboardDataQueryVariables>;
export const GetDiscountByIdDocument = gql`
    query GetDiscountById($id: Int!) {
  discountsById(id: $id) {
    DiscountID
    DiscountName
    Percentage
  }
}
    `;

/**
 * __useGetDiscountByIdQuery__
 *
 * To run a query within a React component, call `useGetDiscountByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDiscountByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDiscountByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDiscountByIdQuery(baseOptions: Apollo.QueryHookOptions<GetDiscountByIdQuery, GetDiscountByIdQueryVariables> & ({ variables: GetDiscountByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDiscountByIdQuery, GetDiscountByIdQueryVariables>(GetDiscountByIdDocument, options);
      }
export function useGetDiscountByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDiscountByIdQuery, GetDiscountByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDiscountByIdQuery, GetDiscountByIdQueryVariables>(GetDiscountByIdDocument, options);
        }
export function useGetDiscountByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDiscountByIdQuery, GetDiscountByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDiscountByIdQuery, GetDiscountByIdQueryVariables>(GetDiscountByIdDocument, options);
        }
export type GetDiscountByIdQueryHookResult = ReturnType<typeof useGetDiscountByIdQuery>;
export type GetDiscountByIdLazyQueryHookResult = ReturnType<typeof useGetDiscountByIdLazyQuery>;
export type GetDiscountByIdSuspenseQueryHookResult = ReturnType<typeof useGetDiscountByIdSuspenseQuery>;
export type GetDiscountByIdQueryResult = Apollo.QueryResult<GetDiscountByIdQuery, GetDiscountByIdQueryVariables>;
export const GetDocumentByIdDocument = gql`
    query GetDocumentById($id: Int!) {
  documentsById(id: $id) {
    DocumentID
    CompanyID
    BranchID
    DocumentTypeID
    Description
    DocumentNumber
    PointOfSale
    IsActive
    Testing
    ShouldAccount
    MovesStock
    IsFiscal
    IsElectronic
    IsManual
    IsQuotation
    MaxItems
  }
}
    `;

/**
 * __useGetDocumentByIdQuery__
 *
 * To run a query within a React component, call `useGetDocumentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDocumentByIdQuery(baseOptions: Apollo.QueryHookOptions<GetDocumentByIdQuery, GetDocumentByIdQueryVariables> & ({ variables: GetDocumentByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentByIdQuery, GetDocumentByIdQueryVariables>(GetDocumentByIdDocument, options);
      }
export function useGetDocumentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDocumentByIdQuery, GetDocumentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentByIdQuery, GetDocumentByIdQueryVariables>(GetDocumentByIdDocument, options);
        }
export function useGetDocumentByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDocumentByIdQuery, GetDocumentByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDocumentByIdQuery, GetDocumentByIdQueryVariables>(GetDocumentByIdDocument, options);
        }
export type GetDocumentByIdQueryHookResult = ReturnType<typeof useGetDocumentByIdQuery>;
export type GetDocumentByIdLazyQueryHookResult = ReturnType<typeof useGetDocumentByIdLazyQuery>;
export type GetDocumentByIdSuspenseQueryHookResult = ReturnType<typeof useGetDocumentByIdSuspenseQuery>;
export type GetDocumentByIdQueryResult = Apollo.QueryResult<GetDocumentByIdQuery, GetDocumentByIdQueryVariables>;
export const GetDocumentTypesDocument = gql`
    query GetDocumentTypes {
  allSysdocumenttypes {
    DocumentTypeID
    Name
  }
}
    `;

/**
 * __useGetDocumentTypesQuery__
 *
 * To run a query within a React component, call `useGetDocumentTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDocumentTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetDocumentTypesQuery, GetDocumentTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentTypesQuery, GetDocumentTypesQueryVariables>(GetDocumentTypesDocument, options);
      }
export function useGetDocumentTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDocumentTypesQuery, GetDocumentTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentTypesQuery, GetDocumentTypesQueryVariables>(GetDocumentTypesDocument, options);
        }
export function useGetDocumentTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDocumentTypesQuery, GetDocumentTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDocumentTypesQuery, GetDocumentTypesQueryVariables>(GetDocumentTypesDocument, options);
        }
export type GetDocumentTypesQueryHookResult = ReturnType<typeof useGetDocumentTypesQuery>;
export type GetDocumentTypesLazyQueryHookResult = ReturnType<typeof useGetDocumentTypesLazyQuery>;
export type GetDocumentTypesSuspenseQueryHookResult = ReturnType<typeof useGetDocumentTypesSuspenseQuery>;
export type GetDocumentTypesQueryResult = Apollo.QueryResult<GetDocumentTypesQuery, GetDocumentTypesQueryVariables>;
export const GetFilterFieldsDocument = gql`
    query GetFilterFields($model: String!) {
  filterFields(model: $model) {
    field
    label
    type
    relationModel
    dependsOn
  }
}
    `;

/**
 * __useGetFilterFieldsQuery__
 *
 * To run a query within a React component, call `useGetFilterFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilterFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilterFieldsQuery({
 *   variables: {
 *      model: // value for 'model'
 *   },
 * });
 */
export function useGetFilterFieldsQuery(baseOptions: Apollo.QueryHookOptions<GetFilterFieldsQuery, GetFilterFieldsQueryVariables> & ({ variables: GetFilterFieldsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilterFieldsQuery, GetFilterFieldsQueryVariables>(GetFilterFieldsDocument, options);
      }
export function useGetFilterFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilterFieldsQuery, GetFilterFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilterFieldsQuery, GetFilterFieldsQueryVariables>(GetFilterFieldsDocument, options);
        }
export function useGetFilterFieldsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFilterFieldsQuery, GetFilterFieldsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFilterFieldsQuery, GetFilterFieldsQueryVariables>(GetFilterFieldsDocument, options);
        }
export type GetFilterFieldsQueryHookResult = ReturnType<typeof useGetFilterFieldsQuery>;
export type GetFilterFieldsLazyQueryHookResult = ReturnType<typeof useGetFilterFieldsLazyQuery>;
export type GetFilterFieldsSuspenseQueryHookResult = ReturnType<typeof useGetFilterFieldsSuspenseQuery>;
export type GetFilterFieldsQueryResult = Apollo.QueryResult<GetFilterFieldsQuery, GetFilterFieldsQueryVariables>;
export const GetItemByIdDocument = gql`
    query GetItemById($id: Int!) {
  itemsById(id: $id) {
    ItemID
    CompanyID
    BranchID
    BrandID
    Code
    Description
    ItemCategoryID
    ItemSubcategoryID
    SupplierID
    ControlStock
    ReplenishmentStock
    IsOffer
    OEM
    LastModified
    WarehouseID
    IsActive
  }
}
    `;

/**
 * __useGetItemByIdQuery__
 *
 * To run a query within a React component, call `useGetItemByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetItemByIdQuery(baseOptions: Apollo.QueryHookOptions<GetItemByIdQuery, GetItemByIdQueryVariables> & ({ variables: GetItemByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemByIdQuery, GetItemByIdQueryVariables>(GetItemByIdDocument, options);
      }
export function useGetItemByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemByIdQuery, GetItemByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemByIdQuery, GetItemByIdQueryVariables>(GetItemByIdDocument, options);
        }
export function useGetItemByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetItemByIdQuery, GetItemByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetItemByIdQuery, GetItemByIdQueryVariables>(GetItemByIdDocument, options);
        }
export type GetItemByIdQueryHookResult = ReturnType<typeof useGetItemByIdQuery>;
export type GetItemByIdLazyQueryHookResult = ReturnType<typeof useGetItemByIdLazyQuery>;
export type GetItemByIdSuspenseQueryHookResult = ReturnType<typeof useGetItemByIdSuspenseQuery>;
export type GetItemByIdQueryResult = Apollo.QueryResult<GetItemByIdQuery, GetItemByIdQueryVariables>;
export const GetItemCategoryByIdDocument = gql`
    query GetItemCategoryById($id: Int!) {
  itemcategoriesById(id: $id) {
    ItemCategoryID
    CategoryName
  }
}
    `;

/**
 * __useGetItemCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetItemCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemCategoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetItemCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetItemCategoryByIdQuery, GetItemCategoryByIdQueryVariables> & ({ variables: GetItemCategoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemCategoryByIdQuery, GetItemCategoryByIdQueryVariables>(GetItemCategoryByIdDocument, options);
      }
export function useGetItemCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemCategoryByIdQuery, GetItemCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemCategoryByIdQuery, GetItemCategoryByIdQueryVariables>(GetItemCategoryByIdDocument, options);
        }
export function useGetItemCategoryByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetItemCategoryByIdQuery, GetItemCategoryByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetItemCategoryByIdQuery, GetItemCategoryByIdQueryVariables>(GetItemCategoryByIdDocument, options);
        }
export type GetItemCategoryByIdQueryHookResult = ReturnType<typeof useGetItemCategoryByIdQuery>;
export type GetItemCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetItemCategoryByIdLazyQuery>;
export type GetItemCategoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetItemCategoryByIdSuspenseQuery>;
export type GetItemCategoryByIdQueryResult = Apollo.QueryResult<GetItemCategoryByIdQuery, GetItemCategoryByIdQueryVariables>;
export const GetItemSubcategoriesByCategoryDocument = gql`
    query GetItemSubcategoriesByCategory($categoryID: Int!) {
  itemsubcategoriesByCategory(categoryID: $categoryID) {
    ItemSubcategoryID
    SubcategoryName
    ItemCategoryID
  }
}
    `;

/**
 * __useGetItemSubcategoriesByCategoryQuery__
 *
 * To run a query within a React component, call `useGetItemSubcategoriesByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemSubcategoriesByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemSubcategoriesByCategoryQuery({
 *   variables: {
 *      categoryID: // value for 'categoryID'
 *   },
 * });
 */
export function useGetItemSubcategoriesByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetItemSubcategoriesByCategoryQuery, GetItemSubcategoriesByCategoryQueryVariables> & ({ variables: GetItemSubcategoriesByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemSubcategoriesByCategoryQuery, GetItemSubcategoriesByCategoryQueryVariables>(GetItemSubcategoriesByCategoryDocument, options);
      }
export function useGetItemSubcategoriesByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemSubcategoriesByCategoryQuery, GetItemSubcategoriesByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemSubcategoriesByCategoryQuery, GetItemSubcategoriesByCategoryQueryVariables>(GetItemSubcategoriesByCategoryDocument, options);
        }
export function useGetItemSubcategoriesByCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetItemSubcategoriesByCategoryQuery, GetItemSubcategoriesByCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetItemSubcategoriesByCategoryQuery, GetItemSubcategoriesByCategoryQueryVariables>(GetItemSubcategoriesByCategoryDocument, options);
        }
export type GetItemSubcategoriesByCategoryQueryHookResult = ReturnType<typeof useGetItemSubcategoriesByCategoryQuery>;
export type GetItemSubcategoriesByCategoryLazyQueryHookResult = ReturnType<typeof useGetItemSubcategoriesByCategoryLazyQuery>;
export type GetItemSubcategoriesByCategorySuspenseQueryHookResult = ReturnType<typeof useGetItemSubcategoriesByCategorySuspenseQuery>;
export type GetItemSubcategoriesByCategoryQueryResult = Apollo.QueryResult<GetItemSubcategoriesByCategoryQuery, GetItemSubcategoriesByCategoryQueryVariables>;
export const GetItemSubcategoryByIdDocument = gql`
    query GetItemSubcategoryById($id: Int!) {
  itemsubcategoriesById(id: $id) {
    ItemSubcategoryID
    ItemCategoryID
    SubcategoryName
    CategoryData {
      CategoryName
    }
  }
}
    `;

/**
 * __useGetItemSubcategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetItemSubcategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemSubcategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemSubcategoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetItemSubcategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetItemSubcategoryByIdQuery, GetItemSubcategoryByIdQueryVariables> & ({ variables: GetItemSubcategoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemSubcategoryByIdQuery, GetItemSubcategoryByIdQueryVariables>(GetItemSubcategoryByIdDocument, options);
      }
export function useGetItemSubcategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemSubcategoryByIdQuery, GetItemSubcategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemSubcategoryByIdQuery, GetItemSubcategoryByIdQueryVariables>(GetItemSubcategoryByIdDocument, options);
        }
export function useGetItemSubcategoryByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetItemSubcategoryByIdQuery, GetItemSubcategoryByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetItemSubcategoryByIdQuery, GetItemSubcategoryByIdQueryVariables>(GetItemSubcategoryByIdDocument, options);
        }
export type GetItemSubcategoryByIdQueryHookResult = ReturnType<typeof useGetItemSubcategoryByIdQuery>;
export type GetItemSubcategoryByIdLazyQueryHookResult = ReturnType<typeof useGetItemSubcategoryByIdLazyQuery>;
export type GetItemSubcategoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetItemSubcategoryByIdSuspenseQuery>;
export type GetItemSubcategoryByIdQueryResult = Apollo.QueryResult<GetItemSubcategoryByIdQuery, GetItemSubcategoryByIdQueryVariables>;
export const GetOrderByIdDocument = gql`
    query GetOrderById($id: Int!) {
  ordersById(id: $id) {
    OrderID
    CompanyID
    BranchID
    Date_
    ClientID
    CarID
    IsService
    ServiceTypeID
    Mileage
    NextServiceMileage
    Notes
    SaleConditionID
    DiscountID
    Subtotal
    Total
    VAT
    UserID
    DocumentID
    PriceListID
    OrderStatusID
    WarehouseID
    Items {
      OrderDetailID
      ItemID
      Quantity
      UnitPrice
      Description
    }
  }
}
    `;

/**
 * __useGetOrderByIdQuery__
 *
 * To run a query within a React component, call `useGetOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables> & ({ variables: GetOrderByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
      }
export function useGetOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export function useGetOrderByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export type GetOrderByIdQueryHookResult = ReturnType<typeof useGetOrderByIdQuery>;
export type GetOrderByIdLazyQueryHookResult = ReturnType<typeof useGetOrderByIdLazyQuery>;
export type GetOrderByIdSuspenseQueryHookResult = ReturnType<typeof useGetOrderByIdSuspenseQuery>;
export type GetOrderByIdQueryResult = Apollo.QueryResult<GetOrderByIdQuery, GetOrderByIdQueryVariables>;
export const GetPriceListsDocument = gql`
    query GetPriceLists {
  allPricelists {
    PriceListID
    Name
    Description
    IsActive
  }
}
    `;

/**
 * __useGetPriceListsQuery__
 *
 * To run a query within a React component, call `useGetPriceListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriceListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriceListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPriceListsQuery(baseOptions?: Apollo.QueryHookOptions<GetPriceListsQuery, GetPriceListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPriceListsQuery, GetPriceListsQueryVariables>(GetPriceListsDocument, options);
      }
export function useGetPriceListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPriceListsQuery, GetPriceListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPriceListsQuery, GetPriceListsQueryVariables>(GetPriceListsDocument, options);
        }
export function useGetPriceListsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPriceListsQuery, GetPriceListsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPriceListsQuery, GetPriceListsQueryVariables>(GetPriceListsDocument, options);
        }
export type GetPriceListsQueryHookResult = ReturnType<typeof useGetPriceListsQuery>;
export type GetPriceListsLazyQueryHookResult = ReturnType<typeof useGetPriceListsLazyQuery>;
export type GetPriceListsSuspenseQueryHookResult = ReturnType<typeof useGetPriceListsSuspenseQuery>;
export type GetPriceListsQueryResult = Apollo.QueryResult<GetPriceListsQuery, GetPriceListsQueryVariables>;
export const GetPricelistByIdDocument = gql`
    query GetPricelistById($id: Int!) {
  pricelistsById(id: $id) {
    PriceListID
    Name
    Description
    IsActive
  }
}
    `;

/**
 * __useGetPricelistByIdQuery__
 *
 * To run a query within a React component, call `useGetPricelistByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPricelistByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPricelistByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPricelistByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPricelistByIdQuery, GetPricelistByIdQueryVariables> & ({ variables: GetPricelistByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPricelistByIdQuery, GetPricelistByIdQueryVariables>(GetPricelistByIdDocument, options);
      }
export function useGetPricelistByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPricelistByIdQuery, GetPricelistByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPricelistByIdQuery, GetPricelistByIdQueryVariables>(GetPricelistByIdDocument, options);
        }
export function useGetPricelistByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPricelistByIdQuery, GetPricelistByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPricelistByIdQuery, GetPricelistByIdQueryVariables>(GetPricelistByIdDocument, options);
        }
export type GetPricelistByIdQueryHookResult = ReturnType<typeof useGetPricelistByIdQuery>;
export type GetPricelistByIdLazyQueryHookResult = ReturnType<typeof useGetPricelistByIdLazyQuery>;
export type GetPricelistByIdSuspenseQueryHookResult = ReturnType<typeof useGetPricelistByIdSuspenseQuery>;
export type GetPricelistByIdQueryResult = Apollo.QueryResult<GetPricelistByIdQuery, GetPricelistByIdQueryVariables>;
export const GetPricelistItemsFilteredDocument = gql`
    query GetPricelistItemsFiltered($priceListID: Int, $itemID: Int) {
  pricelistitemsFiltered(pricelistID: $priceListID, itemID: $itemID) {
    PriceListID
    ItemID
    Price
    EffectiveDate
    PriceListData {
      Name
      Description
    }
  }
}
    `;

/**
 * __useGetPricelistItemsFilteredQuery__
 *
 * To run a query within a React component, call `useGetPricelistItemsFilteredQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPricelistItemsFilteredQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPricelistItemsFilteredQuery({
 *   variables: {
 *      priceListID: // value for 'priceListID'
 *      itemID: // value for 'itemID'
 *   },
 * });
 */
export function useGetPricelistItemsFilteredQuery(baseOptions?: Apollo.QueryHookOptions<GetPricelistItemsFilteredQuery, GetPricelistItemsFilteredQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPricelistItemsFilteredQuery, GetPricelistItemsFilteredQueryVariables>(GetPricelistItemsFilteredDocument, options);
      }
export function useGetPricelistItemsFilteredLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPricelistItemsFilteredQuery, GetPricelistItemsFilteredQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPricelistItemsFilteredQuery, GetPricelistItemsFilteredQueryVariables>(GetPricelistItemsFilteredDocument, options);
        }
export function useGetPricelistItemsFilteredSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPricelistItemsFilteredQuery, GetPricelistItemsFilteredQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPricelistItemsFilteredQuery, GetPricelistItemsFilteredQueryVariables>(GetPricelistItemsFilteredDocument, options);
        }
export type GetPricelistItemsFilteredQueryHookResult = ReturnType<typeof useGetPricelistItemsFilteredQuery>;
export type GetPricelistItemsFilteredLazyQueryHookResult = ReturnType<typeof useGetPricelistItemsFilteredLazyQuery>;
export type GetPricelistItemsFilteredSuspenseQueryHookResult = ReturnType<typeof useGetPricelistItemsFilteredSuspenseQuery>;
export type GetPricelistItemsFilteredQueryResult = Apollo.QueryResult<GetPricelistItemsFilteredQuery, GetPricelistItemsFilteredQueryVariables>;
export const GetProvincesDocument = gql`
    query GetProvinces {
  allProvinces {
    ProvinceID
    CountryID
    Name
  }
}
    `;

/**
 * __useGetProvincesQuery__
 *
 * To run a query within a React component, call `useGetProvincesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProvincesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProvincesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProvincesQuery(baseOptions?: Apollo.QueryHookOptions<GetProvincesQuery, GetProvincesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProvincesQuery, GetProvincesQueryVariables>(GetProvincesDocument, options);
      }
export function useGetProvincesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProvincesQuery, GetProvincesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProvincesQuery, GetProvincesQueryVariables>(GetProvincesDocument, options);
        }
export function useGetProvincesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProvincesQuery, GetProvincesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProvincesQuery, GetProvincesQueryVariables>(GetProvincesDocument, options);
        }
export type GetProvincesQueryHookResult = ReturnType<typeof useGetProvincesQuery>;
export type GetProvincesLazyQueryHookResult = ReturnType<typeof useGetProvincesLazyQuery>;
export type GetProvincesSuspenseQueryHookResult = ReturnType<typeof useGetProvincesSuspenseQuery>;
export type GetProvincesQueryResult = Apollo.QueryResult<GetProvincesQuery, GetProvincesQueryVariables>;
export const GetProvincesByCountryDocument = gql`
    query GetProvincesByCountry($countryID: Int!) {
  provincesByCountry(countryID: $countryID) {
    ProvinceID
    Name
    CountryID
  }
}
    `;

/**
 * __useGetProvincesByCountryQuery__
 *
 * To run a query within a React component, call `useGetProvincesByCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProvincesByCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProvincesByCountryQuery({
 *   variables: {
 *      countryID: // value for 'countryID'
 *   },
 * });
 */
export function useGetProvincesByCountryQuery(baseOptions: Apollo.QueryHookOptions<GetProvincesByCountryQuery, GetProvincesByCountryQueryVariables> & ({ variables: GetProvincesByCountryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProvincesByCountryQuery, GetProvincesByCountryQueryVariables>(GetProvincesByCountryDocument, options);
      }
export function useGetProvincesByCountryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProvincesByCountryQuery, GetProvincesByCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProvincesByCountryQuery, GetProvincesByCountryQueryVariables>(GetProvincesByCountryDocument, options);
        }
export function useGetProvincesByCountrySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProvincesByCountryQuery, GetProvincesByCountryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProvincesByCountryQuery, GetProvincesByCountryQueryVariables>(GetProvincesByCountryDocument, options);
        }
export type GetProvincesByCountryQueryHookResult = ReturnType<typeof useGetProvincesByCountryQuery>;
export type GetProvincesByCountryLazyQueryHookResult = ReturnType<typeof useGetProvincesByCountryLazyQuery>;
export type GetProvincesByCountrySuspenseQueryHookResult = ReturnType<typeof useGetProvincesByCountrySuspenseQuery>;
export type GetProvincesByCountryQueryResult = Apollo.QueryResult<GetProvincesByCountryQuery, GetProvincesByCountryQueryVariables>;
export const GetRoleByIdDocument = gql`
    query GetRoleById($id: Int!) {
  rolesById(id: $id) {
    RoleID
    RoleName
  }
}
    `;

/**
 * __useGetRoleByIdQuery__
 *
 * To run a query within a React component, call `useGetRoleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoleByIdQuery(baseOptions: Apollo.QueryHookOptions<GetRoleByIdQuery, GetRoleByIdQueryVariables> & ({ variables: GetRoleByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoleByIdQuery, GetRoleByIdQueryVariables>(GetRoleByIdDocument, options);
      }
export function useGetRoleByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleByIdQuery, GetRoleByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoleByIdQuery, GetRoleByIdQueryVariables>(GetRoleByIdDocument, options);
        }
export function useGetRoleByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRoleByIdQuery, GetRoleByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoleByIdQuery, GetRoleByIdQueryVariables>(GetRoleByIdDocument, options);
        }
export type GetRoleByIdQueryHookResult = ReturnType<typeof useGetRoleByIdQuery>;
export type GetRoleByIdLazyQueryHookResult = ReturnType<typeof useGetRoleByIdLazyQuery>;
export type GetRoleByIdSuspenseQueryHookResult = ReturnType<typeof useGetRoleByIdSuspenseQuery>;
export type GetRoleByIdQueryResult = Apollo.QueryResult<GetRoleByIdQuery, GetRoleByIdQueryVariables>;
export const GetSaleConditionByIdDocument = gql`
    query GetSaleConditionById($id: Int!) {
  saleconditionsById(id: $id) {
    SaleConditionID
    CreditCardID
    Name
    DueDate
    Surcharge
    IsActive
  }
}
    `;

/**
 * __useGetSaleConditionByIdQuery__
 *
 * To run a query within a React component, call `useGetSaleConditionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSaleConditionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSaleConditionByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSaleConditionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSaleConditionByIdQuery, GetSaleConditionByIdQueryVariables> & ({ variables: GetSaleConditionByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSaleConditionByIdQuery, GetSaleConditionByIdQueryVariables>(GetSaleConditionByIdDocument, options);
      }
export function useGetSaleConditionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSaleConditionByIdQuery, GetSaleConditionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSaleConditionByIdQuery, GetSaleConditionByIdQueryVariables>(GetSaleConditionByIdDocument, options);
        }
export function useGetSaleConditionByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSaleConditionByIdQuery, GetSaleConditionByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSaleConditionByIdQuery, GetSaleConditionByIdQueryVariables>(GetSaleConditionByIdDocument, options);
        }
export type GetSaleConditionByIdQueryHookResult = ReturnType<typeof useGetSaleConditionByIdQuery>;
export type GetSaleConditionByIdLazyQueryHookResult = ReturnType<typeof useGetSaleConditionByIdLazyQuery>;
export type GetSaleConditionByIdSuspenseQueryHookResult = ReturnType<typeof useGetSaleConditionByIdSuspenseQuery>;
export type GetSaleConditionByIdQueryResult = Apollo.QueryResult<GetSaleConditionByIdQuery, GetSaleConditionByIdQueryVariables>;
export const GetServicetypeByIdDocument = gql`
    query GetServicetypeById($id: Int!) {
  servicetypesById(id: $id) {
    ServiceTypeID
    Type
  }
}
    `;

/**
 * __useGetServicetypeByIdQuery__
 *
 * To run a query within a React component, call `useGetServicetypeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicetypeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicetypeByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServicetypeByIdQuery(baseOptions: Apollo.QueryHookOptions<GetServicetypeByIdQuery, GetServicetypeByIdQueryVariables> & ({ variables: GetServicetypeByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicetypeByIdQuery, GetServicetypeByIdQueryVariables>(GetServicetypeByIdDocument, options);
      }
export function useGetServicetypeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicetypeByIdQuery, GetServicetypeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicetypeByIdQuery, GetServicetypeByIdQueryVariables>(GetServicetypeByIdDocument, options);
        }
export function useGetServicetypeByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServicetypeByIdQuery, GetServicetypeByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServicetypeByIdQuery, GetServicetypeByIdQueryVariables>(GetServicetypeByIdDocument, options);
        }
export type GetServicetypeByIdQueryHookResult = ReturnType<typeof useGetServicetypeByIdQuery>;
export type GetServicetypeByIdLazyQueryHookResult = ReturnType<typeof useGetServicetypeByIdLazyQuery>;
export type GetServicetypeByIdSuspenseQueryHookResult = ReturnType<typeof useGetServicetypeByIdSuspenseQuery>;
export type GetServicetypeByIdQueryResult = Apollo.QueryResult<GetServicetypeByIdQuery, GetServicetypeByIdQueryVariables>;
export const GetSupplierFormDataDocument = gql`
    query GetSupplierFormData {
  docTypes: allSysdoctypes {
    DocTypeID
    Name
  }
  countries: allCountries {
    CountryID
    Name
  }
  provinces: allProvinces {
    ProvinceID
    CountryID
    Name
  }
}
    `;

/**
 * __useGetSupplierFormDataQuery__
 *
 * To run a query within a React component, call `useGetSupplierFormDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSupplierFormDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSupplierFormDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSupplierFormDataQuery(baseOptions?: Apollo.QueryHookOptions<GetSupplierFormDataQuery, GetSupplierFormDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSupplierFormDataQuery, GetSupplierFormDataQueryVariables>(GetSupplierFormDataDocument, options);
      }
export function useGetSupplierFormDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSupplierFormDataQuery, GetSupplierFormDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSupplierFormDataQuery, GetSupplierFormDataQueryVariables>(GetSupplierFormDataDocument, options);
        }
export function useGetSupplierFormDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSupplierFormDataQuery, GetSupplierFormDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSupplierFormDataQuery, GetSupplierFormDataQueryVariables>(GetSupplierFormDataDocument, options);
        }
export type GetSupplierFormDataQueryHookResult = ReturnType<typeof useGetSupplierFormDataQuery>;
export type GetSupplierFormDataLazyQueryHookResult = ReturnType<typeof useGetSupplierFormDataLazyQuery>;
export type GetSupplierFormDataSuspenseQueryHookResult = ReturnType<typeof useGetSupplierFormDataSuspenseQuery>;
export type GetSupplierFormDataQueryResult = Apollo.QueryResult<GetSupplierFormDataQuery, GetSupplierFormDataQueryVariables>;
export const GetSuppliersDocument = gql`
    query GetSuppliers {
  allSuppliers {
    SupplierID
    DocTypeID
    DocNumber
    FirstName
    LastName
    Phone
    Email
    Address
    IsActive
    CountryID
    ProvinceID
    City
    PostalCode
  }
}
    `;

/**
 * __useGetSuppliersQuery__
 *
 * To run a query within a React component, call `useGetSuppliersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuppliersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuppliersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSuppliersQuery(baseOptions?: Apollo.QueryHookOptions<GetSuppliersQuery, GetSuppliersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuppliersQuery, GetSuppliersQueryVariables>(GetSuppliersDocument, options);
      }
export function useGetSuppliersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuppliersQuery, GetSuppliersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuppliersQuery, GetSuppliersQueryVariables>(GetSuppliersDocument, options);
        }
export function useGetSuppliersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSuppliersQuery, GetSuppliersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSuppliersQuery, GetSuppliersQueryVariables>(GetSuppliersDocument, options);
        }
export type GetSuppliersQueryHookResult = ReturnType<typeof useGetSuppliersQuery>;
export type GetSuppliersLazyQueryHookResult = ReturnType<typeof useGetSuppliersLazyQuery>;
export type GetSuppliersSuspenseQueryHookResult = ReturnType<typeof useGetSuppliersSuspenseQuery>;
export type GetSuppliersQueryResult = Apollo.QueryResult<GetSuppliersQuery, GetSuppliersQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: Int!) {
  usersById(id: $id) {
    UserID
    Nickname
    FullName
    IsActive
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUseraccessByIdDocument = gql`
    query GetUseraccessById($userID: Int!, $companyID: Int!, $branchID: Int!, $roleID: Int!) {
  useraccessById(
    userID: $userID
    companyID: $companyID
    branchID: $branchID
    roleID: $roleID
  ) {
    UserID
    CompanyID
    BranchID
    RoleID
    UserData {
      Nickname
      FullName
    }
    CompanyData {
      Name
    }
    RoleData {
      RoleName
    }
    BranchData {
      Name
    }
  }
}
    `;

/**
 * __useGetUseraccessByIdQuery__
 *
 * To run a query within a React component, call `useGetUseraccessByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUseraccessByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUseraccessByIdQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *      companyID: // value for 'companyID'
 *      branchID: // value for 'branchID'
 *      roleID: // value for 'roleID'
 *   },
 * });
 */
export function useGetUseraccessByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUseraccessByIdQuery, GetUseraccessByIdQueryVariables> & ({ variables: GetUseraccessByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUseraccessByIdQuery, GetUseraccessByIdQueryVariables>(GetUseraccessByIdDocument, options);
      }
export function useGetUseraccessByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUseraccessByIdQuery, GetUseraccessByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUseraccessByIdQuery, GetUseraccessByIdQueryVariables>(GetUseraccessByIdDocument, options);
        }
export function useGetUseraccessByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUseraccessByIdQuery, GetUseraccessByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUseraccessByIdQuery, GetUseraccessByIdQueryVariables>(GetUseraccessByIdDocument, options);
        }
export type GetUseraccessByIdQueryHookResult = ReturnType<typeof useGetUseraccessByIdQuery>;
export type GetUseraccessByIdLazyQueryHookResult = ReturnType<typeof useGetUseraccessByIdLazyQuery>;
export type GetUseraccessByIdSuspenseQueryHookResult = ReturnType<typeof useGetUseraccessByIdSuspenseQuery>;
export type GetUseraccessByIdQueryResult = Apollo.QueryResult<GetUseraccessByIdQuery, GetUseraccessByIdQueryVariables>;
export const GetVendorsDocument = gql`
    query GetVendors {
  allVendors {
    VendorID
    VendorName
    Commission
    IsActive
  }
}
    `;

/**
 * __useGetVendorsQuery__
 *
 * To run a query within a React component, call `useGetVendorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVendorsQuery(baseOptions?: Apollo.QueryHookOptions<GetVendorsQuery, GetVendorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorsQuery, GetVendorsQueryVariables>(GetVendorsDocument, options);
      }
export function useGetVendorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorsQuery, GetVendorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorsQuery, GetVendorsQueryVariables>(GetVendorsDocument, options);
        }
export function useGetVendorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetVendorsQuery, GetVendorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVendorsQuery, GetVendorsQueryVariables>(GetVendorsDocument, options);
        }
export type GetVendorsQueryHookResult = ReturnType<typeof useGetVendorsQuery>;
export type GetVendorsLazyQueryHookResult = ReturnType<typeof useGetVendorsLazyQuery>;
export type GetVendorsSuspenseQueryHookResult = ReturnType<typeof useGetVendorsSuspenseQuery>;
export type GetVendorsQueryResult = Apollo.QueryResult<GetVendorsQuery, GetVendorsQueryVariables>;
export const GetWarehouseByIdDocument = gql`
    query GetWarehouseById($id: Int!) {
  warehousesById(id: $id) {
    WarehouseID
    Name
    Addres
  }
}
    `;

/**
 * __useGetWarehouseByIdQuery__
 *
 * To run a query within a React component, call `useGetWarehouseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWarehouseByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWarehouseByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWarehouseByIdQuery(baseOptions: Apollo.QueryHookOptions<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables> & ({ variables: GetWarehouseByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>(GetWarehouseByIdDocument, options);
      }
export function useGetWarehouseByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>(GetWarehouseByIdDocument, options);
        }
export function useGetWarehouseByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>(GetWarehouseByIdDocument, options);
        }
export type GetWarehouseByIdQueryHookResult = ReturnType<typeof useGetWarehouseByIdQuery>;
export type GetWarehouseByIdLazyQueryHookResult = ReturnType<typeof useGetWarehouseByIdLazyQuery>;
export type GetWarehouseByIdSuspenseQueryHookResult = ReturnType<typeof useGetWarehouseByIdSuspenseQuery>;
export type GetWarehouseByIdQueryResult = Apollo.QueryResult<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>;
export const GetWarehousesDocument = gql`
    query GetWarehouses {
  allWarehouses {
    WarehouseID
    Name
    Addres
  }
}
    `;

/**
 * __useGetWarehousesQuery__
 *
 * To run a query within a React component, call `useGetWarehousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWarehousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWarehousesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWarehousesQuery(baseOptions?: Apollo.QueryHookOptions<GetWarehousesQuery, GetWarehousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWarehousesQuery, GetWarehousesQueryVariables>(GetWarehousesDocument, options);
      }
export function useGetWarehousesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWarehousesQuery, GetWarehousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWarehousesQuery, GetWarehousesQueryVariables>(GetWarehousesDocument, options);
        }
export function useGetWarehousesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWarehousesQuery, GetWarehousesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWarehousesQuery, GetWarehousesQueryVariables>(GetWarehousesDocument, options);
        }
export type GetWarehousesQueryHookResult = ReturnType<typeof useGetWarehousesQuery>;
export type GetWarehousesLazyQueryHookResult = ReturnType<typeof useGetWarehousesLazyQuery>;
export type GetWarehousesSuspenseQueryHookResult = ReturnType<typeof useGetWarehousesSuspenseQuery>;
export type GetWarehousesQueryResult = Apollo.QueryResult<GetWarehousesQuery, GetWarehousesQueryVariables>;
export const SearchClientsDocument = gql`
    query SearchClients($searchTerm: String!, $isActive: Boolean) {
  allClients {
    ClientID
    DocNumber
    FirstName
    LastName
    Phone
    Email
    City
    IsActive
  }
}
    `;

/**
 * __useSearchClientsQuery__
 *
 * To run a query within a React component, call `useSearchClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchClientsQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useSearchClientsQuery(baseOptions: Apollo.QueryHookOptions<SearchClientsQuery, SearchClientsQueryVariables> & ({ variables: SearchClientsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchClientsQuery, SearchClientsQueryVariables>(SearchClientsDocument, options);
      }
export function useSearchClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchClientsQuery, SearchClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchClientsQuery, SearchClientsQueryVariables>(SearchClientsDocument, options);
        }
export function useSearchClientsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchClientsQuery, SearchClientsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchClientsQuery, SearchClientsQueryVariables>(SearchClientsDocument, options);
        }
export type SearchClientsQueryHookResult = ReturnType<typeof useSearchClientsQuery>;
export type SearchClientsLazyQueryHookResult = ReturnType<typeof useSearchClientsLazyQuery>;
export type SearchClientsSuspenseQueryHookResult = ReturnType<typeof useSearchClientsSuspenseQuery>;
export type SearchClientsQueryResult = Apollo.QueryResult<SearchClientsQuery, SearchClientsQueryVariables>;
export const SearchItemsDocument = gql`
    query SearchItems($filters: ItemFilters, $pagination: ItemPagination) {
  searchItems(filters: $filters, pagination: $pagination) {
    items {
      ItemID
      Code
      Description
      Price
    }
    total
  }
}
    `;

/**
 * __useSearchItemsQuery__
 *
 * To run a query within a React component, call `useSearchItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchItemsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useSearchItemsQuery(baseOptions?: Apollo.QueryHookOptions<SearchItemsQuery, SearchItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchItemsQuery, SearchItemsQueryVariables>(SearchItemsDocument, options);
      }
export function useSearchItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchItemsQuery, SearchItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchItemsQuery, SearchItemsQueryVariables>(SearchItemsDocument, options);
        }
export function useSearchItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchItemsQuery, SearchItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchItemsQuery, SearchItemsQueryVariables>(SearchItemsDocument, options);
        }
export type SearchItemsQueryHookResult = ReturnType<typeof useSearchItemsQuery>;
export type SearchItemsLazyQueryHookResult = ReturnType<typeof useSearchItemsLazyQuery>;
export type SearchItemsSuspenseQueryHookResult = ReturnType<typeof useSearchItemsSuspenseQuery>;
export type SearchItemsQueryResult = Apollo.QueryResult<SearchItemsQuery, SearchItemsQueryVariables>;
export const GetOrderMassiveDocument = gql`
    query getOrderMassive {
  allOrders {
    OrderID
    CompanyID
    BranchID
    Date_
    ClientID
    CarID
    IsService
    ServiceTypeID
    Mileage
    NextServiceMileage
    Notes
    SaleConditionID
    DiscountID
    Subtotal
    Total
    VAT
    UserID
    DocumentID
    PriceListID
    OrderStatusID
    WarehouseID
  }
  allClients {
    ClientID
    DocTypeID
    DocNumber
    FirstName
    LastName
    Phone
    Email
    Address
    City
    PostalCode
    IsActive
    CountryID
    ProvinceID
    PriceListID
    VendorID
  }
  allSaleconditions {
    SaleConditionID
    CreditCardID
    Name
    DueDate
    Surcharge
    IsActive
  }
  allUsers {
    UserID
    Nickname
    FullName
    IsActive
  }
  allVendors {
    VendorID
    VendorName
    Commission
    IsActive
  }
}
    `;

/**
 * __useGetOrderMassiveQuery__
 *
 * To run a query within a React component, call `useGetOrderMassiveQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderMassiveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderMassiveQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrderMassiveQuery(baseOptions?: Apollo.QueryHookOptions<GetOrderMassiveQuery, GetOrderMassiveQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderMassiveQuery, GetOrderMassiveQueryVariables>(GetOrderMassiveDocument, options);
      }
export function useGetOrderMassiveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderMassiveQuery, GetOrderMassiveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderMassiveQuery, GetOrderMassiveQueryVariables>(GetOrderMassiveDocument, options);
        }
export function useGetOrderMassiveSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrderMassiveQuery, GetOrderMassiveQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrderMassiveQuery, GetOrderMassiveQueryVariables>(GetOrderMassiveDocument, options);
        }
export type GetOrderMassiveQueryHookResult = ReturnType<typeof useGetOrderMassiveQuery>;
export type GetOrderMassiveLazyQueryHookResult = ReturnType<typeof useGetOrderMassiveLazyQuery>;
export type GetOrderMassiveSuspenseQueryHookResult = ReturnType<typeof useGetOrderMassiveSuspenseQuery>;
export type GetOrderMassiveQueryResult = Apollo.QueryResult<GetOrderMassiveQuery, GetOrderMassiveQueryVariables>;