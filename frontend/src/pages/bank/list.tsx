import { type ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/table/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Button } from "~/components/ui/button";

import { useLocation, useNavigate } from "react-router";
import TableFilters from "~/components/TableFilters";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { type Bank, bankService } from "~/services/bank.service";

type DataInDB = Bank;

export default function Banks() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {}; // Destructure with a default empty object for safety

  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const allData: DataInDB[] = dataState;

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await bankService.getAll();
      setDataState(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = loadData;

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleCreate = useCallback(() => navigate(`form`), [navigate]);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.BankID}`),
    [navigate]
  );

  const handleDelete = useCallback(
    async (bank: DataInDB) => {
      if (
        !confirm(
          `¿Eliminar el banco "${bank.Name}"? Esta acción no se puede deshacer.`
        )
      ) {
        return;
      }
      try {
        await bankService.remove(bank.BankID);
        void loadData();
      } catch (err) {
        alert(
          `No se pudo eliminar el banco: ${err instanceof Error ? err.message : String(err)
          }`
        );
      }
    },
    [loadData]
  );

  const handleFilterChange = useCallback((filtered: DataInDB[]) => {
    setDataState(filtered);
  }, []);

  const columns = useMemo<ColumnDef<DataInDB>[]>(() => {
    return [
      {
        header: "ID",
        accessorKey: "BankID",
        className: "first w-4",
      },
      {
        header: "Nombre",
        accessorKey: "Name",
      },
      {
        header: "Estado",
        accessorKey: "IsActive",
        cell: (props) => <TableIsActiveCell {...props} />,
      },
      {
        id: "actions",
        header: "",
        accessorKey: "BankID",
        cell: ({ row }) => (
          <TableActionButton
            row={row}
            onEdit={() => handleEdit(row.original)}
            onDelete={() => handleDelete(row.original)}
          />
        ),
      },
    ];
  }, [handleDelete, handleEdit]);

  return (
    <>
      <AdminTopBar title="Bancos" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {dataState.length > 0 && (
            <ShowFilterButton
              onClick={() => setShowFilters((prev) => !prev)}
              showFilters={showFilters}
            />
          )}
          <RefreshButton onClick={() => loadData()} loading={loading} />
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo
          </Button>
        </div>
      </AdminTopBar>

      <div className="space-y-4 p-4">
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}

        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="banks"
              data={allData}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {loading && <AdminTableLoading />}

        {!loading && dataState.length > 0 && (
          <DataTable columns={columns} data={dataState} id="banks" />
        )}
      </div>
    </>
  );
}
