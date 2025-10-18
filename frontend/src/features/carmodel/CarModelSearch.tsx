// frontend/src/features/carmodel/CarModelSearch.tsx
import { type ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ShowFilterButton } from "~/components/filter/ShowFilterButton";
import { DataTable } from "~/components/table/DataTable";
import { AdminTableLoading } from "~/components/table/TableExtraComponents";
import TableFilters from "~/components/TableFilters";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { useGetAllCarModelsQuery, type CarModelsInDb } from "~/graphql/_generated/graphql";
import { CarModelDetails } from "./CarModelDetails";

interface CarModelSearchProps {
  onModelSelect?: (model: CarModelsInDb) => void;
  selectedCarBrandID?: number | null;
  showSelectButton?: boolean;
  title?: string;
  showTopBar?: boolean;
}

type DataInDB = CarModelsInDb;

export default function CarModelSearch({
  onModelSelect,
  selectedCarBrandID = null,
  showSelectButton = false,
  title = "Modelos de Vehículos",
  showTopBar = true,
}: CarModelSearchProps) {
  const [dataState, setDataState] = useState<DataInDB[]>([]);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data, error, loading, refetch } = useGetAllCarModelsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const allData = data?.allCarmodels || [];

  const handleFilterChange = useCallback((filtered: DataInDB[]) => {
    setDataState(filtered);
  }, []);

  const handleSelect = useCallback((model: DataInDB) => {
    if (onModelSelect) {
      onModelSelect(model);
    }
  }, [onModelSelect]);

  useEffect(() => {
    if (allData.length > 0) {
      let models = allData as DataInDB[];
      // Filter by brand if specified
      if (selectedCarBrandID) {
        models = models.filter(m => m.CarBrandID === selectedCarBrandID);
      }
      setDataState(models);
    }
  }, [allData, selectedCarBrandID]);

  const filteredByQuery = useMemo(() => {
    if (!query) return dataState;
    return dataState.filter((m) =>
      (m.CarModelName || "").toLowerCase().includes(query.toLowerCase())
    );
  }, [dataState, query]);

  const columns = useMemo<ColumnDef<DataInDB>[]>(
    () => [
      {
        header: "ID",
        id: "id",
        accessorKey: "CarModelID",
      },
      {
        header: "Modelo",
        accessorKey: "CarModelName",
        enableHiding: false,
      },
      {
        header: "Marca",
        accessorKey: "CarBrandData.CarBrandName",
      },
      ...(showSelectButton ? [{
        header: "",
        id: "actions",
        enableHiding: false,
        accessorKey: "CarModelID",
        cell: ({ row }: { row: any }) => (
          <div className="ml-auto flex gap-2 justify-end">
            <Button
              onClick={() => handleSelect(row.original)}
              size="sm"
              variant="primary"
            >
              Seleccionar
            </Button>
          </div>
        ),
      }] : []),
    ],
    [handleSelect, showSelectButton]
  );

  const defaultColumnVisibility = {
    id: false,
  };

  const content = (
    <div className="space-y-4">
      {selectedCarBrandID && (
        <div className="bg-accent border rounded-md p-3">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-primary mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-foreground text-sm">
              Mostrando solo modelos de la marca seleccionada
            </span>
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
          placeholder="Nombre del modelo..."
        />
        {allData.length > 0 && (
          <ShowFilterButton
            onClick={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
          />
        )}
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="carmodels"
            data={allData}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}

      {/* Error */}
      {error && <ApiErrorMessage error={error} />}

      {loading && <AlertLoading />}

      {/* Estado vacío */}
      {!error && !loading && filteredByQuery.length === 0 && (
        <div className="bg-card border rounded-2xl text-center py-12">
          <h3 className="mt-2 text-sm font-medium">No hay modelos</h3>
          <p className="mt-1 text-sm">No se encontraron modelos que coincidan con los criterios.</p>
        </div>
      )}

      {loading && <AdminTableLoading />}

      {/* Lista de modelos */}
      {!loading && filteredByQuery.length > 0 && (
        <DataTable
          id="carmodels-search"
          defaultColumnVisibility={defaultColumnVisibility}
          getRowCanExpand={() => true}
          renderSubComponent={({ row }) => (
            <CarModelDetails carModel={row.original} />
          )}
          columns={columns}
          data={filteredByQuery}
        />
      )}
    </div>
  );

  if (!showTopBar) {
    return <div className="p-4">{content}</div>;
  }

  return (
    <>
      <AdminTopBar title={title} quickAccessHidden>
        <div className="ml-auto flex gap-2">
          {allData.length > 0 && (
            <ShowFilterButton
              onClick={() => setShowFilters(!showFilters)}
              showFilters={showFilters}
            />
          )}
          <Button onClick={() => refetch()} variant="outline" disabled={loading}>
            Actualizar
          </Button>
        </div>
      </AdminTopBar>
      <div className="m-x-auto space-y-4 p-4">
        {content}
      </div>
    </>
  );
}