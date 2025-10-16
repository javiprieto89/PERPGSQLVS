// frontend/src/features/carbrand/CarBrandSearchModal.tsx
import { useState } from "react";
import { X } from "lucide-react";
import TableFilters from "~/components/TableFilters";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useGetAllCarBrandsQuery, type CarBrandsInDb } from "~/graphql/_generated/graphql";

interface CarBrandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBrandSelect: (brand: CarBrandsInDb) => void;
}

export default function CarBrandSearchModal({
  isOpen,
  onClose,
  onBrandSelect,
}: CarBrandSearchModalProps) {
  const [filteredBrands, setFilteredBrands] = useState<CarBrandsInDb[]>([]);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data, loading } = useGetAllCarBrandsQuery({
    skip: !isOpen,
    onCompleted: (data) => {
      setFilteredBrands(data?.allCarBrands as CarBrandsInDb[] || []);
    },
  });

  const brands = data?.allCarBrands || [];

  const filtered = filteredBrands.filter((b) =>
    (b.BrandName || "").toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-background space-y-4">
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-xl font-semibold text-foreground">
            Buscar Marcas
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:text-foreground rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex space-x-2 items-center">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            placeholder="Nombre de marca..."
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
              modelName="carbrands"
              data={brands}
              onFilterChange={(filtered: CarBrandsInDb[]) => setFilteredBrands(filtered)}
            />
          </div>
        )}
        <div className="max-h-80 overflow-y-auto">
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
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-gray-200">
              {filtered.length > 0 ? (
                filtered.map((b) => (
                  <tr
                    key={b.BrandID}
                    className="hover:bg-muted/50"
                    onDoubleClick={() => {
                      onBrandSelect(b);
                      onClose();
                    }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground">
                      {b.BrandID}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground">
                      {b.BrandName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <Button
                        onClick={() => {
                          onBrandSelect(b);
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
                    className="px-4 py-10 text-center text-sm text-muted-foreground"
                  >
                    {loading ? "Cargando..." : "No se encontraron marcas"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pt-3 border-t flex justify-end">
          <Button onClick={onClose} variant="ghost">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
