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
import { useUser } from "~/hooks/useUser";
import { checkService, type CheckRecord } from "~/services/check.service";
import { AuthStorage } from "~/utils/auth.storage";

type DataInDB = CheckRecord;

const formatDate = (value?: string | null) =>
  value ? new Date(value).toLocaleDateString() : "-";

export default function Checks() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {}; // Destructure with a default empty object for safety

  const { selectedAccess: contextAccess } = useUser();
  const selectedAccess = contextAccess ?? AuthStorage.getSelectedAccess();
  const companyID = selectedAccess?.CompanyID ?? null;
  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const allData: DataInDB[] = dataState;

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = companyID
        ? await checkService.getByCompany(companyID)
        : await checkService.getAll();

      setDataState(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [companyID]);

  const refetch = loadData;

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleCreate = useCallback(() => navigate(`form`), [navigate]);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.CheckID}`),
    [navigate]
  );

  const handleDelete = useCallback(
    async (record: DataInDB) => {
      if (
        !confirm(
          `¿Eliminar el cheque ${record.Number}? Esta acción no se puede deshacer.`
        )
      ) {
        return;
      }

      try {
        await checkService.remove(record.CheckID, record.CompanyID);
        void loadData();
      } catch (err) {
        alert(
          `No se pudo eliminar el cheque: ${err instanceof Error ? err.message : String(err)
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
        accessorKey: "CheckID",
        className: "first w-4",
      },
      {
        header: "Empresa",
        accessorKey: "CompanyID",
      },
      {
        header: "Número",
        accessorKey: "Number",
      },
      {
        header: "Importe",
        accessorKey: "Amount",
        cell: ({ getValue }) => {
          const amount = Number(getValue() ?? 0);
          return amount.toLocaleString(undefined, {
            style: "currency",
            currency: "ARS",
          });
        },
      },
      {
        header: "Emisión",
        accessorKey: "IssueDate",
        cell: ({ getValue }) => formatDate(getValue() as string),
      },
      {
        header: "Vencimiento",
        accessorKey: "DueDate",
        cell: ({ getValue }) => formatDate(getValue() as string | null),
      },
      {
        header: "Banco",
        accessorKey: "BankID",
      },
      {
        header: "Moneda",
        accessorKey: "CurrencyID",
      },
      {
        header: "Estado",
        accessorKey: "CheckStatusID",
      },
      {
        id: "actions",
        header: "",
        accessorKey: "CheckID",
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
      <AdminTopBar title="Cheques" quickAccessHidden>
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
              modelName="checks"
              data={allData}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {loading && <AdminTableLoading />}

        {!loading && dataState.length > 0 && (
          <DataTable id="checks" columns={columns} data={dataState} />
        )}
      </div>
    </>
  );
}
