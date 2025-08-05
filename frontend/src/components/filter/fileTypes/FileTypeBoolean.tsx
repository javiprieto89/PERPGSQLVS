import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { cn } from "~/lib/utils";

type FileTypeBooleanProps = {
  id: string;
  name: string;
  value: string;
  operator?: string;
  disabled?: boolean;
  onChange: (name: string, value: string) => void;
  className?: string;
}

export default function FileTypeBoolean({ id, name, value = "", onChange, className }: FileTypeBooleanProps) {
  return (
    <>
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
    </>
  );
}