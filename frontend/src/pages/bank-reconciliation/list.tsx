import { type ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/table/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Button } from "~/components/ui/button";

import { useLocation, useNavigate } from "react-router";
import TableFilters from "~/components/TableFilters";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import {
  bankReconciliationService,
  type BankReconciliation,
} from "~/services/bank-reconciliation.service";
import { AuthStorage } from "~/utils/auth.storage";

type DataInDB = BankReconciliation;

const formatDate = (value?: string | null) =>
  value ? new Date(value).toLocaleDateString() : "-";

export default function BankReconciliations() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {}; // Destructure with a default empty object for safety

  const selectedAccess = AuthStorage.getSelectedAccess();
  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const allData: DataInDB[] = dataState;

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const companyID = selectedAccess?.CompanyID;
      const result = await bankReconciliationService.getAll();
      const filtered =
        companyID != null
          ? result.filter((item) => item.CompanyID === companyID)
          : result;

      setDataState(filtered);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [selectedAccess?.CompanyID]);

  const refetch = loadData;

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleCreate = useCallback(() => navigate(`form`), [navigate]);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.ReconciliationID}`),
    [navigate]
  );

  const handleDelete = useCallback(
    async (record: DataInDB) => {
      if (
        !confirm(
          `¿Eliminar la conciliación del ${formatDate(
            record.StatementDate
          )}? Esta acción no se puede deshacer.`
        )
      ) {
        return;
      }

      try {
        await bankReconciliationService.remove(
          record.ReconciliationID,
          record.CompanyID
        );
        void loadData();
      } catch (err) {
        alert(
          `No se pudo eliminar la conciliación: ${err instanceof Error ? err.message : String(err)
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
        accessorKey: "ReconciliationID",
        className: "first w-4",
      },
      {
        header: "Empresa",
        accessorKey: "CompanyID",
      },
      {
        header: "Cuenta bancaria",
        accessorKey: "BankAccountID",
      },
      {
        header: "Fecha",
        accessorKey: "StatementDate",
        cell: ({ getValue }) => formatDate(getValue() as string),
      },
      {
        header: "Saldo de cierre",
        accessorKey: "ClosingBalance",
        cell: ({ getValue }) => {
          const value = Number(getValue() ?? 0);
          return value.toLocaleString(undefined, {
            style: "currency",
            currency: "ARS",
          });
        },
      },
      {
        header: "Notas",
        accessorKey: "Notes",
      },
      {
        id: "actions",
        header: "",
        accessorKey: "ReconciliationID",
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
      <AdminTopBar title="Conciliaciones bancarias" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {allData.length > 0 && (
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
              modelName="bankReconciliations"
              data={allData}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {loading && <AdminTableLoading />}

        {!loading && dataState.length > 0 && (
          <DataTable
            id="bank-reconciliations"
            columns={columns}
            data={dataState}
          />
        )}
      </div>
    </>
  );
}
