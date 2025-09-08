import { LoaderCircle, Save } from 'lucide-react';
import { Button, type ButtonProps } from '~/components/ui/button';

export const Submit = ({
  isSubmitting,
  label,
  children,
  ...props
}: ButtonProps & {
  isSubmitting?: boolean;
  label?: string;
}) => (
  <Button variant="primary" type="submit" disabled={isSubmitting} {...props}>
    {isSubmitting ? (
      <>
        <LoaderCircle className="animate-spin" />
        Submitting...
      </>
    ) : (
      <>
        <Save />
        {label}
        {children}
      </>
    )}
  </Button>
);