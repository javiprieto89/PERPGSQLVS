import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { cn } from "~/lib/utils";
import { nameFieldMap } from "../constants";
import { formatClientName } from "../utils";

type FilterFieldsProps = {
  name: string;
  value: string;
  // field: GetFilterFieldsQuery['filterFields'][0];
  relationModel?: keyof typeof nameFieldMap | null;
  disabled: boolean;
  onChange: (name: string, value: string) => void;
  options: Record<string, any[]>
  className?: string;
}

export default function FilterTypeSelect({ name, value, relationModel, onChange, disabled, options, className }: FilterFieldsProps) {
  console.log({ options })
  return (
    <Select
      name={name}
      value={value}
      onValueChange={(value) => onChange(name, value)}
      disabled={disabled}
    >
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder="Todo" />
      </SelectTrigger>
      <SelectContent>
        {options[name] && options[name].map((opt) => {
          // Manejar diferentes tipos de modelos
          const id = opt[`${relationModel}ID`];
          let displayName;

          if (relationModel === "Client") {
            displayName = formatClientName(opt);
          } else {
            const nameField = relationModel ? nameFieldMap[relationModel] : "Name";
            displayName =
              opt[nameField] || `${relationModel} ${id}`;
          }

          return (
            <SelectItem key={id} value={id}>
              {displayName}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
