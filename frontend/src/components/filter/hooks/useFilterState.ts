import { atom, useAtom } from "jotai";

import useDebounce from "~/hooks/useDebounce";

// Átomo global de filtros basado en Map
const filterAtom = atom({});

export default function useFilterState<T>() {
  const [filters, setFilters] = useAtom<Record<string, T>>(filterAtom);
  const { setDebounce } = useDebounce();

  // Agrega o actualiza un filtro
  function setFilter(key: string, value: T) {
    setDebounce(() => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }, 500);
  }

  // Elimina un filtro por clave
  function removeFilter(key: string) {
    setFilters((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  }

  // Limpia todos los filtros
  function clearFilters() {
    setFilters({});
  }

  return {
    filters,
    setFilter,
    removeFilter,
    clearFilters,
  };
}
