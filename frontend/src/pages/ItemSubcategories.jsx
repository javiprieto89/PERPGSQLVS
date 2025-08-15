import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertLoading } from "~/components/AlertLoading";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { RefreshButton } from "~/components/RefreshButton";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/TableExtraComponents";
import { AdminTable } from "~/components/TanstackTable";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { Button } from "~/components/ui/button";
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
        accessorKey: "ItemSubcategoryID",
        cell: ({ row, getValue }) => (
          <TableActionButton
            onDelete={() => handleDelete(getValue())}
            onEdit={() => handleEdit(row.original)}
          />
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Subcategorías</h1>
        <div className="flex space-x-2">
          {data && data.allItemsubcategories.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allItemsubcategories}
                onSearch={(rows) => setSubcategories(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} />
            Nuevo
          </Button>
        </div>
      </div>
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
        <AdminTable columns={columns} data={subcategories || []} />
      )}
      {loading && <AdminTableLoading />}
    </div>
  );
}
