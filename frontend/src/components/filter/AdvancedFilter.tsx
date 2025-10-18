import { BrushCleaning, X } from "lucide-react";
import React, { useCallback, useMemo } from "react";

import { TEXT_OPERATORS } from "./constants";
import { type FilterField, type RenderInputsBaseProps } from "./types";

import useFilterState from "./hooks/useFilterState";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";

import { useGetFilterFieldsQuery } from "~/graphql/_generated/graphql";
import { RenderInput } from "./RenderInputs";
import { filterOperators } from "./utils";

/**
 * Display active filters as badges with remove functionality
 */
function SelectedFiltersDisplay({ filterFields }: { filterFields: FilterField[] }) {
  const { filters, removeFilter } = useFilterState<string>();

  const activeFilters = useMemo(() =>
    filterOperators(filters).map((key) => {
      const operator = `${key}_op`;
      const filterField = filterFields.find((f) => f.field === key);
      const operatorLabel = TEXT_OPERATORS[filters[operator] as keyof typeof TEXT_OPERATORS] || "";

      return {
        key,
        label: filterField?.label || key,
        operator: operatorLabel,
        value: filters[key],
      };
    }),
    [filters, filterFields]
  );

  if (activeFilters.length === 0) return null;

  return (
    <div className="px-4 py-3 border-t ">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium  mr-2">Filtros activos:</span>
        {activeFilters.map(({ key, label, operator, value }) => (
          <Badge key={`badge-${key}`}>
            {label}: {operator} {value}
            <button
              onClick={() => removeFilter(key)}
              className="ml-1 hover:opacity-70"
              aria-label={`Remover filtro ${label}`}
            >
              <X size="16" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}

/**
 * Clear all filters button
 */
function ClearFilterButton() {
  const { clearFilters } = useFilterState<FilterField>();

  return (
    <Button size="sm" onClick={clearFilters}>
      <BrushCleaning className="mr-1" size={16} />
      Limpiar
    </Button>
  );
}

/**
 * Render filter inputs intelligently
 * - Groups related fields (parent-child relationships)
 * - Handles independent fields separately
 */
function FilterInputs({
  filterFields,
  onChange
}: {
  filterFields: FilterField[];
  onChange: RenderInputsBaseProps['onChange'];
}) {
  const renderedIndices = new Set<number>();
  const elements: React.ReactNode[] = [];

  filterFields.forEach((field, index) => {
    // Skip if already rendered as part of a group
    if (renderedIndices.has(index)) return;

    // Check if this field has a child that depends on it
    const childIndex = filterFields.findIndex(
      (f, i) => i > index && f.dependsOn === field.field
    );

    if (childIndex !== -1 && field.relationModel) {
      // Render parent-child group together
      const childField = filterFields[childIndex];
      renderedIndices.add(index);
      renderedIndices.add(childIndex);

      elements.push(
        <div
          key={`group-${field.field}-${childField.field}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 md:my-4"
        >
          <RenderInput
            filterField={field}
            onChange={onChange}
          />
          <RenderInput
            filterField={childField}
            dependsOnLabel={field.label}
            onChange={onChange}
          />
        </div>
      );
    } else {
      // Render independent field
      renderedIndices.add(index);
      elements.push(
        <div key={`field-${field.field}`} className="my-4">
          <RenderInput
            filterField={field}
            dependsOnLabel={
              filterFields.find((f) => f.field === field.dependsOn)?.label
            }
            onChange={onChange}
          />
        </div>
      );
    }
  });

  return <>{elements}</>;
}

type AdvancedFilterProps = {
  modelName: string;
  data?: FilterField[];
  onFilterChange: RenderInputsBaseProps['onChange'];
};

/**
 * Advanced Filter Component
 * 
 * Features:
 * - Dynamic filter field loading from backend
 * - Automatic option loading for select fields
 * - Parent-child relationship handling (e.g., Country -> Province)
 * - Active filter display
 * - Debounced filter changes
 * 
 * @param modelName - The model to load filters for (e.g., "Client", "Order")
 * @param onFilterChange - Callback when filter values change
 */
export default function AdvancedFilter({
  modelName,
  onFilterChange
}: AdvancedFilterProps) {
  const {
    data: filterData,
    loading,
    error,
  } = useGetFilterFieldsQuery({
    variables: { model: modelName },
    fetchPolicy: "cache-first", // Use cache for better performance
  });

  const handleFilterChange = useCallback((name: string, value: string) => {
    onFilterChange?.(name, value);
  }, [onFilterChange]);

  const filterFields = useMemo(
    () => filterData?.filterFields || [],
    [filterData?.filterFields]
  );

  if (error) {
    return <ApiErrorMessage error={error} />;
  }

  if (loading) {
    return <AlertLoading message="Cargando filtros..." />;
  }

  if (filterFields.length === 0) {
    return (
      <div className="rounded-lg border text-center py-8 ">
        No hay filtros disponibles para este modelo
      </div>
    );
  }

  console.log("Filter Fields:", filterFields);

  return (
    <div className="rounded-lg border">
      <div className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium ">
            Filtros - <span className="font-bold">{modelName}</span>
          </h3>
          <ClearFilterButton />
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4 space-y-4">
          {/* <FilterInputs
            filterFields={filterFields}
            onChange={handleFilterChange}
          /> */}
        </div>
      </div>

      <SelectedFiltersDisplay filterFields={filterFields} />
    </div>
  );
}
