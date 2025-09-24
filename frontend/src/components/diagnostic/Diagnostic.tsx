import { useAtom } from "jotai";
import { Info, LoaderCircle, Stethoscope } from "lucide-react";

import { diagnosticInfoAtom, useDiagnostic } from "~/hooks/useDiagnostic";

import { Alert } from "~/components/ui/alert";
import { Button, type ButtonProps } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function DiagnosticButton(props: ButtonProps) {
  const { loadingDiagnostic, runDiagnostic } = useDiagnostic();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={runDiagnostic} {...props}>
          {loadingDiagnostic ?
            <LoaderCircle className="animate-spin" /> :
            <Stethoscope />}
          <span className="hidden lg:inline">Diagnóstico</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        align="center"
        hidden={false}
      >
        Diagnóstico
      </TooltipContent>
    </Tooltip>
  )
}

export function DiagnosticInfo() {
  const [info] = useAtom(diagnosticInfoAtom);
  return (
    info ? (
      <Alert className="mb-4">
        <Info />
        <p className="text-foreground text-sm">{info}</p>
      </Alert>
    ) : null
  )
}