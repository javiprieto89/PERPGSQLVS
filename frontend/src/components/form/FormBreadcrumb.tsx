import { ChevronRight } from "lucide-react";


import type { PropsWithChildren } from "react";

export function FormBreadcrumb({ children, isEditing }: PropsWithChildren & { isEditing?: boolean }) {
  return (
    <div className="text-sm flex items-center">
      {children}
      <ChevronRight strokeWidth="1" className="text-muted-foreground" /><span className="text-muted-foreground">{isEditing ? "Editar" : "Nuevo"}</span>
    </div>
  )
}