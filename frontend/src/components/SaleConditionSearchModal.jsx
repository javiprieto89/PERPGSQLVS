// frontend/src/components/SaleConditionSearchModal.jsx
import { Funnel, FunnelX, X } from "lucide-react";
import { useState } from "react";
import { useGetAllSaleConditionsQuery } from "~/graphql/_generated/graphql";

import TableFilters from "~/components/TableFilters";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function SaleConditionSearchModal({ onClose, onSelect }) {
  const { data, loading, error } = useGetAllSaleConditionsQuery();
  const saleConditions = data?.allSaleconditions ? data.allSaleconditions : [];
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  // const [filtered, setFiltered] = useState([]);

  const filtered = saleConditions.filter((sc) =>
    (sc.Name || "").toLowerCase().includes(query.toLowerCase())
  );

  console.log({ saleConditions, filtered, error });

  return (
    <div className="bg-background/90 fixed inset-0 h-full w-full z-50 flex justify-center pt-10">
      <div className="bg-card overflow-y-auto absolute p-5 border w-full max-w-xl max-h-[90dvh] shadow-lg rounded-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-xl font-semibold ">Buscar Condición</h3>
          <Button
            onClick={onClose}
            className="hover:rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <X />
          </Button>
        </div>

        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre..."
          />
          <Button type="button" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? (
              <>
                <FunnelX />
                Ocultar Filtros
              </>
            ) : (
              <>
                <Funnel />
                Mostrar Filtros
              </>
            )}
          </Button>
        </div>

        {showFilters && (
          <TableFilters
            modelName="saleconditions"
            data={saleConditions}
            onFilterChange={(value) => {
              console.log("TableFilters onFilterChange", value);
            }}
          />
        )}

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8"></div>
            <span className="ml-2 ">Cargando...</span>
          </div>
        )}

        {!loading && (
          <div className="max-h-80 overflow-y-auto my-4">
            <Table>
              <TableHeader className="sticky">
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="px-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((sc) => (
                    <TableRow key={sc.SaleConditionID}>
                      <TableCell className="px-4 py-2">
                        {sc.SaleConditionID}
                      </TableCell>
                      <TableCell className="px-4 py-2">{sc.Name}</TableCell>
                      <TableCell className="px-4 py-2 text-right">
                        <Button onClick={() => onSelect(sc)}>
                          Seleccionar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="3" className="px-4 py-8 text-center ">
                      {query || showFilters
                        ? "No se encontraron coincidencias"
                        : "No hay datos disponibles"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
