import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { NameFieldMap, nameFieldMap } from "../constants";
import { useFilterOptionsLoader } from "../hooks/useFilterOptionsLoader";
import { RenderInputsBaseProps } from "../types";
import { formatClientName } from "../utils";

export default function FilterTypeSelect({ name, value, label, placeholder, onChange, disabled, className, filterField }: RenderInputsBaseProps) {

  console.log("FilterTypeSelect", { name, value, placeholder, onChange, disabled, className, filterField });
  // TODO hardcode options
  // options: Record<string, any[]>
  // const options: Record<string, any>[] = [{}];
  const { options } = useFilterOptionsLoader(filterField);
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
          <SelectValue placeholder={placeholder || "Todo"} />
        </SelectTrigger>
        <SelectContent>
          {options.length > 0 && options.map((opt) => {
            // Manejar diferentes tipos de modelos
            const id = opt[`${filterField?.relationModel}ID`];
            let displayName;

            if (filterField?.relationModel === "Client") {
              displayName = formatClientName(opt);
            } else {
              const nameField = filterField?.relationModel ? nameFieldMap[filterField?.relationModel as NameFieldMap] : "Name";
              displayName =
                opt[nameField] || `${filterField?.relationModel} ${id}`;
            }

            return (
              <SelectItem key={id} value={id}>
                {displayName}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
