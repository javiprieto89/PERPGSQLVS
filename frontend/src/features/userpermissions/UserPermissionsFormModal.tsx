// frontend/src/features/userpermissions/UserPermissionsFormModal.tsx
import { UserPermissionsForm } from "~/pages/users-permissions/form";

interface UserPermissionsFormModalProps {
  onClose: () => void;
  onSave?: (result: any) => void;
  initialData?: any;
}

export function UserPermissionsFormModal({
  onClose,
  onSave,
  initialData,
}: UserPermissionsFormModalProps) {
  const handleSave = (result: any) => {
    onSave?.(result);
    onClose();
  };

  return (
    <UserPermissionsForm
      onSave={handleSave}
      onCancel={onClose}
      initialData={initialData}
      showTopBar={false}
      title="Asignación de Usuario"
    />
  );
}