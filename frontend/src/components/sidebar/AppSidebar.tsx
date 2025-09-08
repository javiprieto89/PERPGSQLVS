// src/components/Sidebar.jsx
import { IconInnerShadowTop } from "@tabler/icons-react";
import { useEffect } from "react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "~/components/ui/sidebar";

import { BranchAccessDropdown } from "~/features/branch/BranchAccessDropdown";
import { NavMenu } from "./NavMenu";
import { NavUser } from "./NavUser";

import { SidebarHelper } from "./sidebarHelper";

export default function AppSidebar() {
  const { open } = useSidebar();

  useEffect(() => {
    SidebarHelper.setSidebarOpen(open)
  }, [open])

  return (
    <Sidebar collapsible="icon">
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
