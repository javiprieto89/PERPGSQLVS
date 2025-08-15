// frontend/src/pages/PriceLists.jsx
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertLoading } from "~/components/AlertLoading";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { RefreshButton } from "~/components/RefreshButton";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/TableExtraComponents";
import { AdminTable } from "~/components/TanstackTable";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { Button } from "~/components/ui/button";
import { useGetPriceListsQuery } from "~/graphql/_generated/graphql";
import { pricelistOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import PriceListCreate from "./PriceListCreate";

export default function PriceLists() {
  const { data, error, loading, refetch } = useGetPriceListsQuery();
  const [lists, setLists] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filtered) => {
    setLists(filtered);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <PriceListCreate
          onSave={() => {
            popup.opener.postMessage("reload-pricelists", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nueva Lista"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (pl) => {
      openReactWindow(
        (popup) => (
          <PriceListCreate
            pricelist={pl}
            onSave={() => {
              popup.opener.postMessage("reload-pricelists", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Lista"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar lista de precios?")) return;
      try {
        await pricelistOperations.deletePricelist(id);
        refetch();
      } catch (err) {
        alert("Error al borrar lista de precios: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-pricelists") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allPricelists) {
      setLists(data.allPricelists);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "PriceListID",
        className: "first w-3",
      },
      {
        header: "Nombre",
        accessorKey: "Name",
      },
      {
        header: "Descripción",
        accessorKey: "Description",
      },
      {
        header: "Estado",
        accessorKey: "IsActive",
        cell: (props) => <TableIsActiveCell {...props} />,
      },
      {
        header: "",
        id: "actions",
        accessorKey: "PriceListID",
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
        <h1 className="text-3xl font-bold text-foreground">
          Listas de precios
        </h1>
        <div className="flex space-x-2">
          {data && data.allPricelists.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allPricelists}
                onSearch={(rows) => setLists(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <RefreshButton onClick={() => refetch()} loading={loading} />
          <Button variant="primary" onClick={handleCreate}>
            <Plus strokeWidth={3} /> Nuevo
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="pricelists"
            data={data.allPricelists}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      {lists.length > 0 && <AdminTable columns={columns} data={lists} />}
      {loading && <AdminTableLoading />}
    </div>
  );
}
