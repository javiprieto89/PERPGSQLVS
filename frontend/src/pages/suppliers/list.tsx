import type { ColumnDef } from "@tanstack/react-table";
import { Plus, Users } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

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
import TableFilters from "~/components/TableFilters";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Button } from "~/components/ui/button";
import { SupplierDetails } from "~/features/suppliers/SupplierDetails";
import { useGetAllSuppliersQuery, type SuppliersInDb } from "~/graphql/_generated/graphql";
import { supplierOperations } from "~/services/supplier.service";

type DataInDB = SuppliersInDb;

export default function Suppliers() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {};

  const { data, error, loading, refetch } = useGetAllSuppliersQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [record, setRecord] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filtered: DataInDB[]) => {
    setRecord(filtered);
  };

  const handleCreate = useCallback(() => navigate(`form`), []);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.SupplierID}`),
    []
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm("¿Borrar proveedor?")) return;
      try {
        await supplierOperations.deleteSupplier(id);
        refetch();
      } catch (err) {
        alert("Error al borrar proveedor: " + (err as Error).message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "reload-suppliers") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allSuppliers) {
      setRecord(data.allSuppliers);
    }
  }, [data]);

  const columns = useMemo<ColumnDef<DataInDB>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "SupplierID",
      },
      {
        header: "Name",
        accessorFn: (row) => `${row.FirstName} ${row.LastName}`,
        enableHiding: false,
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
        accessorKey: "SupplierID",
        cell: ({ row, getValue }) => {
          return (
            <div className="ml-auto flex gap-2 justify-end">
              <TableActionButton
                row={row}
                onEdit={() => handleEdit(row.original)}
                onDelete={() => handleDelete(getValue() as string)}
              />
            </div>
          );
        },
      },
    ],
    [handleDelete]
  );

  const defaultColumnVisibility = {
    Address: false,
    id: false,
  };

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

        {!error && !loading && record.length === 0 && (
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

        {loading && <AdminTableLoading />}

        {!loading && record.length > 0 && (
          <div>
            <DataTable
              id="suppliers"
              defaultColumnVisibility={defaultColumnVisibility}
              getRowCanExpand={() => true}
              renderSubComponent={({ row }) => (
                <SupplierDetails supplier={row.original as DataInDB} />
              )}
              columns={columns}
              data={record || []}
              highlightValue={highlight}
              highlightKey="SupplierID"
            />
          </div>
        )}
      </div>
    </div>
  );
}
