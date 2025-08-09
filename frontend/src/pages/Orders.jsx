// src/pages/Orders.jsx
import {
  CircleX,
  EllipsisVertical,
  Pencil,
  Trash,
  TriangleAlert,
} from "lucide-react";
import { useEffect } from "react";
import { useGetOrderMassiveQuery } from "~/graphql/_generated/graphql";

import { orderOperations } from "~/graphql/operations";
// import { openReactWindow } from "../utils/openReactWindow";

import { NavLink } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
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

export default function Orders() {
  const { data, loading, error, refetch } = useGetOrderMassiveQuery();

  const orders = data?.allOrders || [];
  const clients = data?.allClients || [];
  const saleConditions = data?.allSaleconditions || [];
  const users = data?.allUsers || [];
  const vendors = data?.allVendors || [];

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-orders") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  // const handleCreate = () => {
  //   openReactWindow(
  //     (popup) => (
  //       <OrderCreate onClose={() => popup.close()} windowRef={popup} />
  //     ),
  //     "Cargar Pedido"
  //   );
  // };

  // const handleEdit = (order) => {
  //   openReactWindow(
  //     (popup) => (
  //       <OrderCreate
  //         order={order}
  //         onSave={() => {
  //           popup.opener.postMessage("reload-orders", "*");
  //           popup.close();
  //         }}
  //         onClose={() => popup.close()}
  //       />
  //     ),
  //     "Editar Pedido"
  //   );
  // };

  const handleDelete = async (id) => {
    if (!confirm("¿Borrar pedido?")) return;
    try {
      await orderOperations.deleteOrder(id);
      refetch();
    } catch (err) {
      alert("Error al borrar pedido: " + err.message);
    }
  };

  console.warn("TODO: useGetOrderMassiveQuery needs to be refined");

  if (error) {
    return (
      <Alert variant="destructive">
        <CircleX />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <Alert>
          <TriangleAlert />
          <AlertTitle>Warn</AlertTitle>
          <AlertDescription>
            TODO: useGetOrderMassiveQuery needs to be refined
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
        <Button variant="primary" asChild>
          <NavLink to={`/orders/form`} target="_blank">
            Nuevo Pedido
          </NavLink>
        </Button>
      </div>
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
          {loading && (
            <TableRow className="border-t animate-pulse">
              {new Array(8).fill("").map((_, i) => (
                <TableCell
                  key={`skeleton-${i}`}
                  className="px-2 bg-foreground/10 h-12"
                ></TableCell>
              ))}
            </TableRow>
          )}
          {orders.length > 0 &&
            orders.map((o) => {
              const client = clients.find((c) => c.ClientID === o.ClientID);
              const saleCond = saleConditions.find(
                (sc) => sc.SaleConditionID === o.SaleConditionID
              );
              const user = users.find((u) => u.UserID === o.UserID);
              const vendor = client
                ? vendors.find((v) => v.VendorID === client.VendorID)
                : null;
              return (
                <TableRow key={o.OrderID} className="border-t">
                  <TableCell className="px-2">{o.OrderID}</TableCell>
                  <TableCell className="px-2">
                    {client
                      ? `${client.FirstName} ${client.LastName || ""}`
                      : o.ClientID}
                  </TableCell>
                  <TableCell className="px-2 text-right">
                    {o.Total?.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-2">{saleCond?.Name || ""}</TableCell>
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
                          {/* <DropdownMenuItem onSelect={() => handleEdit(o)}> */}
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
  );
}
