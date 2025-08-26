// src/App.jsx
import { ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import apolloClient from "~/lib/apollo";

import Layout from "./layout/Layout";

import RequireAuth from "./components/RequireAuth";
import { UserProvider } from "./context/UserContext";
import Branches from "./pages/Branches";
import Brands from "./pages/Brands";
import CarBrands from "./pages/CarBrands";
import CarModels from "./pages/CarModels";
import Cars from "./pages/Cars";
import Clients from "./pages/Clients";
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
import ItemSubcategories from "./pages/ItemSubcategories";
import Items from "./pages/Items";
import Login from "./pages/Login";
import LogoutSuccess from "./pages/LogoutSuccess";
import OrderCreate from "./pages/OrderCreate";
import Orders from "./pages/Orders";
import PriceListItemsBrowser from "./pages/PriceListItemsBrowser";
import PriceLists from "./pages/PriceLists";
import Roles from "./pages/Roles";
import RolesUsers from "./pages/RolesUsers";
import SaleConditions from "./pages/SaleConditions";
import ServiceTypes from "./pages/ServiceTypes";
import Suppliers from "./pages/Suppliers";
import Users from "./pages/Users";
import Vendors from "./pages/Vendors";
import Warehouses from "./pages/Warehouses";

import PriceListCreateLab from "./pages/lab/PriceListCreateLab";
import UiPage from "./pages/lab/ui";

import { AuthHelper } from "./utils/authHelper";

// Redirecciona la raíz "/" según si hay token
export function RedirectRoot() {
  const token = sessionStorage.getItem("token");
  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
}

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [selectedAccess, setSelectedAccess] = useState(null);

  useEffect(() => {
    // Cargar información del usuario usando AuthHelper
    const authUserInfo = AuthHelper.getUserInfoForHeader();
    const authSelectedAccess = AuthHelper.getSelectedAccess();

    if (authUserInfo) {
      setUserInfo(authUserInfo);
    }

    if (authSelectedAccess) {
      setSelectedAccess(authSelectedAccess);
    }

    // También mantener compatibilidad con el método anterior
    const saved = sessionStorage.getItem("user_info");
    if (saved && !authUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(saved);
        setUserInfo(parsedUserInfo);
      } catch (error) {
        console.error("Error parsing user info:", error);
        // Si hay error, limpiar datos corruptos
        sessionStorage.removeItem("user_info");
        sessionStorage.removeItem("token");
      }
    }

    // Escuchar cambios de acceso
    const handleAccessChange = (event) => {
      setSelectedAccess(event.detail);
    };

    window.addEventListener("accessChanged", handleAccessChange);

    // Configurar ID único para esta pestaña
    const tabId = Date.now().toString();
    window.name = tabId;

    // Registrar esta pestaña en la lista de pestañas abiertas
    const existing = sessionStorage.getItem("open_tabs");
    const parsedTabs = existing ? JSON.parse(existing) : [];
    parsedTabs.push(tabId);
    sessionStorage.setItem("open_tabs", JSON.stringify(parsedTabs));

    // Manejar cierre de pestaña/ventana
    const handleBeforeUnload = () => {
      const tabs = sessionStorage.getItem("open_tabs");
      if (tabs) {
        const parsedTabs = JSON.parse(tabs);
        const updatedTabs = parsedTabs.filter((t) => t !== window.name);
        sessionStorage.setItem("open_tabs", JSON.stringify(updatedTabs));

        // Si es la última pestaña, hacer logout completo
        if (updatedTabs.length === 0) {
          const token = sessionStorage.getItem("token");
          if (token) {
            // Intentar notificar al servidor del logout
            fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }).catch(() => {
              // Si falla, continuar con la limpieza local
            });
          }
          // Limpiar todo el sessionStorage
          sessionStorage.clear();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("accessChanged", handleAccessChange);
    };
  }, []);

  // Manejar cambio de acceso
  const handleAccessChange = (newAccess) => {
    AuthHelper.setSelectedAccess(newAccess);
    setSelectedAccess(newAccess);
  };

  // Manejar login exitoso
  const handleLoginSuccess = () => {
    const authUserInfo = AuthHelper.getUserInfoForHeader();
    const authSelectedAccess = AuthHelper.getSelectedAccess();

    if (authUserInfo) {
      setUserInfo(authUserInfo);
    }

    if (authSelectedAccess) {
      setSelectedAccess(authSelectedAccess);
    }

    // También mantener compatibilidad con el método anterior
    const saved = sessionStorage.getItem("user_info");
    if (saved && !authUserInfo) {
      try {
        setUserInfo(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing user info on login:", error);
      }
    }
  };

  // Manejar logout
  const handleLogout = () => {
    AuthHelper.logout();
    setUserInfo(null);
    setSelectedAccess(null);
  };

  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
        <Route path="/logout" element={<LogoutSuccess />} />
        <Route path="/" element={<RedirectRoot />} />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <ApolloProvider client={apolloClient}>
                <Layout
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  selectedAccess={selectedAccess}
                  onAccessChange={handleAccessChange}
                  onLogout={handleLogout}
                />
              </ApolloProvider>
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="suppliers" element={<Suppliers />} />
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
          <Route path="branches" element={<Branches />} />
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

          <Route path="*" element={<div>404 Page Not found</div>} />

          <Route path="lab/ui" element={<UiPage />} />
          <Route path="lab/price-list-form" element={<PriceListCreateLab />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}
