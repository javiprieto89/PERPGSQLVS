import React, { useEffect, useState } from "react";
import { carBrandOperations } from "../utils/graphqlClient";
import TableFilters from "./TableFilters";

export default function CarBrandSearchModal({ isOpen, onClose, onBrandSelect }) {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setIsLoading(true);
      carBrandOperations
        .getAllCarBrands()
        .then((data) => {
          setBrands(data || []);
          setFilteredBrands(data || []);
        })
        .catch((err) => {
          console.error("Error fetching brands:", err);
          setBrands([]);
          setFilteredBrands([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = filteredBrands.filter((b) =>
    b.Name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white space-y-4">
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-xl font-semibold text-gray-700">Buscar Marcas</h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Nombre de marca..."
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
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center pt-10 z-60">
          <div className="bg-white rounded-md shadow-lg p-4 w-full max-w-xl space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-2 border-b">
                <h4 className="text-lg font-semibold">Filtros</h4>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <TableFilters
                modelName="carbrands"
                data={brands}
                onFilterChange={setFilteredBrands}
              />
            </div>
          </div>
        )}
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compañía</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.length > 0 ? (
                filtered.map((b) => (
                  <tr
                    key={b.CarBrandID}
                    className="hover:bg-gray-50"
                    onDoubleClick={() => {
                      onBrandSelect(b);
                      onClose();
                    }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{b.CarBrandID}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{b.CompanyID}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{b.Name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          onBrandSelect(b);
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
                  <td colSpan="3" className="px-4 py-10 text-center text-sm text-gray-500">
                    {isLoading ? "Cargando..." : "No se encontraron marcas"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pt-3 border-t flex justify-end">
          <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm text-sm">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
