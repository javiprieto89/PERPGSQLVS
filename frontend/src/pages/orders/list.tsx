// src/pages/Orders.tsx
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/table/TableExtraComponents";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Button } from "~/components/ui/button";
import { useGetAllOrdersQuery, type OrdersInDb } from "~/graphql/_generated/graphql";
import { orderOperations } from "~/services/order.service";

type DataInDB = OrdersInDb;

export function OrdersList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {};

  const { data, loading, error, refetch } = useGetAllOrdersQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [orders, setOrders] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filteredClients: DataInDB[]) => {
    setOrders(filteredClients);
  };

  const handleCreate = useCallback(() => navigate(`form`), [navigate]);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.OrderID}`),
    [navigate]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("¿Borrar pedido?")) return;
      try {
        await orderOperations.deleteOrder(String(id));
        refetch();
      } catch (err) {
        alert("Error al borrar pedido: " + (err as Error).message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    console.log("useEffect reload orders");
    const handler = (e: MessageEvent) => {
      if (e.data === "reload-orders") {
        console.log("--- ORDERS MESSAGE REFETCH");
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allOrders) {
      setOrders(data.allOrders as DataInDB[]);
    }
  }, [data]);

  const columns = useMemo<ColumnDef<DataInDB>[]>(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "OrderID",
        className: "first w-3",
      },
      {
        header: "Cliente",
        accessorKey: "ClientData.FirstName",
        id: "Client",
        cell: ({ getValue, row }) => {
          return `${getValue()} ${row.original.ClientData?.LastName || ""}`;
        },
      },
      {
        header: "Total",
        accessorKey: "Total",
        cell: ({ getValue }) => Number(getValue() || 0).toFixed(2),
      },
      {
        header: "Condición",
        id: "Condition",
        accessorKey: "SaleConditionData.Name",
      },
      {
        header: "Usuario",
        accessorKey: "UserData.FullName",
        id: "User",
        cell: ({ getValue, row }) => {
          return getValue() || row.original.UserData?.Nickname || "";
        },
      },
      {
        header: "Fecha",
        accessorKey: "OrderDate",
        id: "Date",
        cell: ({ getValue }) => String(getValue())?.slice(0, 10),
      },
      {
        header: "Vendedor",
        accessorKey: "VendorData.VendorName",
        id: "Vendor",
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "OrderID",
        cell: ({ row }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(row.original.OrderID)}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <>
      <div>
        <AdminTopBar title="Pedidos" quickAccessHidden>
          <div className="ml-auto flex gap-2">
            {data && data.allOrders.length > 0 && (
              <>
                <ShowFilterButton
                  onClick={() => setShowFilters(!showFilters)}
                  showFilters={showFilters}
                />
              </>
            )}
            <RefreshButton onClick={() => refetch()} loading={loading} />
            <Button asChild>
              <NavLink to={`/orders/form`} target="_blank">
                <Plus strokeWidth={3} />
                Nuevo
              </NavLink>
            </Button>
            <CreateButton title="Nuevo Pedido" onClick={handleCreate} />
          </div>
        </AdminTopBar>
        <div className="m-x-auto space-y-4 p-4">
          {showFilters && (
            <div className="my-6 gap-2">
              Work in progres...
              {/* <TableFilters
                modelName="orders"
                data={data?.allOrders || []}
                onFilterChange={handleFilterChange}
              /> */}
              {/* <AdvancedFilter
                modelName="orders"
                data={data?.allOrders || []}
                onFilterChange={handleFilterChange}
              /> */}
            </div>
          )}
          {error && <ApiErrorMessage error={error} />}
          {loading && <AlertLoading />}
          {loading && <AdminTableLoading />}
          {orders.length > 0 && (
            <DataTable
              id="orders"
              columns={columns}
              data={orders}
              highlightValue={highlight}
              highlightKey="OrderID"
            />
          )}
        </div>
      </div>
    </>
  );
}
