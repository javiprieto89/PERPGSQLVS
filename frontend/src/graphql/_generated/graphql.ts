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
};

export type AccountBalancesInDb = {
  __typename?: 'AccountBalancesInDB';
  AccountID: Scalars['Int']['output'];
  Balance: Scalars['Float']['output'];
  ClientData?: Maybe<ClientsInDb>;
  ClientID?: Maybe<Scalars['Int']['output']>;
  SupplierData?: Maybe<SuppliersInDb>;
  SupplierID?: Maybe<Scalars['Int']['output']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type BranchesCreate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  BranchName: Scalars['String']['input'];
  CompanyID: Scalars['Int']['input'];
  Logo?: InputMaybe<Scalars['String']['input']>;
  Phone?: InputMaybe<Scalars['String']['input']>;
};

export type BranchesInDb = {
  __typename?: 'BranchesInDB';
  Address?: Maybe<Scalars['String']['output']>;
  BranchID: Scalars['Int']['output'];
  BranchName: Scalars['String']['output'];
  CompanyData?: Maybe<CompanyInDb>;
  CompanyID: Scalars['Int']['output'];
  Logo?: Maybe<Scalars['String']['output']>;
  Phone?: Maybe<Scalars['String']['output']>;
};

export type BranchesUpdate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  BranchName?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  Logo?: InputMaybe<Scalars['String']['input']>;
  Phone?: InputMaybe<Scalars['String']['input']>;
};

export type BrandsCreate = {
  BrandName: Scalars['String']['input'];
  CompanyID: Scalars['Int']['input'];
  IsActive?: Scalars['Boolean']['input'];
};

export type BrandsInDb = {
  __typename?: 'BrandsInDB';
  BrandID: Scalars['Int']['output'];
  BrandName: Scalars['String']['output'];
  CompanyData?: Maybe<CompanyInDb>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
  IsActive?: Maybe<Scalars['Boolean']['output']>;
};

export type BrandsUpdate = {
  BrandName?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CarBrandsCreate = {
  CarBrandName: Scalars['String']['input'];
  CompanyID: Scalars['Int']['input'];
};

export type CarBrandsInDb = {
  __typename?: 'CarBrandsInDB';
  CarBrandID: Scalars['Int']['output'];
  CarBrandName: Scalars['String']['output'];
  CompanyID: Scalars['Int']['output'];
};

export type CarBrandsUpdate = {
  CarBrandName?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
};

export type CarModelsCreate = {
  CarBrandID: Scalars['Int']['input'];
  CarModelName: Scalars['String']['input'];
  CompanyID: Scalars['Int']['input'];
};

export type CarModelsInDb = {
  __typename?: 'CarModelsInDB';
  CarBrandData?: Maybe<CarBrandsInDb>;
  CarBrandID: Scalars['Int']['output'];
  CarModelID: Scalars['Int']['output'];
  CarModelName: Scalars['String']['output'];
  CompanyData?: Maybe<CompanyInDb>;
  CompanyID: Scalars['Int']['output'];
};

export type CarModelsUpdate = {
  CarBrandID?: InputMaybe<Scalars['Int']['input']>;
  CarModelName?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
};

export type CarsCreate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CarBrandID?: InputMaybe<Scalars['Int']['input']>;
  CarModelID: Scalars['Int']['input'];
  ClientID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  DiscountID: Scalars['Int']['input'];
  IsDebtor?: InputMaybe<Scalars['Boolean']['input']>;
  LastServiceMileage?: InputMaybe<Scalars['Int']['input']>;
  LicensePlate: Scalars['String']['input'];
  Year?: InputMaybe<Scalars['Int']['input']>;
};

export type CarsInDb = {
  __typename?: 'CarsInDB';
  BranchID?: Maybe<Scalars['Int']['output']>;
  CarBrandData?: Maybe<CarBrandsInDb>;
  CarBrandID?: Maybe<Scalars['Int']['output']>;
  CarID: Scalars['Int']['output'];
  CarModelData?: Maybe<CarModelsInDb>;
  CarModelID: Scalars['Int']['output'];
  ClientData?: Maybe<ClientsInDb>;
  ClientID: Scalars['Int']['output'];
  CompanyData?: Maybe<CompanyInDb>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
  DiscountData?: Maybe<DiscountsInDb>;
  DiscountID: Scalars['Int']['output'];
  IsDebtor?: Maybe<Scalars['Boolean']['output']>;
  LastServiceMileage?: Maybe<Scalars['Int']['output']>;
  LicensePlate: Scalars['String']['output'];
  Year?: Maybe<Scalars['Int']['output']>;
};

export type CarsUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CarBrandID?: InputMaybe<Scalars['Int']['input']>;
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

export type ChecksCreate = {
  Amount: Scalars['Float']['input'];
  BankID?: InputMaybe<Scalars['Int']['input']>;
  CheckStatusID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID: Scalars['Int']['input'];
  CreatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  CurrencyID: Scalars['Int']['input'];
  DrawerName?: InputMaybe<Scalars['String']['input']>;
  DueDate?: InputMaybe<Scalars['Date']['input']>;
  HolderName?: InputMaybe<Scalars['String']['input']>;
  IssueDate: Scalars['Date']['input'];
  Number: Scalars['String']['input'];
  StatusAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ChecksInDb = {
  __typename?: 'ChecksInDB';
  Amount: Scalars['Float']['output'];
  BankID?: Maybe<Scalars['Int']['output']>;
  CheckID: Scalars['Int']['output'];
  CheckStatusID?: Maybe<Scalars['Int']['output']>;
  CompanyID: Scalars['Int']['output'];
  CreatedAt?: Maybe<Scalars['DateTime']['output']>;
  CurrencyID: Scalars['Int']['output'];
  DrawerName?: Maybe<Scalars['String']['output']>;
  DueDate?: Maybe<Scalars['Date']['output']>;
  HolderName?: Maybe<Scalars['String']['output']>;
  IssueDate: Scalars['Date']['output'];
  Number: Scalars['String']['output'];
  StatusAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChecksUpdate = {
  Amount?: InputMaybe<Scalars['Float']['input']>;
  BankID?: InputMaybe<Scalars['Int']['input']>;
  CheckStatusID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  CreatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  CurrencyID?: InputMaybe<Scalars['Int']['input']>;
  DrawerName?: InputMaybe<Scalars['String']['input']>;
  DueDate?: InputMaybe<Scalars['Date']['input']>;
  HolderName?: InputMaybe<Scalars['String']['input']>;
  IssueDate?: InputMaybe<Scalars['Date']['input']>;
  Number?: InputMaybe<Scalars['String']['input']>;
  StatusAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ClientsCreate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  City?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  CountryID?: InputMaybe<Scalars['Int']['input']>;
  DocNumber?: InputMaybe<Scalars['String']['input']>;
  DocTypeID: Scalars['Int']['input'];
  Email?: InputMaybe<Scalars['String']['input']>;
  FirstName: Scalars['String']['input'];
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  LastName?: InputMaybe<Scalars['String']['input']>;
  Phone?: InputMaybe<Scalars['String']['input']>;
  PostalCode?: InputMaybe<Scalars['String']['input']>;
  PriceListID?: InputMaybe<Scalars['Int']['input']>;
  ProvinceID?: InputMaybe<Scalars['Int']['input']>;
  VendorID?: InputMaybe<Scalars['Int']['input']>;
};

export type ClientsInDb = {
  __typename?: 'ClientsInDB';
  Address?: Maybe<Scalars['String']['output']>;
  BranchData?: Maybe<BranchesInDb>;
  BranchID?: Maybe<Scalars['Int']['output']>;
  City?: Maybe<Scalars['String']['output']>;
  ClientID: Scalars['Int']['output'];
  CompanyData?: Maybe<CompanyInDb>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
  CountryData?: Maybe<CountriesInDb>;
  CountryID: Scalars['Int']['output'];
  CountryName?: Maybe<Scalars['String']['output']>;
  DocNumber?: Maybe<Scalars['String']['output']>;
  DocTypeID: Scalars['Int']['output'];
  DocTypeName?: Maybe<Scalars['String']['output']>;
  Email?: Maybe<Scalars['String']['output']>;
  FirstName: Scalars['String']['output'];
  IsActive?: Maybe<Scalars['Boolean']['output']>;
  LastName?: Maybe<Scalars['String']['output']>;
  Phone?: Maybe<Scalars['String']['output']>;
  PostalCode?: Maybe<Scalars['String']['output']>;
  PriceListID: Scalars['Int']['output'];
  PriceListName?: Maybe<Scalars['String']['output']>;
  ProvinceData?: Maybe<ProvincesInDb>;
  ProvinceID: Scalars['Int']['output'];
  ProvinceName?: Maybe<Scalars['String']['output']>;
  VendorData?: Maybe<VendorsInDb>;
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

export type CommercialDocumentsCreate = {
  AffectsStock: Scalars['Boolean']['input'];
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  CurrencyID?: InputMaybe<Scalars['Int']['input']>;
  DocumentDescription: Scalars['String']['input'];
  DocumentNumber: Scalars['Int']['input'];
  DocumentTypeID: Scalars['Int']['input'];
  FromDate?: InputMaybe<Scalars['String']['input']>;
  IsActive: Scalars['Boolean']['input'];
  IsElectronic?: InputMaybe<Scalars['Boolean']['input']>;
  IsFiscal?: InputMaybe<Scalars['Boolean']['input']>;
  IsManual?: InputMaybe<Scalars['Boolean']['input']>;
  IsQuotation?: InputMaybe<Scalars['Boolean']['input']>;
  IsTest: Scalars['Boolean']['input'];
  MaxItems?: InputMaybe<Scalars['Int']['input']>;
  PointOfSale: Scalars['Int']['input'];
  ShouldAccount: Scalars['Boolean']['input'];
};

export type CommercialDocumentsInDb = {
  __typename?: 'CommercialDocumentsInDB';
  AffectsStock: Scalars['Boolean']['output'];
  BranchID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  CurrencyID?: Maybe<Scalars['Int']['output']>;
  DocumentDescription: Scalars['String']['output'];
  DocumentID: Scalars['Int']['output'];
  DocumentNumber: Scalars['Int']['output'];
  DocumentTypeID: Scalars['Int']['output'];
  FromDate?: Maybe<Scalars['String']['output']>;
  IsActive: Scalars['Boolean']['output'];
  IsElectronic?: Maybe<Scalars['Boolean']['output']>;
  IsFiscal?: Maybe<Scalars['Boolean']['output']>;
  IsManual?: Maybe<Scalars['Boolean']['output']>;
  IsQuotation?: Maybe<Scalars['Boolean']['output']>;
  IsTest: Scalars['Boolean']['output'];
  MaxItems?: Maybe<Scalars['Int']['output']>;
  PointOfSale: Scalars['Int']['output'];
  ShouldAccount: Scalars['Boolean']['output'];
};

export type CommercialDocumentsUpdate = {
  AffectsStock?: InputMaybe<Scalars['Boolean']['input']>;
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  CurrencyID?: InputMaybe<Scalars['Int']['input']>;
  DocumentDescription?: InputMaybe<Scalars['String']['input']>;
  DocumentNumber?: InputMaybe<Scalars['Int']['input']>;
  DocumentTypeID?: InputMaybe<Scalars['Int']['input']>;
  FromDate?: InputMaybe<Scalars['String']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  IsElectronic?: InputMaybe<Scalars['Boolean']['input']>;
  IsFiscal?: InputMaybe<Scalars['Boolean']['input']>;
  IsManual?: InputMaybe<Scalars['Boolean']['input']>;
  IsQuotation?: InputMaybe<Scalars['Boolean']['input']>;
  IsTest?: InputMaybe<Scalars['Boolean']['input']>;
  MaxItems?: InputMaybe<Scalars['Int']['input']>;
  PointOfSale?: InputMaybe<Scalars['Int']['input']>;
  ShouldAccount?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CompanyCreate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  CUIT?: InputMaybe<Scalars['String']['input']>;
  CompanyName?: InputMaybe<Scalars['String']['input']>;
  Grossincome?: InputMaybe<Scalars['String']['input']>;
  Logo?: InputMaybe<Scalars['String']['input']>;
  Startdate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CompanyInDb = {
  __typename?: 'CompanyInDB';
  Address?: Maybe<Scalars['String']['output']>;
  CUIT?: Maybe<Scalars['String']['output']>;
  CompanyID: Scalars['Int']['output'];
  CompanyName?: Maybe<Scalars['String']['output']>;
  Grossincome?: Maybe<Scalars['String']['output']>;
  Logo?: Maybe<Scalars['String']['output']>;
  Startdate?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanyUpdate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  CUIT?: InputMaybe<Scalars['String']['input']>;
  CompanyName?: InputMaybe<Scalars['String']['input']>;
  Grossincome?: InputMaybe<Scalars['String']['input']>;
  Logo?: InputMaybe<Scalars['String']['input']>;
  Startdate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CountriesInDb = {
  __typename?: 'CountriesInDB';
  CountryID: Scalars['Int']['output'];
  CountryName: Scalars['String']['output'];
};

export type CreditCardGroupsCreate = {
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  CreditCardGroupName?: InputMaybe<Scalars['String']['input']>;
};

export type CreditCardGroupsInDb = {
  __typename?: 'CreditCardGroupsInDB';
  CompanyID?: Maybe<Scalars['Int']['output']>;
  CreditCardGroupID: Scalars['Int']['output'];
  GroupName?: Maybe<Scalars['String']['output']>;
};

export type CreditCardGroupsUpdate = {
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  CreditCardGroupName?: InputMaybe<Scalars['String']['input']>;
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
  CreditCardGroupData?: Maybe<CreditCardGroupsInDb>;
  CreditCardGroupID: Scalars['Int']['output'];
  CreditCardID: Scalars['Int']['output'];
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
  CompanyID: Scalars['Int']['input'];
  DiscountName: Scalars['String']['input'];
  Percentage: Scalars['Float']['input'];
};

export type DiscountsInDb = {
  __typename?: 'DiscountsInDB';
  CompanyData?: Maybe<CompanyInDb>;
  CompanyID: Scalars['Int']['output'];
  DiscountID: Scalars['Int']['output'];
  DiscountName: Scalars['String']['output'];
  Percentage: Scalars['Float']['output'];
};

export type DiscountsUpdate = {
  CompanyID: Scalars['Int']['input'];
  DiscountName: Scalars['String']['input'];
  Percentage: Scalars['Float']['input'];
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
  CompanyID: Scalars['Int']['input'];
};

export type ItemCategoriesInDb = {
  __typename?: 'ItemCategoriesInDB';
  CategoryName: Scalars['String']['output'];
  CompanyID: Scalars['Int']['output'];
  ItemCategoryID: Scalars['Int']['output'];
};

export type ItemCategoriesUpdate = {
  CategoryName?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemFilters = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  brandID?: InputMaybe<Scalars['Int']['input']>;
  categoryID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  controlStock?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isOffer?: InputMaybe<Scalars['Boolean']['input']>;
  itemCode?: InputMaybe<Scalars['String']['input']>;
  itemDescription?: InputMaybe<Scalars['String']['input']>;
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

export type ItemPriceHistoriesCreate = {
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  CurrencyID: Scalars['Int']['input'];
  EffectiveDate: Scalars['DateTime']['input'];
  ItemID: Scalars['Int']['input'];
  Price: Scalars['Float']['input'];
  PriceListID: Scalars['Int']['input'];
  UserID: Scalars['Int']['input'];
};

export type ItemPriceHistoriesInDb = {
  __typename?: 'ItemPriceHistoriesInDB';
  BranchID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  CurrencyID: Scalars['Int']['output'];
  EffectiveDate: Scalars['DateTime']['output'];
  ItemID: Scalars['Int']['output'];
  Price: Scalars['Float']['output'];
  PriceHistoryID: Scalars['Int']['output'];
  PriceListID: Scalars['Int']['output'];
  UserID: Scalars['Int']['output'];
};

export type ItemPriceHistoriesUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  CurrencyID?: InputMaybe<Scalars['Int']['input']>;
  EffectiveDate?: InputMaybe<Scalars['DateTime']['input']>;
  ItemID?: InputMaybe<Scalars['Int']['input']>;
  Price?: InputMaybe<Scalars['Float']['input']>;
  PriceHistoryID: Scalars['Int']['input'];
  PriceListID?: InputMaybe<Scalars['Int']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemSearchResult = {
  __typename?: 'ItemSearchResult';
  Brand?: Maybe<BrandsInDb>;
  Category?: Maybe<ItemCategoriesInDb>;
  ItemCode: Scalars['String']['output'];
  ItemDescription: Scalars['String']['output'];
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

export type ItemStocksInDb = {
  __typename?: 'ItemStocksInDB';
  BatchNumber?: Maybe<Scalars['String']['output']>;
  BranchID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  ExpiryDate?: Maybe<Scalars['String']['output']>;
  ItemID: Scalars['Int']['output'];
  MaxStockLevel?: Maybe<Scalars['Int']['output']>;
  MinStockLevel?: Maybe<Scalars['Int']['output']>;
  Quantity: Scalars['Int']['output'];
  ReservedQuantity?: Maybe<Scalars['Int']['output']>;
  StockLocation?: Maybe<Scalars['String']['output']>;
  StockStatus?: Maybe<Scalars['String']['output']>;
  SupplierID?: Maybe<Scalars['Int']['output']>;
  WarehouseID: Scalars['Int']['output'];
};

export type ItemSubcategoriesCreate = {
  CompanyID: Scalars['Int']['input'];
  ItemCategoryID: Scalars['Int']['input'];
  SubcategoryName: Scalars['String']['input'];
};

export type ItemSubcategoriesInDb = {
  __typename?: 'ItemSubcategoriesInDB';
  CategoryData?: Maybe<ItemCategoriesInDb>;
  CompanyID: Scalars['Int']['output'];
  ItemCategoryID: Scalars['Int']['output'];
  ItemSubcategoryID: Scalars['Int']['output'];
  SubcategoryName: Scalars['String']['output'];
};

export type ItemSubcategoriesUpdate = {
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  ItemCategoryID?: InputMaybe<Scalars['Int']['input']>;
  SubcategoryName?: InputMaybe<Scalars['String']['input']>;
};

export type ItemsCreate = {
  BranchID: Scalars['Int']['input'];
  BrandID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  ControlStock: Scalars['Boolean']['input'];
  IsActive: Scalars['Boolean']['input'];
  IsOffer: Scalars['Boolean']['input'];
  ItemCategoryID: Scalars['Int']['input'];
  ItemCode: Scalars['String']['input'];
  ItemDescription: Scalars['String']['input'];
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
  CompanyData?: Maybe<CompanyInDb>;
  CompanyID: Scalars['Int']['output'];
  ControlStock: Scalars['Boolean']['output'];
  IsActive: Scalars['Boolean']['output'];
  IsOffer: Scalars['Boolean']['output'];
  ItemCategoryID: Scalars['Int']['output'];
  ItemCode: Scalars['String']['output'];
  ItemDescription: Scalars['String']['output'];
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
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  ControlStock?: InputMaybe<Scalars['Boolean']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  IsOffer?: InputMaybe<Scalars['Boolean']['input']>;
  ItemCategoryID?: InputMaybe<Scalars['Int']['input']>;
  ItemCode?: InputMaybe<Scalars['String']['input']>;
  ItemDescription?: InputMaybe<Scalars['String']['input']>;
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
  refreshExpiresAt?: Maybe<Scalars['DateTime']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  sessionId?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserInfo>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bulkActivateItems: Scalars['Boolean']['output'];
  bulkDeactivateItems: Scalars['Boolean']['output'];
  cancelOrderEditing: Scalars['Boolean']['output'];
  changePassword: AuthResponse;
  createBranch: BranchesInDb;
  createBrand: BrandsInDb;
  createCar: CarsInDb;
  createCarbrand: CarBrandsInDb;
  createCarmodel: CarModelsInDb;
  createCashbox: CashBoxesInDb;
  createCashboxmovement: CashBoxMovementsInDb;
  createCheck: ChecksInDb;
  createClient: ClientsInDb;
  createCompany: CompanyInDb;
  createCreditcard: CreditCardsInDb;
  createCreditcardgroup: CreditCardGroupsInDb;
  createDiscount: DiscountsInDb;
  createDocument: CommercialDocumentsInDb;
  createItem: ItemsInDb;
  createItemcategory: ItemCategoriesInDb;
  createItempricehistory: ItemPriceHistoriesInDb;
  createItemsubcategory: ItemSubcategoriesInDb;
  createOrder: OrderResponse;
  createPricelist: PriceListsInDb;
  createPricelistitem: PriceListItemsInDb;
  createRma: RmaInDb;
  createRmaDetail: RmaDetailInDb;
  createRole: RolesInDb;
  createSalecondition: SaleConditionsInDb;
  createServicetype: ServiceTypeInDb;
  createStockhistories: StockHistoriesInDb;
  createStockhistorydetail: StockHistoryDetailsInDb;
  createSupplier: SuppliersInDb;
  createUser: AuthResponse;
  createUserRecord: UsersInDb;
  createUserpermissions: UserPermissionsInDb;
  createVendor: VendorsInDb;
  createWarehouse: WarehousesInDb;
  deleteBranch: Scalars['Boolean']['output'];
  deleteBrand: Scalars['Boolean']['output'];
  deleteCar: Scalars['Boolean']['output'];
  deleteCarbrand: Scalars['Boolean']['output'];
  deleteCarmodel: Scalars['Boolean']['output'];
  deleteCashbox: Scalars['Boolean']['output'];
  deleteCashboxmovement: Scalars['Boolean']['output'];
  deleteCheck: Scalars['Boolean']['output'];
  deleteClient: DeleteResponse;
  deleteCompany: Scalars['Boolean']['output'];
  deleteCreditcard: Scalars['Boolean']['output'];
  deleteCreditcardgroup: Scalars['Boolean']['output'];
  deleteDiscount: Scalars['Boolean']['output'];
  deleteDocument: DeleteResponse;
  deleteItem: Scalars['Boolean']['output'];
  deleteItemcategory: Scalars['Boolean']['output'];
  deleteItempricehistory: Scalars['Boolean']['output'];
  deleteItemsubcategory: Scalars['Boolean']['output'];
  deleteOrder: Scalars['Boolean']['output'];
  deletePricelist: Scalars['Boolean']['output'];
  deletePricelistitem: Scalars['Boolean']['output'];
  deleteRma: Scalars['Boolean']['output'];
  deleteRmaDetail: Scalars['Boolean']['output'];
  deleteRole: Scalars['Boolean']['output'];
  deleteSalecondition: DeleteResponse;
  deleteServicetype: DeleteResponse;
  deleteStockhistories: Scalars['Boolean']['output'];
  deleteStockhistorydetail: Scalars['Boolean']['output'];
  deleteSupplier: Scalars['Boolean']['output'];
  deleteUserRecord: Scalars['Boolean']['output'];
  deleteUserpermissions: Scalars['Boolean']['output'];
  deleteVendor: Scalars['Boolean']['output'];
  deleteWarehouse: Scalars['Boolean']['output'];
  finalizeOrder?: Maybe<OrderResponse>;
  login: LoginResponse;
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
  updateCheck?: Maybe<ChecksInDb>;
  updateClient?: Maybe<ClientsInDb>;
  updateCompany?: Maybe<CompanyInDb>;
  updateCreditcard?: Maybe<CreditCardsInDb>;
  updateCreditcardgroup?: Maybe<CreditCardGroupsInDb>;
  updateDiscount?: Maybe<DiscountsInDb>;
  updateDocument?: Maybe<CommercialDocumentsInDb>;
  updateItem?: Maybe<ItemsInDb>;
  updateItemcategory?: Maybe<ItemCategoriesInDb>;
  updateItempricehistory?: Maybe<ItemPriceHistoriesInDb>;
  updateItemsubcategory?: Maybe<ItemSubcategoriesInDb>;
  updateOrder?: Maybe<OrderResponse>;
  updatePricelist?: Maybe<PriceListsInDb>;
  updatePricelistitem?: Maybe<PriceListItemsInDb>;
  updateRma?: Maybe<RmaInDb>;
  updateRmaDetail?: Maybe<RmaDetailInDb>;
  updateRole?: Maybe<RolesInDb>;
  updateSalecondition?: Maybe<SaleConditionsInDb>;
  updateServicetype?: Maybe<ServiceTypeInDb>;
  updateStockhistories?: Maybe<StockHistoriesInDb>;
  updateStockhistorydetail?: Maybe<StockHistoryDetailsInDb>;
  updateSupplier?: Maybe<SuppliersInDb>;
  updateUserRecord?: Maybe<UsersInDb>;
  updateUserpermissions: UserPermissionsInDb;
  updateVendor?: Maybe<VendorsInDb>;
  updateWarehouse?: Maybe<WarehousesInDb>;
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


export type MutationCreateCheckArgs = {
  data: ChecksCreate;
};


export type MutationCreateClientArgs = {
  data: ClientsCreate;
};


export type MutationCreateCompanyArgs = {
  data: CompanyCreate;
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
  data: CommercialDocumentsCreate;
};


export type MutationCreateItemArgs = {
  data: ItemsCreate;
};


export type MutationCreateItemcategoryArgs = {
  data: ItemCategoriesCreate;
};


export type MutationCreateItempricehistoryArgs = {
  data: ItemPriceHistoriesCreate;
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


export type MutationCreateRmaArgs = {
  data: RmaCreate;
};


export type MutationCreateRmaDetailArgs = {
  data: RmaDetailCreate;
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


export type MutationCreateStockhistoriesArgs = {
  data: StockHistoriesCreate;
};


export type MutationCreateStockhistorydetailArgs = {
  data: StockHistoryDetailsCreate;
};


export type MutationCreateSupplierArgs = {
  data: SuppliersCreate;
};


export type MutationCreateUserArgs = {
  input: UserCreateInput;
};


export type MutationCreateUserRecordArgs = {
  data: UserCreate;
};


export type MutationCreateUserpermissionsArgs = {
  data: UserPermissionsCreate;
};


export type MutationCreateVendorArgs = {
  data: VendorsCreate;
};


export type MutationCreateWarehouseArgs = {
  data: WarehousesCreate;
};


export type MutationDeleteBranchArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteBrandArgs = {
  brandID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteCarArgs = {
  carID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteCarbrandArgs = {
  carBrandID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteCarmodelArgs = {
  carBrandID: Scalars['Int']['input'];
  carModelID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteCashboxArgs = {
  cashBoxID: Scalars['Int']['input'];
};


export type MutationDeleteCashboxmovementArgs = {
  movementID: Scalars['Int']['input'];
};


export type MutationDeleteCheckArgs = {
  checkID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteClientArgs = {
  clientID: Scalars['Int']['input'];
};


export type MutationDeleteCompanyArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
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
  companyID?: InputMaybe<Scalars['Int']['input']>;
  itemID: Scalars['Int']['input'];
};


export type MutationDeleteItemcategoryArgs = {
  categoryID: Scalars['Int']['input'];
};


export type MutationDeleteItempricehistoryArgs = {
  priceHistoryID: Scalars['Int']['input'];
};


export type MutationDeleteItemsubcategoryArgs = {
  subcategoryID: Scalars['Int']['input'];
};


export type MutationDeleteOrderArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  orderID: Scalars['Int']['input'];
};


export type MutationDeletePricelistArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
  pricelistID: Scalars['Int']['input'];
};


export type MutationDeletePricelistitemArgs = {
  itemID: Scalars['Int']['input'];
  pricelistID: Scalars['Int']['input'];
};


export type MutationDeleteRmaArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  rmaID: Scalars['Int']['input'];
};


export type MutationDeleteRmaDetailArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  rmaDetailID: Scalars['Int']['input'];
  rmaID: Scalars['Int']['input'];
};


export type MutationDeleteRoleArgs = {
  roleID?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteSaleconditionArgs = {
  saleConditionID: Scalars['Int']['input'];
};


export type MutationDeleteServicetypeArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
  serviceTypeID: Scalars['Int']['input'];
};


export type MutationDeleteStockhistoriesArgs = {
  historyID: Scalars['Int']['input'];
};


export type MutationDeleteStockhistorydetailArgs = {
  historyID: Scalars['Int']['input'];
};


export type MutationDeleteSupplierArgs = {
  supplierID: Scalars['Int']['input'];
};


export type MutationDeleteUserRecordArgs = {
  userID: Scalars['Int']['input'];
};


export type MutationDeleteUserpermissionsArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  roleID?: InputMaybe<Scalars['Int']['input']>;
  userID: Scalars['Int']['input'];
};


export type MutationDeleteVendorArgs = {
  vendorID: Scalars['Int']['input'];
};


export type MutationDeleteWarehouseArgs = {
  warehouseID: Scalars['Int']['input'];
};


export type MutationFinalizeOrderArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  orderID: Scalars['Int']['input'];
  sessionID: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSaveOrderDraftArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
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
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: BranchesUpdate;
};


export type MutationUpdateBrandArgs = {
  brandID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: BrandsUpdate;
};


export type MutationUpdateCarArgs = {
  carID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: CarsUpdate;
};


export type MutationUpdateCarbrandArgs = {
  carBrandID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: CarBrandsUpdate;
};


export type MutationUpdateCarmodelArgs = {
  carBrandID: Scalars['Int']['input'];
  carModelID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
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


export type MutationUpdateCheckArgs = {
  checkID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: ChecksUpdate;
};


export type MutationUpdateClientArgs = {
  clientID: Scalars['Int']['input'];
  data: ClientsUpdate;
};


export type MutationUpdateCompanyArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: CompanyUpdate;
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
  data: CommercialDocumentsUpdate;
  documentID: Scalars['Int']['input'];
};


export type MutationUpdateItemArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: ItemsUpdate;
  itemID: Scalars['Int']['input'];
};


export type MutationUpdateItemcategoryArgs = {
  categoryID: Scalars['Int']['input'];
  data: ItemCategoriesUpdate;
};


export type MutationUpdateItempricehistoryArgs = {
  data: ItemPriceHistoriesUpdate;
  priceHistoryID: Scalars['Int']['input'];
};


export type MutationUpdateItemsubcategoryArgs = {
  data: ItemSubcategoriesUpdate;
  subcategoryID: Scalars['Int']['input'];
};


export type MutationUpdateOrderArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: OrdersUpdate;
  orderID: Scalars['Int']['input'];
};


export type MutationUpdatePricelistArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: PriceListsUpdate;
  pricelistID: Scalars['Int']['input'];
};


export type MutationUpdatePricelistitemArgs = {
  data: PriceListItemsUpdate;
  itemID: Scalars['Int']['input'];
  pricelistID: Scalars['Int']['input'];
};


export type MutationUpdateRmaArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: RmaUpdate;
  rmaID: Scalars['Int']['input'];
};


export type MutationUpdateRmaDetailArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: RmaDetailUpdate;
  rmaDetailID: Scalars['Int']['input'];
  rmaID: Scalars['Int']['input'];
};


export type MutationUpdateRoleArgs = {
  data: RolesUpdate;
  roleID?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateSaleconditionArgs = {
  data: SaleConditionsUpdate;
  saleConditionID: Scalars['Int']['input'];
};


export type MutationUpdateServicetypeArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
  data: ServiceTypeUpdate;
  serviceTypeID: Scalars['Int']['input'];
};


export type MutationUpdateStockhistoriesArgs = {
  data: StockHistoriesUpdate;
  historyID: Scalars['Int']['input'];
};


export type MutationUpdateStockhistorydetailArgs = {
  data: StockHistoryDetailsUpdate;
  historyID: Scalars['Int']['input'];
};


export type MutationUpdateSupplierArgs = {
  data: SuppliersUpdate;
  supplierID: Scalars['Int']['input'];
};


export type MutationUpdateUserRecordArgs = {
  data: UserUpdate;
  userID: Scalars['Int']['input'];
};


export type MutationUpdateUserpermissionsArgs = {
  newData: UserPermissionsCreate;
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
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  ItemID: Scalars['Int']['input'];
  LastModified?: InputMaybe<Scalars['DateTime']['input']>;
  LineDescription?: InputMaybe<Scalars['String']['input']>;
  OrderID?: InputMaybe<Scalars['Int']['input']>;
  Quantity: Scalars['Int']['input'];
  UnitPrice: Scalars['Float']['input'];
  WarehouseID: Scalars['Int']['input'];
};

export type OrderDetailsInDb = {
  __typename?: 'OrderDetailsInDB';
  BranchID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  ItemData?: Maybe<ItemsInDb>;
  ItemID: Scalars['Int']['output'];
  LastModified?: Maybe<Scalars['DateTime']['output']>;
  LineDescription?: Maybe<Scalars['String']['output']>;
  OrderDetailID: Scalars['Int']['output'];
  OrderID: Scalars['Int']['output'];
  Quantity: Scalars['Int']['output'];
  UnitPrice: Scalars['Float']['output'];
  WarehouseData?: Maybe<WarehousesInDb>;
  WarehouseID: Scalars['Int']['output'];
};

export type OrderDetailsUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  ItemID?: InputMaybe<Scalars['Int']['input']>;
  LastModified?: InputMaybe<Scalars['DateTime']['input']>;
  LineDescription?: InputMaybe<Scalars['String']['input']>;
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
  DiscountAmount?: Scalars['Float']['input'];
  DiscountID?: InputMaybe<Scalars['Int']['input']>;
  DocumentID?: InputMaybe<Scalars['Int']['input']>;
  IsService?: InputMaybe<Scalars['Boolean']['input']>;
  Items: Array<OrderDetailsCreate>;
  Mileage?: InputMaybe<Scalars['Int']['input']>;
  NextServiceMileage?: InputMaybe<Scalars['Int']['input']>;
  Notes?: InputMaybe<Scalars['String']['input']>;
  OrderDate?: InputMaybe<Scalars['DateTime']['input']>;
  OrderStatusID?: InputMaybe<Scalars['Int']['input']>;
  PriceListID?: InputMaybe<Scalars['Int']['input']>;
  SaleConditionID?: InputMaybe<Scalars['Int']['input']>;
  ServiceTypeID?: InputMaybe<Scalars['Int']['input']>;
  Subtotal: Scalars['Float']['input'];
  Total: Scalars['Float']['input'];
  TotalTaxAmount?: Scalars['Float']['input'];
  UserID?: InputMaybe<Scalars['Int']['input']>;
  VendorID?: InputMaybe<Scalars['Int']['input']>;
  WarehouseID?: InputMaybe<Scalars['Int']['input']>;
};

export type OrdersInDb = {
  __typename?: 'OrdersInDB';
  BranchData?: Maybe<BranchesInDb>;
  BranchID: Scalars['Int']['output'];
  CarData?: Maybe<CarsInDb>;
  CarID?: Maybe<Scalars['Int']['output']>;
  ClientData?: Maybe<ClientsInDb>;
  ClientID: Scalars['Int']['output'];
  CompanyData?: Maybe<CompanyInDb>;
  CompanyID: Scalars['Int']['output'];
  DiscountAmount: Scalars['Float']['output'];
  DiscountData?: Maybe<DiscountsInDb>;
  DiscountID?: Maybe<Scalars['Int']['output']>;
  DocumentID?: Maybe<Scalars['Int']['output']>;
  IsService?: Maybe<Scalars['Boolean']['output']>;
  Items?: Maybe<Array<OrderDetailsInDb>>;
  Mileage?: Maybe<Scalars['Int']['output']>;
  NextServiceMileage?: Maybe<Scalars['Int']['output']>;
  Notes?: Maybe<Scalars['String']['output']>;
  OrderDate: Scalars['DateTime']['output'];
  OrderID: Scalars['Int']['output'];
  OrderStatusID?: Maybe<Scalars['Int']['output']>;
  PriceListData?: Maybe<PriceListsInDb>;
  PriceListID?: Maybe<Scalars['Int']['output']>;
  SaleConditionData?: Maybe<SaleConditionsInDb>;
  SaleConditionID?: Maybe<Scalars['Int']['output']>;
  ServiceTypeData?: Maybe<ServiceTypeInDb>;
  ServiceTypeID?: Maybe<Scalars['Int']['output']>;
  Subtotal: Scalars['Float']['output'];
  Total: Scalars['Float']['output'];
  TotalTaxAmount: Scalars['Float']['output'];
  UserData?: Maybe<UsersInDb>;
  UserID?: Maybe<Scalars['Int']['output']>;
  VendorData?: Maybe<VendorsInDb>;
  VendorID?: Maybe<Scalars['Int']['output']>;
  WarehouseData?: Maybe<WarehousesInDb>;
  WarehouseID?: Maybe<Scalars['Int']['output']>;
};

export type OrdersUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CarID?: InputMaybe<Scalars['Int']['input']>;
  ClientID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  DiscountAmount?: InputMaybe<Scalars['Float']['input']>;
  DiscountID?: InputMaybe<Scalars['Int']['input']>;
  DocumentID?: InputMaybe<Scalars['Int']['input']>;
  IsService?: InputMaybe<Scalars['Boolean']['input']>;
  Items?: InputMaybe<Array<OrderDetailsUpdate>>;
  Mileage?: InputMaybe<Scalars['Int']['input']>;
  NextServiceMileage?: InputMaybe<Scalars['Int']['input']>;
  Notes?: InputMaybe<Scalars['String']['input']>;
  OrderDate?: InputMaybe<Scalars['DateTime']['input']>;
  OrderStatusID?: InputMaybe<Scalars['Int']['input']>;
  PriceListID?: InputMaybe<Scalars['Int']['input']>;
  SaleConditionID?: InputMaybe<Scalars['Int']['input']>;
  ServiceTypeID?: InputMaybe<Scalars['Int']['input']>;
  Subtotal?: InputMaybe<Scalars['Float']['input']>;
  Total?: InputMaybe<Scalars['Float']['input']>;
  TotalTaxAmount?: InputMaybe<Scalars['Float']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
  VendorID?: InputMaybe<Scalars['Int']['input']>;
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
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  PriceListDescription?: InputMaybe<Scalars['String']['input']>;
  PriceListName: Scalars['String']['input'];
};

export type PriceListsInDb = {
  __typename?: 'PriceListsInDB';
  CompanyID: Scalars['Int']['output'];
  CreatedDate?: Maybe<Scalars['DateTime']['output']>;
  IsActive?: Maybe<Scalars['Boolean']['output']>;
  PriceListDescription?: Maybe<Scalars['String']['output']>;
  PriceListID: Scalars['Int']['output'];
  PriceListName: Scalars['String']['output'];
};

export type PriceListsUpdate = {
  CreatedDate?: InputMaybe<Scalars['DateTime']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  PriceListDescription?: InputMaybe<Scalars['String']['input']>;
  PriceListName?: InputMaybe<Scalars['String']['input']>;
};

export type ProvincesInDb = {
  __typename?: 'ProvincesInDB';
  CountryID: Scalars['Int']['output'];
  ProvinceID: Scalars['Int']['output'];
  ProvinceName: Scalars['String']['output'];
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
  allChecks: Array<ChecksInDb>;
  allClients: Array<ClientsInDb>;
  allCommercialdocuments: Array<CommercialDocumentsInDb>;
  allCompany: Array<CompanyInDb>;
  allCountries: Array<CountriesInDb>;
  allCreditcardgroups: Array<CreditCardGroupsInDb>;
  allCreditcards: Array<CreditCardsInDb>;
  allDiscounts: Array<DiscountsInDb>;
  allItemcategories: Array<ItemCategoriesInDb>;
  allItempricehistory: Array<ItemPriceHistoriesInDb>;
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
  allRmaDetails: Array<RmaDetailInDb>;
  allRmas: Array<RmaInDb>;
  allRoles: Array<RolesInDb>;
  allSaleconditions: Array<SaleConditionsInDb>;
  allServicetypes: Array<ServiceTypeInDb>;
  allStockhistories: Array<StockHistoriesInDb>;
  allStockhistorydetails: Array<StockHistoryDetailsInDb>;
  allSuppliers: Array<SuppliersInDb>;
  allTransactions: Array<TransactionsInDb>;
  allUserpermissions: Array<UserPermissionsInDb>;
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
  checkById?: Maybe<ChecksInDb>;
  checksByCompany: Array<ChecksInDb>;
  clientsByBranch: Array<ClientsInDb>;
  clientsByCompany: Array<ClientsInDb>;
  clientsById?: Maybe<ClientsInDb>;
  commercialdocumentsById?: Maybe<CommercialDocumentsInDb>;
  companyById?: Maybe<CompanyInDb>;
  countriesById?: Maybe<CountriesInDb>;
  creditcardById?: Maybe<CreditCardsInDb>;
  creditcardgroupById?: Maybe<CreditCardGroupsInDb>;
  creditcardgroupsByName: Array<CreditCardGroupsInDb>;
  creditcardsByName: Array<CreditCardsInDb>;
  currentUser?: Maybe<UserInfo>;
  dashboardStats: DashboardStats;
  discountsById?: Maybe<DiscountsInDb>;
  filterFields: Array<FilterField>;
  getAlternativeTestData: Scalars['String']['output'];
  getLowStockItems: Array<ItemSearchResult>;
  getTestVoucherData: Scalars['String']['output'];
  healthCheck: Scalars['String']['output'];
  informacionComprobante: VoucherInfo;
  informacionRapidaComprobante: VoucherBasicInfo;
  itemcategoriesById?: Maybe<ItemCategoriesInDb>;
  itempricehistoryById?: Maybe<ItemPriceHistoriesInDb>;
  itemsById?: Maybe<ItemsInDb>;
  itemstockById?: Maybe<ItemStockInDb>;
  itemstocks: Array<ItemStocksInDb>;
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
  rmaById?: Maybe<RmaInDb>;
  rmaDetailById?: Maybe<RmaDetailInDb>;
  rolesById?: Maybe<RolesInDb>;
  saleconditionsById?: Maybe<SaleConditionsInDb>;
  searchGlobal: GlobalSearchResult;
  searchItems: ItemsResponse;
  serverInfo: ServerInfo;
  servicetypesById?: Maybe<ServiceTypeInDb>;
  stockhistoryById?: Maybe<StockHistoriesInDb>;
  stockhistorydetailById?: Maybe<StockHistoryDetailsInDb>;
  suppliersByCompany: Array<SuppliersInDb>;
  suppliersById?: Maybe<SuppliersInDb>;
  sysFiscalDocType?: Maybe<SysFiscalDocTypesInDb>;
  sysFiscalDocTypes: Array<SysFiscalDocTypesInDb>;
  sysIdentityDocType?: Maybe<SysIdentityDocTypesInDb>;
  sysIdentityDocTypes: Array<SysIdentityDocTypesInDb>;
  testAfipConnection: TestConnectionResult;
  transactionsById?: Maybe<TransactionsInDb>;
  ultimoComprobante: Scalars['Int']['output'];
  userpermissionsById?: Maybe<UserPermissionsInDb>;
  usersById?: Maybe<UsersInDb>;
  vendorsById?: Maybe<VendorsInDb>;
  verifyToken?: Maybe<UserInfo>;
  warehousesById?: Maybe<WarehousesInDb>;
};


export type QueryAccountbalancesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAllRmaDetailsArgs = {
  filter?: InputMaybe<RmaDetailFilter>;
};


export type QueryAllRmasArgs = {
  filter?: InputMaybe<RmaFilter>;
};


export type QueryBranchesByCompanyArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBranchesByIdArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};


export type QueryBrandsByCompanyArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBrandsByIdArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};


export type QueryCarbrandsByCompanyArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCarbrandsByIdArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};


export type QueryCarmodelsByBrandArgs = {
  carBrandID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCarmodelsByIdArgs = {
  carBrandID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};


export type QueryCarsByCompanyArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCarsByIdArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};


export type QueryCashboxesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCashboxmovementsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCheckByIdArgs = {
  checkID: Scalars['Int']['input'];
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChecksByCompanyArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryClientsByBranchArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryClientsByCompanyArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryClientsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCommercialdocumentsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCompanyByIdArgs = {
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


export type QueryFilterFieldsArgs = {
  model: Scalars['String']['input'];
};


export type QueryGetLowStockItemsArgs = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
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
  companyID?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};


export type QueryItemstockByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryItemstocksArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  itemID?: InputMaybe<Scalars['Int']['input']>;
  warehouseID?: InputMaybe<Scalars['Int']['input']>;
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
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
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
  companyID?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};


export type QueryProvincesByCountryArgs = {
  countryID: Scalars['Int']['input'];
};


export type QueryProvincesByIdArgs = {
  countryID: Scalars['Int']['input'];
  provinceID: Scalars['Int']['input'];
};


export type QueryRmaByIdArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  rmaID: Scalars['Int']['input'];
};


export type QueryRmaDetailByIdArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  rmaDetailID: Scalars['Int']['input'];
  rmaID: Scalars['Int']['input'];
};


export type QueryRolesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySaleconditionsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySearchGlobalArgs = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  limit?: Scalars['Int']['input'];
  query: Scalars['String']['input'];
};


export type QuerySearchItemsArgs = {
  filters?: InputMaybe<ItemFilters>;
  pagination?: InputMaybe<ItemPagination>;
};


export type QueryServicetypesByIdArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};


export type QueryStockhistoryByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryStockhistorydetailByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySuppliersByCompanyArgs = {
  companyID?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySuppliersByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySysFiscalDocTypeArgs = {
  documentTypeId: Scalars['Int']['input'];
};


export type QuerySysIdentityDocTypeArgs = {
  docTypeId: Scalars['Int']['input'];
};


export type QuerySysIdentityDocTypesArgs = {
  onlyActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTransactionsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUltimoComprobanteArgs = {
  cbteTipo: Scalars['Int']['input'];
  ptoVta: Scalars['Int']['input'];
};


export type QueryUserpermissionsByIdArgs = {
  branchID?: InputMaybe<Scalars['Int']['input']>;
  companyID?: InputMaybe<Scalars['Int']['input']>;
  roleID?: InputMaybe<Scalars['Int']['input']>;
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

export type RmaCreate = {
  BranchID: Scalars['Int']['input'];
  ClientID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID: Scalars['Int']['input'];
  DocumentID?: InputMaybe<Scalars['Int']['input']>;
  Notes?: InputMaybe<Scalars['String']['input']>;
  PriceListID?: InputMaybe<Scalars['Int']['input']>;
  RelatedOrderID?: InputMaybe<Scalars['Int']['input']>;
  RelatedPIID?: InputMaybe<Scalars['Int']['input']>;
  RmaTypeID: Scalars['Int']['input'];
  StatusID: Scalars['Int']['input'];
  Subtotal?: InputMaybe<Scalars['Float']['input']>;
  SupplierID?: InputMaybe<Scalars['Int']['input']>;
  Total?: InputMaybe<Scalars['Float']['input']>;
  UserID: Scalars['Int']['input'];
  VatAmount?: InputMaybe<Scalars['Float']['input']>;
  WarehouseID: Scalars['Int']['input'];
};

export type RmaDetailCreate = {
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  ItemID: Scalars['Int']['input'];
  LineDescription?: InputMaybe<Scalars['String']['input']>;
  Quantity: Scalars['Float']['input'];
  RmaID: Scalars['Int']['input'];
  UnitPrice: Scalars['Float']['input'];
  WarehouseID: Scalars['Int']['input'];
};

export type RmaDetailFilter = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  ItemID?: InputMaybe<Scalars['Int']['input']>;
  RmaID?: InputMaybe<Scalars['Int']['input']>;
};

export type RmaDetailInDb = {
  __typename?: 'RMADetailInDB';
  BranchID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  ItemID: Scalars['Int']['output'];
  LastModified: Scalars['DateTime']['output'];
  LineDescription?: Maybe<Scalars['String']['output']>;
  Quantity: Scalars['Float']['output'];
  RmaDetailID: Scalars['Int']['output'];
  RmaID: Scalars['Int']['output'];
  UnitPrice: Scalars['Float']['output'];
  WarehouseID: Scalars['Int']['output'];
};

export type RmaDetailUpdate = {
  ItemID?: InputMaybe<Scalars['Int']['input']>;
  LineDescription?: InputMaybe<Scalars['String']['input']>;
  Quantity?: InputMaybe<Scalars['Float']['input']>;
  UnitPrice?: InputMaybe<Scalars['Float']['input']>;
  WarehouseID?: InputMaybe<Scalars['Int']['input']>;
};

export type RmaFilter = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  ClientID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  RmaTypeID?: InputMaybe<Scalars['Int']['input']>;
  StatusID?: InputMaybe<Scalars['Int']['input']>;
  SupplierID?: InputMaybe<Scalars['Int']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
};

export type RmaInDb = {
  __typename?: 'RMAInDB';
  BranchID: Scalars['Int']['output'];
  ClientID?: Maybe<Scalars['Int']['output']>;
  CompanyID: Scalars['Int']['output'];
  DocumentID?: Maybe<Scalars['Int']['output']>;
  Notes?: Maybe<Scalars['String']['output']>;
  PriceListID?: Maybe<Scalars['Int']['output']>;
  RelatedOrderID?: Maybe<Scalars['Int']['output']>;
  RelatedPIID?: Maybe<Scalars['Int']['output']>;
  RmaDate: Scalars['DateTime']['output'];
  RmaID: Scalars['Int']['output'];
  RmaTypeID: Scalars['Int']['output'];
  StatusID: Scalars['Int']['output'];
  Subtotal: Scalars['Float']['output'];
  SupplierID?: Maybe<Scalars['Int']['output']>;
  Total: Scalars['Float']['output'];
  UserID: Scalars['Int']['output'];
  VatAmount: Scalars['Float']['output'];
  WarehouseID: Scalars['Int']['output'];
};

export type RmaUpdate = {
  ClientID?: InputMaybe<Scalars['Int']['input']>;
  DocumentID?: InputMaybe<Scalars['Int']['input']>;
  Notes?: InputMaybe<Scalars['String']['input']>;
  PriceListID?: InputMaybe<Scalars['Int']['input']>;
  RelatedOrderID?: InputMaybe<Scalars['Int']['input']>;
  RelatedPIID?: InputMaybe<Scalars['Int']['input']>;
  RmaDate?: InputMaybe<Scalars['DateTime']['input']>;
  RmaTypeID?: InputMaybe<Scalars['Int']['input']>;
  StatusID?: InputMaybe<Scalars['Int']['input']>;
  Subtotal?: InputMaybe<Scalars['Float']['input']>;
  SupplierID?: InputMaybe<Scalars['Int']['input']>;
  Total?: InputMaybe<Scalars['Float']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
  VatAmount?: InputMaybe<Scalars['Float']['input']>;
  WarehouseID?: InputMaybe<Scalars['Int']['input']>;
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
  CompanyID: Scalars['Int']['input'];
  ServiceTypeName?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceTypeInDb = {
  __typename?: 'ServiceTypeInDB';
  CompanyID: Scalars['Int']['output'];
  ServiceTypeID: Scalars['Int']['output'];
  ServiceTypeName?: Maybe<Scalars['String']['output']>;
};

export type ServiceTypeUpdate = {
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  ServiceTypeName?: InputMaybe<Scalars['String']['input']>;
};

export type StockHistoriesCreate = {
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  Notes: Scalars['String']['input'];
  Reason: Scalars['String']['input'];
  TransactionDate: Scalars['DateTime']['input'];
  UserID: Scalars['Int']['input'];
};

export type StockHistoriesInDb = {
  __typename?: 'StockHistoriesInDB';
  BranchID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  Notes: Scalars['String']['output'];
  Reason: Scalars['String']['output'];
  StockHistoryID: Scalars['Int']['output'];
  TransactionDate: Scalars['DateTime']['output'];
  UserID: Scalars['Int']['output'];
};

export type StockHistoriesUpdate = {
  BranchID?: InputMaybe<Scalars['Int']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  Notes?: InputMaybe<Scalars['String']['input']>;
  Reason?: InputMaybe<Scalars['String']['input']>;
  TransactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  UserID?: InputMaybe<Scalars['Int']['input']>;
};

export type StockHistoryDetailsCreate = {
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

export type StockHistoryDetailsInDb = {
  __typename?: 'StockHistoryDetailsInDB';
  BranchID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  ItemID: Scalars['Int']['output'];
  QuantityAfter: Scalars['Int']['output'];
  QuantityBefore: Scalars['Int']['output'];
  QuantityUpdate: Scalars['Int']['output'];
  Reason?: Maybe<Scalars['String']['output']>;
  StockHistoryID: Scalars['Int']['output'];
  TransactionDate: Scalars['Date']['output'];
  UserID: Scalars['Int']['output'];
  WarehouseID: Scalars['Int']['output'];
};

export type StockHistoryDetailsUpdate = {
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
  City?: Maybe<Scalars['String']['output']>;
  CompanyData?: Maybe<CompanyInDb>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
  CountryData?: Maybe<CountriesInDb>;
  CountryID?: Maybe<Scalars['Int']['output']>;
  DocNumber?: Maybe<Scalars['String']['output']>;
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

export type SysFiscalDocTypesInDb = {
  __typename?: 'SysFiscalDocTypesInDB';
  DocumentTypeID: Scalars['Int']['output'];
  Name: Scalars['String']['output'];
};

export type SysIdentityDocTypesInDb = {
  __typename?: 'SysIdentityDocTypesInDB';
  DocTypeID: Scalars['Int']['output'];
  DocTypeName: Scalars['String']['output'];
  IsActive: Scalars['Boolean']['output'];
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
  IsFullAdmin: Scalars['Boolean']['output'];
  Nickname: Scalars['String']['output'];
  UserID: Scalars['Int']['output'];
  UserPermissions: Array<UserPermissionsInfo>;
};

export type UserPermissionsCreate = {
  BranchID: Scalars['Int']['input'];
  CompanyID: Scalars['Int']['input'];
  RoleID: Scalars['Int']['input'];
  UserID: Scalars['Int']['input'];
};

export type UserPermissionsInDb = {
  __typename?: 'UserPermissionsInDB';
  BranchData?: Maybe<BranchesInDb>;
  BranchID: Scalars['Int']['output'];
  CompanyData?: Maybe<CompanyInDb>;
  CompanyID: Scalars['Int']['output'];
  RoleData?: Maybe<RolesInDb>;
  RoleID: Scalars['Int']['output'];
  UserData?: Maybe<UsersInDb>;
  UserID: Scalars['Int']['output'];
};

export type UserPermissionsInfo = {
  __typename?: 'UserPermissionsInfo';
  BranchID: Scalars['Int']['output'];
  BranchName: Scalars['String']['output'];
  CompanyID: Scalars['Int']['output'];
  CompanyName: Scalars['String']['output'];
  RoleID: Scalars['Int']['output'];
  RoleName: Scalars['String']['output'];
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
  Address?: InputMaybe<Scalars['String']['input']>;
  CompanyID: Scalars['Int']['input'];
  WarehouseName: Scalars['String']['input'];
};

export type WarehousesInDb = {
  __typename?: 'WarehousesInDB';
  Address?: Maybe<Scalars['String']['output']>;
  CompanCompanyData?: Maybe<CompanyInDb>;
  CompanyID: Scalars['Int']['output'];
  WarehouseID: Scalars['Int']['output'];
  WarehouseName: Scalars['String']['output'];
};

export type WarehousesUpdate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  CompanyID?: InputMaybe<Scalars['Int']['input']>;
  WarehouseName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBranchMutationVariables = Exact<{
  input: BranchesCreate;
}>;


export type CreateBranchMutation = { __typename?: 'Mutation', createBranch: { __typename?: 'BranchesInDB', BranchID: number, CompanyID: number, BranchName: string } };

export type CreateCarMutationVariables = Exact<{
  input: CarsCreate;
}>;


export type CreateCarMutation = { __typename?: 'Mutation', createCar: { __typename?: 'CarsInDB', CarID: number, LicensePlate: string, Year?: number | null, CarModelID: number, ClientID: number, LastServiceMileage?: number | null, IsDebtor?: boolean | null, DiscountID: number } };

export type CreateCarBrandMutationVariables = Exact<{
  input: CarBrandsCreate;
}>;


export type CreateCarBrandMutation = { __typename?: 'Mutation', createCarbrand: { __typename?: 'CarBrandsInDB', CarBrandID: number, CarBrandName: string } };

export type CreateCarModelMutationVariables = Exact<{
  input: CarModelsCreate;
}>;


export type CreateCarModelMutation = { __typename?: 'Mutation', createCarmodel: { __typename?: 'CarModelsInDB', CarModelID: number, CarBrandID: number, CarModelName: string } };

export type CreateCashboxMutationVariables = Exact<{
  input: CashBoxesCreate;
}>;


export type CreateCashboxMutation = { __typename?: 'Mutation', createCashbox: { __typename?: 'CashBoxesInDB', CashBoxID: number, CompanyID: number, BranchID: number, Name: string, Description?: string | null, IsActive: boolean, OpenDate?: any | null, CloseDate?: any | null, InitialBalance: number, CurrentBalance: number, UserID?: number | null, Notes?: string | null } };

export type CreateCashboxmovementMutationVariables = Exact<{
  input: CashBoxMovementsCreate;
}>;


export type CreateCashboxmovementMutation = { __typename?: 'Mutation', createCashboxmovement: { __typename?: 'CashBoxMovementsInDB', CashBoxMovementID: number, CashBoxID: number, CompanyID: number, BranchID: number, MovementDate: any, Amount: number, MovementType: string, Description?: string | null, UserID?: number | null, Notes?: string | null } };

export type CreateClientMutationVariables = Exact<{
  input: ClientsCreate;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'ClientsInDB', ClientID: number, DocTypeID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, City?: string | null, PostalCode?: string | null, IsActive?: boolean | null, CountryID: number, ProvinceID: number, PriceListID: number, VendorID: number } };

export type CreateCompanyMutationVariables = Exact<{
  input: CompanyCreate;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null, Address?: string | null, CUIT?: string | null, Grossincome?: string | null, Startdate?: any | null, Logo?: string | null } };

export type CreateCreditCardMutationVariables = Exact<{
  input: CreditCardsCreate;
}>;


export type CreateCreditCardMutation = { __typename?: 'Mutation', createCreditcard: { __typename?: 'CreditCardsInDB', CreditCardID: number, CreditCardGroupID: number, CardName: string, Surcharge?: number | null, Installments?: number | null, IsActive?: boolean | null } };

export type CreateCreditCardGroupMutationVariables = Exact<{
  input: CreditCardGroupsCreate;
}>;


export type CreateCreditCardGroupMutation = { __typename?: 'Mutation', createCreditcardgroup: { __typename?: 'CreditCardGroupsInDB', CreditCardGroupID: number, GroupName?: string | null } };

export type CreateDiscountMutationVariables = Exact<{
  input: DiscountsCreate;
}>;


export type CreateDiscountMutation = { __typename?: 'Mutation', createDiscount: { __typename?: 'DiscountsInDB', DiscountID: number, DiscountName: string, Percentage: number } };

export type CreateDocumentMutationVariables = Exact<{
  input: CommercialDocumentsCreate;
}>;


export type CreateDocumentMutation = { __typename?: 'Mutation', createDocument: { __typename?: 'CommercialDocumentsInDB', DocumentID: number, CompanyID: number, BranchID: number, DocumentTypeID: number, DocumentDescription: string, DocumentNumber: number, PointOfSale: number, IsActive: boolean, IsTest: boolean, ShouldAccount: boolean, AffectsStock: boolean, IsFiscal?: boolean | null, IsElectronic?: boolean | null, IsManual?: boolean | null, IsQuotation?: boolean | null, MaxItems?: number | null } };

export type CreateItemMutationVariables = Exact<{
  input: ItemsCreate;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'ItemsInDB', ItemID: number, ItemCode: string } };

export type CreateItemCategoryMutationVariables = Exact<{
  input: ItemCategoriesCreate;
}>;


export type CreateItemCategoryMutation = { __typename?: 'Mutation', createItemcategory: { __typename?: 'ItemCategoriesInDB', ItemCategoryID: number, CategoryName: string } };

export type CreateItemSubcategoryMutationVariables = Exact<{
  input: ItemSubcategoriesCreate;
}>;


export type CreateItemSubcategoryMutation = { __typename?: 'Mutation', createItemsubcategory: { __typename?: 'ItemSubcategoriesInDB', ItemSubcategoryID: number, ItemCategoryID: number, SubcategoryName: string } };

export type CreateOrderMutationVariables = Exact<{
  input: OrdersCreate;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'OrderResponse', sessionID?: string | null, message?: string | null, order: { __typename?: 'OrdersInDB', OrderID: number, CompanyID: number, BranchID: number, OrderDate: any, ClientID: number, CarID?: number | null, IsService?: boolean | null, ServiceTypeID?: number | null, Mileage?: number | null, NextServiceMileage?: number | null, Notes?: string | null, SaleConditionID?: number | null, DiscountID?: number | null, Subtotal: number, Total: number, TotalTaxAmount: number, UserID?: number | null, DocumentID?: number | null, PriceListID?: number | null, OrderStatusID?: number | null, WarehouseID?: number | null } } };

export type CreatePricelistMutationVariables = Exact<{
  input: PriceListsCreate;
}>;


export type CreatePricelistMutation = { __typename?: 'Mutation', createPricelist: { __typename?: 'PriceListsInDB', PriceListID: number, PriceListName: string, PriceListDescription?: string | null, IsActive?: boolean | null } };

export type CreatePricelistItemMutationVariables = Exact<{
  input: PriceListItemsCreate;
}>;


export type CreatePricelistItemMutation = { __typename?: 'Mutation', createPricelistitem: { __typename?: 'PriceListItemsInDB', PriceListID: number, ItemID: number, Price: number, EffectiveDate: any } };

export type CreateRoleMutationVariables = Exact<{
  input: RolesCreate;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'RolesInDB', RoleID: number, RoleName: string } };

export type CreateSaleConditionMutationVariables = Exact<{
  input: SaleConditionsCreate;
}>;


export type CreateSaleConditionMutation = { __typename?: 'Mutation', createSalecondition: { __typename?: 'SaleConditionsInDB', SaleConditionID: number, CreditCardID: number, Name: string, DueDate: any, Surcharge: number, IsActive?: boolean | null } };

export type CreateServicetypeMutationVariables = Exact<{
  input: ServiceTypeCreate;
}>;


export type CreateServicetypeMutation = { __typename?: 'Mutation', createServicetype: { __typename?: 'ServiceTypeInDB', ServiceTypeID: number, ServiceTypeName?: string | null } };

export type CreateSupplierMutationVariables = Exact<{
  input: SuppliersCreate;
}>;


export type CreateSupplierMutation = { __typename?: 'Mutation', createSupplier: { __typename?: 'SuppliersInDB', SupplierID: number, DocTypeID?: number | null, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, IsActive?: boolean | null, CountryID?: number | null, ProvinceID?: number | null, City?: string | null, PostalCode?: string | null } };

export type CreateUserRecordMutationVariables = Exact<{
  input: UserCreate;
}>;


export type CreateUserRecordMutation = { __typename?: 'Mutation', createUserRecord: { __typename?: 'UsersInDB', UserID: number, Nickname?: string | null, FullName?: string | null, IsActive?: boolean | null } };

export type CreateUseraccessMutationVariables = Exact<{
  input: UserPermissionsCreate;
}>;


export type CreateUseraccessMutation = { __typename?: 'Mutation', createUserpermissions: { __typename?: 'UserPermissionsInDB', UserID: number, CompanyID: number, BranchID: number, RoleID: number } };

export type CreateVendorMutationVariables = Exact<{
  input: VendorsCreate;
}>;


export type CreateVendorMutation = { __typename?: 'Mutation', createVendor: { __typename?: 'VendorsInDB', VendorID: number, VendorName: string, Commission?: number | null, IsActive: boolean } };

export type CreateWarehouseMutationVariables = Exact<{
  input: WarehousesCreate;
}>;


export type CreateWarehouseMutation = { __typename?: 'Mutation', createWarehouse: { __typename?: 'WarehousesInDB', WarehouseID: number, WarehouseName: string, Address?: string | null } };

export type DeleteBranchMutationVariables = Exact<{
  companyID: Scalars['Int']['input'];
  branchID: Scalars['Int']['input'];
}>;


export type DeleteBranchMutation = { __typename?: 'Mutation', deleteBranch: boolean };

export type DeleteCarMutationVariables = Exact<{
  carID: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type DeleteCarMutation = { __typename?: 'Mutation', deleteCar: boolean };

export type DeleteCarBrandMutationVariables = Exact<{
  carBrandID: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type DeleteCarBrandMutation = { __typename?: 'Mutation', deleteCarbrand: boolean };

export type DeleteCarModelMutationVariables = Exact<{
  carModelID: Scalars['Int']['input'];
  carBrandId: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type DeleteCarModelMutation = { __typename?: 'Mutation', deleteCarmodel: boolean };

export type DeleteCashboxMutationVariables = Exact<{
  cashBoxID: Scalars['Int']['input'];
}>;


export type DeleteCashboxMutation = { __typename?: 'Mutation', deleteCashbox: boolean };

export type DeleteCashboxmovementMutationVariables = Exact<{
  movementID: Scalars['Int']['input'];
}>;


export type DeleteCashboxmovementMutation = { __typename?: 'Mutation', deleteCashboxmovement: boolean };

export type DeleteCompanyMutationVariables = Exact<{
  companyID: Scalars['Int']['input'];
}>;


export type DeleteCompanyMutation = { __typename?: 'Mutation', deleteCompany: boolean };

export type DeleteCreditCardMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCreditCardMutation = { __typename?: 'Mutation', deleteCreditcard: boolean };

export type DeleteCreditCardGroupMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCreditCardGroupMutation = { __typename?: 'Mutation', deleteCreditcardgroup: boolean };

export type DeleteDiscountMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteDiscountMutation = { __typename?: 'Mutation', deleteDiscount: boolean };

export type DeleteDocumentMutationVariables = Exact<{
  documentID: Scalars['Int']['input'];
}>;


export type DeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument: { __typename?: 'DeleteResponse', success: boolean, message: string } };

export type DeleteItemMutationVariables = Exact<{
  itemID: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: boolean };

export type DeleteItemCategoryMutationVariables = Exact<{
  categoryID: Scalars['Int']['input'];
}>;


export type DeleteItemCategoryMutation = { __typename?: 'Mutation', deleteItemcategory: boolean };

export type DeleteItemSubcategoryMutationVariables = Exact<{
  subcategoryID: Scalars['Int']['input'];
}>;


export type DeleteItemSubcategoryMutation = { __typename?: 'Mutation', deleteItemsubcategory: boolean };

export type DeleteOrderMutationVariables = Exact<{
  orderID: Scalars['Int']['input'];
  branchId: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type DeleteOrderMutation = { __typename?: 'Mutation', deleteOrder: boolean };

export type DeletePricelistMutationVariables = Exact<{
  pricelistID: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type DeletePricelistMutation = { __typename?: 'Mutation', deletePricelist: boolean };

export type DeletePricelistItemMutationVariables = Exact<{
  pricelistID: Scalars['Int']['input'];
  itemID: Scalars['Int']['input'];
}>;


export type DeletePricelistItemMutation = { __typename?: 'Mutation', deletePricelistitem: boolean };

export type DeleteRoleMutationVariables = Exact<{
  roleID: Scalars['Int']['input'];
}>;


export type DeleteRoleMutation = { __typename?: 'Mutation', deleteRole: boolean };

export type DeleteSaleConditionMutationVariables = Exact<{
  saleConditionID: Scalars['Int']['input'];
}>;


export type DeleteSaleConditionMutation = { __typename?: 'Mutation', deleteSalecondition: { __typename?: 'DeleteResponse', success: boolean, message: string } };

export type DeleteServicetypeMutationVariables = Exact<{
  serviceTypeID: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type DeleteServicetypeMutation = { __typename?: 'Mutation', deleteServicetype: { __typename?: 'DeleteResponse', success: boolean, message: string } };

export type DeleteSupplierMutationVariables = Exact<{
  supplierID: Scalars['Int']['input'];
}>;


export type DeleteSupplierMutation = { __typename?: 'Mutation', deleteSupplier: boolean };

export type DeleteUserRecordMutationVariables = Exact<{
  userID: Scalars['Int']['input'];
}>;


export type DeleteUserRecordMutation = { __typename?: 'Mutation', deleteUserRecord: boolean };

export type DeleteUseraccessMutationVariables = Exact<{
  userID: Scalars['Int']['input'];
  companyID: Scalars['Int']['input'];
  branchID: Scalars['Int']['input'];
  roleID: Scalars['Int']['input'];
}>;


export type DeleteUseraccessMutation = { __typename?: 'Mutation', deleteUserpermissions: boolean };

export type DeleteVendorMutationVariables = Exact<{
  vendorID: Scalars['Int']['input'];
}>;


export type DeleteVendorMutation = { __typename?: 'Mutation', deleteVendor: boolean };

export type DeleteWarehouseMutationVariables = Exact<{
  warehouseID: Scalars['Int']['input'];
}>;


export type DeleteWarehouseMutation = { __typename?: 'Mutation', deleteWarehouse: boolean };

export type GetStockEntryFormDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStockEntryFormDataQuery = { __typename?: 'Query', docTypes: Array<{ __typename?: 'SysIdentityDocTypesInDB', DocTypeID: number, DocTypeName: string }>, countries: Array<{ __typename?: 'CountriesInDB', CountryID: number, CountryName: string }>, provinces: Array<{ __typename?: 'ProvincesInDB', ProvinceID: number, CountryID: number, ProvinceName: string }>, companies: Array<{ __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null }>, warehouses: Array<{ __typename?: 'WarehousesInDB', WarehouseID: number, WarehouseName: string, Address?: string | null }>, branches: Array<{ __typename?: 'BranchesInDB', BranchID: number, BranchName: string, CompanyID: number }> };

export type ToggleClientStatusMutationVariables = Exact<{
  clientID: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
}>;


export type ToggleClientStatusMutation = { __typename?: 'Mutation', updateClient?: { __typename?: 'ClientsInDB', ClientID: number, IsActive?: boolean | null } | null };

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

export type UpdateBranchMutationVariables = Exact<{
  branchID: Scalars['Int']['input'];
  input: BranchesUpdate;
}>;


export type UpdateBranchMutation = { __typename?: 'Mutation', updateBranch?: { __typename?: 'BranchesInDB', BranchID: number, CompanyID: number, BranchName: string, Address?: string | null, Phone?: string | null } | null };

export type UpdateCarMutationVariables = Exact<{
  carID: Scalars['Int']['input'];
  input: CarsUpdate;
  companyId: Scalars['Int']['input'];
}>;


export type UpdateCarMutation = { __typename?: 'Mutation', updateCar?: { __typename?: 'CarsInDB', CarID: number, LicensePlate: string, Year?: number | null, CarModelID: number, ClientID: number, LastServiceMileage?: number | null, IsDebtor?: boolean | null, DiscountID: number } | null };

export type UpdateCarBrandMutationVariables = Exact<{
  carBrandID: Scalars['Int']['input'];
  input: CarBrandsUpdate;
  companyId: Scalars['Int']['input'];
}>;


export type UpdateCarBrandMutation = { __typename?: 'Mutation', updateCarbrand?: { __typename?: 'CarBrandsInDB', CarBrandID: number, CarBrandName: string } | null };

export type UpdateCarModelMutationVariables = Exact<{
  carModelID: Scalars['Int']['input'];
  input: CarModelsUpdate;
  carBrandId: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type UpdateCarModelMutation = { __typename?: 'Mutation', updateCarmodel?: { __typename?: 'CarModelsInDB', CarModelID: number, CarBrandID: number, CarModelName: string } | null };

export type UpdateCashboxMutationVariables = Exact<{
  cashBoxID: Scalars['Int']['input'];
  input: CashBoxesUpdate;
}>;


export type UpdateCashboxMutation = { __typename?: 'Mutation', updateCashbox?: { __typename?: 'CashBoxesInDB', CashBoxID: number, CompanyID: number, BranchID: number, Name: string, Description?: string | null, IsActive: boolean, OpenDate?: any | null, CloseDate?: any | null, InitialBalance: number, CurrentBalance: number, UserID?: number | null, Notes?: string | null } | null };

export type UpdateCashboxmovementMutationVariables = Exact<{
  movementID: Scalars['Int']['input'];
  input: CashBoxMovementsUpdate;
}>;


export type UpdateCashboxmovementMutation = { __typename?: 'Mutation', updateCashboxmovement?: { __typename?: 'CashBoxMovementsInDB', CashBoxMovementID: number, CashBoxID: number, CompanyID: number, BranchID: number, MovementDate: any, Amount: number, MovementType: string, Description?: string | null, UserID?: number | null, Notes?: string | null } | null };

export type UpdateClientMutationVariables = Exact<{
  clientID: Scalars['Int']['input'];
  input: ClientsUpdate;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient?: { __typename?: 'ClientsInDB', ClientID: number, DocTypeID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, City?: string | null, PostalCode?: string | null, IsActive?: boolean | null, CountryID: number, ProvinceID: number, PriceListID: number, VendorID: number } | null };

export type UpdateCompanyMutationVariables = Exact<{
  companyID: Scalars['Int']['input'];
  input: CompanyUpdate;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany?: { __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null, Address?: string | null, CUIT?: string | null, Grossincome?: string | null, Startdate?: any | null, Logo?: string | null } | null };

export type UpdateCreditCardMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: CreditCardsUpdate;
}>;


export type UpdateCreditCardMutation = { __typename?: 'Mutation', updateCreditcard?: { __typename?: 'CreditCardsInDB', CreditCardID: number, CreditCardGroupID: number, CardName: string, Surcharge?: number | null, Installments?: number | null, IsActive?: boolean | null } | null };

export type UpdateCreditCardGroupMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: CreditCardGroupsUpdate;
}>;


export type UpdateCreditCardGroupMutation = { __typename?: 'Mutation', updateCreditcardgroup?: { __typename?: 'CreditCardGroupsInDB', CreditCardGroupID: number, GroupName?: string | null } | null };

export type UpdateDiscountMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: DiscountsUpdate;
}>;


export type UpdateDiscountMutation = { __typename?: 'Mutation', updateDiscount?: { __typename?: 'DiscountsInDB', DiscountID: number, DiscountName: string, Percentage: number } | null };

export type UpdateDocumentMutationVariables = Exact<{
  documentID: Scalars['Int']['input'];
  input: CommercialDocumentsUpdate;
}>;


export type UpdateDocumentMutation = { __typename?: 'Mutation', updateDocument?: { __typename?: 'CommercialDocumentsInDB', DocumentID: number, CompanyID: number, BranchID: number, DocumentTypeID: number, DocumentDescription: string, DocumentNumber: number, PointOfSale: number, IsActive: boolean, IsTest: boolean, ShouldAccount: boolean, AffectsStock: boolean, IsFiscal?: boolean | null, IsElectronic?: boolean | null, IsManual?: boolean | null, IsQuotation?: boolean | null, MaxItems?: number | null } | null };

export type UpdateItemMutationVariables = Exact<{
  itemID: Scalars['Int']['input'];
  input: ItemsUpdate;
  companyId: Scalars['Int']['input'];
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem?: { __typename?: 'ItemsInDB', ItemID: number, ItemCode: string } | null };

export type UpdateItemCategoryMutationVariables = Exact<{
  categoryID: Scalars['Int']['input'];
  input: ItemCategoriesUpdate;
}>;


export type UpdateItemCategoryMutation = { __typename?: 'Mutation', updateItemcategory?: { __typename?: 'ItemCategoriesInDB', ItemCategoryID: number, CategoryName: string } | null };

export type UpdateItemSubcategoryMutationVariables = Exact<{
  subcategoryID: Scalars['Int']['input'];
  input: ItemSubcategoriesUpdate;
}>;


export type UpdateItemSubcategoryMutation = { __typename?: 'Mutation', updateItemsubcategory?: { __typename?: 'ItemSubcategoriesInDB', ItemSubcategoryID: number, ItemCategoryID: number, SubcategoryName: string } | null };

export type UpdateOrderMutationVariables = Exact<{
  orderID: Scalars['Int']['input'];
  input: OrdersUpdate;
  brandId: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder?: { __typename?: 'OrderResponse', sessionID?: string | null, message?: string | null, order: { __typename?: 'OrdersInDB', OrderID: number, CompanyID: number, BranchID: number, OrderDate: any, ClientID: number, CarID?: number | null, IsService?: boolean | null, ServiceTypeID?: number | null, Mileage?: number | null, NextServiceMileage?: number | null, Notes?: string | null, SaleConditionID?: number | null, DiscountID?: number | null, Subtotal: number, Total: number, TotalTaxAmount: number, UserID?: number | null, DocumentID?: number | null, PriceListID?: number | null, OrderStatusID?: number | null, WarehouseID?: number | null } } | null };

export type UpdatePricelistMutationVariables = Exact<{
  pricelistID: Scalars['Int']['input'];
  input: PriceListsUpdate;
  companyId: Scalars['Int']['input'];
}>;


export type UpdatePricelistMutation = { __typename?: 'Mutation', updatePricelist?: { __typename?: 'PriceListsInDB', PriceListID: number, PriceListName: string, PriceListDescription?: string | null, IsActive?: boolean | null } | null };

export type UpdatePricelistItemMutationVariables = Exact<{
  pricelistID: Scalars['Int']['input'];
  itemID: Scalars['Int']['input'];
  input: PriceListItemsUpdate;
}>;


export type UpdatePricelistItemMutation = { __typename?: 'Mutation', updatePricelistitem?: { __typename?: 'PriceListItemsInDB', PriceListID: number, ItemID: number, Price: number, EffectiveDate: any } | null };

export type UpdateRoleMutationVariables = Exact<{
  roleID: Scalars['Int']['input'];
  input: RolesUpdate;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole?: { __typename?: 'RolesInDB', RoleID: number, RoleName: string } | null };

export type UpdateSaleConditionMutationVariables = Exact<{
  saleConditionID: Scalars['Int']['input'];
  input: SaleConditionsUpdate;
}>;


export type UpdateSaleConditionMutation = { __typename?: 'Mutation', updateSalecondition?: { __typename?: 'SaleConditionsInDB', SaleConditionID: number, CreditCardID: number, Name: string, DueDate: any, Surcharge: number, IsActive?: boolean | null } | null };

export type UpdateServicetypeMutationVariables = Exact<{
  serviceTypeID: Scalars['Int']['input'];
  input: ServiceTypeUpdate;
  companyId: Scalars['Int']['input'];
}>;


export type UpdateServicetypeMutation = { __typename?: 'Mutation', updateServicetype?: { __typename?: 'ServiceTypeInDB', ServiceTypeID: number, ServiceTypeName?: string | null } | null };

export type UpdateSupplierMutationVariables = Exact<{
  supplierID: Scalars['Int']['input'];
  input: SuppliersUpdate;
}>;


export type UpdateSupplierMutation = { __typename?: 'Mutation', updateSupplier?: { __typename?: 'SuppliersInDB', SupplierID: number, DocTypeID?: number | null, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, IsActive?: boolean | null, CountryID?: number | null, ProvinceID?: number | null, City?: string | null, PostalCode?: string | null } | null };

export type UpdateUserPermissionsMutationVariables = Exact<{
  oldUserID: Scalars['Int']['input'];
  oldCompanyID: Scalars['Int']['input'];
  oldBranchID: Scalars['Int']['input'];
  oldRoleID: Scalars['Int']['input'];
  newData: UserPermissionsCreate;
}>;


export type UpdateUserPermissionsMutation = { __typename?: 'Mutation', updateUserpermissions: { __typename?: 'UserPermissionsInDB', UserID: number, CompanyID: number, BranchID: number, RoleID: number } };

export type UpdateUserRecordMutationVariables = Exact<{
  userID: Scalars['Int']['input'];
  input: UserUpdate;
}>;


export type UpdateUserRecordMutation = { __typename?: 'Mutation', updateUserRecord?: { __typename?: 'UsersInDB', UserID: number, Nickname?: string | null, FullName?: string | null, IsActive?: boolean | null } | null };

export type UpdateVendorMutationVariables = Exact<{
  vendorID: Scalars['Int']['input'];
  input: VendorsUpdate;
}>;


export type UpdateVendorMutation = { __typename?: 'Mutation', updateVendor?: { __typename?: 'VendorsInDB', VendorID: number, VendorName: string, Commission?: number | null, IsActive: boolean } | null };

export type UpdateWarehouseMutationVariables = Exact<{
  warehouseID: Scalars['Int']['input'];
  input: WarehousesUpdate;
}>;


export type UpdateWarehouseMutation = { __typename?: 'Mutation', updateWarehouse?: { __typename?: 'WarehousesInDB', WarehouseID: number, WarehouseName: string, Address?: string | null } | null };

export type CreateBrand2MutationVariables = Exact<{
  input: BrandsCreate;
}>;


export type CreateBrand2Mutation = { __typename?: 'Mutation', createBrand: { __typename?: 'BrandsInDB', BrandID: number, BrandName: string, IsActive?: boolean | null } };

export type DeleteBrandMutationVariables = Exact<{
  brandID: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type DeleteBrandMutation = { __typename?: 'Mutation', deleteBrand: boolean };

export type DeleteClientMutationVariables = Exact<{
  ClientID: Scalars['Int']['input'];
}>;


export type DeleteClientMutation = { __typename?: 'Mutation', deleteClient: { __typename?: 'DeleteResponse', success: boolean, message: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', success: boolean, message: string, token?: string | null, refreshToken?: string | null, refreshExpiresAt?: any | null, sessionId?: number | null, user?: { __typename?: 'UserInfo', UserID: number, Nickname: string, FullName?: string | null, IsActive: boolean, IsFullAdmin: boolean, UserPermissions: Array<{ __typename?: 'UserPermissionsInfo', UserID: number, CompanyID: number, CompanyName: string, BranchID: number, BranchName: string, RoleID: number, RoleName: string }> } | null } };

export type UpdateBrandMutationVariables = Exact<{
  brandID: Scalars['Int']['input'];
  input: BrandsUpdate;
  companyId: Scalars['Int']['input'];
}>;


export type UpdateBrandMutation = { __typename?: 'Mutation', updateBrand?: { __typename?: 'BrandsInDB', BrandID: number, BrandName: string, IsActive?: boolean | null } | null };

export type GetAllBranchesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBranchesQuery = { __typename?: 'Query', allBranches: Array<{ __typename?: 'BranchesInDB', Address?: string | null, BranchID: number, BranchName: string, CompanyID: number, Phone?: string | null, CompanyData?: { __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null } | null }> };

export type GetAllBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBrandsQuery = { __typename?: 'Query', allBrands: Array<{ __typename?: 'BrandsInDB', BrandID: number, BrandName: string, IsActive?: boolean | null, CompanyData?: { __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null } | null }> };

export type GetAllCarBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCarBrandsQuery = { __typename?: 'Query', allCarbrands: Array<{ __typename?: 'CarBrandsInDB', CarBrandID: number, CarBrandName: string, CompanyID: number }> };

export type GetAllCarModelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCarModelsQuery = { __typename?: 'Query', allCarmodels: Array<{ __typename?: 'CarModelsInDB', CarModelID: number, CarBrandID: number, CarModelName: string, CarBrandData?: { __typename?: 'CarBrandsInDB', CarBrandName: string } | null }> };

export type GetAllCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCarsQuery = { __typename?: 'Query', allCars: Array<{ __typename?: 'CarsInDB', CarID: number, LicensePlate: string, Year?: number | null, CarModelID: number, ClientID: number, LastServiceMileage?: number | null, IsDebtor?: boolean | null, DiscountID: number, CarModelData?: { __typename?: 'CarModelsInDB', CarModelName: string } | null, CarBrandData?: { __typename?: 'CarBrandsInDB', CarBrandID: number, CarBrandName: string } | null, ClientData?: { __typename?: 'ClientsInDB', FirstName: string, LastName?: string | null } | null }> };

export type GetAllClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllClientsQuery = { __typename?: 'Query', allClients: Array<{ __typename?: 'ClientsInDB', ClientID: number, DocTypeID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, City?: string | null, PostalCode?: string | null, IsActive?: boolean | null, CountryID: number, ProvinceID: number, PriceListID: number, VendorID: number }> };

export type GetAllCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCompaniesQuery = { __typename?: 'Query', allCompany: Array<{ __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null, Address?: string | null, CUIT?: string | null, Grossincome?: string | null, Startdate?: any | null, Logo?: string | null }> };

export type GetAllCreditCardGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCreditCardGroupsQuery = { __typename?: 'Query', allCreditcardgroups: Array<{ __typename?: 'CreditCardGroupsInDB', CreditCardGroupID: number, GroupName?: string | null }> };

export type GetAllCreditCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCreditCardsQuery = { __typename?: 'Query', allCreditcards: Array<{ __typename?: 'CreditCardsInDB', CreditCardID: number, CreditCardGroupID: number, CardName: string, Surcharge?: number | null, Installments?: number | null, IsActive?: boolean | null, CreditCardGroupData?: { __typename?: 'CreditCardGroupsInDB', GroupName?: string | null } | null }> };

export type GetAllDiscountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDiscountsQuery = { __typename?: 'Query', allDiscounts: Array<{ __typename?: 'DiscountsInDB', DiscountID: number, DiscountName: string, Percentage: number }> };

export type GetAllDocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDocumentsQuery = { __typename?: 'Query', allCommercialdocuments: Array<{ __typename?: 'CommercialDocumentsInDB', DocumentID: number, CompanyID: number, BranchID: number, DocumentTypeID: number, DocumentNumber: number, PointOfSale: number, IsActive: boolean, ShouldAccount: boolean, IsFiscal?: boolean | null, IsElectronic?: boolean | null, IsManual?: boolean | null, IsQuotation?: boolean | null, MaxItems?: number | null, DocumentDescription: string, IsTest: boolean, FromDate?: string | null, CurrencyID?: number | null }> };

export type GetAllItemCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllItemCategoriesQuery = { __typename?: 'Query', allItemcategories: Array<{ __typename?: 'ItemCategoriesInDB', ItemCategoryID: number, CategoryName: string }> };

export type GetAllItemSubcategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllItemSubcategoriesQuery = { __typename?: 'Query', allItemsubcategories: Array<{ __typename?: 'ItemSubcategoriesInDB', ItemSubcategoryID: number, ItemCategoryID: number, SubcategoryName: string, CategoryData?: { __typename?: 'ItemCategoriesInDB', CategoryName: string } | null }> };

export type GetAllItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllItemsQuery = { __typename?: 'Query', allItems: Array<{ __typename?: 'ItemsInDB', BranchID: number, BrandID: number, CompanyID: number, ControlStock: boolean, IsActive: boolean, IsOffer: boolean, ItemCategoryID: number, ItemCode: string, ItemDescription: string, ItemID: number, ItemSubcategoryID: number, LastModified?: any | null, OEM?: string | null, ReplenishmentStock: number, SupplierID: number, WarehouseID: number, BranchData?: { __typename?: 'BranchesInDB', BranchName: string } | null, BrandData?: { __typename?: 'BrandsInDB', BrandName: string } | null, CompanyData?: { __typename?: 'CompanyInDB', CompanyName?: string | null } | null, CategoryData?: { __typename?: 'ItemCategoriesInDB', CategoryName: string } | null, SupplierData?: { __typename?: 'SuppliersInDB', FirstName: string, LastName?: string | null } | null, WarehouseData?: { __typename?: 'WarehousesInDB', WarehouseName: string } | null }> };

export type GetAllOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrdersQuery = { __typename?: 'Query', allOrders: Array<{ __typename?: 'OrdersInDB', OrderID: number, CompanyID: number, BranchID: number, OrderDate: any, ClientID: number, CarID?: number | null, IsService?: boolean | null, ServiceTypeID?: number | null, Mileage?: number | null, NextServiceMileage?: number | null, Notes?: string | null, SaleConditionID?: number | null, DiscountID?: number | null, Subtotal: number, Total: number, TotalTaxAmount: number, UserID?: number | null, DocumentID?: number | null, PriceListID?: number | null, OrderStatusID?: number | null, WarehouseID?: number | null, SaleConditionData?: { __typename?: 'SaleConditionsInDB', SaleConditionID: number, Name: string } | null, ClientData?: { __typename?: 'ClientsInDB', ClientID: number, FirstName: string, LastName?: string | null, VendorID: number } | null, UserData?: { __typename?: 'UsersInDB', UserID: number, Nickname?: string | null, FullName?: string | null } | null, DiscountData?: { __typename?: 'DiscountsInDB', DiscountID: number, DiscountName: string, Percentage: number } | null, VendorData?: { __typename?: 'VendorsInDB', VendorID: number, VendorName: string } | null }> };

export type GetAllPricelistItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPricelistItemsQuery = { __typename?: 'Query', allPricelistitems: Array<{ __typename?: 'PriceListItemsInDB', PriceListID: number, ItemID: number, Price: number, EffectiveDate: any, PriceListData?: { __typename?: 'PriceListsInDB', PriceListName: string, PriceListDescription?: string | null, IsActive?: boolean | null } | null }> };

export type GetAllRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRolesQuery = { __typename?: 'Query', allRoles: Array<{ __typename?: 'RolesInDB', RoleID: number, RoleName: string }> };

export type GetAllSaleConditionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSaleConditionsQuery = { __typename?: 'Query', allSaleconditions: Array<{ __typename?: 'SaleConditionsInDB', SaleConditionID: number, CreditCardID: number, Name: string, DueDate: any, Surcharge: number, IsActive?: boolean | null }> };

export type GetAllServicetypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllServicetypesQuery = { __typename?: 'Query', allServicetypes: Array<{ __typename?: 'ServiceTypeInDB', ServiceTypeID: number, ServiceTypeName?: string | null }> };

export type GetAllSuppliersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSuppliersQuery = { __typename?: 'Query', allSuppliers: Array<{ __typename?: 'SuppliersInDB', SupplierID: number, DocTypeID?: number | null, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, IsActive?: boolean | null, CountryID?: number | null, ProvinceID?: number | null, City?: string | null, PostalCode?: string | null, CompanyID?: number | null, CompanyData?: { __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null } | null }> };

export type GetAllUseraccessQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUseraccessQuery = { __typename?: 'Query', allUserpermissions: Array<{ __typename?: 'UserPermissionsInDB', UserID: number, CompanyID: number, BranchID: number, RoleID: number, UserData?: { __typename?: 'UsersInDB', FullName?: string | null } | null, CompanyData?: { __typename?: 'CompanyInDB', CompanyName?: string | null } | null, BranchData?: { __typename?: 'BranchesInDB', BranchName: string } | null, RoleData?: { __typename?: 'RolesInDB', RoleName: string } | null }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'UsersInDB', UserID: number, Nickname?: string | null, FullName?: string | null, IsActive?: boolean | null }> };

export type GetAllVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllVendorsQuery = { __typename?: 'Query', allVendors: Array<{ __typename?: 'VendorsInDB', VendorID: number, VendorName: string, Commission?: number | null, IsActive: boolean }> };

export type GetBranchByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetBranchByIdQuery = { __typename?: 'Query', branchesById?: { __typename?: 'BranchesInDB', Address?: string | null, BranchID: number, BranchName: string, CompanyID: number, Phone?: string | null } | null };

export type GetBranchesByCompanyQueryVariables = Exact<{
  companyID: Scalars['Int']['input'];
}>;


export type GetBranchesByCompanyQuery = { __typename?: 'Query', branchesByCompany: Array<{ __typename?: 'BranchesInDB', BranchID: number, CompanyID: number, BranchName: string, Address?: string | null, Phone?: string | null, CompanyData?: { __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null } | null }> };

export type GetBrandByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type GetBrandByIdQuery = { __typename?: 'Query', brandsById?: { __typename?: 'BrandsInDB', BrandID: number, BrandName: string, CompanyID?: number | null, IsActive?: boolean | null, CompanyData?: { __typename?: 'CompanyInDB', CompanyName?: string | null } | null } | null };

export type GetBrandsByCompanyQueryVariables = Exact<{
  companyID: Scalars['Int']['input'];
}>;


export type GetBrandsByCompanyQuery = { __typename?: 'Query', brandsByCompany: Array<{ __typename?: 'BrandsInDB', BrandID: number, BrandName: string, CompanyID?: number | null, IsActive?: boolean | null, CompanyData?: { __typename?: 'CompanyInDB', CompanyName?: string | null } | null }> };

export type GetCarBrandByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type GetCarBrandByIdQuery = { __typename?: 'Query', carbrandsById?: { __typename?: 'CarBrandsInDB', CarBrandID: number, CarBrandName: string } | null };

export type GetCarByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type GetCarByIdQuery = { __typename?: 'Query', carsById?: { __typename?: 'CarsInDB', CarID: number, LicensePlate: string, Year?: number | null, CarModelID: number, ClientID: number, LastServiceMileage?: number | null, IsDebtor?: boolean | null, DiscountID: number, CarModelData?: { __typename?: 'CarModelsInDB', CarModelName: string } | null, CarBrandData?: { __typename?: 'CarBrandsInDB', CarBrandName: string } | null, ClientData?: { __typename?: 'ClientsInDB', FirstName: string, LastName?: string | null } | null } | null };

export type GetCarFormDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarFormDataQuery = { __typename?: 'Query', carBrands: Array<{ __typename?: 'CarBrandsInDB', CarBrandID: number, CarBrandName: string }>, carModels: Array<{ __typename?: 'CarModelsInDB', CarModelID: number, CarBrandID: number, CarModelName: string }>, clients: Array<{ __typename?: 'ClientsInDB', ClientID: number, FirstName: string, LastName?: string | null }>, discounts: Array<{ __typename?: 'DiscountsInDB', DiscountID: number, DiscountName: string }> };

export type GetCarModelByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  carBrandId: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type GetCarModelByIdQuery = { __typename?: 'Query', carmodelsById?: { __typename?: 'CarModelsInDB', CarModelID: number, CarBrandID: number, CarModelName: string, CarBrandData?: { __typename?: 'CarBrandsInDB', CarBrandName: string } | null } | null };

export type GetCarModelsByBrandQueryVariables = Exact<{
  brandID: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type GetCarModelsByBrandQuery = { __typename?: 'Query', carmodelsByBrand: Array<{ __typename?: 'CarModelsInDB', CarModelID: number, CarBrandID: number, CarModelName: string, CarBrandData?: { __typename?: 'CarBrandsInDB', CarBrandName: string } | null }> };

export type GetClientByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetClientByIdQuery = { __typename?: 'Query', clientsById?: { __typename?: 'ClientsInDB', ClientID: number, DocTypeID: number, CompanyID?: number | null, BranchID?: number | null, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, City?: string | null, PostalCode?: string | null, IsActive?: boolean | null, CountryID: number, ProvinceID: number, PriceListID: number, VendorID: number } | null };

export type GetClientFormDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientFormDataQuery = { __typename?: 'Query', companies: Array<{ __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null }>, branches: Array<{ __typename?: 'BranchesInDB', BranchID: number, CompanyID: number, BranchName: string }>, provinces: Array<{ __typename?: 'ProvincesInDB', ProvinceID: number, CountryID: number, ProvinceName: string }>, warehouses: Array<{ __typename?: 'WarehousesInDB', WarehouseID: number, WarehouseName: string, Address?: string | null }> };

export type GetClientsByBranchQueryVariables = Exact<{
  companyID: Scalars['Int']['input'];
  branchID: Scalars['Int']['input'];
}>;


export type GetClientsByBranchQuery = { __typename?: 'Query', clientsByBranch: Array<{ __typename?: 'ClientsInDB', ClientID: number, DocTypeID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, City?: string | null, PostalCode?: string | null, IsActive?: boolean | null, CountryID: number, ProvinceID: number, PriceListID: number, VendorID: number, CompanyID?: number | null, BranchID?: number | null }> };

export type GetClientsByCompanyQueryVariables = Exact<{
  companyID: Scalars['Int']['input'];
}>;


export type GetClientsByCompanyQuery = { __typename?: 'Query', clientsByCompany: Array<{ __typename?: 'ClientsInDB', ClientID: number, DocTypeID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, City?: string | null, PostalCode?: string | null, IsActive?: boolean | null, CountryID: number, ProvinceID: number, PriceListID: number, VendorID: number, CompanyID?: number | null, BranchID?: number | null }> };

export type GetCompanyByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCompanyByIdQuery = { __typename?: 'Query', companyById?: { __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null, Address?: string | null, CUIT?: string | null, Grossincome?: string | null, Startdate?: any | null, Logo?: string | null } | null };

export type GetCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountriesQuery = { __typename?: 'Query', allCountries: Array<{ __typename?: 'CountriesInDB', CountryID: number, CountryName: string }> };

export type GetCreditCardByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCreditCardByIdQuery = { __typename?: 'Query', creditcardById?: { __typename?: 'CreditCardsInDB', CreditCardID: number, CreditCardGroupID: number, CardName: string, Surcharge?: number | null, Installments?: number | null, IsActive?: boolean | null, CreditCardGroupData?: { __typename?: 'CreditCardGroupsInDB', GroupName?: string | null } | null } | null };

export type GetCreditCardGroupByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCreditCardGroupByIdQuery = { __typename?: 'Query', creditcardgroupById?: { __typename?: 'CreditCardGroupsInDB', CreditCardGroupID: number, GroupName?: string | null } | null };

export type GetDashboardDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardDataQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'ClientsInDB', ClientID: number, IsActive?: boolean | null }>, items: Array<{ __typename?: 'ItemsInDB', ItemID: number, CompanyID: number, IsActive: boolean, ControlStock: boolean, ReplenishmentStock: number }>, orders: Array<{ __typename?: 'OrdersInDB', OrderID: number, CompanyID: number, OrderStatusID?: number | null, Total: number, OrderDate: any }>, itemstock: Array<{ __typename?: 'ItemStockInDB', ItemID: number, Quantity?: number | null, MinStockLevel?: number | null, CompanyID?: number | null }> };

export type GetDiscountByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetDiscountByIdQuery = { __typename?: 'Query', discountsById?: { __typename?: 'DiscountsInDB', DiscountID: number, DiscountName: string, Percentage: number } | null };

export type GetDocumentByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetDocumentByIdQuery = { __typename?: 'Query', commercialdocumentsById?: { __typename?: 'CommercialDocumentsInDB', DocumentID: number, CompanyID: number, BranchID: number, DocumentTypeID: number, DocumentDescription: string, DocumentNumber: number, PointOfSale: number, IsActive: boolean, IsTest: boolean, ShouldAccount: boolean, AffectsStock: boolean, IsFiscal?: boolean | null, IsElectronic?: boolean | null, IsManual?: boolean | null, IsQuotation?: boolean | null, MaxItems?: number | null } | null };

export type GetDocumentTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDocumentTypesQuery = { __typename?: 'Query', sysIdentityDocTypes: Array<{ __typename?: 'SysIdentityDocTypesInDB', DocTypeID: number, DocTypeName: string }> };

export type GetFilterFieldsQueryVariables = Exact<{
  model: Scalars['String']['input'];
}>;


export type GetFilterFieldsQuery = { __typename?: 'Query', filterFields: Array<{ __typename?: 'FilterField', field: string, label: string, type: string, relationModel?: string | null, dependsOn?: string | null }> };

export type GetItemByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type GetItemByIdQuery = { __typename?: 'Query', itemsById?: { __typename?: 'ItemsInDB', ItemID: number, CompanyID: number, BranchID: number, BrandID: number, ItemCode: string, ItemDescription: string, ItemCategoryID: number, ItemSubcategoryID: number, SupplierID: number, ControlStock: boolean, ReplenishmentStock: number, IsOffer: boolean, OEM?: string | null, LastModified?: any | null, WarehouseID: number, IsActive: boolean } | null };

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

export type GetItemsFormDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsFormDataQuery = { __typename?: 'Query', brands: Array<{ __typename?: 'BrandsInDB', BrandID: number, BrandName: string }>, categories: Array<{ __typename?: 'ItemCategoriesInDB', ItemCategoryID: number, CategoryName: string }>, subcategories: Array<{ __typename?: 'ItemSubcategoriesInDB', ItemSubcategoryID: number, ItemCategoryID: number, SubcategoryName: string }>, suppliers: Array<{ __typename?: 'SuppliersInDB', SupplierID: number, FirstName: string, LastName?: string | null }> };

export type GetOrderByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  branchId: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', ordersById?: { __typename?: 'OrdersInDB', OrderID: number, CompanyID: number, BranchID: number, OrderDate: any, ClientID: number, CarID?: number | null, IsService?: boolean | null, ServiceTypeID?: number | null, Mileage?: number | null, NextServiceMileage?: number | null, Notes?: string | null, SaleConditionID?: number | null, DiscountID?: number | null, Subtotal: number, Total: number, TotalTaxAmount: number, UserID?: number | null, DocumentID?: number | null, PriceListID?: number | null, OrderStatusID?: number | null, WarehouseID?: number | null, Items?: Array<{ __typename?: 'OrderDetailsInDB', OrderDetailID: number, ItemID: number, Quantity: number, UnitPrice: number, LineDescription?: string | null }> | null } | null };

export type GetPriceListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPriceListsQuery = { __typename?: 'Query', allPricelists: Array<{ __typename?: 'PriceListsInDB', PriceListID: number, PriceListName: string, PriceListDescription?: string | null, IsActive?: boolean | null }> };

export type GetPricelistByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
}>;


export type GetPricelistByIdQuery = { __typename?: 'Query', pricelistsById?: { __typename?: 'PriceListsInDB', PriceListID: number, PriceListName: string, PriceListDescription?: string | null, IsActive?: boolean | null } | null };

export type GetPricelistItemsFilteredQueryVariables = Exact<{
  priceListID?: InputMaybe<Scalars['Int']['input']>;
  itemID?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPricelistItemsFilteredQuery = { __typename?: 'Query', pricelistitemsFiltered: Array<{ __typename?: 'PriceListItemsInDB', PriceListID: number, ItemID: number, Price: number, EffectiveDate: any, PriceListData?: { __typename?: 'PriceListsInDB', PriceListName: string, PriceListDescription?: string | null } | null }> };

export type GetProvincesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProvincesQuery = { __typename?: 'Query', allProvinces: Array<{ __typename?: 'ProvincesInDB', ProvinceID: number, CountryID: number, ProvinceName: string }> };

export type GetProvincesByCountryQueryVariables = Exact<{
  countryID: Scalars['Int']['input'];
}>;


export type GetProvincesByCountryQuery = { __typename?: 'Query', provincesByCountry: Array<{ __typename?: 'ProvincesInDB', ProvinceID: number, ProvinceName: string, CountryID: number }> };

export type GetRelationsQueryVariables = Exact<{
  Branch?: InputMaybe<Scalars['Boolean']['input']>;
  Company?: InputMaybe<Scalars['Boolean']['input']>;
  Country?: InputMaybe<Scalars['Boolean']['input']>;
  CreditCard?: InputMaybe<Scalars['Boolean']['input']>;
  DocType?: InputMaybe<Scalars['Boolean']['input']>;
  Pricelist?: InputMaybe<Scalars['Boolean']['input']>;
  Province?: InputMaybe<Scalars['Boolean']['input']>;
  Vendor?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetRelationsQuery = { __typename?: 'Query', Branch?: Array<{ __typename?: 'BranchesInDB', BranchID: number, CompanyID: number, BranchName: string }>, Company?: Array<{ __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null }>, Country?: Array<{ __typename?: 'CountriesInDB', CountryID: number, CountryName: string }>, CreditCard?: Array<{ __typename?: 'CreditCardsInDB', CreditCardID: number, CreditCardGroupID: number, CardName: string }>, DocType?: Array<{ __typename?: 'SysIdentityDocTypesInDB', DocTypeID: number, DocTypeName: string }>, PriceList?: Array<{ __typename?: 'PriceListsInDB', PriceListID: number, PriceListName: string }>, Province?: Array<{ __typename?: 'ProvincesInDB', ProvinceID: number, CountryID: number, ProvinceName: string }>, Vendor?: Array<{ __typename?: 'VendorsInDB', VendorID: number, VendorName: string }> };

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
  companyId: Scalars['Int']['input'];
}>;


export type GetServicetypeByIdQuery = { __typename?: 'Query', servicetypesById?: { __typename?: 'ServiceTypeInDB', ServiceTypeID: number, ServiceTypeName?: string | null } | null };

export type GetSupplierFormDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSupplierFormDataQuery = { __typename?: 'Query', docTypes: Array<{ __typename?: 'SysIdentityDocTypesInDB', DocTypeID: number, DocTypeName: string }>, countries: Array<{ __typename?: 'CountriesInDB', CountryID: number, CountryName: string }>, provinces: Array<{ __typename?: 'ProvincesInDB', ProvinceID: number, CountryID: number, ProvinceName: string }>, companies: Array<{ __typename?: 'CompanyInDB', CompanyID: number, CompanyName?: string | null }> };

export type GetSuppliersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSuppliersQuery = { __typename?: 'Query', allSuppliers: Array<{ __typename?: 'SuppliersInDB', SupplierID: number, DocTypeID?: number | null, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, IsActive?: boolean | null, CountryID?: number | null, ProvinceID?: number | null, City?: string | null, PostalCode?: string | null }> };

export type GetSuppliersByCompanyQueryVariables = Exact<{
  companyID: Scalars['Int']['input'];
}>;


export type GetSuppliersByCompanyQuery = { __typename?: 'Query', suppliersByCompany: Array<{ __typename?: 'SuppliersInDB', SupplierID: number, DocTypeID?: number | null, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, Address?: string | null, IsActive?: boolean | null, CountryID?: number | null, ProvinceID?: number | null, City?: string | null, PostalCode?: string | null, CompanyID?: number | null }> };

export type GetSuppliersByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetSuppliersByIdQuery = { __typename?: 'Query', suppliersById?: { __typename?: 'SuppliersInDB', SupplierID: number, Address?: string | null, City?: string | null, CompanyID?: number | null, CountryID?: number | null, DocNumber?: string | null, DocTypeID?: number | null, Email?: string | null, FirstName: string, IsActive?: boolean | null, LastName?: string | null, Phone?: string | null, PostalCode?: string | null, ProvinceID?: number | null } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', usersById?: { __typename?: 'UsersInDB', UserID: number, Nickname?: string | null, FullName?: string | null, IsActive?: boolean | null } | null };

export type GetUserpermissionsByIdQueryVariables = Exact<{
  userID: Scalars['Int']['input'];
  companyID: Scalars['Int']['input'];
  branchID: Scalars['Int']['input'];
  roleID: Scalars['Int']['input'];
}>;


export type GetUserpermissionsByIdQuery = { __typename?: 'Query', userpermissionsById?: { __typename?: 'UserPermissionsInDB', UserID: number, CompanyID: number, BranchID: number, RoleID: number, UserData?: { __typename?: 'UsersInDB', Nickname?: string | null, FullName?: string | null } | null, CompanyData?: { __typename?: 'CompanyInDB', CompanyName?: string | null } | null, RoleData?: { __typename?: 'RolesInDB', RoleName: string } | null, BranchData?: { __typename?: 'BranchesInDB', BranchName: string } | null } | null };

export type GetVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorsQuery = { __typename?: 'Query', allVendors: Array<{ __typename?: 'VendorsInDB', VendorID: number, VendorName: string, Commission?: number | null, IsActive: boolean }> };

export type GetWarehouseByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetWarehouseByIdQuery = { __typename?: 'Query', warehousesById?: { __typename?: 'WarehousesInDB', WarehouseID: number, WarehouseName: string, Address?: string | null } | null };

export type GetWarehousesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWarehousesQuery = { __typename?: 'Query', allWarehouses: Array<{ __typename?: 'WarehousesInDB', WarehouseID: number, WarehouseName: string, Address?: string | null }> };

export type SearchClientsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SearchClientsQuery = { __typename?: 'Query', allClients: Array<{ __typename?: 'ClientsInDB', ClientID: number, DocNumber?: string | null, FirstName: string, LastName?: string | null, Phone?: string | null, Email?: string | null, City?: string | null, IsActive?: boolean | null }> };

export type SearchItemsQueryVariables = Exact<{
  filters?: InputMaybe<ItemFilters>;
  pagination?: InputMaybe<ItemPagination>;
}>;


export type SearchItemsQuery = { __typename?: 'Query', searchItems: { __typename?: 'ItemsResponse', items: Array<{ __typename?: 'ItemSearchResult', ItemDescription: string, ItemCode: string, ItemID: number, Price?: number | null, StockQuantity?: number | null }> } };


export const CreateBranchDocument = gql`
    mutation CreateBranch($input: BranchesCreate!) {
  createBranch(data: $input) {
    BranchID
    CompanyID
    BranchName
  }
}
    `;
export type CreateBranchMutationFn = Apollo.MutationFunction<CreateBranchMutation, CreateBranchMutationVariables>;

/**
 * __useCreateBranchMutation__
 *
 * To run a mutation, you first call `useCreateBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBranchMutation, { data, loading, error }] = useCreateBranchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBranchMutation(baseOptions?: Apollo.MutationHookOptions<CreateBranchMutation, CreateBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBranchMutation, CreateBranchMutationVariables>(CreateBranchDocument, options);
      }
export type CreateBranchMutationHookResult = ReturnType<typeof useCreateBranchMutation>;
export type CreateBranchMutationResult = Apollo.MutationResult<CreateBranchMutation>;
export type CreateBranchMutationOptions = Apollo.BaseMutationOptions<CreateBranchMutation, CreateBranchMutationVariables>;
export const CreateCarDocument = gql`
    mutation CreateCar($input: CarsCreate!) {
  createCar(data: $input) {
    CarID
    LicensePlate
    Year
    CarModelID
    ClientID
    LastServiceMileage
    IsDebtor
    DiscountID
  }
}
    `;
export type CreateCarMutationFn = Apollo.MutationFunction<CreateCarMutation, CreateCarMutationVariables>;

/**
 * __useCreateCarMutation__
 *
 * To run a mutation, you first call `useCreateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCarMutation, { data, loading, error }] = useCreateCarMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCarMutation(baseOptions?: Apollo.MutationHookOptions<CreateCarMutation, CreateCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCarMutation, CreateCarMutationVariables>(CreateCarDocument, options);
      }
export type CreateCarMutationHookResult = ReturnType<typeof useCreateCarMutation>;
export type CreateCarMutationResult = Apollo.MutationResult<CreateCarMutation>;
export type CreateCarMutationOptions = Apollo.BaseMutationOptions<CreateCarMutation, CreateCarMutationVariables>;
export const CreateCarBrandDocument = gql`
    mutation CreateCarBrand($input: CarBrandsCreate!) {
  createCarbrand(data: $input) {
    CarBrandID
    CarBrandName
  }
}
    `;
export type CreateCarBrandMutationFn = Apollo.MutationFunction<CreateCarBrandMutation, CreateCarBrandMutationVariables>;

/**
 * __useCreateCarBrandMutation__
 *
 * To run a mutation, you first call `useCreateCarBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCarBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCarBrandMutation, { data, loading, error }] = useCreateCarBrandMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCarBrandMutation(baseOptions?: Apollo.MutationHookOptions<CreateCarBrandMutation, CreateCarBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCarBrandMutation, CreateCarBrandMutationVariables>(CreateCarBrandDocument, options);
      }
export type CreateCarBrandMutationHookResult = ReturnType<typeof useCreateCarBrandMutation>;
export type CreateCarBrandMutationResult = Apollo.MutationResult<CreateCarBrandMutation>;
export type CreateCarBrandMutationOptions = Apollo.BaseMutationOptions<CreateCarBrandMutation, CreateCarBrandMutationVariables>;
export const CreateCarModelDocument = gql`
    mutation CreateCarModel($input: CarModelsCreate!) {
  createCarmodel(data: $input) {
    CarModelID
    CarBrandID
    CarModelName
  }
}
    `;
export type CreateCarModelMutationFn = Apollo.MutationFunction<CreateCarModelMutation, CreateCarModelMutationVariables>;

/**
 * __useCreateCarModelMutation__
 *
 * To run a mutation, you first call `useCreateCarModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCarModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCarModelMutation, { data, loading, error }] = useCreateCarModelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCarModelMutation(baseOptions?: Apollo.MutationHookOptions<CreateCarModelMutation, CreateCarModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCarModelMutation, CreateCarModelMutationVariables>(CreateCarModelDocument, options);
      }
export type CreateCarModelMutationHookResult = ReturnType<typeof useCreateCarModelMutation>;
export type CreateCarModelMutationResult = Apollo.MutationResult<CreateCarModelMutation>;
export type CreateCarModelMutationOptions = Apollo.BaseMutationOptions<CreateCarModelMutation, CreateCarModelMutationVariables>;
export const CreateCashboxDocument = gql`
    mutation CreateCashbox($input: CashBoxesCreate!) {
  createCashbox(data: $input) {
    CashBoxID
    CompanyID
    BranchID
    Name
    Description
    IsActive
    OpenDate
    CloseDate
    InitialBalance
    CurrentBalance
    UserID
    Notes
  }
}
    `;
export type CreateCashboxMutationFn = Apollo.MutationFunction<CreateCashboxMutation, CreateCashboxMutationVariables>;

/**
 * __useCreateCashboxMutation__
 *
 * To run a mutation, you first call `useCreateCashboxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCashboxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCashboxMutation, { data, loading, error }] = useCreateCashboxMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCashboxMutation(baseOptions?: Apollo.MutationHookOptions<CreateCashboxMutation, CreateCashboxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCashboxMutation, CreateCashboxMutationVariables>(CreateCashboxDocument, options);
      }
export type CreateCashboxMutationHookResult = ReturnType<typeof useCreateCashboxMutation>;
export type CreateCashboxMutationResult = Apollo.MutationResult<CreateCashboxMutation>;
export type CreateCashboxMutationOptions = Apollo.BaseMutationOptions<CreateCashboxMutation, CreateCashboxMutationVariables>;
export const CreateCashboxmovementDocument = gql`
    mutation CreateCashboxmovement($input: CashBoxMovementsCreate!) {
  createCashboxmovement(data: $input) {
    CashBoxMovementID
    CashBoxID
    CompanyID
    BranchID
    MovementDate
    Amount
    MovementType
    Description
    UserID
    Notes
  }
}
    `;
export type CreateCashboxmovementMutationFn = Apollo.MutationFunction<CreateCashboxmovementMutation, CreateCashboxmovementMutationVariables>;

/**
 * __useCreateCashboxmovementMutation__
 *
 * To run a mutation, you first call `useCreateCashboxmovementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCashboxmovementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCashboxmovementMutation, { data, loading, error }] = useCreateCashboxmovementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCashboxmovementMutation(baseOptions?: Apollo.MutationHookOptions<CreateCashboxmovementMutation, CreateCashboxmovementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCashboxmovementMutation, CreateCashboxmovementMutationVariables>(CreateCashboxmovementDocument, options);
      }
export type CreateCashboxmovementMutationHookResult = ReturnType<typeof useCreateCashboxmovementMutation>;
export type CreateCashboxmovementMutationResult = Apollo.MutationResult<CreateCashboxmovementMutation>;
export type CreateCashboxmovementMutationOptions = Apollo.BaseMutationOptions<CreateCashboxmovementMutation, CreateCashboxmovementMutationVariables>;
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
export const CreateCompanyDocument = gql`
    mutation CreateCompany($input: CompanyCreate!) {
  createCompany(data: $input) {
    CompanyID
    CompanyName
    Address
    CUIT
    Grossincome
    Startdate
    Logo
  }
}
    `;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const CreateCreditCardDocument = gql`
    mutation CreateCreditCard($input: CreditCardsCreate!) {
  createCreditcard(data: $input) {
    CreditCardID
    CreditCardGroupID
    CardName
    Surcharge
    Installments
    IsActive
  }
}
    `;
export type CreateCreditCardMutationFn = Apollo.MutationFunction<CreateCreditCardMutation, CreateCreditCardMutationVariables>;

/**
 * __useCreateCreditCardMutation__
 *
 * To run a mutation, you first call `useCreateCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCreditCardMutation, { data, loading, error }] = useCreateCreditCardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCreditCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateCreditCardMutation, CreateCreditCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCreditCardMutation, CreateCreditCardMutationVariables>(CreateCreditCardDocument, options);
      }
export type CreateCreditCardMutationHookResult = ReturnType<typeof useCreateCreditCardMutation>;
export type CreateCreditCardMutationResult = Apollo.MutationResult<CreateCreditCardMutation>;
export type CreateCreditCardMutationOptions = Apollo.BaseMutationOptions<CreateCreditCardMutation, CreateCreditCardMutationVariables>;
export const CreateCreditCardGroupDocument = gql`
    mutation CreateCreditCardGroup($input: CreditCardGroupsCreate!) {
  createCreditcardgroup(data: $input) {
    CreditCardGroupID
    GroupName
  }
}
    `;
export type CreateCreditCardGroupMutationFn = Apollo.MutationFunction<CreateCreditCardGroupMutation, CreateCreditCardGroupMutationVariables>;

/**
 * __useCreateCreditCardGroupMutation__
 *
 * To run a mutation, you first call `useCreateCreditCardGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCreditCardGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCreditCardGroupMutation, { data, loading, error }] = useCreateCreditCardGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCreditCardGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateCreditCardGroupMutation, CreateCreditCardGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCreditCardGroupMutation, CreateCreditCardGroupMutationVariables>(CreateCreditCardGroupDocument, options);
      }
export type CreateCreditCardGroupMutationHookResult = ReturnType<typeof useCreateCreditCardGroupMutation>;
export type CreateCreditCardGroupMutationResult = Apollo.MutationResult<CreateCreditCardGroupMutation>;
export type CreateCreditCardGroupMutationOptions = Apollo.BaseMutationOptions<CreateCreditCardGroupMutation, CreateCreditCardGroupMutationVariables>;
export const CreateDiscountDocument = gql`
    mutation CreateDiscount($input: DiscountsCreate!) {
  createDiscount(data: $input) {
    DiscountID
    DiscountName
    Percentage
  }
}
    `;
export type CreateDiscountMutationFn = Apollo.MutationFunction<CreateDiscountMutation, CreateDiscountMutationVariables>;

/**
 * __useCreateDiscountMutation__
 *
 * To run a mutation, you first call `useCreateDiscountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDiscountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDiscountMutation, { data, loading, error }] = useCreateDiscountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDiscountMutation(baseOptions?: Apollo.MutationHookOptions<CreateDiscountMutation, CreateDiscountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDiscountMutation, CreateDiscountMutationVariables>(CreateDiscountDocument, options);
      }
export type CreateDiscountMutationHookResult = ReturnType<typeof useCreateDiscountMutation>;
export type CreateDiscountMutationResult = Apollo.MutationResult<CreateDiscountMutation>;
export type CreateDiscountMutationOptions = Apollo.BaseMutationOptions<CreateDiscountMutation, CreateDiscountMutationVariables>;
export const CreateDocumentDocument = gql`
    mutation CreateDocument($input: CommercialDocumentsCreate!) {
  createDocument(data: $input) {
    DocumentID
    CompanyID
    BranchID
    DocumentTypeID
    DocumentDescription
    DocumentNumber
    PointOfSale
    IsActive
    IsTest
    ShouldAccount
    AffectsStock
    IsFiscal
    IsElectronic
    IsManual
    IsQuotation
    MaxItems
  }
}
    `;
export type CreateDocumentMutationFn = Apollo.MutationFunction<CreateDocumentMutation, CreateDocumentMutationVariables>;

/**
 * __useCreateDocumentMutation__
 *
 * To run a mutation, you first call `useCreateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentMutation, { data, loading, error }] = useCreateDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDocumentMutation(baseOptions?: Apollo.MutationHookOptions<CreateDocumentMutation, CreateDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDocumentMutation, CreateDocumentMutationVariables>(CreateDocumentDocument, options);
      }
export type CreateDocumentMutationHookResult = ReturnType<typeof useCreateDocumentMutation>;
export type CreateDocumentMutationResult = Apollo.MutationResult<CreateDocumentMutation>;
export type CreateDocumentMutationOptions = Apollo.BaseMutationOptions<CreateDocumentMutation, CreateDocumentMutationVariables>;
export const CreateItemDocument = gql`
    mutation CreateItem($input: ItemsCreate!) {
  createItem(data: $input) {
    ItemID
    ItemCode
  }
}
    `;
export type CreateItemMutationFn = Apollo.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const CreateItemCategoryDocument = gql`
    mutation CreateItemCategory($input: ItemCategoriesCreate!) {
  createItemcategory(data: $input) {
    ItemCategoryID
    CategoryName
  }
}
    `;
export type CreateItemCategoryMutationFn = Apollo.MutationFunction<CreateItemCategoryMutation, CreateItemCategoryMutationVariables>;

/**
 * __useCreateItemCategoryMutation__
 *
 * To run a mutation, you first call `useCreateItemCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemCategoryMutation, { data, loading, error }] = useCreateItemCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateItemCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemCategoryMutation, CreateItemCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemCategoryMutation, CreateItemCategoryMutationVariables>(CreateItemCategoryDocument, options);
      }
export type CreateItemCategoryMutationHookResult = ReturnType<typeof useCreateItemCategoryMutation>;
export type CreateItemCategoryMutationResult = Apollo.MutationResult<CreateItemCategoryMutation>;
export type CreateItemCategoryMutationOptions = Apollo.BaseMutationOptions<CreateItemCategoryMutation, CreateItemCategoryMutationVariables>;
export const CreateItemSubcategoryDocument = gql`
    mutation CreateItemSubcategory($input: ItemSubcategoriesCreate!) {
  createItemsubcategory(data: $input) {
    ItemSubcategoryID
    ItemCategoryID
    SubcategoryName
  }
}
    `;
export type CreateItemSubcategoryMutationFn = Apollo.MutationFunction<CreateItemSubcategoryMutation, CreateItemSubcategoryMutationVariables>;

/**
 * __useCreateItemSubcategoryMutation__
 *
 * To run a mutation, you first call `useCreateItemSubcategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemSubcategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemSubcategoryMutation, { data, loading, error }] = useCreateItemSubcategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateItemSubcategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemSubcategoryMutation, CreateItemSubcategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemSubcategoryMutation, CreateItemSubcategoryMutationVariables>(CreateItemSubcategoryDocument, options);
      }
export type CreateItemSubcategoryMutationHookResult = ReturnType<typeof useCreateItemSubcategoryMutation>;
export type CreateItemSubcategoryMutationResult = Apollo.MutationResult<CreateItemSubcategoryMutation>;
export type CreateItemSubcategoryMutationOptions = Apollo.BaseMutationOptions<CreateItemSubcategoryMutation, CreateItemSubcategoryMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: OrdersCreate!) {
  createOrder(data: $input) {
    order {
      OrderID
      CompanyID
      BranchID
      OrderDate
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
      TotalTaxAmount
      UserID
      DocumentID
      PriceListID
      OrderStatusID
      WarehouseID
    }
    sessionID
    message
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreatePricelistDocument = gql`
    mutation CreatePricelist($input: PriceListsCreate!) {
  createPricelist(data: $input) {
    PriceListID
    PriceListName
    PriceListDescription
    IsActive
  }
}
    `;
export type CreatePricelistMutationFn = Apollo.MutationFunction<CreatePricelistMutation, CreatePricelistMutationVariables>;

/**
 * __useCreatePricelistMutation__
 *
 * To run a mutation, you first call `useCreatePricelistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePricelistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPricelistMutation, { data, loading, error }] = useCreatePricelistMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePricelistMutation(baseOptions?: Apollo.MutationHookOptions<CreatePricelistMutation, CreatePricelistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePricelistMutation, CreatePricelistMutationVariables>(CreatePricelistDocument, options);
      }
export type CreatePricelistMutationHookResult = ReturnType<typeof useCreatePricelistMutation>;
export type CreatePricelistMutationResult = Apollo.MutationResult<CreatePricelistMutation>;
export type CreatePricelistMutationOptions = Apollo.BaseMutationOptions<CreatePricelistMutation, CreatePricelistMutationVariables>;
export const CreatePricelistItemDocument = gql`
    mutation CreatePricelistItem($input: PriceListItemsCreate!) {
  createPricelistitem(data: $input) {
    PriceListID
    ItemID
    Price
    EffectiveDate
  }
}
    `;
export type CreatePricelistItemMutationFn = Apollo.MutationFunction<CreatePricelistItemMutation, CreatePricelistItemMutationVariables>;

/**
 * __useCreatePricelistItemMutation__
 *
 * To run a mutation, you first call `useCreatePricelistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePricelistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPricelistItemMutation, { data, loading, error }] = useCreatePricelistItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePricelistItemMutation(baseOptions?: Apollo.MutationHookOptions<CreatePricelistItemMutation, CreatePricelistItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePricelistItemMutation, CreatePricelistItemMutationVariables>(CreatePricelistItemDocument, options);
      }
export type CreatePricelistItemMutationHookResult = ReturnType<typeof useCreatePricelistItemMutation>;
export type CreatePricelistItemMutationResult = Apollo.MutationResult<CreatePricelistItemMutation>;
export type CreatePricelistItemMutationOptions = Apollo.BaseMutationOptions<CreatePricelistItemMutation, CreatePricelistItemMutationVariables>;
export const CreateRoleDocument = gql`
    mutation CreateRole($input: RolesCreate!) {
  createRole(data: $input) {
    RoleID
    RoleName
  }
}
    `;
export type CreateRoleMutationFn = Apollo.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, options);
      }
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>;
export type CreateRoleMutationResult = Apollo.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables>;
export const CreateSaleConditionDocument = gql`
    mutation CreateSaleCondition($input: SaleConditionsCreate!) {
  createSalecondition(data: $input) {
    SaleConditionID
    CreditCardID
    Name
    DueDate
    Surcharge
    IsActive
  }
}
    `;
export type CreateSaleConditionMutationFn = Apollo.MutationFunction<CreateSaleConditionMutation, CreateSaleConditionMutationVariables>;

/**
 * __useCreateSaleConditionMutation__
 *
 * To run a mutation, you first call `useCreateSaleConditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSaleConditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSaleConditionMutation, { data, loading, error }] = useCreateSaleConditionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSaleConditionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSaleConditionMutation, CreateSaleConditionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSaleConditionMutation, CreateSaleConditionMutationVariables>(CreateSaleConditionDocument, options);
      }
export type CreateSaleConditionMutationHookResult = ReturnType<typeof useCreateSaleConditionMutation>;
export type CreateSaleConditionMutationResult = Apollo.MutationResult<CreateSaleConditionMutation>;
export type CreateSaleConditionMutationOptions = Apollo.BaseMutationOptions<CreateSaleConditionMutation, CreateSaleConditionMutationVariables>;
export const CreateServicetypeDocument = gql`
    mutation CreateServicetype($input: ServiceTypeCreate!) {
  createServicetype(data: $input) {
    ServiceTypeID
    ServiceTypeName
  }
}
    `;
export type CreateServicetypeMutationFn = Apollo.MutationFunction<CreateServicetypeMutation, CreateServicetypeMutationVariables>;

/**
 * __useCreateServicetypeMutation__
 *
 * To run a mutation, you first call `useCreateServicetypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServicetypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServicetypeMutation, { data, loading, error }] = useCreateServicetypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateServicetypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateServicetypeMutation, CreateServicetypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServicetypeMutation, CreateServicetypeMutationVariables>(CreateServicetypeDocument, options);
      }
export type CreateServicetypeMutationHookResult = ReturnType<typeof useCreateServicetypeMutation>;
export type CreateServicetypeMutationResult = Apollo.MutationResult<CreateServicetypeMutation>;
export type CreateServicetypeMutationOptions = Apollo.BaseMutationOptions<CreateServicetypeMutation, CreateServicetypeMutationVariables>;
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
export const CreateUserRecordDocument = gql`
    mutation CreateUserRecord($input: UserCreate!) {
  createUserRecord(data: $input) {
    UserID
    Nickname
    FullName
    IsActive
  }
}
    `;
export type CreateUserRecordMutationFn = Apollo.MutationFunction<CreateUserRecordMutation, CreateUserRecordMutationVariables>;

/**
 * __useCreateUserRecordMutation__
 *
 * To run a mutation, you first call `useCreateUserRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserRecordMutation, { data, loading, error }] = useCreateUserRecordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserRecordMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserRecordMutation, CreateUserRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserRecordMutation, CreateUserRecordMutationVariables>(CreateUserRecordDocument, options);
      }
export type CreateUserRecordMutationHookResult = ReturnType<typeof useCreateUserRecordMutation>;
export type CreateUserRecordMutationResult = Apollo.MutationResult<CreateUserRecordMutation>;
export type CreateUserRecordMutationOptions = Apollo.BaseMutationOptions<CreateUserRecordMutation, CreateUserRecordMutationVariables>;
export const CreateUseraccessDocument = gql`
    mutation CreateUseraccess($input: UserPermissionsCreate!) {
  createUserpermissions(data: $input) {
    UserID
    CompanyID
    BranchID
    RoleID
  }
}
    `;
export type CreateUseraccessMutationFn = Apollo.MutationFunction<CreateUseraccessMutation, CreateUseraccessMutationVariables>;

/**
 * __useCreateUseraccessMutation__
 *
 * To run a mutation, you first call `useCreateUseraccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUseraccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUseraccessMutation, { data, loading, error }] = useCreateUseraccessMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUseraccessMutation(baseOptions?: Apollo.MutationHookOptions<CreateUseraccessMutation, CreateUseraccessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUseraccessMutation, CreateUseraccessMutationVariables>(CreateUseraccessDocument, options);
      }
export type CreateUseraccessMutationHookResult = ReturnType<typeof useCreateUseraccessMutation>;
export type CreateUseraccessMutationResult = Apollo.MutationResult<CreateUseraccessMutation>;
export type CreateUseraccessMutationOptions = Apollo.BaseMutationOptions<CreateUseraccessMutation, CreateUseraccessMutationVariables>;
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
export const CreateWarehouseDocument = gql`
    mutation CreateWarehouse($input: WarehousesCreate!) {
  createWarehouse(data: $input) {
    WarehouseID
    WarehouseName
    Address
  }
}
    `;
export type CreateWarehouseMutationFn = Apollo.MutationFunction<CreateWarehouseMutation, CreateWarehouseMutationVariables>;

/**
 * __useCreateWarehouseMutation__
 *
 * To run a mutation, you first call `useCreateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWarehouseMutation, { data, loading, error }] = useCreateWarehouseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<CreateWarehouseMutation, CreateWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWarehouseMutation, CreateWarehouseMutationVariables>(CreateWarehouseDocument, options);
      }
export type CreateWarehouseMutationHookResult = ReturnType<typeof useCreateWarehouseMutation>;
export type CreateWarehouseMutationResult = Apollo.MutationResult<CreateWarehouseMutation>;
export type CreateWarehouseMutationOptions = Apollo.BaseMutationOptions<CreateWarehouseMutation, CreateWarehouseMutationVariables>;
export const DeleteBranchDocument = gql`
    mutation DeleteBranch($companyID: Int!, $branchID: Int!) {
  deleteBranch(companyID: $companyID, branchID: $branchID)
}
    `;
export type DeleteBranchMutationFn = Apollo.MutationFunction<DeleteBranchMutation, DeleteBranchMutationVariables>;

/**
 * __useDeleteBranchMutation__
 *
 * To run a mutation, you first call `useDeleteBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBranchMutation, { data, loading, error }] = useDeleteBranchMutation({
 *   variables: {
 *      companyID: // value for 'companyID'
 *      branchID: // value for 'branchID'
 *   },
 * });
 */
export function useDeleteBranchMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBranchMutation, DeleteBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBranchMutation, DeleteBranchMutationVariables>(DeleteBranchDocument, options);
      }
export type DeleteBranchMutationHookResult = ReturnType<typeof useDeleteBranchMutation>;
export type DeleteBranchMutationResult = Apollo.MutationResult<DeleteBranchMutation>;
export type DeleteBranchMutationOptions = Apollo.BaseMutationOptions<DeleteBranchMutation, DeleteBranchMutationVariables>;
export const DeleteCarDocument = gql`
    mutation DeleteCar($carID: Int!, $companyId: Int!) {
  deleteCar(carID: $carID, companyID: $companyId)
}
    `;
export type DeleteCarMutationFn = Apollo.MutationFunction<DeleteCarMutation, DeleteCarMutationVariables>;

/**
 * __useDeleteCarMutation__
 *
 * To run a mutation, you first call `useDeleteCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCarMutation, { data, loading, error }] = useDeleteCarMutation({
 *   variables: {
 *      carID: // value for 'carID'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useDeleteCarMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCarMutation, DeleteCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCarMutation, DeleteCarMutationVariables>(DeleteCarDocument, options);
      }
export type DeleteCarMutationHookResult = ReturnType<typeof useDeleteCarMutation>;
export type DeleteCarMutationResult = Apollo.MutationResult<DeleteCarMutation>;
export type DeleteCarMutationOptions = Apollo.BaseMutationOptions<DeleteCarMutation, DeleteCarMutationVariables>;
export const DeleteCarBrandDocument = gql`
    mutation DeleteCarBrand($carBrandID: Int!, $companyId: Int!) {
  deleteCarbrand(carBrandID: $carBrandID, companyID: $companyId)
}
    `;
export type DeleteCarBrandMutationFn = Apollo.MutationFunction<DeleteCarBrandMutation, DeleteCarBrandMutationVariables>;

/**
 * __useDeleteCarBrandMutation__
 *
 * To run a mutation, you first call `useDeleteCarBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCarBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCarBrandMutation, { data, loading, error }] = useDeleteCarBrandMutation({
 *   variables: {
 *      carBrandID: // value for 'carBrandID'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useDeleteCarBrandMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCarBrandMutation, DeleteCarBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCarBrandMutation, DeleteCarBrandMutationVariables>(DeleteCarBrandDocument, options);
      }
export type DeleteCarBrandMutationHookResult = ReturnType<typeof useDeleteCarBrandMutation>;
export type DeleteCarBrandMutationResult = Apollo.MutationResult<DeleteCarBrandMutation>;
export type DeleteCarBrandMutationOptions = Apollo.BaseMutationOptions<DeleteCarBrandMutation, DeleteCarBrandMutationVariables>;
export const DeleteCarModelDocument = gql`
    mutation DeleteCarModel($carModelID: Int!, $carBrandId: Int!, $companyId: Int!) {
  deleteCarmodel(
    carModelID: $carModelID
    carBrandID: $carBrandId
    companyID: $companyId
  )
}
    `;
export type DeleteCarModelMutationFn = Apollo.MutationFunction<DeleteCarModelMutation, DeleteCarModelMutationVariables>;

/**
 * __useDeleteCarModelMutation__
 *
 * To run a mutation, you first call `useDeleteCarModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCarModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCarModelMutation, { data, loading, error }] = useDeleteCarModelMutation({
 *   variables: {
 *      carModelID: // value for 'carModelID'
 *      carBrandId: // value for 'carBrandId'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useDeleteCarModelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCarModelMutation, DeleteCarModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCarModelMutation, DeleteCarModelMutationVariables>(DeleteCarModelDocument, options);
      }
export type DeleteCarModelMutationHookResult = ReturnType<typeof useDeleteCarModelMutation>;
export type DeleteCarModelMutationResult = Apollo.MutationResult<DeleteCarModelMutation>;
export type DeleteCarModelMutationOptions = Apollo.BaseMutationOptions<DeleteCarModelMutation, DeleteCarModelMutationVariables>;
export const DeleteCashboxDocument = gql`
    mutation DeleteCashbox($cashBoxID: Int!) {
  deleteCashbox(cashBoxID: $cashBoxID)
}
    `;
export type DeleteCashboxMutationFn = Apollo.MutationFunction<DeleteCashboxMutation, DeleteCashboxMutationVariables>;

/**
 * __useDeleteCashboxMutation__
 *
 * To run a mutation, you first call `useDeleteCashboxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCashboxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCashboxMutation, { data, loading, error }] = useDeleteCashboxMutation({
 *   variables: {
 *      cashBoxID: // value for 'cashBoxID'
 *   },
 * });
 */
export function useDeleteCashboxMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCashboxMutation, DeleteCashboxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCashboxMutation, DeleteCashboxMutationVariables>(DeleteCashboxDocument, options);
      }
export type DeleteCashboxMutationHookResult = ReturnType<typeof useDeleteCashboxMutation>;
export type DeleteCashboxMutationResult = Apollo.MutationResult<DeleteCashboxMutation>;
export type DeleteCashboxMutationOptions = Apollo.BaseMutationOptions<DeleteCashboxMutation, DeleteCashboxMutationVariables>;
export const DeleteCashboxmovementDocument = gql`
    mutation DeleteCashboxmovement($movementID: Int!) {
  deleteCashboxmovement(movementID: $movementID)
}
    `;
export type DeleteCashboxmovementMutationFn = Apollo.MutationFunction<DeleteCashboxmovementMutation, DeleteCashboxmovementMutationVariables>;

/**
 * __useDeleteCashboxmovementMutation__
 *
 * To run a mutation, you first call `useDeleteCashboxmovementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCashboxmovementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCashboxmovementMutation, { data, loading, error }] = useDeleteCashboxmovementMutation({
 *   variables: {
 *      movementID: // value for 'movementID'
 *   },
 * });
 */
export function useDeleteCashboxmovementMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCashboxmovementMutation, DeleteCashboxmovementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCashboxmovementMutation, DeleteCashboxmovementMutationVariables>(DeleteCashboxmovementDocument, options);
      }
export type DeleteCashboxmovementMutationHookResult = ReturnType<typeof useDeleteCashboxmovementMutation>;
export type DeleteCashboxmovementMutationResult = Apollo.MutationResult<DeleteCashboxmovementMutation>;
export type DeleteCashboxmovementMutationOptions = Apollo.BaseMutationOptions<DeleteCashboxmovementMutation, DeleteCashboxmovementMutationVariables>;
export const DeleteCompanyDocument = gql`
    mutation DeleteCompany($companyID: Int!) {
  deleteCompany(companyID: $companyID)
}
    `;
export type DeleteCompanyMutationFn = Apollo.MutationFunction<DeleteCompanyMutation, DeleteCompanyMutationVariables>;

/**
 * __useDeleteCompanyMutation__
 *
 * To run a mutation, you first call `useDeleteCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCompanyMutation, { data, loading, error }] = useDeleteCompanyMutation({
 *   variables: {
 *      companyID: // value for 'companyID'
 *   },
 * });
 */
export function useDeleteCompanyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCompanyMutation, DeleteCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCompanyMutation, DeleteCompanyMutationVariables>(DeleteCompanyDocument, options);
      }
export type DeleteCompanyMutationHookResult = ReturnType<typeof useDeleteCompanyMutation>;
export type DeleteCompanyMutationResult = Apollo.MutationResult<DeleteCompanyMutation>;
export type DeleteCompanyMutationOptions = Apollo.BaseMutationOptions<DeleteCompanyMutation, DeleteCompanyMutationVariables>;
export const DeleteCreditCardDocument = gql`
    mutation DeleteCreditCard($id: Int!) {
  deleteCreditcard(id: $id)
}
    `;
export type DeleteCreditCardMutationFn = Apollo.MutationFunction<DeleteCreditCardMutation, DeleteCreditCardMutationVariables>;

/**
 * __useDeleteCreditCardMutation__
 *
 * To run a mutation, you first call `useDeleteCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCreditCardMutation, { data, loading, error }] = useDeleteCreditCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCreditCardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCreditCardMutation, DeleteCreditCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCreditCardMutation, DeleteCreditCardMutationVariables>(DeleteCreditCardDocument, options);
      }
export type DeleteCreditCardMutationHookResult = ReturnType<typeof useDeleteCreditCardMutation>;
export type DeleteCreditCardMutationResult = Apollo.MutationResult<DeleteCreditCardMutation>;
export type DeleteCreditCardMutationOptions = Apollo.BaseMutationOptions<DeleteCreditCardMutation, DeleteCreditCardMutationVariables>;
export const DeleteCreditCardGroupDocument = gql`
    mutation DeleteCreditCardGroup($id: Int!) {
  deleteCreditcardgroup(id: $id)
}
    `;
export type DeleteCreditCardGroupMutationFn = Apollo.MutationFunction<DeleteCreditCardGroupMutation, DeleteCreditCardGroupMutationVariables>;

/**
 * __useDeleteCreditCardGroupMutation__
 *
 * To run a mutation, you first call `useDeleteCreditCardGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCreditCardGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCreditCardGroupMutation, { data, loading, error }] = useDeleteCreditCardGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCreditCardGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCreditCardGroupMutation, DeleteCreditCardGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCreditCardGroupMutation, DeleteCreditCardGroupMutationVariables>(DeleteCreditCardGroupDocument, options);
      }
export type DeleteCreditCardGroupMutationHookResult = ReturnType<typeof useDeleteCreditCardGroupMutation>;
export type DeleteCreditCardGroupMutationResult = Apollo.MutationResult<DeleteCreditCardGroupMutation>;
export type DeleteCreditCardGroupMutationOptions = Apollo.BaseMutationOptions<DeleteCreditCardGroupMutation, DeleteCreditCardGroupMutationVariables>;
export const DeleteDiscountDocument = gql`
    mutation DeleteDiscount($id: Int!) {
  deleteDiscount(id: $id)
}
    `;
export type DeleteDiscountMutationFn = Apollo.MutationFunction<DeleteDiscountMutation, DeleteDiscountMutationVariables>;

/**
 * __useDeleteDiscountMutation__
 *
 * To run a mutation, you first call `useDeleteDiscountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDiscountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDiscountMutation, { data, loading, error }] = useDeleteDiscountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDiscountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDiscountMutation, DeleteDiscountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDiscountMutation, DeleteDiscountMutationVariables>(DeleteDiscountDocument, options);
      }
export type DeleteDiscountMutationHookResult = ReturnType<typeof useDeleteDiscountMutation>;
export type DeleteDiscountMutationResult = Apollo.MutationResult<DeleteDiscountMutation>;
export type DeleteDiscountMutationOptions = Apollo.BaseMutationOptions<DeleteDiscountMutation, DeleteDiscountMutationVariables>;
export const DeleteDocumentDocument = gql`
    mutation DeleteDocument($documentID: Int!) {
  deleteDocument(documentID: $documentID) {
    success
    message
  }
}
    `;
export type DeleteDocumentMutationFn = Apollo.MutationFunction<DeleteDocumentMutation, DeleteDocumentMutationVariables>;

/**
 * __useDeleteDocumentMutation__
 *
 * To run a mutation, you first call `useDeleteDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDocumentMutation, { data, loading, error }] = useDeleteDocumentMutation({
 *   variables: {
 *      documentID: // value for 'documentID'
 *   },
 * });
 */
export function useDeleteDocumentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDocumentMutation, DeleteDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDocumentMutation, DeleteDocumentMutationVariables>(DeleteDocumentDocument, options);
      }
export type DeleteDocumentMutationHookResult = ReturnType<typeof useDeleteDocumentMutation>;
export type DeleteDocumentMutationResult = Apollo.MutationResult<DeleteDocumentMutation>;
export type DeleteDocumentMutationOptions = Apollo.BaseMutationOptions<DeleteDocumentMutation, DeleteDocumentMutationVariables>;
export const DeleteItemDocument = gql`
    mutation DeleteItem($itemID: Int!, $companyId: Int!) {
  deleteItem(itemID: $itemID, companyID: $companyId)
}
    `;
export type DeleteItemMutationFn = Apollo.MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      itemID: // value for 'itemID'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemMutation, DeleteItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, options);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = Apollo.MutationResult<DeleteItemMutation>;
export type DeleteItemMutationOptions = Apollo.BaseMutationOptions<DeleteItemMutation, DeleteItemMutationVariables>;
export const DeleteItemCategoryDocument = gql`
    mutation DeleteItemCategory($categoryID: Int!) {
  deleteItemcategory(categoryID: $categoryID)
}
    `;
export type DeleteItemCategoryMutationFn = Apollo.MutationFunction<DeleteItemCategoryMutation, DeleteItemCategoryMutationVariables>;

/**
 * __useDeleteItemCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteItemCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemCategoryMutation, { data, loading, error }] = useDeleteItemCategoryMutation({
 *   variables: {
 *      categoryID: // value for 'categoryID'
 *   },
 * });
 */
export function useDeleteItemCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemCategoryMutation, DeleteItemCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteItemCategoryMutation, DeleteItemCategoryMutationVariables>(DeleteItemCategoryDocument, options);
      }
export type DeleteItemCategoryMutationHookResult = ReturnType<typeof useDeleteItemCategoryMutation>;
export type DeleteItemCategoryMutationResult = Apollo.MutationResult<DeleteItemCategoryMutation>;
export type DeleteItemCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteItemCategoryMutation, DeleteItemCategoryMutationVariables>;
export const DeleteItemSubcategoryDocument = gql`
    mutation DeleteItemSubcategory($subcategoryID: Int!) {
  deleteItemsubcategory(subcategoryID: $subcategoryID)
}
    `;
export type DeleteItemSubcategoryMutationFn = Apollo.MutationFunction<DeleteItemSubcategoryMutation, DeleteItemSubcategoryMutationVariables>;

/**
 * __useDeleteItemSubcategoryMutation__
 *
 * To run a mutation, you first call `useDeleteItemSubcategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemSubcategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemSubcategoryMutation, { data, loading, error }] = useDeleteItemSubcategoryMutation({
 *   variables: {
 *      subcategoryID: // value for 'subcategoryID'
 *   },
 * });
 */
export function useDeleteItemSubcategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemSubcategoryMutation, DeleteItemSubcategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteItemSubcategoryMutation, DeleteItemSubcategoryMutationVariables>(DeleteItemSubcategoryDocument, options);
      }
export type DeleteItemSubcategoryMutationHookResult = ReturnType<typeof useDeleteItemSubcategoryMutation>;
export type DeleteItemSubcategoryMutationResult = Apollo.MutationResult<DeleteItemSubcategoryMutation>;
export type DeleteItemSubcategoryMutationOptions = Apollo.BaseMutationOptions<DeleteItemSubcategoryMutation, DeleteItemSubcategoryMutationVariables>;
export const DeleteOrderDocument = gql`
    mutation DeleteOrder($orderID: Int!, $branchId: Int!, $companyId: Int!) {
  deleteOrder(orderID: $orderID, branchID: $branchId, companyID: $companyId)
}
    `;
export type DeleteOrderMutationFn = Apollo.MutationFunction<DeleteOrderMutation, DeleteOrderMutationVariables>;

/**
 * __useDeleteOrderMutation__
 *
 * To run a mutation, you first call `useDeleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderMutation, { data, loading, error }] = useDeleteOrderMutation({
 *   variables: {
 *      orderID: // value for 'orderID'
 *      branchId: // value for 'branchId'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useDeleteOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderMutation, DeleteOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument, options);
      }
export type DeleteOrderMutationHookResult = ReturnType<typeof useDeleteOrderMutation>;
export type DeleteOrderMutationResult = Apollo.MutationResult<DeleteOrderMutation>;
export type DeleteOrderMutationOptions = Apollo.BaseMutationOptions<DeleteOrderMutation, DeleteOrderMutationVariables>;
export const DeletePricelistDocument = gql`
    mutation DeletePricelist($pricelistID: Int!, $companyId: Int!) {
  deletePricelist(pricelistID: $pricelistID, companyID: $companyId)
}
    `;
export type DeletePricelistMutationFn = Apollo.MutationFunction<DeletePricelistMutation, DeletePricelistMutationVariables>;

/**
 * __useDeletePricelistMutation__
 *
 * To run a mutation, you first call `useDeletePricelistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePricelistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePricelistMutation, { data, loading, error }] = useDeletePricelistMutation({
 *   variables: {
 *      pricelistID: // value for 'pricelistID'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useDeletePricelistMutation(baseOptions?: Apollo.MutationHookOptions<DeletePricelistMutation, DeletePricelistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePricelistMutation, DeletePricelistMutationVariables>(DeletePricelistDocument, options);
      }
export type DeletePricelistMutationHookResult = ReturnType<typeof useDeletePricelistMutation>;
export type DeletePricelistMutationResult = Apollo.MutationResult<DeletePricelistMutation>;
export type DeletePricelistMutationOptions = Apollo.BaseMutationOptions<DeletePricelistMutation, DeletePricelistMutationVariables>;
export const DeletePricelistItemDocument = gql`
    mutation DeletePricelistItem($pricelistID: Int!, $itemID: Int!) {
  deletePricelistitem(pricelistID: $pricelistID, itemID: $itemID)
}
    `;
export type DeletePricelistItemMutationFn = Apollo.MutationFunction<DeletePricelistItemMutation, DeletePricelistItemMutationVariables>;

/**
 * __useDeletePricelistItemMutation__
 *
 * To run a mutation, you first call `useDeletePricelistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePricelistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePricelistItemMutation, { data, loading, error }] = useDeletePricelistItemMutation({
 *   variables: {
 *      pricelistID: // value for 'pricelistID'
 *      itemID: // value for 'itemID'
 *   },
 * });
 */
export function useDeletePricelistItemMutation(baseOptions?: Apollo.MutationHookOptions<DeletePricelistItemMutation, DeletePricelistItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePricelistItemMutation, DeletePricelistItemMutationVariables>(DeletePricelistItemDocument, options);
      }
export type DeletePricelistItemMutationHookResult = ReturnType<typeof useDeletePricelistItemMutation>;
export type DeletePricelistItemMutationResult = Apollo.MutationResult<DeletePricelistItemMutation>;
export type DeletePricelistItemMutationOptions = Apollo.BaseMutationOptions<DeletePricelistItemMutation, DeletePricelistItemMutationVariables>;
export const DeleteRoleDocument = gql`
    mutation DeleteRole($roleID: Int!) {
  deleteRole(roleID: $roleID)
}
    `;
export type DeleteRoleMutationFn = Apollo.MutationFunction<DeleteRoleMutation, DeleteRoleMutationVariables>;

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleMutation, { data, loading, error }] = useDeleteRoleMutation({
 *   variables: {
 *      roleID: // value for 'roleID'
 *   },
 * });
 */
export function useDeleteRoleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoleMutation, DeleteRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument, options);
      }
export type DeleteRoleMutationHookResult = ReturnType<typeof useDeleteRoleMutation>;
export type DeleteRoleMutationResult = Apollo.MutationResult<DeleteRoleMutation>;
export type DeleteRoleMutationOptions = Apollo.BaseMutationOptions<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const DeleteSaleConditionDocument = gql`
    mutation DeleteSaleCondition($saleConditionID: Int!) {
  deleteSalecondition(saleConditionID: $saleConditionID) {
    success
    message
  }
}
    `;
export type DeleteSaleConditionMutationFn = Apollo.MutationFunction<DeleteSaleConditionMutation, DeleteSaleConditionMutationVariables>;

/**
 * __useDeleteSaleConditionMutation__
 *
 * To run a mutation, you first call `useDeleteSaleConditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSaleConditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSaleConditionMutation, { data, loading, error }] = useDeleteSaleConditionMutation({
 *   variables: {
 *      saleConditionID: // value for 'saleConditionID'
 *   },
 * });
 */
export function useDeleteSaleConditionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSaleConditionMutation, DeleteSaleConditionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSaleConditionMutation, DeleteSaleConditionMutationVariables>(DeleteSaleConditionDocument, options);
      }
export type DeleteSaleConditionMutationHookResult = ReturnType<typeof useDeleteSaleConditionMutation>;
export type DeleteSaleConditionMutationResult = Apollo.MutationResult<DeleteSaleConditionMutation>;
export type DeleteSaleConditionMutationOptions = Apollo.BaseMutationOptions<DeleteSaleConditionMutation, DeleteSaleConditionMutationVariables>;
export const DeleteServicetypeDocument = gql`
    mutation DeleteServicetype($serviceTypeID: Int!, $companyId: Int!) {
  deleteServicetype(serviceTypeID: $serviceTypeID, companyID: $companyId) {
    success
    message
  }
}
    `;
export type DeleteServicetypeMutationFn = Apollo.MutationFunction<DeleteServicetypeMutation, DeleteServicetypeMutationVariables>;

/**
 * __useDeleteServicetypeMutation__
 *
 * To run a mutation, you first call `useDeleteServicetypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServicetypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServicetypeMutation, { data, loading, error }] = useDeleteServicetypeMutation({
 *   variables: {
 *      serviceTypeID: // value for 'serviceTypeID'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useDeleteServicetypeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServicetypeMutation, DeleteServicetypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServicetypeMutation, DeleteServicetypeMutationVariables>(DeleteServicetypeDocument, options);
      }
export type DeleteServicetypeMutationHookResult = ReturnType<typeof useDeleteServicetypeMutation>;
export type DeleteServicetypeMutationResult = Apollo.MutationResult<DeleteServicetypeMutation>;
export type DeleteServicetypeMutationOptions = Apollo.BaseMutationOptions<DeleteServicetypeMutation, DeleteServicetypeMutationVariables>;
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
export const DeleteUserRecordDocument = gql`
    mutation DeleteUserRecord($userID: Int!) {
  deleteUserRecord(userID: $userID)
}
    `;
export type DeleteUserRecordMutationFn = Apollo.MutationFunction<DeleteUserRecordMutation, DeleteUserRecordMutationVariables>;

/**
 * __useDeleteUserRecordMutation__
 *
 * To run a mutation, you first call `useDeleteUserRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserRecordMutation, { data, loading, error }] = useDeleteUserRecordMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useDeleteUserRecordMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserRecordMutation, DeleteUserRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserRecordMutation, DeleteUserRecordMutationVariables>(DeleteUserRecordDocument, options);
      }
export type DeleteUserRecordMutationHookResult = ReturnType<typeof useDeleteUserRecordMutation>;
export type DeleteUserRecordMutationResult = Apollo.MutationResult<DeleteUserRecordMutation>;
export type DeleteUserRecordMutationOptions = Apollo.BaseMutationOptions<DeleteUserRecordMutation, DeleteUserRecordMutationVariables>;
export const DeleteUseraccessDocument = gql`
    mutation DeleteUseraccess($userID: Int!, $companyID: Int!, $branchID: Int!, $roleID: Int!) {
  deleteUserpermissions(
    userID: $userID
    companyID: $companyID
    branchID: $branchID
    roleID: $roleID
  )
}
    `;
export type DeleteUseraccessMutationFn = Apollo.MutationFunction<DeleteUseraccessMutation, DeleteUseraccessMutationVariables>;

/**
 * __useDeleteUseraccessMutation__
 *
 * To run a mutation, you first call `useDeleteUseraccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUseraccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUseraccessMutation, { data, loading, error }] = useDeleteUseraccessMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      companyID: // value for 'companyID'
 *      branchID: // value for 'branchID'
 *      roleID: // value for 'roleID'
 *   },
 * });
 */
export function useDeleteUseraccessMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUseraccessMutation, DeleteUseraccessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUseraccessMutation, DeleteUseraccessMutationVariables>(DeleteUseraccessDocument, options);
      }
export type DeleteUseraccessMutationHookResult = ReturnType<typeof useDeleteUseraccessMutation>;
export type DeleteUseraccessMutationResult = Apollo.MutationResult<DeleteUseraccessMutation>;
export type DeleteUseraccessMutationOptions = Apollo.BaseMutationOptions<DeleteUseraccessMutation, DeleteUseraccessMutationVariables>;
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
export const DeleteWarehouseDocument = gql`
    mutation DeleteWarehouse($warehouseID: Int!) {
  deleteWarehouse(warehouseID: $warehouseID)
}
    `;
export type DeleteWarehouseMutationFn = Apollo.MutationFunction<DeleteWarehouseMutation, DeleteWarehouseMutationVariables>;

/**
 * __useDeleteWarehouseMutation__
 *
 * To run a mutation, you first call `useDeleteWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWarehouseMutation, { data, loading, error }] = useDeleteWarehouseMutation({
 *   variables: {
 *      warehouseID: // value for 'warehouseID'
 *   },
 * });
 */
export function useDeleteWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWarehouseMutation, DeleteWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWarehouseMutation, DeleteWarehouseMutationVariables>(DeleteWarehouseDocument, options);
      }
export type DeleteWarehouseMutationHookResult = ReturnType<typeof useDeleteWarehouseMutation>;
export type DeleteWarehouseMutationResult = Apollo.MutationResult<DeleteWarehouseMutation>;
export type DeleteWarehouseMutationOptions = Apollo.BaseMutationOptions<DeleteWarehouseMutation, DeleteWarehouseMutationVariables>;
export const GetStockEntryFormDataDocument = gql`
    query GetStockEntryFormData {
  docTypes: sysIdentityDocTypes {
    DocTypeID
    DocTypeName
  }
  countries: allCountries {
    CountryID
    CountryName
  }
  provinces: allProvinces {
    ProvinceID
    CountryID
    ProvinceName
  }
  companies: allCompany {
    CompanyID
    CompanyName
  }
  warehouses: allWarehouses {
    WarehouseID
    WarehouseName
    Address
  }
  branches: allBranches {
    BranchID
    BranchName
    CompanyID
  }
}
    `;

/**
 * __useGetStockEntryFormDataQuery__
 *
 * To run a query within a React component, call `useGetStockEntryFormDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockEntryFormDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockEntryFormDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStockEntryFormDataQuery(baseOptions?: Apollo.QueryHookOptions<GetStockEntryFormDataQuery, GetStockEntryFormDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStockEntryFormDataQuery, GetStockEntryFormDataQueryVariables>(GetStockEntryFormDataDocument, options);
      }
export function useGetStockEntryFormDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStockEntryFormDataQuery, GetStockEntryFormDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStockEntryFormDataQuery, GetStockEntryFormDataQueryVariables>(GetStockEntryFormDataDocument, options);
        }
export function useGetStockEntryFormDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStockEntryFormDataQuery, GetStockEntryFormDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStockEntryFormDataQuery, GetStockEntryFormDataQueryVariables>(GetStockEntryFormDataDocument, options);
        }
export type GetStockEntryFormDataQueryHookResult = ReturnType<typeof useGetStockEntryFormDataQuery>;
export type GetStockEntryFormDataLazyQueryHookResult = ReturnType<typeof useGetStockEntryFormDataLazyQuery>;
export type GetStockEntryFormDataSuspenseQueryHookResult = ReturnType<typeof useGetStockEntryFormDataSuspenseQuery>;
export type GetStockEntryFormDataQueryResult = Apollo.QueryResult<GetStockEntryFormDataQuery, GetStockEntryFormDataQueryVariables>;
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
export const UpdateBranchDocument = gql`
    mutation UpdateBranch($branchID: Int!, $input: BranchesUpdate!) {
  updateBranch(branchID: $branchID, data: $input) {
    BranchID
    CompanyID
    BranchName
    Address
    Phone
  }
}
    `;
export type UpdateBranchMutationFn = Apollo.MutationFunction<UpdateBranchMutation, UpdateBranchMutationVariables>;

/**
 * __useUpdateBranchMutation__
 *
 * To run a mutation, you first call `useUpdateBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBranchMutation, { data, loading, error }] = useUpdateBranchMutation({
 *   variables: {
 *      branchID: // value for 'branchID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBranchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBranchMutation, UpdateBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBranchMutation, UpdateBranchMutationVariables>(UpdateBranchDocument, options);
      }
export type UpdateBranchMutationHookResult = ReturnType<typeof useUpdateBranchMutation>;
export type UpdateBranchMutationResult = Apollo.MutationResult<UpdateBranchMutation>;
export type UpdateBranchMutationOptions = Apollo.BaseMutationOptions<UpdateBranchMutation, UpdateBranchMutationVariables>;
export const UpdateCarDocument = gql`
    mutation UpdateCar($carID: Int!, $input: CarsUpdate!, $companyId: Int!) {
  updateCar(carID: $carID, data: $input, companyID: $companyId) {
    CarID
    LicensePlate
    Year
    CarModelID
    ClientID
    LastServiceMileage
    IsDebtor
    DiscountID
  }
}
    `;
export type UpdateCarMutationFn = Apollo.MutationFunction<UpdateCarMutation, UpdateCarMutationVariables>;

/**
 * __useUpdateCarMutation__
 *
 * To run a mutation, you first call `useUpdateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCarMutation, { data, loading, error }] = useUpdateCarMutation({
 *   variables: {
 *      carID: // value for 'carID'
 *      input: // value for 'input'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useUpdateCarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCarMutation, UpdateCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCarMutation, UpdateCarMutationVariables>(UpdateCarDocument, options);
      }
export type UpdateCarMutationHookResult = ReturnType<typeof useUpdateCarMutation>;
export type UpdateCarMutationResult = Apollo.MutationResult<UpdateCarMutation>;
export type UpdateCarMutationOptions = Apollo.BaseMutationOptions<UpdateCarMutation, UpdateCarMutationVariables>;
export const UpdateCarBrandDocument = gql`
    mutation UpdateCarBrand($carBrandID: Int!, $input: CarBrandsUpdate!, $companyId: Int!) {
  updateCarbrand(carBrandID: $carBrandID, data: $input, companyID: $companyId) {
    CarBrandID
    CarBrandName
  }
}
    `;
export type UpdateCarBrandMutationFn = Apollo.MutationFunction<UpdateCarBrandMutation, UpdateCarBrandMutationVariables>;

/**
 * __useUpdateCarBrandMutation__
 *
 * To run a mutation, you first call `useUpdateCarBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCarBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCarBrandMutation, { data, loading, error }] = useUpdateCarBrandMutation({
 *   variables: {
 *      carBrandID: // value for 'carBrandID'
 *      input: // value for 'input'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useUpdateCarBrandMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCarBrandMutation, UpdateCarBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCarBrandMutation, UpdateCarBrandMutationVariables>(UpdateCarBrandDocument, options);
      }
export type UpdateCarBrandMutationHookResult = ReturnType<typeof useUpdateCarBrandMutation>;
export type UpdateCarBrandMutationResult = Apollo.MutationResult<UpdateCarBrandMutation>;
export type UpdateCarBrandMutationOptions = Apollo.BaseMutationOptions<UpdateCarBrandMutation, UpdateCarBrandMutationVariables>;
export const UpdateCarModelDocument = gql`
    mutation UpdateCarModel($carModelID: Int!, $input: CarModelsUpdate!, $carBrandId: Int!, $companyId: Int!) {
  updateCarmodel(
    carModelID: $carModelID
    data: $input
    carBrandID: $carBrandId
    companyID: $companyId
  ) {
    CarModelID
    CarBrandID
    CarModelName
  }
}
    `;
export type UpdateCarModelMutationFn = Apollo.MutationFunction<UpdateCarModelMutation, UpdateCarModelMutationVariables>;

/**
 * __useUpdateCarModelMutation__
 *
 * To run a mutation, you first call `useUpdateCarModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCarModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCarModelMutation, { data, loading, error }] = useUpdateCarModelMutation({
 *   variables: {
 *      carModelID: // value for 'carModelID'
 *      input: // value for 'input'
 *      carBrandId: // value for 'carBrandId'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useUpdateCarModelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCarModelMutation, UpdateCarModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCarModelMutation, UpdateCarModelMutationVariables>(UpdateCarModelDocument, options);
      }
export type UpdateCarModelMutationHookResult = ReturnType<typeof useUpdateCarModelMutation>;
export type UpdateCarModelMutationResult = Apollo.MutationResult<UpdateCarModelMutation>;
export type UpdateCarModelMutationOptions = Apollo.BaseMutationOptions<UpdateCarModelMutation, UpdateCarModelMutationVariables>;
export const UpdateCashboxDocument = gql`
    mutation UpdateCashbox($cashBoxID: Int!, $input: CashBoxesUpdate!) {
  updateCashbox(cashBoxID: $cashBoxID, data: $input) {
    CashBoxID
    CompanyID
    BranchID
    Name
    Description
    IsActive
    OpenDate
    CloseDate
    InitialBalance
    CurrentBalance
    UserID
    Notes
  }
}
    `;
export type UpdateCashboxMutationFn = Apollo.MutationFunction<UpdateCashboxMutation, UpdateCashboxMutationVariables>;

/**
 * __useUpdateCashboxMutation__
 *
 * To run a mutation, you first call `useUpdateCashboxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCashboxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCashboxMutation, { data, loading, error }] = useUpdateCashboxMutation({
 *   variables: {
 *      cashBoxID: // value for 'cashBoxID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCashboxMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCashboxMutation, UpdateCashboxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCashboxMutation, UpdateCashboxMutationVariables>(UpdateCashboxDocument, options);
      }
export type UpdateCashboxMutationHookResult = ReturnType<typeof useUpdateCashboxMutation>;
export type UpdateCashboxMutationResult = Apollo.MutationResult<UpdateCashboxMutation>;
export type UpdateCashboxMutationOptions = Apollo.BaseMutationOptions<UpdateCashboxMutation, UpdateCashboxMutationVariables>;
export const UpdateCashboxmovementDocument = gql`
    mutation UpdateCashboxmovement($movementID: Int!, $input: CashBoxMovementsUpdate!) {
  updateCashboxmovement(movementID: $movementID, data: $input) {
    CashBoxMovementID
    CashBoxID
    CompanyID
    BranchID
    MovementDate
    Amount
    MovementType
    Description
    UserID
    Notes
  }
}
    `;
export type UpdateCashboxmovementMutationFn = Apollo.MutationFunction<UpdateCashboxmovementMutation, UpdateCashboxmovementMutationVariables>;

/**
 * __useUpdateCashboxmovementMutation__
 *
 * To run a mutation, you first call `useUpdateCashboxmovementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCashboxmovementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCashboxmovementMutation, { data, loading, error }] = useUpdateCashboxmovementMutation({
 *   variables: {
 *      movementID: // value for 'movementID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCashboxmovementMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCashboxmovementMutation, UpdateCashboxmovementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCashboxmovementMutation, UpdateCashboxmovementMutationVariables>(UpdateCashboxmovementDocument, options);
      }
export type UpdateCashboxmovementMutationHookResult = ReturnType<typeof useUpdateCashboxmovementMutation>;
export type UpdateCashboxmovementMutationResult = Apollo.MutationResult<UpdateCashboxmovementMutation>;
export type UpdateCashboxmovementMutationOptions = Apollo.BaseMutationOptions<UpdateCashboxmovementMutation, UpdateCashboxmovementMutationVariables>;
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
export const UpdateCompanyDocument = gql`
    mutation UpdateCompany($companyID: Int!, $input: CompanyUpdate!) {
  updateCompany(companyID: $companyID, data: $input) {
    CompanyID
    CompanyName
    Address
    CUIT
    Grossincome
    Startdate
    Logo
  }
}
    `;
export type UpdateCompanyMutationFn = Apollo.MutationFunction<UpdateCompanyMutation, UpdateCompanyMutationVariables>;

/**
 * __useUpdateCompanyMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyMutation, { data, loading, error }] = useUpdateCompanyMutation({
 *   variables: {
 *      companyID: // value for 'companyID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompanyMutation, UpdateCompanyMutationVariables>(UpdateCompanyDocument, options);
      }
export type UpdateCompanyMutationHookResult = ReturnType<typeof useUpdateCompanyMutation>;
export type UpdateCompanyMutationResult = Apollo.MutationResult<UpdateCompanyMutation>;
export type UpdateCompanyMutationOptions = Apollo.BaseMutationOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const UpdateCreditCardDocument = gql`
    mutation UpdateCreditCard($id: Int!, $input: CreditCardsUpdate!) {
  updateCreditcard(id: $id, data: $input) {
    CreditCardID
    CreditCardGroupID
    CardName
    Surcharge
    Installments
    IsActive
  }
}
    `;
export type UpdateCreditCardMutationFn = Apollo.MutationFunction<UpdateCreditCardMutation, UpdateCreditCardMutationVariables>;

/**
 * __useUpdateCreditCardMutation__
 *
 * To run a mutation, you first call `useUpdateCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCreditCardMutation, { data, loading, error }] = useUpdateCreditCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCreditCardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCreditCardMutation, UpdateCreditCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCreditCardMutation, UpdateCreditCardMutationVariables>(UpdateCreditCardDocument, options);
      }
export type UpdateCreditCardMutationHookResult = ReturnType<typeof useUpdateCreditCardMutation>;
export type UpdateCreditCardMutationResult = Apollo.MutationResult<UpdateCreditCardMutation>;
export type UpdateCreditCardMutationOptions = Apollo.BaseMutationOptions<UpdateCreditCardMutation, UpdateCreditCardMutationVariables>;
export const UpdateCreditCardGroupDocument = gql`
    mutation UpdateCreditCardGroup($id: Int!, $input: CreditCardGroupsUpdate!) {
  updateCreditcardgroup(id: $id, data: $input) {
    CreditCardGroupID
    GroupName
  }
}
    `;
export type UpdateCreditCardGroupMutationFn = Apollo.MutationFunction<UpdateCreditCardGroupMutation, UpdateCreditCardGroupMutationVariables>;

/**
 * __useUpdateCreditCardGroupMutation__
 *
 * To run a mutation, you first call `useUpdateCreditCardGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCreditCardGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCreditCardGroupMutation, { data, loading, error }] = useUpdateCreditCardGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCreditCardGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCreditCardGroupMutation, UpdateCreditCardGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCreditCardGroupMutation, UpdateCreditCardGroupMutationVariables>(UpdateCreditCardGroupDocument, options);
      }
export type UpdateCreditCardGroupMutationHookResult = ReturnType<typeof useUpdateCreditCardGroupMutation>;
export type UpdateCreditCardGroupMutationResult = Apollo.MutationResult<UpdateCreditCardGroupMutation>;
export type UpdateCreditCardGroupMutationOptions = Apollo.BaseMutationOptions<UpdateCreditCardGroupMutation, UpdateCreditCardGroupMutationVariables>;
export const UpdateDiscountDocument = gql`
    mutation UpdateDiscount($id: Int!, $input: DiscountsUpdate!) {
  updateDiscount(id: $id, data: $input) {
    DiscountID
    DiscountName
    Percentage
  }
}
    `;
export type UpdateDiscountMutationFn = Apollo.MutationFunction<UpdateDiscountMutation, UpdateDiscountMutationVariables>;

/**
 * __useUpdateDiscountMutation__
 *
 * To run a mutation, you first call `useUpdateDiscountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDiscountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDiscountMutation, { data, loading, error }] = useUpdateDiscountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDiscountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDiscountMutation, UpdateDiscountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDiscountMutation, UpdateDiscountMutationVariables>(UpdateDiscountDocument, options);
      }
export type UpdateDiscountMutationHookResult = ReturnType<typeof useUpdateDiscountMutation>;
export type UpdateDiscountMutationResult = Apollo.MutationResult<UpdateDiscountMutation>;
export type UpdateDiscountMutationOptions = Apollo.BaseMutationOptions<UpdateDiscountMutation, UpdateDiscountMutationVariables>;
export const UpdateDocumentDocument = gql`
    mutation UpdateDocument($documentID: Int!, $input: CommercialDocumentsUpdate!) {
  updateDocument(documentID: $documentID, data: $input) {
    DocumentID
    CompanyID
    BranchID
    DocumentTypeID
    DocumentDescription
    DocumentNumber
    PointOfSale
    IsActive
    IsTest
    ShouldAccount
    AffectsStock
    IsFiscal
    IsElectronic
    IsManual
    IsQuotation
    MaxItems
  }
}
    `;
export type UpdateDocumentMutationFn = Apollo.MutationFunction<UpdateDocumentMutation, UpdateDocumentMutationVariables>;

/**
 * __useUpdateDocumentMutation__
 *
 * To run a mutation, you first call `useUpdateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDocumentMutation, { data, loading, error }] = useUpdateDocumentMutation({
 *   variables: {
 *      documentID: // value for 'documentID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDocumentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDocumentMutation, UpdateDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDocumentMutation, UpdateDocumentMutationVariables>(UpdateDocumentDocument, options);
      }
export type UpdateDocumentMutationHookResult = ReturnType<typeof useUpdateDocumentMutation>;
export type UpdateDocumentMutationResult = Apollo.MutationResult<UpdateDocumentMutation>;
export type UpdateDocumentMutationOptions = Apollo.BaseMutationOptions<UpdateDocumentMutation, UpdateDocumentMutationVariables>;
export const UpdateItemDocument = gql`
    mutation UpdateItem($itemID: Int!, $input: ItemsUpdate!, $companyId: Int!) {
  updateItem(itemID: $itemID, data: $input, companyID: $companyId) {
    ItemID
    ItemCode
  }
}
    `;
export type UpdateItemMutationFn = Apollo.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      itemID: // value for 'itemID'
 *      input: // value for 'input'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, options);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = Apollo.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = Apollo.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;
export const UpdateItemCategoryDocument = gql`
    mutation UpdateItemCategory($categoryID: Int!, $input: ItemCategoriesUpdate!) {
  updateItemcategory(categoryID: $categoryID, data: $input) {
    ItemCategoryID
    CategoryName
  }
}
    `;
export type UpdateItemCategoryMutationFn = Apollo.MutationFunction<UpdateItemCategoryMutation, UpdateItemCategoryMutationVariables>;

/**
 * __useUpdateItemCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateItemCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemCategoryMutation, { data, loading, error }] = useUpdateItemCategoryMutation({
 *   variables: {
 *      categoryID: // value for 'categoryID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateItemCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateItemCategoryMutation, UpdateItemCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateItemCategoryMutation, UpdateItemCategoryMutationVariables>(UpdateItemCategoryDocument, options);
      }
export type UpdateItemCategoryMutationHookResult = ReturnType<typeof useUpdateItemCategoryMutation>;
export type UpdateItemCategoryMutationResult = Apollo.MutationResult<UpdateItemCategoryMutation>;
export type UpdateItemCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateItemCategoryMutation, UpdateItemCategoryMutationVariables>;
export const UpdateItemSubcategoryDocument = gql`
    mutation UpdateItemSubcategory($subcategoryID: Int!, $input: ItemSubcategoriesUpdate!) {
  updateItemsubcategory(subcategoryID: $subcategoryID, data: $input) {
    ItemSubcategoryID
    ItemCategoryID
    SubcategoryName
  }
}
    `;
export type UpdateItemSubcategoryMutationFn = Apollo.MutationFunction<UpdateItemSubcategoryMutation, UpdateItemSubcategoryMutationVariables>;

/**
 * __useUpdateItemSubcategoryMutation__
 *
 * To run a mutation, you first call `useUpdateItemSubcategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemSubcategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemSubcategoryMutation, { data, loading, error }] = useUpdateItemSubcategoryMutation({
 *   variables: {
 *      subcategoryID: // value for 'subcategoryID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateItemSubcategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateItemSubcategoryMutation, UpdateItemSubcategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateItemSubcategoryMutation, UpdateItemSubcategoryMutationVariables>(UpdateItemSubcategoryDocument, options);
      }
export type UpdateItemSubcategoryMutationHookResult = ReturnType<typeof useUpdateItemSubcategoryMutation>;
export type UpdateItemSubcategoryMutationResult = Apollo.MutationResult<UpdateItemSubcategoryMutation>;
export type UpdateItemSubcategoryMutationOptions = Apollo.BaseMutationOptions<UpdateItemSubcategoryMutation, UpdateItemSubcategoryMutationVariables>;
export const UpdateOrderDocument = gql`
    mutation UpdateOrder($orderID: Int!, $input: OrdersUpdate!, $brandId: Int!, $companyId: Int!) {
  updateOrder(
    orderID: $orderID
    data: $input
    branchID: $brandId
    companyID: $companyId
  ) {
    order {
      OrderID
      CompanyID
      BranchID
      OrderDate
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
      TotalTaxAmount
      UserID
      DocumentID
      PriceListID
      OrderStatusID
      WarehouseID
    }
    sessionID
    message
  }
}
    `;
export type UpdateOrderMutationFn = Apollo.MutationFunction<UpdateOrderMutation, UpdateOrderMutationVariables>;

/**
 * __useUpdateOrderMutation__
 *
 * To run a mutation, you first call `useUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderMutation, { data, loading, error }] = useUpdateOrderMutation({
 *   variables: {
 *      orderID: // value for 'orderID'
 *      input: // value for 'input'
 *      brandId: // value for 'brandId'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useUpdateOrderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderMutation, UpdateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument, options);
      }
export type UpdateOrderMutationHookResult = ReturnType<typeof useUpdateOrderMutation>;
export type UpdateOrderMutationResult = Apollo.MutationResult<UpdateOrderMutation>;
export type UpdateOrderMutationOptions = Apollo.BaseMutationOptions<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const UpdatePricelistDocument = gql`
    mutation UpdatePricelist($pricelistID: Int!, $input: PriceListsUpdate!, $companyId: Int!) {
  updatePricelist(pricelistID: $pricelistID, data: $input, companyID: $companyId) {
    PriceListID
    PriceListName
    PriceListDescription
    IsActive
  }
}
    `;
export type UpdatePricelistMutationFn = Apollo.MutationFunction<UpdatePricelistMutation, UpdatePricelistMutationVariables>;

/**
 * __useUpdatePricelistMutation__
 *
 * To run a mutation, you first call `useUpdatePricelistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePricelistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePricelistMutation, { data, loading, error }] = useUpdatePricelistMutation({
 *   variables: {
 *      pricelistID: // value for 'pricelistID'
 *      input: // value for 'input'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useUpdatePricelistMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePricelistMutation, UpdatePricelistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePricelistMutation, UpdatePricelistMutationVariables>(UpdatePricelistDocument, options);
      }
export type UpdatePricelistMutationHookResult = ReturnType<typeof useUpdatePricelistMutation>;
export type UpdatePricelistMutationResult = Apollo.MutationResult<UpdatePricelistMutation>;
export type UpdatePricelistMutationOptions = Apollo.BaseMutationOptions<UpdatePricelistMutation, UpdatePricelistMutationVariables>;
export const UpdatePricelistItemDocument = gql`
    mutation UpdatePricelistItem($pricelistID: Int!, $itemID: Int!, $input: PriceListItemsUpdate!) {
  updatePricelistitem(pricelistID: $pricelistID, itemID: $itemID, data: $input) {
    PriceListID
    ItemID
    Price
    EffectiveDate
  }
}
    `;
export type UpdatePricelistItemMutationFn = Apollo.MutationFunction<UpdatePricelistItemMutation, UpdatePricelistItemMutationVariables>;

/**
 * __useUpdatePricelistItemMutation__
 *
 * To run a mutation, you first call `useUpdatePricelistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePricelistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePricelistItemMutation, { data, loading, error }] = useUpdatePricelistItemMutation({
 *   variables: {
 *      pricelistID: // value for 'pricelistID'
 *      itemID: // value for 'itemID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePricelistItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePricelistItemMutation, UpdatePricelistItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePricelistItemMutation, UpdatePricelistItemMutationVariables>(UpdatePricelistItemDocument, options);
      }
export type UpdatePricelistItemMutationHookResult = ReturnType<typeof useUpdatePricelistItemMutation>;
export type UpdatePricelistItemMutationResult = Apollo.MutationResult<UpdatePricelistItemMutation>;
export type UpdatePricelistItemMutationOptions = Apollo.BaseMutationOptions<UpdatePricelistItemMutation, UpdatePricelistItemMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation UpdateRole($roleID: Int!, $input: RolesUpdate!) {
  updateRole(roleID: $roleID, data: $input) {
    RoleID
    RoleName
  }
}
    `;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      roleID: // value for 'roleID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const UpdateSaleConditionDocument = gql`
    mutation UpdateSaleCondition($saleConditionID: Int!, $input: SaleConditionsUpdate!) {
  updateSalecondition(saleConditionID: $saleConditionID, data: $input) {
    SaleConditionID
    CreditCardID
    Name
    DueDate
    Surcharge
    IsActive
  }
}
    `;
export type UpdateSaleConditionMutationFn = Apollo.MutationFunction<UpdateSaleConditionMutation, UpdateSaleConditionMutationVariables>;

/**
 * __useUpdateSaleConditionMutation__
 *
 * To run a mutation, you first call `useUpdateSaleConditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSaleConditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSaleConditionMutation, { data, loading, error }] = useUpdateSaleConditionMutation({
 *   variables: {
 *      saleConditionID: // value for 'saleConditionID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSaleConditionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSaleConditionMutation, UpdateSaleConditionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSaleConditionMutation, UpdateSaleConditionMutationVariables>(UpdateSaleConditionDocument, options);
      }
export type UpdateSaleConditionMutationHookResult = ReturnType<typeof useUpdateSaleConditionMutation>;
export type UpdateSaleConditionMutationResult = Apollo.MutationResult<UpdateSaleConditionMutation>;
export type UpdateSaleConditionMutationOptions = Apollo.BaseMutationOptions<UpdateSaleConditionMutation, UpdateSaleConditionMutationVariables>;
export const UpdateServicetypeDocument = gql`
    mutation UpdateServicetype($serviceTypeID: Int!, $input: ServiceTypeUpdate!, $companyId: Int!) {
  updateServicetype(
    serviceTypeID: $serviceTypeID
    data: $input
    companyID: $companyId
  ) {
    ServiceTypeID
    ServiceTypeName
  }
}
    `;
export type UpdateServicetypeMutationFn = Apollo.MutationFunction<UpdateServicetypeMutation, UpdateServicetypeMutationVariables>;

/**
 * __useUpdateServicetypeMutation__
 *
 * To run a mutation, you first call `useUpdateServicetypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServicetypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServicetypeMutation, { data, loading, error }] = useUpdateServicetypeMutation({
 *   variables: {
 *      serviceTypeID: // value for 'serviceTypeID'
 *      input: // value for 'input'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useUpdateServicetypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServicetypeMutation, UpdateServicetypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServicetypeMutation, UpdateServicetypeMutationVariables>(UpdateServicetypeDocument, options);
      }
export type UpdateServicetypeMutationHookResult = ReturnType<typeof useUpdateServicetypeMutation>;
export type UpdateServicetypeMutationResult = Apollo.MutationResult<UpdateServicetypeMutation>;
export type UpdateServicetypeMutationOptions = Apollo.BaseMutationOptions<UpdateServicetypeMutation, UpdateServicetypeMutationVariables>;
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
export const UpdateUserPermissionsDocument = gql`
    mutation UpdateUserPermissions($oldUserID: Int!, $oldCompanyID: Int!, $oldBranchID: Int!, $oldRoleID: Int!, $newData: UserPermissionsCreate!) {
  updateUserpermissions(
    oldUserID: $oldUserID
    oldCompanyID: $oldCompanyID
    oldBranchID: $oldBranchID
    oldRoleID: $oldRoleID
    newData: $newData
  ) {
    UserID
    CompanyID
    BranchID
    RoleID
  }
}
    `;
export type UpdateUserPermissionsMutationFn = Apollo.MutationFunction<UpdateUserPermissionsMutation, UpdateUserPermissionsMutationVariables>;

/**
 * __useUpdateUserPermissionsMutation__
 *
 * To run a mutation, you first call `useUpdateUserPermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPermissionsMutation, { data, loading, error }] = useUpdateUserPermissionsMutation({
 *   variables: {
 *      oldUserID: // value for 'oldUserID'
 *      oldCompanyID: // value for 'oldCompanyID'
 *      oldBranchID: // value for 'oldBranchID'
 *      oldRoleID: // value for 'oldRoleID'
 *      newData: // value for 'newData'
 *   },
 * });
 */
export function useUpdateUserPermissionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPermissionsMutation, UpdateUserPermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPermissionsMutation, UpdateUserPermissionsMutationVariables>(UpdateUserPermissionsDocument, options);
      }
export type UpdateUserPermissionsMutationHookResult = ReturnType<typeof useUpdateUserPermissionsMutation>;
export type UpdateUserPermissionsMutationResult = Apollo.MutationResult<UpdateUserPermissionsMutation>;
export type UpdateUserPermissionsMutationOptions = Apollo.BaseMutationOptions<UpdateUserPermissionsMutation, UpdateUserPermissionsMutationVariables>;
export const UpdateUserRecordDocument = gql`
    mutation UpdateUserRecord($userID: Int!, $input: UserUpdate!) {
  updateUserRecord(userID: $userID, data: $input) {
    UserID
    Nickname
    FullName
    IsActive
  }
}
    `;
export type UpdateUserRecordMutationFn = Apollo.MutationFunction<UpdateUserRecordMutation, UpdateUserRecordMutationVariables>;

/**
 * __useUpdateUserRecordMutation__
 *
 * To run a mutation, you first call `useUpdateUserRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRecordMutation, { data, loading, error }] = useUpdateUserRecordMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserRecordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserRecordMutation, UpdateUserRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserRecordMutation, UpdateUserRecordMutationVariables>(UpdateUserRecordDocument, options);
      }
export type UpdateUserRecordMutationHookResult = ReturnType<typeof useUpdateUserRecordMutation>;
export type UpdateUserRecordMutationResult = Apollo.MutationResult<UpdateUserRecordMutation>;
export type UpdateUserRecordMutationOptions = Apollo.BaseMutationOptions<UpdateUserRecordMutation, UpdateUserRecordMutationVariables>;
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
export const UpdateWarehouseDocument = gql`
    mutation UpdateWarehouse($warehouseID: Int!, $input: WarehousesUpdate!) {
  updateWarehouse(warehouseID: $warehouseID, data: $input) {
    WarehouseID
    WarehouseName
    Address
  }
}
    `;
export type UpdateWarehouseMutationFn = Apollo.MutationFunction<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;

/**
 * __useUpdateWarehouseMutation__
 *
 * To run a mutation, you first call `useUpdateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWarehouseMutation, { data, loading, error }] = useUpdateWarehouseMutation({
 *   variables: {
 *      warehouseID: // value for 'warehouseID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>(UpdateWarehouseDocument, options);
      }
export type UpdateWarehouseMutationHookResult = ReturnType<typeof useUpdateWarehouseMutation>;
export type UpdateWarehouseMutationResult = Apollo.MutationResult<UpdateWarehouseMutation>;
export type UpdateWarehouseMutationOptions = Apollo.BaseMutationOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;
export const CreateBrand2Document = gql`
    mutation CreateBrand2($input: BrandsCreate!) {
  createBrand(data: $input) {
    BrandID
    BrandName
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
export const DeleteBrandDocument = gql`
    mutation DeleteBrand($brandID: Int!, $companyId: Int!) {
  deleteBrand(brandID: $brandID, companyID: $companyId)
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
 *      companyId: // value for 'companyId'
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
    mutation DeleteClient($ClientID: Int!) {
  deleteClient(clientID: $ClientID) {
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
 *      ClientID: // value for 'ClientID'
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
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    success
    message
    token
    refreshToken
    refreshExpiresAt
    sessionId
    user {
      UserID
      Nickname
      FullName
      IsActive
      IsFullAdmin
      UserPermissions {
        UserID
        CompanyID
        CompanyName
        BranchID
        BranchName
        RoleID
        RoleName
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const UpdateBrandDocument = gql`
    mutation UpdateBrand($brandID: Int!, $input: BrandsUpdate!, $companyId: Int!) {
  updateBrand(brandID: $brandID, data: $input, companyID: $companyId) {
    BrandID
    BrandName
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
 *      companyId: // value for 'companyId'
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
export const GetAllBranchesDocument = gql`
    query GetAllBranches {
  allBranches {
    Address
    BranchID
    BranchName
    CompanyID
    Phone
    CompanyData {
      CompanyID
      CompanyName
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
    BrandName
    IsActive
    CompanyData {
      CompanyID
      CompanyName
    }
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
    CarBrandName
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
    CarModelName
    CarBrandData {
      CarBrandName
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
      CarModelName
    }
    CarBrandData {
      CarBrandID
      CarBrandName
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
  allCompany {
    CompanyID
    CompanyName
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
    CreditCardGroupData {
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
  allCommercialdocuments {
    DocumentID
    CompanyID
    BranchID
    DocumentTypeID
    DocumentNumber
    PointOfSale
    IsActive
    ShouldAccount
    IsFiscal
    IsElectronic
    IsManual
    IsQuotation
    MaxItems
    DocumentDescription
    IsTest
    FromDate
    CurrencyID
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
    BranchID
    BrandID
    CompanyID
    ControlStock
    IsActive
    IsOffer
    ItemCategoryID
    ItemCode
    ItemDescription
    ItemID
    ItemSubcategoryID
    LastModified
    OEM
    ReplenishmentStock
    SupplierID
    WarehouseID
    BranchData {
      BranchName
    }
    BrandData {
      BrandName
    }
    CompanyData {
      CompanyName
    }
    CategoryData {
      CategoryName
    }
    SupplierData {
      FirstName
      LastName
    }
    WarehouseData {
      WarehouseName
    }
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
    OrderDate
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
    TotalTaxAmount
    UserID
    DocumentID
    PriceListID
    OrderStatusID
    WarehouseID
    SaleConditionData {
      SaleConditionID
      Name
    }
    ClientData {
      ClientID
      FirstName
      LastName
      VendorID
    }
    UserData {
      UserID
      Nickname
      FullName
    }
    DiscountData {
      DiscountID
      DiscountName
      Percentage
    }
    VendorData {
      VendorID
      VendorName
    }
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
export const GetAllPricelistItemsDocument = gql`
    query GetAllPricelistItems {
  allPricelistitems {
    PriceListID
    ItemID
    Price
    EffectiveDate
    PriceListData {
      PriceListName
      PriceListDescription
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
    ServiceTypeName
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
    CompanyID
    CompanyData {
      CompanyID
      CompanyName
    }
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
  allUserpermissions {
    UserID
    CompanyID
    BranchID
    RoleID
    UserData {
      FullName
    }
    CompanyData {
      CompanyName
    }
    BranchData {
      BranchName
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
    query GetBranchById($id: Int!) {
  branchesById(id: $id) {
    Address
    BranchID
    BranchName
    CompanyID
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
    CompanyID
    BranchName
    Address
    Phone
    CompanyData {
      CompanyID
      CompanyName
    }
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
    query GetBrandById($id: Int!, $companyId: Int!) {
  brandsById(id: $id, companyID: $companyId) {
    BrandID
    BrandName
    CompanyID
    IsActive
    CompanyData {
      CompanyName
    }
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
 *      companyId: // value for 'companyId'
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
export const GetBrandsByCompanyDocument = gql`
    query GetBrandsByCompany($companyID: Int!) {
  brandsByCompany(companyID: $companyID) {
    BrandID
    BrandName
    CompanyID
    IsActive
    CompanyData {
      CompanyName
    }
  }
}
    `;

/**
 * __useGetBrandsByCompanyQuery__
 *
 * To run a query within a React component, call `useGetBrandsByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandsByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandsByCompanyQuery({
 *   variables: {
 *      companyID: // value for 'companyID'
 *   },
 * });
 */
export function useGetBrandsByCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetBrandsByCompanyQuery, GetBrandsByCompanyQueryVariables> & ({ variables: GetBrandsByCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandsByCompanyQuery, GetBrandsByCompanyQueryVariables>(GetBrandsByCompanyDocument, options);
      }
export function useGetBrandsByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandsByCompanyQuery, GetBrandsByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandsByCompanyQuery, GetBrandsByCompanyQueryVariables>(GetBrandsByCompanyDocument, options);
        }
export function useGetBrandsByCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBrandsByCompanyQuery, GetBrandsByCompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBrandsByCompanyQuery, GetBrandsByCompanyQueryVariables>(GetBrandsByCompanyDocument, options);
        }
export type GetBrandsByCompanyQueryHookResult = ReturnType<typeof useGetBrandsByCompanyQuery>;
export type GetBrandsByCompanyLazyQueryHookResult = ReturnType<typeof useGetBrandsByCompanyLazyQuery>;
export type GetBrandsByCompanySuspenseQueryHookResult = ReturnType<typeof useGetBrandsByCompanySuspenseQuery>;
export type GetBrandsByCompanyQueryResult = Apollo.QueryResult<GetBrandsByCompanyQuery, GetBrandsByCompanyQueryVariables>;
export const GetCarBrandByIdDocument = gql`
    query GetCarBrandById($id: Int!, $companyId: Int!) {
  carbrandsById(id: $id, companyID: $companyId) {
    CarBrandID
    CarBrandName
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
 *      companyId: // value for 'companyId'
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
    query GetCarById($id: Int!, $companyId: Int!) {
  carsById(id: $id, companyID: $companyId) {
    CarID
    LicensePlate
    Year
    CarModelID
    ClientID
    LastServiceMileage
    IsDebtor
    DiscountID
    CarModelData {
      CarModelName
    }
    CarBrandData {
      CarBrandName
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
 *      companyId: // value for 'companyId'
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
    CarBrandName
  }
  carModels: allCarmodels {
    CarModelID
    CarBrandID
    CarModelName
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
    query GetCarModelById($id: Int!, $carBrandId: Int!, $companyId: Int!) {
  carmodelsById(id: $id, carBrandID: $carBrandId, companyID: $companyId) {
    CarModelID
    CarBrandID
    CarModelName
    CarBrandData {
      CarBrandName
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
 *      carBrandId: // value for 'carBrandId'
 *      companyId: // value for 'companyId'
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
    query GetCarModelsByBrand($brandID: Int!, $companyId: Int!) {
  carmodelsByBrand(carBrandID: $brandID, companyID: $companyId) {
    CarModelID
    CarBrandID
    CarModelName
    CarBrandData {
      CarBrandName
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
 *      companyId: // value for 'companyId'
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
    CompanyID
    BranchID
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
  companies: allCompany {
    CompanyID
    CompanyName
  }
  branches: allBranches {
    BranchID
    CompanyID
    BranchName
  }
  provinces: allProvinces {
    ProvinceID
    CountryID
    ProvinceName
  }
  warehouses: allWarehouses {
    WarehouseID
    WarehouseName
    Address
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
export const GetClientsByBranchDocument = gql`
    query GetClientsByBranch($companyID: Int!, $branchID: Int!) {
  clientsByBranch(companyID: $companyID, branchID: $branchID) {
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
    CompanyID
    BranchID
  }
}
    `;

/**
 * __useGetClientsByBranchQuery__
 *
 * To run a query within a React component, call `useGetClientsByBranchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientsByBranchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientsByBranchQuery({
 *   variables: {
 *      companyID: // value for 'companyID'
 *      branchID: // value for 'branchID'
 *   },
 * });
 */
export function useGetClientsByBranchQuery(baseOptions: Apollo.QueryHookOptions<GetClientsByBranchQuery, GetClientsByBranchQueryVariables> & ({ variables: GetClientsByBranchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientsByBranchQuery, GetClientsByBranchQueryVariables>(GetClientsByBranchDocument, options);
      }
export function useGetClientsByBranchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientsByBranchQuery, GetClientsByBranchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientsByBranchQuery, GetClientsByBranchQueryVariables>(GetClientsByBranchDocument, options);
        }
export function useGetClientsByBranchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClientsByBranchQuery, GetClientsByBranchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClientsByBranchQuery, GetClientsByBranchQueryVariables>(GetClientsByBranchDocument, options);
        }
export type GetClientsByBranchQueryHookResult = ReturnType<typeof useGetClientsByBranchQuery>;
export type GetClientsByBranchLazyQueryHookResult = ReturnType<typeof useGetClientsByBranchLazyQuery>;
export type GetClientsByBranchSuspenseQueryHookResult = ReturnType<typeof useGetClientsByBranchSuspenseQuery>;
export type GetClientsByBranchQueryResult = Apollo.QueryResult<GetClientsByBranchQuery, GetClientsByBranchQueryVariables>;
export const GetClientsByCompanyDocument = gql`
    query GetClientsByCompany($companyID: Int!) {
  clientsByCompany(companyID: $companyID) {
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
    CompanyID
    BranchID
  }
}
    `;

/**
 * __useGetClientsByCompanyQuery__
 *
 * To run a query within a React component, call `useGetClientsByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientsByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientsByCompanyQuery({
 *   variables: {
 *      companyID: // value for 'companyID'
 *   },
 * });
 */
export function useGetClientsByCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetClientsByCompanyQuery, GetClientsByCompanyQueryVariables> & ({ variables: GetClientsByCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientsByCompanyQuery, GetClientsByCompanyQueryVariables>(GetClientsByCompanyDocument, options);
      }
export function useGetClientsByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientsByCompanyQuery, GetClientsByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientsByCompanyQuery, GetClientsByCompanyQueryVariables>(GetClientsByCompanyDocument, options);
        }
export function useGetClientsByCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClientsByCompanyQuery, GetClientsByCompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClientsByCompanyQuery, GetClientsByCompanyQueryVariables>(GetClientsByCompanyDocument, options);
        }
export type GetClientsByCompanyQueryHookResult = ReturnType<typeof useGetClientsByCompanyQuery>;
export type GetClientsByCompanyLazyQueryHookResult = ReturnType<typeof useGetClientsByCompanyLazyQuery>;
export type GetClientsByCompanySuspenseQueryHookResult = ReturnType<typeof useGetClientsByCompanySuspenseQuery>;
export type GetClientsByCompanyQueryResult = Apollo.QueryResult<GetClientsByCompanyQuery, GetClientsByCompanyQueryVariables>;
export const GetCompanyByIdDocument = gql`
    query GetCompanyById($id: Int!) {
  companyById(id: $id) {
    CompanyID
    CompanyName
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
    CountryName
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
    CreditCardGroupData {
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
    OrderDate
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
  commercialdocumentsById(id: $id) {
    DocumentID
    CompanyID
    BranchID
    DocumentTypeID
    DocumentDescription
    DocumentNumber
    PointOfSale
    IsActive
    IsTest
    ShouldAccount
    AffectsStock
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
  sysIdentityDocTypes {
    DocTypeID
    DocTypeName
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
    query GetItemById($id: Int!, $companyId: Int!) {
  itemsById(id: $id, companyID: $companyId) {
    ItemID
    CompanyID
    BranchID
    BrandID
    ItemCode
    ItemDescription
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
 *      companyId: // value for 'companyId'
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
export const GetItemsFormDataDocument = gql`
    query GetItemsFormData {
  brands: allBrands {
    BrandID
    BrandName
  }
  categories: allItemcategories {
    ItemCategoryID
    CategoryName
  }
  subcategories: allItemsubcategories {
    ItemSubcategoryID
    ItemCategoryID
    SubcategoryName
  }
  suppliers: allSuppliers {
    SupplierID
    FirstName
    LastName
  }
}
    `;

/**
 * __useGetItemsFormDataQuery__
 *
 * To run a query within a React component, call `useGetItemsFormDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsFormDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemsFormDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetItemsFormDataQuery(baseOptions?: Apollo.QueryHookOptions<GetItemsFormDataQuery, GetItemsFormDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemsFormDataQuery, GetItemsFormDataQueryVariables>(GetItemsFormDataDocument, options);
      }
export function useGetItemsFormDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemsFormDataQuery, GetItemsFormDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemsFormDataQuery, GetItemsFormDataQueryVariables>(GetItemsFormDataDocument, options);
        }
export function useGetItemsFormDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetItemsFormDataQuery, GetItemsFormDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetItemsFormDataQuery, GetItemsFormDataQueryVariables>(GetItemsFormDataDocument, options);
        }
export type GetItemsFormDataQueryHookResult = ReturnType<typeof useGetItemsFormDataQuery>;
export type GetItemsFormDataLazyQueryHookResult = ReturnType<typeof useGetItemsFormDataLazyQuery>;
export type GetItemsFormDataSuspenseQueryHookResult = ReturnType<typeof useGetItemsFormDataSuspenseQuery>;
export type GetItemsFormDataQueryResult = Apollo.QueryResult<GetItemsFormDataQuery, GetItemsFormDataQueryVariables>;
export const GetOrderByIdDocument = gql`
    query GetOrderById($id: Int!, $branchId: Int!, $companyId: Int!) {
  ordersById(id: $id, branchID: $branchId, companyID: $companyId) {
    OrderID
    CompanyID
    BranchID
    OrderDate
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
    TotalTaxAmount
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
      LineDescription
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
 *      branchId: // value for 'branchId'
 *      companyId: // value for 'companyId'
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
    PriceListName
    PriceListDescription
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
    query GetPricelistById($id: Int!, $companyId: Int!) {
  pricelistsById(id: $id, companyID: $companyId) {
    PriceListID
    PriceListName
    PriceListDescription
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
 *      companyId: // value for 'companyId'
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
      PriceListName
      PriceListDescription
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
    ProvinceName
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
    ProvinceName
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
export const GetRelationsDocument = gql`
    query GetRelations($Branch: Boolean = false, $Company: Boolean = false, $Country: Boolean = false, $CreditCard: Boolean = false, $DocType: Boolean = false, $Pricelist: Boolean = false, $Province: Boolean = false, $Vendor: Boolean = false) {
  Branch: allBranches @include(if: $Branch) {
    BranchID
    CompanyID
    BranchName
  }
  Company: allCompany @include(if: $Company) {
    CompanyID
    CompanyName
  }
  Country: allCountries @include(if: $Country) {
    CountryID
    CountryName
  }
  CreditCard: allCreditcards @include(if: $CreditCard) {
    CreditCardID
    CreditCardGroupID
    CardName
  }
  DocType: sysIdentityDocTypes @include(if: $DocType) {
    DocTypeID
    DocTypeName
  }
  PriceList: allPricelists @include(if: $Pricelist) {
    PriceListID
    PriceListName
  }
  Province: allProvinces @include(if: $Province) {
    ProvinceID
    CountryID
    ProvinceName
  }
  Vendor: allVendors @include(if: $Vendor) {
    VendorID
    VendorName
  }
}
    `;

/**
 * __useGetRelationsQuery__
 *
 * To run a query within a React component, call `useGetRelationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRelationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRelationsQuery({
 *   variables: {
 *      Branch: // value for 'Branch'
 *      Company: // value for 'Company'
 *      Country: // value for 'Country'
 *      CreditCard: // value for 'CreditCard'
 *      DocType: // value for 'DocType'
 *      Pricelist: // value for 'Pricelist'
 *      Province: // value for 'Province'
 *      Vendor: // value for 'Vendor'
 *   },
 * });
 */
export function useGetRelationsQuery(baseOptions?: Apollo.QueryHookOptions<GetRelationsQuery, GetRelationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRelationsQuery, GetRelationsQueryVariables>(GetRelationsDocument, options);
      }
export function useGetRelationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRelationsQuery, GetRelationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRelationsQuery, GetRelationsQueryVariables>(GetRelationsDocument, options);
        }
export function useGetRelationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRelationsQuery, GetRelationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRelationsQuery, GetRelationsQueryVariables>(GetRelationsDocument, options);
        }
export type GetRelationsQueryHookResult = ReturnType<typeof useGetRelationsQuery>;
export type GetRelationsLazyQueryHookResult = ReturnType<typeof useGetRelationsLazyQuery>;
export type GetRelationsSuspenseQueryHookResult = ReturnType<typeof useGetRelationsSuspenseQuery>;
export type GetRelationsQueryResult = Apollo.QueryResult<GetRelationsQuery, GetRelationsQueryVariables>;
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
    query GetServicetypeById($id: Int!, $companyId: Int!) {
  servicetypesById(id: $id, companyID: $companyId) {
    ServiceTypeID
    ServiceTypeName
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
 *      companyId: // value for 'companyId'
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
  docTypes: sysIdentityDocTypes {
    DocTypeID
    DocTypeName
  }
  countries: allCountries {
    CountryID
    CountryName
  }
  provinces: allProvinces {
    ProvinceID
    CountryID
    ProvinceName
  }
  companies: allCompany {
    CompanyID
    CompanyName
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
export const GetSuppliersByCompanyDocument = gql`
    query GetSuppliersByCompany($companyID: Int!) {
  suppliersByCompany(companyID: $companyID) {
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
    CompanyID
  }
}
    `;

/**
 * __useGetSuppliersByCompanyQuery__
 *
 * To run a query within a React component, call `useGetSuppliersByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuppliersByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuppliersByCompanyQuery({
 *   variables: {
 *      companyID: // value for 'companyID'
 *   },
 * });
 */
export function useGetSuppliersByCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetSuppliersByCompanyQuery, GetSuppliersByCompanyQueryVariables> & ({ variables: GetSuppliersByCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuppliersByCompanyQuery, GetSuppliersByCompanyQueryVariables>(GetSuppliersByCompanyDocument, options);
      }
export function useGetSuppliersByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuppliersByCompanyQuery, GetSuppliersByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuppliersByCompanyQuery, GetSuppliersByCompanyQueryVariables>(GetSuppliersByCompanyDocument, options);
        }
export function useGetSuppliersByCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSuppliersByCompanyQuery, GetSuppliersByCompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSuppliersByCompanyQuery, GetSuppliersByCompanyQueryVariables>(GetSuppliersByCompanyDocument, options);
        }
export type GetSuppliersByCompanyQueryHookResult = ReturnType<typeof useGetSuppliersByCompanyQuery>;
export type GetSuppliersByCompanyLazyQueryHookResult = ReturnType<typeof useGetSuppliersByCompanyLazyQuery>;
export type GetSuppliersByCompanySuspenseQueryHookResult = ReturnType<typeof useGetSuppliersByCompanySuspenseQuery>;
export type GetSuppliersByCompanyQueryResult = Apollo.QueryResult<GetSuppliersByCompanyQuery, GetSuppliersByCompanyQueryVariables>;
export const GetSuppliersByIdDocument = gql`
    query GetSuppliersById($id: Int!) {
  suppliersById(id: $id) {
    SupplierID
    Address
    City
    CompanyID
    CountryID
    DocNumber
    DocTypeID
    Email
    FirstName
    IsActive
    LastName
    Phone
    PostalCode
    ProvinceID
  }
}
    `;

/**
 * __useGetSuppliersByIdQuery__
 *
 * To run a query within a React component, call `useGetSuppliersByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuppliersByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuppliersByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSuppliersByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSuppliersByIdQuery, GetSuppliersByIdQueryVariables> & ({ variables: GetSuppliersByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuppliersByIdQuery, GetSuppliersByIdQueryVariables>(GetSuppliersByIdDocument, options);
      }
export function useGetSuppliersByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuppliersByIdQuery, GetSuppliersByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuppliersByIdQuery, GetSuppliersByIdQueryVariables>(GetSuppliersByIdDocument, options);
        }
export function useGetSuppliersByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSuppliersByIdQuery, GetSuppliersByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSuppliersByIdQuery, GetSuppliersByIdQueryVariables>(GetSuppliersByIdDocument, options);
        }
export type GetSuppliersByIdQueryHookResult = ReturnType<typeof useGetSuppliersByIdQuery>;
export type GetSuppliersByIdLazyQueryHookResult = ReturnType<typeof useGetSuppliersByIdLazyQuery>;
export type GetSuppliersByIdSuspenseQueryHookResult = ReturnType<typeof useGetSuppliersByIdSuspenseQuery>;
export type GetSuppliersByIdQueryResult = Apollo.QueryResult<GetSuppliersByIdQuery, GetSuppliersByIdQueryVariables>;
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
export const GetUserpermissionsByIdDocument = gql`
    query GetUserpermissionsById($userID: Int!, $companyID: Int!, $branchID: Int!, $roleID: Int!) {
  userpermissionsById(
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
      CompanyName
    }
    RoleData {
      RoleName
    }
    BranchData {
      BranchName
    }
  }
}
    `;

/**
 * __useGetUserpermissionsByIdQuery__
 *
 * To run a query within a React component, call `useGetUserpermissionsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserpermissionsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserpermissionsByIdQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *      companyID: // value for 'companyID'
 *      branchID: // value for 'branchID'
 *      roleID: // value for 'roleID'
 *   },
 * });
 */
export function useGetUserpermissionsByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserpermissionsByIdQuery, GetUserpermissionsByIdQueryVariables> & ({ variables: GetUserpermissionsByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserpermissionsByIdQuery, GetUserpermissionsByIdQueryVariables>(GetUserpermissionsByIdDocument, options);
      }
export function useGetUserpermissionsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserpermissionsByIdQuery, GetUserpermissionsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserpermissionsByIdQuery, GetUserpermissionsByIdQueryVariables>(GetUserpermissionsByIdDocument, options);
        }
export function useGetUserpermissionsByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserpermissionsByIdQuery, GetUserpermissionsByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserpermissionsByIdQuery, GetUserpermissionsByIdQueryVariables>(GetUserpermissionsByIdDocument, options);
        }
export type GetUserpermissionsByIdQueryHookResult = ReturnType<typeof useGetUserpermissionsByIdQuery>;
export type GetUserpermissionsByIdLazyQueryHookResult = ReturnType<typeof useGetUserpermissionsByIdLazyQuery>;
export type GetUserpermissionsByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserpermissionsByIdSuspenseQuery>;
export type GetUserpermissionsByIdQueryResult = Apollo.QueryResult<GetUserpermissionsByIdQuery, GetUserpermissionsByIdQueryVariables>;
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
    WarehouseName
    Address
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
    WarehouseName
    Address
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
      ItemDescription
      ItemCode
      ItemID
      Price
      StockQuantity
    }
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