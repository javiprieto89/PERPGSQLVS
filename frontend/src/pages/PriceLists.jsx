// frontend/src/pages/PriceLists.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import {
  AdminTableLoading,
  TableActionButton,
  TableIsActiveCell,
} from "~/components/table/TableExtraComponents";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { CreateButton } from "~/components/ui-admin/CreateButton";
import { RefreshButton } from "~/components/ui-admin/RefreshButton";
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
        enableHiding: false,
        accessorKey: "PriceListID",
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
    <section className="section">
      <AdminTopBar title="Listas de precios" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allPricelists.length > 0 && (
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
              modelName="pricelists"
              data={data.allPricelists}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {lists.length > 0 && <DataTable columns={columns} data={lists} />}
        {loading && <AdminTableLoading />}
      </div>
    </section>
  );
}
