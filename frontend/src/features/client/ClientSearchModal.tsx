// frontend/src/features/client/ClientSearchModal.tsx
import { useState } from "react";
import { X } from "lucide-react";
import TableFilters from "~/components/TableFilters";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useGetAllClientsQuery, type ClientsInDb } from "~/graphql/_generated/graphql";

interface ClientSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientSelect: (client: ClientsInDb) => void;
}

export default function ClientSearchModal({ 
  isOpen, 
  onClose, 
  onClientSelect 
}: ClientSearchModalProps) {
  const [filteredClients, setFilteredClients] = useState<ClientsInDb[]>([]);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data, loading } = useGetAllClientsQuery({
    skip: !isOpen,
    onCompleted: (data) => {
      setFilteredClients(data?.allClients as ClientsInDb[] || []);
    },
  });

  const clients = data?.allClients || [];

  // Filter clients based on text search
  const filtered = filteredClients.filter((c) => {
    const fullName = `${c.FirstName} ${c.LastName || ""}`.toLowerCase();
    const docNumber = (c.DocNumber || "").toLowerCase();
    const searchTerm = query.toLowerCase();

    return fullName.includes(searchTerm) || docNumber.includes(searchTerm);
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className="relative mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-background space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-xl font-semibold text-foreground">
            Buscar Clientes
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:text-foreground rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search bar */}
        <div className="flex space-x-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            placeholder="Buscar por nombre o documento..."
          />
          <Button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? "default" : "secondary"}
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </Button>
        </div>

        {/* Filters section */}
        {showFilters && (
          <div className="border rounded-md p-4">
            <TableFilters
              modelName="clients"
              data={clients}
              onFilterChange={(filtered: ClientsInDb[]) => setFilteredClients(filtered)}
            />
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted-foreground">Cargando clientes...</span>
          </div>
        )}

        {/* Client list */}
        {!loading && (
          <div className="max-h-96 overflow-y-auto border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-muted sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Documento
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-gray-200">
                {filtered.length > 0 ? (
                  filtered.map((client) => (
                    <tr key={client.ClientID} className="hover:bg-muted/50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-foreground">
                        {client.ClientID}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-foreground">
                        {client.FirstName} {client.LastName}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">
                        {client.DocNumber || "-"}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">
                        {client.Phone || "-"}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">
                        {client.Email || "-"}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                        <Button
                          onClick={() => onClientSelect(client)}
                          size="sm"
                          variant="default"
                        >
                          Seleccionar
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-muted-foreground"
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
        {!loading && filtered.length > 0 && (
          <div className="text-sm text-muted-foreground text-center">
            Mostrando {filtered.length} de {clients.length} clientes
          </div>
        )}
      </div>
    </div>
  );
}
