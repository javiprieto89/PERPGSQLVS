import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  bankReconciliationService,
  type BankReconciliation,
} from "~/services/bank-reconciliation.service";
import { AuthStorage } from "~/utils/auth.storage";
import {
  bankReconciliationHelpers,
  formSchema,
  type FormSchema,
} from "./bankReconciliationHelpers";

export const BASE_ROUTE = "/bank-reconciliations";

const today = new Date().toISOString().slice(0, 10);

interface UseBankReconciliationFormOptions {
  id?: number; // ReconciliationID
}

export function useBankReconciliationForm({
  id,
}: UseBankReconciliationFormOptions = {}) {
  const navigate = useNavigate();
  const [data, setData] = useState<BankReconciliation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [queryError, setQueryError] = useState<Error | null>(null);
  const [saveError, setSaveError] = useState<Error | null>(null);

  const isEditing = !!id;
  const selectedAccess = AuthStorage.getSelectedAccess();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      CompanyID: selectedAccess?.CompanyID || 0,
      BankAccountID: 0,
      StatementDate: today,
      ClosingBalance: 0,
      Notes: "",
    },
  });

  // Cargar datos de la conciliación si estamos editando
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setQueryError(null);

    bankReconciliationService
      .getById(id)
      .then((reconciliation) => {
        if (reconciliation) {
          setData(reconciliation);
          form.reset(
            bankReconciliationHelpers.prepareDataFormSchema(reconciliation),
            {
              keepDirty: true,
              keepDirtyValues: true,
            }
          );
        }
      })
      .catch((error) => {
        setQueryError(error);
        console.error("Error loading bank reconciliation:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, form]);

  async function handleSubmit(formData: FormSchema) {
    setIsSaving(true);
    setSaveError(null);

    try {
      let result: BankReconciliation;
      const preparedData = bankReconciliationHelpers.prepareData(formData);

      if (isEditing && id) {
        result = await bankReconciliationService.update(
          id,
          preparedData,
          formData.CompanyID
        );
      } else {
        result = await bankReconciliationService.create(preparedData);
      }

      navigate(BASE_ROUTE, {
        state: {
          highlight: result.ReconciliationID,
        },
      });

      toast.message(
        isEditing
          ? "Conciliación bancaria actualizada con éxito"
          : "Conciliación bancaria creada con éxito"
      );
    } catch (error) {
      setSaveError(error as Error);
      console.error("Error saving bank reconciliation:", error);
      toast.error(
        "Error al guardar la conciliación bancaria. Contacte al administrador del sistema"
      );
    } finally {
      setIsSaving(false);
    }
  }

  return {
    navigate,
    form,
    handleSubmit,
    data,
    isEditing,
    isLoading,
    isSaving,
    errors: {
      query: queryError,
      update: saveError,
      create: saveError,
    },
  };
}
