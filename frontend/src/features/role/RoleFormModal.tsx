// frontend/src/features/role/RoleFormModal.tsx
import { RoleForm } from "./RoleForm";

interface RoleFormModalProps {
  onClose: () => void;
  onSave?: (result: any) => void;
  role?: any; // initialData
}

export function RoleFormModal({
  onClose,
  onSave,
  role,
}: RoleFormModalProps) {
  const handleSave = (result: any) => {
    onSave?.(result);
    onClose();
  };

  return (
    <RoleForm
      onSave={handleSave}
      onCancel={onClose}
      initialData={role}
      showTopBar={false}
      title="Gestión de Rol"
    />
  );
}