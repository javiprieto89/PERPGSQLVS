import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";

import { useUser } from "~/hooks/useUser";

import { Badge } from "~/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { type UserAccess } from "~/utils/authHelper";

export function BranchAccessDropdown({ onAccessChange }: { onAccessChange?: (access: UserAccess) => void }) {
  const { changeSelectedAccess, selectedAccess, userAccesses, loading } = useUser();
  const { state, isMobile } = useSidebar()

  function getIsSelected(access: UserAccess) {
    const company = access.Company || "Sin empresa";
    const branch = access.Branch || "Sin sucursal";
    const role = access.Role || "Sin rol";
    return company === selectedAccess?.Company &&
      branch === selectedAccess?.Branch &&
      role === selectedAccess?.Role;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          tooltip={"Cambio de Sucursal"}
          disabled={loading}
          size="lg"
          className={cn(
            "bg-sidebar-accent/10 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground !py-1 px-3 h-10 hover:shadow-sm",
            { "flex items-center justify-center": state === "collapsed" && !isMobile }
          )}
        >
          {loading ? (
            <LoaderCircle className="animate-spin -ml-1" />
          ) : (
            state === "collapsed" && !isMobile ?
              selectedAccess?.Company ? selectedAccess?.Company.slice(0, 3).toUpperCase() : "N/A"
              :
              <>
                <div className="flex justify-left flex-col w-full">
                  <div className="text-left">{selectedAccess?.Company}</div>
                  <div className="text-left text-xs text-muted-foreground">
                    {selectedAccess?.Branch}
                  </div>
                </div>
                <Badge className="m-l-auto">{selectedAccess?.Role}</Badge>
                <ChevronsUpDown className="ml-auto size-4" />
              </>
          )}
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        // side={isMobile ? "bottom" : "right"}
        side={state === "collapsed" && !isMobile ? "right" : "bottom"}
        align="start"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          {userAccesses ? (
            userAccesses.map((access, index) => {
              const isSelected = getIsSelected(access);
              return (
                <DropdownMenuItem
                  onClick={() => {
                    onAccessChange?.(access);
                    changeSelectedAccess(access);
                  }}
                  className={`w-full text-left text-sm justify-start mt-1 py-1 px-3 ${isSelected ? "bg-primary/10 text-primary" : ""
                    }`}
                >
                  <>
                    <div className="w-full flex justify-between items-center">
                      <div className="flex justify-left flex-col w-full">
                        <div className="text-sm/4">{access.Company || "Sin empresa"}</div>
                        <div className="text-left text-xs text-muted-foreground">
                          {access.Branch || "Sin sucursal"}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="m-l-auto">{access.Role || "Sin rol"}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center mt-1 shrink-0 w-4 ml-auto">
                      {isSelected && <Check />}
                    </div>
                  </>
                </DropdownMenuItem>
              )
            })) : null}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}