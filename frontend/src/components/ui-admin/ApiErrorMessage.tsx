import { type ApolloError } from "@apollo/client";
import { XCircle } from "lucide-react";

import { Alert, AlertDescription } from "~/components/ui/alert";

export function ApiErrorMessage({ error }: { error?: Error | ApolloError | { message: string } }) {
  console.log("error", error)
  return (
    <Alert variant="destructive" className="my-4">
      <XCircle />
      <AlertDescription>
        {error ? <p className="text-destructive">{error.message || JSON.stringify(error)}</p> : "Error cargando datos: Verifica que el servidor esté ejecutándose"}
      </AlertDescription>
    </Alert>
  )
}
