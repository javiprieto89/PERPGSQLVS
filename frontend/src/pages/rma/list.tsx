import type { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

import { IconEggCracked } from "@tabler/icons-react";
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
import { Button } from "~/components/ui/button";
import { rmaService, type RmaRecord } from "~/services/rma.service";
import { openReactWindow } from "~/utils/openReactWindow";
import RmaForm from "./form";

type DataRow = RmaRecord;

const formatDateTime = (value?: string | null) =>
  value ? new Date(value).toLocaleString() : "-";

const useGetAllRmasQuery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<RmaRecord[] | null>(null);

  useEffect(() => {
    async function asyncLoad() {
      setLoading(true);
      setError(null);
      try {
        const result = await rmaService.getAll();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    asyncLoad();
  }, []);

  function refetch() {
    setLoading(true);
    setError(null);
    rmaService
      .getAll()
      .then((result) => setData(result))
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));
  }

  return { loading, error, data, refetch };
}

export default function RmaList() {
  const { data, loading, error, refetch } = useGetAllRmasQuery();
  const [rawData, setRawData] = useState<DataRow[]>([]);
  const [dataState, setDataState] = useState<DataRow[]>([]);
  const [showFilters, setShowFilters] = useState(false);


  console.log({ data, loading, error, refetch, rawData, dataState });


  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <RmaForm
          onClose={() => popup.close()}
          onSave={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nueva RMA",
      {
        width: 760,
        height: 720,
        url: `${document.location.href}/form`
      }
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (record: RmaRecord) => {
      openReactWindow(
        (popup) => (
          <RmaForm
            rma={record}
            onClose={() => popup.close()}
            onSave={() => {
              popup.close();
              void refetch();
            }}
          />
        ),
        `RMA #${record.RmaID}`,
        {
          width: 760,
          height: 720,
          url: `${document.location.href}/${record.RmaID}/edit`
        }
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (record: RmaRecord) => {
      if (
        !confirm(
          `¿Eliminar la RMA #${record.RmaID}? Esta acción no se puede deshacer.`
        )
      ) {
        return;
      }

      try {
        await rmaService.remove(record.CompanyID, record.BranchID, record.RmaID);
        void refetch();
      } catch (err) {
        alert(
          `No se pudo eliminar la RMA: ${err instanceof Error ? err.message : String(err)
          }`
        );
      }
    },
    [refetch]
  );

  const handleFilterChange = useCallback((rows: DataRow[]) => {
    setDataState(rows);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setRawData(data);
      setDataState(data);
    }
  }, [data]);

  const columns = useMemo<ColumnDef<DataRow>[]>(() => {
    return [
      {
        header: "RMA",
        accessorKey: "RmaID",
        className: "first w-4",
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
        header: "Fecha",
        accessorKey: "RmaDate",
        cell: ({ getValue }) => formatDateTime(getValue() as string),
      },
      {
        header: "Tipo",
        accessorKey: "RmaTypeID",
      },
      {
        header: "Estado",
        accessorKey: "StatusID",
      },
      {
        header: "Cliente",
        accessorKey: "ClientID",
      },
      {
        header: "Proveedor",
        accessorKey: "SupplierID",
      },
      {
        header: "Subtotal",
        accessorKey: "Subtotal",
        cell: ({ getValue }) => {
          const value = Number(getValue() ?? 0);
          return value.toLocaleString(undefined, {
            style: "currency",
            currency: "ARS",
          });
        },
      },
      {
        header: "Total",
        accessorKey: "Total",
        cell: ({ getValue }) => {
          const value = Number(getValue() ?? 0);
          return value.toLocaleString(undefined, {
            style: "currency",
            currency: "ARS",
          });
        },
      },
      {
        id: "actions",
        header: "",
        accessorKey: "RmaID",
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
      <AdminTopBar title="RMA" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {rawData.length > 0 && (
            <ShowFilterButton
              onClick={() => setShowFilters((prev) => !prev)}
              showFilters={showFilters}
            />
          )}
          <RefreshButton onClick={refetch} loading={loading} />
          <CreateButton title="Nueva RMA" onClick={handleCreate} />
        </div>
      </AdminTopBar>

      <div className="space-y-4 p-4">
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}

        {!error && !loading && dataState.length === 0 && (
          <div className="bg-card border rounded-2xl text-center py-12">
            <IconEggCracked size="48" className="m-auto" />
            <h3 className="mt-2 text-sm font-medium">No hay RMAs</h3>
            <p className="mt-1 text-sm ">Comienza creando tu primer RMA.</p>
            <div className="mt-6">
              <Button variant="primary" onClick={handleCreate}>
                Crear
              </Button>
            </div>
          </div>
        )}

        {showFilters && (
          <div className="mb-6">
            <TableFilters
              modelName="rma"
              data={rawData}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {loading && <AdminTableLoading />}

        {!loading && dataState.length > 0 && (
          <DataTable id="rma" columns={columns} data={dataState} />
        )}
      </div>
    </section>
  );
}

