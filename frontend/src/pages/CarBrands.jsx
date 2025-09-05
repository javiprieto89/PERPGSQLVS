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
        accessorKey: "CarBrandID",
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
        <h1 className="text-3xl font-bold text-foreground">Marcas de Auto</h1>
        <div className="flex space-x-2">
          {data && data.allCarbrands.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allCarbrands}
                onSearch={(rows) => setCarBrands(rows)}
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
            modelName="carbrands"
            data={data.allCarbrands}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading />}
      {carBrands.length > 0 && (
        <AdminTable columns={columns} data={carBrands} />
      )}
      {loading && <AdminTableLoading />}
    </div>
  );
}
