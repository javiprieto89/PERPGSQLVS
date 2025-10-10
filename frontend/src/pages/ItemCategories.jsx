import { useCallback, useEffect, useMemo, useState } from "react";

import { useGetAllItemCategoriesQuery } from "~/graphql/_generated/graphql";
import { openReactWindow } from "~/utils/openReactWindow";

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
import { itemCategoryOperations } from "~/services/item.service";
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
        enableHiding: false,
        accessorKey: "ItemCategoryID",
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
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <CreateButton title="Nuevo" onClick={handleCreate} />
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
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
          <DataTable columns={columns} data={categories || []} />
        )}
        {loading && <AdminTableLoading />}
      </div>
    </div>
  );
}
