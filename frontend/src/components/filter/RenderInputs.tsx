import { useMemo } from "react";
import useFilterState from "./hooks/useFilterState";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { InputRadio } from "./inputs/Radio";
import { InputSelect } from "./inputs/Select";
import { InputTextOperators } from "./inputs/Text";

import type { FilterField, RenderInputsBaseProps } from "./types";

export type RenderInputProps = Omit<RenderInputsBaseProps, "name"> & {
  filterField?: FilterField;
  dependsOnLabel?: string | null;
};

/**
 * Main input renderer that handles different field types
 * - Automatically selects the correct input component based on field type
 * - Integrates with global filter state
 * - Handles dependent field labels and disabled states
 */
export function RenderInput({ 
  filterField, 
  dependsOnLabel, 
  onChange, 
  ...props 
}: RenderInputProps) {
  const { filters, setFilter } = useFilterState<string>();

  if (!filterField) return null;

  const handleChange = useMemo(() => 
    (name: string, value: string) => {
      onChange?.(name, value);
      setFilter(name, value);
    },
    [onChange, setFilter]
  );

  const isDependentAndDisabled = useMemo(() => 
    !!(filterField.dependsOn && !filters[filterField.dependsOn]),
    [filterField.dependsOn, filters]
  );

  return (
    <div>
      <Label className="mb-3">
        {filterField.label}
        {filterField.dependsOn && dependsOnLabel && (
          <span className="text-xs text-muted-foreground ml-1">
            (depende de {dependsOnLabel})
          </span>
        )}
      </Label>
      <InputType
        id={filterField.field}
        name={filterField.field}
        onChange={handleChange}
        disabled={isDependentAndDisabled}
        filterField={filterField}
        {...props}
      />
    </div>
  );
}

export type InputTypeProps = RenderInputsBaseProps & {
  filterField?: FilterField;
  label?: string;
};

/**
 * Input type selector - routes to the correct input component
 */
export function InputType({ filterField, ...props }: InputTypeProps) {
  if (!filterField) return null;

  switch (filterField.type) {
    case "number":
      return (
        <Input
          {...props}
          placeholder={`Buscar por ${(props?.label || props.name).toLowerCase()}...`}
          type="number"
          onChange={(e) => props.onChange?.(props.name, e.target.value)}
        />
      );

    case "boolean":
      return <InputRadio {...props} />;

    case "select":
      return <InputSelect {...props} filterField={filterField} />;

    case "text":
    default:
      return <InputTextOperators {...props} filterField={filterField} />;
  }
}
