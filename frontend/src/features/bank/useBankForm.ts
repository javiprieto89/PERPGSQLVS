import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { bankService, type Bank } from "~/services/bank.service";
import { bankHelpers, formSchema, type FormSchema } from "./bankHelpers";

export const BASE_ROUTE = "/banks";

interface UseBankFormOptions {
  id?: number; // BankID
}

export function useBankForm({ id }: UseBankFormOptions = {}) {
  const navigate = useNavigate();
  const [data, setData] = useState<Bank | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [queryError, setQueryError] = useState<Error | null>(null);
  const [saveError, setSaveError] = useState<Error | null>(null);

  const isEditing = !!id;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      Name: "",
      IsActive: true,
    },
  });

  // Cargar datos del banco si estamos editando
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setQueryError(null);

    bankService
      .getById(id)
      .then((bank) => {
        if (bank) {
          setData(bank);
          form.reset(bankHelpers.prepareDataFormSchema(bank), {
            keepDirty: true,
            keepDirtyValues: true,
          });
        }
      })
      .catch((error) => {
        setQueryError(error);
        console.error("Error loading bank:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, form]);

  async function handleSubmit(formData: FormSchema) {
    setIsSaving(true);
    setSaveError(null);

    try {
      let result: Bank;
      const preparedData = bankHelpers.prepareData(formData);

      if (isEditing && id) {
        result = await bankService.update(id, preparedData);
      } else {
        result = await bankService.create(preparedData);
      }

      navigate(BASE_ROUTE, {
        state: {
          highlight: result.BankID,
        },
      });

      toast.message(
        isEditing ? "Banco actualizado con éxito" : "Banco creado con éxito"
      );
    } catch (error) {
      setSaveError(error as Error);
      console.error("Error saving bank:", error);
      toast.error(
        "Error al guardar el banco. Contacte al administrador del sistema"
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
