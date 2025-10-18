// frontend/src/features/car/CarFormModal.tsx
import { GenericModal } from "~/components/GenericModal";
import { CarForm } from "./CarForm";

interface CarFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (result: any) => void;
  initialData?: any;
  title?: string;
}

export function CarFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
}: CarFormModalProps) {
  const handleSave = (result: any) => {
    if (onSave) {
      onSave(result);
    }
    onClose();
  };

  const modalTitle = title || (initialData ? "Editar Vehículo" : "Nuevo Vehículo");

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth="4xl"
    >
      {isOpen && (
        <CarForm
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