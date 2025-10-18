// frontend/src/context/ExternalWindowContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { GenericModal } from "~/components/GenericModal";

interface ExternalWindowConfig {
  id: string;
  title?: string;
  component: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl";
  onClose?: () => void;
}

interface ExternalWindowContextType {
  windows: ExternalWindowConfig[];
  openWindow: (config: Omit<ExternalWindowConfig, 'id'> & { id?: string }) => string;
  closeWindow: (id: string) => void;
  closeAllWindows: () => void;
}

const ExternalWindowContext = createContext<ExternalWindowContextType | undefined>(undefined);

export function ExternalWindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<ExternalWindowConfig[]>([]);

  const openWindow = (config: Omit<ExternalWindowConfig, 'id'> & { id?: string }) => {
    const id = config.id || Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const windowConfig = { ...config, id };

    setWindows(prev => [...prev, windowConfig]);
    return id;
  };

  const closeWindow = (id: string) => {
    setWindows(prev => {
      const window = prev.find(w => w.id === id);
      if (window?.onClose) {
        window.onClose();
      }
      return prev.filter(w => w.id !== id);
    });
  };

  const closeAllWindows = () => {
    windows.forEach(window => {
      if (window.onClose) {
        window.onClose();
      }
    });
    setWindows([]);
  };

  return (
    <ExternalWindowContext.Provider value={{ windows, openWindow, closeWindow, closeAllWindows }}>
      {children}
      {/* Render all external windows */}
      {windows.map(window => (
        <GenericModal
          key={window.id}
          isOpen={true}
          onClose={() => closeWindow(window.id)}
          title={window.title}
          maxWidth={window.maxWidth}
        >
          {window.component}
        </GenericModal>
      ))}
    </ExternalWindowContext.Provider>
  );
}

export function useExternalWindow() {
  const context = useContext(ExternalWindowContext);
  if (context === undefined) {
    throw new Error('useExternalWindow must be used within an ExternalWindowProvider');
  }
  return context;
}