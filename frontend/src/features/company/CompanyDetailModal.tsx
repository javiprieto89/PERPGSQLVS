// frontend/src/features/company/CompanyDetailModal.tsx
import { GenericModal } from "~/components/GenericModal";
import { Button } from "~/components/ui/button";
import { type CompanyInDb } from "~/graphql/_generated/graphql";

interface CompanyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyInDb;
  onEdit?: (company: CompanyInDb) => void;
  onDelete?: (companyId: number) => void;
}

export function CompanyDetailModal({
  isOpen,
  onClose,
  company,
  onEdit,
  onDelete,
}: CompanyDetailModalProps) {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(company);
    }
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && window.confirm("¿Está seguro de eliminar esta empresa?")) {
      onDelete(company.CompanyID);
    }
    onClose();
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalles de la Empresa"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Logo */}
        {company.Logo && (
          <div className="flex justify-center">
            <img
              src={`data:image/*;base64,${company.Logo}`}
              alt="Logo de la empresa"
              className="h-20 object-contain"
            />
          </div>
        )}

        {/* Información básica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Nombre</label>
            <p className="text-lg font-semibold">{company.CompanyName || "N/A"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">CUIT</label>
            <p className="text-lg">{company.CUIT || "N/A"}</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">Dirección</label>
            <p className="text-lg">{company.Address || "N/A"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Ingresos Brutos</label>
            <p className="text-lg">{company.Grossincome || "N/A"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Fecha de Inicio</label>
            <p className="text-lg">
              {company.Startdate
                ? new Date(company.Startdate).toLocaleDateString()
                : "N/A"
              }
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">ID</label>
            <p className="text-lg text-gray-500">{company.CompanyID}</p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          {onDelete && (
            <Button
              variant="outline"
              onClick={handleDelete}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Eliminar
            </Button>
          )}
          {onEdit && (
            <Button onClick={handleEdit}>
              Editar
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </GenericModal>
  );
}