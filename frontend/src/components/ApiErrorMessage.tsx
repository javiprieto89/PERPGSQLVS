import { ApolloError } from "@apollo/client";
import { XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function ApiErrorMessage({ error }: { error?: Error | ApolloError | { message: string } }) {
  return (
    <Alert variant="destructive" className="my-4">
      <XCircle />
      <AlertTitle>
        <h4>Error cargando datos</h4>
      </AlertTitle>
      <AlertDescription>
        {error && <p className="text-destructive">{error.message}</p>}
        <p className="my-3">
          Posibles soluciones:
          <ul className="list-disc list-inside my-1 space-y-1">
            <li>
              Verifica que el servidor GraphQL esté ejecutándose:{" "}
              <code>uvicorn app.main:app --reload</code>
            </li>
            <li>Comprueba la URL del endpoint en graphqlClient.js</li>
            <li>Revisa la consola del navegador para más detalles</li>
            <li>Usa el botón "Diagnóstico" para más información</li>
          </ul>
        </p>
      </AlertDescription>
    </Alert>
  )
}