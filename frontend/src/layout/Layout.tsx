import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import RenderInWindow from "~/components/RenderInWindow";
import AppSidebar from "~/components/sidebar/AppSidebar";
import { SidebarHelper } from "~/components/sidebar/sidebarHelper";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

type WindowState = {
  id: string;
  Component: React.JSXElementConstructor<any>;
  title?: string;
  options: {};
};

export function AdminLayout() {
  // Ventanas flotantes
  const [windows, setWindows] = useState<WindowState[]>([]);

  // Funciones para ventanas flotantes
  const closeWindow = (id: string) => {
    setWindows((wins) => wins.filter((w) => w.id !== id));
  };

  return (
    <SidebarProvider defaultOpen={SidebarHelper.isOpenSidebar()}>
      <AppSidebar />
      <SidebarInset>
        <main className="relative">
          <Toaster />
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
                {WindowComponent && <WindowComponent />}
              </RenderInWindow>
            );
          })}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
