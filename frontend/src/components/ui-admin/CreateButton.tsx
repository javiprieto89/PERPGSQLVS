import { Plus } from "lucide-react";

import { Button, type ButtonProps } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

export function CreateButton({ title = "Nuevo", ...props }: ButtonProps & { title?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="primary" {...props}>
          <Plus strokeWidth={3} />
          <span className="hidden lg:inline">{title}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent
      >
        {title}
      </TooltipContent>
    </Tooltip>
  )
}