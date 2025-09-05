// src/components/Sidebar.jsx
import { IconFileDescription, IconUsers, type Icon } from "@tabler/icons-react";
import {
  Car,
  ChevronRight,
  ExternalLink,
  Home,
  PackageCheck,
  Ship,
  Tag,
  type LucideProps
} from "lucide-react";
import { Fragment, useContext } from "react";

import { cn } from "~/lib/utils";
import { openReactWindow } from "~/utils/openReactWindow";

import { DrawerContext } from "~/components/ui/drawer/Drawer";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuLink, SidebarMenuSub, SidebarMenuSubItem } from "~/components/ui/sidebar";
import StockEntry from "~/pages/StockEntry";

import { CollapsibleContent } from "@radix-ui/react-collapsible";
import OrderCreate from "~/pages/OrderCreate";
import PriceListItemsPage from "~/pages/PriceListItems";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { NavMenuSession } from "./navMenuSessionHelper";

const openPopup = (Component: React.ComponentType<any>, title: string, width = 1000, height = 700) => {
  openReactWindow(
    (popup) => <Component onClose={popup.close} windowRef={popup} />,
    title,
    { width, height }
  );
};

type SideNav = {
  title: string | null;
  items?: SideNav[];
  icon?: Icon | React.FunctionComponent<LucideProps>
  url?: string;
  action?: () => void;
}

type SideMenu = {
  key: string;
  title?: string | null;
  items?: SideNav[];
  rightButton?: {
    icon?: Icon | React.FunctionComponent<LucideProps>
    url?: string;
    action?: () => void;
  }
}

const sections: SideMenu[] = [
  {
    // navMain: [],
    key: "mainNav",
    title: null,
    items: [
      { title: "Dashboard", url: "dashboard", icon: Home },
      { title: "Clientes", url: "/clients", icon: IconUsers },
      { title: "Proveedores", url: "/suppliers", icon: Ship },
      {
        title: "Productos",
        icon: Tag,
        items: [
          {
            title: "Cargar Stock",
            action: () => openPopup(StockEntry, "Ingreso de Stock", 1000, 700),
          },
          { title: "Historial de stock", url: "/stockhistory" },
          { title: "Categorías", url: "/itemcategories" },
          { title: "Subcategorías", url: "/itemsubcategories" },
          { title: "Marcas", url: "/brands" },
          { title: "Ítems", url: "/items" },
          { title: "Depósitos", url: "/warehouses" },
          { title: "Listas de precios", url: "/pricelists" },
          { title: "Listas de precios-Items", url: "/pricelistitems" },
          {
            title: "Asignar precios a ítems",
            action: () =>
              openPopup(PriceListItemsPage, "Asignar precios", 1000, 700),
          },
        ],
      },
      {
        title: "Autos",
        icon: Car,
        items: [
          { title: "Lista de Autos", url: "/cars" },
          { title: "Marcas de autos", url: "/carbrands" },
          { title: "Modelos de autos", url: "/carmodels" },
        ],
      },
      {
        title: "Pedidos",
        icon: PackageCheck,
        items: [
          { title: "Listar pedidos", url: "/orders" },
          {
            title: "Cargar pedido",
            action: () => openPopup(OrderCreate, "Cargar Pedido", 1000, 700),
          },
          { title: "Historial", url: "/orderhistory" },
        ],
      }
    ],
  },
  {
    key: "consulting",
    title: "Consultas",
    items: [
      {
        title: "Factura electrónica",
        icon: IconFileDescription,
        items: [
          { title: "Último comprobante", url: "/fe-last" },
          { title: "Constatación comprobante", url: "/fe-info" },
          { title: "Información comprobante", url: "/fe-less-info" },
        ],
      },
    ],
  },
  {
    key: "configuration",
    title: "Configuración",
    items: [
      { title: "Sucursales", url: "/branches" },
      { title: "Empresa", url: "/companydata" },
      {
        title: "Usuarios",
        items: [
          { title: "Usuarios", url: "/users" },
          { title: "Roles", url: "/roles" },
          { title: "Roles y Usuarios", url: "/rolesusers" },
        ],
      },
      {
        title: "Ventas",
        items: [
          { title: "Grupos Tarjetas", url: "/creditcardgroups" },
          { title: "Tarjetas", url: "/creditcards" },
          { title: "Descuentos", url: "/discounts" },
          { title: "Vendedores", url: "/vendors" },
          { title: "Tipos de servicio", url: "/servicetypes" },
          { title: "Condiciones", url: "/saleconditions" },
          { title: "Documentos", url: "/documents" },
        ],
      },
    ],
  },
];

function Item(item: SideNav) {
  const { close } = useContext(DrawerContext);

  return (
    <Fragment key={item.title}>
      {item.url ? (
        <SidebarMenuButton asChild>
          <SidebarMenuLink
            to={item.url}
            onClick={close}
            className="data-[slot=sidebar-menu-button]:!p-1.5 text-nowrap"
          >
            {item.icon && <item.icon />}
            <span className="truncate">{item.title}</span>
          </SidebarMenuLink>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton
          className="data-[slot=sidebar-menu-button]:!p-1.5 text-nowrap"
          onClick={item.action}
        >
          {item.icon && <item.icon />}
          <span className="truncate">{item.title}</span>
          <ExternalLink size={16} />
        </SidebarMenuButton>
      )}
    </Fragment>
  );
}

function SidebarSubmenu({ items, parentKey }: { items: SideNav[] | undefined; parentKey: string; }) {
  if (!items || items.length === 0) return null;

  const navState = NavMenuSession.getState();

  return (
    <>
      {items && items.map((item) => {
        const key = `${parentKey}-${item.title}`;

        if (!item?.items) {
          return (
            <SidebarMenuItem key={item.title}>
              <Item {...item} />
            </SidebarMenuItem>
          )
        }

        return (
          <Collapsible key={key} className="group/collapsible" defaultOpen={navState ? navState[key] : undefined} onOpenChange={(isOpen) => {
            NavMenuSession.updateState(key, isOpen);;
          }}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title || undefined}
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <CollapsibleTrigger>
                  {item.icon && <item.icon />}
                  <span className="truncate">
                    {item.title}
                  </span>
                  <ChevronRight
                    size={16}
                    className={cn(
                      "ml-auto transition-[translate,transform] ease-linear group-data-[state=open]/collapsible:rotate-90",
                    )}
                  />
                </CollapsibleTrigger>
              </SidebarMenuButton>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((sub) => (
                    <SidebarMenuSubItem key={`${item.title}-subitem-${sub.title}`} className="flex flex-col px-3">
                      <Item {...sub} />
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      })}
    </>
  )
}

export function NavMenu() {
  if (sections.length === 0) return null;

  return sections.map((section) => {
    return (
      <SidebarGroup key={section.title}>
        {section.title &&
          <SidebarGroupLabel>
            <div className="flex gap-2">
              {section.title}
            </div>
          </SidebarGroupLabel>}
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarSubmenu parentKey={section.key} items={section.items} />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  })
}