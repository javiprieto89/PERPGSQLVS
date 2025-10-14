import { Check } from "lucide-react";
import React, { forwardRef } from "react";

import { cn } from "~/lib/utils";
import { ErrorMessage, type FieldError } from "./ErrorMessage";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void;
}

export type InputCheckboxProps = CheckboxProps & {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: FieldError;
}

const CheckboxBase = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, onChange, id, name, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const checkboxId = id || name || React.useId();

    // Combined ref callback
    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;

      // Call callbacks
      onCheckedChange?.(newChecked);
      onChange?.(event);
    };

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          ref={setRefs}
          onChange={handleChange}
          className="sr-only peer"
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className={cn(
            "h-4 w-4 shrink-0 rounded-sm border border-primary shadow",
            "peer-focus-visible:outline-none peer-focus-visible:ring-1 peer-focus-visible:ring-ring",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            "peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary",
            "flex items-center justify-center transition-colors",
            "cursor-pointer relative",
            className
          )}
        />
        <Check className="h-4 w-4 absolute pointer-events-none opacity-0 peer-checked:opacity-100 peer-checked:text-primary-foreground transition-opacity" />
      </div>
    )
  }
)

CheckboxBase.displayName = "CheckboxBase"

export const Checkbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
  ({ label, labelProps, error, id, name, ...props }, ref) => {
    const checkboxId = id || name || React.useId();

    return (
      <>
        <label
          data-error={!!error}
          htmlFor={checkboxId}
          className={cn(
            "flex items-center gap-2 text-sm leading-none font-medium select-none cursor-pointer",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            labelProps?.className
          )}
          {...labelProps}
        >
          <CheckboxBase
            id={checkboxId}
            name={name}
            {...props}
            ref={ref}
          />
          {label && <span>{label}</span>}
        </label>
        <ErrorMessage error={error} />
      </>
    )
  }
);

Checkbox.displayName = "Checkbox";
