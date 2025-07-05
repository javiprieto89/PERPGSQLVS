// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import OrderCreate from "../pages/OrderCreate";
import MyWindowPortal from "./MyWindowPortal";

export default function Sidebar() {
  const [openSections, setOpenSections] = useState({});
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("openSections");
    if (stored) {
      try {
        setOpenSections(JSON.parse(stored));
      } catch {
        localStorage.removeItem("openSections");
      }
    }
    const storedSubs = localStorage.getItem("openSubmenus");
    if (storedSubs) {
      try {
        setOpenSubmenus(JSON.parse(storedSubs));
      } catch {
        localStorage.removeItem("openSubmenus");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("openSections", JSON.stringify(openSections));
    localStorage.setItem("openSubmenus", JSON.stringify(openSubmenus));
  }, [openSections, openSubmenus]);

  const toggleSection = (title) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  const toggleSubmenu = (key) =>
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));

  const openPopup = (Component, title, width = 1000, height = 700) => {
    const tempOrderId = `temp-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;
    setPopup(
      <MyWindowPortal title={title} width={width} height={height}>
        <Component tempOrderId={tempOrderId} />
      </MyWindowPortal>
    );
  };

  const sections = [
    {
      title: "Archivo",
      items: [
        { label: "Clientes", to: "/clients" },
        { label: "Proveedores", to: "/suppliers" },
        {
          label: "Productos",
          submenu: [
            { label: "Categorías", to: "/itemcategories" },
            { label: "Subcategorías", to: "/itemsubcategories" },
            { label: "Marcas", to: "/brands" },
            { label: "Ítems", to: "/items" },
          ],
        },
        {
          label: "Ventas",
          submenu: [
            { label: "Grupos Tarjetas", to: "/creditcardgroups" },
            { label: "Tarjetas", to: "/creditcards" },
            { label: "Condiciones", to: "/saleconditions" },
          ],
        },
        {
          label: "Autos",
          submenu: [
            { label: "Marcas de autos", to: "/carbrands" },
            { label: "Modelos de autos", to: "/carmodels" },
            { label: "Autos", to: "/cars" },
          ],
        },
      ],
    },
    {
      title: "Pedidos",
      items: [
        { label: "Listar pedidos", to: "/orders" },
        {
          label: "Cargar pedido",
          action: () => openPopup(OrderCreate, "Cargar Pedido", 1000, 700),
        },
        { label: "Historial", to: "/orderhistory" },
      ],
    },
  {
      title: "Inventario",
      items: [
        { label: "Stock", to: "/itemstock" },
        { label: "Historial de stock", to: "/stockhistory" },
      ],
  },
    {
      title: "Configuración",
      items: [
        { label: "Sucursales", to: "/branches" },
        { label: "Empresa", to: "/companydata" },
      ],
    },
    {
      title: "Usuarios y Seguridad",
      items: [
        { label: "Usuarios", to: "/users" },
        { label: "roles", to: "/roles" },
        { label: "Registro de actividad", to: "/useractivitylog" },
      ],
    },
  ];

  return (
    <>
      <aside className="w-64 bg-white border-r overflow-y-auto">
        <nav className="p-4 space-y-4">
          {sections.map((section) => {
            const isOpen = openSections[section.title];
            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-2 py-1 text-left hover:bg-gray-100 rounded"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase">
                    {isOpen ? <FolderOpen size={18} /> : <Folder size={18} />}
                    {section.title}
                  </div>
                  {isOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {isOpen && (
                  <ul className="mt-1 ml-4 space-y-1">
                    {section.items.map((item) => {
                      const key = `${section.title}-${item.label}`;
                      if (item.submenu) {
                        const subOpen = openSubmenus[key];
                        return (
                          <li key={item.label}>
                            <button
                              onClick={() => toggleSubmenu(key)}
                              className="flex items-center justify-between w-full px-2 py-1 rounded hover:bg-gray-100 text-gray-700"
                            >
                              <span className="flex items-center gap-2">
                                <FileText size={16} />{item.label}
                              </span>
                              {subOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </button>
                            {subOpen && (
                              <ul className="mt-1 ml-4 space-y-1">
                                {item.submenu.map((sub) => (
                                  <li key={sub.label}>
                                    {sub.to ? (
                                      <NavLink
                                        to={sub.to}
                                        className={({ isActive }) =>
                                          `flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 ${
                                            isActive ? "bg-gray-200 font-medium" : "text-gray-700"
                                          }`
                                        }
                                        >
                                        <FileText size={16} />
                                        {sub.label}
                                      </NavLink>
                                    ) : (
                                      <button
                                        onClick={sub.action}
                                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-gray-700 w-full text-left"
                                      >
                                        <FileText size={16} />
                                        {sub.label}
                                      </button>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      }
                      return (
                        <li key={item.label}>
                          {item.to ? (
                            <NavLink
                              to={item.to}
                              className={({ isActive }) =>
                                `flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 ${
                                  isActive ? "bg-gray-200 font-medium" : "text-gray-700"
                                }`
                              }
                            >
                              <FileText size={16} />
                              {item.label}
                            </NavLink>
                          ) : (
                            <button
                              onClick={item.action}
                              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 text-gray-700 w-full text-left"
                            >
                              <FileText size={16} />
                              {item.label}
                            </button>
                          )}
                        </li>
                      );
                    })
                  </ul>
                )}
              </div>
            );
          })
        </nav>
      </aside>
      {popup}
    </>
  );
}
