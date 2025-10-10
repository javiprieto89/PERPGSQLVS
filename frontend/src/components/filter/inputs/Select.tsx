import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import type { GetRelationsQuery } from "~/graphql/_generated/graphql";
import { cn } from "~/lib/utils";
import { type ModelNameMap } from "../constants";
import { useAdvancedFilter } from "../hooks/useAdvancedFilter";
// import useFilterState from "../hooks/useFilterState";
import type { FilterField, RenderInputsBaseProps } from "../types";
import { getNameField } from "../utils";

type FilterTypeSelectProps = RenderInputsBaseProps & {
  filterField: FilterField;
}

export function InputSelect({ name, value, placeholder, onChange, disabled, className, filterField }: FilterTypeSelectProps) {
  const { loading, relationData } = useAdvancedFilter();
  console.log("ENTRO", { relationData, relationModel: filterField.relationModel });
  if (!relationData || !filterField.relationModel) return;

  const options: GetRelationsQuery[keyof GetRelationsQuery] = relationData[filterField.relationModel as keyof GetRelationsQuery] ?? [];

  console.log("options", options)

  return (
    <>
      <Select
        name={name}
        value={value}
        onValueChange={(value) => onChange?.(name, value)}
        disabled={loading || disabled}
      >
        <SelectTrigger className={cn("w-full", className)}>
          <SelectValue placeholder={loading ? "Cargando..." : placeholder || filterField?.label} />
        </SelectTrigger>
        <SelectContent>
          {options?.length > 0 && options.map((option) => {
            // Manejar diferentes tipos de modelos
            // let displayName;
            // if (filterField?.relationModel === "Client") {
            //   displayName = formatClientName(option);
            // } else {
            //   const nameField = filterField?.relationModel ? nameFieldMap[filterField?.relationModel as NameFieldMap] : "Name";
            //   displayName =
            //     filterField.Name || `${filterField?.relationModel} ${id}`;
            // }
            const nameField = getNameField(filterField?.relationModel as ModelNameMap);
            const label = option[nameField];
            return (
              <SelectItem key={label} value={label}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
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