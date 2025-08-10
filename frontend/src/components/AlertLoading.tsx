import { LoaderCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function AlertLoading() {
  return (
    <Alert className="my-4">
      <LoaderCircle className="animate-spin" />
      <AlertDescription>Cargando...</AlertDescription>
    </Alert>
  );
}

