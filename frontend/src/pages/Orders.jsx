// src/pages/Orders.jsx
// TODO:: useGetOrderMassiveQuery needs to be refined
import {
  EllipsisVertical,
  Pencil,
  Plus,
  RefreshCcw,
  Trash,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useGetOrderMassiveQuery } from "~/graphql/_generated/graphql";

import { orderOperations } from "~/graphql/operations";
import { openReactWindow } from "../utils/openReactWindow";

import { NavLink } from "react-router-dom";
import { AlertLoading } from "~/components/AlertLoading";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import TableFilters from "~/components/TableFilters";
import AdvancedFilter from "~/components/filter/AdvancedFilter";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import OrderCreate from "./OrderCreate";

export default function Orders() {
  const { data, loading, error, refetch } = useGetOrderMassiveQuery();
  const [orders, setOrders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const clients = data?.allClients || [];
  const saleConditions = data?.allSaleconditions || [];
  const users = data?.allUsers || [];
  const vendors = data?.allVendors || [];

  // El filtro ahora opera sobre allClients
  const handleFilterChange = (filteredClients) => {
    setOrders(filteredClients);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <OrderCreate
          onSave={() => {
            popup.opener.postMessage("reload-orders", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
          windowRef={popup}
        />
      ),
      "Cargar Pedido"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (order) => {
      openReactWindow(
        (popup) => (
          <OrderCreate
            order={order}
            onSave={() => {
              popup.opener.postMessage("reload-orders", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Pedido"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar pedido?")) return;
      try {
        await orderOperations.deleteOrder(id);
        refetch();
      } catch (err) {
        alert("Error al borrar pedido: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    console.log("useEffect reload orders");
    const handler = (e) => {
      if (e.data === "reload-orders") {
        console.log("--- ORDERS MESSAGE REFETCH");
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    console.log("useEffect data");
    if (data?.allOrders) {
      console.log("Y CLAAARO");

      setOrders(data.allOrders);
    }
  }, [data]);

  console.warn("TODO: useGetOrderMassiveQuery needs to be refined");

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
          <div className="flex space-x-2">
            {data && data.allOrders.length > 0 && (
              <>
                <InputQuickSearch
                  rows={data.allOrders}
                  onSearch={(rows) => setOrders(rows)}
                />
                <ShowFilterButton
                  onClick={() => setShowFilters(!showFilters)}
                  showFilters={showFilters}
                />
              </>
            )}
            <Button onClick={() => refetch()}>
              <RefreshCcw />
              Recargar
            </Button>
            <Button asChild>
              <NavLink to={`/orders/form`} target="_blank">
                Nuevo
              </NavLink>
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              <Plus />
              Nuevo Pedido
            </Button>
          </div>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="clients"
              data={data ? data.allClients : []} // ← lista original sin filtrar
              onFilterChange={handleFilterChange}
            />
            <AdvancedFilter
              modelName="clients"
              data={data ? data.allClients : []} // ← lista original sin filtrar
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {/* Error */}
        {error && <ApiErrorMessage error={error} />}

        {loading && <AlertLoading />}
        <Table className="w-full mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="px-2">ID</TableHead>
              <TableHead className="px-2">Cliente</TableHead>
              <TableHead className="px-2">Total</TableHead>
              <TableHead className="px-2">Condición</TableHead>
              <TableHead className="px-2">Usuario</TableHead>
              <TableHead className="px-2">Fecha</TableHead>
              <TableHead className="px-2">Vendedor</TableHead>
              <TableHead className="px-2">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 &&
              orders.map((o, index) => {
                const client = clients.find((c) => c.ClientID === o.ClientID);
                const saleCond = saleConditions.find(
                  (sc) => sc.SaleConditionID === o.SaleConditionID
                );
                const user = users.find((u) => u.UserID === o.UserID);
                const vendor = client
                  ? vendors.find((v) => v.VendorID === client.VendorID)
                  : null;
                console.log({ o });
                return (
                  <TableRow
                    key={`row-${o.OrderID || index}`}
                    className="border-t"
                  >
                    <TableCell className="px-2">{o.OrderID}</TableCell>
                    <TableCell className="px-2">
                      {client
                        ? `${client.FirstName} ${client.LastName || ""}`
                        : o.ClientID}
                    </TableCell>
                    <TableCell className="px-2 text-right">
                      {o.Total?.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-2">
                      {saleCond?.Name || ""}
                    </TableCell>
                    <TableCell className="px-2">
                      {user?.FullName || user?.Nickname || ""}
                    </TableCell>
                    <TableCell className="px-2">
                      {o.Date_?.slice(0, 10)}
                    </TableCell>
                    <TableCell className="px-2">
                      {vendor?.VendorName || ""}
                    </TableCell>
                    <TableCell className="px-2 text-center whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button asChild>
                          <NavLink
                            to={`/orders/form/${o.OrderID}`}
                            target="_blank"
                          >
                            <Pencil />
                          </NavLink>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger variant="ghost">
                            <EllipsisVertical />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => handleEdit(o)}>
                              <Pencil />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <NavLink
                                to={`/orders/form/${o.OrderID}`}
                                target="_blank"
                              >
                                <Pencil />
                                Edit
                              </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={() => handleDelete(o.OrderID)}
                            >
                              <Trash />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
