// src/App.jsx
import { ApolloProvider } from "@apollo/client";
import { type PropsWithChildren } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import apolloClient from "~/lib/apollo";
import { useTabSession } from "./hooks/useTabSession";

import { AdminLayout } from "./layout/Layout";

import { UserProvider } from "./context/UserContext";
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
import ItemCategories from "./pages/ItemCategories";
import Items from "./pages/Items";
import ItemSubcategories from "./pages/ItemSubcategories";
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
import { SupplierForm } from "./pages/suppliers/form";
import Suppliers from "./pages/suppliers/list";
import Users from "./pages/Users";
import Vendors from "./pages/Vendors";
import Warehouses from "./pages/Warehouses";
import { AuthHelper } from "./utils/authHelper";

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
            <Route path="clients">
              <Route index element={<Clients />} />
              <Route path="form/:id?" element={<ClientsForm />} />
            </Route>
            <Route path="suppliers">
              <Route index element={<Suppliers />} />
              <Route path="form/:id?" element={<SupplierForm />} />
            </Route>
            <Route path="brands" element={<Brands />} />
            <Route path="saleconditions" element={<SaleConditions />} />
            <Route path="creditcardgroups" element={<CreditCardGroups />} />
            <Route path="creditcards" element={<CreditCards />} />
            <Route path="discounts" element={<Discounts />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="servicetypes" element={<ServiceTypes />} />
            <Route path="itemcategories" element={<ItemCategories />} />
            <Route path="itemsubcategories" element={<ItemSubcategories />} />
            <Route path="items" element={<Items />} />
            <Route path="pricelists" element={<PriceLists />} />
            <Route path="pricelistitems" element={<PriceListItemsBrowser />} />
            <Route path="warehouses" element={<Warehouses />} />
            <Route path="branches">
              <Route index element={<Branches />} />
              <Route path="form/:id?" element={<BranchForm />} />
            </Route>
            <Route path="companydata" element={<CompanyData />} />
            <Route path="carbrands" element={<CarBrands />} />
            <Route path="carmodels" element={<CarModels />} />
            <Route path="cars" element={<Cars />} />
            <Route path="documents" element={<Documents />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/form/:id?" element={<OrderCreate />} />
            <Route path="roles" element={<Roles />} />
            <Route path="users" element={<Users />} />
            <Route path="rolesusers" element={<RolesUsers />} />
            <Route path="fe-last" element={<FeLastVoucher />} />
            <Route path="fe-info" element={<FeInfo />} />
            <Route path="fe-less-info" element={<FeLessInfo />} />
          </Route>
          <Route path="lab/ui" element={<UiPage />} />
          <Route path="lab/price-list-form" element={<PriceListCreateLab />} />
        </Routes>
      </UserProvider>
    </ApolloProvider>
  );
}
