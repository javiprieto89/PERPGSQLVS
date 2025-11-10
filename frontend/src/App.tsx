// src/App.jsx
import { ApolloProvider } from "@apollo/client";
import { type PropsWithChildren } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { apolloClient } from "~/lib/apollo";
import { ExternalWindowProvider } from "./context/ExternalWindowContext";
import { UserProvider } from "./context/UserContext";
import { useTabSession } from "./hooks/useTabSession";
import { AdminLayout } from "./layout/Layout";
import { AuthStorage } from "./utils/auth.storage";
import { Referrer } from "./utils/referrer.session";

import { CompanyForm } from "./features/company/CompanyForm";
import { RoleForm } from "./features/role/RoleForm";
import { UserAccessForm } from "./features/useraccess/UserAccessForm";
import FeInfo from "./pages/afip/FeInfo";
import FeLastVoucher from "./pages/afip/FeLastVoucher";
import FeLessInfo from "./pages/afip/FeLessInfo";
import { BankAccountForm } from "./pages/bank-account/form";
import BankAccounts from "./pages/bank-account/list";
import { BankReconciliationForm } from "./pages/bank-reconciliation/form";
import BankReconciliations from "./pages/bank-reconciliation/list";
import { BankForm } from "./pages/bank/form";
import Banks from "./pages/bank/list";
import { BranchFormPage } from "./pages/branch/form";
import Branches from "./pages/branch/list";
import { BrandForm } from "./pages/brands/form";
import Brands from "./pages/brands/list";
import { CarBrandForm } from "./pages/carbrands/form";
import CarBrands from "./pages/carbrands/list";
import { CarModelForm } from "./pages/carmodels/form";
import { CarModelsList } from "./pages/carmodels/list";
import { CarForm } from "./pages/cars/form";
import Cars from "./pages/cars/list";
import CheckMovements from "./pages/check-movement/list";
import CheckForm from "./pages/check/form";
import Checks from "./pages/check/list";
import { ClientsForm } from "./pages/clients/form";
import { Clients } from "./pages/clients/list";
import { DocumentForm } from "./pages/commercial-documents/form";
import { CommercialDocumentsList } from "./pages/commercial-documents/list";
import { CompanyList } from "./pages/companies/list";
import { CreditCardGroupForm } from "./pages/creditcardgroups/form";
import CreditCardGroups from "./pages/creditcardgroups/list";
import { CreditCardForm } from "./pages/creditcards/form";
import CreditCards from "./pages/creditcards/list";
import Dashboard from "./pages/Dashboard";
import { DiscountForm } from "./pages/discounts/form";
import Discounts from "./pages/discounts/list";
import { ItemCategoryForm } from "./pages/items-categories/form";
import ItemCategories from "./pages/items-categories/list";
import { ItemSubcategoryForm } from "./pages/items-subcategories/form";
import ItemSubcategories from "./pages/items-subcategories/list";
import { ItemForm } from "./pages/items/form";
import Items from "./pages/items/list";
import PriceListCreateLab from "./pages/lab/PriceListCreateLab";
import UiPage from "./pages/lab/ui";
import Login from "./pages/login";
import LogoutSuccess from "./pages/LogoutSuccess";
import NotFound from "./pages/NotFound";
import { Orderform } from "./pages/orders/form";
import { OrdersList } from "./pages/orders/list";
import PriceListItemsForm from "./pages/pricelistitems/form";
import PriceListItems from "./pages/pricelistitems/PriceListItemsBrowser";
import { PriceListForm } from "./pages/pricelists/form";
import PriceLists from "./pages/pricelists/list";
import PurchaseInvoiceDetailForm from "./pages/purchase-invoice-detail/form";
import PurchaseInvoiceDetailList from "./pages/purchase-invoice-detail/list";
import RmaDetailForm from "./pages/rma-detail/form";
import RmaDetailList from "./pages/rma-detail/list";
import RmaForm from "./pages/rma/form";
import RmaList from "./pages/rma/list";
import Roles from "./pages/roles/list";
import { SaleConditionForm } from "./pages/saleconditions/form";
import SaleConditions from "./pages/saleconditions/list";
import { ServiceTypeForm } from "./pages/servicetypes/form";
import ServiceTypes from "./pages/servicetypes/list";
import StockEntry from "./pages/stock/form";
import { SupplierForm } from "./pages/suppliers/form";
import Suppliers from "./pages/suppliers/list";
import { UserPermissionsForm } from "./pages/users-permissions/form";
import { UserPermissions } from "./pages/users-permissions/list";
import Users from "./pages/users/list";
import { VendorForm } from "./pages/vendors/form";
import Vendors from "./pages/vendors/list";
import { WarehouseForm } from "./pages/warehouses/form";
import Warehouses from "./pages/warehouses/list";

export function RedirectRoot() {
  console.log("RedirectRoot", { isAuth: AuthStorage.hasToken(), referrer: Referrer.get() });
  const referrer = Referrer.get() ? Referrer.getOnce() : "/dashboard";
  return (
    <Navigate
      to={AuthStorage.hasToken() ? referrer : "/login"}
      replace
    />
  );
}

const RequireAuth = ({ children }: PropsWithChildren) => {
  if (!AuthStorage.hasToken()) {
    if (Referrer.get() === null) Referrer.set(window.location.pathname);
    console.log("RequireAuth", { isAuth: AuthStorage.hasToken(), referrer: Referrer.get(), token: AuthStorage.getToken() });
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  useTabSession();

  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <ExternalWindowProvider>
          <Routes>
            <Route index path="/" element={<RedirectRoot />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogoutSuccess />} />

            {/* Rutas protegidas */}
            <Route
              element={
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route
                path="dashboard"
                element={
                  <Dashboard />
                }
              />
              <Route path="banks">
                <Route index element={<Banks />} />
                <Route path="form/:id?" element={<BankForm />} />
              </Route>
              <Route path="bankaccounts">
                <Route index element={<BankAccounts />} />
                <Route path="form/:id?" element={<BankAccountForm />} />
              </Route>
              <Route path="bankreconciliations">
                <Route index element={<BankReconciliations />} />
                <Route path="form/:id?" element={<BankReconciliationForm />} />
              </Route>
              <Route path="branches">
                <Route index element={<Branches />} />
                <Route path="form/:id?" element={<BranchFormPage />} />
              </Route>
              <Route path="brands">
                <Route index element={<Brands />} />
                <Route path="form/:id?" element={<BrandForm />} />
              </Route>
              <Route path="carbrands">
                <Route index element={<CarBrands />} />
                <Route path="form/:id?" element={<CarBrandForm />} />
              </Route>
              <Route path="carmodels">
                <Route index element={<CarModelsList />} />
                <Route path="form/:id?" element={<CarModelForm />} />
              </Route>
              <Route path="cars">
                <Route index element={<Cars />} />
                <Route path="form/:id?" element={<CarForm />} />
              </Route>
              <Route path="companies">
                <Route index element={<CompanyList />} />
                <Route path="form/:id?" element={<CompanyForm />} />
              </Route>
              <Route path="checkmovements" element={<CheckMovements />} />
              <Route path="checks">
                <Route index element={<Checks />} />
                <Route path="form/:id?" element={<CheckForm />} />
              </Route>
              <Route path="clients">
                <Route index element={<Clients />} />
                <Route path="form/:id?" element={<ClientsForm />} />
              </Route>
              <Route path="creditcardgroups">
                <Route index element={<CreditCardGroups />} />
                <Route path="form/:id?" element={<CreditCardGroupForm />} />
              </Route>
              <Route path="creditcards">
                <Route index element={<CreditCards />} />
                <Route path="form/:id?" element={<CreditCardForm />} />
              </Route>
              <Route path="discounts">
                <Route index element={<Discounts />} />
                <Route path="form/:id?" element={<DiscountForm />} />
              </Route>
              <Route path="documents">
                <Route index element={<CommercialDocumentsList />} />
                <Route path="form/:id?" element={<DocumentForm />} />
              </Route>
              <Route path="fe-info" element={<FeInfo />} />
              <Route path="fe-last" element={<FeLastVoucher />} />
              <Route path="fe-less-info" element={<FeLessInfo />} />
              <Route path="items">
                <Route index element={<Items />} />
                <Route path="form/:id?" element={<ItemForm />} />
              </Route>
              <Route path="items/categories">
                <Route index element={<ItemCategories />} />
                <Route path="form/:id?" element={<ItemCategoryForm />} />
              </Route>
              <Route path="items/subcategories">
                <Route index element={<ItemSubcategories />} />
                <Route path="form/:id?" element={<ItemSubcategoryForm />} />
              </Route>
              <Route path="orders">
                <Route index element={<OrdersList />} />
                <Route path="form/:id?" element={<Orderform />} />
              </Route>
              <Route path="pricelistitems">
                <Route index element={<PriceListItems />} />
                <Route path="form/:id?" element={<PriceListItemsForm />} />
              </Route>
              <Route path="pricelists">
                <Route index element={<PriceLists />} />
                <Route path="form/:id?" element={<PriceListForm />} />
              </Route>
              <Route path="purchaseinvoicedetails">
                <Route index element={<PurchaseInvoiceDetailList />} />
                <Route path="form/:id?" element={<PurchaseInvoiceDetailForm />} />
              </Route>
              <Route path="rma">
                <Route index element={<RmaList />} />
                <Route path="form/:id?" element={<RmaForm />} />
              </Route>
              <Route path="rmadetails">
                <Route index element={<RmaDetailList />} />
                <Route path="form/:id?" element={<RmaDetailForm />} />
              </Route>
              <Route path="roles">
                <Route index element={<Roles />} />
                <Route path="form/:id?" element={<RoleForm />} />
              </Route>
              <Route path="saleconditions">
                <Route index element={<SaleConditions />} />
                <Route path="form/:id?" element={<SaleConditionForm />} />
              </Route>
              <Route path="servicetypes">
                <Route index element={<ServiceTypes />} />
                <Route path="form/:id?" element={<ServiceTypeForm />} />
              </Route>
              <Route path="stock">
                <Route index element={<Items />} />
                <Route path="form/:id?" element={<StockEntry />} />
              </Route>
              <Route path="suppliers">
                <Route index element={<Suppliers />} />
                <Route path="form/:id?" element={<SupplierForm />} />
              </Route>
              <Route path="vendors">
                <Route index element={<Vendors />} />
                <Route path="form/:id?" element={<VendorForm />} />
              </Route>
              <Route path="warehouses">
                <Route index element={<Warehouses />} />
                <Route path="form/:id?" element={<WarehouseForm />} />
              </Route>
              <Route path="users">
                <Route index element={<Users />} />
                <Route path="form/:id?" element={<div>User Form - TODO</div>} />
              </Route>
              <Route path="users/permissions">
                <Route index element={<UserPermissions />} />
                <Route path="form/:id?" element={<UserPermissionsForm />} />
                <Route path="form2/:id?" element={<UserAccessForm />} />
              </Route>
            </Route>
            <Route path="labe">
              <Route path="ui" element={<UiPage />} />
              <Route path="price-list-form" element={<PriceListCreateLab />} />
            </Route>
          </Routes>
        </ExternalWindowProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
