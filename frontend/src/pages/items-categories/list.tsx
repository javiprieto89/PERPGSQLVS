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
import {
  useGetAllItemCategoriesQuery,
  type ItemCategoriesInDb
} from "~/graphql/_generated/graphql";
import { itemCategoryOperations } from "~/services/item.service";

type DataInDB = ItemCategoriesInDb;

export default function ItemCategories() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {};

  const { data, error, loading, refetch } = useGetAllItemCategoriesQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allData = data?.allItemcategories || [];

  const handleFilterChange = (filtered: DataInDB[]) => {
    setDataState(filtered);
  };

  const handleCreate = useCallback(() => navigate(`form`), []);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.ItemCategoryID}`),
    []
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("¿Borrar categoría?")) return;
      try {
        await itemCategoryOperations.deleteItemCategory(String(id));
        refetch();
      } catch (err) {
        alert("Error al borrar categoría: " + (err as Error).message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "reload-itemcategories" || e.data === "reload-item-categories") {
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
        accessorKey: "ItemCategoryID",
        className: "first w-3",
      },
      {
        header: "Name",
        id: "CategoryName",
        accessorKey: "CategoryName",
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "ItemCategoryID",
        cell: ({ row }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(row.original.ItemCategoryID)}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <div>
      <AdminTopBar title="Categorías" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allItemcategories.length > 0 && (
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
              modelName="itemcategories"
              data={data?.allItemcategories || []}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {dataState.length > 0 && (
          <DataTable
            id="itemcategories"
            columns={columns}
            data={dataState}
            highlightValue={highlight}
            highlightKey="ItemCategoryID"
          />
        )}
        {loading && <AdminTableLoading />}
      </div>
    </div>
  );
}