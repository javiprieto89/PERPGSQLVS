import { Input } from "~/components/ui/input";
import { type GetFilterFieldsQuery } from "~/graphql/_generated/graphql";

import { nameFieldMap } from "./constants";
import FileTypeBoolean from "./fileTypes/FileTypeBoolean";
import FilterTypeSelect from "./fileTypes/FilterTypeSelec";
import FilterTypeText from "./fileTypes/FilterTypeText";

type BaseProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  operator?: string;
  disabled?: boolean;
  onChange: (name: string, value: string) => void;
  relationModel: keyof typeof nameFieldMap;
  className?: string;
};

type TextFieldProps = BaseProps & {
  type: "text" | "number";
};

type BooleanFieldProps = BaseProps & {
  type: "boolean";
};

type SelectFieldProps = BaseProps & {
  type: "select";
  options: Record<string, GetFilterFieldsQuery['filterFields']>[];
};

export type FilterFieldProps = TextFieldProps | BooleanFieldProps | SelectFieldProps;

export default function RenderInputs(props: FilterFieldProps) {
  const { className, name, value, type, label, operator, onChange, disabled = false, relationModel } = props;

  if (type === "text")
    return (
      <FilterTypeText
        className={className}
        name={name}
        value={value}
        operator={operator}
        label={label}
        onChange={onChange}
        disabled={disabled} />
    );

  if (type === "number")
    return (
      <Input
        className={className}
        name={name}
        type="number"
        defaultValue={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={`Buscar por ${label.toLowerCase()}...`}
      />
    );

  if (type === "boolean")
    return (
      <FileTypeBoolean
        className={className}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    );

  if (type === "select")
    return (
      <FilterTypeSelect
        className={className}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        relationModel={relationModel}
        options={props.options[0]}
      />
    );
  return null;

}