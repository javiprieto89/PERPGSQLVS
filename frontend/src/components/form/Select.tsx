import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "~/lib/utils";

import { Label } from "~/components/ui/label";
import { ErrorMessage, type InputErrorMessage } from "./ErrorMessage";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: InputErrorMessage;
  defaultValue?: string | undefined
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, labelProps, id, name, error, className, ...rest }, ref) => {
  return (
    <>
      {label && <Label htmlFor={id || name} {...labelProps}>{label}</Label>}
      <div className="relative">
        <select
          ref={ref}
          id={id || name}
          name={name}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm appearance-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...rest}
        />
        <ChevronDown className={cn("absolute top-1/2 right-[1rem] -translate-y-1/2")} />
      </div>
      <ErrorMessage name={name} error={error} />
    </>
  )
})
