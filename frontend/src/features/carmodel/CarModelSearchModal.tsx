// frontend/src/features/carmodel/CarModelSearchModal.tsx
import { useState } from "react";
import { X } from "lucide-react";
import TableFilters from "~/components/TableFilters";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useGetAllCarModelsQuery, type CarModelsInDb } from "~/graphql/_generated/graphql";

interface CarModelSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onModelSelect: (model: CarModelsInDb) => void;
  selectedCarBrandID?: number | null;
}

export default function CarModelSearchModal({
  isOpen,
  onClose,
  onModelSelect,
  selectedCarBrandID = null,
}: CarModelSearchModalProps) {
  const [filteredModels, setFilteredModels] = useState<CarModelsInDb[]>([]);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data, loading } = useGetAllCarModelsQuery({
    skip: !isOpen,
    onCompleted: (data) => {
      let models = data?.allCarModels as CarModelsInDb[] || [];
      // Filter by brand if specified
      if (selectedCarBrandID) {
        models = models.filter(m => m.BrandID === selectedCarBrandID);
      }
      setFilteredModels(models);
    },
  });

  const models = data?.allCarModels || [];

  const filtered = filteredModels.filter((m) =>
    (m.ModelName || "").toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className="relative mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md bg-background space-y-4">
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-xl font-semibold text-foreground">
            Buscar Modelos {selectedCarBrandID ? "(Filtrado por marca)" : ""}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:text-foreground rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

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
          <Button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? "default" : "secondary"}
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </Button>
        </div>

        {showFilters && (
          <div className="border rounded-md p-4">
            <TableFilters
              modelName="carmodels"
              data={models}
              onFilterChange={(filtered: CarModelsInDb[]) => setFilteredModels(filtered)}
            />
          </div>
        )}

        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-muted sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Modelo</th>
                <th className="px-4 py-2 text-left">Marca</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center">
                    Cargando...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((m) => (
                  <tr
                    key={m.ModelID}
                    className="hover:bg-muted/50"
                    onDoubleClick={() => {
                      onModelSelect(m);
                      onClose();
                    }}
                  >
                    <td className="px-4 py-2">{m.ModelID}</td>
                    <td className="px-4 py-2">{m.ModelName}</td>
                    <td className="px-4 py-2">{m.BrandData?.BrandName || "-"}</td>
                    <td className="px-4 py-2">
                      <Button
                        onClick={() => {
                          onModelSelect(m);
                          onClose();
                        }}
                        size="sm"
                        variant="link"
                      >
                        Seleccionar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No se encontraron modelos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
