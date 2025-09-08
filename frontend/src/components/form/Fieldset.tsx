import { cn } from "~/lib/utils"

export const Fieldset = ({ className, ...props }: React.FieldsetHTMLAttributes<HTMLFieldSetElement>) => {
  return <fieldset className={cn("bg-card border-1 rounded-md p-4 my-2", className)} {...props} />
}
