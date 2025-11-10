import type { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/table/TableExtraComponents";
import TableFilters from "~/components/TableFilters";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { useUser } from "~/hooks/useUser";
import {
  checkMovementService,
  type CheckMovement,
} from "~/services/check-movement.service";
import { AuthStorage } from "~/utils/auth.storage";
import { openReactWindow } from "~/utils/openReactWindow";
import CheckMovementForm from "./form";

type DataRow = CheckMovement;

const formatDate = (value?: string | null) =>
  value ? new Date(value).toLocaleDateString() : "-";

export default function CheckMovements() {
  const { selectedAccess: contextAccess } = useUser();
  const selectedAccess = contextAccess ?? AuthStorage.getSelectedAccess();
  const companyID = selectedAccess?.CompanyID ?? null;
  const [rawData, setRawData] = useState<DataRow[]>([]);
  const [dataState, setDataState] = useState<DataRow[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = companyID
        ? await checkMovementService.getByCompany(companyID)
        : await checkMovementService.getAll();
      setRawData(result);
      setDataState(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [companyID]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <CheckMovementForm
          onClose={() => popup.close()}
          onSave={() => {
            popup.close();
            void loadData();
          }}
        />
      ),
      "Nuevo movimiento de cheque",
      {
        width: 680,
        height: 640,
        url: `${document.location.href}/form`
      }
    );
  }, [loadData]);

  const handleEdit = useCallback(
    (movement: CheckMovement) => {
      openReactWindow(
        (popup) => (
          <CheckMovementForm
            movement={movement}
            onClose={() => popup.close()}
            onSave={() => {
              popup.close();
              void loadData();
            }}
          />
        ),
        `Movimiento #${movement.CheckMovementID}`,
        {
          width: 680,
          height: 640,
          url: `${document.location.href}/${movement.CheckMovementID}/edit`
        }
      );
    },
    [loadData]
  );

  const handleDelete = useCallback(
    async (movement: CheckMovement) => {
      if (
        !confirm(
          `¿Eliminar el movimiento del cheque #${movement.CheckID}? Esta acción no se puede deshacer.`
        )
      ) {
        return;
      }

      try {
        await checkMovementService.remove(
          movement.CheckMovementID,
          movement.CompanyID
        );
        void loadData();
      } catch (err) {
        alert(
          `No se pudo eliminar el movimiento: ${err instanceof Error ? err.message : String(err)
          }`
        );
      }
    },
    [loadData]
  );

  const handleFilterChange = useCallback((rows: DataRow[]) => {
    setDataState(rows);
  }, []);

  const columns = useMemo<ColumnDef<DataRow>[]>(() => {
    return [
      {
        header: "ID",
        accessorKey: "CheckMovementID",
        className: "first w-4",
      },
      {
        header: "Empresa",
        accessorKey: "CompanyID",
      },
      {
        header: "Cheque",
        accessorKey: "CheckID",
      },
      {
        header: "Fecha",
        accessorKey: "EventDate",
        cell: ({ getValue }) => formatDate(getValue() as string),
      },
      {
        header: "Evento",
        accessorKey: "EventType",
      },
      {
        header: "Cuenta bancaria",
        accessorKey: "BankAccountID",
      },
      {
        header: "Sucursal",
        accessorKey: "BranchID",
      },
      {
        header: "Transacción",
        accessorKey: "TransactionID",
      },
      {
        header: "Notas",
        accessorKey: "Notes",
      },
      {
        id: "actions",
        header: "",
        accessorKey: "CheckMovementID",
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
    <section className="section">
      <AdminTopBar title="Movimientos de cheques" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {rawData.length > 0 && (
            <ShowFilterButton
              onClick={() => setShowFilters((prev) => !prev)}
              showFilters={showFilters}
            />
          )}
          <RefreshButton onClick={() => loadData()} loading={loading} />
          <CreateButton title="Nuevo movimiento" onClick={handleCreate} />
        </div>
      </AdminTopBar>

      <div className="space-y-4 p-4">
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}

        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="checkMovements"
              data={rawData}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {loading && <AdminTableLoading />}

        {!loading && dataState.length > 0 && (
          <DataTable id="check-movements" columns={columns} data={dataState} />
        )}
      </div>
    </section>
  );
}
