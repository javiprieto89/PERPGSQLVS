/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateBrand2($input: BrandsCreate!) {\n  createBrand(data: $input) {\n    BrandID\n    Name\n    IsActive\n  }\n}": typeof types.CreateBrand2Document,
    "mutation CreateClient($input: ClientsCreate!) {\n  createClient(data: $input) {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}": typeof types.CreateClientDocument,
    "mutation CreateSupplier($input: SuppliersCreate!) {\n  createSupplier(data: $input) {\n    SupplierID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    IsActive\n    CountryID\n    ProvinceID\n    City\n    PostalCode\n  }\n}": typeof types.CreateSupplierDocument,
    "mutation CreateVendor($input: VendorsCreate!) {\n  createVendor(data: $input) {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}": typeof types.CreateVendorDocument,
    "mutation DeleteBrand($brandID: Int!) {\n  deleteBrand(brandID: $brandID)\n}": typeof types.DeleteBrandDocument,
    "mutation DeleteClient($clientID: Int!) {\n  deleteClient(clientID: $clientID) {\n    success\n    message\n  }\n}": typeof types.DeleteClientDocument,
    "mutation DeleteSupplier($supplierID: Int!) {\n  deleteSupplier(supplierID: $supplierID)\n}": typeof types.DeleteSupplierDocument,
    "mutation DeleteVendor($vendorID: Int!) {\n  deleteVendor(vendorID: $vendorID)\n}": typeof types.DeleteVendorDocument,
    "mutation ToggleClientStatus($clientID: Int!, $isActive: Boolean!) {\n  updateClient(clientID: $clientID, data: {IsActive: $isActive}) {\n    ClientID\n    IsActive\n  }\n}": typeof types.ToggleClientStatusDocument,
    "mutation ToggleSupplierStatus($supplierID: Int!, $isActive: Boolean!) {\n  updateSupplier(supplierID: $supplierID, data: {IsActive: $isActive}) {\n    SupplierID\n    IsActive\n  }\n}": typeof types.ToggleSupplierStatusDocument,
    "mutation ToggleVendorStatus($vendorID: Int!, $isActive: Boolean!) {\n  toggleVendorStatus(vendorID: $vendorID, isActive: $isActive) {\n    VendorID\n    IsActive\n  }\n}": typeof types.ToggleVendorStatusDocument,
    "mutation UpdateBrand($brandID: Int!, $input: BrandsUpdate!) {\n  updateBrand(brandID: $brandID, data: $input) {\n    BrandID\n    Name\n    IsActive\n  }\n}": typeof types.UpdateBrandDocument,
    "mutation UpdateClient($clientID: Int!, $input: ClientsUpdate!) {\n  updateClient(clientID: $clientID, data: $input) {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}": typeof types.UpdateClientDocument,
    "mutation UpdateSupplier($supplierID: Int!, $input: SuppliersUpdate!) {\n  updateSupplier(supplierID: $supplierID, data: $input) {\n    SupplierID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    IsActive\n    CountryID\n    ProvinceID\n    City\n    PostalCode\n  }\n}": typeof types.UpdateSupplierDocument,
    "mutation UpdateVendor($vendorID: Int!, $input: VendorsUpdate!) {\n  updateVendor(vendorID: $vendorID, data: $input) {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}": typeof types.UpdateVendorDocument,
    "query GetAllClients {\n  allClients {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}": typeof types.GetAllClientsDocument,
    "query getOrderMassive {\n  allOrders {\n    OrderID\n    CompanyID\n    BranchID\n    Date_\n    ClientID\n    CarID\n    IsService\n    ServiceTypeID\n    Mileage\n    NextServiceMileage\n    Notes\n    SaleConditionID\n    DiscountID\n    Subtotal\n    Total\n    VAT\n    UserID\n    DocumentID\n    PriceListID\n    OrderStatusID\n    WarehouseID\n  }\n  allClients {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n  allSaleconditions {\n    SaleConditionID\n    CreditCardID\n    Name\n    DueDate\n    Surcharge\n    IsActive\n  }\n  allUsers {\n    UserID\n    Nickname\n    FullName\n    IsActive\n  }\n  allVendors {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}": typeof types.GetOrderMassiveDocument,
};
const documents: Documents = {
    "mutation CreateBrand2($input: BrandsCreate!) {\n  createBrand(data: $input) {\n    BrandID\n    Name\n    IsActive\n  }\n}": types.CreateBrand2Document,
    "mutation CreateClient($input: ClientsCreate!) {\n  createClient(data: $input) {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}": types.CreateClientDocument,
    "mutation CreateSupplier($input: SuppliersCreate!) {\n  createSupplier(data: $input) {\n    SupplierID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    IsActive\n    CountryID\n    ProvinceID\n    City\n    PostalCode\n  }\n}": types.CreateSupplierDocument,
    "mutation CreateVendor($input: VendorsCreate!) {\n  createVendor(data: $input) {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}": types.CreateVendorDocument,
    "mutation DeleteBrand($brandID: Int!) {\n  deleteBrand(brandID: $brandID)\n}": types.DeleteBrandDocument,
    "mutation DeleteClient($clientID: Int!) {\n  deleteClient(clientID: $clientID) {\n    success\n    message\n  }\n}": types.DeleteClientDocument,
    "mutation DeleteSupplier($supplierID: Int!) {\n  deleteSupplier(supplierID: $supplierID)\n}": types.DeleteSupplierDocument,
    "mutation DeleteVendor($vendorID: Int!) {\n  deleteVendor(vendorID: $vendorID)\n}": types.DeleteVendorDocument,
    "mutation ToggleClientStatus($clientID: Int!, $isActive: Boolean!) {\n  updateClient(clientID: $clientID, data: {IsActive: $isActive}) {\n    ClientID\n    IsActive\n  }\n}": types.ToggleClientStatusDocument,
    "mutation ToggleSupplierStatus($supplierID: Int!, $isActive: Boolean!) {\n  updateSupplier(supplierID: $supplierID, data: {IsActive: $isActive}) {\n    SupplierID\n    IsActive\n  }\n}": types.ToggleSupplierStatusDocument,
    "mutation ToggleVendorStatus($vendorID: Int!, $isActive: Boolean!) {\n  toggleVendorStatus(vendorID: $vendorID, isActive: $isActive) {\n    VendorID\n    IsActive\n  }\n}": types.ToggleVendorStatusDocument,
    "mutation UpdateBrand($brandID: Int!, $input: BrandsUpdate!) {\n  updateBrand(brandID: $brandID, data: $input) {\n    BrandID\n    Name\n    IsActive\n  }\n}": types.UpdateBrandDocument,
    "mutation UpdateClient($clientID: Int!, $input: ClientsUpdate!) {\n  updateClient(clientID: $clientID, data: $input) {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}": types.UpdateClientDocument,
    "mutation UpdateSupplier($supplierID: Int!, $input: SuppliersUpdate!) {\n  updateSupplier(supplierID: $supplierID, data: $input) {\n    SupplierID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    IsActive\n    CountryID\n    ProvinceID\n    City\n    PostalCode\n  }\n}": types.UpdateSupplierDocument,
    "mutation UpdateVendor($vendorID: Int!, $input: VendorsUpdate!) {\n  updateVendor(vendorID: $vendorID, data: $input) {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}": types.UpdateVendorDocument,
    "query GetAllClients {\n  allClients {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}": types.GetAllClientsDocument,
    "query getOrderMassive {\n  allOrders {\n    OrderID\n    CompanyID\n    BranchID\n    Date_\n    ClientID\n    CarID\n    IsService\n    ServiceTypeID\n    Mileage\n    NextServiceMileage\n    Notes\n    SaleConditionID\n    DiscountID\n    Subtotal\n    Total\n    VAT\n    UserID\n    DocumentID\n    PriceListID\n    OrderStatusID\n    WarehouseID\n  }\n  allClients {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n  allSaleconditions {\n    SaleConditionID\n    CreditCardID\n    Name\n    DueDate\n    Surcharge\n    IsActive\n  }\n  allUsers {\n    UserID\n    Nickname\n    FullName\n    IsActive\n  }\n  allVendors {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}": types.GetOrderMassiveDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateBrand2($input: BrandsCreate!) {\n  createBrand(data: $input) {\n    BrandID\n    Name\n    IsActive\n  }\n}"): (typeof documents)["mutation CreateBrand2($input: BrandsCreate!) {\n  createBrand(data: $input) {\n    BrandID\n    Name\n    IsActive\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateClient($input: ClientsCreate!) {\n  createClient(data: $input) {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}"): (typeof documents)["mutation CreateClient($input: ClientsCreate!) {\n  createClient(data: $input) {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateSupplier($input: SuppliersCreate!) {\n  createSupplier(data: $input) {\n    SupplierID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    IsActive\n    CountryID\n    ProvinceID\n    City\n    PostalCode\n  }\n}"): (typeof documents)["mutation CreateSupplier($input: SuppliersCreate!) {\n  createSupplier(data: $input) {\n    SupplierID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    IsActive\n    CountryID\n    ProvinceID\n    City\n    PostalCode\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateVendor($input: VendorsCreate!) {\n  createVendor(data: $input) {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}"): (typeof documents)["mutation CreateVendor($input: VendorsCreate!) {\n  createVendor(data: $input) {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteBrand($brandID: Int!) {\n  deleteBrand(brandID: $brandID)\n}"): (typeof documents)["mutation DeleteBrand($brandID: Int!) {\n  deleteBrand(brandID: $brandID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteClient($clientID: Int!) {\n  deleteClient(clientID: $clientID) {\n    success\n    message\n  }\n}"): (typeof documents)["mutation DeleteClient($clientID: Int!) {\n  deleteClient(clientID: $clientID) {\n    success\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteSupplier($supplierID: Int!) {\n  deleteSupplier(supplierID: $supplierID)\n}"): (typeof documents)["mutation DeleteSupplier($supplierID: Int!) {\n  deleteSupplier(supplierID: $supplierID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteVendor($vendorID: Int!) {\n  deleteVendor(vendorID: $vendorID)\n}"): (typeof documents)["mutation DeleteVendor($vendorID: Int!) {\n  deleteVendor(vendorID: $vendorID)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ToggleClientStatus($clientID: Int!, $isActive: Boolean!) {\n  updateClient(clientID: $clientID, data: {IsActive: $isActive}) {\n    ClientID\n    IsActive\n  }\n}"): (typeof documents)["mutation ToggleClientStatus($clientID: Int!, $isActive: Boolean!) {\n  updateClient(clientID: $clientID, data: {IsActive: $isActive}) {\n    ClientID\n    IsActive\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ToggleSupplierStatus($supplierID: Int!, $isActive: Boolean!) {\n  updateSupplier(supplierID: $supplierID, data: {IsActive: $isActive}) {\n    SupplierID\n    IsActive\n  }\n}"): (typeof documents)["mutation ToggleSupplierStatus($supplierID: Int!, $isActive: Boolean!) {\n  updateSupplier(supplierID: $supplierID, data: {IsActive: $isActive}) {\n    SupplierID\n    IsActive\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ToggleVendorStatus($vendorID: Int!, $isActive: Boolean!) {\n  toggleVendorStatus(vendorID: $vendorID, isActive: $isActive) {\n    VendorID\n    IsActive\n  }\n}"): (typeof documents)["mutation ToggleVendorStatus($vendorID: Int!, $isActive: Boolean!) {\n  toggleVendorStatus(vendorID: $vendorID, isActive: $isActive) {\n    VendorID\n    IsActive\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateBrand($brandID: Int!, $input: BrandsUpdate!) {\n  updateBrand(brandID: $brandID, data: $input) {\n    BrandID\n    Name\n    IsActive\n  }\n}"): (typeof documents)["mutation UpdateBrand($brandID: Int!, $input: BrandsUpdate!) {\n  updateBrand(brandID: $brandID, data: $input) {\n    BrandID\n    Name\n    IsActive\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateClient($clientID: Int!, $input: ClientsUpdate!) {\n  updateClient(clientID: $clientID, data: $input) {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}"): (typeof documents)["mutation UpdateClient($clientID: Int!, $input: ClientsUpdate!) {\n  updateClient(clientID: $clientID, data: $input) {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateSupplier($supplierID: Int!, $input: SuppliersUpdate!) {\n  updateSupplier(supplierID: $supplierID, data: $input) {\n    SupplierID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    IsActive\n    CountryID\n    ProvinceID\n    City\n    PostalCode\n  }\n}"): (typeof documents)["mutation UpdateSupplier($supplierID: Int!, $input: SuppliersUpdate!) {\n  updateSupplier(supplierID: $supplierID, data: $input) {\n    SupplierID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    IsActive\n    CountryID\n    ProvinceID\n    City\n    PostalCode\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateVendor($vendorID: Int!, $input: VendorsUpdate!) {\n  updateVendor(vendorID: $vendorID, data: $input) {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}"): (typeof documents)["mutation UpdateVendor($vendorID: Int!, $input: VendorsUpdate!) {\n  updateVendor(vendorID: $vendorID, data: $input) {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllClients {\n  allClients {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}"): (typeof documents)["query GetAllClients {\n  allClients {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getOrderMassive {\n  allOrders {\n    OrderID\n    CompanyID\n    BranchID\n    Date_\n    ClientID\n    CarID\n    IsService\n    ServiceTypeID\n    Mileage\n    NextServiceMileage\n    Notes\n    SaleConditionID\n    DiscountID\n    Subtotal\n    Total\n    VAT\n    UserID\n    DocumentID\n    PriceListID\n    OrderStatusID\n    WarehouseID\n  }\n  allClients {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n  allSaleconditions {\n    SaleConditionID\n    CreditCardID\n    Name\n    DueDate\n    Surcharge\n    IsActive\n  }\n  allUsers {\n    UserID\n    Nickname\n    FullName\n    IsActive\n  }\n  allVendors {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}"): (typeof documents)["query getOrderMassive {\n  allOrders {\n    OrderID\n    CompanyID\n    BranchID\n    Date_\n    ClientID\n    CarID\n    IsService\n    ServiceTypeID\n    Mileage\n    NextServiceMileage\n    Notes\n    SaleConditionID\n    DiscountID\n    Subtotal\n    Total\n    VAT\n    UserID\n    DocumentID\n    PriceListID\n    OrderStatusID\n    WarehouseID\n  }\n  allClients {\n    ClientID\n    DocTypeID\n    DocNumber\n    FirstName\n    LastName\n    Phone\n    Email\n    Address\n    City\n    PostalCode\n    IsActive\n    CountryID\n    ProvinceID\n    PriceListID\n    VendorID\n  }\n  allSaleconditions {\n    SaleConditionID\n    CreditCardID\n    Name\n    DueDate\n    Surcharge\n    IsActive\n  }\n  allUsers {\n    UserID\n    Nickname\n    FullName\n    IsActive\n  }\n  allVendors {\n    VendorID\n    VendorName\n    Commission\n    IsActive\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;