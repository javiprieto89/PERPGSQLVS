import { Eye, EyeOff } from "lucide-react";
import React, { forwardRef, useState } from "react";

import { Button } from "~/components/ui/button";
import { Input as InputBase } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ErrorMessage, type FieldError } from "./ErrorMessage";


export type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: FieldError;
  loading?: boolean;
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ label, labelProps, error, loading, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <>
        {label && <Label data-error={!!error} htmlFor={props.id || props.name}
          className="data-[error=true]:text-destructive"
          {...labelProps}>{label}</Label>}
        <div className="relative">
          <InputBase
            id={props.id || props.name}
            ref={ref}
            {...props}
            type={showPassword ? "text" : "password"}
          />
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onBlur={() => setShowPassword(false)}
            className="absolute right-1 top-1 hover:bg-transparent hover:border-color-transparent focus-visible:border-0"
            disabled={loading}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </div>
        {error && <ErrorMessage error={error} />}
      </>
    )
  }
)
