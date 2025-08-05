// frontend/src/components/CarModelSearchModal.jsx
import { useEffect, useState } from "react";
import {
  carBrandOperations,
  carModelOperations,
} from "~/graphql/operations.js";
import TableFilters from "./TableFilters";

export default function CarModelSearchModal({
  isOpen,
  onClose,
  onModelSelect,
  selectedCarBrandID = null, // CAMBIO: Nombre más distintivo y consistente con la DB
}) {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setIsLoading(true);

      // MODIFICADO: Si hay una marca seleccionada, cargar solo modelos de esa marca
      const loadModels = selectedCarBrandID
        ? carModelOperations.getCarModelsByBrand(selectedCarBrandID)
        : carModelOperations.getAllCarModels();

      Promise.all([loadModels, carBrandOperations.getAllCarBrands()])
        .then(([m, b]) => {
          setModels(m || []);
          setBrands(b || []);
          setFilteredModels(m || []);
        })
        .catch((err) => {
          console.error("Error fetching models:", err);
          setModels([]);
          setBrands([]);
          setFilteredModels([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, selectedCarBrandID]); // AGREGADO: selectedCarBrandID como dependencia

  if (!isOpen) return null;

  const filtered = filteredModels.filter((m) =>
    m.Model.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0  bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className="relative mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md  space-y-4 bg-background">
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-xl font-semibold text-foreground/80">
            Buscar Modelos {selectedCarBrandID ? "(Filtrado por marca)" : ""}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover: hover:text-foreground rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* AGREGADO: Mostrar marca seleccionada si existe */}
        {selectedCarBrandID && (
          <div className="bg-accent border  rounded-md p-3">
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
                Mostrando solo modelos de:{" "}
                {brands.find(
                  (b) => b.CarBrandID === parseInt(selectedCarBrandID)
                )?.Name || "Marca seleccionada"}
              </span>
            </div>
          </div>
        )}

        <div className="flex space-x-2 items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Nombre del modelo..."
          />
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
          >
            Mostrar Filtros
          </button>
        </div>
        {showFilters && (
          <div className="fixed inset-0 bg-background/90 bg-opacity-40 flex items-start justify-center pt-10 z-60">
            <div className=" rounded-md shadow-lg p-4 w-full max-w-xl space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-2 border-b">
                <h4 className="text-lg font-semibold">Filtros</h4>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-foreground/80 hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <TableFilters
                modelName="carmodels"
                data={models}
                onFilterChange={setFilteredModels}
              />
            </div>
          </div>
        )}
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className=" sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Modelo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Marca
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {filtered.length > 0 ? (
                filtered.map((m) => (
                  <tr
                    key={m.CarModelID}
                    className="hover:"
                    onDoubleClick={() => {
                      onModelSelect(m);
                      onClose();
                    }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground/80">
                      {m.CarModelID}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground/80">
                      {m.Model}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground/80">
                      {m.CarBrandName ||
                        brands.find((b) => b.CarBrandID === m.CarBrandID)
                          ?.Name ||
                        ""}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          onModelSelect(m);
                          onClose();
                        }}
                        className="text-indigo-600 hover:text-indigo-900 px-2 py-1 text-sm"
                      >
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-10 text-center text-sm text-foreground/80"
                  >
                    {isLoading ? "Cargando..." : "No se encontraron modelos"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pt-3 border-t flex justify-end">
          <button
            onClick={onClose}
            className=" hover: text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
