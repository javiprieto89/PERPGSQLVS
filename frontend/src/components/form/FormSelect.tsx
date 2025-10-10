import { type FieldValues, type Path, type UseFormReturn } from "react-hook-form";
import { Badge } from "~/components/ui/badge";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

interface FormSelectProps<TFormValues extends FieldValues, TOption extends Record<string, unknown>> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  options?: TOption[];
  loading?: boolean;
  placeholder?: string;
  defaultValue?: string;
  valueKey: keyof TOption;
  labelKey: keyof TOption;
  badgeKey?: keyof TOption;
  onValueChange?: (value: string) => void;
  className?: string;
  required?: boolean;
}

export function FormSelect<TFormValues extends FieldValues, TOption extends Record<string, unknown>>({
  form,
  name,
  label,
  options = [],
  loading = false,
  placeholder = "Seleccione...",
  defaultValue,
  valueKey,
  labelKey,
  badgeKey,
  onValueChange,
  className = "w-full",
  required = false,
}: FormSelectProps<TFormValues, TOption>) {
  const placeholderText = loading ? "Loading..." : options.length === 0 ? "Sin opciones" : placeholder;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mb-2">
            {label}
            {required && "*"}
          </FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onValueChange?.(value);
              }}
              value={field.value || undefined}
              defaultValue={defaultValue}
            >
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholderText} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => {
                    const value = String(option[valueKey]);
                    const labelText = String(option[labelKey]);
                    const badgeText = badgeKey ? option[badgeKey] : null;

                    return (
                      <SelectItem key={`${name}-${value}`} value={value}>
                        {labelText}{" "}
                        {badgeText && <Badge variant="secondary" className="text-xs">{String(badgeText)}</Badge>}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
