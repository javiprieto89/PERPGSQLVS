import {
  EllipsisVertical,
  Pencil,
  Plus,
  RefreshCcw,
  Trash,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useGetAllItemCategoriesQuery } from "~/graphql/_generated/graphql";
import { itemCategoryOperations } from "~/graphql/operations.js";
import { openReactWindow } from "../utils/openReactWindow";

import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { Button } from "~/components/ui/button";
import TableFilters from "../components/TableFilters";

import { InputQuickSearch } from "~/components/InputQuickSearch";
import { AdminTable } from "~/components/TanstackTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
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
        cell: ({ row, getValue }) => {
          return (
            <div className="flex gap-2 justify-end">
              <Button
                onClick={() => handleEdit(row.original)}
                className="hidden md:inline px-3 py-2 text-sm rounded"
              >
                <Pencil />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(getValue())}
                  >
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
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
            <Plus />
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
      {error && <div className="text-destructive mb-4">{error.message}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <AdminTable columns={columns} data={categories || []} />
      )}
    </div>
  );
}
