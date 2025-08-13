import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { diagnosticGraphQL } from "~/graphql/diagnostic";

export const diagnosticInfoAtom = atom<string | null>();

export function useDiagnostic() {
  const [diagnosticInfo, setInfo] = useAtom(diagnosticInfoAtom);
  const [loadingDiagnostic, setLoading] = useState<boolean>(false);
  const { startDiagnostic } = diagnosticGraphQL();

  useEffect(() => {
    return () => {
      setInfo(null);
    };
  }, []);

  const runDiagnostic = async () => {
    setLoading(true);
    setInfo("Ejecutando diagnóstico completo...");
    const result = await startDiagnostic();
    setLoading(false);
    setInfo(
      result ? "Diagnóstico exitoso" : "Diagnóstico falló - revisa la consola"
    );
    return result;
  };

  return { diagnosticInfo, runDiagnostic, loadingDiagnostic };
}
