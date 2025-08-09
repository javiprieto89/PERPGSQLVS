import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { TEXT_OPERATORS } from "../constants";
import { RenderInputsBaseProps } from "../types";

export default function FilterTypeText({ className, name, value, operator, label, onChange }: RenderInputsBaseProps) {
  return (
    <>
      <Label>{label}</Label>
      <div className={cn('flex gap-2 justify-between', className)}>
        <Select
          name={`${name}_op`}
          value={operator}
          onValueChange={(value) => onChange(`${name}_op`, value)}
        >
          <SelectTrigger className="w-[25ch]">
            <SelectValue placeholder="Seleccione..." />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(TEXT_OPERATORS).map((key) => (
              <SelectItem key={key} value={key}>
                {TEXT_OPERATORS[key as keyof typeof TEXT_OPERATORS]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name={name}
          type="text"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={`Buscar por ${(label || name).toLowerCase()}...`}
        />
      </div>
    </>
  );
}