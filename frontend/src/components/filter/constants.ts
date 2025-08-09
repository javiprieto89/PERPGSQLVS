export const TEXT_OPERATORS = {
  all: "Todos",
  startWith: "Comienza con",
  contains: "Contiene",
  equals: "Es igual a",
  notEquals: "Es distinto a",
  notContains: "No contiene",
} as const;

export const nameFieldMap = {
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

export type NameFieldMap = keyof typeof nameFieldMap;

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
