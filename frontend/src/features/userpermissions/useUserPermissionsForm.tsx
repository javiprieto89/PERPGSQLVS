// frontend/src/features/userpermissions/useUserPermissionsForm.tsx
import { useExternalWindowForm } from "~/hooks/useExternalWindowForm";
import { UserPermissionsFormModal } from "./UserPermissionsFormModal";

export function useUserPermissionsForm() {
  const { openComponentWindow } = useExternalWindowForm();

  const openUserPermissionsModal = (initialData?: any, onSave?: (result: any) => void) => {
    return openComponentWindow(
      <UserPermissionsFormModal
        initialData={initialData}
        onSave={onSave}
        onClose={() => { }} // Will be handled by the window context
      />,
      {
        title: "Asignación de Usuario",
        maxWidth: "4xl",
      }
    );
  };

  return {
    openUserPermissionsModal,
  };
}