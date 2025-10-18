import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import useDebounce from "~/hooks/useDebounce";

/**
 * Global filter state atom
 * Stores all active filters as key-value pairs
 */
const filterAtom = atom<Record<string, unknown>>({});

/**
 * Hook for managing global filter state with debouncing
 * 
 * Features:
 * - Global state using Jotai
 * - Debounced updates (500ms) to avoid excessive re-renders
 * - Type-safe filter operations
 * - Automatic cleanup of empty values
 * 
 * @template T - Type of filter values (defaults to string)
 */
export default function useFilterState<T = string>() {
  const [filters, setFilters] = useAtom(filterAtom);
  const { setDebounce } = useDebounce();

  /**
   * Set or update a filter value with debouncing
   * Empty values are automatically removed
   */
  const setFilter = useCallback((key: string, value: T) => {
    setDebounce(() => {
      setFilters((prev: Record<string, unknown>) => {
        // Remove filter if value is empty
        if (value === "" || value === null || value === undefined) {
          const { [key]: _, ...rest } = prev;
          return rest;
        }
        
        return { ...prev, [key]: value };
      });
    }, 500);
  }, [setDebounce, setFilters]);

  /**
   * Remove a specific filter by key
   * Also removes associated operator key if exists (e.g., "field_op")
   */
  const removeFilter = useCallback((key: string) => {
    setFilters((prev: Record<string, unknown>) => {
      const { [key]: _, [`${key}_op`]: __, ...rest } = prev;
      return rest;
    });
  }, [setFilters]);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({});
  }, [setFilters]);

  /**
   * Set multiple filters at once (useful for bulk operations)
   */
  const setFiltersMultiple = useCallback((newFilters: Record<string, T>) => {
    setFilters((prev: Record<string, unknown>) => ({ ...prev, ...newFilters }));
  }, [setFilters]);

  /**
   * Get a specific filter value
   */
  const getFilter = useCallback((key: string): T | undefined => {
    return filters[key] as T | undefined;
  }, [filters]);

  return {
    filters: filters as Record<string, T>,
    setFilter,
    removeFilter,
    clearFilters,
    setFiltersMultiple,
    getFilter,
  };
}


