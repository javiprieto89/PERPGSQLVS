import { BrushCleaning, CircleX, X } from "lucide-react";
import { useEffect } from "react";
// import { useGetFilterFieldsQuery } from "~/graphql/_generated/graphql";
import { data as filterData } from "~/graphql/mockups/getFilterFields.json";

import { TEXT_OPERATORS } from "./constants";
import { FilterField } from "./types";

import useFilterState from "./hooks/useFilterState";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

import { Alert, AlertDescription } from "../ui/alert";
import RenderInputs from "./RenderInputs";

const filterValues = (filters: Record<string, string>) => (Object.keys(filters).filter((key) => !key.endsWith('_op') && filters[key] !== '' && filters[key] !== null));
const findFilterByField = (filters: Record<string, any>[], field: string) => filters.find(f => f.field === field);

type AdvancedFilterProps = {
  modelName: string;
  data?: FilterField[];
  onFilterChange: (value: FilterField[]) => void
}

export default function AdvancedFilter({ modelName, data, onFilterChange }: AdvancedFilterProps) {
  console.log({ modelName, data, onFilterChange })

  // 1. Cargar definición de filtros del backend
  // const {
  //   data: filterData,
  //   loading,
  //   error,
  // } = useGetFilterFieldsQuery({
  //   variables: {
  //     model: modelName,
  //   },
  // });

  const loading = false;
  const error: Error | null = null;


  // TODO cuando graphql vuelva a funcionar utilizamos este hook
  // const { queryModel } = useModelLoader();

  // 2. Cargar opciones para campos de tipo select
  useEffect(() => {
    if (filterData?.filterFields) {
      return;
    }
  }, [filterData?.filterFields])

  const { filters, setFilter, removeFilter, clearFilters } = useFilterState<string>()

  return (
    <div className="rounded-lg border ">
      <div className="px-4 py-3 border-b ">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium ">
            Filtros <span className="text-primary">{`- ${modelName}`}</span>
          </h3>
          <Button size="sm" onClick={clearFilters}>
            <BrushCleaning />
            Limpiar
          </Button>
        </div>
      </div>
      <div className="p-4">
        {error && (
          <Alert variant="default">
            <CircleX />
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </div>
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2"></div>
            <span className="ml-2 ">Cargando filtros...</span>
          </div>
        ) : error || filterData?.filterFields.length === 0 ? (
          <div className="text-center py-8 ">
            No hay filtros disponibles para este modelo
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filterData?.filterFields.map((field, index) => (
              <div key={`${field.field}-${index}`}>
                <Label className="mb-2">
                  {field.label}
                  {field.dependsOn && (
                    <span className="text-xs  ml-1">
                      (depende de{" "}
                      {
                        filterData.filterFields.find((f) => f.field === field.dependsOn)
                          ?.label
                      }
                      )
                    </span>
                  )}
                </Label>
                <RenderInputs
                  id={field.field}
                  name={field.field}
                  value={filters[field.field] || ""}
                  operator={filters[`${field.field}_op`] || "contains"}
                  onChange={setFilter}
                  disabled={field.dependsOn ? !filters[field.dependsOn] : false}
                  filterField={field as FilterField}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t ">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium  mr-2">Filtros activos:</span>
          {filterValues(filters).map((key) => {
            const operator = `${key}_op`;
            const filterFields = filterData?.filterFields ? findFilterByField(filterData.filterFields, key) : null;
            const filterField = filterFields ? filterFields.label : key;

            return (
              <Badge key={`badge-${key}`}>
                {filterField}: {TEXT_OPERATORS[filters[operator] as keyof typeof TEXT_OPERATORS]} {filters[key]}
                <button onClick={() => removeFilter(key)}>
                  <X size="16" />
                </button>
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  )
}