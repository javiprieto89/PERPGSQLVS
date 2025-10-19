import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { checkService, type CheckRecord } from "~/services/check.service";
import { bankService, type Bank } from "~/services/bank.service";
import { AuthHelper } from "~/utils/authHelper";
import { checkHelpers, formSchema, type FormSchema } from "./checkHelpers";

export const BASE_ROUTE = "/checks";

const today = new Date().toISOString().slice(0, 10);

interface UseCheckFormOptions {
  id?: number; // CheckID
}

export function useCheckForm({ id }: UseCheckFormOptions = {}) {
  const navigate = useNavigate();
  const [data, setData] = useState<CheckRecord | null>(null);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [queryError, setQueryError] = useState<Error | null>(null);
  const [saveError, setSaveError] = useState<Error | null>(null);

  const isEditing = !!id;
  const selectedAccess = AuthHelper.getSelectedAccess();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      CompanyID: selectedAccess?.CompanyID || 0,
      Number: "",
      CurrencyID: 1, // Peso por defecto
      Amount: 0,
      IssueDate: today,
      DueDate: "",
      BankID: null,
      DrawerName: "",
      HolderName: "",
      CheckStatusID: null,
    },
  });

  // Cargar bancos disponibles
  useEffect(() => {
    const loadBanks = async () => {
      try {
        const bankList = await bankService.getAll();
        setBanks(bankList);
      } catch (error) {
        console.error("Error loading banks:", error);
      }
    };

    loadBanks();
  }, []);

  // Cargar datos del cheque si estamos editando
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setQueryError(null);

    checkService
      .getById(id)
      .then((check) => {
        if (check) {
          setData(check);
          form.reset(checkHelpers.prepareDataFormSchema(check), {
            keepDirty: true,
            keepDirtyValues: true,
          });
        }
      })
      .catch((error) => {
        setQueryError(error);
        console.error("Error loading check:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, form]);

  async function handleSubmit(formData: FormSchema) {
    setIsSaving(true);
    setSaveError(null);

    try {
      let result: CheckRecord;
      const preparedData = checkHelpers.prepareData(formData);

      if (isEditing && id) {
        result = await checkService.update(id, preparedData, formData.CompanyID);
      } else {
        result = await checkService.create(preparedData);
      }

      navigate(BASE_ROUTE, {
        state: {
          highlight: result.CheckID,
        },
      });

      toast.message(
        isEditing 
          ? "Cheque actualizado con éxito" 
          : "Cheque creado con éxito"
      );
    } catch (error) {
      setSaveError(error as Error);
      console.error("Error saving check:", error);
      toast.error("Error al guardar el cheque. Contacte al administrador del sistema");
    } finally {
      setIsSaving(false);
    }
  }

  return {
    navigate,
    form,
    handleSubmit,
    data,
    banks,
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