// frontend/src/components/SaleConditionSearchModal.jsx
import { useEffect, useState } from "react";
import { saleConditionOperations } from "../utils/graphqlClient";
import TableFilters from "./TableFilters";

export default function SaleConditionSearchModal({ isOpen, onClose, onSelect }) {
  const [saleConditions, setSaleConditions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await saleConditionOperations.getAllSaleConditions();
        setSaleConditions(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching sale conditions:", err);
        setSaleConditions([]);
        setFiltered([]);
      }
      setLoading(false);
    }
    if (isOpen) {
      setQuery("");
      setShowFilters(false);
      loadData();
    }
  }, [isOpen]);

  const list = filtered.filter((sc) =>
    (sc.name || "").toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className="relative mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md bg-white space-y-4">
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-xl font-semibold text-gray-700">Buscar Condición</h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Buscar por nombre..."
          />
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${showFilters ? "bg-purple-700 text-white hover:bg-purple-800" : "bg-purple-600 text-white hover:bg-purple-700"}`}
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
        </div>

        {showFilters && (
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <TableFilters
              modelName="saleconditions"
              data={saleConditions}
              onFilterChange={setFiltered}
            />
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Cargando...</span>
          </div>
        )}

        {!loading && (
          <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-md">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {list.length > 0 ? (
                  list.map((sc) => (
                    <tr key={sc.saleConditionID} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{sc.saleConditionID}</td>
                      <td className="px-4 py-2">{sc.name}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => onSelect(sc)}
                          className="text-blue-600 hover:underline"
                        >
                          Seleccionar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                      {query || showFilters ? "No se encontraron coincidencias" : "No hay datos disponibles"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
