import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/table/TableExtraComponents";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { useGetAllItemSubcategoriesQuery } from "~/graphql/_generated/graphql";
import { itemSubcategoryOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import ItemSubcategoryCreate from "./ItemSubcategoryCreate";

export default function ItemSubcategories() {
  const { data, error, loading, refetch } = useGetAllItemSubcategoriesQuery();

  const [subcategories, setSubcategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = useCallback((filtered) => {
    setSubcategories(filtered);
  }, []);

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <ItemSubcategoryCreate
          onSave={() => {
            popup.opener.postMessage("reload-itemsubcategories", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nueva Subcategoría"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (subcat) => {
      openReactWindow(
        (popup) => (
          <ItemSubcategoryCreate
            subcategory={subcat}
            onSave={() => {
              popup.opener.postMessage("reload-itemsubcategories", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Subcategoría"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar subcategoría?")) return;
      try {
        await itemSubcategoryOperations.deleteItemSubcategory(id);
        refetch();
      } catch (err) {
        alert("Error al borrar subcategoría: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-itemsubcategories") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allItemsubcategories) {
      setSubcategories(data.allItemsubcategories);
    }
  }, [data]);

  const columns = useMemo(
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
            onDelete={() => handleDelete(getValue())}
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
              data={data?.allSubcategories || []}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {subcategories.length > 0 && (
          <DataTable columns={columns} data={subcategories || []} />
        )}
        {loading && <AdminTableLoading />}
      </div>
    </div>
  );
}
