import { type GetAllClientsQuery } from "~/graphql/_generated/graphql";


// Modal simple para mostrar los datos del cliente seleccionado
export function ClientDetails({ client }: { client: GetAllClientsQuery['allClients'][0] }) {
  if (!client) return null;
  return (
    <div className="card rounded-lg max-w-lg w-full p-6 space-y-4">
      <h2 className="font-bold">Detalles del Cliente</h2>
      <div className="space-y-1 text-sm">
        <h3 className="text-lg font-semibold ">
          {client.FirstName} {client.LastName}
        </h3>
        <p className="text-sm">ID: {client.ClientID}</p>
        <p className="flex items-center mt-4">
          <svg
            className="w-4 h-4  mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <strong>Email:</strong> {client.Email || "—"}
        </p>
        <p className="flex items-center">
          <svg
            className="w-4 h-4  mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <strong>Teléfono:</strong> {client.Phone || "—"}
        </p>
        <p className="flex items-center">
          <svg
            className="w-4 h-4  mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <strong>Dirección:</strong> {client.Address || "—"}
        </p>
        <p className="flex items-center">
          <svg
            className="w-4 h-4  mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
              clipRule="evenodd"
            />
          </svg>
          <strong>Documento:</strong> {client.DocNumber || "—"}
        </p>
        <p className="flex items-center gap-2 mt-4">
          <strong>Activo:</strong>{" "}
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${client.IsActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-destructive"
              }`}
          >
            {client.IsActive ? "Activo" : "Inactivo"}
          </span>
        </p>
      </div>
    </div>
  );
}