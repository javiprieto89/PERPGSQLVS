import { Funnel, FunnelX } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

export function ShowFilterButton({ showFilters, ...props }: ButtonProps & { showFilters: boolean }) {
  return (
    <Button {...props}>
      {showFilters ? (
        <>
          <FunnelX />
          Ocultar Filtros
        </>
      ) : (
        <>
          <Funnel />
          Mostrar Filtros
        </>
      )}
    </Button>
  )
}