// frontend/src/pages/Warehouses.jsx
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { AdminTable } from "~/components/table/AdminTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/table/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import TableFilters from "../components/TableFilters";

import { RefreshButton } from "~/components/RefreshButton";
import { useGetWarehousesQuery } from "~/graphql/_generated/graphql";
import { warehouseOperations } from "~/graphql/operations.js";
import { openReactWindow } from "../utils/openReactWindow";
import WarehouseCreate from "./WarehouseCreate";

export default function Warehouses() {
  const { data, error, loading, refetch } = useGetWarehousesQuery();
  const [warehouses, setWarehouses] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filtered) => {
    setWarehouses(filtered);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <WarehouseCreate
          onSave={() => {
            popup.opener.postMessage("reload-warehouses", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nuevo Depósito"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (wh) => {
      openReactWindow(
        (popup) => (
          <WarehouseCreate
            warehouse={wh}
            onSave={() => {
              popup.opener.postMessage("reload-warehouses", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Depósito"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar depósito?")) return;
      try {
        await warehouseOperations.deleteWarehouse(id);
        refetch();
      } catch (err) {
        alert("Error al borrar depósito: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-warehouses") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allWarehouses) {
      setWarehouses(data.allWarehouses);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "WarehouseID",
        className: "first w-3",
      },
      {
        header: "Name",
        accessorKey: "Name",
      },
      {
        header: "Addres",
        accessorKey: "Addres",
      },
      {
        header: "",
        id: "actions",
        accessorKey: "WarehouseID",
        cell: ({ row, getValue }) => (
          <TableActionButton
            onDelete={() => handleDelete(getValue())}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Depósitos</h1>
        <div className="flex space-x-2">
          {data && data.allWarehouses.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allWarehouses}
                onSearch={(rows) => setWarehouses(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} />
            Nuevo
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="warehouses"
            data={data.allWarehouses}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      <AdminTable columns={columns} data={warehouses || []} />
      {loading && <AdminTableLoading />}
    </div>
  );
}
