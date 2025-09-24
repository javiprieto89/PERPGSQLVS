import { Funnel, FunnelX } from "lucide-react";
import { Button, type ButtonProps } from "../ui/button";

export function ShowFilterButton({ showFilters, ...props }: ButtonProps & { showFilters: boolean }) {
  return (
    <Button {...props}>
      {showFilters ? (
        <>
          <FunnelX />
          <span className="hidden lg:inline">Ocultar</span>
        </>
      ) : (
        <>
          <Funnel />
          <span className="hidden lg:inline">Mostrar</span>
        </>
      )}
    </Button>
  )
}