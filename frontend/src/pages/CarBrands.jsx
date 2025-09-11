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
import { useGetAllCarBrandsQuery } from "~/graphql/_generated/graphql";
import { carBrandOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import CarBrandCreate from "./CarBrandCreate";

export default function CarBrands() {
  const { data, error, loading, refetch } = useGetAllCarBrandsQuery();
  const [carBrands, setCarBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filtered) => {
    setCarBrands(filtered);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <CarBrandCreate
          onSave={() => {
            popup.opener.postMessage("reload-carbrands", "*");
            popup.close();
          }}
          onClose={async () => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nueva Marca de Auto"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (cb) => {
      openReactWindow(
        (popup) => (
          <CarBrandCreate
            carBrand={cb}
            onSave={() => {
              popup.opener.postMessage("reload-carbrands", "*");
              popup.close();
            }}
            onClose={async () => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Marca de Auto"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar marca de auto?")) return;
      try {
        await carBrandOperations.deleteCarBrand(id);
        refetch();
      } catch (err) {
        alert("Error al borrar marca de auto: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-carbrands") {
        refetch();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setCarBrands(data.allCarbrands);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "CarBrandID",
        className: "first w-3",
      },
      {
        header: "Nombre",
        accessorKey: "Name",
      },
      {
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "CarBrandID",
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
      <AdminTopBar title="Marcas de Auto" quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {data && data.allCarbrands.length > 0 && (
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
              modelName="carbrands"
              data={data.allCarbrands}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {error && <ApiErrorMessage error={error} />}
        {loading && <AlertLoading />}
        {carBrands.length > 0 && (
          <DataTable columns={columns} data={carBrands} />
        )}
        {loading && <AdminTableLoading />}
      </div>
    </section>
  );
}
