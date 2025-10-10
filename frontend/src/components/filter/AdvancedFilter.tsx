import { BrushCleaning, X } from "lucide-react";
import React from "react";
// import { useGetFilterFieldsQuery } from "~/graphql/_generated/graphql";

import { TEXT_OPERATORS, type ModelNameMap } from "./constants";
import { type FilterField, type RenderInputsBaseProps } from "./types";

import useFilterState from "./hooks/useFilterState";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";

import type { GetFilterFieldsQuery } from "~/graphql/_generated/graphql";
import { AdvancedFilterProvider } from "./context/AdvancedFilterProvider";
import { useAdvancedFilter } from "./hooks/useAdvancedFilter";
import { RenderInput } from "./RenderInputs";
import { filterOperators } from "./utils";

function SelectedFiltersDisplay({ filterFields }: { filterFields: FilterField[] }) {
  const { filters, removeFilter } = useFilterState<string>()

  return (
    <div className="px-4 py-3 border-t ">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium  mr-2">Filtros activos:</span>
        {filterOperators(filters).map((key) => {
          const operator = `${key}_op`;
          const filterField = filterFields.find((f) => f.field === key);
          // const filterFields = key;
          // const filterField = filterFields ? filterFields.label : key;
          // const filterField = key;

          return (
            <Badge key={`badge-${key}`}>
              {filterField?.label || key}: {TEXT_OPERATORS[filters[operator] as keyof typeof TEXT_OPERATORS]} {filters[key]}
              <button onClick={() => removeFilter(key)}>
                <X size="16" />
              </button>
            </Badge>
          );
        })}
      </div>
    </div>
  )
}

function ClearFilterButton() {
  const { clearFilters } = useFilterState<FilterField>()
  return (
    <Button size="sm" onClick={clearFilters}>
      <BrushCleaning />
      Limpiar
    </Button>
  )
}

function renderFilterInputs({ filterData, onChange }: { filterData: GetFilterFieldsQuery | undefined; onChange: RenderInputsBaseProps['onChange'] }) {
  if (!filterData?.filterFields) return;
  const { filterFields } = filterData;

  if (!filterData || filterData?.filterFields.length === 0) return;

  {/* {filterData?.filterFields.map((field, index) => (
    <FilterInput key={`${field.field}-${index}`} {...field}
      dependsOnLabel={filterData.filterFields.find((f) => f.field === field.dependsOn)?.label || undefined}
    />
  ))} */}

  const res: React.ReactNode[] = [];
  for (let i = 0; i < filterFields.length; i++) {
    const field = filterFields[i];

    if (field.relationModel as ModelNameMap) {
      res.push(
        <div key={`${field.field}-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 md:my-4">
          <RenderInput
            filterField={field}
            onChange={(name, value) => {
              console.log("changed", name, value)
              onChange?.(name, value);
            }}
          />
          <RenderInput
            key={`${field.field}-${i}-relation`}
            filterField={filterFields[i + 1]}
            dependsOnLabel={field.label}
            onChange={(name, value) => {
              console.log("changed subcomponent", name, value)
              onChange?.(name, value);
            }}

          />
        </div>
      );
      i++; // saltear el siguiente porque ya lo renderizaste
    } else {
      res.push(
        <div key={`${field.field}-${i}`}>
          <RenderInput
            filterField={field}
            dependsOnLabel={
              filterFields.find((f) => f.field === field.dependsOn)?.label
            }
            onChange={(name, value) => {
              console.log("changed", name, value)
              onChange?.(name, value);
            }}

          />
        </div>
      );
    }
  }

  return res;
}

function Layout({ onChange }: { onChange: RenderInputsBaseProps['onChange'] }) {
  const { filterData, loading, error, modelName } = useAdvancedFilter();

  return (
    <>
      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading message="Cargando filtros..." />}
      {!error && filterData?.filterFields.length === 0 && (
        <div className="rounded-lg border text-center py-8 ">
          No hay filtros disponibles para este modelo
        </div>
      )}
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
            {renderFilterInputs({ filterData, onChange })}
          </div>
        </div>

        {filterData?.filterFields && (
          <SelectedFiltersDisplay filterFields={filterData?.filterFields} />
        )}
      </div>
    </>
  );
}

type AdvancedFilterProps = {
  modelName: string;
  data?: FilterField[];
  onFilterChange: RenderInputsBaseProps['onChange']
}

export default function AdvancedFilter({ modelName, data, onFilterChange }: AdvancedFilterProps) {
  console.log("DATA?", data)
  return (
    <AdvancedFilterProvider modelName={modelName}>
      <Layout onChange={onFilterChange} />
    </AdvancedFilterProvider>
  )
}