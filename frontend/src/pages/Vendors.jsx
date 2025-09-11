// frontend/src/pages/Vendors.jsx
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/table/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import TableFilters from "../components/TableFilters";

import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { useGetAllVendorsQuery } from "~/graphql/_generated/graphql";
import { vendorOperations } from "~/graphql/operations.js";
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
        cell: (props) => <TableIsActiveCell {...props} />,
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "VendorID",
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
    <div className="p-6">
      <div className="flex items-center justify-between">
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
            modelName="vendors"
            data={data.allVendors}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      <DataTable columns={columns} data={vendors} />
      {loading && <AdminTableLoading />}
    </div>
  );
}
