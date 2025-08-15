// src/layout/Layout.jsx
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "~/components/Header";
import RenderInWindow from "~/components/RenderInWindow";
import Sidebar from "~/components/Sidebar";
import { SidebarCollapsible } from "~/components/ui/sidebar/SidebarCollapsable";
import { AuthHelper } from "~/utils/authHelper";

export default function Layout({
  userInfo,
  setUserInfo,
  selectedAccess,
  onAccessChange,
  onLogout,
}) {
  const navigate = useNavigate();
  // Ventanas flotantes
  const [windows, setWindows] = useState([]);

  // Estado interno para compatibilidad con el código existente
  const [internalSelectedAccess, setInternalSelectedAccess] = useState({
    Company: "",
    Branch: "",
    Role: "",
  });

  // Carga inicial: accesos y selección guardados en sessionStorage
  useEffect(() => {
    let access = selectedAccess || AuthHelper.getSelectedAccess();

    if (!access) {
      const storedSelected = sessionStorage.getItem("selected_access");
      if (storedSelected) {
        try {
          access = JSON.parse(storedSelected);
        } catch (e) {
          console.error("Error parsing stored selected access", e);
        }
      }
    }

    if (access) {
      const normalized = AuthHelper.normalizeAccess(access);
      setInternalSelectedAccess({
        Company: normalized.Company,
        Branch: normalized.Branch,
        Role: normalized.Role,
      });
    }
  }, [selectedAccess]);

  // Logout: limpia estado global y local
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback al método anterior
      setUserInfo(null);
      sessionStorage.clear();
      navigate("/logout");
    }
  };

  // Funciones para ventanas flotantes
  const closeWindow = (id) => {
    setWindows((wins) => wins.filter((w) => w.id !== id));
  };

  return (
    <div className="min-h-screen flex overflow-x-hidden">
      {/* Sidebar y cabecera */}
      <SidebarCollapsible>
        <Sidebar />
      </SidebarCollapsible>
      <main className="flex-1 flex flex-col overflow-x-scroll">
        <div className="sticky top-0 z-10 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <Header
            userInfo={userInfo}
            selectedAccess={internalSelectedAccess}
            onChange={onAccessChange}
            onLogout={handleLogout}
          />
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
          {/* Aquí se inyectan las rutas hijas */}
          <Outlet />
        </div>

        {/* Ventanas emergentes */}
        {windows.map((window) => {
          const WindowComponent = window.Component;
          return (
            <RenderInWindow
              key={window.id}
              title={window.title}
              onClose={() => closeWindow(window.id)}
              {...window.options}
            >
              <WindowComponent />
            </RenderInWindow>
          );
        })}
      </main>
    </div>
  );
}
