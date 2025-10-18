import {
  GetAllBranchesDocument,
  GetAllBrandsDocument,
  GetAllCarBrandsDocument,
  GetAllCarModelsDocument,
  GetAllClientsDocument,
  GetAllCompaniesDocument,
  GetAllCreditCardGroupsDocument,
  GetAllCreditCardsDocument,
  GetAllDiscountsDocument,
  GetAllItemCategoriesDocument,
  GetAllItemsDocument,
  GetAllItemSubcategoriesDocument,
  GetAllOrdersDocument,
  GetAllPricelistItemsDocument,
  GetAllSaleConditionsDocument,
  GetAllServicetypesDocument,
  GetAllSuppliersDocument,
  GetAllUsersDocument,
  GetAllVendorsDocument,
  GetCountriesDocument,
  GetDocumentTypesDocument,
  GetProvincesDocument,
  GetWarehousesDocument,
} from "~/graphql/_generated/graphql";

export const TEXT_OPERATORS = {
  all: "Todos",
  contains: "Contiene",
  endsWith: "Termina con",
  equals: "Es igual a",
  notContains: "No contiene",
  notEquals: "Es distinto a",
  startsWith: "Comienza con",
} as const;

export const MATCH_TYPES = {
  all: "all",
  contains: "contains",
  endsWith: "endsWith",
  equals: "equals",
  notContains: "notContains",
  notEquals: "notEquals",
  startsWith: "startsWith",
} as const;

export type MatchType = keyof typeof MATCH_TYPES;

export const MODEL_NAME_MAP = {
  Vendor: "VendorName",
  Client: "FirstName", // Para clientes, usar FirstName como campo principal
  CreditCard: "CardName",
  CreditCardGroup: "GroupName",
  Discount: "DiscountName",
  ItemCategory: "CategoryName",
  ItemSubcategory: "SubcategoryName",
  OrderStatus: "StatusName",
  SaleCondition: "Name",
  ServiceType: "Name",
  User: "FullName",
} as const;

export type ModelNameMap = keyof typeof MODEL_NAME_MAP | null | undefined;

export const graphqlMap = {
  branch: GetAllBranchesDocument,
  brand: GetAllBrandsDocument,
  carbrand: GetAllCarBrandsDocument,
  carmodel: GetAllCarModelsDocument,
  client: GetAllClientsDocument,
  company: GetAllCompaniesDocument,
  country: GetCountriesDocument,
  creditcard: GetAllCreditCardsDocument,
  creditcardgroup: GetAllCreditCardGroupsDocument,
  discount: GetAllDiscountsDocument,
  doctype: GetDocumentTypesDocument,
  item: GetAllItemsDocument,
  itemcategory: GetAllItemCategoriesDocument,
  itemsubcategory: GetAllItemSubcategoriesDocument,
  order: GetAllOrdersDocument,
  pricelist: GetAllPricelistItemsDocument,
  province: GetProvincesDocument,
  salecondition: GetAllSaleConditionsDocument,
  servicetype: GetAllServicetypesDocument,
  supplier: GetAllSuppliersDocument,
  sysdocumenttype: GetDocumentTypesDocument,
  user: GetAllUsersDocument,
  vendor: GetAllVendorsDocument,
  warehouse: GetWarehousesDocument,
} as const;

export const queryMap = {
  Country: "allCountries",
  // Province: "allProvinces",
  // Brand: "allBrands",
  // Vendor: "allVendors",
  // Supplier: "allSuppliers",
  // Warehouse: "allWarehouses",
  // creditcard: "allCreditcards",
  // carmodel: "allCarmodels",
  // salecondition: "allSaleconditions",
  // servicetype: "allServicetypes",
  // user: "allUsers",
  branch: "allBranches",
  company: "allCompany",
  doctype: "sysIdentityDocTypes",
  sysdocumenttype: "Sysdocumenttypes",
  itemcategory: "allItemcategories",
  itemsubcategory: "allItemsubcategories",
  pricelist: "allPricelists",
  carbrand: "allCarbrands",
  client: "allClients",
  creditcardgroup: "allCreditcardgroups",
  discount: "allDiscounts",
  item: "allItems",
  order: "allOrders",
  orderstatus: "allOrderdetails",
} as const;

// query GetClientsFormData2 {
//   allSysdoctypes {
//     DocTypeID
//     Name
//   }
//   allCompany {
//     CompanyID
//     Name
//   }
//   allCountries {
//     CountryID
//     Name
//   }
//   allPricelists {
//     PriceListID
//     Name
//   }
//   allVendors {
//     VendorID
//     VendorName
//   }
// }
// export const relationModel = {
//   Branch: "withBranch",
//   Company: "withCompany",
//   Country: "withCountry",
//   CreditCard: "withCreditCard",
//   DocType: "withDocType",
//   PriceList: "withPricelist",
//   Province: "withProvince",
//   Vendor: "withVendor",
// } as const;

// export type RelationFlags = Record<
//   (typeof relationModel)[keyof typeof relationModel],
//   boolean
// >;
