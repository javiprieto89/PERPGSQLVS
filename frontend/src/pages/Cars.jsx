import { Plus, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertLoading } from "~/components/AlertLoading";
import { ApiErrorMessage } from "~/components/ApiErrorMessage";
import { InputQuickSearch } from "~/components/InputQuickSearch";
import { TableActionButton } from "~/components/TableActionButtons";
import { AdminTable, AdminTableLoading } from "~/components/TanstackTable";
import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { Button } from "~/components/ui/button";
import { useGetAllCarsQuery } from "~/graphql/_generated/graphql";
import { carOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import CarCreate from "./CarCreate";

export default function Cars() {
  const { data, error, loading, refetch } = useGetAllCarsQuery();
  const [cars, setCars] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filtered) => {
    setCars(filtered);
  };

  const handleCreate = useCallback(() => {
    openReactWindow(
      (popup) => (
        <CarCreate
          onSave={() => {
            popup.opener.postMessage("reload-cars", "*");
            popup.close();
          }}
          onClose={() => {
            popup.close();
            refetch();
          }}
        />
      ),
      "Nuevo Auto"
    );
  }, [refetch]);

  const handleEdit = useCallback(
    (c) => {
      openReactWindow(
        (popup) => (
          <CarCreate
            initialData={c}
            onSave={() => {
              popup.opener.postMessage("reload-cars", "*");
              popup.close();
            }}
            onClose={() => {
              popup.close();
              refetch();
            }}
          />
        ),
        "Editar Auto"
      );
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("¿Borrar auto?")) return;
      try {
        await carOperations.deleteCar(id);
        refetch();
      } catch (err) {
        alert("Error al borrar auto: " + err.message);
      }
    },
    [refetch]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-cars") {
        refetch();
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [refetch]);

  useEffect(() => {
    if (data?.allCars) {
      setCars(data.allCars);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "CarID",
        className: "first w-3",
      },
      {
        header: "Patente",
        accessorKey: "LicensePlate",
      },
      {
        header: "Cliente",
        accessorKey: "ClientName",
      },
      {
        header: "Año",
        accessorKey: "Year",
      },
      {
        header: "Marca",
        accessorKey: "CarBrandName",
      },
      {
        header: "Modelo",
        accessorKey: "CarModelName",
      },
      {
        header: "Último servicio",
        accessorKey: "LastServiceMileage",
        cell: ({ getValue }) => `${getValue()} km`,
      },
      {
        header: "Estado",
        accessorKey: "IsDebtor",
        cell: ({ getValue }) => {
          return (
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                getValue()
                  ? "bg-red-100 text-destructive"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {getValue() ? "Deudor" : "Al día"}
            </span>
          );
        },
      },
      {
        header: "",
        id: "actions",
        accessorKey: "CarID",
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
        <h1 className="text-3xl font-bold text-foreground">Autos</h1>
        <div className="flex space-x-2">
          {data && data.allCars.length > 0 && (
            <>
              <InputQuickSearch
                rows={data.allCars}
                onSearch={(rows) => setCars(rows)}
              />
              <ShowFilterButton
                onClick={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
              />
            </>
          )}
          <Button onClick={() => refetch()}>
            <RefreshCcw />
            Recargar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            <Plus /> Nuevo
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="cars"
            data={data.allCars}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}

      {/* Error */}
      {error && <ApiErrorMessage error={error} />}

      {loading && <AlertLoading />}

      {cars.length > 0 && <AdminTable columns={columns} data={cars} />}
      {/* Lista de autos */}
      {!error && cars.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-muted-foreground">
              Mostrando {cars.length} auto{cars.length !== 1 ? "s" : ""} de{" "}
              {data.allCars.length} total{data.allCars.length !== 1 ? "es" : ""}
            </p>
          </div>
        </div>
      )}

      {loading && <AdminTableLoading />}

      {/* Estado vacío */}
      {!error && !loading && cars.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-foreground">
            No hay autos
          </h3>
          <p className="mt-1 text-sm text-foreground/80">
            {showFilters
              ? "No se encontraron autos con los filtros aplicados."
              : "Comienza creando tu primer auto."}
          </p>
          <div className="mt-6">
            {showFilters ? (
              <button
                onClick={() => alert("Ups")}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                Limpiar Filtros
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Crear Primer Auto
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
