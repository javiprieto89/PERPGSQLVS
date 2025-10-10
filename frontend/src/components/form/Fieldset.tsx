import { cn } from "~/lib/utils"

export const Fieldset = ({ className, ...props }: React.FieldsetHTMLAttributes<HTMLFieldSetElement>) => {
  return (
    <>
      <div className="bg-card shadow-xs rounded-md px-4 py-6">
        <fieldset
          data-slot="fieldset"
          className={cn("space-y-2", className)}
          {...props}
        />
      </div>
    </>
  )
}
