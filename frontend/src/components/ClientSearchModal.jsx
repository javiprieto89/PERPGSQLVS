// frontend/src/components/ClientSearchModal.jsx
import { useEffect, useState } from "react";
import { graphqlClient } from "~/graphql/graphqlClient.js";
import { QUERIES } from "~/graphql/queries/queries.js";
import TableFilters from "./TableFilters";

export default function ClientSearchModal({ isOpen, onClose, onClientSelect }) {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function loadClients() {
      setIsLoading(true);
      try {
        const data = await graphqlClient.query(QUERIES.GET_ALL_CLIENTS);
        const list = data?.allClients || [];
        setClients(list);
        setFilteredClients(list);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setClients([]);
        setFilteredClients([]);
      }
      setIsLoading(false);
    }
    if (isOpen) {
      setQuery("");
      setShowFilters(false); // Reset filter visibility when modal opens
      loadClients();
    }
  }, [isOpen]);

  // Filtrar clientes basado en la búsqueda de texto
  const filtered = filteredClients.filter((c) => {
    const fullName = `${c.FirstName} ${c.LastName || ""}`.toLowerCase();
    const docNumber = (c.DocNumber || "").toLowerCase();
    const searchTerm = query.toLowerCase();

    return fullName.includes(searchTerm) || docNumber.includes(searchTerm);
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className="relative mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-xl font-semibold text-gray-700">
            Buscar Clientes
          </h3>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search bar */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Buscar por nombre o documento..."
          />
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              showFilters
                ? "bg-purple-700 text-white hover:bg-purple-800"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
        </div>

        {/* Filters section */}
        {showFilters && (
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <TableFilters
              modelName="clients"
              data={clients}
              onFilterChange={setFilteredClients}
            />
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Cargando clientes...</span>
          </div>
        )}

        {/* Client list */}
        {!isLoading && (
          <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documento
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtered.length > 0 ? (
                  filtered.map((client) => (
                    <tr key={client.ClientID} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {client.ClientID}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {client.FirstName} {client.LastName}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {client.DocNumber || "-"}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {client.Phone || "-"}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {client.Email || "-"}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => onClientSelect(client)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          Seleccionar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      {query || showFilters
                        ? "No se encontraron clientes con los criterios especificados"
                        : "No hay clientes disponibles"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer with results count */}
        {!isLoading && filtered.length > 0 && (
          <div className="text-sm text-gray-600 text-center">
            Mostrando {filtered.length} de {clients.length} clientes
          </div>
        )}
      </div>
    </div>
  );
}
