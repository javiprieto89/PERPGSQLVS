// frontend/src/features/role/RoleSearchModal.tsx
import { useState } from "react";
import { X } from "lucide-react";
import TableFilters from "~/components/TableFilters";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useGetAllRolesQuery, type RolesInDb } from "~/graphql/_generated/graphql";

interface RoleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (role: RolesInDb) => void;
}

export default function RoleSearchModal({ 
  isOpen, 
  onClose, 
  onSelect 
}: RoleSearchModalProps) {
  const [filtered, setFiltered] = useState<RolesInDb[]>([]);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data, loading } = useGetAllRolesQuery({
    skip: !isOpen,
    onCompleted: (data) => {
      setFiltered(data?.allRoles as RolesInDb[] || []);
    },
  });

  const roles = data?.allRoles || [];

  const list = filtered.filter((r) =>
    (r.RoleName || "").toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className="relative mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md space-y-4 bg-background">
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-xl font-semibold text-foreground">
            Buscar Rol
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:text-foreground rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex space-x-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            placeholder="Nombre..."
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
              modelName="roles"
              data={roles}
              onFilterChange={(filtered: RolesInDb[]) => setFiltered(filtered)}
            />
          </div>
        )}
        {loading ? (
          <div className="flex justify-center py-8">Cargando...</div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-muted sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {list.length > 0 ? (
                  list.map((r) => (
                    <tr
                      key={r.RoleID}
                      className="hover:bg-muted/50"
                      onDoubleClick={() => {
                        onSelect(r);
                        onClose();
                      }}
                    >
                      <td className="px-4 py-2">{r.RoleID}</td>
                      <td className="px-4 py-2">{r.RoleName}</td>
                      <td className="px-4 py-2">
                        <Button
                          onClick={() => {
                            onSelect(r);
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
                      colSpan={3}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      No se encontraron roles
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
