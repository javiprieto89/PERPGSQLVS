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
  purchaseInvoiceDetailService,
  type PurchaseInvoiceDetail,
} from "~/services/purchase-invoice-detail.service";
import { AuthStorage } from "~/utils/auth.storage";
import { openReactWindow } from "~/utils/openReactWindow";
import PurchaseInvoiceDetailForm from "./form";

type DataRow = PurchaseInvoiceDetail;

export default function PurchaseInvoiceDetailList() {
  const selectedAccess = AuthStorage.getSelectedAccess();
  const [rawData, setRawData] = useState<DataRow[]>([]);
  const [dataState, setDataState] = useState<DataRow[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const base = await purchaseInvoiceDetailService.getAll({
        companyID: selectedAccess?.CompanyID ?? undefined,
        branchID: selectedAccess?.BranchID ?? undefined,
        purchaseInvoiceID: undefined,
      });

      setRawData(base);
      setDataState(base);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [selectedAccess?.CompanyID, selectedAccess?.BranchID]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <PurchaseInvoiceDetailForm
          onClose={() => popup.close()}
          onSave={() => {
            popup.close();
            void loadData();
          }}
        />
      ),
      "Agregar detalle OC",
      {
        width: 640,
        height: 600,
        url: `${document.location.href}/form`
      }
    );
  }, [loadData]);

  const handleEdit = useCallback(
    (record: PurchaseInvoiceDetail) => {
      openReactWindow(
        (popup) => (
          <PurchaseInvoiceDetailForm
            detail={record}
            onClose={() => popup.close()}
            onSave={() => {
              popup.close();
              void loadData();
            }}
          />
        ),
        `Detalle OC #${record.PurchaseInvoiceDetailID}`,
        {
          width: 640,
          height: 600,
          url: `${document.location.href}/${record.PurchaseInvoiceDetailID}/edit`
        }
      );
    },
    [loadData]
  );

  const handleDelete = useCallback(
    async (record: PurchaseInvoiceDetail) => {
      if (
        !confirm(
          `¿Eliminar el detalle #${record.PurchaseInvoiceDetailID} de la orden ${record.PurchaseInvoiceID}?`
        )
      ) {
        return;
      }

      try {
        await purchaseInvoiceDetailService.remove(
          record.CompanyID,
          record.BranchID,
          record.PurchaseInvoiceID,
          record.PurchaseInvoiceDetailID
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
        accessorKey: "PurchaseInvoiceDetailID",
        className: "first w-4",
      },
      {
        header: "Orden",
        accessorKey: "PurchaseInvoiceID",
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
        header: "Notas",
        accessorKey: "Notes",
      },
      {
        id: "actions",
        header: "",
        accessorKey: "PurchaseInvoiceDetailID",
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
      <AdminTopBar title="Detalles de órdenes de compra" quickAccessHidden>
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
              modelName="purchaseInvoiceDetails"
              data={rawData}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {loading && <AdminTableLoading />}

        {!loading && dataState.length > 0 && (
          <DataTable
            id="purchase-invoice-details"
            columns={columns}
            data={dataState}
          />
        )}
      </div>
    </section>
  );
}

