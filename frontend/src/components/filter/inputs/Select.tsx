import { useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { cn } from "~/lib/utils";
import { type ModelNameMap } from "../constants";
import useFilterState from "../hooks/useFilterState";
import { useFilterOptionsLoader } from "../hooks/useFilterOptionsLoader";
import type { FilterField, RenderInputsBaseProps } from "../types";
import { formatClientName, getNameField } from "../utils";

type FilterTypeSelectProps = RenderInputsBaseProps & {
  filterField: FilterField;
}

/**
 * Intelligent Select input that automatically loads options based on filterField configuration.
 * 
 * Features:
 * - Automatic option loading via useFilterOptionsLoader
 * - Support for dependent fields (loads when parent value changes)
 * - Proper display name formatting (handles Client names, etc.)
 * - Loading states and error handling
 */
export function InputSelect({ name, value, placeholder, onChange, disabled, className, filterField }: FilterTypeSelectProps) {
  const { filters } = useFilterState<string>();

  // Get parent value for dependent fields
  const parentValue = useMemo(() => {
    if (!filterField?.dependsOn) return undefined;
    return filters[filterField.dependsOn];
  }, [filterField?.dependsOn, filters]);

  // Load options dynamically
  const { loading, options, error } = useFilterOptionsLoader<Record<string, unknown>>(
    filterField,
    parentValue
  );

  // Memoize formatted options for performance
  const formattedOptions = useMemo(() => {
    if (!filterField?.relationModel || !options?.length) return [];

    return options.map((option) => {
      const idField = `${filterField.relationModel}ID`;
      const id = option[idField] as string | number;

      let displayName: string;
      
      // Special handling for Client model
      if (filterField.relationModel === "Client") {
        displayName = formatClientName(option as Record<string, string>);
      } else {
        const nameField = getNameField(filterField.relationModel as ModelNameMap);
        displayName = (option[nameField] as string) || `${filterField.relationModel} ${id}`;
      }

      return {
        id,
        label: displayName,
        value: String(id),
      };
    });
  }, [filterField?.relationModel, options]);

  if (!filterField?.relationModel) {
    console.warn(`InputSelect: No relationModel defined for field ${name}`);
    return null;
  }

  if (error) {
    console.error(`InputSelect: Error loading options for ${name}:`, error);
  }

  const isDisabled = loading || !!disabled || (!!filterField.dependsOn && !parentValue);

  return (
    <Select
      name={name}
      value={value}
      onValueChange={(value) => onChange?.(name, value)}
      disabled={isDisabled}
    >
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue 
          placeholder={
            loading ? "Cargando..." :
            filterField.dependsOn && !parentValue ? "Seleccione primero el campo padre" :
            placeholder || filterField.label
          } 
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Todos</SelectItem>
        {formattedOptions.map((option) => (
          <SelectItem key={option.id} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// export function DependantSelect({ name, value, placeholder, onChange, disabled, className, filterField }: FilterTypeSelectProps) {
//   // - veriricar si es dependiente
//   // - si es dependiente entonces no trae datos aún
//   // - si es dependiente pero el padre no trae datos entonces no cargo datos
//   // - si es independiente traigo datos
//   // - si el padre tiene el value entonces hago el lazy query

//   const { filters } = useFilterState<string>()
//   const operatorValue = filters[`${filterField?.field}_op`] ?? undefined;
//   console.log("operatorValue", operatorValue);

//   const { loading, relationData } = useAdvancedFilter();
//   if (!relationData || !filterField.relationModel) return;

//   const options: Record<string, string>[] = relationData[filterField.relationModel] || [];

//   return (
//     <Select
//       name={name}
//       value={value}
//       onValueChange={(value) => onChange?.(name, value)}
//       disabled={loading || disabled}
//     >
//       <SelectTrigger className={cn("w-full", className)}>
//         <SelectValue placeholder={loading ? "Cargando..." : placeholder || filterField?.label} />
//       </SelectTrigger>
//       <SelectContent>
//         {options?.length > 0 && options.map((option) => {
//           // Manejar diferentes tipos de modelos
//           // let displayName;
//           // if (filterField?.relationModel === "Client") {
//           //   displayName = formatClientName(option);
//           // } else {
//           //   const nameField = filterField?.relationModel ? nameFieldMap[filterField?.relationModel as NameFieldMap] : "Name";
//           //   displayName =
//           //     filterField.Name || `${filterField?.relationModel} ${id}`;
//           // }
//           const nameField = getNameField(filterField?.relationModel as ModelNameMap);
//           const label = option[nameField];
//           return (
//             <SelectItem key={label} value={label}>
//               {label}
//             </SelectItem>
//           );
//         })}
//       </SelectContent>
//     </Select>
//   );
// }

// export function FilterTypeSelectDependant({ name, value, placeholder, onChange, disabled, className, filterField, operatorValue }: FilterTypeSelectProps) {
//   // const { options, loading } = useFilterOptionsLoader(filterField);
//   // const { loading, relationData, filterData } = useAdvancedFilter();

//   console.log("operatorValue", operatorValue)
//   if (!relationData || !filterField.relationModel) return;
//   const { options, loading } = useFilterOptionsLoader2(filterField.relationModel);
//   const options: Record<string, string>[] = relationData[filterField.relationModel as keyof GetRelationsQuery['Branch']] || [];

//   const [getOptions, { loading, error, data }] = useLazyQuery(query);
// }