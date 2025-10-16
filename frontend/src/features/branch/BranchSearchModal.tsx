// frontend/src/components/BranchSearchModal.tsx
import { useEffect, useState } from "react";

import TableFilters from "~/components/TableFilters";
import type { BranchesInDb } from "~/graphql/_generated/graphql";
import { branchOperations } from "~/services/branch.service";

interface BranchSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (branch: BranchesInDb) => void;
  companyID?: string | null;
}

export default function BranchSearchModal({
  isOpen,
  onClose,
  onSelect,
  companyID = null,
}: BranchSearchModalProps) {
  const [branches, setBranches] = useState<BranchesInDb[]>([]);
  const [filtered, setFiltered] = useState<BranchesInDb[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = companyID
          ? await branchOperations.getBranchesByCompany(companyID)
          : await branchOperations.getAllBranches();
        setBranches(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching branches:", err);
        setBranches([]);
        setFiltered([]);
      }
      setLoading(false);
    }
    if (isOpen) {
      setQuery("");
      setShowFilters(false);
      loadData();
    }
  }, [isOpen, companyID]);

  if (!isOpen) return null;

  const getBranchName = (b: BranchesInDb): string => {
    return b.BranchName || "";
  };

  const list = filtered.filter((b) =>
    getBranchName(b).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className="relative mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md space-y-4 bg-background">
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-xl font-semibold text-foreground/80">
            Buscar Sucursal
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:hover:text-foreground rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
        <div className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Nombre..."
          />
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
        </div>
        {showFilters && (
          <div className="border rounded-md p-4">
            <TableFilters
              modelName="branches"
              data={branches}
              onFilterChange={setFiltered}
            />
          </div>
        )}
        {loading ? (
          <div className="flex justify-center py-8">Cargando...</div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {list.length > 0 ? (
                  list.map((b) => (
                    <tr
                      key={b.BranchID}
                      className="hover:"
                      onDoubleClick={() => {
                        onSelect(b);
                        onClose();
                      }}
                    >
                      <td className="px-4 py-2">{b.BranchID}</td>
                      <td className="px-4 py-2">{getBranchName(b)}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => {
                            onSelect(b);
                            onClose();
                          }}
                          className="text-primary hover:underline"
                        >
                          Seleccionar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-8 text-center text-foreground/80"
                    >
                      No se encontraron sucursales
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
