import { useState } from "react";
import { Outlet } from "react-router-dom";

import RenderInWindow from "~/components/RenderInWindow";
import AppSidebar from "~/components/sidebar/AppSidebar";
import { SidebarHelper } from "~/components/sidebar/sidebarHelper";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export function AdminLayout() {
  // Ventanas flotantes
  const [windows, setWindows] = useState([]);

  // Funciones para ventanas flotantes
  const closeWindow = (id) => {
    setWindows((wins) => wins.filter((w) => w.id !== id));
  };

  return (
    <SidebarProvider defaultOpen={SidebarHelper.isOpenSidebar()}>
      <AppSidebar />
      <SidebarInset>
        <main className="relative">
          <Outlet />

          {/* Ventanas emergentes */}
          {windows.map((window) => {
            const WindowComponent = window.Component;
            return (
              <RenderInWindow
                key={window.id}
                title={window.title}
                onClose={() => closeWindow(window.id)}
                {...window.options}
              >
                <WindowComponent />
              </RenderInWindow>
            );
          })}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
