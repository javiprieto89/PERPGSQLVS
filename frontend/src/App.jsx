import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import RedirectHome from "./components/RedirectHome";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Suppliers from "./pages/Suppliers";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import LogoutSuccess from "./pages/LogoutSuccess";
import OrderCreate from "./pages/OrderCreate";

import { UserProvider } from "./context/UserContext";

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("user_info");
    if (saved) setUserInfo(JSON.parse(saved));

    const id = Date.now().toString();
    window.name = id;
    const existing = sessionStorage.getItem("open_tabs");
    const parsed = existing ? JSON.parse(existing) : [];
    parsed.push(id);
    sessionStorage.setItem("open_tabs", JSON.stringify(parsed));

    const handleBeforeUnload = () => {
      const tabs = sessionStorage.getItem("open_tabs");
      if (tabs) {
        const parsedTabs = JSON.parse(tabs);
        const updated = parsedTabs.filter((t) => t !== window.name);
        sessionStorage.setItem("open_tabs", JSON.stringify(updated));

        if (updated.length === 0) {
          const token = sessionStorage.getItem("token");
          if (token) {
            fetch("http://127.0.0.1:8000/logout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }).catch(() => {});
          }
          sessionStorage.clear();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <UserProvider>
      <Routes>
        {/* Login sin layout */}
        <Route
          path="/login"
          element={
            <Login
              onLogin={() =>
                setUserInfo(JSON.parse(sessionStorage.getItem("user_info")))
              }
            />
          }
        />

        {/* Pantalla de logout */}
        <Route path="/logout" element={<LogoutSuccess />} />

        {/* Redirecciona según sesión */}
        <Route path="/" element={<RedirectHome />} />

        {/* Rutas protegidas con layout */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout userInfo={userInfo} setUserInfo={setUserInfo} />
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}
