import { LoaderCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function AlertLoading({ message = "Cargando..." }: { message?: string }) {
  return (
    <Alert className="my-4">
      <LoaderCircle className="animate-spin" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

