// frontend/src/features/company/CompanyFormModal.tsx
import { GenericModal } from "~/components/GenericModal";
import { CompanyForm } from "./CompanyForm";

interface CompanyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (result: any) => void;
  initialData?: any;
  title?: string;
}

export function CompanyFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
}: CompanyFormModalProps) {
  const handleSave = (result: any) => {
    if (onSave) {
      onSave(result);
    }
    onClose();
  };

  const modalTitle = title || (initialData ? "Editar Empresa" : "Nueva Empresa");

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth="4xl"
    >
      {isOpen && (
        <CompanyForm
          initialData={initialData}
          onSave={handleSave}
          onCancel={onClose}
          showTopBar={false}
          title={modalTitle}
        />
      )}
    </GenericModal>
  );
}