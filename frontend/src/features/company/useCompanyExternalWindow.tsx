// frontend/src/features/company/useCompanyExternalWindow.tsx
import { useExternalWindowForm } from "~/hooks/useExternalWindowForm";
import { CompanyFormModal } from "./CompanyFormModal";

/**
 * Hook específico para abrir ventanas externas de Company con React Router support.
 * Replacement directo de openReactWindow para Company forms.
 */
export function useCompanyExternalWindow() {
  const { openFormWindow } = useExternalWindowForm();

  /**
   * Abre ventana externa para crear nueva company
   * @param onSave - Callback cuando se guarda exitosamente
   * @param onClose - Callback cuando se cierra la ventana
   */
  const openCreateWindow = (onSave?: () => void, onClose?: () => void) => {
    return openFormWindow(
      ({ onSave: handleSave, onClose: handleClose }) => (
        <CompanyFormModal
          isOpen={true}
          onSave={() => {
            handleSave();
            if (onSave) onSave();
          }}
          onClose={handleClose}
        />
      ),
      {
        title: "Nueva Empresa",
        onSave,
        onClose,
      }
    );
  };

  /**
   * Abre ventana externa para editar company existente
   * @param company - Datos de la company a editar
   * @param onSave - Callback cuando se guarda exitosamente
   * @param onClose - Callback cuando se cierra la ventana
   */
  const openEditWindow = (
    company: any,
    onSave?: () => void,
    onClose?: () => void
  ) => {
    return openFormWindow(
      ({ onSave: handleSave, onClose: handleClose }) => (
        <CompanyFormModal
          isOpen={true}
          initialData={company}
          onSave={() => {
            handleSave();
            if (onSave) onSave();
          }}
          onClose={handleClose}
        />
      ),
      {
        title: "Editar Empresa",
        onSave,
        onClose,
      }
    );
  };

  return {
    openCreateWindow,
    openEditWindow,
  };
}