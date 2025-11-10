import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import {
  checkMovementService,
  type CheckMovement,
  type CheckMovementInput,
} from "~/services/check-movement.service";
import { AuthStorage } from "~/utils/auth.storage";

export const BASE_ROUTE = "/check-movements";

// Zod schema for validation
const checkMovementSchema = z.object({
  CompanyID: z.number().min(1, "Seleccione una empresa"),
  CheckID: z.number().min(1, "Seleccione un cheque"),
  EventDate: z.string().min(1, "Seleccione una fecha"),
  EventType: z.string().min(1, "Ingrese el tipo de evento"),
  BankAccountID: z.number().optional(),
  BranchID: z.number().optional(),
  TransactionID: z.number().optional(),
  Notes: z.string().optional(),
});

type CheckMovementFormData = z.infer<typeof checkMovementSchema>;

interface UseCheckMovementFormProps {
  id?: number;
  onSave?: (movement: CheckMovement) => void;
  onCancel?: () => void;
}

export function useCheckMovementForm({
  id,
  onSave,
  onCancel,
}: UseCheckMovementFormProps = {}) {
  const navigate = useNavigate();
  const selectedAccess = AuthStorage.getSelectedAccess();

  const isEditing = Boolean(id);
  const today = new Date().toISOString().slice(0, 10);

  const [data, setData] = useState<CheckMovement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [queryError, setQueryError] = useState<Error | null>(null);
  const [saveError, setSaveError] = useState<Error | null>(null);

  // Form setup
  const form = useForm<CheckMovementFormData>({
    resolver: zodResolver(checkMovementSchema),
    defaultValues: {
      CompanyID: selectedAccess?.CompanyID || 0,
      CheckID: 0,
      EventDate: today,
      EventType: "",
      BankAccountID: undefined,
      BranchID: selectedAccess?.BranchID || undefined,
      TransactionID: undefined,
      Notes: "",
    },
  });

  // Load data when editing
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setQueryError(null);

    checkMovementService
      .getById(id)
      .then((movement) => {
        if (movement) {
          setData(movement);
          form.reset({
            CompanyID: movement.CompanyID,
            CheckID: movement.CheckID,
            EventDate: movement.EventDate?.slice(0, 10) || today,
            EventType: movement.EventType || "",
            BankAccountID: movement.BankAccountID || undefined,
            BranchID: movement.BranchID || undefined,
            TransactionID: movement.TransactionID || undefined,
            Notes: movement.Notes || "",
          });
        }
      })
      .catch((error) => {
        setQueryError(error);
        console.error("Error loading check movement:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, form, today]);

  // Handle form submission
  const handleSubmit = async (formData: CheckMovementFormData) => {
    setIsSaving(true);
    setSaveError(null);

    try {
      const payload: CheckMovementInput = {
        CompanyID: formData.CompanyID,
        CheckID: formData.CheckID,
        EventDate: formData.EventDate,
        EventType: formData.EventType.trim(),
        BankAccountID: formData.BankAccountID || undefined,
        BranchID: formData.BranchID || undefined,
        TransactionID: formData.TransactionID || undefined,
        Notes: formData.Notes?.trim() || undefined,
      };

      let result: CheckMovement;
      if (isEditing && id) {
        result = await checkMovementService.update(
          id,
          payload,
          data?.CompanyID || selectedAccess?.CompanyID || 0
        );
      } else {
        result = await checkMovementService.create(payload);
      }

      toast.success(
        isEditing
          ? "Movimiento de cheque actualizado exitosamente"
          : "Movimiento de cheque creado exitosamente"
      );

      if (onSave) {
        onSave(result);
      } else {
        navigate(BASE_ROUTE);
      }
    } catch (error) {
      setSaveError(error as Error);
      console.error("Error saving check movement:", error);
      toast.error(
        "Error al guardar el movimiento de cheque. Contacte al administrador del sistema"
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(BASE_ROUTE);
    }
  };

  // Error states
  const errors = {
    query: queryError,
    create: saveError,
    update: saveError,
  };

  return {
    form,
    handleSubmit,
    handleCancel,
    data,
    isEditing,
    isLoading,
    isSaving,
    errors,
  };
}
