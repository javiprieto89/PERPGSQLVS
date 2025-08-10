// frontend/src/pages/Vendors.jsx
import { Plus, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertLoading } from "~/components/AlertLoading";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { TableActionButton } from "~/components/TableActionButtons";
import { AdminTable, AdminTableLoading } from "~/components/TanstackTable";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { Button } from "~/components/ui/button";
import { useGetAllVendorsQuery } from "~/graphql/_generated/graphql";
import { vendorOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import VendorCreate from "./VendorCreate";

export default function Vendors() {
  const { data, error, loading, refetch } = useGetAllVendorsQuery();
  const [vendors, setVendors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-vendors") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  const handleFilterChange = (filtered) => {
    setVendors(filtered);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <VendorCreate
          onSave={() => {
            popup.opener.postMessage("reload-vendors", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nuevo Vendedor"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (vendor) => {
      openReactWindow(
        (popup) => (
          <VendorCreate
            vendor={vendor}
            onSave={() => {
              popup.opener.postMessage("reload-vendors", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Vendedor"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar vendedor?")) return;
      try {
        await vendorOperations.deleteVendor(id);
        refetch();
      } catch (err) {
        alert("Error al borrar vendedor: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    if (data?.allVendors) {
      setVendors(data.allVendors);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "VendorID",
        className: "first w-3",
      },
      {
        header: "Name",
        accessorKey: "VendorName",
      },
      {
        header: "Comisión",
        accessorKey: "Commission",
        cell: ({ getValue }) => `${getValue()}%`,
      },
      {
        header: "Estado",
        accessorKey: "IsActive",
        cell: ({ getValue }) => (
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              getValue()
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-destructive"
            }`}
          >
            {getValue("IsActive") ? "Activo" : "Inactivo"}
          </span>
        ),
      },
      {
        header: "",
        id: "actions",
        accessorKey: "VendorID",
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
        <h1 className="text-3xl font-bold text-foreground">Vendedores</h1>
        <div className="flex space-x-2">
          {data && data.allVendors.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allVendors}
                onSearch={(rows) => setVendors(rows)}
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
          <Button variant="primary" onClick={handleCreate}>
            <Plus />
            Nuevo
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="vendors"
            data={data.allVendors}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      <AdminTable columns={columns} data={vendors} />
      {loading && <AdminTableLoading />}
    </div>
  );
}
