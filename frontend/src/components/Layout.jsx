// src/components/Layout.jsx
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import RenderInWindow from "./RenderInWindow";

export default function Layout() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [accessData, setAccessData] = useState([]);
  const [selectedAccess, setSelectedAccess] = useState({
    company: "",
    branch: "",
    Role: "",
  });

  // → Estado local para ventanas:
  //   cada item = { id, Component, title, options }
  const [windows, setWindows] = useState([]);

  // Función para abrir una ventana
  const openWindow = (Component, title, options) => {
    const id = Date.now();
    setWindows((w) => [...w, { id, Component, title, options }]);
  };

  // Función para cerrar
  const closeWindow = (id) => {
    setWindows((w) => w.filter((win) => win.id !== id));
  };

  // — resto de tus efectos para userInfo, logout, etc. —
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user_info");
    if (storedUser) setUserInfo(JSON.parse(storedUser));
    // … y accessData, selectedAccess …
  }, []);

  // logout
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/logout");
  };

  // selection change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newSel = { ...selectedAccess, [name]: value };
    setSelectedAccess(newSel);
    sessionStorage.setItem("selected_access", JSON.stringify(newSel));
  };

  // tus arrays de companies, branches, roles …
  const uniqueCompanies = Array.from(new Set(accessData.map((a) => a.company)));
  const branchesForCompany = Array.from(
    new Set(
      accessData
        .filter((a) => a.company === selectedAccess.company)
        .map((a) => a.branch)
    )
  );
  const rolesForBranch = Array.from(
    new Set(
      accessData
        .filter(
          (a) =>
            a.company === selectedAccess.company &&
            a.branch === selectedAccess.branch
        )
        .map((a) => a.Role)
    )
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar openWindow={openWindow} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header
          userInfo={userInfo}
          selectedAccess={selectedAccess}
          onChange={handleChange}
          onLogout={handleLogout}
          companies={uniqueCompanies}
          branches={branchesForCompany}
          roles={rolesForBranch}
        />
        <main className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Aquí renderizamos todas las ventanas */}
      {windows.map(({ id, Component, title, options }) => (
        <RenderInWindow
          key={id}
          title={title}
          onClose={() => closeWindow(id)}
          {...options}
        >
          <Component />
        </RenderInWindow>
      ))}
    </div>
  );
}
