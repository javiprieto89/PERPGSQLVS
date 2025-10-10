import { Plus } from "lucide-react";
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
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
import { Button } from "~/components/ui/button";
import { useGetAllItemsQuery } from "~/graphql/_generated/graphql";
import { itemOperations } from "~/services/item.service";
import { openReactWindow } from "~/utils/openReactWindow";
import ItemCreate from "./ItemCreate";

export default function Items() {
  const { data, error, loading, refetch } = useGetAllItemsQuery({
    notifyOnNetworkStatusChange: true,
  });
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
        enableHiding: false,
        accessorKey: "ItemID",
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
        {items.length > 0 && <DataTable columns={columns} data={items} />}
        {loading && <AdminTableLoading />}
      </div>
    </div>
  );
}
