// src/layout/Layout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";

import RenderInWindow from "~/components/RenderInWindow";
import AppSidebar from "~/components/sidebar/AppSidebar";
import { AdminHeader } from "~/components/ui-admin/AdminHeader";
import { SidebarProvider } from "~/components/ui/sidebar";

export default function Layout() {
  // Ventanas flotantes
  const [windows, setWindows] = useState([]);

  // Funciones para ventanas flotantes
  const closeWindow = (id) => {
    setWindows((wins) => wins.filter((w) => w.id !== id));
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-2">
        <AdminHeader title="Section Title" />
        <div>
          {/* Aquí se inyectan las rutas hijas */}
          <Outlet />
        </div>

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
    </SidebarProvider>
  );
}
