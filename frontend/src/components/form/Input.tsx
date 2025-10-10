import React, { forwardRef } from "react";

import { Input as InputBase } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ErrorMessage, type FieldError } from "./ErrorMessage";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, labelProps, error, ...props }, ref) => {

    return (
      <>
        {label && <Label data-error={!!error} htmlFor={props.id || props.name}
          className="data-[error=true]:text-destructive"
          {...labelProps}>{label}</Label>}
        <InputBase id={props.id || props.name} ref={ref} {...props} />
        <ErrorMessage error={error} />
      </>
    )
  }
)
