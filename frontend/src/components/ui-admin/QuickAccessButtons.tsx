import { cva, type VariantProps } from "class-variance-authority";
import {
  Boxes,
  ChartColumnBig,
  PackagePlus,
  Settings,
  Ship,
  UserRoundCog
} from "lucide-react";
import { NavLink, type NavLinkProps } from "react-router-dom";

import {
  DiagnosticButton
} from "~/components/diagnostic/Diagnostic";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const sidebarMenuButtonVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        primary:
          "bg-primary/5 text-primary shadow-xs hover:bg-primary/20",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function LinkWithTooltip({
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: NavLinkProps & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {

  const link = (
    <NavLink
      data-slot="sidebar-menu-link"
      data-sidebar="menu-link"
      data-size={size}
      data-active={isActive}
      className={({ isActive }) => cn(
        sidebarMenuButtonVariants({
          variant: isActive ? 'primary' : variant,
          size
        }),
        className
      )}
      {...props}
    />
  );

  if (!tooltip) {
    return link
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild><span className="w-full">{link}</span></TooltipTrigger>
      <TooltipContent
        side="bottom"
        align="center"
        {...tooltip}
      />
    </Tooltip>
  )
}

export function QuickAccessButtons(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Button asChild variant='ghost' size="sm" className="hidden md:flex">
        <LinkWithTooltip to="/clients" target="_blank" tooltip='clients'>
          <UserRoundCog />
          <span className="hidden xl:flex">Clientes</span>
        </LinkWithTooltip>
      </Button>
      <Button asChild variant='ghost' size="sm" className="hidden md:flex">
        <LinkWithTooltip to="/suppliers" target="_blank" tooltip='suppliers'>
          <Ship />
          <span className="hidden xl:flex">Proveedores</span>
        </LinkWithTooltip>
      </Button>
      <Button asChild variant='ghost' size="sm" className="hidden md:flex">
        <LinkWithTooltip to="/orders" target="_blank" tooltip='orders'>
          <PackagePlus />
          <span className="hidden xl:flex">Nueva Orden</span>
        </LinkWithTooltip>
      </Button>
      <Button asChild variant='ghost' size="sm" className="hidden md:flex">
        <LinkWithTooltip to="/items" target="_blank" tooltip='items'>
          <Boxes />
          <span className="hidden xl:flex">Items</span>
        </LinkWithTooltip>
      </Button>
      <Button asChild variant='ghost' size="sm" className="hidden md:flex">
        <LinkWithTooltip to="/reports" target="_blank" tooltip='reports'>
          <ChartColumnBig />
          <span className="hidden xl:flex">Reportes</span>
        </LinkWithTooltip>
      </Button>
      <Button asChild variant='ghost' size="sm" className="hidden md:flex">
        <LinkWithTooltip to="/settings" target="_blank" tooltip='settings'>
          <Settings />
          <span className="hidden xl:flex">Configuración</span>
        </LinkWithTooltip>
      </Button>
      <DiagnosticButton variant='ghost' size="sm" className="hidden md:flex" />
    </div>
  );
}