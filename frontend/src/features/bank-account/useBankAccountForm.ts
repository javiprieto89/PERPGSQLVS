import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  bankAccountService,
  type BankAccount,
} from "~/services/bank-account.service";
import { bankService, type Bank } from "~/services/bank.service";
import { AuthHelper } from "~/utils/authHelper";
import {
  bankAccountHelpers,
  formSchema,
  type FormSchema,
} from "./bankAccountHelpers";

export const BASE_ROUTE = "/bank-accounts";

interface UseBankAccountFormOptions {
  id?: number; // BankAccountID
}

export function useBankAccountForm({ id }: UseBankAccountFormOptions = {}) {
  const navigate = useNavigate();
  const [data, setData] = useState<BankAccount | null>(null);
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
      BankID: 0,
      AccountNumber: "",
      CurrencyID: 0,
      Alias: "",
      IsActive: true,
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

  // Cargar datos de la cuenta bancaria si estamos editando
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setQueryError(null);

    bankAccountService
      .getById(id)
      .then((account) => {
        if (account) {
          setData(account);
          form.reset(bankAccountHelpers.prepareDataFormSchema(account), {
            keepDirty: true,
            keepDirtyValues: true,
          });
        }
      })
      .catch((error) => {
        setQueryError(error);
        console.error("Error loading bank account:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, form]);

  async function handleSubmit(formData: FormSchema) {
    setIsSaving(true);
    setSaveError(null);

    try {
      let result: BankAccount;
      const preparedData = bankAccountHelpers.prepareData(formData);

      if (isEditing && id) {
        result = await bankAccountService.update(id, preparedData);
      } else {
        result = await bankAccountService.create(preparedData);
      }

      navigate(BASE_ROUTE, {
        state: {
          highlight: result.BankAccountID,
        },
      });

      toast.message(
        isEditing
          ? "Cuenta bancaria actualizada con éxito"
          : "Cuenta bancaria creada con éxito"
      );
    } catch (error) {
      setSaveError(error as Error);
      console.error("Error saving bank account:", error);
      toast.error(
        "Error al guardar la cuenta bancaria. Contacte al administrador del sistema"
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
