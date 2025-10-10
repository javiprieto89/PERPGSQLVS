export const TEXT_OPERATORS = {
  all: "Todos",
  startsWith: "Comienza con",
  contains: "Contiene",
  equals: "Es igual a",
  notEquals: "Es distinto a",
  notContains: "No contiene",
} as const;

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
  User: "Fullname",
} as const;

export type ModelNameMap = keyof typeof MODEL_NAME_MAP | null | undefined;

export const pluralMap = {
  Country: "Countries",
  Province: "Provinces",
  Branch: "Branches",
  Company: "Companydata",
  DocType: "Sysdoctypes",
  SysDocumentType: "Sysdocumenttypes",
  ItemCategory: "Itemcategories",
  ItemSubcategory: "Itemsubcategories",
  PriceList: "Pricelists",
  Supplier: "Suppliers",
  Vendor: "Vendors",
  Warehouse: "Warehouses",
  Brand: "Brands",
  CarBrand: "Carbrands",
  CarModel: "Carmodels",
  Client: "Clients",
  CreditCard: "Creditcards",
  CreditCardGroup: "Creditcardgroups",
  Discount: "Discounts",
  Item: "Items",
  Order: "Orders",
  OrderStatus: "Sysorderstatus",
  SaleCondition: "Saleconditions",
  ServiceType: "Servicetypes",
  User: "Users",
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
