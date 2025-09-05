// src/pages/Orders.jsx
// TODO: useGetOrderMassiveQuery needs to be refined
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetAllOrdersQuery } from "~/graphql/_generated/graphql";

import { orderOperations } from "~/graphql/operations";
import { openReactWindow } from "../utils/openReactWindow";

import { NavLink } from "react-router-dom";
import AdvancedFilter from "~/components/filter/AdvancedFilter";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { RefreshButton } from "~/components/RefreshButton";
import { AdminTable } from "~/components/table/AdminTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/TableExtraComponents";
import TableFilters from "~/components/TableFilters";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import OrderCreate from "./OrderCreate";

export default function Orders() {
  console.warn(
    "TODO: useGetAllOrdersQuery needs to be refined: Vendor needs to be displayed in Vendedor cell"
  );
  const { data, loading, error, refetch } = useGetAllOrdersQuery();
  const [orders, setOrders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const vendors = useMemo(() => data?.allVendors || [], [data?.allVendors]);

  console.log("vendors", vendors);

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

  const columns = useMemo(
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
        cell: ({ getValue, row }) => {
          return `${getValue()} ${row.original.ClientData.LastName || ""}`;
        },
      },
      {
        header: "Total",
        accessorKey: "Total",
        cell: ({ getValue }) => (getValue() || 0).toFixed(2),
      },
      {
        header: "Condición",
        accessorKey: "SaleConditionData.Name",
      },
      {
        header: "Usuario",
        accessorKey: "UserData.FullName",
        cell: ({ getValue, row }) => {
          return getValue() || row.original.UserData.Nickname || "";
        },
      },
      {
        header: "Fecha",
        accessorKey: "Date_",
        cell: ({ getValue }) => getValue()?.slice(0, 10),
      },
      {
        header: "Vendedor",
        accessorKey: "ClientData.VendorID",
        cell: ({ getValue }) => {
          // TODO: VendorID o VendorName debería venir en orders query
          const vendor = vendors.find((v) => v.VendorID === getValue());
          return vendor?.VendorName || "";
        },
      },
      {
        header: "",
        id: "actions",
        accessorKey: "OrderID",
        cell: ({ row, getValue }) => (
          <TableActionButton
            onDelete={() => handleDelete(getValue())}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit, vendors]
  );

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
          <div className="flex gap-2">
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
            <RefreshButton onClick={() => refetch()} loading={loading} />
            <Button asChild>
              <NavLink to={`/orders/form`} target="_blank">
                <Plus strokeWidth={3} />
                Nuevo
              </NavLink>
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              <Plus strokeWidth={3} />
              Nuevo Pedido
            </Button>
          </div>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="my-6 gap-2">
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

        <div className="flex flex-col gap-2 my-6">
          {/* Error */}
          {error && <ApiErrorMessage error={error} />}
          {loading && <AlertLoading />}
          {loading && <AdminTableLoading />}
          {orders.length > 0 && <AdminTable columns={columns} data={orders} />}
        </div>
      </div>
    </>
  );
}
