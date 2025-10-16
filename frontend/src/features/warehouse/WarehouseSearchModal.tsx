// frontend/src/features/warehouse/WarehouseSearchModal.tsx
import { X } from "lucide-react";
import { useState } from "react";
import TableFilters from "~/components/TableFilters";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useGetWarehousesQuery, type WarehousesInDb } from "~/graphql/_generated/graphql";

interface WarehouseSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (warehouse: WarehousesInDb) => void;
}

export default function WarehouseSearchModal({
  isOpen,
  onClose,
  onSelect
}: WarehouseSearchModalProps) {
  const [filtered, setFiltered] = useState<WarehousesInDb[]>([]);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data, loading } = useGetWarehousesQuery({
    skip: !isOpen,
    onCompleted: (data) => {
      setFiltered(data?.allWarehouses as WarehousesInDb[] || []);
    },
  });

  const warehouses = data?.allWarehouses || [];

  const list = filtered.filter((w) =>
    (w.WarehouseName || "").toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className="relative mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md space-y-4 bg-background">
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-xl font-semibold text-foreground">
            Buscar Depósito
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
              modelName="warehouses"
              data={warehouses}
              onFilterChange={(filtered: WarehousesInDb[]) => setFiltered(filtered)}
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
                  list.map((w) => (
                    <tr
                      key={w.WarehouseID}
                      className="hover:bg-muted/50"
                      onDoubleClick={() => {
                        onSelect(w);
                        onClose();
                      }}
                    >
                      <td className="px-4 py-2">{w.WarehouseID}</td>
                      <td className="px-4 py-2">{w.WarehouseName}</td>
                      <td className="px-4 py-2">
                        <Button
                          onClick={() => {
                            onSelect(w);
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
                      No se encontraron depósitos
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
