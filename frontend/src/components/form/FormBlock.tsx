import { cva, type VariantProps } from "class-variance-authority";

const formBlockVariants = cva(
  'mb-2', {
  variants: {
    variant: {
      block: "[&>label]:flex [&>label]:items-center [&>label]:gap-2 [&>label]:mb-2",
      inline: 'inline-flex flex-between items-center gap-2',
    },
    width: {
      fixed: 'w-2/3',
      full: 'w-full'
    },
    align: {
      center: 'items-center',
      right: 'items-end'
    }
  },
  defaultVariants: {
    variant: "block",
    width: "fixed"
  },
})

interface FormBlockProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof formBlockVariants> { }

export const FormBlock = ({ variant, className, ...props }: FormBlockProps) => {
  return <div className={formBlockVariants({ variant, className })} {...props} />
}
