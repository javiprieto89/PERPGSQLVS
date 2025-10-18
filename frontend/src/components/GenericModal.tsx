// frontend/src/components/ui/GenericModal.tsx
import { X } from "lucide-react";
import { type ReactNode } from "react";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl";
}

export function GenericModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "4xl"
}: GenericModalProps) {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className={`relative mx-auto p-5 border w-full ${maxWidthClasses[maxWidth]} shadow-lg rounded-md bg-background space-y-4`}>
        {title && (
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="text-xl font-semibold text-foreground">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:text-foreground rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}