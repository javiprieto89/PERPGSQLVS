import type { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
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
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { useGetAllVendorsQuery, type VendorsInDb } from "~/graphql/_generated/graphql";
import { vendorOperations } from "~/services/vendor.service";

type DataInDB = VendorsInDb;

export default function Vendors() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {};

  const { data, error, loading, refetch } = useGetAllVendorsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allData = data?.allVendors || [];

  const handleFilterChange = (filtered: DataInDB[]) => {
    setDataState(filtered);
  };

  const handleCreate = useCallback(() => navigate(`form`), [navigate]);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.VendorID}`),
    [navigate]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("¿Borrar vendedor?")) return;
      try {
        await vendorOperations.deleteVendor(String(id));
        refetch();
      } catch (err) {
        alert("Error al borrar vendedor: " + (err as Error).message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "reload-vendors") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (allData.length > 0 && dataState.length === 0) {
      setDataState(allData as DataInDB[]);
    }
  }, [allData, dataState.length]);

  const columns = useMemo<ColumnDef<DataInDB>[]>(
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
        cell: ({ row }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(row.original.VendorID)}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <section className="section">
      <AdminTopBar title="Vendedores" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {allData.length > 0 && (
            <>
              <InputQuickSearch
                rows={allData}
                onSearch={(rows: DataInDB[]) => setDataState(rows)}
              />
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
              modelName="vendors"
              data={allData || []}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {dataState.length > 0 && (
          <DataTable
            id="vendors"
            columns={columns}
            data={dataState}
            highlightValue={highlight}
            highlightKey="VendorID"
          />
        )}
        {loading && <AdminTableLoading />}
      </div>
    </section>
  );
}
