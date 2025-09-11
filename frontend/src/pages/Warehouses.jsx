// frontend/src/pages/Warehouses.jsx
import { useCallback, useEffect, useMemo, useState } from "react";

import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/table/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import TableFilters from "../components/TableFilters";

import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
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
        enableHiding: false,
        accessorKey: "WarehouseID",
        cell: ({ row, getValue }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(getValue())}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <section className="section">
      <AdminTopBar title="Depósitos" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allWarehouses.length > 0 && (
            <>
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <CreateButton title="Nuevo" onClick={handleCreate} />
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
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
        <DataTable columns={columns} data={warehouses || []} />
        {loading && <AdminTableLoading />}
      </div>
    </section>
  );
}
