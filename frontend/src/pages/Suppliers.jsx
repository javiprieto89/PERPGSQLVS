import { Plus, Users } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { supplierOperations } from "~/graphql/operations.js";

import {
  DiagnosticButton,
  DiagnosticInfo,
} from "~/components/diagnostic/Diagnostic";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/table/TableExtraComponents";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Button } from "~/components/ui/button";
import { useGetAllSuppliersQuery } from "~/graphql/_generated/graphql";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import SupplierCreate from "./SupplierCreate";

function SupplierDetails({ supplier }) {
  if (!supplier) return null;
  return (
    <div className="rounded-lg max-w-lg w-full p-6 space-y-4">
      <h2 className="text-xl font-bold">Detalles del Proveedor</h2>
      <div className="space-y-1 text-sm">
        <p>
          <strong>Nombre:</strong> {supplier.FirstName} {supplier.LastName}
        </p>
        <p>
          <strong>Email:</strong> {supplier.Email || "—"}
        </p>
        <p>
          <strong>Teléfono:</strong> {supplier.Phone || "—"}
        </p>
        <p>
          <strong>Dirección:</strong> {supplier.Address || "—"}
        </p>
        <p>
          <strong>Documento:</strong> {supplier.DocNumber || "—"}
        </p>
        <p>
          <strong>Activo:</strong> {supplier.IsActive ? "Sí" : "No"}
        </p>
      </div>
    </div>
  );
}

export default function Suppliers() {
  const { data, error, loading, refetch } = useGetAllSuppliersQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [suppliers, setSuppliers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <SupplierCreate
          onSave={() => {
            popup.opener.postMessage("reload-suppliers", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nuevo Proveedor"
    );
  };

  const handleEdit = (supplier) => {
    openReactWindow(
      (popup) => (
        <SupplierCreate
          supplier={supplier}
          onSave={() => {
            popup.opener.postMessage("reload-suppliers", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Proveedor"
    );
  };

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar proveedor?")) return;
      try {
        await supplierOperations.deleteSupplier(id);
        refetch();
      } catch (err) {
        alert("Error al borrar proveedor: " + err.message);
      }
    },
    [refetch]
  );

  const handleFilterChange = (filtered) => {
    setSuppliers(filtered);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-suppliers") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allSuppliers) {
      setSuppliers(data.allSuppliers);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "SupplierID",
      },
      {
        header: "Name",
        accessorFn: (row) => `${row.FirstName} ${row.LastName}`,
      },
      {
        header: "Email",
        accessorKey: "Email",
      },
      {
        header: "Phone",
        accessorKey: "Phone",
      },
      {
        header: "Address",
        accessorKey: "Address",
      },
      {
        header: "Doc",
        accessorKey: "DocNumber",
      },
      {
        header: "Active",
        accessorKey: "IsActive",
        cell: (props) => <TableIsActiveCell {...props} />,
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "ClientID",
        cell: ({ row, getValue }) => {
          return (
            <div className="ml-auto flex gap-2">
              <TableActionButton
                row={row}
                onDelete={() => handleDelete(row.original)}
                onEdit={() => handleEdit(row.original)}
              />
            </div>
          );
        },
      },
    ],
    [handleDelete]
  );

  return (
    <div>
      <AdminTopBar title="Proveedores" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allSuppliers.length > 0 && (
            <>
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <DiagnosticButton />
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} />
            <span className="hidden lg:inline">Nuevo</span>
          </Button>
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="suppliers"
              data={data?.allSuppliers || []}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        <DiagnosticInfo />

        {error && <ApiErrorMessage error={error} />}

        {loading && <AlertLoading />}

        {!error && !loading && suppliers.length === 0 && (
          <div className="text-center py-12">
            <Users size="48" className="m-auto" />
            <h3 className="mt-2 text-sm font-medium">No hay proveedores</h3>
            <p className="mt-1 text-sm ">
              Comienza creando tu primer proveedor.
            </p>
            <div className="mt-6">
              <Button variant="primary" onClick={handleCreate}>
                Crear Primer Proveedor
              </Button>
            </div>
          </div>
        )}

        {suppliers && suppliers.length > 0 && (
          <div>
            <DataTable
              getRowCanExpand={() => true}
              renderSubComponent={({ row }) => (
                <SupplierDetails supplier={row.original} />
              )}
              columns={columns}
              data={suppliers || []}
              expanded={(row) => {
                <div>{row.id}</div>;
              }}
            />

            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground text-sm">
                Mostrando {suppliers.length} proveedor
                {suppliers.length !== 1 ? "es" : ""}
              </p>
            </div>
          </div>
        )}

        {loading && <AdminTableLoading />}
      </div>
    </div>
  );
}
