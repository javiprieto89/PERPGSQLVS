export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  CompanyID: Scalars['Int']['input'];
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
  CarBrandID: Scalars['Int']['output'];
  CarBrandName?: Maybe<Scalars['String']['output']>;
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
  CarBrandID?: Maybe<Scalars['Int']['output']>;
  CarBrandName?: Maybe<Scalars['String']['output']>;
  CarID: Scalars['Int']['output'];
  CarModelID: Scalars['Int']['output'];
  CarModelName?: Maybe<Scalars['String']['output']>;
  ClientFirstName?: Maybe<Scalars['String']['output']>;
  ClientID: Scalars['Int']['output'];
  ClientLastName?: Maybe<Scalars['String']['output']>;
  ClientName?: Maybe<Scalars['String']['output']>;
  CompanyID?: Maybe<Scalars['Int']['output']>;
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
  City?: InputMaybe<Scalars['String']['input']>;
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
  City?: Maybe<Scalars['String']['output']>;
  ClientID: Scalars['Int']['output'];
  CountryID: Scalars['Int']['output'];
  DocNumber?: Maybe<Scalars['String']['output']>;
  DocTypeID: Scalars['Int']['output'];
  Email?: Maybe<Scalars['String']['output']>;
  FirstName: Scalars['String']['output'];
  IsActive: Scalars['Boolean']['output'];
  LastName?: Maybe<Scalars['String']['output']>;
  Phone?: Maybe<Scalars['String']['output']>;
  PostalCode?: Maybe<Scalars['String']['output']>;
  PriceListID: Scalars['Int']['output'];
  ProvinceID: Scalars['Int']['output'];
  VendorID: Scalars['Int']['output'];
};

export type ClientsUpdate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  City?: InputMaybe<Scalars['String']['input']>;
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
  GroupName?: Maybe<Scalars['String']['output']>;
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
  BrandName?: Maybe<Scalars['String']['output']>;
  CategoryName?: Maybe<Scalars['String']['output']>;
  Code: Scalars['String']['output'];
  Description: Scalars['String']['output'];
  ItemID: Scalars['Int']['output'];
  Price?: Maybe<Scalars['Float']['output']>;
  StockQuantity?: Maybe<Scalars['Int']['output']>;
  SubcategoryName?: Maybe<Scalars['String']['output']>;
  SupplierName?: Maybe<Scalars['String']['output']>;
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
  CategoryName?: Maybe<Scalars['String']['output']>;
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
  BranchID: Scalars['Int']['output'];
  BrandID: Scalars['Int']['output'];
  BrandName?: Maybe<Scalars['String']['output']>;
  CategoryName?: Maybe<Scalars['String']['output']>;
  Code: Scalars['String']['output'];
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
  SubcategoryName?: Maybe<Scalars['String']['output']>;
  SupplierID: Scalars['Int']['output'];
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
  ItemID: Scalars['Int']['output'];
  LastModified?: Maybe<Scalars['DateTime']['output']>;
  OrderDetailID: Scalars['Int']['output'];
  OrderID: Scalars['Int']['output'];
  Quantity: Scalars['Int']['output'];
  UnitPrice: Scalars['Float']['output'];
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
  BranchID: Scalars['Int']['output'];
  CarID?: Maybe<Scalars['Int']['output']>;
  ClientID: Scalars['Int']['output'];
  CompanyID: Scalars['Int']['output'];
  Date_: Scalars['DateTime']['output'];
  DiscountID: Scalars['Int']['output'];
  DocumentID: Scalars['Int']['output'];
  IsService?: Maybe<Scalars['Boolean']['output']>;
  Items?: Maybe<Array<OrderDetailsInDb>>;
  Mileage?: Maybe<Scalars['Int']['output']>;
  NextServiceMileage?: Maybe<Scalars['Int']['output']>;
  Notes?: Maybe<Scalars['String']['output']>;
  OrderID: Scalars['Int']['output'];
  OrderStatusID: Scalars['Int']['output'];
  PriceListID: Scalars['Int']['output'];
  SaleConditionID: Scalars['Int']['output'];
  ServiceTypeID?: Maybe<Scalars['Int']['output']>;
  Subtotal: Scalars['Float']['output'];
  Total: Scalars['Float']['output'];
  UserID: Scalars['Int']['output'];
  VAT: Scalars['Float']['output'];
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
  Code?: Maybe<Scalars['String']['output']>;
  Description?: Maybe<Scalars['String']['output']>;
  EffectiveDate: Scalars['DateTime']['output'];
  ItemID: Scalars['Int']['output'];
  Price: Scalars['Float']['output'];
  PriceListID: Scalars['Int']['output'];
  PriceListName?: Maybe<Scalars['String']['output']>;
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
  brandsById?: Maybe<BrandsInDb>;
  carbrandsById?: Maybe<CarBrandsInDb>;
  carmodelsByBrand: Array<CarModelsInDb>;
  carmodelsById?: Maybe<CarModelsInDb>;
  carsById?: Maybe<CarsInDb>;
  cashboxesById?: Maybe<CashBoxesInDb>;
  cashboxmovementsById?: Maybe<CashBoxMovementsInDb>;
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


export type QueryBrandsByIdArgs = {
  id: Scalars['Int']['input'];
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


export type QueryCarsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCashboxesByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCashboxmovementsByIdArgs = {
  id: Scalars['Int']['input'];
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
  City?: InputMaybe<Scalars['String']['input']>;
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
  CountryID?: Maybe<Scalars['Int']['output']>;
  DocNumber?: Maybe<Scalars['String']['output']>;
  DocTypeID?: Maybe<Scalars['Int']['output']>;
  Email?: Maybe<Scalars['String']['output']>;
  FirstName: Scalars['String']['output'];
  IsActive?: Maybe<Scalars['Boolean']['output']>;
  LastName?: Maybe<Scalars['String']['output']>;
  Phone?: Maybe<Scalars['String']['output']>;
  PostalCode?: Maybe<Scalars['String']['output']>;
  ProvinceID?: Maybe<Scalars['Int']['output']>;
  SupplierID: Scalars['Int']['output'];
};

export type SuppliersUpdate = {
  Address?: InputMaybe<Scalars['String']['input']>;
  City?: InputMaybe<Scalars['String']['input']>;
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
  BranchID: Scalars['Int']['output'];
  BranchName?: Maybe<Scalars['String']['output']>;
  CompanyID: Scalars['Int']['output'];
  CompanyName?: Maybe<Scalars['String']['output']>;
  RoleID: Scalars['Int']['output'];
  RoleName?: Maybe<Scalars['String']['output']>;
  UserID: Scalars['Int']['output'];
  UserName?: Maybe<Scalars['String']['output']>;
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
