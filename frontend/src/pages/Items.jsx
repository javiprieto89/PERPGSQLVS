import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { RefreshButton } from "~/components/RefreshButton";
import { AdminTable } from "~/components/table/AdminTable";
import {
  AdminTableLoading,
  TableActionButton,
} from "~/components/TableExtraComponents";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { useGetAllItemsQuery } from "~/graphql/_generated/graphql";
import { itemOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import ItemCreate from "./ItemCreate";

export default function Items() {
  const { data, error, loading, refetch } = useGetAllItemsQuery();
  const [items, setItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <ItemCreate
          onSave={() => {
            popup.opener.postMessage("reload-items", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nuevo Ítem"
    );
  }, [refetch]);

  const handleFilterChange = (filtered) => {
    setItems(filtered);
  };

  const handleEdit = useCallback(
    (item) => {
      openReactWindow(
        (popup) => (
          <ItemCreate
            item={item}
            onSave={() => {
              popup.opener.postMessage("reload-items", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Ítem"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar ítem?")) return;
      try {
        await itemOperations.deleteItem(id);
        refetch();
      } catch (err) {
        alert("Error al borrar ítem: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-items") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allItems) {
      setItems(data.allItems);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "ItemID",
        className: "first w-3",
      },
      {
        header: "Description",
        accessorKey: "Description",
      },
      {
        header: "Code",
        accessorKey: "Code",
      },
      {
        header: "",
        id: "actions",
        accessorKey: "ItemID",
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
        <h1 className="text-3xl font-bold text-foreground">Ítems</h1>
        <div className="flex space-x-2">
          {data && data.allItems.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allItems}
                onSearch={(rows) => setItems(rows)}
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
            modelName="items"
            data={data?.allItems || []}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      {items.length > 0 && <AdminTable columns={columns} data={items} />}
      {loading && <AdminTableLoading />}
    </div>
  );
}
