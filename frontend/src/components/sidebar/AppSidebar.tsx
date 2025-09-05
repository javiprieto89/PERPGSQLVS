// src/components/Sidebar.jsx

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "~/components/ui/sidebar";
import { NavUser } from "./NavUser";

import { IconInnerShadowTop } from "@tabler/icons-react";
import { BranchAccessDropdown } from "~/features/branch/BranchAccessDropdown";
import { NavMenu } from "./NavMenu";

export default function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-4">
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <div>
                  <IconInnerShadowTop />
                  <span className="text-base font-semibold">ERP</span>
                </div>
              </SidebarMenuButton>
              <div className="p-1.5">
                <SidebarTrigger className="relative top-0" />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <BranchAccessDropdown />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
