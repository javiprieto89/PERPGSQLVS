// src/App.jsx
import { ApolloProvider } from "@apollo/client";
import { type PropsWithChildren } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import apolloClient from "~/lib/apollo";
import { UserProvider } from "./context/UserContext";
import { useTabSession } from "./hooks/useTabSession";
import { AdminLayout } from "./layout/Layout";
import { AuthHelper } from "./utils/authHelper";

import { BranchForm } from "./pages/branch/form";
import Branches from "./pages/branch/list";
import Brands from "./pages/Brands";
import CarBrands from "./pages/CarBrands";
import CarModels from "./pages/CarModels";
import Cars from "./pages/Cars";
import { ClientsForm } from "./pages/clients/form";
import { Clients } from "./pages/clients/list";
import CompanyData from "./pages/CompanyData";
import CreditCardGroups from "./pages/CreditCardGroups";
import CreditCards from "./pages/CreditCards";
import Dashboard from "./pages/Dashboard";
import Discounts from "./pages/Discounts";
import Documents from "./pages/Documents";
import FeInfo from "./pages/FeInfo";
import FeLastVoucher from "./pages/FeLastVoucher";
import FeLessInfo from "./pages/FeLessInfo";
import { ItemCategoryForm } from "./pages/items/categories/form";
import ItemCategories from "./pages/items/categories/list";
import { ItemForm } from "./pages/items/form";
import Items from "./pages/items/list";
import ItemSubcategoriesForm from "./pages/items/subcategories/form";
import ItemSubcategories from "./pages/items/subcategories/list";
import PriceListCreateLab from "./pages/lab/PriceListCreateLab";
import UiPage from "./pages/lab/ui";
import Login from "./pages/login";
import LogoutSuccess from "./pages/LogoutSuccess";
import NotFound from "./pages/NotFound";
import OrderCreate from "./pages/OrderCreate";
import Orders from "./pages/Orders";
import PriceListItemsBrowser from "./pages/PriceListItemsBrowser";
import PriceLists from "./pages/PriceLists";
import Roles from "./pages/Roles";
import RolesUsers from "./pages/RolesUsers";
import SaleConditions from "./pages/SaleConditions";
import ServiceTypes from "./pages/ServiceTypes";
import StockEntry from "./pages/stock/form";
import { SupplierForm } from "./pages/suppliers/form";
import Suppliers from "./pages/suppliers/list";
import Users from "./pages/Users";
import Vendors from "./pages/Vendors";
import Warehouses from "./pages/Warehouses";

export function RedirectRoot() {
  return (
    <Navigate
      to={AuthHelper.isAuthenticated() ? "/dashboard" : "/login"}
      replace
    />
  );
}

const RequireAuth = ({ children }: PropsWithChildren) => {
  if (!AuthHelper.isAuthenticated()) {
    sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  useTabSession();

  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
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
            <Route path="branches">
              <Route index element={<Branches />} />
              <Route path="form/:id?" element={<BranchForm />} />
            </Route>
            <Route path="clients">
              <Route index element={<Clients />} />
              <Route path="form/:id?" element={<ClientsForm />} />
            </Route>
            <Route path="brands" element={<Brands />} />
            <Route path="carbrands" element={<CarBrands />} />
            <Route path="carmodels" element={<CarModels />} />
            <Route path="cars" element={<Cars />} />
            <Route path="companydata" element={<CompanyData />} />
            <Route path="creditcardgroups" element={<CreditCardGroups />} />
            <Route path="creditcards" element={<CreditCards />} />
            <Route path="discounts" element={<Discounts />} />
            <Route path="documents" element={<Documents />} />
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
              <Route path="form/:id?" element={<ItemSubcategoriesForm />} />
            </Route>
            <Route path="orders" element={<Orders />} />
            <Route path="orders/form/:id?" element={<OrderCreate />} />
            <Route path="pricelistitems" element={<PriceListItemsBrowser />} />
            <Route path="pricelists" element={<PriceLists />} />
            <Route path="roles" element={<Roles />} />
            <Route path="rolesusers" element={<RolesUsers />} />
            <Route path="saleconditions" element={<SaleConditions />} />
            <Route path="servicetypes" element={<ServiceTypes />} />
            <Route path="stock">
              <Route index element={<Items />} />
              <Route path="form/:id?" element={<StockEntry />} />
            </Route>
            <Route path="suppliers">
              <Route index element={<Suppliers />} />
              <Route path="form/:id?" element={<SupplierForm />} />
            </Route>
            <Route path="vendors" element={<Vendors />} />
            <Route path="warehouses" element={<Warehouses />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="lab/ui" element={<UiPage />} />
          <Route path="lab/price-list-form" element={<PriceListCreateLab />} />
        </Routes>
      </UserProvider>
    </ApolloProvider>
  );
}
