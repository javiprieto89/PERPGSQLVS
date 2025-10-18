// frontend/src/hooks/useExternalWindowForm.tsx
import { type ReactNode } from "react";
import { useExternalWindow } from "~/context/ExternalWindowContext";

interface ExternalWindowFormOptions {
  title?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl";
  onSave?: () => void;
  onClose?: () => void;
}

/**
 * Hook para abrir formularios en ventanas externas con acceso completo a React Router.
 * Replacement moderno de openReactWindow que mantiene el contexto de la app.
 */
export function useExternalWindowForm() {
  const { openWindow, closeWindow } = useExternalWindow();

  /**
   * Abre un formulario en ventana externa con callbacks para save/close
   * @param FormComponent - Componente del formulario a renderizar
   * @param options - Configuración de la ventana
   * @returns windowId - ID de la ventana para cerrarla manualmente si es necesario
   */
  const openFormWindow = (
    FormComponent: (handlers: {
      onSave: () => void;
      onClose: () => void;
      windowId: string;
    }) => ReactNode,
    options: ExternalWindowFormOptions = {}
  ) => {
    const { title, maxWidth = "4xl", onSave, onClose } = options;

    // Pre-generate window ID
    const windowId = Date.now().toString() + Math.random().toString(36).substr(2, 9);

    // Create handlers that reference the pre-generated ID
    const handlers = {
      onSave: () => {
        if (onSave) onSave();
        closeWindow(windowId);
      },
      onClose: () => {
        if (onClose) onClose();
        closeWindow(windowId);
      },
      windowId,
    };

    // Open window with pre-generated ID
    openWindow({
      id: windowId,
      title,
      maxWidth,
      component: FormComponent(handlers),
      onClose: () => {
        if (onClose) onClose();
      },
    });

    return windowId;
  };

  /**
   * Abre un componente genérico en ventana externa
   * @param component - Componente a renderizar
   * @param options - Configuración de la ventana
   * @returns windowId - ID de la ventana
   */
  const openComponentWindow = (
    component: ReactNode,
    options: ExternalWindowFormOptions = {}
  ) => {
    const { title, maxWidth = "4xl", onClose } = options;

    return openWindow({
      title,
      maxWidth,
      component,
      onClose,
    });
  };

  return {
    openFormWindow,
    openComponentWindow,
    closeWindow,
  };
}