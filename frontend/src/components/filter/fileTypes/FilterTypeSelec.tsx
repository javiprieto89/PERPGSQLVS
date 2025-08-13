import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { useFilterOptionsLoader } from "../hooks/useFilterOptionsLoader";
import { RenderInputsBaseProps } from "../types";
import { getNameField } from "../utils";

export default function FilterTypeSelect({ name, value, label, placeholder, onChange, disabled, className, filterField }: RenderInputsBaseProps) {
  const { options, loading } = useFilterOptionsLoader(filterField);
  return (
    <>
      {label && <Label>{label}</Label>}
      <Select
        name={name}
        value={value}
        onValueChange={(value) => onChange(name, value)}
        disabled={disabled}
      >
        <SelectTrigger className={cn("w-[180px]", className)}>
          <SelectValue placeholder={loading ? "Cargando..." : placeholder || "Todo"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            console.log("FilterTypeSelect option", option)
            // Manejar diferentes tipos de modelos

            // let displayName;
            // if (filterField?.relationModel === "Client") {
            //   displayName = formatClientName(option);
            // } else {
            //   const nameField = filterField?.relationModel ? nameFieldMap[filterField?.relationModel as NameFieldMap] : "Name";
            //   displayName =
            //     filterField.Name || `${filterField?.relationModel} ${id}`;
            // }

            const nameField = getNameField(filterField?.relationModel);
            console.log({ option, nameField });
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
