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
import {
  rmaDetailService,
  type RmaDetailRecord,
} from "~/services/rma-detail.service";
import { AuthHelper } from "~/utils/authHelper";
import { openReactWindow } from "~/utils/openReactWindow";
import RmaDetailForm from "./form";

type DataRow = RmaDetailRecord;

const formatDateTime = (value?: string | null) =>
  value ? new Date(value).toLocaleString() : "-";

export default function RmaDetailList() {
  const selectedAccess = AuthHelper.getSelectedAccess();
  const [rawData, setRawData] = useState<DataRow[]>([]);
  const [dataState, setDataState] = useState<DataRow[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filter =
        selectedAccess != null
          ? { CompanyID: selectedAccess.CompanyID, BranchID: selectedAccess.BranchID }
          : undefined;
      const result = await rmaDetailService.getAll(filter);
      setRawData(result);
      setDataState(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [selectedAccess]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <RmaDetailForm
          onClose={() => popup.close()}
          onSave={() => {
            popup.close();
            void loadData();
          }}
        />
      ),
      "Agregar detalle RMA",
      {
        width: 640,
        height: 600,
        url: `${document.location.href}/form`
      }
    );
  }, [loadData]);

  const handleEdit = useCallback(
    (record: RmaDetailRecord) => {
      openReactWindow(
        (popup) => (
          <RmaDetailForm
            detail={record}
            onClose={() => popup.close()}
            onSave={() => {
              popup.close();
              void loadData();
            }}
          />
        ),
        `Detalle RMA #${record.RmaDetailID}`,
        {
          width: 640,
          height: 600,
          url: `${document.location.href}/${record.RmaDetailID}/edit`
        }
      );
    },
    [loadData]
  );

  const handleDelete = useCallback(
    async (record: RmaDetailRecord) => {
      if (
        !confirm(
          `¿Eliminar el detalle ${record.RmaDetailID} de la RMA #${record.RmaID}?`
        )
      ) {
        return;
      }

      try {
        await rmaDetailService.remove(
          record.CompanyID,
          record.BranchID,
          record.RmaID,
          record.RmaDetailID
        );
        void loadData();
      } catch (err) {
        alert(
          `No se pudo eliminar el detalle: ${err instanceof Error ? err.message : String(err)
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
        header: "Detalle",
        accessorKey: "RmaDetailID",
        className: "first w-4",
      },
      {
        header: "RMA",
        accessorKey: "RmaID",
      },
      {
        header: "Empresa",
        accessorKey: "CompanyID",
      },
      {
        header: "Sucursal",
        accessorKey: "BranchID",
      },
      {
        header: "Ítem",
        accessorKey: "ItemID",
      },
      {
        header: "Depósito",
        accessorKey: "WarehouseID",
      },
      {
        header: "Cantidad",
        accessorKey: "Quantity",
      },
      {
        header: "Precio unitario",
        accessorKey: "UnitPrice",
        cell: ({ getValue }) => {
          const value = Number(getValue() ?? 0);
          return value.toLocaleString(undefined, {
            style: "currency",
            currency: "ARS",
          });
        },
      },
      {
        header: "Modificado",
        accessorKey: "LastModified",
        cell: ({ getValue }) => formatDateTime(getValue() as string),
      },
      {
        header: "Descripción",
        accessorKey: "LineDescription",
      },
      {
        id: "actions",
        header: "",
        accessorKey: "RmaDetailID",
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
      <AdminTopBar title="Detalles de RMA" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {rawData.length > 0 && (
            <ShowFilterButton
              onClick={() => setShowFilters((prev) => !prev)}
              showFilters={showFilters}
            />
          )}
          <RefreshButton onClick={() => loadData()} loading={loading} />
          <CreateButton title="Agregar detalle" onClick={handleCreate} />
        </div>
      </AdminTopBar>

      <div className="space-y-4 p-4">
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}

        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="rmaDetails"
              data={rawData}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {loading && <AdminTableLoading />}

        {!loading && dataState.length > 0 && (
          <DataTable id="rma-details" columns={columns} data={dataState} />
        )}
      </div>
    </section>
  );
}

