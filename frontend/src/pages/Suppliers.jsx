import {
  EllipsisVertical,
  Eye,
  Pencil,
  RefreshCcw,
  Trash,
  UserRoundPlus,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { supplierOperations } from "~/graphql/operations.js";

import { AlertLoading } from "~/components/AlertLoading";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import {
  DiagnosticButton,
  DiagnosticInfo,
} from "~/components/diagnostic/Diagnostic";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { AdminTable, AdminTableLoading } from "~/components/TanstackTable";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useGetAllSuppliersQuery } from "~/graphql/_generated/graphql";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import SupplierCreate from "./SupplierCreate";

function SupplierDetails({ supplier }) {
  if (!supplier) return null;
  return (
    <div className="border bg-accent rounded-lg max-w-lg w-full p-6 space-y-4">
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
  const { data, error, loading, refetch } = useGetAllSuppliersQuery();
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
        accessorKey: "ClientID",
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
        cell: (props) => {
          return (
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                props.getValue("IsActive")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-destructive"
              }`}
            >
              {props.getValue("IsActive") ? "Activo" : "Inactivo"}
            </span>
          );
        },
      },
      {
        header: "",
        id: "actions",
        accessorKey: "ClientID",
        cell: ({ row, getValue }) => {
          return (
            <div className="flex gap-2">
              {row.getCanExpand() && (
                <Button
                  variant={row.getIsExpanded() ? "primary" : "outline"}
                  onClick={row.getToggleExpandedHandler()}
                >
                  <Eye />
                </Button>
              )}
              <Button
                onClick={() => handleEdit(row.original)}
                className="hidden md:inline px-3 py-2 text-sm rounded"
              >
                <Pencil />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(getValue())}
                  >
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [handleDelete]
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Proveedores</h1>
        <div className="flex space-x-2">
          {data && data.allSuppliers.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allSuppliers}
                onSearch={(rows) => setSuppliers(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <DiagnosticButton />
          {/* refetch */}
          <Button onClick={() => refetch()}>
            <RefreshCcw />
            Recargar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            <UserRoundPlus />
            Nuevo
          </Button>
        </div>
      </div>

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
          <p className="mt-1 text-sm ">Comienza creando tu primer proveedor.</p>
          <div className="mt-6">
            <Button variant="primary" onClick={handleCreate}>
              Crear Primer Proveedor
            </Button>
          </div>
        </div>
      )}

      {suppliers && suppliers.length > 0 && (
        <div>
          <AdminTable
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
  );
}
