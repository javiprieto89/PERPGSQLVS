// src/components/Sidebar.jsx
import { IconDatabase, IconFileWord, IconHelp, IconReport, IconSearch, IconSettings } from "@tabler/icons-react";
import { useEffect } from "react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "~/components/ui/sidebar";

import { BranchAccessDropdown } from "~/features/branch/BranchAccessDropdown";
import { NavMenu } from "./NavMenu";
import { NavUser } from "./NavUser";

import { NavSecondary } from "./NavSecondary";
import { SidebarHelper } from "./sidebarHelper";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export default function AppSidebar() {
  const { open, state, isMobile } = useSidebar();

  useEffect(() => {
    SidebarHelper.setSidebarOpen(open)
  }, [open])

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="mb-6">
          <BranchAccessDropdown />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMenu />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
