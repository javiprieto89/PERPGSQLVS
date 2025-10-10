import type { SuppliersInDb } from "~/graphql/_generated/graphql";

export function SupplierDetails({ supplier }: { supplier: SuppliersInDb }) {
  if (!supplier) return null;
  return (
    <div className="rounded-lg max-w-lg w-full p-6 space-y-4">
      <h2 className="text-xl font-bold">Detalles del Proveedor</h2>
      <div className="space-y-1 text-sm">
        <p>
          <strong>Nombre:</strong> {supplier.FirstName} {supplier.LastName}
        </p>
        <p>
          <strong>Email:</strong> {supplier.Email || "—"}
        </p>
        <p>
          <strong>Teléfono:</strong> {supplier.Phone || "—"}
        </p>
        <p>
          <strong>Dirección:</strong> {supplier.Address || "—"}
        </p>
        <p>
          <strong>Documento:</strong> {supplier.DocNumber || "—"}
        </p>
        <p>
          <strong>Activo:</strong> {supplier.IsActive ? "Sí" : "No"}
        </p>
      </div>
    </div>
  );
}