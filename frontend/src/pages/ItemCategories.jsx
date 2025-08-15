import { Plus, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useGetAllItemCategoriesQuery } from "~/graphql/_generated/graphql";
import { itemCategoryOperations } from "~/graphql/operations.js";
import { openReactWindow } from "../utils/openReactWindow";

import { AlertLoading } from "~/components/AlertLoading";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/TableExtraComponents";
import { AdminTable } from "~/components/TanstackTable";
import { Button } from "~/components/ui/button";
import TableFilters from "../components/TableFilters";
import ItemCategoryCreate from "./ItemCategoryCreate";

export default function ItemCategories() {
  const { data, error, loading, refetch } = useGetAllItemCategoriesQuery();
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <ItemCategoryCreate
          onSave={() => {
            popup.opener.postMessage("reload-itemcategories", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nueva Categoría"
    );
  };

  const handleFilterChange = (filtered) => {
    setCategories(filtered);
  };

  const handleEdit = useCallback(
    (category) => {
      openReactWindow(
        (popup) => (
          <ItemCategoryCreate
            category={category}
            onSave={() => {
              popup.opener.postMessage("reload-itemcategories", "*");
              popup.close();
            }}
            onClose={async () => {
              popup.close();
              await refetch();
            }}
          />
        ),
        "Editar Categoría"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar categoría?")) return;
      try {
        await itemCategoryOperations.deleteItemCategory(id);
        refetch();
      } catch (err) {
        alert("Error al borrar categoría: " + err.message);
      }
    },
    [refetch]
  );

  const handleRefetch = async () => {
    refetch();
  };

  useEffect(() => {
    if (data?.allItemcategories) {
      setCategories(data.allItemcategories);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "ItemCategoryID",
        className: "first w-3",
      },
      {
        header: "Name",
        accessorKey: "CategoryName",
      },
      {
        header: "",
        id: "actions",
        accessorKey: "ItemCategoryID",
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
        <h1 className="text-3xl font-bold text-foreground">Categorías</h1>
        <div className="flex space-x-2">
          {data && data.allItemcategories.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allItemcategories}
                onSearch={(rows) => setCategories(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <Button onClick={handleRefetch}>
            <RefreshCcw />
            Recargar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} />
            Nuevo
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="itemcategories"
            data={data.allItemcategories || []}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {loading && <AlertLoading />}
      {error && <ApiErrorMessage error={error} />}
      {categories.length > 0 && (
        <AdminTable columns={columns} data={categories || []} />
      )}
      {loading && <AdminTableLoading />}
    </div>
  );
}
