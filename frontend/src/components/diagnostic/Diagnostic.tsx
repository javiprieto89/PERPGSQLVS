import { useAtom } from "jotai";
import { Info, LoaderCircle, Stethoscope } from "lucide-react";

import { diagnosticInfoAtom, useDiagnostic } from "~/hooks/useDiagnostic";

import { Alert } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";

export function DiagnosticButton() {
  const { loadingDiagnostic, runDiagnostic } = useDiagnostic();

  return (
    <Button onClick={runDiagnostic}>
      {loadingDiagnostic ?
        <LoaderCircle className="animate-spin" /> :
        <Stethoscope />}
      Diagnóstico
    </Button>
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