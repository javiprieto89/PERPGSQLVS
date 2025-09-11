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
import { useGetAllCarModelsQuery } from "~/graphql/_generated/graphql";
import { carModelOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import CarModelCreate from "./CarModelCreate";

export default function CarModels() {
  const { data, error, loading, refetch } = useGetAllCarModelsQuery();
  const [models, setModels] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <CarModelCreate
          onSave={() => {
            popup.opener.postMessage("reload-carmodels", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nuevo Modelo de Auto"
    );
  }, [refetch]);

  const handleFilterChange = (filtered) => setModels(filtered);

  const handleEdit = useCallback(
    (m) => {
      openReactWindow(
        (popup) => (
          <CarModelCreate
            carModel={m}
            onSave={() => {
              popup.opener.postMessage("reload-carmodels", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Modelo de Auto"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar modelo de auto?")) return;
      try {
        await carModelOperations.deleteCarModel(id);
        refetch();
      } catch (err) {
        alert("Error al borrar modelo de auto: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-carmodels") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allCarmodels) {
      setModels(data.allCarmodels);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "CarModelID",
        className: "first w-3",
      },
      {
        header: "Modelo",
        accessorKey: "Model",
      },
      {
        header: "Marca",
        accessorKey: "CarBrandData.Name",
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "CarModelID",
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
      <AdminTopBar title="Modelos de Auto" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allCarmodels.length > 0 && (
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
              modelName="carmodels"
              data={data.allCarmodels || []}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {models.length > 0 && <DataTable columns={columns} data={models} />}
        {loading && <AdminTableLoading />}
      </div>
    </section>
  );
}
