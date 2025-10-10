import useFilterState from "./hooks/useFilterState";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { InputRadio } from "./inputs/Radio";
import { InputSelect } from "./inputs/Select";
import { InputTextOperators } from "./inputs/Text";

import type { FilterField, RenderInputsBaseProps } from "./types";

export type RenderInputProps<T> = Omit<RenderInputsBaseProps, "name"> & {
  filterField: FilterField;
  dependsOnLabel?: string | null;
};

export function RenderInput<T>({ filterField, dependsOnLabel, onChange, ...props }: RenderInputProps<T>) {
  const { filters, setFilter } = useFilterState<string>()

  return (
    <div>
      <Label className="mb-3">
        {filterField.label}
        {filterField.dependsOn && (
          <span className="text-xs  ml-1">
            (depende de{" "}{dependsOnLabel})
          </span>
        )}
      </Label>
      <InputType
        id={filterField.field}
        name={filterField.field}
        onChange={(name, value) => {
          onChange?.(name, value);
          setFilter(name, value)
        }}
        disabled={filterField.dependsOn ? !filters[filterField.dependsOn] : false}
        filterField={filterField}
        {...props}
      />
    </div>
  )
}


export type InputTypeProps = RenderInputsBaseProps & {
  filterField?: FilterField;
  label?: string;
};


export function InputType({ filterField, ...props }: InputTypeProps) {
  switch (filterField?.type) {
    case "number":
      return (
        <Input {...props}
          placeholder={`Buscar por ${(props?.label || props.name).toLowerCase()}...`}
          type="number"
          onChange={(e) => props.onChange?.(props.name, e.target.value)}
        />
      );

    case "boolean":
      return <InputRadio {...props} />;

    case "select":
      return <InputSelect {...props} filterField={filterField} />;

    default: // text
      return <InputTextOperators {...props} filterField={filterField} />
  }
}