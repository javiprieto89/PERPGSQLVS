import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { cn } from "~/lib/utils";
import { RenderInputsBaseProps } from "../types";

export default function FileTypeBoolean({ id, name, value = "", onChange, className }: RenderInputsBaseProps) {
  return (
    <RadioGroup
      id={id}
      name={name}
      className={cn("flex flex-row gap-4", className)}
      defaultValue={value}
      onValueChange={(value) => onChange(name, value)}
    >
      <div className="flex flex-row gap-2 items-center">
        <RadioGroupItem value="true" id="yes" />
        <Label htmlFor="yes">Si</Label>
      </div>
      <div className="flex flex-row gap-2  items-center">
        <RadioGroupItem value="false" id="no" />
        <Label htmlFor="no">No</Label>
      </div>
      <div className="flex flex-row gap-2  items-center">
        <RadioGroupItem value="" id="all" />
        <Label htmlFor="all">Todo</Label>
      </div>
    </RadioGroup>
  );
}