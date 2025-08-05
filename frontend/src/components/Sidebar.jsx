// src/components/Sidebar.jsx
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Folder,
  FolderOpen,
  House,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import clsx from "clsx";
import { cn } from "~/lib/utils";
import OrderCreate from "../pages/OrderCreate";
import PriceListItemsPage from "../pages/PriceListItems";
import StockEntry from "../pages/StockEntry";
import { openReactWindow } from "../utils/openReactWindow";
import { Button } from "./ui/button";

const openPopup = (Component, title, width = 1000, height = 700) => {
  openReactWindow(
    (popup) => <Component onClose={() => popup.close()} windowRef={popup} />,
    title,
    { width, height }
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
          { label: "Depósitos", to: "/warehouses" },
          { label: "Listas de precios", to: "/pricelists" },
          { label: "Listas de precios-Items", to: "/pricelistitems" },
          {
            label: "Asignar precios a ítems",
            action: () =>
              openPopup(PriceListItemsPage, "Asignar precios", 1000, 700),
          },
        ],
      },
      {
        label: "Ventas",
        submenu: [
          { label: "Grupos Tarjetas", to: "/creditcardgroups" },
          { label: "Tarjetas", to: "/creditcards" },
          { label: "Descuentos", to: "/discounts" },
          { label: "Vendedores", to: "/vendors" },
          { label: "Tipos de servicio", to: "/servicetypes" },
          { label: "Condiciones", to: "/saleconditions" },
          { label: "Documentos", to: "/documents" },
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
      {
        label: "Cargar Stock",
        action: () => openPopup(StockEntry, "Ingreso de Stock", 1000, 700),
      },
      { label: "Historial de stock", to: "/stockhistory" },
    ],
  },
  {
    title: "Consultas",
    items: [
      {
        label: "Factura electrónica",
        submenu: [
          { label: "Último comprobante", to: "/fe-last" },
          { label: "Constatación comprobante", to: "/fe-info" },
          { label: "Información comprobante", to: "/fe-less-info" },
        ],
      },
    ],
  },
  {
    title: "Configuración",
    items: [
      { label: "Sucursales", to: "/branches" },
      { label: "Empresa", to: "/companydata" },
      { label: "Roles", to: "/roles" },
      {
        label: "Usuarios",
        submenu: [
          { label: "Usuarios", to: "/users" },
          { label: "Roles y Usuarios", to: "/rolesusers" },
        ],
      },
    ],
  },
];

function Item({ label, to, action }) {
  console.log({ label, to });
  return (
    <li key={label}>
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            clsx(
              "flex justify-start py-2 px-3 w-full text-nowrap border-l-1 text-sm hover:bg-input/20 rounded-r-md",
              {
                "bg-primary/10 border-l-primary border-l-2": isActive,
              }
            )
          }
        >
          <span className="truncate">{label}</span>
        </NavLink>
      ) : (
        <Button
          variant="ghost"
          className="flex justify-start py-2 px-3 w-full text-nowrap border-l-1 text-sm rounded-none rounded-r-md"
          onClick={action}
        >
          <span className="truncate">{label}</span>
          <ExternalLink size={16} />
        </Button>
      )}
    </li>
  );
}

export default function Sidebar() {
  const [openSections, setOpenSections] = useState({});
  const [openSubmenus, setOpenSubmenus] = useState({});

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

  return (
    <>
      <aside className="card w-64 border-r overflow-y-auto">
        <nav className="py-4 px-2 flex flex-col">
          <Button
            asChild
            title="Ir al Dashboard Principal"
            variant="ghost"
            className="w-full justify-start"
          >
            <NavLink to="dashboard">
              <House />
              Dashboard
            </NavLink>
          </Button>
          {sections.map((section) => {
            const isOpen = openSections[section.title];
            return (
              <ul
                key={section.title}
                className={cn("p-1 transition-[background, color,box-shadow]")}
              >
                <li className="mt-2 w-full">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => toggleSection(section.title)}
                  >
                    <div className="flex items-center gap-2 uppercase text-nowrap">
                      {isOpen ? <FolderOpen size={18} /> : <Folder size={18} />}
                      {section.title}
                    </div>
                    {isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </Button>

                  {isOpen && (
                    <ul className="flex flex-col">
                      {section.items.map((item) => {
                        const key = `${section.title}-${item.label}`;
                        if (item.submenu) {
                          const subOpen = openSubmenus[key];
                          return (
                            <li key={item.label} className="mt-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="w-full justify-between"
                                onClick={() => toggleSubmenu(key)}
                              >
                                <span className="flex flex-row gap-2 uppercase truncate">
                                  {subOpen ? (
                                    <FolderOpen size={18} />
                                  ) : (
                                    <Folder size={18} />
                                  )}
                                  {item.label}
                                </span>
                                {subOpen ? (
                                  <ChevronDown size={16} />
                                ) : (
                                  <ChevronRight size={16} />
                                )}
                              </Button>
                              {subOpen && (
                                <ul className="flex flex-col m-2">
                                  {item.submenu.map((sub) => (
                                    <Item key={sub.label} {...sub} />
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        }
                        return <Item key={item.label} {...item} />;
                      })}
                    </ul>
                  )}
                </li>
              </ul>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
