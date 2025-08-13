
import FileTypeBoolean from "./fileTypes/FileTypeBoolean";
import FilterTypeSelect from "./fileTypes/FilterTypeSelec";
import FilterTypeText from "./fileTypes/FilterTypeText";

import { Input } from "~/components/ui/input";
import { RenderInputsBaseProps } from "./types";

export default function RenderInputs({ filterField, ...props }: RenderInputsBaseProps) {

  switch (filterField?.type) {
    case "number":
      return (
        <Input {...props}
          // defaultValue={props.value}
          placeholder={`Buscar por ${(props?.label || props.name).toLowerCase()}...`}
          type="number"
          onChange={(e) => props.onChange(props.name, e.target.value)}
        />
      );

    case "boolean":
      return <FileTypeBoolean {...props} />;

    case "select":
      return <FilterTypeSelect filterField={filterField} {...props} />;

    default: // text
      return <FilterTypeText {...props} />
  }
}