import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const formBlockVariants = cva('', {
  variants: {
    variant: {
      block: "space-y-2 w-full mb-4",
      inline: 'inline-flex flex-between items-center gap-2',
    },
    align: {
      center: 'items-center',
      right: 'items-end'
    }
  },
  defaultVariants: {
    variant: "block",
  },
})

interface FormBlockProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof formBlockVariants> { }

export const FormBlock = ({ variant, className, ...props }: FormBlockProps) => {
  return <div
    data-slot="form-block"
    className={cn(formBlockVariants({ variant }), className)} {...props}
  />
}
