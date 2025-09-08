import { forwardRef } from "react";

import { Input as InputBase } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ErrorMessage, type InputErrorMessage } from "./ErrorMessage";
// import { Label } from "./Label";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: InputErrorMessage;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, labelProps, id, name, error, ...rest }, ref) => {

    return (
      <>
        {label && <Label htmlFor={id || name} {...labelProps}>{label}</Label>}
        <InputBase ref={ref} id={id} name={name} {...rest} />
        <ErrorMessage name={name} error={error} />
      </>
    )
  }
)
