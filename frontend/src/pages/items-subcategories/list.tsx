import type { ColumnDef } from "@tanstack/react-table";
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
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { useGetAllItemSubcategoriesQuery, type ItemSubcategoriesInDb } from "~/graphql/_generated/graphql";
import { itemSubcategoryOperations } from "~/services/item.service";

type DataInDB = ItemSubcategoriesInDb;

export default function ItemSubcategories() {
  const location = useLocation();
  const navigate = useNavigate();
  const { highlight } = location.state || {};

  const { data, error, loading, refetch } = useGetAllItemSubcategoriesQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filtered: DataInDB[]) => {
    setDataState(filtered);
  };

  const handleCreate = useCallback(() => navigate(`form`), []);

  const handleEdit = useCallback(
    (row: DataInDB) => navigate(`form/${row.ItemSubcategoryID}`),
    []
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("¿Borrar subcategoría?")) return;
      try {
        await itemSubcategoryOperations.deleteItemSubcategory(String(id));
        refetch();
      } catch (err) {
        alert("Error al borrar subcategoría: " + (err as Error).message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "reload-itemsubcategories") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allItemsubcategories) {
      setDataState(data.allItemsubcategories as DataInDB[]);
    }
  }, [data]);

  const columns = useMemo<ColumnDef<DataInDB>[]>(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "ItemSubcategoryID",
        className: "first w-3",
      },
      {
        header: "Subcategory Name",
        accessorKey: "SubcategoryName",
      },
      {
        header: "Category",
        accessorKey: "CategoryData.CategoryName",
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "ItemSubcategoryID",
        cell: ({ row, getValue }) => (
          <TableActionButton
            row={row}
            onDelete={() => handleDelete(getValue() as number)}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <div>
      <AdminTopBar title="Subcategorías" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allItemsubcategories.length > 0 && (
            <>
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
              modelName="itemsubcategories"
              data={data?.allItemsubcategories || []}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {dataState.length > 0 && (
          <DataTable
            id="itemsubcategories"
            columns={columns}
            data={dataState}
            highlightValue={highlight}
            highlightKey="ItemSubcategoryID"
          />
        )}
        {loading && <AdminTableLoading />}
      </div>
    </div>
  );
}
