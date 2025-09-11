import { RefreshCcw } from "lucide-react";
import { ButtonProps } from "react-day-picker";

import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { Button } from "../ui/button";

export function RefreshButton({ loading, ...props }: ButtonProps & { loading?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button {...props} disabled={loading}>
          <RefreshCcw className={loading ? "animate-spin" : ""} />
          <span className="hidden lg:inline">
            {loading ? "Cargando" : "Recargar"}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        align="center"
        hidden={false}
      >
        Recargar
      </TooltipContent>
    </Tooltip>
  )
}