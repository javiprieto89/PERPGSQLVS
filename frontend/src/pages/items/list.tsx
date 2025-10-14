import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
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
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Button } from "~/components/ui/button";
import { useGetAllItemsQuery, type ItemsInDb } from "~/graphql/_generated/graphql";
import { itemOperations } from "~/services/item.service";

type DataInDB = ItemsInDb;

export default function Items() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {};

  const { data, error, loading, refetch } = useGetAllItemsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allData = data?.allItems || [];

  const handleFilterChange = (filtered: DataInDB[]) => {
    setDataState(filtered);
  };

  const handleCreate = useCallback(() => navigate(`form`), []);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.ItemID}`),
    []
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("¿Borrar ítem?")) return;
      try {
        await itemOperations.deleteItem(String(id));
        refetch();
      } catch (err) {
        alert("Error al borrar ítem: " + (err as Error).message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "reload-items") {
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
  }, [allData]);

  const columns = useMemo<ColumnDef<DataInDB>[]>(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "ItemID",
        className: "first w-3",
      },
      {
        header: "Description",
        id: "Descripción",
        accessorKey: "ItemDescription",
      },
      {
        header: "Code",
        id: "Código",
        accessorKey: "ItemCode",
      },
      {
        header: "Brand",
        id: "Marca",
        accessorKey: "BrandData.BrandName",
      },
      {
        header: "Company",
        id: "Compañía",
        accessorKey: "CompanyData.CompanyName",
      },
      {
        header: "Supplier",
        id: "Proveedor",
        accessorKey: "SupplierData.FirstName",
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "ItemID",
        cell: ({ row }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(row.original.ItemID)}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <div>
      <AdminTopBar title="Ítems" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allItems.length > 0 && (
            <>
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton
            onClick={() => {
              console.log("CLICK");
              refetch();
            }}
            loading={loading}
          />
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
              modelName="items"
              data={data?.allItems || []}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {dataState.length > 0 && <DataTable
          id="items"
          columns={columns}
          data={dataState}
          highlightValue={highlight}
          highlightKey="ItemID"
        />}
        {loading && <AdminTableLoading />}
      </div>
    </div>
  );
}
