import { forwardRef } from 'react';
import { Label } from "~/components/ui/label";

import { cn } from '~/lib/utils';
import { ErrorMessage, type FieldError } from './ErrorMessage';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: FieldError;
  onUpdate?: (value: string) => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, labelProps, id, name, error, className, onChange, onUpdate, ...rest }, ref) => {

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onUpdate?.(event?.target?.value);
      onChange?.(event);
    }

    return (
      <>
        {label && <Label htmlFor={id || name} {...labelProps}>{label}</Label>}
        <textarea
          ref={ref}
          id={id}
          name={name}
          onChange={handleOnChange}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive min-h-16",
            className
          )}
          {...rest}
        />
        <ErrorMessage error={error} />
      </>
    )
  });

export default TextArea;
