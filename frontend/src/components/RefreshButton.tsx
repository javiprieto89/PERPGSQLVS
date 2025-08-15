import { RefreshCcw } from "lucide-react";
import { ButtonProps } from "react-day-picker";
import { Button } from "./ui/button";

export function RefreshButton({ loading, ...props }: ButtonProps & { loading?: boolean }) {
  return (
    <Button {...props} disabled={loading}>
      <>
        <RefreshCcw className={loading ? "animate-spin" : ""} />
        <span className="hidden lg:inline">
          {loading ? "Cargando" : "Recargar"}
        </span>
      </>
    </Button>
  )
}