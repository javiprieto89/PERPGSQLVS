import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { TEXT_OPERATORS } from "../constants";
import useFilterState from "../hooks/useFilterState";
import type { FilterField, RenderInputsBaseProps } from "../types";

export function InputTextOperators({ className, name, value, onChange, filterField, ...props }: RenderInputsBaseProps & {
  filterField?: FilterField;
}) {
  const { filters } = useFilterState<string>()

  const keys = Object.keys(TEXT_OPERATORS);
  const operatorValue = filters[`${filterField?.field}_op`] ?? keys[0];

  if (!filterField) return;

  return (
    <>
      <div className={cn('flex gap-2 justify-between', className)}>
        <Select
          name={`${name}_op`}
          defaultValue={operatorValue}
          onValueChange={(value) => {
            onChange?.(`${name}_op`, value)
          }}
        >
          <SelectTrigger className="w-[25ch]">
            <SelectValue placeholder="Seleccione..." />
          </SelectTrigger>
          <SelectContent>
            {keys.map((key) => (
              <SelectItem key={key} value={key}>
                {TEXT_OPERATORS[key as keyof typeof TEXT_OPERATORS]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name={name}
          value={value}
          onChange={(e) => onChange?.(name, e.target.value)}
          placeholder={`Buscar por ${(filterField?.label || name).toLowerCase()}...`}
          {...props}
        />
      </div>
    </>
  );
}