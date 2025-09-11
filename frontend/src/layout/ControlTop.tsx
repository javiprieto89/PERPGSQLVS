// src/layout/Layout.jsx
import { Outlet } from "react-router-dom";

import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";

export function ControlTop({ title }: { title: string }) {
  return (
    <>
      <AdminTopBar title={title} />
      <Outlet />
    </>
  );
}
