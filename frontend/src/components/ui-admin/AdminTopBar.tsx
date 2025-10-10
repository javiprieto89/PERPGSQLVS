import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { QuickAccessButtons } from "./QuickAccessButtons";

type AdminTopBarProps = React.HTMLAttributes<HTMLElement> & { title?: string; quickAccessHidden?: boolean; }

export function AdminTopBar({ title, children, quickAccessHidden, className, ...props }: AdminTopBarProps) {
  return (
    <header className={cn(
      "flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) px-4 md:px-6",
      className
    )} {...props}>
      <div className="flex w-full items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {title && (
          <h1 className="text-base">{title}</h1>
        )}
        {children}
        {!quickAccessHidden &&
          <div className="ml-auto flex items-center gap-2">
            <QuickAccessButtons className="flex align-end items-end justify-end" />
          </div>}
      </div>
    </header>
  )
}

export function Title({ children }: React.PropsWithChildren) {
  return <h1 className="text-base">{children}</h1>
}