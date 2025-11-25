// src/components/Sidebar.jsx
import { IconFileDescription, IconShoppingCartCog, IconUserHexagon, IconUsers, type Icon } from "@tabler/icons-react";
import {
  Building,
  Car,
  ChevronRight,
  ExternalLink,
  Home,
  MapPin,
  PackageCheck,
  Plus,
  Ship,
  Tag,
  Users,
  type LucideProps
} from "lucide-react";
import { Fragment, useContext } from "react";


import { DrawerContext } from "~/components/ui/drawer/Drawer";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuLink, SidebarMenuSub, SidebarMenuSubItem, useSidebar } from "~/components/ui/sidebar";
import StockEntry from "~/pages/stock/StockEntry";

import { CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Orderform } from "~/pages/orders/form";
import PriceListItemsPage from "~/pages/pricelistitems/form";
import { openReactWindow } from "~/utils/openReactWindow";
import { Collapsible } from "../ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { SidebarHelper } from "./sidebarHelper";

// Hook para crear ventanas externas - se usará dentro del componente
const openPopup = (Component: React.ComponentType<any>, title: string) => {
  openReactWindow(
    (popup) => <Component onClose={popup.close} windowRef={popup} />,
    title
  );
};

const openPopup2 = (url: string, title: string) => {
  window.open(
    url,
    "_blank",
    `width=${1000},height=${800},left=200,top=200`
  );
};


type RightButton = {
  icon?: Icon | React.FunctionComponent<LucideProps>
  url?: string;
  action?: () => void;
  title?: string | null;
};

type SideNav = {
  title: string | null;
  items?: SideNav[];
  icon?: Icon | React.FunctionComponent<LucideProps>
  url?: string;
  action?: () => void;
  rightButton?: RightButton;
}

type SideMenu = {
  key: string;
  title?: string | null;
  items?: SideNav[];
  rightButton?: RightButton;
}

// Definición de sections movida dentro del componente NavMenu para acceder al hook

function Item(item: SideNav) {
  const { close } = useContext(DrawerContext);

  return (
    <Fragment key={item.title}>
      {item.url ? (
        <div className="flex items-center gap-2">
          <SidebarMenuButton tooltip={item.title || undefined} asChild>
            <SidebarMenuLink
              to={item.url}
              onClick={close}
              className="data-[slot=sidebar-menu-button]:!p-1.5 text-nowrap"
            >
              {item.icon && <item.icon />}
              <span className="truncate">{item.title}</span>
            </SidebarMenuLink>
          </SidebarMenuButton>
          {item.rightButton && item.rightButton.url && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className="size-8 group-data-[collapsible=icon]:opacity-0"
                  variant="ghost"
                  asChild
                >
                  <Link to={item.rightButton.url} onClick={close} className="flex items-center">
                    {item.rightButton.icon && <item.rightButton.icon />}
                    {item.rightButton.title && <span className="sr-only">{item.rightButton.title}</span>}
                  </Link>
                </Button>
              </TooltipTrigger>
              {item.rightButton.title && (
                <TooltipContent
                  side="bottom"
                  align="center"
                  hidden={false}
                >
                  {item.rightButton.title}
                </TooltipContent>
              )}
            </Tooltip>
          )}
          {item.rightButton && item.rightButton.action && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className="size-8 group-data-[collapsible=icon]:opacity-0"
                  variant="ghost"
                  onClick={item.rightButton.action}
                >
                  {item.rightButton.icon && <item.rightButton.icon />}
                  {item.rightButton.title && <span className="sr-only">{item.rightButton.title}</span>}
                </Button>
              </TooltipTrigger>
              {item.rightButton.title && (
                <TooltipContent
                  side="bottom"
                  align="center"
                  hidden={false}
                >
                  {item.rightButton.title}
                </TooltipContent>
              )}
            </Tooltip>
          )}
        </div>
      ) : (
        <SidebarMenuButton
          tooltip={item.title || undefined}
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
  const { state } = useSidebar()

  const navState = SidebarHelper.getAll();

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
            SidebarHelper.updateState(key, isOpen);;
          }}>
            <SidebarMenuItem>
              {state === "collapsed" ? (
                <Item {...item} />
              ) : (
                <>
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
                </>
              )}
              <CollapsibleContent>
                <SidebarMenuSub className="!mr-0 pr-0">
                  {item.items.map((sub) => (
                    <SidebarMenuSubItem key={`${item.title}-subitem-${sub.title}`} className="flex flex-col pl-3">
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
  const extraNavItems: SideMenu[] = [{
    key: "finance",
    title: "Finanzas",
    items: [
      { title: "Bancos", url: "/banks" },
      { title: "Cuentas bancarias", url: "/bankaccounts" },
      { title: "Cheques", url: "/checks" },
      { title: "Movimientos de cheques", url: "/checkmovements" },
      { title: "Conciliaciones bancarias", url: "/bankreconciliations" }
    ],
  },
  {
    key: "rma",
    title: "RMA",
    items: [
      { title: "RMA", url: "/rma" },
      { title: "Detalles RMA", url: "/rmadetails" }
    ],
  },
  {
    key: "purchases",
    title: "Compras",
    items: [
      { title: "Detalles ordenes de compra", url: "/purchaseinvoicedetails" }
    ],
  },];

  const quickActions: SideNav[] = [
    {
      title: "Nuevo cliente", url: "/clients/form",
      rightButton: {
        title: "Nuevo cliente",
        icon: Plus,
        action: () => openPopup2("/clients/form", "Nuevo Cliente"),
      }
    },
    {
      title: "Nuevo proveedor", url: "/suppliers/form",
      rightButton: {
        title: "Nuevo proveedor",
        icon: Plus,
        action: () => openPopup2("/suppliers/form", "Nuevo Proveedor"),
      }
    },
    {
      title: "Nueva sucursal", url: "/branches/form",
      rightButton: {
        title: "Nueva sucursal",
        icon: Plus,
        action: () => openPopup2("/branches/form", "Nueva Sucursal"),
      }
    },
    {
      title: "Nuevo pedido", url: "/orders/form",
      rightButton: {
        title: "Nuevo pedido",
        icon: Plus,
        action: () => openPopup2("/orders/form", "Nuevo Pedido"),
      }
    },
  ];

  // Mover sections aquí para acceder a openPopup
  const sections: SideMenu[] = [
    {
      key: "mainNav",
      title: null,
      items: [
        { title: "Dashboard", url: "dashboard", icon: Home },
        { title: "Clientes", url: "/clients", icon: IconUsers },
        { title: "Proveedores", url: "/suppliers", icon: Ship },
        {
          title: "Productos",
          icon: Tag,
          url: "/items",
          items: [
            {
              title: "Ítems", url: "/items",
              rightButton: {
                title: "Cargar Stock",
                icon: Plus,
                url: "/stock/form",
              }
            },
            {
              title: "Cargar Stock",
              action: () => openPopup(StockEntry, "Ingreso de Stock"),
            },
            { title: "Historial de stock (N/A)", url: "/stockhistory" },
            { title: "Categorías", url: "/items/categories" },
            { title: "Subcategorías", url: "/items/subcategories" },
            { title: "Marcas", url: "/brands" },
            { title: "Depósitos", url: "/warehouses" },
            { title: "Listas de precios", url: "/pricelists" },
            { title: "Listas de precios-Items", url: "/pricelistitems" },
            {
              title: "Asignar precios a ítems",
              action: () => openPopup(PriceListItemsPage, "Asignar precios"),
            },
          ],
        },
        {
          title: "Autos",
          url: "/cars",
          icon: Car,
          items: [
            { title: "Lista de Autos", url: "/cars" },
            { title: "Marcas de autos", url: "/carbrands" },
            { title: "Modelos de autos", url: "/carmodels" },
          ],
        },
        {
          title: "Pedidos",
          url: "/orders",
          icon: PackageCheck,
          items: [
            { title: "Listar pedidos", url: "/orders" },
            {
              title: "Cargar pedido",
              action: () => openPopup(Orderform, "Cargar Pedido"),
            },
            { title: "Historial", url: "/orderhistory" },
          ],
        }
      ],
    },
    {
      key: "invoices",
      title: "Facturas",
      items: [
        {
          title: "Factura electrónica",
          icon: IconFileDescription,
          url: "/fe-last",
          items: [
            { title: "Último comprobante", url: "/fe-last" },
            { title: "Constatación comprobante", url: "/fe-info" },
            { title: "Información comprobante", url: "/fe-less-info" },
            { title: "Tipos de comprobante", url: "#" },
          ],
        },
      ],
    },
    {
      key: "configuration",
      title: "Configuración",
      items: [
        { title: "Sucursales", url: "/branches", icon: MapPin },
        { title: "Empresa", url: "/companies", icon: Building },
        {
          title: "Usuarios",
          url: "/users",
          icon: Users,
          items: [
            { title: "Usuarios", url: "/users", icon: Users },
            { title: "Roles", url: "/roles", icon: IconUserHexagon },
            { title: "Roles y Usuarios", url: "/users/permissions" },
          ],
        },
        {
          title: "Ventas",
          url: "/documents",
          icon: IconShoppingCartCog,
          items: [
            { title: "Grupos de Tarjetas", url: "/creditcardgroups" },
            { title: "Tarjetas", url: "/creditcards" },
            { title: "Descuentos", url: "/discounts" },
            { title: "Vendedores", url: "/vendors" },
            { title: "Tipos de servicio", url: "/servicetypes" },
            { title: "Condiciones de venta", url: "/saleconditions" },
            { title: "Documentos Comerciales", url: "/documents" },
          ],
        },
      ],
    },
    {
      key: "quick-actions",
      title: "Crear",
      items: quickActions,
    },
    ...extraNavItems
  ];

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
  });
}